/**
 * GuildCore MessengerBotR API2 production bot
 * Kakao -> Cloudflare Worker -> D1
 * !핑 연합명: alliance room; !핑 연합명 길드명: guild room
 * Boss reminders: 10m and 5m only; web attendance link on !컷
 * Sends final attendance roster once per verified group room.
 * A group send session requires explicit !발송방등록 and !발송확인.
 */

var GUILDCORE_KAKAO_URL =
  "https://guildcore-v6.lsc1313.workers.dev/kakao";

var KAKAO_INPUT_KEY =
  "여기에_새_KAKAO_INPUT_KEY_입력"; // GuildCore 본체 Worker의 KAKAO_INPUT_KEY와 반드시 동일

/* MessengerBotR 로컬 저장 이름 - v1.4 기록과 분리 */
var ROOM_BINDING_DB_NAME_ = "guildcore_room_bindings_api2_v1";
var ROOM_BINDINGS_MEMORY_ = {};

/* 카카오 자동알림 폴링/중복방지 */
var ALERT_DELIVERY_DB_NAME_ = "guildcore_kakao_alert_delivery_api2_v1";
var ALERT_DELIVERY_MEMORY_ = {};
var KAKAO_ALERT_POLL_MS_ = 30000;
var KAKAO_ALERT_INTERVAL_ = null;
var KAKAO_ALERT_THREAD_ = null;
var KAKAO_ALERT_TIMER_MODE_ = "미시작";
var KAKAO_ALERT_LAST_POLL_ = "없음";
var KAKAO_ALERT_LAST_ERROR_ = "없음";
var KAKAO_ALERT_LAST_COUNT_ = 0;
var KAKAO_ALERT_TIMER_GENERATION_ = 0;
var KAKAO_ALERT_POLLING_ = false;
var KAKAO_ALERT_SENT_COUNT_ = 0;
var KAKAO_ALERT_SKIPPED_COUNT_ = 0;
var KAKAO_ALERT_UNCERTAIN_COUNT_ = 0;
var KAKAO_SEND_LAST_DETAIL_ = "미검사";
/* JS를 재컴파일해도 새 버전의 타이머끼리 경쟁하지 않도록 Java 시스템 속성에 소유권 저장. */
var KAKAO_TIMER_OWNER_KEY_ = "guildcore.kakao.v115.poller.owner";
var KAKAO_TIMER_OWNER_ = "";

/* 사용자 명령 처리 중에는 자동알림 폴링이 겹치지 않도록 막는다. */
var KAKAO_COMMAND_BUSY_ = false;

/* Worker 요청 제한시간. 불필요한 중복 호출을 먼저 제거하고 기존 30초는 유지한다. */
var KAKAO_REQUEST_TIMEOUT_MS_ = 30000;


/* =========================================================
   공통 / 방별 연합 매핑
   ========================================================= */

function string_(v) {
  if (v === null || v === undefined) return "";
  try { return String(v); } catch (e) { return ""; }
}

function roomKey_(room, channelId) {
  var ch = string_(channelId).trim();
  if (!ch) throw new Error("API2 channelId가 없습니다.");
  return "channel:" + ch;
}

/* API2 persistent storage. Never silently downgrade to RAM-only storage. */
function gcStorageRead_(name) {
  if (typeof Database !== "undefined" && Database && typeof Database.readString === "function") {
    return String(Database.readString(name) || "");
  }
  if (typeof DataBase !== "undefined" && DataBase && typeof DataBase.getDataBase === "function") {
    return String(DataBase.getDataBase(name) || "");
  }
  throw new Error("API2 Database.readString API 없음");
}
function gcStorageWrite_(name, value) {
  var valueStr = String(value);
  if (typeof Database !== "undefined" && Database &&
      typeof Database.writeString === "function" && typeof Database.readString === "function") {
    Database.writeString(name, valueStr);
  } else if (typeof DataBase !== "undefined" && DataBase &&
      typeof DataBase.setDataBase === "function" && typeof DataBase.getDataBase === "function") {
    DataBase.setDataBase(name, valueStr);
  } else {
    throw new Error("영구 저장 API 없음 (Database.writeString)");
  }
  if (gcStorageRead_(name) !== valueStr) throw new Error("영구 저장 검증 실패");
}
function loadRoomBindings_() {
  try {
    var raw = gcStorageRead_(ROOM_BINDING_DB_NAME_);
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        ROOM_BINDINGS_MEMORY_ = parsed;
        return parsed;
      }
    }
  } catch (e) { KAKAO_ALERT_LAST_ERROR_ = "연결 DB 읽기 오류: " + String(e); }
  return ROOM_BINDINGS_MEMORY_ || {};
}
function saveRoomBindings_(bindings) {
  try {
    gcStorageWrite_(ROOM_BINDING_DB_NAME_, JSON.stringify(bindings || {}));
    ROOM_BINDINGS_MEMORY_ = bindings || {};
    return true;
  } catch (e) {
    KAKAO_ALERT_LAST_ERROR_ = "연결 DB 저장 실패: " + String(e);
    try { Log.e(KAKAO_ALERT_LAST_ERROR_); } catch (_) {}
    return false;
  }
}

/* v1.15.5: 방 연결 자동 정리. 채팅 수신을 실제 활동으로 간주한다. */
var GC_KEEP_ROOMS_ = {}; /* No room-name whitelist: multi-alliance deployment */
var GC_BINDING_MIGRATION_FLAG_ = "guildcore_v1155_room_cleanup_done";
var GC_THREE_DAYS_MS_ = 3*24*60*60*1000;
var GC_SEVEN_DAYS_MS_ = 7*24*60*60*1000;
var GC_LAST_MAINTENANCE_ = 0;
var GC_LAST_TOUCH_BY_ROOM_ = {};
var GC_CLEANUP_REPORT_ = "미실행";

