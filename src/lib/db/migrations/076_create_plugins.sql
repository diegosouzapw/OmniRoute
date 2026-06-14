-- 059: Plugin system tables
-- WordPress-style plugin management with lifecycle tracking

CREATE TABLE IF NOT EXISTS plugins (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  version TEXT NOT NULL DEFAULT '1.0.0',
  description TEXT,
  author TEXT,
  license TEXT DEFAULT 'MIT',
  main TEXT NOT NULL DEFAULT 'index.js',
  source TEXT NOT NULL DEFAULT 'local',
  tags TEXT DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'installed'
    CHECK (status IN ('installed', 'active', 'inactive', 'error')),
  enabled INTEGER NOT NULL DEFAULT 0,
  manifest TEXT NOT NULL,
  config TEXT DEFAULT '{}',
  config_schema TEXT DEFAULT '{}',
  hooks TEXT DEFAULT '[]',
  permissions TEXT DEFAULT '[]',
  plugin_dir TEXT NOT NULL,
  error_message TEXT,
  installed_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  activated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_plugins_status ON plugins(status);
CREATE INDEX IF NOT EXISTS idx_plugins_enabled ON plugins(enabled);
CREATE INDEX IF NOT EXISTS idx_plugins_name ON plugins(name);
