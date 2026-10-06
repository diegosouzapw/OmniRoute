-- 200_provider_health_matrix_covering_index.sql
-- The provider health matrix ranks recent call log targets with two ROW_NUMBER()
-- windows partitioned by provider, connection and model, newest first. The
-- existing provider/timestamp index is not covering for that read, so the
-- dashboard query fell back to a table lookup per row. This covering index
-- serves both the unfiltered dashboard read and the provider-filtered read
-- from the index alone. Purely additive — only speeds up the existing SELECT,
-- no schema or behavior change for callers.

CREATE INDEX IF NOT EXISTS idx_cl_health_matrix_cover ON call_logs(
  provider, timestamp, connection_id, model,
  requested_model, status, duration, id, error_summary
);