function gcGetFlag_() {
  try { return gcStorageRead_(GC_BINDING_MIGRATION_FLAG_) === "done"; }
  catch (_) { return false; }
}
function gcSetFlag_() {
  try { gcStorageWrite_(GC_BINDING_MIGRATION_FLAG_, "done"); return true; }
  catch (_) { return false; }
}
function gcRoomName_(b) { return String(b && b.room_name || "").trim(); }
function gcRoomActivity_(b) {
  var n=Date.parse(String(b && b.last_activity_at || ""));
  return isNaN(n) ? 0 : n;
}
function gcCleanupRoomBindings_(force) {
  var now=Date.now();
  if (!force && now-GC_LAST_MAINTENANCE_ < 60*1000) return;
  GC_LAST_MAINTENANCE_=now;
  var bindings=loadRoomBindings_(), changed=false, removed=0,disabled=0, initialized=0;
  var firstRun=!gcGetFlag_();
  // 정해진 두 방 이외 기록은 설치 시 딱 한 번 정리. 이후에는 !핑으로 다른 방도 신규 연결 가능.
  for (var k in bindings) {
    if (!Object.prototype.hasOwnProperty.call(bindings,k)) continue;
    var b=bindings[k];
    if (!b || typeof b!=="object") {delete bindings[k]; removed++;changed=true;continue;}
    var room=gcRoomName_(b);
    /* Never delete a different room merely because it is not on a fixed allowlist. */
    var last=gcRoomActivity_(b);
    // 이전 버전의 updated_at은 '최근 메시지' 증거가 아니므로 업그레이드 때 활동 기준을 새로 시작.
    if (!last) {b.last_activity_at=new Date(now).toISOString(); last=now;initialized++;changed=true;}
    // 공지방은 채팅 수신이 없어도 연결을 유지한다. 해제는 !핑해제로만 수행한다.
  }
  if (changed && !saveRoomBindings_(bindings)) { GC_CLEANUP_REPORT_="방 연결정보 저장 실패"; return; }
  if (firstRun) {
    // DB 저장 실패 시 초기화를 확정하지 않고 다음 실행에 다시 시도.
    if (gcSetFlag_()) GC_CLEANUP_REPORT_="초기정리 삭제 "+removed+"건 / 활동시작 "+initialized+"건";
    else GC_CLEANUP_REPORT_="초기정리 DB 기록 실패 — 재확인 필요";
  } else GC_CLEANUP_REPORT_="정기정리 유효성 검사 완료 / 자동 해제 없음 / 삭제 "+removed+"건";
}
function gcTouchRoom_(room, channelId) {
  var rn=String(room||"").trim(), ch=string_(channelId).trim(),now=Date.now();
  if (!ch) return;
  var lk=ch;
  if (now-Number(GC_LAST_TOUCH_BY_ROOM_[lk]||0)<60*1000) return;
  GC_LAST_TOUCH_BY_ROOM_[lk]=now;
  var bindings=loadRoomBindings_(),dirty=false;
  for (var k in bindings) {
    if (!Object.prototype.hasOwnProperty.call(bindings,k)) continue;
    var b=bindings[k];if(!b)continue;
    if (ch && String(b.channel_id||"").trim()===ch) {
      b.last_activity_at=new Date(now).toISOString();dirty=true;
    }
  }
  if(dirty)saveRoomBindings_(bindings);
}

function getRoomBinding_(room, channelId) {
  var ch = string_(channelId).trim();
  if (!ch) return null;
  return loadRoomBindings_()["channel:" + ch] || null;
}

function saveRoomBinding_(room, channelId, allianceId, allianceName, active, roomType, guildId, guildName, serverId) {
  var bindings = loadRoomBindings_();
  var key = roomKey_(room, channelId);
  var old = bindings[key] || {};

  bindings[key] = {
    room_name: String(old.room_name || ""), // 검증된 발송 세션 별칭 보존. 발신자 이름으로 자동 덮어쓰지 않음
    channel_id: string_(channelId) || String(old.channel_id || ""),
    alliance_id: String(allianceId || old.alliance_id || ""),
    alliance_name: String(allianceName || old.alliance_name || ""),
    room_type: String(roomType || old.room_type || "alliance"),
    guild_id: String(guildId !== undefined ? guildId : (old.guild_id || "")),
    guild_name: String(guildName !== undefined ? guildName : (old.guild_name || "")),
    server_id: String(serverId !== undefined ? serverId : (old.server_id || "")),
    active: active === true,
    last_activity_at: active === true ? new Date().toISOString() : (old.last_activity_at || new Date().toISOString()),
    updated_at: String(new Date())
  };
  /* channelId 키만 사용. 다른 방과 사용자 이름으로 병합하지 않음. */
  KAKAO_ALERT_LAST_ERROR_ = "없음";
  if (!saveRoomBindings_(bindings)) throw new Error("방 연결정보 영구 저장 실패");
  return bindings[key];
}

function deactivateRoom_(room, channelId) {
  var binding = getRoomBinding_(room, channelId);
  if (!binding || !binding.alliance_id) return null;
  return saveRoomBinding_(
    room,
    channelId,
    binding.alliance_id,
    binding.alliance_name,
    false
  );
}

function clearRoomBinding_(room, channelId) {
  var ch = string_(channelId).trim();
  if (!ch) return null;
  var bindings = loadRoomBindings_();
  var key = "channel:" + ch;
  var old = bindings[key];
  if (!old) return null;
  delete bindings[key];
  if (!saveRoomBindings_(bindings)) throw new Error("연결초기화 저장 실패");
  return old;
}

function isRoomActive_(room, channelId) {
  var binding = getRoomBinding_(room, channelId);
  return !!(
    binding &&
    binding.active === true &&
    String(binding.alliance_id || "").trim()
  );
}

function makeKakaoUserKey_(room, sender, channelId, userHash) {
  var ch = string_(channelId).trim();
  if (!ch) throw new Error("방 ID 없음");
  return "channel:" + ch + "::" + (string_(userHash).trim() || String(sender || "").trim());
}

function validateConfig_(replier) {
  if (!GUILDCORE_KAKAO_URL || GUILDCORE_KAKAO_URL.indexOf("http") !== 0) {
    replier.reply("❌ Worker URL 설정을 확인하세요.");
    return false;
  }
  if (!KAKAO_INPUT_KEY || KAKAO_INPUT_KEY.indexOf("여기에_") === 0) {
    replier.reply("❌ KAKAO_INPUT_KEY를 먼저 설정하세요.");
    return false;
  }
  return true;
}


/* =========================================================
   Cloudflare Worker 요청
   ========================================================= */

function postGuildCore_(body) {
  var response =
    org.jsoup.Jsoup
      .connect(GUILDCORE_KAKAO_URL)
      .header("Content-Type", "application/json; charset=UTF-8")
      .requestBody(JSON.stringify(body))
      .ignoreContentType(true)
      .ignoreHttpErrors(true)
      .followRedirects(true)
      .timeout(KAKAO_REQUEST_TIMEOUT_MS_)
      .method(org.jsoup.Connection.Method.POST)
      .execute();

  var text = response.body();
  if (!text) throw new Error("Worker 응답이 비어 있습니다.");

  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Worker 응답 파싱 실패\n" + text);
  }
}

function friendlyGuildCoreError_(e) {
  var s = "";
  try { s = String(e || ""); } catch (_) { s = ""; }

  if (
    s.indexOf("SocketTimeoutException") >= 0 ||
    s.toLowerCase().indexOf("timeout") >= 0 ||
    s.toLowerCase().indexOf("timed out") >= 0
  ) {
    return "GuildCore 응답이 지연되고 있습니다.\n잠시 후 다시 시도해주세요.";
  }

  if (s.indexOf("ConnectException") >= 0) {
    return "GuildCore 서버에 연결할 수 없습니다.\n잠시 후 다시 시도해주세요.";
  }

  return s || "알 수 없는 연결 오류";
}

function basePayload_(text, room, sender, packageName, channelId, userHash) {
  return {
    text: text,
    sender: String(sender || ""),
    room_name: "", // API2 room은 오픈채팅에서 발신자명일 수 있어 저장하지 않음
    room_id: string_(channelId) || String(room || ""),
    user_hash: string_(userHash),
    kakao_user_key: makeKakaoUserKey_(room, sender, channelId, userHash),
    package_name: String(packageName || "com.kakao.talk")
  };
}

function resolveAllianceFromCore_(query, room, sender, packageName, channelId, userHash) {
  return postGuildCore_({
    key: KAKAO_INPUT_KEY,
    mode: "resolve_alliance",
    alliance_query: String(query || "").trim(),
    payload: basePayload_("!핑", room, sender, packageName, channelId, userHash)
  });
}

