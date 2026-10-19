/* GuildCore Kakao recipient routing — pure, opt-in helper.
 * Not wired into the production Worker yet.
 * A binding: {room_id, alliance_id, room_type:'alliance'|'guild', guild_id, server_id, active}.
 * An alert: {alliance_id, boss_scope:'WORLD'|'SERVER', server_id}.
 */
export function resolveKakaoAlertRooms(alert, bindings) {
  const allianceId = String(alert?.alliance_id || '').trim();
  const scope = String(alert?.boss_scope || '').trim().toUpperCase();
  const serverId = String(alert?.server_id || '').trim();
  if (!allianceId || !['WORLD', 'SERVER'].includes(scope)) return [];
  // Fail closed: a SERVER alert without a server identifier must never broadcast.
  if (scope === 'SERVER' && !serverId) return [];
  const seen = new Set();
  const result = [];
  for (const binding of Array.isArray(bindings) ? bindings : []) {
    if (!binding || binding.active !== true) continue;
    if (String(binding.alliance_id || '').trim() !== allianceId) continue;
    const roomId = String(binding.room_id || '').trim();
    if (!roomId || seen.has(roomId)) continue;
    const roomType = String(binding.room_type || '').trim().toLowerCase();
    if (scope === 'WORLD') {
      if (roomType !== 'alliance' && roomType !== 'guild') continue;
    } else {
      if (roomType !== 'guild') continue;
      if (!String(binding.guild_id || '').trim()) continue;
      if (String(binding.server_id || '').trim() !== serverId) continue;
    }
    seen.add(roomId);
    result.push(roomId);
  }
  return result;
}
