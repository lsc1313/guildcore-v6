const DISCORD_PUBLIC_KEY = "b2b0249f7c67963089befd5a8751d3afc799ed2a5e2b5560fc0501d6ad9fa7bc";
const APPLICATION_ID = "1549939082984038420";
const BOOTSTRAP_GUILD_ID = "1549869371826905218";

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  return bytes;
}

async function verifyDiscordRequest(request, body) {
  const signature = request.headers.get("X-Signature-Ed25519");
  const timestamp = request.headers.get("X-Signature-Timestamp");
  if (!signature || !timestamp) return false;
  const key = await crypto.subtle.importKey("raw", hexToBytes(DISCORD_PUBLIC_KEY), { name: "Ed25519" }, false, ["verify"]);
  return crypto.subtle.verify({ name: "Ed25519" }, key, hexToBytes(signature), new TextEncoder().encode(timestamp + body));
}

function botHeaders(env, json = true) {
  const h = { Authorization: `Bot ${env.DISCORD_BOT_TOKEN}` };
  if (json) h["Content-Type"] = "application/json";
  return h;
}

async function apiCall(env, discordServerId, action, payload = {}, allianceId = "") {
  if (!env.GUILDCORE_API_URL) throw new Error("GUILDCORE_API_URL secret/variable missing");
  const apiKey = env.GUILDCORE_API_KEY || env.GUILDCORE_BRIDGE_KEY || "";
  if (!apiKey) throw new Error("GUILDCORE_API_KEY secret missing");
  const res = await fetch(env.GUILDCORE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key: apiKey,
      action,
      alliance_id: allianceId,
      discord_server_id: discordServerId || "",
      payload
    })
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { throw new Error(`GuildCore API 응답 오류: ${text.slice(0, 250)}`); }
  if (!json.ok) throw new Error(json.error || "GuildCore API 오류");
  return json.data;
}

async function cachePut(key, data, ttl = 60) {
  await caches.default.put(new Request(`https://guildcore.cache/${key}`), new Response(JSON.stringify(data), {
    headers: { "Cache-Control": `max-age=${ttl}`, "Content-Type": "application/json" }
  }));
}

async function cacheGet(key) {
  const r = await caches.default.match(new Request(`https://guildcore.cache/${key}`));
  if (!r) return null;
  try { return await r.json(); } catch { return null; }
}

async function refreshConfig(env, guildId) {
  const config = await apiCall(env, guildId, "config");
  await cachePut(`config:${guildId}`, config, 120);
  return config;
}

async function getConfig(env, guildId) {
  return (await cacheGet(`config:${guildId}`)) || (await refreshConfig(env, guildId));
}

function choice(name, value) { return { name, value }; }