function gcRemoteRoomRegister_(allianceId, channelId, roomType, guildId) {
  var response = postAlertControl_("room_register", allianceId, {
    room_id: string_(channelId).trim(),
    room_type: roomType === "guild" ? "guild" : "alliance",
    guild_id: roomType === "guild" ? String(guildId || "") : ""
  });
  if (!response || response.ok !== true) throw new Error("길드/연합 방 서버 등록 실패: " + String(response && response.error || "서버 응답 없음"));
  return response.data || {};
}
function gcRemoteRoomUnregister_(binding, channelId) {
  if (!binding || !binding.alliance_id) return;
  var response = postAlertControl_("room_unregister", String(binding.alliance_id), {room_id:string_(channelId).trim()});
  if (!response || response.ok !== true) throw new Error("방 서버 연결 해제 실패: " + String(response && response.error || "서버 응답 없음"));
}
function gcRoomsForBoss_(rooms, item) {
  var scope = String(item && item.boss_scope || "WORLD").toUpperCase();
  var server = String(item && item.server_id || "");
  return rooms.filter(function(entry) {
    var b = entry.binding || {};
    if (scope !== "SERVER") return true;
    return b.room_type === "guild" && !!server && String(b.server_id || "") === server;
  });
}
function makeWorkerBody_(text, allianceId, room, sender, packageName, channelId, userHash) {
  return {
    key: KAKAO_INPUT_KEY,
    alliance_id: String(allianceId || ""),
    payload: basePayload_(text, room, sender, packageName, channelId, userHash)
  };
}

function sendWorkerCommand_(text, allianceId, room, sender, replier, packageName, channelId, userHash) {
  var result = postGuildCore_(
    makeWorkerBody_(
      text,
      allianceId,
      room,
      sender,
      packageName,
      channelId,
      userHash
    )
  );

  if (!result || result.ok !== true) {
    throw new Error(
      result && result.error
        ? result.error
        : "GuildCore 처리 실패"
    );
  }

  var reply = "";
  if (result.data && result.data.reply) {
    reply = String(result.data.reply);
  }
  var resultId = result.data && result.data.attendance_result_id ? String(result.data.attendance_result_id) : "";
  var canonicalBinding = getRoomBinding_(room, channelId) || {room_name:room,channel_id:channelId};
  if (reply && resultId) {
    // 명령어 직접 응답과 30초 자동 결과 큐가 같은 명단을 두 번 발송하지 않게 한다.
    claimSemanticAlert_(canonicalBinding, reply);
    markAlertDelivered_("channel:" + string_(channelId), "result:" + resultId);
  }
  if (reply) replier.reply(reply);
  if (resultId) {
    try {
      var ack = postAlertControl_("attendance_results_mark", allianceId,
        {result_ids:[resultId],status:"sent",note:"MessengerBotR command reply"});
      if (!ack || ack.ok !== true) throw new Error(ack && ack.error || "result ack failed");
    } catch (ackError) {
      KAKAO_ALERT_LAST_ERROR_ = "명령어 결과 완료보고 실패: " + String(ackError);
    }
  }
  return result;
}


/* =========================================================
   카카오 자동 보스알림
   - 연결된 방만 대상
   - Worker에서 카카오 전용 delivery 상태를 별도로 소비
   - 같은 알림이 재조회되어도 방별 로컬 기록으로 중복 전송 방지
   ========================================================= */

function loadAlertDelivery_() {
  try {
    var raw = gcStorageRead_(ALERT_DELIVERY_DB_NAME_);
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        ALERT_DELIVERY_MEMORY_ = parsed;
        return parsed;
      }
    }
  } catch(e) { KAKAO_ALERT_LAST_ERROR_ = "발송기록 읽기 오류: " + String(e); }
  return ALERT_DELIVERY_MEMORY_ || {};
}
function saveAlertDelivery_(data) {
  try {
    gcStorageWrite_(ALERT_DELIVERY_DB_NAME_, JSON.stringify(data || {}));
    ALERT_DELIVERY_MEMORY_ = data || {};
    return true;
  } catch (e) {
    KAKAO_ALERT_LAST_ERROR_ = "발송기록 저장 실패: " + String(e);
    try { Log.e(KAKAO_ALERT_LAST_ERROR_); } catch (_) {}
    return false;
  }
}

function alertDeliveryKey_(roomKey, alertId) {
  return String(roomKey || "") + "::" + String(alertId || "");
}

function wasAlertDelivered_(roomKey, alertId) {
  var d = loadAlertDelivery_();
  return !!d[alertDeliveryKey_(roomKey, alertId)];
}

function markAlertDelivered_(roomKey, alertId) {
  var d = loadAlertDelivery_();
  d[alertDeliveryKey_(roomKey, alertId)] = Date.now();
  var cutoff = Date.now() - 24 * 60 * 60 * 1000;
  for (var k in d) {
    if (Object.prototype.hasOwnProperty.call(d, k) && Number(d[k] || 0) < cutoff) delete d[k];
  }
  return saveAlertDelivery_(d);
}

function unmarkAlertDelivered_(roomKey, alertId) {
  var d = loadAlertDelivery_();
  delete d[alertDeliveryKey_(roomKey, alertId)];
  saveAlertDelivery_(d);
}

/* Only deactivate stale room bindings when the server explicitly says the
 * alliance no longer exists. Transient network errors must not change binding. */
function deactivateInvalidAlliance_(allianceId, errorText) {
  var error = String(errorText || "");
  if (error.indexOf("활성 연합을 찾을 수 없습니다") < 0) return false;
  var stored = loadRoomBindings_(), changed = false;
  for (var k in stored) {
    if (!Object.prototype.hasOwnProperty.call(stored, k)) continue;
    var b = stored[k];
    if (b && b.active === true && String(b.alliance_id || "") === String(allianceId || "")) {
      b.active = false;
      b.updated_at = String(new Date());
      changed = true;
    }
  }
  if (changed) saveRoomBindings_(stored);
  return changed;
}

function activeRoomEntries_() {
  var bindings = loadRoomBindings_();
  var out = [];
  for (var key in bindings) {
    if (!Object.prototype.hasOwnProperty.call(bindings, key)) continue;
    var b = bindings[key];
    if (!b || b.active !== true || !String(b.alliance_id || "").trim()) continue;
    out.push({ room_key:key, binding:b });
  }
  return out;
}

function postAlertControl_(mode, allianceId, extra) {
  var body = {
    key: KAKAO_INPUT_KEY,
    mode: String(mode || ""),
    alliance_id: String(allianceId || "")
  };
  extra = extra || {};
  for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra,k)) body[k] = extra[k];
  return postGuildCore_(body);
}

/* MessengerBotR 버전마다 replyRoom 성공 반환값이 true 또는 undefined일 수 있다.
 * true만 성공으로 간주하면 이미 발송하고도 재전송하며, 같은 메시지를
 * channelId와 방 이름으로 연달아 두 번 보내는 문제가 생긴다.
 * 명시적인 false 또는 예외에서만 다음 주소를 시도한다. */
