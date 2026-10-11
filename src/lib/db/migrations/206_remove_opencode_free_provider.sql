-- 206_remove_opencode_free_provider.sql
-- The keyless "OpenCode Free" provider (id `opencode`, alias `oc`) was removed
-- from OmniRoute (see docs/reference/REMOVED_PROVIDERS.md). Clean up any
-- locally stored configuration for it. The paid `opencode-zen` and
-- `opencode-go` providers are separate ids and are not touched.
--
-- Historical request, usage, and call-log records are intentionally preserved
-- (same principle as 152_remove_puter_provider.sql).

DELETE FROM provider_connections
WHERE provider IN ('opencode', 'oc');

DELETE FROM registered_keys
WHERE provider IN ('opencode', 'oc');

DELETE FROM provider_key_limits
WHERE provider IN ('opencode', 'oc');

DELETE FROM discovery_results
WHERE provider_id IN ('opencode', 'oc');

-- `opencode` now resolves to `opencode-zen` as a user-typed alias, so a stale
-- hidden/compat override or alias stored under the old id would leak onto the
-- paid Zen provider. Drop every per-provider row keyed by the removed ids.
DELETE FROM key_value
WHERE namespace IN ('customModels', 'modelCompatOverrides', 'providerAliases')
  AND key IN ('opencode', 'oc');

DELETE FROM key_value
WHERE namespace = 'syncedAvailableModels'
  AND (substr(key, 1, length('opencode:')) = 'opencode:'
    OR substr(key, 1, length('oc:')) = 'oc:');