function commands() {
  const scopeChoices = [choice("전체","ALL"),choice("월드","WORLD"),choice("서버","SERVER")];
  return [
    { name:"핑", type:1, description:"GuildCore 본체 연결 상태를 확인합니다." },
    { name:"도움", type:1, description:"GuildCore 명령어 목록을 채팅창에 표시합니다." },
    { name:"서버연결", type:1, description:"현재 Discord 서버를 GuildCore 연합에 연결합니다.", options:[{name:"연합",description:"연결할 활성 연합",type:3,required:true,autocomplete:true}] },
    { name:"서버연결해제", type:1, description:"현재 Discord 서버와 연합 연결을 해제합니다." },
    { name:"보스알림채널설정", type:1, description:"현재 채널을 보스 자동알림 채널로 설정합니다.", options:[{name:"범위",description:"전체/월드/특정 서버",type:3,required:false,choices:scopeChoices},{name:"서버",description:"범위가 서버일 때 선택",type:3,required:false,autocomplete:true}] },
    { name:"출석채널설정", type:1, description:"현재 채널을 보스 컷/출석 채널로 설정합니다.", options:[{name:"범위",description:"전체/월드/특정 서버",type:3,required:false,choices:scopeChoices},{name:"서버",description:"범위가 서버일 때 선택",type:3,required:false,autocomplete:true}] },
    { name:"보스알림테스트", type:1, description:"설정된 보스알림 채널로 테스트 메시지를 보냅니다.", options:[{name:"범위",description:"전체/월드/특정 서버",type:3,required:false,choices:scopeChoices},{name:"서버",description:"범위가 서버일 때 선택",type:3,required:false,autocomplete:true}] },
    { name:"등록", type:1, description:"길드를 선택하고 게임 닉네임을 등록하거나 다시 등록합니다." },
    { name:"보스확인", type:1, description:"월드보스와 내 서버 보스의 컷/예정 시간을 확인합니다." },
    { name:"컷", type:1, description:"보스 컷을 등록합니다. 시각 생략 시 지금 컷입니다.", options:[{name:"보스",description:"컷한 보스",type:3,required:true,autocomplete:true},{name:"시각",description:"지난 컷이면 HH:MM",type:3,required:false}] },
    { name:"젠", type:1, description:"다음 젠 시각을 지정하거나 제거합니다.", options:[{name:"보스",description:"보스",type:3,required:true,autocomplete:true},{name:"시각",description:"HH:MM · 생략하면 제거",type:3,required:false}] },
    { name:"보스등록", type:1, description:"월드/서버 보스를 등록합니다. 연합운영진 이상.", options:[
      {name:"이름",description:"보스명",type:3,required:true},
      {name:"범위",description:"월드 또는 서버",type:3,required:true,choices:[choice("월드","WORLD"),choice("서버","SERVER")]},
      {name:"유형",description:"쿨타임/매일고정/요일고정",type:3,required:true,choices:[choice("쿨타임","cooldown"),choice("매일 고정","fixed"),choice("요일 고정","weekly")]},
      {name:"값",description:"쿨타임=5 / 매일=06:00,18:00 / 요일=SAT@00:00",type:3,required:true},
      {name:"서버",description:"서버보스면 선택",type:3,required:false,autocomplete:true},
      {name:"출석",description:"출석 사용 여부",type:5,required:false}
    ]},
    { name:"보스수정", type:1, description:"보스 설정을 수정합니다. 연합운영진 이상.", options:[
      {name:"보스",description:"수정할 보스",type:3,required:true,autocomplete:true},
      {name:"새이름",description:"새 보스명",type:3,required:false},
      {name:"범위",description:"월드 또는 서버",type:3,required:false,choices:[choice("월드","WORLD"),choice("서버","SERVER")]},
      {name:"서버",description:"서버보스면 선택",type:3,required:false,autocomplete:true},
      {name:"유형",description:"쿨타임/매일고정/요일고정",type:3,required:false,choices:[choice("쿨타임","cooldown"),choice("매일 고정","fixed"),choice("요일 고정","weekly")]},
      {name:"값",description:"쿨타임=5 / 매일=06:00,18:00 / 요일=SAT@00:00",type:3,required:false},
      {name:"출석",description:"출석 사용 여부",type:5,required:false},
      {name:"알림",description:"10·5·1분/젠 알림 전체",type:5,required:false}
    ]},
    { name:"보스제거", type:1, description:"보스를 비활성화합니다. 연합운영진 이상.", options:[{name:"보스",description:"비활성화할 보스",type:3,required:true,autocomplete:true}] },
    { name:"출석종료", type:1, description:"진행 중인 보스 출석을 즉시 종료합니다.", options:[{name:"보스",description:"출석 종료할 보스",type:3,required:true,autocomplete:true}] },
    { name:"참여삭제", type:1, description:"잘못 참여 처리된 인원을 출석에서 제외합니다.", options:[{name:"보스",description:"진행 중인 보스",type:3,required:true,autocomplete:true},{name:"닉네임",description:"제외할 게임 닉네임",type:3,required:true}] },
    { name:"내출석", type:1, description:"내 월간 보스 출석을 확인합니다.", options:[{name:"월",description:"예: 2026-09",type:3,required:false}] },
    { name:"연합공지", type:1, description:"연합 공지를 등록합니다. 연합운영진 이상.", options:[{name:"제목",description:"공지 제목",type:3,required:true},{name:"내용",description:"공지 내용",type:3,required:true},{name:"고정",description:"상단 고정",type:5,required:false}] },
    { name:"길드공지", type:1, description:"내 길드 공지를 등록합니다.", options:[{name:"제목",description:"공지 제목",type:3,required:true},{name:"내용",description:"공지 내용",type:3,required:true},{name:"고정",description:"상단 고정",type:5,required:false}] },
    { name:"공지확인", type:1, description:"연합 또는 길드 공지를 확인합니다.", options:[{name:"범위",description:"연합 또는 길드",type:3,required:true,choices:[choice("연합","alliance"),choice("길드","guild")]}] },
    { name:"길드원확인", type:1, description:"내 길드의 활성 길드원을 확인합니다." },
    { name:"길드원추가", type:1, description:"길드원을 수동 등록합니다.", options:[{name:"닉네임",description:"게임 닉네임",type:3,required:true},{name:"직급",description:"길드 직급",type:3,required:false,choices:[choice("길드원","길드원"),choice("운영진","운영진"),choice("부길드장","부길드장"),choice("길드장","길드장")]}] },
    { name:"아이템내역", type:1, description:"내 길드의 최근 아이템 기록을 확인합니다." },
    { name:"아이템등록", type:1, description:"내 길드 아이템을 등록합니다.", options:[{name:"이름",description:"아이템명",type:3,required:true},{name:"수량",description:"수량",type:4,required:false,min_value:1},{name:"상태",description:"상태",type:3,required:false,choices:[choice("보유","보유"),choice("판매완료","판매완료"),choice("지급완료","지급완료")]},{name:"판매금액",description:"판매금액",type:4,required:false,min_value:0},{name:"메모",description:"메모",type:3,required:false}] },
    { name:"아이템판매", type:1, description:"아이템을 판매완료로 변경합니다.", options:[{name:"아이템",description:"판매한 아이템",type:3,required:true,autocomplete:true},{name:"금액",description:"판매금액",type:4,required:true,min_value:1}] },
    { name:"길드비용현황", type:1, description:"내 길드 금고 잔액을 확인합니다." },
    { name:"길드비용", type:1, description:"내 길드 금고 수입/지출을 등록합니다.", options:[{name:"유형",description:"수입 또는 지출",type:3,required:true,choices:[choice("기타 수입","other_income"),choice("길드 지출","expense")]},{name:"금액",description:"금액",type:4,required:true,min_value:1},{name:"메모",description:"사유",type:3,required:false}] },
    { name:"참여통계", type:1, description:"내 길드의 기간별 보스 참여 통계를 확인합니다.", options:[{name:"시작",description:"YYYY-MM-DD",type:3,required:false},{name:"종료",description:"YYYY-MM-DD",type:3,required:false}] },
    { name:"정산조회", type:1, description:"내 길드 판매금액과 참여기록을 집계합니다.", options:[{name:"시작",description:"YYYY-MM-DD",type:3,required:false},{name:"종료",description:"YYYY-MM-DD",type:3,required:false}] }
  ];
}



async function registerCommands(env, guildId) {
  const res = await fetch(`https://discord.com/api/v10/applications/${APPLICATION_ID}/guilds/${guildId}/commands`, {
    method: "PUT",
    headers: botHeaders(env),
    body: JSON.stringify(commands())
  });
  if (!res.ok) throw new Error(`Discord 명령 등록 실패 ${res.status}: ${await res.text()}`);
  return res.json();
}

function getOption(interaction, name) {
  const o = (interaction.data?.options || []).find(x => x.name === name);
  return o ? o.value : "";
}

function getModalValue(interaction, customId) {
  const rows = interaction.data?.components || [];
  for (const row of rows) {
    const c = row.component || row.components?.[0];
    if (!c || c.custom_id !== customId) continue;
    if (Array.isArray(c.values)) return c.values[0] || "";
    return c.value || "";
  }
  return "";
}

function isManager(interaction) {
  try {
    const p = BigInt(interaction.member?.permissions || "0");
    return (p & 8n) === 8n || (p & 32n) === 32n;
  } catch { return false; }
}

function requireManager(interaction) {
  if (!isManager(interaction)) throw new Error("이 명령은 서버 관리 권한이 있는 운영진만 사용할 수 있습니다.");
}

function registrationModal(config) {
  const guilds = (config?.guilds || []).slice(0, 25);
  if (!guilds.length) throw new Error("본체에 등록된 활성 길드가 없습니다.");
  return {
    type: 9,
    data: {
      custom_id: "guildcore_register",
      title: "GuildCore 등록",
      components: [
        {
          type: 18,
          label: "소속 길드",
          description: "현재 소속된 길드를 선택하세요.",
          component: {
            type: 3,
            custom_id: "guild_id",
            placeholder: "길드를 선택하세요",
            required: true,
            min_values: 1,
            max_values: 1,
            options: guilds.map(g => ({ label: g.guild_name, value: g.guild_id, description: `[${g.discord_tag}]` }))
          }
        },
        {
          type: 18,
          label: "게임 닉네임",
          description: "ECLIPSE에서 실제 사용하는 닉네임을 입력하세요.",
          component: {
            type: 4,
            custom_id: "game_nickname",
            style: 1,
            min_length: 1,
            max_length: 24,
            placeholder: "예: 조훈",
            required: true
          }
        }
      ]
    }
  };
}

