-- Migration 075: backfill self-service own-usage visibility for existing API keys.
--
-- This is intentionally a one-time compatibility update. After it has run,
-- operators may remove "self:usage" from a key and the absence of the scope
-- means self-service usage visibility is disabled.

CREATE TABLE IF NOT EXISTS key_value (
  namespace TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  PRIMARY KEY (namespace, key)
);

UPDATE api_keys
SET scopes = json_array('self:usage')
WHERE NOT EXISTS (
    SELECT 1
    FROM key_value
    WHERE namespace = 'apiKeySelfService'
      AND key = 'usageScopesBackfilled'
  )
  AND (
    scopes IS NULL
    OR trim(scopes) = ''
    OR json_valid(scopes) = 0
    OR CASE
      WHEN json_valid(scopes) = 1 THEN json_type(scopes) != 'array'
      ELSE 0
    END
  );

UPDATE api_keys
SET scopes = json_insert(scopes, '$[#]', 'self:usage')
WHERE NOT EXISTS (
    SELECT 1
    FROM key_value
    WHERE namespace = 'apiKeySelfService'
      AND key = 'usageScopesBackfilled'
  )
  AND scopes IS NOT NULL
  AND trim(scopes) != ''
  AND json_valid(scopes) = 1
  AND json_type(scopes) = 'array'
  AND NOT EXISTS (
    SELECT 1
    FROM json_each(api_keys.scopes)
    WHERE value = 'self:usage'
  );

INSERT OR IGNORE INTO key_value (namespace, key, value)
VALUES ('apiKeySelfService', 'usageScopesBackfilled', datetime('now'));
