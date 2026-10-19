/**
 * Parses the user's simple Kakao room binding syntax without changing
 * personal Kakao IDs or existing attendance commands.
 *
 * !핑 숭배       -> alliance room
 * !핑 숭배 숭배  -> guild room in the alliance
 *
 * The caller must resolve names against its own trusted database and must
 * preserve the room's original sender/registrant ID on subsequent pings.
 */
export function parseKakaoPingBinding(text) {
  const parts=String(text??'').trim().split(/\s+/).filter(Boolean);
  if(parts[0]!=='!핑')return null;
  if(parts.length<2||parts.length>3)throw new Error('사용법: !핑 연합명 [길드명]');
  const alliance_name=parts[1],guild_name=parts[2]||'';
  if(alliance_name.length>80||guild_name.length>80)throw new Error('연합 또는 길드명이 너무 깁니다.');
  return {room_type:guild_name?'guild':'alliance',alliance_name,guild_name};
}
