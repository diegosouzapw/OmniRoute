-- Migration 073: per-API-key token limits (scoped to model and/or provider)
--
-- Adds enforcement-grade token budgets attachable to an API key and scoped to a
-- specific model, a specific provider, or globally (all traffic for the key).
-- When a key exceeds its configured token budget within the active reset window,
-- requests are rejected with HTTP 429. This complements (does not replace) the
-- USD cost budgets in `domain_budgets` / src/domain/costRules.ts. Token usage is
-- already captured per request in usage_history; these tables provide the
-- authoritative rolling-window counters used for pre-flight enforcement.
--
-- Three tables:
--   api_key_token_limits           - the limit definitions (one per scope per key)
--   api_key_token_counters         - rolling-window usage counters (implicit rollover)
--   api_key_token_limit_reset_logs - audit trail of window resets
--
-- Plus a composite index on usage_history to make the cold-start seed-on-miss
-- SUM (api_key_id, provider, model, timestamp) an index scan rather than a table
-- scan. The build does NOT run with PRAGMA foreign_keys=ON, so the FK clause is
-- declarative only (matches existing repo convention; application code is the
-- single writer and prunes counters via ON DELETE CASCADE semantics best-effort).

CREATE TABLE IF NOT EXISTS api_key_token_limits (
  id              TEXT PRIMARY KEY,
  api_key_id      TEXT NOT NULL,
  scope_type      TEXT NOT NULL CHECK (scope_type IN ('model', 'provider', 'global')),
  scope_value     TEXT NOT NULL DEFAULT '',
  token_limit     INTEGER NOT NULL CHECK (token_limit > 0),
  reset_interval  TEXT NOT NULL DEFAULT 'monthly' CHECK (reset_interval IN ('daily', 'weekly', 'monthly')),
  reset_time      TEXT,
  enabled         INTEGER NOT NULL DEFAULT 1,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (api_key_id, scope_type, scope_value)
);

CREATE INDEX IF NOT EXISTS idx_aktl_api_key_id
  ON api_key_token_limits (api_key_id);

CREATE TABLE IF NOT EXISTS api_key_token_counters (
  limit_id      TEXT NOT NULL,
  window_start  TEXT NOT NULL,
  tokens_used   INTEGER NOT NULL DEFAULT 0,
  updated_at    TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (limit_id, window_start),
  FOREIGN KEY (limit_id) REFERENCES api_key_token_limits (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS api_key_token_limit_reset_logs (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  limit_id      TEXT NOT NULL,
  reset_at      TEXT NOT NULL DEFAULT (datetime('now')),
  prev_tokens   INTEGER NOT NULL DEFAULT 0,
  window_start  TEXT NOT NULL,
  FOREIGN KEY (limit_id) REFERENCES api_key_token_limits (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_aktlrl_limit_id
  ON api_key_token_limit_reset_logs (limit_id);

CREATE INDEX IF NOT EXISTS idx_uh_key_provider_model_ts
  ON usage_history (api_key_id, provider, model, timestamp);
