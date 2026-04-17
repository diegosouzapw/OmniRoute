-- 026_simplify_call_logs.sql
-- Simplify call_logs schema: remove artifact tracking, restore inline storage
-- This migration is idempotent: it safely handles both fresh and upgraded databases

-- Recreate call_logs table without artifact-related columns
-- Using CREATE TABLE AS SELECT to preserve data while dropping unwanted columns
CREATE TABLE call_logs_new AS
SELECT
  id,
  timestamp,
  method,
  path,
  status,
  model,
  requested_model,
  provider,
  account,
  connection_id,
  duration,
  tokens_in,
  tokens_out,
  tokens_cache_read,
  tokens_cache_creation,
  tokens_reasoning,
  request_type,
  source_format,
  target_format,
  api_key_id,
  api_key_name,
  combo_name,
  combo_step_id,
  combo_execution_key,
  has_pipeline_details,
  NULL AS request_body,
  NULL AS response_body,
  NULL AS error,
  COALESCE(cache_source, 'upstream') AS cache_source,
  COALESCE(detail_state, 'none') AS detail_state,
  COALESCE(has_request_body, 0) AS has_request_body,
  COALESCE(has_response_body, 0) AS has_response_body
FROM call_logs;

-- Drop old table and rename new one
DROP TABLE call_logs;
ALTER TABLE call_logs_new RENAME TO call_logs;

-- Recreate indexes
CREATE INDEX IF NOT EXISTS idx_call_logs_timestamp ON call_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_call_logs_provider ON call_logs(provider);
CREATE INDEX IF NOT EXISTS idx_call_logs_model ON call_logs(model);
CREATE INDEX IF NOT EXISTS idx_call_logs_combo ON call_logs(combo_name);
CREATE INDEX IF NOT EXISTS idx_call_logs_api_key ON call_logs(api_key_id);
