-- 159_remove_mimocode_provider.sql
-- MiMoCode was removed from OmniRoute, but installations that configured it
-- before removal can retain provider-scoped state. Remove that stale
-- configuration for both the canonical provider id and its historical alias.
--
-- Historical request, usage, and call-log records are intentionally preserved.

DELETE FROM provider_connections
WHERE provider IN ('mimocode', 'mcode');

DELETE FROM registered_keys
WHERE provider IN ('mimocode', 'mcode');

DELETE FROM provider_key_limits
WHERE provider IN ('mimocode', 'mcode');

DELETE FROM discovery_results
WHERE provider_id IN ('mimocode', 'mcode');

DELETE FROM key_value
WHERE namespace = 'customModels'
  AND key IN ('mimocode', 'mcode');
