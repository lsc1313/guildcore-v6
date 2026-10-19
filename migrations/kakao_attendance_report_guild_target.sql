-- Additive routing metadata for existing Kakao attendance reports.
-- This migration is staged only; do not apply before client supports target_guild_id.
ALTER TABLE kakao_attendance_reports ADD COLUMN target_guild_id TEXT NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_kakao_attendance_reports_guild
  ON kakao_attendance_reports(alliance_id,target_guild_id,status,created_at);
-- Empty target_guild_id preserves all existing alliance report semantics.
