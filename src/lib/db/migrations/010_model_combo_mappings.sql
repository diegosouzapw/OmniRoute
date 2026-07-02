-- Migration 010: Model-to-Combo mappings
-- Allows users to map model name patterns (globs) to specific combos.
-- When a request comes in for a model matching a pattern, the mapped combo
-- is used automatically instead of the global default.

CREATE TABLE IF NOT EXISTS model_combo_mappings (
  id TEXT PRIMARY KEY,
  pattern TEXT NOT NULL,           -- glob pattern, e.g. 'claude-*-opus*'
  combo_id TEXT NOT NULL,          -- references combos.id
  priority INTEGER DEFAULT 0,     -- higher = checked first
  enabled INTEGER DEFAULT 1,      -- 0 = disabled, 1 = enabled
  description TEXT DEFAULT '',     -- optional human-readable label
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (combo_id) REFERENCES combos(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_mcm_enabled ON model_combo_mappings(enabled);
CREATE INDEX IF NOT EXISTS idx_mcm_priority ON model_combo_mappings(priority DESC);
