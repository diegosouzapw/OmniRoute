-- 110_model_context_overrides.sql
-- Self-correcting context-window overrides per (provider, model_id). An override wins
-- over the static catalog / models.dev sync in getModelContextLimit(). Source 'manual'
-- is operator-set and is NEVER overwritten by the auto reconciler ('auto:discovery'),
-- which pins the window a provider's own /models discovery declares when it diverges
-- from the catalog. Read path: src/lib/modelCapabilities.ts::getModelContextLimit.

CREATE TABLE IF NOT EXISTS model_context_overrides (
  provider TEXT NOT NULL,
  model_id TEXT NOT NULL,
  real_context INTEGER NOT NULL,          -- the corrected context window (tokens), > 0
  source TEXT NOT NULL DEFAULT 'manual',  -- 'manual' | 'auto:discovery'
  refreshed_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (provider, model_id)
) WITHOUT ROWID;

CREATE INDEX IF NOT EXISTS idx_mco_source ON model_context_overrides (source);
