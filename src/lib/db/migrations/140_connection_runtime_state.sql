CREATE TABLE IF NOT EXISTS connection_runtime_state (
  connection_id TEXT PRIMARY KEY REFERENCES provider_connections(id) ON DELETE CASCADE,
  refresh_circuit_streak INTEGER DEFAULT 0,
  refresh_circuit_until TEXT,
  refresh_last_fail_at TEXT,
  warmup_circuit_streak INTEGER DEFAULT 0,
  warmup_circuit_until TEXT,
  warmup_last_fail_at TEXT,
  last_warmup_at TEXT,
  last_warmup_result TEXT,
  warmup_tokens_used INTEGER DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_crs_warmup_until ON connection_runtime_state(warmup_circuit_until) WHERE warmup_circuit_until IS NOT NULL;
