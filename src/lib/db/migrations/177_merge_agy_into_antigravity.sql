-- 176_merge_agy_into_antigravity.sql
-- The standalone `agy` provider was consolidated into `antigravity`: both clients
-- authenticate against the same Google consumer-OAuth client and share the same Cloud
-- Code backend, model catalog, and quota. Rewrite stored rows so existing CLI
-- connections, usage, and quota stay attached after the merge, and normalize the
-- removed IDE client profile to the CLI identity (the only profile the provider now
-- presents). `agy` remains a runtime alias for old URLs and `agy/<model>` ids.

UPDATE provider_connections SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE usage_history SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE call_logs SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE registered_keys SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE provider_key_limits SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE quota_snapshots SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE provider_plans SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE hourly_usage_summary SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE daily_usage_summary SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE provider_quota_reset_events SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE session_account_affinity SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE model_context_overrides SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE model_capability_overrides SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE session_model_history SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE tier_assignments SET provider = 'antigravity' WHERE provider = 'agy';
UPDATE discovery_results SET provider_id = 'antigravity' WHERE provider_id = 'agy';

UPDATE usage_history SET model = 'antigravity' || substr(model, 4) WHERE model LIKE 'agy/%';
UPDATE call_logs SET model = 'antigravity' || substr(model, 4) WHERE model LIKE 'agy/%';
UPDATE hourly_usage_summary
SET model = 'antigravity' || substr(model, 4)
WHERE model LIKE 'agy/%';
UPDATE daily_usage_summary
SET model = 'antigravity' || substr(model, 4)
WHERE model LIKE 'agy/%';

-- Normalize the removed IDE profile to CLI. Rows with no clientProfile key keep
-- working through the runtime "cli" default.
UPDATE provider_connections
SET provider_specific_data = json_set(provider_specific_data, '$.clientProfile', 'cli')
WHERE provider = 'antigravity'
  AND json_valid(COALESCE(provider_specific_data, ''))
  AND json_extract(provider_specific_data, '$.clientProfile') IS NOT NULL
  AND json_extract(provider_specific_data, '$.clientProfile') != 'cli';
