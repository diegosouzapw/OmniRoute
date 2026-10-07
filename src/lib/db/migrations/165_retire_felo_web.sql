-- Retire the Felo Web integration while its GPL-derived provenance remains on hold.
--
-- Match the complete ECMAScript trim whitespace set so database tombstones and
-- the TypeScript runtime agree even for restored provider ids wrapped in Unicode
-- spaces (NBSP, OGHAM, U+2000..U+200A, line/paragraph separators and BOM).
--
-- Keep connection rows and historical records for auditability. Disabling the
-- connections is deliberately fail-closed: API-key allowed_connections entries
-- continue to reference the same connection ids instead of becoming an empty
-- allowlist, which would mean unrestricted access in the policy layer.

UPDATE exclusive_connection_leases
SET state = 'INVALIDATED',
    ended_at = datetime('now'),
    end_reason = 'CONNECTION_INELIGIBLE'
WHERE state = 'ACTIVE'
  AND (
    lower(trim(provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
      IN ('felo-web', 'felo')
    OR connection_id IN (
      SELECT id
      FROM provider_connections
      WHERE lower(trim(provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
        IN ('felo-web', 'felo')
    )
  );

UPDATE provider_connections
SET is_active = 0,
    test_status = 'unavailable',
    error_code = 'PROVIDER_REMOVED',
    last_error = 'Provider integration retired from OmniRoute v3.8.50',
    last_error_type = 'provider_removed',
    last_error_source = 'migration:retire-felo-web',
    last_error_at = datetime('now'),
    updated_at = datetime('now')
WHERE lower(trim(provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
    IN ('felo-web', 'felo')
  AND (
    is_active IS NOT 0
    OR test_status IS NOT 'unavailable'
    OR error_code IS NOT 'PROVIDER_REMOVED'
    OR last_error IS NOT 'Provider integration retired from OmniRoute v3.8.50'
    OR last_error_type IS NOT 'provider_removed'
    OR last_error_source IS NOT 'migration:retire-felo-web'
    OR last_error_at IS NULL
  );

-- Migrations run before settings imports. Keep the tombstone durable when an
-- old db.json snapshot or an admin PATCH later attempts to reactivate either
-- retired id. The WHEN predicates are null-safe and prevent timestamp churn
-- when an already-normalized row is written again.
CREATE TRIGGER IF NOT EXISTS provider_connections_retire_felo_web_insert
AFTER INSERT ON provider_connections
WHEN lower(trim(NEW.provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
    IN ('felo-web', 'felo')
BEGIN
  UPDATE provider_connections
  SET is_active = 0,
      test_status = 'unavailable',
      error_code = 'PROVIDER_REMOVED',
      last_error = 'Provider integration retired from OmniRoute v3.8.50',
      last_error_type = 'provider_removed',
      last_error_source = 'migration:retire-felo-web',
      last_error_at = datetime('now'),
      updated_at = datetime('now')
  WHERE id = NEW.id
    AND (
      is_active IS NOT 0
      OR test_status IS NOT 'unavailable'
      OR error_code IS NOT 'PROVIDER_REMOVED'
      OR last_error IS NOT 'Provider integration retired from OmniRoute v3.8.50'
      OR last_error_type IS NOT 'provider_removed'
      OR last_error_source IS NOT 'migration:retire-felo-web'
      OR last_error_at IS NULL
    );

  UPDATE exclusive_connection_leases
  SET state = 'INVALIDATED',
      ended_at = datetime('now'),
      end_reason = 'CONNECTION_INELIGIBLE'
  WHERE state = 'ACTIVE'
    AND connection_id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS provider_connections_retire_felo_web_update
AFTER UPDATE OF provider, is_active, test_status, error_code, last_error,
  last_error_type, last_error_source, last_error_at ON provider_connections
WHEN lower(trim(NEW.provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
    IN ('felo-web', 'felo')
BEGIN
  UPDATE provider_connections
  SET is_active = 0,
      test_status = 'unavailable',
      error_code = 'PROVIDER_REMOVED',
      last_error = 'Provider integration retired from OmniRoute v3.8.50',
      last_error_type = 'provider_removed',
      last_error_source = 'migration:retire-felo-web',
      last_error_at = datetime('now'),
      updated_at = datetime('now')
  WHERE id = NEW.id
    AND (
      is_active IS NOT 0
      OR test_status IS NOT 'unavailable'
      OR error_code IS NOT 'PROVIDER_REMOVED'
      OR last_error IS NOT 'Provider integration retired from OmniRoute v3.8.50'
      OR last_error_type IS NOT 'provider_removed'
      OR last_error_source IS NOT 'migration:retire-felo-web'
      OR last_error_at IS NULL
    );

  UPDATE exclusive_connection_leases
  SET state = 'INVALIDATED',
      ended_at = datetime('now'),
      end_reason = 'CONNECTION_INELIGIBLE'
  WHERE state = 'ACTIVE'
    AND connection_id = NEW.id;
END;

-- Once a connection id belongs to a retired provider, imports and internal
-- writers must not repurpose that same audited identity as another provider.
-- Retired-to-retired normalization remains allowed and is re-tombstoned by the
-- AFTER UPDATE trigger above.
CREATE TRIGGER IF NOT EXISTS provider_connections_preserve_felo_web_identity_insert
BEFORE INSERT ON provider_connections
WHEN EXISTS (
    SELECT 1
    FROM provider_connections
    WHERE id = NEW.id
      AND lower(trim(provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
        IN ('felo-web', 'felo')
  )
  AND lower(trim(NEW.provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
    NOT IN ('felo-web', 'felo')
BEGIN
  SELECT RAISE(ABORT, 'Retired provider connection identity cannot be changed');
END;

CREATE TRIGGER IF NOT EXISTS provider_connections_preserve_felo_web_identity_update
BEFORE UPDATE OF provider ON provider_connections
WHEN lower(trim(OLD.provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
    IN ('felo-web', 'felo')
  AND lower(trim(NEW.provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
    NOT IN ('felo-web', 'felo')
BEGIN
  SELECT RAISE(ABORT, 'Retired provider connection identity cannot be changed');
END;

-- A restore can also insert lease rows after migrations have completed. Keep
-- lease state fail-closed independently of request-time auth selection.
CREATE TRIGGER IF NOT EXISTS exclusive_connection_leases_retire_felo_web_insert
AFTER INSERT ON exclusive_connection_leases
WHEN NEW.state = 'ACTIVE'
  AND (
    lower(trim(NEW.provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
      IN ('felo-web', 'felo')
    OR EXISTS (
      SELECT 1
      FROM provider_connections
      WHERE id = NEW.connection_id
        AND lower(trim(provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
          IN ('felo-web', 'felo')
    )
  )
BEGIN
  UPDATE exclusive_connection_leases
  SET state = 'INVALIDATED',
      ended_at = datetime('now'),
      end_reason = 'CONNECTION_INELIGIBLE'
  WHERE id = NEW.id
    AND state = 'ACTIVE';
END;

CREATE TRIGGER IF NOT EXISTS exclusive_connection_leases_retire_felo_web_update
AFTER UPDATE OF provider, connection_id, state ON exclusive_connection_leases
WHEN NEW.state = 'ACTIVE'
  AND (
    lower(trim(NEW.provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
      IN ('felo-web', 'felo')
    OR EXISTS (
      SELECT 1
      FROM provider_connections
      WHERE id = NEW.connection_id
        AND lower(trim(provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
          IN ('felo-web', 'felo')
    )
  )
BEGIN
  UPDATE exclusive_connection_leases
  SET state = 'INVALIDATED',
      ended_at = datetime('now'),
      end_reason = 'CONNECTION_INELIGIBLE'
  WHERE id = NEW.id
    AND state = 'ACTIVE';
END;
