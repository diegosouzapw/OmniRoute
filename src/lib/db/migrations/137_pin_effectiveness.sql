-- 137_pin_effectiveness.sql
-- Pin Effectiveness counters — tells whether context-cache pinning (PR2A) is
-- actually reducing switches or starting to hurt.
--
--   kept_count     — pin validated against the request and honored (sessions kept)
--   invalid_count  — pin rejected by capability/cooldown/context/learned-gap rules
--   repinned_count — a session's pin moved to a different model (forced re-pin)
--   last_invalid_* — most recent invalidation reason, for quick triage
--
-- avg pin lifetime is derived at read time from session_model_history, so no
-- column is stored here (see lib/db/pinEffectiveness.ts).

CREATE TABLE IF NOT EXISTS pin_effectiveness (
  combo_name TEXT PRIMARY KEY,
  kept_count INTEGER NOT NULL DEFAULT 0,
  invalid_count INTEGER NOT NULL DEFAULT 0,
  repinned_count INTEGER NOT NULL DEFAULT 0,
  last_invalid_at TEXT,
  last_invalid_reason TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
