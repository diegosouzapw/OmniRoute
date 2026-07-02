ALTER TABLE call_logs ADD COLUMN combo_step_id TEXT DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN combo_execution_key TEXT DEFAULT NULL;

CREATE INDEX IF NOT EXISTS idx_cl_combo_target
  ON call_logs(combo_name, combo_execution_key, timestamp);
