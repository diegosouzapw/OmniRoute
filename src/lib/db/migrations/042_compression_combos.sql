-- 042: Compression combos and routing-combo assignments.

CREATE TABLE IF NOT EXISTS compression_combos (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  pipeline TEXT NOT NULL DEFAULT '[]',
  language_packs TEXT DEFAULT '["en"]',
  output_mode INTEGER DEFAULT 0,
  output_mode_intensity TEXT DEFAULT 'full',
  is_default INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS compression_combo_assignments (
  id TEXT PRIMARY KEY,
  compression_combo_id TEXT NOT NULL REFERENCES compression_combos(id) ON DELETE CASCADE,
  routing_combo_id TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(routing_combo_id)
);

CREATE INDEX IF NOT EXISTS idx_compression_combos_default
  ON compression_combos(is_default);
CREATE INDEX IF NOT EXISTS idx_compression_combo_assignments_combo
  ON compression_combo_assignments(compression_combo_id);
CREATE INDEX IF NOT EXISTS idx_compression_combo_assignments_routing
  ON compression_combo_assignments(routing_combo_id);

INSERT OR IGNORE INTO compression_combos (
  id, name, description, pipeline, language_packs, output_mode, output_mode_intensity, is_default
)
VALUES (
  'default-caveman',
  'Standard Savings',
  'Default RTK + Caveman compression pipeline',
  '[{"engine":"rtk","intensity":"standard"},{"engine":"caveman","intensity":"full"}]',
  '["en"]',
  0,
  'full',
  1
);
