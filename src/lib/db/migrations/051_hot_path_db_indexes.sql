CREATE INDEX IF NOT EXISTS idx_dch_key_timestamp ON domain_cost_history(api_key_id, timestamp);

CREATE INDEX IF NOT EXISTS idx_usage_history_api_key_id_timestamp
  ON usage_history(api_key_id, timestamp);

CREATE INDEX IF NOT EXISTS idx_usage_history_api_key_name_timestamp
  ON usage_history(api_key_name, timestamp);

CREATE INDEX IF NOT EXISTS idx_call_logs_combo_name_timestamp
  ON call_logs(combo_name, timestamp);
