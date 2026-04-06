-- Add detailed token breakdown columns to call_logs.
-- These are NULL when the provider does not report the field,
-- or an integer (including 0) when the provider explicitly returned a value.
ALTER TABLE call_logs ADD COLUMN tokens_cache_read INTEGER DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN tokens_cache_creation INTEGER DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN tokens_reasoning INTEGER DEFAULT NULL;
