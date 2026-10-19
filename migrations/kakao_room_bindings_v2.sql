-- GuildCore Kakao room bindings (additive migration, NOT applied automatically)
-- Apply only after reviewing live D1 schema and Kakao bot client identifiers.
CREATE TABLE IF NOT EXISTS kakao_room_bindings_v2 (
  binding_id TEXT PRIMARY KEY,
  alliance_id TEXT NOT NULL,
  room_id TEXT NOT NULL,
  room_type TEXT NOT NULL CHECK(room_type IN ('alliance','guild')),
  guild_id TEXT NOT NULL DEFAULT '',
  server_id TEXT NOT NULL DEFAULT '',
  send_alias TEXT NOT NULL DEFAULT '',
  active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (
    (room_type='alliance' AND guild_id='' AND server_id='')
    OR (room_type='guild' AND guild_id<>'' AND server_id<>'')
  ),
  UNIQUE(alliance_id,room_id)
);
CREATE INDEX IF NOT EXISTS idx_kakao_room_bindings_v2_route
ON kakao_room_bindings_v2(alliance_id,active,room_type,server_id);

-- The legacy kakao_room_delivery table is intentionally untouched.
-- The new per-room delivery table must be introduced only when the
-- client can acknowledge all expected recipients for each alert.