/* 같은 방의 동일 문구 중복 발송 방지. 명시적 전송 실패는 예약을 해제한다. */
function proactiveReply_(binding, message) {
  var current = getRoomBinding_("", binding && binding.channel_id);
  if (!current || current.active !== true || String(current.alliance_id || "") !== String(binding.alliance_id || "")) {
    KAKAO_SEND_LAST_DETAIL_ = "현재 방 연결 해제/변경됨";
    return false;
  }
  binding = current;
  var roomName = String(binding && binding.room_name || "").trim();
  // Diagnose-only aliases can be sender names, not actual group titles.
  if (binding.send_alias_source !== "manual_confirmed") {
    KAKAO_SEND_LAST_DETAIL_ = "자동발송 대상 미확인: !발송방등록 정확한방이름 후 !발송확인";
    KAKAO_ALERT_LAST_ERROR_ = KAKAO_SEND_LAST_DETAIL_;
    return false;
  }
  if (!roomName) {
    KAKAO_SEND_LAST_DETAIL_ = "채팅방 이름 없음";
    KAKAO_ALERT_LAST_ERROR_ = KAKAO_SEND_LAST_DETAIL_;
    return false;
  }
  try {
    // API2 0.7.39a 실기기 진단: ID 방식 false, 방 이름 + 패키지명 true.
    // 실패 시 다른 경로로 자동 재전송하지 않아 중복 알림을 방지한다.
    var sent = GC_API2_BOT_.send(roomName, String(message || ""), "com.kakao.talk");
    KAKAO_SEND_LAST_DETAIL_ = "bot.send(방 이름+카카오) [" + roomName + "]: " + String(sent);
    if (sent !== true) {
      KAKAO_ALERT_LAST_ERROR_ = KAKAO_SEND_LAST_DETAIL_;
      return false;
    }
    return true;
  } catch (e) {
    KAKAO_SEND_LAST_DETAIL_ = "방 이름 발송 예외: " + String(e);
    KAKAO_ALERT_LAST_ERROR_ = KAKAO_SEND_LAST_DETAIL_;
    return false;
  }
}

/* channel:...와 room:...로 중복 저장된 같은 카톡방은 한 번만 발송 */
function uniqueRoomEntries_(entries) {
  var out = [], seen = {};
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i], b = entry.binding || {};
    var room = String(b.room_name || "").trim();
    var channel = String(b.channel_id || "").trim();
    var key = channel ? "channel:" + channel : entry.room_key;
    if (seen[key]) continue;
    seen[key] = true;
    out.push({room_key:key,binding:b});
  }
  return out;
}

function gcRoomDeliveryId_(entry) {
  var b = entry && entry.binding || {};
  return String(b.channel_id || entry.room_key || "");
}
function gcRoomReceiptMap_(allianceId, type, ids) {
  var map = {};
  if (!ids.length) return map;
  var response = postAlertControl_("room_delivery_get", allianceId, {queue_type:type,item_ids:ids});
  if (!response || response.ok !== true) throw new Error("room_delivery_get 실패: " + String(response && response.error || "서버 응답 없음"));
  var receipts = response.data && response.data.receipts || [];
  for (var i = 0; i < receipts.length; i++) {
    var x = receipts[i];
    if (x && x.status === "sent") map[String(x.item_id) + ":" + String(x.room_id)] = true;
  }
  return map;
}
function gcReportRoomReceipt_(allianceId, type, itemId, entry, status) {
  var response = postAlertControl_("room_delivery_mark", allianceId, {
    queue_type:type,item_id:String(itemId),room_id:gcRoomDeliveryId_(entry),status:status
  });
  if (!response || response.ok !== true) throw new Error("room_delivery_mark 실패: " + String(response && response.error || "서버 응답 없음"));
}

function gcVerifyAllRoomReceipts_(allianceId, type, itemId, rooms) {
  if (!rooms.length) return false;
  var receipts = gcRoomReceiptMap_(allianceId, type, [String(itemId)]);
  for (var i = 0; i < rooms.length; i++) {
    if (!receipts[String(itemId) + ":" + gcRoomDeliveryId_(rooms[i])]) return false;
  }
  return true;
}


/* Manual Kakao participation reports (boss / weekly / combined).
 * Reuse the established 30-second poller, but do not touch boss alert queues.
 * The server routes each report to the exact registered room. A sent receipt
 * is stored locally before the server ACK to prevent retries from resending.
 */
function gcPollManualAttendanceReports_(allianceId, rooms) {
  for (var i = 0; i < rooms.length; i++) {
    var entry = rooms[i], roomId = gcRoomDeliveryId_(entry);
    if (!roomId || !entry.binding || entry.binding.active !== true) continue;
    var response = postAlertControl_("attendance_reports_pull", allianceId, {
      room_id:roomId, guild_routing_v1:true
    });
    if (!response || response.ok !== true) throw new Error(response && response.error || "attendance_reports_pull 실패");
    var reports = response.data && response.data.reports || [];
    for (var j = 0; j < reports.length; j++) {
      var report = reports[j] || {}, id = String(report.report_id || "");
      if (!id || String(report.status || "") !== "queued") continue;
      var deliveryId = "manual-report:" + id;
      if (!wasAlertDelivered_(entry.room_key, deliveryId)) {
        if (!proactiveReply_(entry.binding, String(report.message || ""))) {
          KAKAO_ALERT_UNCERTAIN_COUNT_++;
          KAKAO_ALERT_LAST_ERROR_ = "참여 보고서 발송 실패: " + KAKAO_SEND_LAST_DETAIL_;
          continue; // Keep queued for a future retry; never claim a failed send as sent.
        }
        markAlertDelivered_(entry.room_key, deliveryId);
        KAKAO_ALERT_SENT_COUNT_++;
      } else {
        KAKAO_ALERT_SKIPPED_COUNT_++;
      }
      var ack = postAlertControl_("attendance_reports_mark", allianceId, {
        report_ids:[id],status:"sent",room_id:roomId
      });
      if (!ack || ack.ok !== true || !ack.data || Number(ack.data.updated || 0) !== 1) {
        throw new Error(ack && ack.error || "attendance_reports_mark 완료 확인 실패: " + id);
      }
    }
  }
}