async function getGuildRoles(env, guildId) {
  const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, { headers: botHeaders(env, false) });
  if (!res.ok) throw new Error(`Discord 역할 조회 실패 ${res.status}: ${await res.text()}`);
  return res.json();
}

async function addRole(env, guildId, userId, roleId) {
  const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}/roles/${roleId}`, { method: "PUT", headers: botHeaders(env, false) });
  if (!r.ok) throw new Error(`역할 부여 실패 ${r.status}: ${await r.text()}`);
}

async function removeRole(env, guildId, userId, roleId) {
  const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}/roles/${roleId}`, { method: "DELETE", headers: botHeaders(env, false) });
  if (!r.ok && r.status !== 404) throw new Error(`역할 제거 실패 ${r.status}: ${await r.text()}`);
}

async function changeNickname(env, guildId, userId, nickname) {
  const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
    method: "PATCH",
    headers: botHeaders(env),
    body: JSON.stringify({ nick: nickname })
  });
  return { ok: r.ok, status: r.status, text: r.ok ? "" : await r.text() };
}

async function editOriginal(interaction, payload) {
  const r = await fetch(`https://discord.com/api/v10/webhooks/${APPLICATION_ID}/${interaction.token}/messages/@original`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!r.ok) console.log("editOriginal failed", r.status, await r.text());
}

async function applyRegistration(interaction, env, selectedGuildId, nickname) {
  const discordGuildId = interaction.guild_id;
  const userId = interaction.member?.user?.id;
  const username = interaction.member?.user?.global_name || interaction.member?.user?.username || "";
  selectedGuildId = String(selectedGuildId || "").trim();
  nickname = String(nickname || "").trim();
  if (!userId || !selectedGuildId || !nickname) throw new Error("등록 정보가 부족합니다.");

  const data = await apiCall(env, discordGuildId, "register_member", {
    discord_user_id: userId,
    discord_username: username,
    guild_id: selectedGuildId,
    game_nickname: nickname
  });

  const roles = await getGuildRoles(env, discordGuildId);
  const allianceRole = roles.find(r => r.name === data.alliance_role_name);
  const selectedRole = data.discord_role_id ? roles.find(r => r.id === data.discord_role_id) : roles.find(r => r.name === data.discord_role_name);
  if (!allianceRole) throw new Error(`Discord 역할 '${data.alliance_role_name}'을 찾을 수 없습니다.`);
  if (!selectedRole) throw new Error(`Discord 역할 '${data.discord_role_name}'을 찾을 수 없습니다.`);

  const oldGuildRoleIds = roles.filter(r => (data.all_guild_role_names || []).includes(r.name) && r.id !== selectedRole.id).map(r => r.id);
  for (const roleId of oldGuildRoleIds) await removeRole(env, discordGuildId, userId, roleId);
  await addRole(env, discordGuildId, userId, allianceRole.id);
  await addRole(env, discordGuildId, userId, selectedRole.id);
  const nickResult = await changeNickname(env, discordGuildId, userId, data.discord_display_name);

  await refreshConfig(env, discordGuildId);

  let content = `✅ ${data.reregistered ? "재등록" : "등록"} 완료\n길드: ${data.guild_name}\n닉네임: ${data.discord_display_name}`;
  if (!nickResult.ok) content += "\n\n⚠️ 본체 저장/역할 등록은 완료됐지만 Discord 닉네임 자동변경은 실패했습니다. 서버 소유자 계정은 봇이 닉네임을 바꿀 수 없습니다.";
  return { content };
}

async function completeRegistration(interaction, env) {
  return applyRegistration(
    interaction,
    env,
    getModalValue(interaction, "guild_id"),
    getModalValue(interaction, "game_nickname")
  );
}


async function beginRegistration(interaction, env) {
  const config = await getConfig(env, interaction.guild_id);
  const guilds = (config?.guilds || []).slice(0, 25);
  if (!guilds.length) throw new Error("등록 가능한 활성 길드가 없습니다.");
  return {
    content:"🏰 소속 길드를 선택하세요.",
    components:[{type:1,components:[{type:3,custom_id:"register_guild_select",placeholder:"길드를 선택하세요",min_values:1,max_values:1,options:guilds.map(g=>({label:String(g.guild_name||g.guild_id).slice(0,100),value:String(g.guild_id),description:String(g.server_name||g.game_server_name||g.discord_tag||"").slice(0,100)}))}]}]
  };
}
function nicknameRegistrationModal(guildId) {
  return {type:9,data:{custom_id:`register_nickname:${guildId}`,title:"GuildCore 등록",components:[{type:1,components:[{type:4,custom_id:"game_nickname",label:"게임 닉네임",style:1,min_length:1,max_length:24,placeholder:"게임에서 사용하는 닉네임",required:true}]}]}};
}

async function completeDirectRegistration(interaction, env) {
  const guildQuery = String(getOption(interaction, "길드") || "").trim();
  const nickname = String(getOption(interaction, "닉네임") || "").trim();
  if (!guildQuery || !nickname) throw new Error("길드와 게임 닉네임을 입력하세요.");

  const config = await getConfig(env, interaction.guild_id);
  const guilds = config?.guilds || [];
  const q = guildQuery.toLowerCase();
  let matched = guilds.find(g => String(g.guild_id || "").toLowerCase() === q);
  if (!matched) matched = guilds.find(g => String(g.guild_name || "").trim().toLowerCase() === q);
  if (!matched) {
    const partial = guilds.filter(g => String(g.guild_name || "").toLowerCase().includes(q));
    if (partial.length === 1) matched = partial[0];
  }
  if (!matched) {
    const names = guilds.map(g => g.guild_name).filter(Boolean).join(", ");
    throw new Error(`길드를 찾을 수 없습니다: ${guildQuery}${names ? `\n사용 가능: ${names}` : ""}`);
  }
  return applyRegistration(interaction, env, matched.guild_id, nickname);
}

