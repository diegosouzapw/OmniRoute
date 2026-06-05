-- Migration 064: Pre-request Middleware Hooks
-- Tables for storing middleware hook configs and execution logs.

-- Hook configurations
CREATE TABLE IF NOT EXISTS middleware_hooks (
  name TEXT PRIMARY KEY NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  priority INTEGER NOT NULL DEFAULT 200,
  scope_type TEXT NOT NULL DEFAULT 'global' CHECK(scope_type IN ('global', 'combo')),
  combo_id TEXT,
  enabled INTEGER NOT NULL DEFAULT 1,
  code TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  run_count INTEGER NOT NULL DEFAULT 0,
  last_error TEXT
);

-- Index for combo-scoped lookups
CREATE INDEX IF NOT EXISTS idx_middleware_hooks_scope
  ON middleware_hooks(scope_type, combo_id);

-- Index for enabled hooks (active filter)
CREATE INDEX IF NOT EXISTS idx_middleware_hooks_enabled
  ON middleware_hooks(enabled, priority);

-- Hook execution logs (for observability)
CREATE TABLE IF NOT EXISTS middleware_logs (
  id TEXT PRIMARY KEY NOT NULL,
  hook_name TEXT NOT NULL,
  request_id TEXT NOT NULL,
  duration_ms INTEGER NOT NULL DEFAULT 0,
  mutated INTEGER NOT NULL DEFAULT 0,
  skipped INTEGER NOT NULL DEFAULT 0,
  error TEXT,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (hook_name) REFERENCES middleware_hooks(name) ON DELETE CASCADE
);

-- Index for log queries
CREATE INDEX IF NOT EXISTS idx_middleware_logs_hook
  ON middleware_logs(hook_name, timestamp);

CREATE INDEX IF NOT EXISTS idx_middleware_logs_request
  ON middleware_logs(request_id, timestamp);
