-- Migration 022: Evaluation Suites and Results

CREATE TABLE IF NOT EXISTS eval_suites (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS eval_cases (
    id TEXT PRIMARY KEY,
    suite_id TEXT NOT NULL REFERENCES eval_suites(id) ON DELETE CASCADE,
    input_messages TEXT NOT NULL, -- JSON String
    expected_regex TEXT,
    expected_contains TEXT,
    model_fallback TEXT
);

CREATE TABLE IF NOT EXISTS eval_results (
    id TEXT PRIMARY KEY,
    suite_id TEXT NOT NULL REFERENCES eval_suites(id) ON DELETE CASCADE,
    target_id TEXT NOT NULL, -- combo ID ou raw model ID
    target_type TEXT NOT NULL, -- "combo" ou "model"
    run_date INTEGER NOT NULL,
    pass_rate REAL NOT NULL,
    avg_latency INTEGER NOT NULL,
    raw_results TEXT NOT NULL -- JSON blob dos casos e retornos
);
