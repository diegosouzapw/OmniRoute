-- Migration 190: one token limit per (scope, reset interval) per API key.
--
-- 073 made (api_key_id, scope_type, scope_value) unique, so a key could hold only
-- one limit per scope: adding a weekly global limit overwrote the daily one through
-- upsertTokenLimit's ON CONFLICT. The unique tuple now includes reset_interval, so
-- daily / weekly / monthly limits for the same scope coexist.
--
-- SQLite cannot change a table-level UNIQUE in place, so the table is rebuilt. The
-- new table is created first and renamed into place last: renaming the OLD table
-- (the 117 pattern) would repoint the FOREIGN KEY clauses of api_key_token_counters
-- and api_key_token_limit_reset_logs at the dropped copy. Rows keep their ids, so
-- counters and reset logs still match.
--
-- better-sqlite3 enforces foreign keys by default, so DROP TABLE cascades (ON DELETE
-- CASCADE) and would wipe every counter and reset log. PRAGMA foreign_keys cannot be
-- changed inside the runner's per-file transaction, so both child tables are copied
-- to temp tables first and restored after the rename (INSERT OR IGNORE also covers a
-- connection that runs with foreign keys off). Safe to re-run.

DROP TABLE IF EXISTS temp.aktl190_counters;
DROP TABLE IF EXISTS temp.aktl190_reset_logs;
CREATE TEMP TABLE aktl190_counters AS SELECT * FROM api_key_token_counters;
CREATE TEMP TABLE aktl190_reset_logs AS SELECT * FROM api_key_token_limit_reset_logs;

CREATE TABLE IF NOT EXISTS api_key_token_limits_new (
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
  UNIQUE (api_key_id, scope_type, scope_value, reset_interval)
);

INSERT OR IGNORE INTO api_key_token_limits_new
  (id, api_key_id, scope_type, scope_value, token_limit, reset_interval, reset_time,
   enabled, created_at, updated_at)
SELECT id, api_key_id, scope_type, scope_value, token_limit, reset_interval, reset_time,
       enabled, created_at, updated_at
FROM api_key_token_limits;

DROP TABLE api_key_token_limits;

ALTER TABLE api_key_token_limits_new RENAME TO api_key_token_limits;

CREATE INDEX IF NOT EXISTS idx_aktl_api_key_id ON api_key_token_limits (api_key_id);

INSERT OR IGNORE INTO api_key_token_counters (limit_id, window_start, tokens_used, updated_at)
SELECT limit_id, window_start, tokens_used, updated_at FROM temp.aktl190_counters;

INSERT OR IGNORE INTO api_key_token_limit_reset_logs (id, limit_id, reset_at, prev_tokens, window_start)
SELECT id, limit_id, reset_at, prev_tokens, window_start FROM temp.aktl190_reset_logs;

DROP TABLE temp.aktl190_counters;
DROP TABLE temp.aktl190_reset_logs;