function pollKakaoAlerts_() {
  if (KAKAO_COMMAND_BUSY_) return;
  if (KAKAO_ALERT_POLLING_) return;
  if (!GUILDCORE_KAKAO_URL || GUILDCORE_KAKAO_URL.indexOf("http") !== 0) return;
  if (!KAKAO_INPUT_KEY || KAKAO_INPUT_KEY.indexOf("여기에_") === 0) return;

  KAKAO_ALERT_LAST_POLL_ = String(new Date());
  KAKAO_ALERT_LAST_ERROR_ = "없음";
  KAKAO_ALERT_LAST_COUNT_ = 0;
  gcCleanupRoomBindings_(false);
  var entries = activeRoomEntries_();
  if (!entries.length) {
    KAKAO_ALERT_LAST_ERROR_ = "활성 카톡방 연결 0건: !핑 연합명 으로 연결 필요";
    return;
  }

  KAKAO_ALERT_POLLING_ = true;
  try {
    var groups = {};
    for (var i = 0; i < entries.length; i++) {
      var aid = String(entries[i].binding.alliance_id || "");
      if (!groups[aid]) groups[aid] = [];
      groups[aid].push(entries[i]);
    }

    for (var allianceId in groups) {
      if (!Object.prototype.hasOwnProperty.call(groups, allianceId)) continue;
      var rooms = uniqueRoomEntries_(groups[allianceId]);
      // 실제 발송 세션이 확인되지 않은 방은 ACK 성공으로 처리하지 않는다.

      /* 1) 보스 10/5분 알림: 방별 성공 기록, 실패 시 queued 재시도 */
      try {
        var pulled = postAlertControl_("alerts_pull", allianceId, {limit:20});
        if (!pulled || pulled.ok !== true) throw new Error(pulled && pulled.error || "alerts_pull 실패");
        var alerts = pulled.data && pulled.data.alerts ? pulled.data.alerts : [];
        KAKAO_ALERT_LAST_COUNT_ += alerts.length;
        var alertIds = [];
        for (var ai = 0; ai < alerts.length; ai++) if (alerts[ai] && alerts[ai].alert_id) alertIds.push(String(alerts[ai].alert_id));
        var alertReceipts = gcRoomReceiptMap_(allianceId, "alert", alertIds);
        for (var a = 0; a < alerts.length; a++) {
          var alert = alerts[a] || {}, alertId = String(alert.alert_id || "");
          if (!alertId) continue;
          // Defense in depth: never send 1-minute or spawn alerts, even from legacy queues.
          if (String(alert.alert_type || "") !== "10m" && String(alert.alert_type || "") !== "5m") continue;
          var status = "sent", deliveryId = "alert:" + alertId;
          var targetRooms = gcRoomsForBoss_(rooms, alert);
          if (!targetRooms.length) {
            postAlertControl_("alerts_mark", allianceId, {alert_ids:[alertId], status:"expired", note:"no matching guild/alliance room"});
            continue;
          }
          for (var r = 0; r < targetRooms.length; r++) {
            var entry = targetRooms[r], msg = String(alert.message || "");
            var receiptKey = alertId + ":" + gcRoomDeliveryId_(entry);
            if (alertReceipts[receiptKey]) {KAKAO_ALERT_SKIPPED_COUNT_++;continue;}
            if (wasAlertDelivered_(entry.room_key, deliveryId)) {
              try { gcReportRoomReceipt_(allianceId, "alert", alertId, entry, "sent"); alertReceipts[receiptKey] = true; } catch (receiptError) { status = "queued"; KAKAO_ALERT_LAST_ERROR_ = "방별 기록 실패: " + String(receiptError); } KAKAO_ALERT_SKIPPED_COUNT_++;continue;
            }
            if (proactiveReply_(entry.binding, msg)) {
              markAlertDelivered_(entry.room_key, deliveryId);
              try { gcReportRoomReceipt_(allianceId, "alert", alertId, entry, "sent"); alertReceipts[receiptKey] = true; } catch (receiptError) { status = "queued"; KAKAO_ALERT_LAST_ERROR_ = "방별 기록 실패: " + String(receiptError); }
              KAKAO_ALERT_SENT_COUNT_++;
            } else {
              status = "queued"; KAKAO_ALERT_UNCERTAIN_COUNT_++;
              try { gcReportRoomReceipt_(allianceId, "alert", alertId, entry, "failed"); } catch (receiptError) { status = "queued"; KAKAO_ALERT_LAST_ERROR_ = "방별 기록 실패: " + String(receiptError); }
              KAKAO_ALERT_LAST_ERROR_ = "알림 발송 실패: " + KAKAO_SEND_LAST_DETAIL_;
            }
          }
          if (status === "sent" && !gcVerifyAllRoomReceipts_(allianceId, "alert", alertId, targetRooms)) {
            status = "queued";
            KAKAO_ALERT_LAST_ERROR_ = "서버 방별 발송 확인 미완료: " + alertId;
          }
          var ack = postAlertControl_("alerts_mark", allianceId,
            {alert_ids:[alertId],status:status,room_ids:targetRooms.map(function(x){return gcRoomDeliveryId_(x);}),note:"MessengerBotR API2 guild routing " + status});
          if (!ack || ack.ok !== true || !ack.data || Number(ack.data.updated || 0) !== 1) throw new Error(ack && ack.error || "alerts_mark 상태 갱신 실패");
        }
      } catch (eAlert) {
        if (deactivateInvalidAlliance_(allianceId, eAlert)) {
          KAKAO_ALERT_LAST_ERROR_ = "만료된 연합 연결 자동 비활성화: " + allianceId;
          try { Log.e("GuildCore deactivated stale alliance: " + allianceId); } catch (_) {}
          continue;
        }
        KAKAO_ALERT_LAST_ERROR_ = String(eAlert);
        try { Log.e("GuildCore Kakao alert poll: " + eAlert); } catch (_) {}
      }

      /* 2) 출석 최종 명단: 방별 성공 기록, 실패 시 queued 재시도 */
      try {
        var resultPull = postAlertControl_("attendance_results_pull", allianceId, {limit:20});
        if (!resultPull || resultPull.ok !== true) throw new Error(resultPull && resultPull.error || "attendance_results_pull 실패");
        var results = resultPull.data && resultPull.data.results ? resultPull.data.results : [];
        var resultIds = [];
        for (var ri = 0; ri < results.length; ri++) if (results[ri] && results[ri].result_id) resultIds.push(String(results[ri].result_id));
        var resultReceipts = gcRoomReceiptMap_(allianceId, "attendance", resultIds);
        for (var j = 0; j < results.length; j++) {
          var item = results[j] || {}, resultId = String(item.result_id || "");
          if (!resultId) continue;
          var resultStatus = "sent", resultDeliveryId = "result:" + resultId;
          var targetResultRooms = gcRoomsForBoss_(rooms, item);
          if (!targetResultRooms.length) {
            postAlertControl_("attendance_results_mark", allianceId, {result_ids:[resultId], status:"expired", note:"no matching guild/alliance room"});
            continue;
          }
          for (var rr = 0; rr < targetResultRooms.length; rr++) {
            var roomEntry = targetResultRooms[rr], resultMessage = String(item.message || "");
            var resultReceiptKey = resultId + ":" + gcRoomDeliveryId_(roomEntry);
            if (resultReceipts[resultReceiptKey]) {KAKAO_ALERT_SKIPPED_COUNT_++;continue;}
            if (wasAlertDelivered_(roomEntry.room_key, resultDeliveryId)) {
              try { gcReportRoomReceipt_(allianceId, "attendance", resultId, roomEntry, "sent"); resultReceipts[resultReceiptKey] = true; } catch (receiptError) { resultStatus = "queued"; KAKAO_ALERT_LAST_ERROR_ = "방별 기록 실패: " + String(receiptError); } KAKAO_ALERT_SKIPPED_COUNT_++;continue;
            }
            if (proactiveReply_(roomEntry.binding, resultMessage)) {
              markAlertDelivered_(roomEntry.room_key, resultDeliveryId);
              try { gcReportRoomReceipt_(allianceId, "attendance", resultId, roomEntry, "sent"); resultReceipts[resultReceiptKey] = true; } catch (receiptError) { resultStatus = "queued"; KAKAO_ALERT_LAST_ERROR_ = "방별 기록 실패: " + String(receiptError); }
              KAKAO_ALERT_SENT_COUNT_++;
            } else {
              resultStatus = "queued"; KAKAO_ALERT_UNCERTAIN_COUNT_++;
              try { gcReportRoomReceipt_(allianceId, "attendance", resultId, roomEntry, "failed"); } catch (receiptError) { resultStatus = "queued"; KAKAO_ALERT_LAST_ERROR_ = "방별 기록 실패: " + String(receiptError); }
              KAKAO_ALERT_LAST_ERROR_ = "출석 발송 실패: " + KAKAO_SEND_LAST_DETAIL_;
            }
          }
          if (resultStatus === "sent" && !gcVerifyAllRoomReceipts_(allianceId, "attendance", resultId, targetResultRooms)) {
            resultStatus = "queued";
            KAKAO_ALERT_LAST_ERROR_ = "서버 방별 출석 발송 확인 미완료: " + resultId;
          }
          var resultAck = postAlertControl_("attendance_results_mark", allianceId,
            {result_ids:[resultId],status:resultStatus,room_ids:targetResultRooms.map(function(x){return gcRoomDeliveryId_(x);}),note:"MessengerBotR API2 guild routing " + resultStatus});
          if (!resultAck || resultAck.ok !== true || !resultAck.data || Number(resultAck.data.updated || 0) !== 1) throw new Error(resultAck && resultAck.error || "attendance_results_mark 상태 갱신 실패");
        }
      } catch (eResult) {
        if (deactivateInvalidAlliance_(allianceId, eResult)) {
          KAKAO_ALERT_LAST_ERROR_ = "만료된 연합 연결 자동 비활성화: " + allianceId;
          continue;
        }
        KAKAO_ALERT_LAST_ERROR_ = String(eResult);
        try { Log.e("GuildCore Kakao attendance result poll: " + eResult); } catch (_) {}
      }
      /* 3) 수동 참여 보고서: 길드방/연합방별로 정확하게 수신 */
      try {
        gcPollManualAttendanceReports_(allianceId, rooms);
      } catch (eReport) {
        KAKAO_ALERT_LAST_ERROR_ = "참여 보고서 전송 오류: " + String(eReport);
        try { Log.e("GuildCore Kakao manual report poll: " + eReport); } catch (_) {}
      }
    }
  } finally {
    KAKAO_ALERT_POLLING_ = false;
  }
}
function startKakaoAlertPoller_() {
  /* Legacy Rhino에서는 setInterval이 없을 수 있어 Java daemon thread를 우선 사용한다. */
  KAKAO_ALERT_TIMER_GENERATION_++;
  var generation = KAKAO_ALERT_TIMER_GENERATION_;
  KAKAO_TIMER_OWNER_ = String(java.util.UUID.randomUUID());
  java.lang.System.setProperty(KAKAO_TIMER_OWNER_KEY_, KAKAO_TIMER_OWNER_);
  try {
    if (KAKAO_ALERT_INTERVAL_ !== null && typeof clearInterval === "function") clearInterval(KAKAO_ALERT_INTERVAL_);
  } catch (_) {}
  KAKAO_ALERT_INTERVAL_ = null;
  KAKAO_ALERT_TIMER_MODE_ = "미시작";
  try {
    var runnable = new java.lang.Runnable({
      run: function() {
        while (generation === KAKAO_ALERT_TIMER_GENERATION_ &&
               String(java.lang.System.getProperty(KAKAO_TIMER_OWNER_KEY_, "")) === KAKAO_TIMER_OWNER_) {
          try { java.lang.Thread.sleep(KAKAO_ALERT_POLL_MS_); } catch (eSleep) { break; }
          if (generation !== KAKAO_ALERT_TIMER_GENERATION_ ||
              String(java.lang.System.getProperty(KAKAO_TIMER_OWNER_KEY_, "")) !== KAKAO_TIMER_OWNER_) break;
          try { pollKakaoAlerts_(); }
          catch (ePoll) {
            KAKAO_ALERT_LAST_ERROR_ = String(ePoll);
            try { Log.e("GuildCore Kakao alert poll: " + ePoll); } catch (_) {}
          }
        }
      }
    });
    KAKAO_ALERT_THREAD_ = new java.lang.Thread(runnable, "GuildCore-Kakao-Alerts");
    KAKAO_ALERT_THREAD_.setDaemon(true);
    KAKAO_ALERT_THREAD_.start();
    KAKAO_ALERT_TIMER_MODE_ = "Java 백그라운드 타이머";
    return;
  } catch (eJava) {
    KAKAO_ALERT_LAST_ERROR_ = "Java 타이머: " + String(eJava);
  }
  try {
    if (typeof setInterval === "function") {
      KAKAO_ALERT_INTERVAL_ = setInterval(function() {
        if (String(java.lang.System.getProperty(KAKAO_TIMER_OWNER_KEY_, "")) !== KAKAO_TIMER_OWNER_) return;
        try { pollKakaoAlerts_(); } catch (e) { KAKAO_ALERT_LAST_ERROR_ = String(e); }
      }, KAKAO_ALERT_POLL_MS_);
      KAKAO_ALERT_TIMER_MODE_ = "JavaScript 타이머";
      return;
    }
  } catch (e) { KAKAO_ALERT_LAST_ERROR_ = "JS 타이머: " + String(e); }
  KAKAO_ALERT_TIMER_MODE_ = "실행 실패";
}

