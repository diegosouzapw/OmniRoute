-- Remove saved state for a provider ID that is no longer registered.

DELETE FROM provider_connections
WHERE provider = 'qwen';

DELETE FROM key_value
WHERE namespace IN ('cliToolLastConfig', 'cliToolInitialConfig')
  AND key = 'qwen';
