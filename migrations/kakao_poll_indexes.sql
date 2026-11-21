-- GuildCore polling indexes; safe to rerun. Worker also initializes these on first poll.
CREATE INDEX IF NOT EXISTS idx_gc_boss_kakao_poll ON boss_alert_queue(alliance_id,kakao_status,due_at,created_at);
CREATE INDEX IF NOT EXISTS idx_gc_boss_discord_poll ON boss_alert_queue(alliance_id,discord_status,due_at,created_at);
CREATE TABLE IF NOT EXISTS kakao_delivery_lease (alliance_id TEXT NOT NULL, queue_type TEXT NOT NULL, item_id TEXT NOT NULL, claimed_at TEXT NOT NULL, PRIMARY KEY(alliance_id,queue_type,item_id));
CREATE INDEX IF NOT EXISTS idx_gc_kakao_lease_expiry ON kakao_delivery_lease(alliance_id,queue_type,claimed_at);