function discordHelpContent() {
  return [
    "📌 **GuildCore Discord 명령어**",
    "",
    "**기본/보스**",
    "`/등록` → 길드 선택 → 게임 닉네임 입력 · `/보스확인` · `/컷` · `/젠` · `/내출석`",
    "`/출석종료` · `/참여삭제`",
    "",
    "**보스 설정 · 연합운영진+**",
    "`/보스등록` · `/보스수정` · `/보스제거`",
    "",
    "**공지/길드**",
    "`/연합공지` · `/길드공지` · `/공지확인` · `/길드원확인` · `/길드원추가`",
    "",
    "**아이템/자금/통계**",
    "`/아이템내역` · `/아이템등록` · `/아이템판매`",
    "`/길드비용현황` · `/길드비용` · `/참여통계` · `/정산조회`",
    "",
    "**Discord 연결 관리**",
    "`/서버연결` · `/서버연결해제` · `/보스알림채널설정` · `/출석채널설정` · `/보스알림테스트`",
    "",
    "보스 출석은 컷 후 10분에 자동 종료되며 운영진이 먼저 종료할 수도 있습니다."
  ].join("\n");
}



function attendanceComponents(eventId) {
  return [{ type: 1, components: [
    { type: 2, style: 3, label: "참여", custom_id: `attend:${eventId}` },
    { type: 2, style: 4, label: "취소", custom_id: `cancel:${eventId}` }
  ] }];
}

function attendanceContent(data) {
  const people = data?.participants || [];
  const hhmm = v => v ? String(v).slice(-5) : "-";
  const names = people.map(p=>String(p.nickname||"")).filter(Boolean);
  let body = names.length ? names.join(" · ") : "아직 참여자가 없습니다.";
  if (String(data?.attendance_status || "open") !== "open") {
    if (String(data?.boss_scope || "WORLD") === "WORLD" && people.length) {
      const groups = {};
      people.forEach(p=>{ const k=String(p.server_name||"서버"); (groups[k]||(groups[k]=[])).push(String(p.nickname||"")); });
      body = Object.keys(groups).sort().map(k=>`[${k}] ${groups[k].filter(Boolean).join(" · ")}`).join("\n") || body;
    }
    return `${data.boss_name}\n컷 ${hhmm(data.cut_at)}\n예정 ${hhmm(data.next_spawn_at)}\n출석 종료 · 참여 ${people.length}명${body ? `\n\n${body}` : ""}`.slice(0,1950);
  }
  return `${data.boss_name}\n컷 ${hhmm(data.cut_at)}\n예정 ${hhmm(data.next_spawn_at)}\n참여 ${people.length}명\n\n${body}`.slice(0,1950);
}



function bossListContent(bosses) {
  if (!bosses?.length) return "등록된 활성 보스가 없습니다.";
  const hhmm = v => v ? String(v).slice(-5) : "-";
  const groups = {};
  bosses.forEach(b=>{
    const key = String(b.boss_scope||"WORLD") === "WORLD" ? "월드" : String(b.server_name||"서버");
    (groups[key]||(groups[key]=[])).push(b);
  });
  const keys = Object.keys(groups).sort((a,b)=>a==="월드"?-1:(b==="월드"?1:a.localeCompare(b,"ko")));
  return keys.map(k=>{
    const rows = groups[k].sort((a,b)=>String(a.next_spawn_at||"9999").localeCompare(String(b.next_spawn_at||"9999"))).map(b=>`${b.boss_name} · 컷 ${hhmm(b.last_kill_at)} · 예정 ${hhmm(b.next_spawn_at)}`);
    return `**[${k}]**\n${rows.join("\n")}`;
  }).join("\n\n").slice(0,1950);
}



