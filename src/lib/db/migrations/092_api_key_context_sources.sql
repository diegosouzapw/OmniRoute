-- Per-API-key context source configuration (Obsidian, Notion, etc.)
CREATE TABLE IF NOT EXISTS api_key_context_sources (
  api_key_id TEXT NOT NULL,
  source_type TEXT NOT NULL,
  token TEXT,
  base_url TEXT,
  vault_path TEXT,
  enabled INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (api_key_id, source_type),
  FOREIGN KEY (api_key_id) REFERENCES api_keys(id) ON DELETE CASCADE
);
