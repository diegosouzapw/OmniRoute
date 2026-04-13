-- Backfill: if a password exists, mark it as ever having been set.
-- Once passwordEverSet is true, isAuthRequired() stays true even if the
-- password row is later lost (DB corruption protection).
INSERT OR IGNORE INTO key_value (namespace, key, value)
  SELECT 'settings', 'passwordEverSet', 'true'
  FROM key_value
  WHERE namespace = 'settings' AND key = 'password' AND value IS NOT NULL AND value != 'null'
  AND value != '"null"';
