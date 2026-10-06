CREATE TABLE IF NOT EXISTS provider_quota_state (
  connection_id TEXT NOT NULL,
  model TEXT NOT NULL,
  tokens_used INTEGER NOT NULL DEFAULT 0,
  token_limit INTEGER NOT NULL DEFAULT 0,
  window_start INTEGER NOT NULL,
  window_reset INTEGER NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (connection_id, model)
);
CREATE INDEX IF NOT EXISTS idx_pqs_connection ON provider_quota_state(connection_id);
CREATE INDEX IF NOT EXISTS idx_pqs_reset ON provider_quota_state(window_reset) WHERE window_reset IS NOT NULL;
