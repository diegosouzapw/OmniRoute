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

DELETE FROM key_value
WHERE namespace = 'customModels'
  AND key IN ('opencode', 'oc');
