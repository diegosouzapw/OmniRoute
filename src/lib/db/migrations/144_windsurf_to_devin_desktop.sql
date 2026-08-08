-- 144_windsurf_to_devin_desktop.sql
-- Migrate current provider configuration from the retired public Windsurf id
-- to Devin Desktop. Historical request and usage records are intentionally
-- preserved under the provider identity that existed when they were written.

UPDATE provider_connections
SET provider = 'devin-desktop',
    default_model = CASE
      WHEN default_model LIKE 'windsurf/%'
        THEN 'devin-desktop/' || substr(default_model, length('windsurf/') + 1)
      ELSE default_model
    END
WHERE provider = 'windsurf';

UPDATE registered_keys
SET provider = 'devin-desktop'
WHERE provider = 'windsurf';

INSERT OR IGNORE INTO provider_key_limits (
  provider,
  max_active_keys,
  daily_issue_limit,
  hourly_issue_limit,
  daily_issued,
  hourly_issued,
  last_reset_day,
  last_reset_hour,
  updated_at
)
SELECT
  'devin-desktop',
  max_active_keys,
  daily_issue_limit,
  hourly_issue_limit,
  daily_issued,
  hourly_issued,
  last_reset_day,
  last_reset_hour,
  updated_at
FROM provider_key_limits
WHERE provider = 'windsurf';

DELETE FROM provider_key_limits WHERE provider = 'windsurf';

INSERT OR IGNORE INTO key_value (namespace, key, value)
SELECT namespace, 'devin-desktop', value
FROM key_value
WHERE key = 'windsurf'
  AND namespace IN ('customModels', 'modelCompatOverrides', 'providerAliases');

DELETE FROM key_value
WHERE key = 'windsurf'
  AND namespace IN ('customModels', 'modelCompatOverrides', 'providerAliases');

INSERT OR IGNORE INTO key_value (namespace, key, value)
SELECT
  namespace,
  'devin-desktop:' || substr(key, length('windsurf:') + 1),
  value
FROM key_value
WHERE namespace = 'syncedAvailableModels'
  AND substr(key, 1, length('windsurf:')) = 'windsurf:';

DELETE FROM key_value
WHERE namespace = 'syncedAvailableModels'
  AND substr(key, 1, length('windsurf:')) = 'windsurf:';

UPDATE key_value
SET value = '"devin-desktop/' || substr(value, length('"windsurf/') + 1)
WHERE namespace = 'modelAliases'
  AND substr(value, 1, length('"windsurf/')) = '"windsurf/';

UPDATE combos
SET data = replace(
  replace(
    replace(
      replace(
        replace(data, '"provider":"windsurf"', '"provider":"devin-desktop"'),
        '"provider": "windsurf"',
        '"provider": "devin-desktop"'
      ),
      '"providerId":"windsurf"',
      '"providerId":"devin-desktop"'
    ),
    '"providerId": "windsurf"',
    '"providerId": "devin-desktop"'
  ),
  '"windsurf/',
  '"devin-desktop/'
)
WHERE data LIKE '%windsurf%';

INSERT OR IGNORE INTO combo_adaptation_state (
  combo_id,
  provider_id,
  learned_score,
  request_count,
  success_count,
  avg_latency_ms,
  last_failure_at,
  excluded_until,
  updated_at
)
SELECT
  combo_id,
  'devin-desktop',
  learned_score,
  request_count,
  success_count,
  avg_latency_ms,
  last_failure_at,
  excluded_until,
  updated_at
FROM combo_adaptation_state
WHERE provider_id = 'windsurf';

DELETE FROM combo_adaptation_state WHERE provider_id = 'windsurf';

INSERT OR IGNORE INTO tier_assignments (
  provider,
  model,
  tier,
  cost_per_1m_input,
  cost_per_1m_output,
  has_free_tier,
  free_quota_limit,
  reason,
  updated_at
)
SELECT
  'devin-desktop',
  model,
  tier,
  cost_per_1m_input,
  cost_per_1m_output,
  has_free_tier,
  free_quota_limit,
  reason,
  updated_at
FROM tier_assignments
WHERE provider = 'windsurf';

DELETE FROM tier_assignments WHERE provider = 'windsurf';

UPDATE provider_plans SET provider = 'devin-desktop' WHERE provider = 'windsurf';

INSERT OR IGNORE INTO model_context_overrides (
  provider,
  model_id,
  real_context,
  source,
  refreshed_at
)
SELECT 'devin-desktop', model_id, real_context, source, refreshed_at
FROM model_context_overrides
WHERE provider = 'windsurf';

DELETE FROM model_context_overrides WHERE provider = 'windsurf';

INSERT OR IGNORE INTO model_capability_overrides (
  provider,
  model_id,
  override_key,
  override_value,
  refreshed_at
)
SELECT 'devin-desktop', model_id, override_key, override_value, refreshed_at
FROM model_capability_overrides
WHERE provider = 'windsurf';

DELETE FROM model_capability_overrides WHERE provider = 'windsurf';

INSERT OR IGNORE INTO session_account_affinity (
  session_key,
  provider,
  connection_id,
  created_at,
  last_seen_at
)
SELECT session_key, 'devin-desktop', connection_id, created_at, last_seen_at
FROM session_account_affinity
WHERE provider = 'windsurf';

DELETE FROM session_account_affinity WHERE provider = 'windsurf';

UPDATE group_model_permissions
SET provider = 'devin-desktop'
WHERE provider = 'windsurf';

DELETE FROM upstream_proxy_config
WHERE provider_id = 'windsurf'
  AND EXISTS (
    SELECT 1
    FROM upstream_proxy_config AS destination
    WHERE destination.provider_id = 'devin-desktop'
  );

UPDATE upstream_proxy_config
SET provider_id = 'devin-desktop'
WHERE provider_id = 'windsurf';

DELETE FROM discovery_results
WHERE provider_id = 'windsurf'
  AND EXISTS (
    SELECT 1
    FROM discovery_results AS destination
    WHERE destination.provider_id = 'devin-desktop'
      AND destination.method = discovery_results.method
      AND destination.endpoint IS discovery_results.endpoint
  );

UPDATE discovery_results
SET provider_id = 'devin-desktop'
WHERE provider_id = 'windsurf';
