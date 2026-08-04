-- Migration 105: Add endpoint column to usage_history
-- Tracks the API endpoint path (e.g. /v1/chat/completions, /v1/messages, /v1/responses)
-- so usage analytics can break down activity per endpoint dimension.
-- Backward compatible: existing rows default to NULL; aggregation queries fold NULL into 'unknown'.
ALTER TABLE usage_history ADD COLUMN endpoint TEXT;
CREATE INDEX IF NOT EXISTS idx_uh_endpoint ON usage_history(endpoint);