function dateDefaults() {
  const d = new Date();
  const p = n => String(n).padStart(2,"0");
  const end = `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;
  const start = `${d.getFullYear()}-${p(d.getMonth()+1)}-01`;
  return { start, end };
}

function lootListContent(data) {
  const rows = data?.loot || [];
  if (!rows.length) return "등록된 아이템이 없습니다.";
  return rows.slice(0,30).map(x => `• ${x.item_name} ×${x.quantity} · ${x.status}${x.sale_amount ? ` · ${Number(x.sale_amount).toLocaleString()}` : ""}`).join("\n").slice(0,1900);
}

async function handleCommandAsync(interaction, env) {
  const name = interaction.data?.name;
  const discordGuildId = interaction.guild_id;
  const userId = interaction.member?.user?.id || "";
  const actor = {discord_user_id:userId};
  const clearBossCache = async()=>{ try{await caches.default.delete(new Request(`https://guildcore.cache/bosses:${discordGuildId}`));}catch(_){}};
  const hhmm = v => v ? String(v).slice(-5) : "-";

  if (name === "서버연결") {
    requireManager(interaction);
    const r = await apiCall(env, discordGuildId, "discord_bind_alliance", {query:getOption(interaction,"연합")});
    try{await caches.default.delete(new Request(`https://guildcore.cache/config:${discordGuildId}`));}catch(_){}
    await clearBossCache();
    await cachePut(`config:${discordGuildId}`, await apiCall(env,discordGuildId,"config"),120);
    return {content:`✅ 이 Discord 서버를 **${r.alliance_name}** 연합에 연결했습니다.`};
  }
  if (name === "서버연결해제") {
    requireManager(interaction);
    const r=await apiCall(env,discordGuildId,"discord_unbind_alliance",{});
    try{await caches.default.delete(new Request(`https://guildcore.cache/config:${discordGuildId}`));}catch(_){}
    await clearBossCache();
    return {content:`✅ Discord 서버 연결을 해제했습니다.${r.alliance_name?`\n기존 연합: ${r.alliance_name}`:""}`};
  }
  if (name === "핑") { const h=await apiCall(env,discordGuildId,"health"); return {content:`✅ GuildCore 정상 연결\n연합: ${h.alliance_id}`}; }
  if (name === "도움") return {content:discordHelpContent()};
  if (name === "등록") return await beginRegistration(interaction, env);

  if (name === "보스알림채널설정" || name === "출석채널설정") {
    requireManager(interaction);
    const scope=String(getOption(interaction,"범위")||"ALL").toUpperCase(), serverId=String(getOption(interaction,"서버")||"");
    if(scope==="SERVER"&&!serverId) throw new Error("범위가 서버이면 서버를 선택하세요.");
    const kind=name==="출석채널설정"?"attendance":"alert";
    const r=await apiCall(env,discordGuildId,"discord_channel_set",{kind,scope,server_id:serverId,channel_id:interaction.channel_id});
    await cachePut(`config:${discordGuildId}`,r.config||await apiCall(env,discordGuildId,"config"),120);
    const label=scope==="WORLD"?"월드":scope==="SERVER"?(r.config?.servers||[]).find(x=>x.server_id===serverId)?.server_name||"서버":"전체";
    return {content:`✅ <#${interaction.channel_id}> · ${label} ${kind==="alert"?"보스알림":"출석"} 채널 설정 완료`};
  }
  if (name === "보스알림테스트") {
    requireManager(interaction);
    const cfg=await refreshConfig(env,discordGuildId),scope=String(getOption(interaction,"범위")||"ALL").toUpperCase(),serverId=String(getOption(interaction,"서버")||"");
    const rows=cfg.channels||[];
    let target="";
    const pick=(sc,sid)=>{const x=rows.find(c=>String(c.kind)==="alert"&&String(c.scope)==sc&&String(c.server_id||"")===String(sid||""));return x?String(x.channel_id||""):""};
    if(scope==="SERVER") target=pick("SERVER",serverId)||pick("ALL","");
    else if(scope==="WORLD") target=pick("WORLD","")||pick("ALL","");
    else target=pick("ALL","")||String(cfg.discord_alert_channel_id||"");
    if(!target) throw new Error("해당 범위의 보스알림 채널이 아직 설정되지 않았습니다.");
    await sendChannelMessage(env,target,"🔔 GuildCore 보스알림 테스트");
    return {content:`✅ <#${target}> 로 테스트 알림을 보냈습니다.`};
  }

  if (name === "보스확인") {
    const bosses=await apiCall(env,discordGuildId,"bosses",actor);await cachePut(`bosses:${discordGuildId}:${userId}`,bosses,15);
    return {content:`⏰ **보스 현황**\n${bossListContent(bosses)}`};
  }
  if (name === "컷") {
    const cut=await apiCall(env,discordGuildId,"boss_cut",{...actor,boss:getOption(interaction,"보스"),cut_at:getOption(interaction,"시각")||""});
    await clearBossCache();
    const brief=`${cut.boss_name}\n컷 ${hhmm(cut.cut_at)}\n예정 ${hhmm(cut.next_spawn_at)}`;
    if(!cut.event_id) return {content:brief};
    const list=await apiCall(env,discordGuildId,"attendance_list",{event_id:cut.event_id});
    const msg={content:attendanceContent(list),components:attendanceComponents(cut.event_id)};
    const target=String(cut.attendance_channel_id||interaction.channel_id||"");
    if(!target) throw new Error("출석 메시지를 보낼 채널을 찾을 수 없습니다.");
    const sent=await sendChannelMessage(env,target,msg);
    if(sent?.id) await apiCall(env,discordGuildId,"attendance_message_link",{event_id:cut.event_id,message_id:sent.id,channel_id:target});
    return {content:`${brief}\n출석 → <#${target}>`};
  }
  if (name === "젠") {
    const r=await apiCall(env,discordGuildId,"boss_spawn",{...actor,boss:getOption(interaction,"보스"),spawn_at:getOption(interaction,"시각")||""});await clearBossCache();
    return {content:`${r.boss_name}\n예정 ${hhmm(r.next_spawn_at)}`};
  }
  if (name === "보스등록") {
    const scope=String(getOption(interaction,"범위")||"WORLD"),serverId=String(getOption(interaction,"서버")||"");if(scope==="SERVER"&&!serverId)throw new Error("서버보스는 서버를 선택하세요.");
    const r=await apiCall(env,discordGuildId,"boss_add",{...actor,boss_name:getOption(interaction,"이름"),boss_scope:scope,server_id:serverId,boss_type:getOption(interaction,"유형"),time_value:getOption(interaction,"값"),attendance_enabled:getOption(interaction,"출석")===""?true:getOption(interaction,"출석"),notify_enabled:true,alert_10m:true,alert_5m:true,alert_1m:true,alert_spawn:true});await clearBossCache();
    return {content:`✅ ${r.boss_name} 등록 완료`};
  }
  if (name === "보스수정") {
    const p={...actor,boss:getOption(interaction,"보스")};
    [["새이름","boss_name"],["범위","boss_scope"],["서버","server_id"],["유형","boss_type"],["값","time_value"],["출석","attendance_enabled"]].forEach(([o,k])=>{const v=getOption(interaction,o);if(v!=="")p[k]=v;});
    const alarm=getOption(interaction,"알림");if(alarm!=="")Object.assign(p,{notify_enabled:alarm,alert_10m:alarm,alert_5m:alarm,alert_1m:alarm,alert_spawn:alarm});
    const r=await apiCall(env,discordGuildId,"boss_update",p);await clearBossCache();return {content:`✅ ${r.message}`};
  }
  if (name === "보스제거") {const r=await apiCall(env,discordGuildId,"boss_disable",{...actor,boss:getOption(interaction,"보스")});await clearBossCache();return {content:`✅ ${r.boss_name} · ${r.message}`};}
  if (name === "출석종료") {
    const r=await apiCall(env,discordGuildId,"attendance_close",{...actor,boss:getOption(interaction,"보스")});
    if(r.discord_message_id&&r.discord_channel_id&&r.summary) await editChannelMessage(env,r.discord_channel_id,r.discord_message_id,{content:r.summary,components:[]});
    else if(r.summary){const ch=String(r.discord_channel_id||interaction.channel_id||"");if(ch)await sendChannelMessage(env,ch,{content:r.summary,components:[]});}
    if(r.result_id) await apiCall(env,discordGuildId,"attendance_results_mark",{target:"discord",result_ids:[r.result_id],status:"sent",note:"수동 종료 즉시 반영"});
    return {content:`✅ ${r.boss_name||"보스"} 출석 종료`};
  }
  if (name === "참여삭제") {
    const r=await apiCall(env,discordGuildId,"attendance_remove",{...actor,boss:getOption(interaction,"보스"),nickname:getOption(interaction,"닉네임")});
    const list=r.attendance||await apiCall(env,discordGuildId,"attendance_list",{event_id:r.event_id});
    if(list.discord_message_id&&list.discord_channel_id) await editChannelMessage(env,list.discord_channel_id,list.discord_message_id,{content:attendanceContent(list),components:attendanceComponents(list.event_id)});
    return {content:`✅ ${r.message}`};
  }
  if (name === "내출석") {const r=await apiCall(env,discordGuildId,"my_attendance",{...actor,month:getOption(interaction,"월")||""});return {content:`📊 **${r.month} 내 출석**\n참여 ${r.count}회 / 전체 ${r.total_events}회 · ${r.rate}%`};}

  if (name === "연합공지") {const r=await apiCall(env,discordGuildId,"alliance_notice_add",{...actor,title:getOption(interaction,"제목"),content:getOption(interaction,"내용"),pinned:getOption(interaction,"고정")||false});return {content:`✅ ${r.message}`};}
  if (name === "길드공지") {const r=await apiCall(env,discordGuildId,"guild_notice_add",{...actor,title:getOption(interaction,"제목"),content:getOption(interaction,"내용"),pinned:getOption(interaction,"고정")||false});return {content:`✅ ${r.message}`};}
  if (name === "공지확인") {const scope=getOption(interaction,"범위"),r=scope==="alliance"?await apiCall(env,discordGuildId,"alliance_notices",{}):await apiCall(env,discordGuildId,"guild_notices",actor);const list=(r.notices||[]).slice(0,10).map(x=>`${x.pinned?"📌 ":""}${x.title}${x.content?` · ${x.content}`:""}`).join("\n")||"등록된 공지가 없습니다.";return {content:list.slice(0,1950)};}
  if (name === "길드원확인") {const r=await apiCall(env,discordGuildId,"guild_members",actor),list=(r.members||[]).map(x=>`${x.nickname}(${x.role})`).join(" · ")||"등록된 길드원이 없습니다.";return {content:`👥 ${r.members?.length||0}명\n${list}`.slice(0,1950)};}
  if (name === "길드원추가") {const r=await apiCall(env,discordGuildId,"guild_member_add",{...actor,nickname:getOption(interaction,"닉네임"),role:getOption(interaction,"직급")||"길드원"});return {content:`✅ ${r.message}`};}
  if (name === "아이템내역") {const r=await apiCall(env,discordGuildId,"loot_list",actor);return {content:`🧾 **아이템 내역**\n${lootListContent(r)}`};}
  if (name === "아이템등록") {const r=await apiCall(env,discordGuildId,"loot_add",{...actor,item_name:getOption(interaction,"이름"),quantity:getOption(interaction,"수량")||1,status:getOption(interaction,"상태")||"보유",sale_amount:getOption(interaction,"판매금액")||0,note:getOption(interaction,"메모")||""});return {content:`✅ ${r.message}`};}
  if (name === "아이템판매") {const r=await apiCall(env,discordGuildId,"loot_mark_sold",{...actor,loot_id:getOption(interaction,"아이템"),sale_amount:getOption(interaction,"금액")});return {content:`✅ ${r.message}`};}
  if (name === "길드비용현황") {const r=await apiCall(env,discordGuildId,"fund_status",actor);return {content:`🏦 현재 잔액 ${Number(r.balance||0).toLocaleString()} 다이아`};}
  if (name === "길드비용") {const r=await apiCall(env,discordGuildId,"fund_add",{...actor,type:getOption(interaction,"유형"),amount:getOption(interaction,"금액"),memo:getOption(interaction,"메모")||""});return {content:`✅ ${r.message}\n현재 잔액 ${Number(r.balance||0).toLocaleString()} 다이아`};}
  if (name === "참여통계") {const d=dateDefaults(),start=getOption(interaction,"시작")||d.start,end=getOption(interaction,"종료")||d.end,r=await apiCall(env,discordGuildId,"guild_stats",{...actor,start_date:start,end_date:end}),list=(r.ranking||[]).map((x,i)=>`${i+1}. ${x.nickname} · ${x.count}회 · ${x.rate}%`).join("\n")||"참여 기록이 없습니다.";return {content:`📜 **${start} ~ ${end}** · 보스 ${r.total_raids}회\n${list}`.slice(0,1950)};}
  if (name === "정산조회") {const d=dateDefaults(),start=getOption(interaction,"시작")||d.start,end=getOption(interaction,"종료")||d.end,r=await apiCall(env,discordGuildId,"settlement_preview",{...actor,start_date:start,end_date:end}),list=(r.ranking||[]).map(x=>`${x.nickname} · ${x.count}회 · ${x.rate}%`).join(" · ")||"참여 기록이 없습니다.";return {content:`💰 ${start} ~ ${end}\n판매 ${Number(r.total_sales||0).toLocaleString()} · 보스 ${r.total_raids}회\n${list}`.slice(0,1950)};}

  return {content:"지원하지 않는 명령입니다."};
}



