-- 119_model_capability_overrides.sql
-- Manual model capability overrides per provider/model target. The UI stores targets
-- in the same provider/model shape used by combos, so provider-specific model caps do
-- not leak across providers that expose the same model id.

CREATE TABLE IF NOT EXISTS model_capability_overrides (
  provider TEXT NOT NULL,
  model_id TEXT NOT NULL,
  override_key TEXT NOT NULL,
  override_value TEXT NOT NULL,
  refreshed_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (provider, model_id, override_key)
) WITHOUT ROWID;

CREATE INDEX IF NOT EXISTS idx_model_capability_overrides_key
  ON model_capability_overrides (override_key);
