-- 104_normalize_database_cache_size.sql
-- Normalize the old SQLite cache-size default to the new UI contract:
-- databaseSettings.optimization.cacheSize is a positive KiB value, e.g. 16384.
-- Only legacy defaults are rewritten; custom positive values are preserved.

UPDATE key_value
SET value = '16384'
WHERE namespace = 'databaseSettings'
  AND key IN ('cacheSize', 'optimization.cacheSize')
  AND TRIM(value) IN ('-2000', '"-2000"', '10000', '"10000"');
