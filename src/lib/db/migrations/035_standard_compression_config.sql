-- 035_standard_compression_config.sql
-- Adds Phase 2 standard/caveman compression defaults without overwriting user settings.

INSERT OR IGNORE INTO key_value (namespace, key, value)
VALUES (
  'compression',
  'cavemanConfig',
  '{"enabled":true,"compressRoles":["user"],"skipRules":[],"minMessageLength":50,"preservePatterns":[]}'
);
