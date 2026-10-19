import { resolveKakaoAlertRooms } from './resolve-recipients.mjs';

/**
 * Read-only server-side routing preparation.
 * db: D1Database. This helper does not claim, mark, or send queue items.
 * It deliberately does not fall back to alliance-wide delivery if a SERVER
 * alert has no matching guild binding.
 */
export async function previewKakaoRecipients(db, alert) {
  if (!db || !alert || !String(alert.alliance_id || '').trim()) {
    return {room_ids: [], routing_enabled: false};
  }
  const allianceId = String(alert.alliance_id).trim();
  const {results = []} = await db.prepare(
    'SELECT room_id,alliance_id,room_type,guild_id,server_id,active FROM kakao_room_bindings_v2 WHERE alliance_id=? AND active=1'
  ).bind(allianceId).all();
  const roomIds = resolveKakaoAlertRooms(alert, results.map(row => ({
    ...row, active: Number(row.active) === 1
  })));
  return {room_ids: roomIds, routing_enabled: true};
}
