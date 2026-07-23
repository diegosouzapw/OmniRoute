-- Provider-agnostic reasoning routing policies.
CREATE TABLE IF NOT EXISTS reasoning_routing_rules (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  scope TEXT NOT NULL CHECK (scope IN ('global', 'apiKey', 'combo', 'model', 'connection')),
  api_key_id TEXT REFERENCES api_keys(id) ON DELETE CASCADE,
  combo_id TEXT REFERENCES combos(id) ON DELETE CASCADE,
  connection_id TEXT REFERENCES provider_connections(id) ON DELETE CASCADE,
  model_pattern TEXT,
  source_effort TEXT NOT NULL DEFAULT 'any'
    CHECK (source_effort IN ('any', 'missing', 'none', 'low', 'medium', 'high', 'xhigh', 'max', 'ultra')),
  request_tags TEXT NOT NULL DEFAULT '[]',
  tag_match_mode TEXT NOT NULL DEFAULT 'any' CHECK (tag_match_mode IN ('any', 'all')),
  effort_mode TEXT NOT NULL DEFAULT 'inherit' CHECK (effort_mode IN ('inherit', 'default', 'force')),
  target_effort TEXT CHECK (target_effort IN ('none', 'low', 'medium', 'high', 'xhigh', 'max', 'ultra')),
  target_kind TEXT NOT NULL DEFAULT 'keep' CHECK (target_kind IN ('keep', 'model', 'combo')),
  target_model TEXT,
  target_combo_id TEXT REFERENCES combos(id) ON DELETE CASCADE,
  budget_action TEXT NOT NULL DEFAULT 'preserve' CHECK (budget_action IN ('preserve', 'remove', 'set')),
  budget_tokens INTEGER,
  priority INTEGER NOT NULL DEFAULT 0,
  enabled INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (scope != 'apiKey' OR api_key_id IS NOT NULL),
  CHECK (scope != 'combo' OR combo_id IS NOT NULL),
  CHECK (scope != 'model' OR model_pattern IS NOT NULL),
  CHECK (scope != 'connection' OR connection_id IS NOT NULL),
  CHECK (target_kind != 'model' OR target_model IS NOT NULL),
  CHECK (target_kind != 'combo' OR target_combo_id IS NOT NULL),
  CHECK (effort_mode = 'inherit' OR target_effort IS NOT NULL),
  CHECK (budget_action != 'set' OR budget_tokens > 0),
  CHECK (NOT (target_effort = 'none' AND budget_action = 'set'))
);

CREATE INDEX IF NOT EXISTS idx_reasoning_rules_enabled
  ON reasoning_routing_rules(enabled, scope, priority DESC);
CREATE INDEX IF NOT EXISTS idx_reasoning_rules_api_key ON reasoning_routing_rules(api_key_id);
CREATE INDEX IF NOT EXISTS idx_reasoning_rules_combo ON reasoning_routing_rules(combo_id);
CREATE INDEX IF NOT EXISTS idx_reasoning_rules_connection ON reasoning_routing_rules(connection_id);

-- OmniRoute historically does not rely on a process-wide PRAGMA foreign_keys setting.
-- Triggers keep the policy table referentially clean on every supported database.
CREATE TRIGGER IF NOT EXISTS trg_reasoning_rules_api_key_delete
AFTER DELETE ON api_keys BEGIN
  DELETE FROM reasoning_routing_rules WHERE api_key_id = OLD.id;
END;
CREATE TRIGGER IF NOT EXISTS trg_reasoning_rules_combo_delete
AFTER DELETE ON combos BEGIN
  DELETE FROM reasoning_routing_rules WHERE combo_id = OLD.id OR target_combo_id = OLD.id;
END;
CREATE TRIGGER IF NOT EXISTS trg_reasoning_rules_connection_delete
AFTER DELETE ON provider_connections BEGIN
  DELETE FROM reasoning_routing_rules WHERE connection_id = OLD.id;
END;
