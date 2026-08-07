-- Combo Adaptation State v2: per-model learning state with exponential backoff cooldown.
-- The v1 table (002) keyed on (combo_id, provider_id) was never populated and is not
-- referenced anywhere in code, so we rebuild it keyed on the concrete model string —
-- cooldown/warm/learned-score all operate per routed model, not per provider.
DROP TABLE IF EXISTS combo_adaptation_state;
CREATE TABLE combo_adaptation_state (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    combo_id TEXT NOT NULL,
    model_str TEXT NOT NULL,
    learned_score REAL DEFAULT 0.5,
    request_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    failures INTEGER DEFAULT 0,
    consecutive_failures INTEGER DEFAULT 0,
    avg_latency_ms REAL,
    last_success TEXT,
    last_failure TEXT,
    cooldown_until TEXT,
    updated_at TEXT DEFAULT (datetime('now')),
    UNIQUE(combo_id, model_str)
);
CREATE INDEX IF NOT EXISTS idx_cas_combo ON combo_adaptation_state(combo_id);
CREATE INDEX IF NOT EXISTS idx_cas_cooldown ON combo_adaptation_state(cooldown_until);
