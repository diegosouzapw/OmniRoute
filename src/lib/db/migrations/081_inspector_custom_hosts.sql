CREATE TABLE IF NOT EXISTS inspector_custom_hosts (
  host TEXT PRIMARY KEY,
  enabled INTEGER NOT NULL DEFAULT 1,
  label TEXT,
  kind TEXT NOT NULL DEFAULT 'custom' CHECK (kind IN ('llm','app','custom')),
  added_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_inspector_custom_hosts_enabled
  ON inspector_custom_hosts(enabled);
