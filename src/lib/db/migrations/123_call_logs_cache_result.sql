-- Persist an explicit cache outcome in call logs so downstream billing can
-- distinguish a zero-rated semantic cache hit from an ordinary zero-token
-- request. The scope fields make the per-downstream-key isolation auditable;
-- avoided tokens are analytics only and must not enter billable token totals.
ALTER TABLE call_logs ADD COLUMN cache_status TEXT DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN cache_scope TEXT DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN cache_scope_id TEXT DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN cache_avoided_input_tokens INTEGER DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN cache_avoided_output_tokens INTEGER DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN billing_contract_version INTEGER NOT NULL DEFAULT 1;
ALTER TABLE call_logs ADD COLUMN routed_model_id TEXT DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN provider_model_id TEXT DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN billing_model_id TEXT DEFAULT NULL;
