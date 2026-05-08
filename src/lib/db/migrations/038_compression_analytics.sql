-- 038: Compression analytics table for Phase 5 feature
CREATE TABLE IF NOT EXISTS compression_analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT NOT NULL,
  combo_id TEXT,
  provider TEXT,
  mode TEXT NOT NULL,
  original_tokens INTEGER NOT NULL,
  compressed_tokens INTEGER NOT NULL,
  tokens_saved INTEGER NOT NULL,
  duration_ms INTEGER,
  request_id TEXT
);