async function handleAttendanceButton(interaction, env, attended) {
  const discordGuildId=interaction.guild_id,userId=interaction.member?.user?.id||"",eventId=String(interaction.data?.custom_id||"").split(":")[1]||"";
  await apiCall(env,discordGuildId,"attendance_set",{discord_user_id:userId,event_id:eventId,attended});
  const list=await apiCall(env,discordGuildId,"attendance_list",{event_id:eventId});
  return {content:attendanceContent(list),components:String(list.attendance_status)==="open"?attendanceComponents(eventId):[]};
}



async function autocomplete(interaction, env) {
  const discordGuildId=interaction.guild_id,userId=interaction.member?.user?.id||"",focused=(interaction.data?.options||[]).find(o=>o.focused);
  if(!focused)return {type:8,data:{choices:[]}};
  const q=String(focused.value||"").toLowerCase();
  if(focused.name==="연합"){
    try{const data=await apiCall(env,discordGuildId,"discord_alliance_list",{}),rows=(data.alliances||[]).filter(a=>!q||String(a.alliance_name||"").toLowerCase().includes(q)||String(a.alliance_id||"").toLowerCase().includes(q));return {type:8,data:{choices:rows.slice(0,25).map(a=>({name:`${a.alliance_name} (${a.alliance_id})`,value:a.alliance_id}))}}}catch{return {type:8,data:{choices:[]}}}
  }
  if(focused.name==="서버"){
    try{const data=await apiCall(env,discordGuildId,"servers",{}),rows=(data.servers||[]).filter(s=>!q||String(s.server_name||"").toLowerCase().includes(q));return {type:8,data:{choices:rows.slice(0,25).map(s=>({name:s.server_name,value:s.server_id}))}}}catch{return {type:8,data:{choices:[]}}}
  }
  if(focused.name==="보스"){
    try{const bosses=await apiCall(env,discordGuildId,"bosses",{discord_user_id:userId});return {type:8,data:{choices:(bosses||[]).filter(b=>!q||String(b.boss_name||"").toLowerCase().includes(q)||String(b.server_name||"").toLowerCase().includes(q)).slice(0,25).map(b=>({name:`[${b.boss_scope==="WORLD"?"월드":b.server_name}] ${b.boss_name}`.slice(0,100),value:b.boss_id}))}}}catch{return {type:8,data:{choices:[]}}}
  }
  if(focused.name==="아이템"){
    try{const data=await apiCall(env,discordGuildId,"loot_list",{discord_user_id:userId}),rows=(data.loot||[]).filter(x=>!q||String(x.item_name||"").toLowerCase().includes(q));return {type:8,data:{choices:rows.slice(0,25).map(x=>({name:`${x.item_name} ×${x.quantity} · ${x.status}`.slice(0,100),value:x.loot_id}))}}}catch{return {type:8,data:{choices:[]}}}
  }
  return {type:8,data:{choices:[]}};
}



