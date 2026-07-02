-- Phase 6 compression cache statistics.
CREATE TABLE IF NOT EXISTS compression_cache_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL,
  model TEXT NOT NULL DEFAULT '',
  compression_mode TEXT NOT NULL,
  cache_control_present INTEGER NOT NULL DEFAULT 0,
  estimated_cache_hit INTEGER NOT NULL DEFAULT 0,
  tokens_saved_compression INTEGER NOT NULL DEFAULT 0,
  tokens_saved_caching INTEGER NOT NULL DEFAULT 0,
  net_savings INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_compression_cache_stats_provider ON compression_cache_stats(provider);
CREATE INDEX IF NOT EXISTS idx_compression_cache_stats_created ON compression_cache_stats(created_at);