function onStartCompile() {
  KAKAO_ALERT_TIMER_GENERATION_++;
  if (String(java.lang.System.getProperty(KAKAO_TIMER_OWNER_KEY_, "")) === KAKAO_TIMER_OWNER_)
    java.lang.System.removeProperty(KAKAO_TIMER_OWNER_KEY_);
  try { if (KAKAO_ALERT_THREAD_) KAKAO_ALERT_THREAD_.interrupt(); } catch (_) {}
  try {
    if (KAKAO_ALERT_INTERVAL_ !== null && typeof clearInterval === "function") clearInterval(KAKAO_ALERT_INTERVAL_);
  } catch (_) {}
  KAKAO_ALERT_INTERVAL_ = null;
}

function kakaoLocalHelpText_() {
  return [
    "📌 GuildCore 카톡 명령어",
    "",
    "[연결]",
    "!핑 연합명 (연합방) · !핑 연합명 길드명 (길드방)",
    "!연결상태 · !핑해제 · !연결초기화",
    "!발송방등록 방이름 → !발송확인",
    "",
    "[기본/보스]",
    "!등록 길드명 게임닉네임",
    "!변경 길드명 기존아이디 변경아이디",
    "!보스 / !보스확인 / !보탐",
    "!컷 보스명 [HH:MM] · !젠 보스명 [HH:MM]",
    "!내출석 [YYYY-MM] · !웹핀",
    "",
    "[출석 운영]",
    "!컷 이후 생성되는 웹 링크로 본인 출석·취소",
    "!출석종료 보스명",
    "!참여삭제 보스명 닉네임",
    "",
    "[보스 설정 · 연합운영진+]",
    "!보스등록 월드|서버명 보스명 쿨|고정 값",
    "!보스수정 보스명 쿨|고정 값",
    "!보스제거 보스명",
    "",
    "[공지/길드]",
    "!연합공지 제목 | 내용 · !길드공지 제목 | 내용",
    "!공지확인 연합|길드 · !길드원확인",
    "!길드원추가 닉네임 [직급]",
    "",
    "[아이템/자금/통계]",
    "!아이템내역 · !아이템등록 이름 [수량]",
    "!아이템판매 이름 금액",
    "!길드비용현황 · !길드비용 수입|지출 금액 [메모]",
    "!참여통계 [시작] [종료] · !정산조회 [시작] [종료]",
    "",
    "출석은 컷 후 10분 자동종료 · 운영진 수동종료 가능",
    "!도움 / !명령어 / !도구"
  ].join("\n");
}

/* =========================================================
   MessengerBotR 수신
   ========================================================= */