async function getChannels(env, guildId) {
  const r = await fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, { headers:botHeaders(env,false) });
  if (!r.ok) return [];
  return r.json();
}

async function sendChannelMessage(env, channelId, message) {
  const payload = typeof message === "string" ? {content:message} : (message || {});
  const r = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
    method:"POST",
    headers:botHeaders(env),
    body:JSON.stringify(payload)
  });
  if (!r.ok) throw new Error(`Discord 알림 전송 실패 ${r.status}: ${await r.text()}`);
  try { return await r.json(); } catch { return {}; }
}

async function editChannelMessage(env, channelId, messageId, payload) {
  const r=await fetch(`https://discord.com/api/v10/channels/${channelId}/messages/${messageId}`,{method:"PATCH",headers:botHeaders(env),body:JSON.stringify(payload||{})});
  if(!r.ok)throw new Error(`Discord 메시지 수정 실패 ${r.status}: ${await r.text()}`);
  try{return await r.json();}catch{return {}};
}

async function flushAttendanceResults(env) {
  const discordGuildId=env.DISCORD_SERVER_ID||BOOTSTRAP_GUILD_ID;
  let pulled;try{pulled=await apiCall(env,discordGuildId,"attendance_results_pull",{limit:20,target:"discord"});}catch(e){console.log("attendance result pull error",e.message);return;}
  const done=[];
  for(const r of (pulled.results||[])){
    try{
      if(r.discord_message_id&&r.discord_channel_id) await editChannelMessage(env,r.discord_channel_id,r.discord_message_id,{content:r.message,components:[]});
      else { let ch=String(r.discord_channel_id||""); if(!ch){try{const resolved=await apiCall(env,discordGuildId,"attendance_channel_resolve",{event_id:r.event_id});ch=String(resolved.channel_id||"")}catch(_){}} if(!ch){try{const cfg=await getConfig(env,discordGuildId);ch=String(cfg.discord_attendance_channel_id||"")}catch(_){}} if(ch)await sendChannelMessage(env,ch,{content:r.message,components:[]}); else continue; }
      done.push(r.result_id);
    }catch(e){console.log("attendance result send error",r.result_id,e.message)}
  }
  if(done.length)await apiCall(env,discordGuildId,"attendance_results_mark",{target:"discord",result_ids:done,status:"sent"});
}

async function flushAlerts(env) {
  const discordGuildId=env.DISCORD_SERVER_ID||BOOTSTRAP_GUILD_ID;
  let config,pulled;try{config=await getConfig(env,discordGuildId);pulled=await apiCall(env,discordGuildId,"alerts_pull",{limit:20,target:"discord"});}catch(e){console.log("alert pull/config error",e.message);return;}
  const alerts=pulled.alerts||[];if(!alerts.length)return;
  const channels=await getChannels(env,discordGuildId),fallback=channels.find(c=>c.type===0&&["보스알림","boss-alert","boss-alerts"].includes(String(c.name).toLowerCase().replace(/\s+/g,""))),sent=[];
  for(const a of alerts){
    let targets=String(a.discord_channel_ids||"").split(",").map(x=>x.trim()).filter(Boolean);if(!targets.length&&a.discord_channel_id)targets=[String(a.discord_channel_id)];if(!targets.length&&config.discord_alert_channel_id)targets=[String(config.discord_alert_channel_id)];if(!targets.length&&fallback?.id)targets=[String(fallback.id)];targets=[...new Set(targets)];if(!targets.length)continue;
    let ok=true;for(const target of targets){try{await sendChannelMessage(env,target,a.message);}catch(e){ok=false;console.log("alert send error",a.alert_id,target,e.message)}}
    if(ok&&String(a.alert_type)==="spawn"&&a.attendance_event_id){try{const list=await apiCall(env,discordGuildId,"attendance_list",{event_id:a.attendance_event_id});let attCh=String(a.attendance_channel_id||"");if(!attCh){const resolved=await apiCall(env,discordGuildId,"attendance_channel_resolve",{event_id:a.attendance_event_id});attCh=String(resolved.channel_id||"");}if(attCh){const msg=await sendChannelMessage(env,attCh,{content:attendanceContent(list),components:attendanceComponents(a.attendance_event_id)});if(msg?.id)await apiCall(env,discordGuildId,"attendance_message_link",{event_id:a.attendance_event_id,message_id:msg.id,channel_id:attCh});}}catch(e){ok=false;console.log("scheduled attendance send error",a.alert_id,e.message)}}
    if(ok)sent.push(a.alert_id);
  }
  if(sent.length)await apiCall(env,discordGuildId,"alerts_mark",{alert_ids:sent,status:"sent",target:"discord"});
}




