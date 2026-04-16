-- 025_call_logs_summary_storage.sql
-- Rebuild call_logs so SQLite stores summary metadata only.

DROP INDEX IF EXISTS idx_cl_combo_target;
DROP INDEX IF EXISTS idx_call_logs_request_type;
DROP INDEX IF EXISTS idx_call_logs_requested_model;
DROP INDEX IF EXISTS idx_cl_status;
DROP INDEX IF EXISTS idx_cl_timestamp;

ALTER TABLE call_logs RENAME TO call_logs_v1_legacy;

CREATE TABLE call_logs (
  id TEXT PRIMARY KEY,
  timestamp TEXT NOT NULL,
  method TEXT,
  path TEXT,
  status INTEGER,
  model TEXT,
  requested_model TEXT,
  provider TEXT,
  account TEXT,
  connection_id TEXT,
  duration INTEGER DEFAULT 0,
  tokens_in INTEGER DEFAULT 0,
  tokens_out INTEGER DEFAULT 0,
  tokens_cache_read INTEGER DEFAULT NULL,
  tokens_cache_creation INTEGER DEFAULT NULL,
  tokens_reasoning INTEGER DEFAULT NULL,
  cache_source TEXT DEFAULT 'upstream',
  request_type TEXT,
  source_format TEXT,
  target_format TEXT,
  api_key_id TEXT,
  api_key_name TEXT,
  combo_name TEXT,
  combo_step_id TEXT,
  combo_execution_key TEXT,
  error_summary TEXT,
  detail_state TEXT DEFAULT 'none',
  artifact_relpath TEXT,
  artifact_size_bytes INTEGER DEFAULT NULL,
  artifact_sha256 TEXT DEFAULT NULL,
  has_request_body INTEGER DEFAULT 0,
  has_response_body INTEGER DEFAULT 0,
  has_pipeline_details INTEGER DEFAULT 0,
  request_summary TEXT
);

INSERT OR REPLACE INTO call_logs (
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
  cache_source,
  request_type,
  source_format,
  target_format,
  api_key_id,
  api_key_name,
  combo_name,
  combo_step_id,
  combo_execution_key,
  error_summary,
  detail_state,
  artifact_relpath,
  artifact_size_bytes,
  artifact_sha256,
  has_request_body,
  has_response_body,
  has_pipeline_details,
  request_summary
)
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
  COALESCE(duration, 0),
  COALESCE(tokens_in, 0),
  COALESCE(tokens_out, 0),
  tokens_cache_read,
  tokens_cache_creation,
  tokens_reasoning,
  COALESCE(cache_source, 'upstream') AS cache_source,
  request_type,
  source_format,
  target_format,
  api_key_id,
  api_key_name,
  combo_name,
  combo_step_id,
  combo_execution_key,
  CASE
    WHEN error IS NULL OR TRIM(CAST(error AS TEXT)) = '' THEN NULL
    WHEN LENGTH(CAST(error AS TEXT)) > 4000 THEN SUBSTR(CAST(error AS TEXT), 1, 4000)
    ELSE CAST(error AS TEXT)
  END AS error_summary,
  CASE
    WHEN artifact_relpath IS NOT NULL AND TRIM(artifact_relpath) != '' THEN 'ready'
    WHEN COALESCE(request_body, '') != '' OR COALESCE(response_body, '') != '' OR COALESCE(error, '') != ''
      THEN 'legacy-inline'
    ELSE 'none'
  END AS detail_state,
  NULLIF(TRIM(artifact_relpath), '') AS artifact_relpath,
  NULL AS artifact_size_bytes,
  NULL AS artifact_sha256,
  CASE WHEN request_body IS NOT NULL AND TRIM(request_body) != '' THEN 1 ELSE 0 END AS has_request_body,
  CASE WHEN response_body IS NOT NULL AND TRIM(response_body) != '' THEN 1 ELSE 0 END AS has_response_body,
  COALESCE(has_pipeline_details, 0) AS has_pipeline_details,
  CASE
    WHEN request_type = 'search' AND request_body IS NOT NULL AND json_valid(request_body)
      THEN json_object(
        'query',
        COALESCE(json_extract(request_body, '$.query'), ''),
        'filters',
        json(COALESCE(json_remove(request_body, '$.query', '$.provider'), '{}'))
      )
    ELSE NULL
  END AS request_summary
FROM call_logs_v1_legacy;

CREATE INDEX idx_cl_timestamp ON call_logs(timestamp);
CREATE INDEX idx_cl_status ON call_logs(status);
CREATE INDEX idx_call_logs_requested_model ON call_logs(requested_model);
CREATE INDEX idx_call_logs_request_type ON call_logs(request_type);
CREATE INDEX idx_cl_combo_target
  ON call_logs(combo_name, combo_execution_key, timestamp);
