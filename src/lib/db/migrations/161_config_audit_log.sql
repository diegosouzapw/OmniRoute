CREATE TABLE IF NOT EXISTS config_audit_log (
  id TEXT PRIMARY KEY,
  timestamp TEXT NOT NULL,
  action TEXT NOT NULL,
  target TEXT NOT NULL,
  target_id TEXT NOT NULL,
  target_name TEXT NOT NULL,
  before_json TEXT,
  after_json TEXT,
  diff_json TEXT NOT NULL,
  source TEXT NOT NULL,
  note TEXT
);
CREATE INDEX IF NOT EXISTS idx_config_audit_log_target_created ON config_audit_log(target, timestamp);
CREATE INDEX IF NOT EXISTS idx_config_audit_log_created ON config_audit_log(timestamp);
