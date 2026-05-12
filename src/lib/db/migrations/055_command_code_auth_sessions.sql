-- Migration 055: Pending browser-assisted Command Code auth sessions
CREATE TABLE IF NOT EXISTS command_code_auth_sessions (
  id TEXT PRIMARY KEY,
  state_hash TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'received', 'applied', 'expired')),
  encrypted_api_key TEXT,
  metadata_json TEXT,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  received_at TEXT,
  applied_at TEXT,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_command_code_auth_sessions_state_hash
  ON command_code_auth_sessions(state_hash);

CREATE INDEX IF NOT EXISTS idx_command_code_auth_sessions_status_expires
  ON command_code_auth_sessions(status, expires_at);
