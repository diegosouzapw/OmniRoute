-- 126_windsurf_to_devin_desktop.sql
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

INSERT OR IGNORE INTO key_value (namespace, key, value)
SELECT namespace, 'devin-desktop', value
FROM key_value
WHERE key = 'windsurf'
  AND namespace IN ('customModels', 'syncedAvailableModels', 'modelCompatOverrides');

DELETE FROM key_value
WHERE key = 'windsurf'
  AND namespace IN ('customModels', 'syncedAvailableModels', 'modelCompatOverrides');

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
