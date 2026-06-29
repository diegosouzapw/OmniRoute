ALTER TABLE call_logs ADD COLUMN correlation_id TEXT;
CREATE INDEX IF NOT EXISTS idx_cl_correlation_id ON call_logs(correlation_id);
