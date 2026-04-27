CREATE TABLE IF NOT EXISTS eval_suites (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS eval_cases (
  id TEXT PRIMARY KEY,
  suite_id TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  name TEXT NOT NULL,
  model TEXT,
  input_json TEXT NOT NULL,
  expected_strategy TEXT NOT NULL,
  expected_value TEXT,
  tags_json TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_eval_suites_updated_at
  ON eval_suites(updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_eval_cases_suite_order
  ON eval_cases(suite_id, sort_order ASC, created_at ASC);
