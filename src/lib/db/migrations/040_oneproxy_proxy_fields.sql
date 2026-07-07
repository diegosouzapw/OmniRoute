-- 040_oneproxy_proxy_fields.sql
-- Add 1proxy-specific columns to proxy_registry to support free proxy
-- marketplace integration (Issue #1788).
--
-- New columns:
--   source          — 'manual' or 'oneproxy' (distinguishes origin)
--   quality_score   — 0-100 quality rating from 1proxy validation
--   latency_ms      — measured latency in milliseconds
--   anonymity       — transparent, anonymous, or elite
--   google_access   — whether proxy can access Google (0/1)
--   last_validated  — ISO timestamp of last validation
--   country_code    — two-letter ISO country code

CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL,
  scope TEXT NOT NULL,
  scope_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (proxy_id) REFERENCES proxy_registry(id) ON DELETE CASCADE,
  UNIQUE(scope, scope_id)
);

ALTER TABLE proxy_registry ADD COLUMN source TEXT NOT NULL DEFAULT 'manual';
ALTER TABLE proxy_registry ADD COLUMN quality_score INTEGER;
ALTER TABLE proxy_registry ADD COLUMN latency_ms INTEGER;
ALTER TABLE proxy_registry ADD COLUMN anonymity TEXT;
ALTER TABLE proxy_registry ADD COLUMN google_access INTEGER DEFAULT 0;
ALTER TABLE proxy_registry ADD COLUMN last_validated TEXT;
ALTER TABLE proxy_registry ADD COLUMN country_code TEXT;

CREATE INDEX IF NOT EXISTS idx_proxy_registry_source ON proxy_registry(source);
CREATE INDEX IF NOT EXISTS idx_proxy_registry_quality ON proxy_registry(quality_score DESC);
CREATE INDEX IF NOT EXISTS idx_proxy_registry_country ON proxy_registry(country_code);
CREATE INDEX IF NOT EXISTS idx_proxy_assignments_proxy_id ON proxy_assignments(proxy_id);
CREATE INDEX IF NOT EXISTS idx_proxy_assignments_scope ON proxy_assignments(scope, scope_id);
