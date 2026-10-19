import { listKakaoBindings, saveKakaoBinding, disableKakaoBinding } from './binding-registry.mjs';

/**
 * Authenticated binding operations, staged for later integration.
 * Authorization must be supplied by the existing trusted Worker session
 * verifier; no user-supplied role string is accepted as proof.
 */
export async function kakaoBindingOperation(db, request, verifyAllianceAdmin) {
  const operation = String(request?.operation || '');
  const allianceId = String(request?.alliance_id || '').trim();
  if (!['list','save','disable'].includes(operation) || !allianceId) {
    throw new Error('Invalid Kakao binding operation');
  }
  if (typeof verifyAllianceAdmin !== 'function') {
    throw new Error('Admin authorization unavailable');
  }
  const authorized = await verifyAllianceAdmin(allianceId);
  if (authorized !== true) throw new Error('Alliance administrator required');
  if (operation === 'list') return {bindings: await listKakaoBindings(db,allianceId)};
  if (operation === 'disable') {
    return disableKakaoBinding(db,allianceId,request.room_id);
  }
  // The alliance_id is always taken from the authenticated operation scope,
  // not from a nested, potentially attacker-controlled record.
  return saveKakaoBinding(db,{...request.binding,alliance_id:allianceId});
}
