-- CLI access tokens — scoped credentials for remote-mode management commands.
-- Distinct from `api_keys` (inference traffic): these authorize the `omniroute`
-- CLI / dashboard to run management operations against a (possibly remote) server.
-- Only the SHA-256 hash of the secret is stored; the plaintext is shown once at
-- creation. Scope is one of: 'read' | 'write' | 'admin' (admin ⊃ write ⊃ read).
CREATE TABLE IF NOT EXISTS cli_access_tokens (
  id           TEXT PRIMARY KEY,
  token_hash   TEXT NOT NULL UNIQUE,
  token_prefix TEXT NOT NULL,
  name         TEXT NOT NULL,
  scope        TEXT NOT NULL DEFAULT 'read',
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  last_used_at TEXT,
  expires_at   TEXT,
  revoked_at   TEXT
);

CREATE INDEX IF NOT EXISTS idx_cli_access_tokens_hash ON cli_access_tokens(token_hash);
