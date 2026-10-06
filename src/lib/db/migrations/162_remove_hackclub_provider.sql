-- 162_remove_hackclub_provider.sql
-- Hack Club AI provider was removed from OmniRoute at the request of Hack Club's
-- maintainers (#11118). Clean up any locally stored configuration for it.
-- Historical request and usage records are intentionally preserved under the
-- provider identity that existed when they were written.

DELETE FROM provider_connections
WHERE provider = 'hackclub';

DELETE FROM registered_keys
WHERE provider = 'hackclub';

DELETE FROM provider_key_limits
WHERE provider = 'hackclub';

DELETE FROM discovery_results
WHERE provider_id = 'hackclub';

DELETE FROM key_value
WHERE namespace = 'customModels'
  AND key = 'hackclub';