async function handleKakaoHttp(request, env) {
  if (!env.KAKAO_INPUT_KEY) {
    return Response.json(
      { ok:false, error:"KAKAO_INPUT_KEY missing" },
      { status:500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (_) {
    return Response.json(
      { ok:false, error:"JSON 형식 오류" },
      { status:400 }
    );
  }

  if (!body || String(body.key || "") !== String(env.KAKAO_INPUT_KEY)) {
    return Response.json(
      { ok:false, error:"인증 실패" },
      { status:401 }
    );
  }

  const payload = body.payload || {};

  /* 카톡방 최초 연결: 연합 ID를 강제하지 않고 본체에서 이름/활성 연합으로 찾는다. */
  if (String(body.mode || "") === "resolve_alliance") {
    const data = await apiCall(
      env,
      "",
      "kakao_resolve_alliance",
      { query:String(body.alliance_query || "").trim() },
      ""
    );
    return Response.json({ ok:true, data });
  }

  /* 카카오 자동알림 폴링/확인. Discord 상태와 별도로 소비한다. */
  if (String(body.mode || "") === "alerts_pull") {
    const allianceId = String(body.alliance_id || "").trim();
    if (!allianceId) return Response.json({ok:false,error:"연합 ID가 없습니다."},{status:400});
    const data = await apiCall(env, "", "alerts_pull", {
      limit:Number(body.limit || 20),
      target:"kakao"
    }, allianceId);
    return Response.json({ok:true,data});
  }

  if (String(body.mode || "") === "alerts_mark") {
    const allianceId = String(body.alliance_id || "").trim();
    if (!allianceId) return Response.json({ok:false,error:"연합 ID가 없습니다."},{status:400});
    const ids = Array.isArray(body.alert_ids) ? body.alert_ids : [];
    const data = await apiCall(env, "", "alerts_mark", {
      alert_ids:ids,
      status:String(body.status || "sent"),
      note:String(body.note || ""),
      target:"kakao"
    }, allianceId);
    return Response.json({ok:true,data});
  }

  if (String(body.mode || "") === "attendance_results_pull") {
    const allianceId=String(body.alliance_id||"").trim();if(!allianceId)return Response.json({ok:false,error:"연합 ID가 없습니다."},{status:400});
    const data=await apiCall(env,"","attendance_results_pull",{limit:Number(body.limit||20),target:"kakao"},allianceId);return Response.json({ok:true,data});
  }
  if (String(body.mode || "") === "attendance_results_mark") {
    const allianceId=String(body.alliance_id||"").trim();if(!allianceId)return Response.json({ok:false,error:"연합 ID가 없습니다."},{status:400});
    const data=await apiCall(env,"","attendance_results_mark",{result_ids:Array.isArray(body.result_ids)?body.result_ids:[],status:String(body.status||"sent"),note:String(body.note||""),target:"kakao"},allianceId);return Response.json({ok:true,data});
  }

  /* 일반 카톡 명령은 방에 저장된 연합 ID가 반드시 있어야 한다. 기본 alliance_001 폴백 금지. */
  const allianceId = String(body.alliance_id || "").trim();
  if (!allianceId) {
    return Response.json(
      { ok:false, error:"카톡방에 연결된 연합이 없습니다. !핑 연합명 으로 연결하세요." },
      { status:400 }
    );
  }

  const data = await apiCall(
    env,
    "",
    "kakao_command",
    payload,
    allianceId
  );

  return Response.json({ ok:true, data });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/register-commands") {
      try {
        const discordGuildId = env.DISCORD_SERVER_ID || BOOTSTRAP_GUILD_ID;
        const cmds = await registerCommands(env, discordGuildId);
        return Response.json({ ok:true, commands:cmds.map(c=>c.name) });
      } catch (e) {
        return Response.json({ ok:false, error:e.message }, { status:500 });
      }
    }

    if (request.method === "GET" && url.pathname === "/bootstrap") {
      const discordGuildId = env.DISCORD_SERVER_ID || BOOTSTRAP_GUILD_ID;
      const result = { ok:true, commands:[], bridge:{ok:false}, guilds:[], bosses:[] };
      try {
        const cmds = await registerCommands(env, discordGuildId);
        result.commands = cmds.map(c=>c.name);
      } catch (e) {
        result.ok = false;
        result.command_error = e.message;
        return Response.json(result, { status:500 });
      }
      try {
        const config = await refreshConfig(env, discordGuildId);
        const bosses = await apiCall(env, discordGuildId, "bosses");
        await cachePut(`bosses:${discordGuildId}`, bosses, 15);
        result.bridge = { ok:true };
        result.guilds = config.guilds || [];
        result.bosses = (bosses || []).map(b=>b.boss_name);
      } catch (e) {
        result.bridge = { ok:false, error:e.message };
      }
      return Response.json(result);
    }

    if (request.method === "GET") return new Response("GuildCore Discord Worker v3.10 V6 Direct D1 OK");

    // MessengerBotR -> Cloudflare -> GuildCore_INPUT
    // Discord interaction endpoint와 분리하여 Discord 서명 검증을 건드리지 않는다.
    if (request.method === "POST" && url.pathname === "/kakao") {
      try {
        return await handleKakaoHttp(request, env);
      } catch (e) {
        return Response.json(
          { ok:false, error:e.message || String(e) },
          { status:500 }
        );
      }
    }

    if (request.method !== "POST") return new Response("Method Not Allowed", { status:405 });

    const body = await request.text();
    if (!(await verifyDiscordRequest(request, body))) return new Response("Invalid request signature", { status:401 });
    const interaction = JSON.parse(body);

    if (interaction.type === 1) return Response.json({type:1});
    if (interaction.type === 4) return Response.json(await autocomplete(interaction, env));

    if (interaction.type === 3 && interaction.data?.custom_id === "register_guild_select") {
      const selected = String(interaction.data?.values?.[0] || "");
      if (!selected) return Response.json({type:4,data:{flags:64,content:"길드를 선택하세요."}});
      return Response.json(nicknameRegistrationModal(selected));
    }

    if (interaction.type === 5 && String(interaction.data?.custom_id || "").startsWith("register_nickname:")) {
      const selectedGuildId = String(interaction.data.custom_id).split(":")[1] || "";
      const nickname = getModalValue(interaction, "game_nickname");
      ctx.waitUntil((async()=>{
        try { await editOriginal(interaction, await applyRegistration(interaction, env, selectedGuildId, nickname)); }
        catch (e) { await editOriginal(interaction, {content:`❌ 등록 실패\n${e.message}`,components:[]}); }
      })());
      return Response.json({type:5,data:{flags:64}});
    }

    if (interaction.type === 3 && /^(attend|cancel):/.test(interaction.data?.custom_id || "")) {
      const attended = String(interaction.data.custom_id).startsWith("attend:");
      ctx.waitUntil((async()=>{
        try { await editOriginal(interaction, await handleAttendanceButton(interaction, env, attended)); }
        catch (e) { console.log("attendance button error", e.message); }
      })());
      return Response.json({type:6});
    }

    if (interaction.type === 2) {
      const ephemeralNames = new Set(["핑","등록","컷","보스알림채널설정","출석채널설정","보스알림테스트","내출석","보스등록","보스수정","보스제거","출석종료","참여삭제","연합공지","길드공지","공지확인","길드원확인","길드원추가","아이템내역","아이템등록","아이템판매","길드비용현황","길드비용","참여통계","정산조회"]);
      const ephemeral = ephemeralNames.has(interaction.data?.name);
      ctx.waitUntil((async()=>{
        try { await editOriginal(interaction, await handleCommandAsync(interaction, env)); }
        catch (e) { await editOriginal(interaction, {content:`❌ ${e.message}`}); }
      })());
      return Response.json({type:5,data:ephemeral?{flags:64}:{}});
    }

    return Response.json({type:4,data:{flags:64,content:"지원하지 않는 요청입니다."}});
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(Promise.all([flushAlerts(env),flushAttendanceResults(env)]));
  }
};
