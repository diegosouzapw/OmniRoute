ALTER TABLE call_logs ADD COLUMN session_tag TEXT DEFAULT NULL;
CREATE INDEX IF NOT EXISTS idx_cl_session_tag ON call_logs(session_tag);
