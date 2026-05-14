CREATE TABLE IF NOT EXISTS session_account_affinity (
  session_key TEXT NOT NULL,
  provider TEXT NOT NULL,
  connection_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL,
  PRIMARY KEY (session_key, provider)
);

CREATE INDEX IF NOT EXISTS idx_saa_provider ON session_account_affinity(provider);
CREATE INDEX IF NOT EXISTS idx_saa_last_seen ON session_account_affinity(last_seen_at);
