-- Add request_type column to call_logs for non-chat request tracking (search, embed, rerank).
-- Backward-compatible: DEFAULT NULL means existing rows are unaffected.
ALTER TABLE call_logs ADD COLUMN request_type TEXT DEFAULT NULL;
CREATE INDEX IF NOT EXISTS idx_call_logs_request_type ON call_logs(request_type);
