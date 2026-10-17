-- Opt-in recovery tickets for unanswered, terminal-quota chat requests.
-- Request and result payloads are encrypted by the domain module before insert.
CREATE TABLE IF NOT EXISTS quota_recovery_tickets (
  id TEXT PRIMARY KEY,
  api_key_id TEXT NOT NULL,
  turn_key TEXT NOT NULL,
  request_hash TEXT NOT NULL,
  endpoint TEXT NOT NULL CHECK (endpoint IN ('chat/completions', 'responses')),
  request_ciphertext TEXT NOT NULL,
  result_ciphertext TEXT,
  state TEXT NOT NULL DEFAULT 'pending'
    CHECK (state IN ('pending', 'running', 'completed', 'failed', 'needs_confirmation', 'cancelled', 'expired')),
  attempt_count INTEGER NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
  next_attempt_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (api_key_id, turn_key)
);

CREATE INDEX IF NOT EXISTS idx_quota_recovery_due
  ON quota_recovery_tickets (state, next_attempt_at);
