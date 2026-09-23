-- Failure-family breakdown support. `error_type` (added by 158) backs the
-- GROUP BY in the error-type breakdown; (status, timestamp) stay outside the
-- index by design — non-covering for the real query, no second index.
CREATE INDEX IF NOT EXISTS idx_cl_error_type ON call_logs(error_type);
