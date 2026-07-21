-- #7819 (Level 2) — per-API-key candidate exclusions for `auto/*` channels.
-- OmniRoute is single-tenant (no `users` table); `api_key_id` is the closest
-- real per-caller identity this app has. One row per excluded candidate
-- connection for a given API key + auto channel.
CREATE TABLE IF NOT EXISTS auto_candidate_overrides (
  id TEXT PRIMARY KEY,
  api_key_id TEXT NOT NULL,
  auto_channel TEXT NOT NULL,
  connection_id TEXT NOT NULL,
  excluded INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  UNIQUE(api_key_id, auto_channel, connection_id)
);

CREATE INDEX IF NOT EXISTS idx_auto_candidate_overrides_key_channel
  ON auto_candidate_overrides(api_key_id, auto_channel);
