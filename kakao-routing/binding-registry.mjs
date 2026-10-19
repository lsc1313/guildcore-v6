/**
 * GuildCore Kakao binding registry — staged helper, NOT wired to public API.
 * Caller must verify admin authorization AND ownership of alliance/guild/server
 * before invoking writes. This module cannot itself authenticate a caller.
 */
const clean = (value) => String(value ?? '').trim();
const validId = (value) => value.length > 0 && value.length <= 256;
export async function listKakaoBindings(db, allianceId) {
  const aid = clean(allianceId);
  if (!validId(aid)) throw new Error('Invalid alliance ID');
  const {results = []} = await db.prepare(
    'SELECT binding_id,alliance_id,room_id,room_type,guild_id,server_id,send_alias,active,created_at,updated_at FROM kakao_room_bindings_v2 WHERE alliance_id=? ORDER BY room_type,guild_id,room_id'
  ).bind(aid).all();
  return results;
}
export async function saveKakaoBinding(db, record) {
  const aid = clean(record?.alliance_id);
  const room = clean(record?.room_id);
  const type = clean(record?.room_type).toLowerCase();
  const guild = clean(record?.guild_id);
  const server = clean(record?.server_id);
  const alias = clean(record?.send_alias);
  if (![aid,room].every(validId) || !['alliance','guild'].includes(type)) throw new Error('Invalid binding');
  if (type === 'alliance' && (guild || server)) throw new Error('Alliance room cannot have guild/server');
  if (type === 'guild' && (![guild,server].every(validId))) throw new Error('Guild room requires guild and server');
  if (alias.length > 256) throw new Error('Alias too long');
  // Validate membership using existing authoritative tables, not client input.
  if (type === 'guild') {
    const member = await db.prepare('SELECT guild_id,server_id FROM guilds WHERE guild_id=? AND alliance_id=? AND status='active'').bind(guild,aid).first();
    const srv = await db.prepare('SELECT server_id FROM alliance_servers WHERE server_id=? AND alliance_id=? AND enabled=1').bind(server,aid).first();
    if (!member || !srv || String(member.server_id || '') !== server) throw new Error('Guild/server mismatch or not in alliance');
  }
  const now = new Date().toISOString();
  const bindingId = 'kakao_' + crypto.randomUUID();
  await db.prepare(
    `INSERT INTO kakao_room_bindings_v2(binding_id,alliance_id,room_id,room_type,guild_id,server_id,send_alias,active,created_at,updated_at)
     VALUES(?,?,?,?,?,?,?,1,?,?)
     ON CONFLICT(alliance_id,room_id) DO UPDATE SET room_type=excluded.room_type,guild_id=excluded.guild_id,server_id=excluded.server_id,send_alias=excluded.send_alias,active=1,updated_at=excluded.updated_at`
  ).bind(bindingId,aid,room,type,guild,server,alias,now,now).run();
  return {alliance_id:aid,room_id:room,active:true};
}
export async function disableKakaoBinding(db, allianceId, roomId) {
  const aid=clean(allianceId),room=clean(roomId);
  if (![aid,room].every(validId)) throw new Error('Invalid binding key');
  const result = await db.prepare('UPDATE kakao_room_bindings_v2 SET active=0,updated_at=? WHERE alliance_id=? AND room_id=?').bind(new Date().toISOString(),aid,room).run();
  return {updated: Number(result.meta?.changes || 0)};
}
