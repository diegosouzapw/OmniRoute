-- Migration 139: generic job registry (jobs + job_runs tables)
-- Job registry (#8848): centralized periodic-job scheduling + run history.
--
-- jobs:      one row per registered job (interval or cron), with env-flag gating
-- job_runs:  one row per execution (running/success/failure), pruned by count + age

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'interval' CHECK(type IN ('interval', 'cron')),
  cron TEXT,                                 -- cron expression (type='cron'); NULL for interval jobs
  interval_ms INTEGER,                       -- interval in ms (type='interval'); NULL for cron jobs
  enabled INTEGER NOT NULL DEFAULT 1,        -- 0=disabled, 1=enabled
  env_flag TEXT,                             -- env var name (boolean gate), e.g. 'OMNIROUTE_WARMUP_ENABLED'; NULL = no gate
  config TEXT NOT NULL DEFAULT '{}',         -- JSON config (concurrency, timezone, envDefault, ...)
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS job_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id TEXT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  started_at TEXT NOT NULL,                  -- ISO-8601, written explicitly by recordRun (no DB default)
  finished_at TEXT,                          -- ISO-8601; NULL while running
  status TEXT NOT NULL DEFAULT 'running',    -- 'running' | 'success' | 'failure'
  error_message TEXT,                        -- sanitized error message (no stack trace)
  records_affected INTEGER DEFAULT 0,        -- job-specific meaning (see below)
  duration_ms INTEGER,                       -- execution duration in ms
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_jr_job_id ON job_runs(job_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_jr_started_at ON job_runs(started_at);

-- Built-in job registration (idempotent - INSERT OR IGNORE).
-- env_flag = NULL means "no registry-level boolean gate"; per-job disable semantics
-- live inside the handler itself (see token_health_check wrapper).
-- 'warmup' is seeded disabled because its handler is not part of this change.
-- startAll() filters on enabled before it looks for a handler, so a disabled row
-- stays quiet instead of warning on every boot; the change that brings the warmup
-- handler flips it on.
INSERT OR IGNORE INTO jobs (id, type, cron, interval_ms, enabled, env_flag, config) VALUES
  ('budget_reset', 'interval', NULL, 600000, 1, NULL, '{}'),
  ('warmup', 'cron', '0 7 * * *', NULL, 0, 'OMNIROUTE_WARMUP_ENABLED', '{"timezone":"America/Los_Angeles","envDefault":false}'),
  ('token_health_check', 'interval', NULL, 60000, 1, NULL, '{}');

-- records_affected semantics:
--   budget_reset       = number of budget records reset (UPDATE ... SET budget_used=0 row count)
--   warmup             = number of connections attempted for warmup
--   token_health_check = number of connections swept by the health check
