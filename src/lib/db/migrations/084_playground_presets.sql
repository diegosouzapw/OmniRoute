CREATE TABLE IF NOT EXISTS playground_presets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  model TEXT NOT NULL,
  system TEXT,
  params_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_playground_presets_name
  ON playground_presets(name);

CREATE INDEX IF NOT EXISTS idx_playground_presets_endpoint
  ON playground_presets(endpoint);