function response(
  room,
  msg,
  sender,
  isGroupChat,
  replier,
  imageDB,
  packageName,
  isMention,
  logId,
  channelId,
  userHash
) {
  var text = String(msg || "").trim();

  try {
    if (packageName && String(packageName) !== "com.kakao.talk") return;
    gcCleanupRoomBindings_(false);
    gcTouchRoom_(room, channelId);
    if (text.indexOf("!") !== 0) return;
    if (/^!(참여|취소)(?:\s|$)/.test(text)) { replier.reply("출석은 !컷 후 생성되는 웹 출석 링크에서 진행해주세요."); return; }
    if (!string_(channelId).trim()) { replier.reply("❌ API2 방 ID를 읽지 못했습니다. 연결하지 않습니다."); return; }

    if (
      packageName &&
      String(packageName) !== "com.kakao.talk"
    ) return;

    KAKAO_COMMAND_BUSY_ = true;

    /*
     * 도움말은 서버 호출 없이 즉시 표시.
     * 연결되지 않은 방에서도 명령어 확인은 가능하게 둔다.
     */
    if (
      text === "!도움" ||
      text === "!명령어" ||
      text === "!도구"
    ) {
      replier.reply(kakaoLocalHelpText_());
      return;
    }

    /* Open-chat API2 may report msg.room as a sender nickname.
       Never persist it automatically. The operator must name the destination
       explicitly and only a successful send verifies the session. */
    if (text.indexOf("!발송방등록 ") === 0) {
      var registered = getRoomBinding_(room, channelId);
      if (!registered || registered.active !== true) {
        replier.reply("❌ 먼저 !핑 연합명 [길드명] 으로 연결해주세요.");
        return;
      }
      if (!isGroupChat) {
        replier.reply("❌ 1:1 대화방은 자동알림 대상으로 등록하지 않습니다.");
        return;
      }
      var alias = text.substring("!발송방등록 ".length).trim();
      if (!alias || alias.length > 100) {
        replier.reply("사용법: !발송방등록 카톡방의정확한이름");
        return;
      }
      if (alias === String(sender || "").trim() || alias === String(room || "").trim()) {
        replier.reply("❌ 발신자 이름을 발송방으로 등록할 수 없습니다. 상단의 정확한 단체방 이름을 입력하세요.");
        return;
      }
      var binds = loadRoomBindings_();
      for (var bk in binds) {
        if (!Object.prototype.hasOwnProperty.call(binds, bk) ||
            bk === roomKey_(room, channelId)) continue;
        if (binds[bk] && binds[bk].active === true &&
            String(binds[bk].room_name || "") === alias) {
          replier.reply("❌ 이미 다른 연결 방에 등록된 발송 이름입니다. 채팅방 이름을 고유하게 변경해주세요.");
          return;
        }
      }
      try {
        var check = GC_API2_BOT_.send(alias, "🔔 GuildCore 자동발송 연결 시험 · 현재 채팅방 수신 여부를 확인해주세요.", "com.kakao.talk");
        if (check !== true) {
          replier.reply("❌ 자동발송 세션을 확인하지 못했습니다: " + String(check) +
            "\n카카오톡 알림 접근 권한과 실제 채팅방 이름을 확인해주세요.");
          return;
        }
        var keyAlias = roomKey_(room, channelId);
        binds[keyAlias].room_name = "";
        binds[keyAlias].send_alias_source = "";
        binds[keyAlias].pending_send_alias = alias;
        binds[keyAlias].pending_send_alias_at = new Date().toISOString();
        if (!saveRoomBindings_(binds)) throw new Error("시험 발송 이름 저장 실패");
        replier.reply("🔎 시험 메시지가 이 단체방에 도착했으면 5분 안에 !발송확인 을 입력하세요.\n확인 전에는 자동알림이 발송되지 않습니다.");
      } catch (aliasError) {
        replier.reply("❌ 발송방 등록 실패: " + String(aliasError));
      }
      return;
    }

    if (text === "!발송확인") {
      var pendingBinding = getRoomBinding_(room, channelId);
      if (!pendingBinding || pendingBinding.active !== true || !isGroupChat) {
        replier.reply("❌ 연결된 단체방에서만 확인할 수 있습니다."); return;
      }
      var pending = String(pendingBinding.pending_send_alias || "");
      // A sender-looking key is permitted only after an in-room proof message.
      var pendingAt = Date.parse(String(pendingBinding.pending_send_alias_at || ""));
      if (!pending || !isFinite(pendingAt) || Date.now()-pendingAt > 300000) {
        replier.reply("❌ 유효한 시험 발송 기록이 없습니다. !발송방등록 정확한방이름 을 다시 입력하세요."); return;
      }
      var confirmed = loadRoomBindings_();
      var ck = roomKey_(room,channelId);
      confirmed[ck].room_name = pending;
      confirmed[ck].send_alias_source = "manual_confirmed";
      confirmed[ck].send_alias_verified_at = new Date().toISOString();
      delete confirmed[ck].pending_send_alias;
      delete confirmed[ck].pending_send_alias_at;
      if (!saveRoomBindings_(confirmed)) throw new Error("발송방 확정 저장 실패");
      replier.reply("✅ 자동발송 대상 확정: "+pending);
      return;
    }
    /* 연결상태: 저장된 방 매핑 + V6 실제 연결을 함께 확인 */
    if (text === "!연결상태") {
      var statusBinding = getRoomBinding_(room, channelId);
      if (
        !statusBinding ||
        !String(statusBinding.alliance_id || "").trim()
      ) {
        replier.reply(
          "ℹ️ GuildCore 미연결\n" +
          "연결: !핑 연합명"
        );
        return;
      }

      if (statusBinding.active !== true) {
        replier.reply(
          "🔌 GuildCore 연결 비활성\n" +
          "연합: " + (statusBinding.alliance_name || statusBinding.alliance_id) + "\n" +
          "다시 연결: !핑"
        );
        return;
      }

      if (!validateConfig_(replier)) return;

      var statusHealth = postGuildCore_(
        makeWorkerBody_(
          "!핑",
          statusBinding.alliance_id,
          room,
          sender,
          packageName,
          channelId,
          userHash
        )
      );

      if (!statusHealth || statusHealth.ok !== true) {
        throw new Error(
          statusHealth && statusHealth.error
            ? statusHealth.error
            : "GuildCore 연결상태 확인 실패"
        );
      }

      replier.reply(
        "✅ GuildCore 연결 정상\n" +
        "카카오톡 → MessengerBotR → Worker → V6 D1\n" +
        "연합: " + (statusBinding.alliance_name || statusBinding.alliance_id) +
        (statusBinding.room_type === "guild" ? "\n길드: " + statusBinding.guild_name : "\n연합 공지방")
      );
      return;
    }

    /* 잘못 연결된 방 매핑을 완전히 삭제. 판매/재설정 때 사용 */
    if (text === "!연결초기화") {
      var original = getRoomBinding_(room, channelId);
      if (original) gcRemoteRoomUnregister_(original, channelId);
      var cleared = clearRoomBinding_(room, channelId);
      if (cleared) {
        replier.reply(
          "🧹 GuildCore 방 연결정보 초기화 완료\n" +
          "다시 연결: !핑 연합명"
        );
      } else {
        replier.reply(
          "ℹ️ 저장된 GuildCore 방 연결정보가 없습니다.\n" +
          "연결: !핑 연합명"
        );
      }
      return;
    }

    /* !핑해제 : Worker 호출 없이 방만 비활성화. 마지막 연합은 기억 */
    if (text === "!핑해제") {
      var current = getRoomBinding_(room, channelId);
      if (current) gcRemoteRoomUnregister_(current, channelId);
      var disabled = deactivateRoom_(room, channelId);
      if (disabled) {
        replier.reply(
          "🔌 GuildCore 연결 해제\n" +
          "연합: " + (disabled.alliance_name || disabled.alliance_id) + "\n" +
          "이 방에서는 다른 !명령에 반응하지 않습니다.\n" +
          "다시 연결: !핑"
        );
      } else {
        replier.reply(
          "ℹ️ 이 카톡방은 GuildCore에 연결되어 있지 않습니다.\n" +
          "연결: !핑 연합명"
        );
      }
      return;
    }

    /*
     * !핑 최적화
     *
     * v1.8:
     *   연합 확인 1회 → 실제 핑 1회 = 최대 2번의 서버 왕복
     *
     * v1.9:
     *   1) 이 방에 기존 연합 ID가 있으면 그 ID로 실제 핑 1회만 수행
     *   2) 처음 연결하거나 사용자가 연합명을 직접 지정하면
     *      연합 확인 성공 자체를 연결 확인으로 사용하여 1회만 수행
     */
    var pingMatch = text.match(/^!핑(?:\s+(.+))?$/);
    if (pingMatch) {
      if (!validateConfig_(replier)) return;

      var requested = String(pingMatch[1] || "").trim();
      var oldBinding = getRoomBinding_(room, channelId);

      if (
        !requested &&
        oldBinding &&
        String(oldBinding.alliance_id || "").trim()
      ) {
        var health = postGuildCore_(
          makeWorkerBody_(
            "!핑",
            oldBinding.alliance_id,
            room,
            sender,
            packageName,
            channelId,
            userHash
          )
        );

        if (!health || health.ok !== true) {
          throw new Error(
            health && health.error
              ? health.error
              : "GuildCore 연결 확인 실패"
          );
        }

        gcRemoteRoomRegister_(oldBinding.alliance_id, channelId, oldBinding.room_type || "alliance", oldBinding.guild_id || "");
        var bindingOld = saveRoomBinding_(
          room,
          channelId,
          oldBinding.alliance_id,
          oldBinding.alliance_name,
          true, oldBinding.room_type || "alliance", oldBinding.guild_id || "", oldBinding.guild_name || "", oldBinding.server_id || ""
        );

        var pingReply = "";
        if (health.data && health.data.reply) {
          pingReply = String(health.data.reply);
        }

        replier.reply(
          (pingReply ? pingReply + "\n" : "") +
          "🔗 이 카톡방 연결 활성화 완료\n" +
          "연합: " + (bindingOld.alliance_name || bindingOld.alliance_id) + "\n" +
          (bindingOld.room_type === "guild" ? "길드: " + bindingOld.guild_name + "\n" : "연합 공지방\n") +
          "🔔 자동알림: 10분 · 5분 / 출석 최종명단\n" +
          "해제: !핑해제"
        );
        return;
      }

      var parts = requested ? requested.split(/\s+/) : [];
      if (parts.length > 2) throw new Error("사용법: !핑 연합명 [길드명]");
      var selectedAlliance = parts[0] || "";
      var selectedGuild = parts[1] || "";
      var resolved = resolveAllianceFromCore_(
        selectedAlliance,
        room,
        sender,
        packageName,
        channelId,
        userHash
      );

      if (!resolved || resolved.ok !== true) {
        throw new Error(
          resolved && resolved.error
            ? resolved.error
            : "연합 확인 실패"
        );
      }

      var info = resolved.data || {};

      if (info.requires_selection === true) {
        var names = [];
        var arr = info.alliances || [];
        for (var i = 0; i < arr.length; i++) {
          names.push("• " + arr[i].alliance_name);
        }
        replier.reply(
          "ℹ️ 활성 연합이 여러 개입니다.\n" +
          "처음 한 번만 아래처럼 연합명을 지정하세요.\n\n" +
          "!핑 연합명\n\n" +
          (names.length ? names.join("\n") : "")
        );
        return;
      }

      if (!info.alliance_id) {
        throw new Error("연합 ID를 확인할 수 없습니다.");
      }

      var guildId = "", serverId = "", guildName = "", roomType = "alliance";
      if (selectedGuild) {
        var gr = postAlertControl_("guild_lookup", info.alliance_id, {guild_name:selectedGuild});
        if (!gr || gr.ok !== true || !gr.data || !gr.data.guild || !gr.data.guild.guild_id)
          throw new Error("길드 확인 실패: " + String(gr && gr.error || selectedGuild));
        guildId = String(gr.data.guild.guild_id);
        serverId = String(gr.data.guild.server_id || "");
        guildName = String(gr.data.guild.guild_name || selectedGuild);
        roomType = "guild";
      }
      gcRemoteRoomRegister_(info.alliance_id, channelId, roomType, guildId);
      if (oldBinding && oldBinding.alliance_id && oldBinding.alliance_id !== info.alliance_id) {
        gcRemoteRoomUnregister_(oldBinding, channelId);
      }
      var binding = saveRoomBinding_(
        room, channelId, info.alliance_id, info.alliance_name, true,
        roomType, guildId, guildName, serverId
      );

      replier.reply(
        "✅ GuildCore 연결 확인\n" +
        "🔗 이 카톡방 연결 활성화 완료\n" +
        "연합: " + (binding.alliance_name || binding.alliance_id) + "\n" +
        (binding.room_type === "guild" ? "길드: " + binding.guild_name + "\n" : "연합 공지방\n") +
        "🔔 자동알림: 10분 · 5분 / 출석 최종명단\n" +
        "해제: !핑해제"
      );
      return;
    }

    /* 연결을 못 찾았을 때 더 이상 조용히 버리지 않는다. */
    var activeBinding = getRoomBinding_(room, channelId);
    if (
      !activeBinding ||
      activeBinding.active !== true ||
      !String(activeBinding.alliance_id || "").trim()
    ) {
      replier.reply(
        "ℹ️ 이 카톡방의 GuildCore 연결을 찾지 못했습니다.\n" +
        "먼저 !핑 또는 !핑 연합명 을 입력해주세요."
      );
      return;
    }

    if (!validateConfig_(replier)) return;

    sendWorkerCommand_(
      text,
      activeBinding.alliance_id,
      room,
      sender,
      replier,
      packageName,
      channelId,
      userHash
    );

  } catch (e) {
    try { Log.e("GuildCore Kakao Bot: " + e); } catch (_) {}

    if (
      /^!핑(?:\s|$)/.test(text) ||
      text === "!연결상태" ||
      text === "!연결초기화" ||
      isRoomActive_(room, channelId)
    ) {
      replier.reply(
        "❌ GuildCore 연결 오류\n" + friendlyGuildCoreError_(e)
      );
    }
  } finally {
    KAKAO_COMMAND_BUSY_ = false;
  }
}

/* API2 event adapter: 기존 명령 처리 본문을 보존하면서 방 식별만 고유 ID 사용 */
var GC_API2_BOT_ = BotManager.getCurrentBot();
function guildcoreApi2OnMessage_(msg) {
  if (String(msg.packageName || "") !== "com.kakao.talk") return;
  var ch = msg.channelId == null ? "" : String(msg.channelId);
  var sender = msg.author && msg.author.name ? String(msg.author.name) : "";
  var userHash = msg.author && msg.author.hash != null ? String(msg.author.hash) : "";
  var replier = {reply:function(text){msg.reply(String(text));}};
  response(String(msg.room || ""), String(msg.content || ""), sender,
    msg.isGroupChat === true, replier, null, String(msg.packageName),
    !!msg.isMention, msg.logId, ch, userHash);
}
GC_API2_BOT_.addListener(Event.MESSAGE, guildcoreApi2OnMessage_);
/* 기존 레거시 연결 15개와 분리된 API2 저장소만 사용 */
gcCleanupRoomBindings_(true);
startKakaoAlertPoller_();