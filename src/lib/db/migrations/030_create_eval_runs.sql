CREATE TABLE IF NOT EXISTS eval_runs (
  id TEXT PRIMARY KEY,
  run_group_id TEXT,
  suite_id TEXT NOT NULL,
  suite_name TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT,
  target_label TEXT NOT NULL,
  api_key_id TEXT,
  pass_rate INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  passed INTEGER NOT NULL DEFAULT 0,
  failed INTEGER NOT NULL DEFAULT 0,
  avg_latency_ms INTEGER NOT NULL DEFAULT 0,
  summary_json TEXT NOT NULL,
  results_json TEXT NOT NULL,
  outputs_json TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_eval_runs_suite_created_at
  ON eval_runs(suite_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_eval_runs_group_id
  ON eval_runs(run_group_id);

CREATE INDEX IF NOT EXISTS idx_eval_runs_created_at
  ON eval_runs(created_at DESC);
