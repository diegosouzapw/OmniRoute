-- 102_model_intelligence.sql
-- Renumbered from 097 (collided with 097_semantic_cache_expires_index).
-- Model intelligence scores: per-model task-fitness from arena ELO, models.dev
-- Model intelligence scores: per-model task-fitness from arena ELO, models.dev
-- tier rankings, and user overrides. Supports resolution chain (user_override
-- > arena_elo > models_dev_tier) and auto-expiry for stale synced data.

CREATE TABLE IF NOT EXISTS model_intelligence (
  model TEXT NOT NULL,
  source TEXT NOT NULL,           -- 'arena_elo' | 'models_dev_tier' | 'user_override'
  category TEXT NOT NULL,         -- 'coding' | 'review' | 'planning' | 'analysis' | 'debugging' | 'documentation' | 'default'
  score REAL NOT NULL,            -- [0..1] normalized fitness score
  elo_raw INTEGER,                -- original ELO if source='arena_elo'
  confidence TEXT,                -- 'high' | 'medium' | 'low' or CI string like '+10/-8'
  synced_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT,                -- TTL for auto-invalidated scores (NULL = never expires)
  PRIMARY KEY (model, source, category)
) WITHOUT ROWID;

CREATE INDEX IF NOT EXISTS idx_mi_model_category
  ON model_intelligence (model, category);

CREATE INDEX IF NOT EXISTS idx_mi_source
  ON model_intelligence (source);

CREATE INDEX IF NOT EXISTS idx_mi_expires
  ON model_intelligence (expires_at) WHERE expires_at IS NOT NULL;
