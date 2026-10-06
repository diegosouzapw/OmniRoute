-- Canonical provider id is now `magnific`. Freepik was the previous slug
-- (Magnific started as Freepik's developer API). Rewrite stored rows so
-- dashboard cards, credentials, and usage stay attached after the rename.
-- `freepik` remains a runtime alias for old URLs and `freepik/<model>` ids.

UPDATE provider_connections SET provider = 'magnific' WHERE provider = 'freepik';
UPDATE usage_history SET provider = 'magnific' WHERE provider = 'freepik';
UPDATE call_logs SET provider = 'magnific' WHERE provider = 'freepik';
UPDATE registered_keys SET provider = 'magnific' WHERE provider = 'freepik';
UPDATE provider_key_limits SET provider = 'magnific' WHERE provider = 'freepik';
UPDATE quota_snapshots SET provider = 'magnific' WHERE provider = 'freepik';
UPDATE provider_plans SET provider = 'magnific' WHERE provider = 'freepik';
UPDATE hourly_usage_summary SET provider = 'magnific' WHERE provider = 'freepik';
UPDATE daily_usage_summary SET provider = 'magnific' WHERE provider = 'freepik';
UPDATE provider_quota_reset_events SET provider = 'magnific' WHERE provider = 'freepik';
UPDATE session_account_affinity SET provider = 'magnific' WHERE provider = 'freepik';
UPDATE model_context_overrides SET provider = 'magnific' WHERE provider = 'freepik';
UPDATE model_capability_overrides SET provider = 'magnific' WHERE provider = 'freepik';
UPDATE session_model_history SET provider = 'magnific' WHERE provider = 'freepik';
UPDATE tier_assignments SET provider = 'magnific' WHERE provider = 'freepik';

UPDATE usage_history
SET model = 'magnific' || substr(model, 8)
WHERE model LIKE 'freepik/%';

UPDATE call_logs
SET model = 'magnific' || substr(model, 8)
WHERE model LIKE 'freepik/%';

UPDATE hourly_usage_summary
SET model = 'magnific' || substr(model, 8)
WHERE model LIKE 'freepik/%';

UPDATE daily_usage_summary
SET model = 'magnific' || substr(model, 8)
WHERE model LIKE 'freepik/%';

UPDATE key_value
SET key = 'magnific'
WHERE namespace IN ('cliToolLastConfig', 'cliToolInitialConfig')
  AND key = 'freepik';
