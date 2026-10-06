-- Permanently retire the Microsoft Designer Web reverse-engineered integration.
-- Keep connection rows, encrypted credentials, allowlists, and historical usage intact.

UPDATE provider_connections
SET is_active = 0,
    test_status = 'unavailable',
    last_error = 'Provider retired from OmniRoute runtime.',
    last_error_at = COALESCE(last_error_at, CURRENT_TIMESTAMP),
    last_error_type = 'provider_retired',
    last_error_source = 'migration:retire-microsoft-designer-web'
WHERE lower(trim(provider, ' ' || char(9) || char(10) || char(11) || char(12) || char(13)))
  IN ('microsoft-designer-web', 'msdesigner');

UPDATE exclusive_connection_leases
SET state = 'INVALIDATED',
    ended_at = COALESCE(ended_at, CURRENT_TIMESTAMP),
    end_reason = 'AUTHORIZATION_CHANGED'
WHERE state = 'ACTIVE'
  AND (
    lower(trim(provider, ' ' || char(9) || char(10) || char(11) || char(12) || char(13)))
      IN ('microsoft-designer-web', 'msdesigner')
    OR connection_id IN (
      SELECT id
      FROM provider_connections
      WHERE lower(trim(provider, ' ' || char(9) || char(10) || char(11) || char(12) || char(13)))
        IN ('microsoft-designer-web', 'msdesigner')
    )
  );

CREATE TRIGGER IF NOT EXISTS trg_retire_microsoft_designer_web_provider_insert
AFTER INSERT ON provider_connections
WHEN lower(trim(NEW.provider, ' ' || char(9) || char(10) || char(11) || char(12) || char(13)))
  IN ('microsoft-designer-web', 'msdesigner')
BEGIN
  UPDATE provider_connections
  SET is_active = 0,
      test_status = 'unavailable',
      last_error = 'Provider retired from OmniRoute runtime.',
      last_error_at = COALESCE(last_error_at, CURRENT_TIMESTAMP),
      last_error_type = 'provider_retired',
      last_error_source = 'migration:retire-microsoft-designer-web'
  WHERE id = NEW.id;

  UPDATE exclusive_connection_leases
  SET state = 'INVALIDATED',
      ended_at = COALESCE(ended_at, CURRENT_TIMESTAMP),
      end_reason = 'AUTHORIZATION_CHANGED'
  WHERE connection_id = NEW.id AND state = 'ACTIVE';
END;

CREATE TRIGGER IF NOT EXISTS trg_retire_microsoft_designer_web_provider_update
AFTER UPDATE OF provider, is_active, test_status, last_error, last_error_type, last_error_source
ON provider_connections
WHEN lower(trim(NEW.provider, ' ' || char(9) || char(10) || char(11) || char(12) || char(13)))
       IN ('microsoft-designer-web', 'msdesigner')
  AND (
    COALESCE(NEW.is_active, 0) <> 0
    OR COALESCE(NEW.test_status, '') <> 'unavailable'
    OR COALESCE(NEW.last_error, '') <> 'Provider retired from OmniRoute runtime.'
    OR COALESCE(NEW.last_error_type, '') <> 'provider_retired'
    OR COALESCE(NEW.last_error_source, '') <> 'migration:retire-microsoft-designer-web'
  )
BEGIN
  UPDATE provider_connections
  SET is_active = 0,
      test_status = 'unavailable',
      last_error = 'Provider retired from OmniRoute runtime.',
      last_error_at = COALESCE(last_error_at, CURRENT_TIMESTAMP),
      last_error_type = 'provider_retired',
      last_error_source = 'migration:retire-microsoft-designer-web'
  WHERE id = NEW.id;

  UPDATE exclusive_connection_leases
  SET state = 'INVALIDATED',
      ended_at = COALESCE(ended_at, CURRENT_TIMESTAMP),
      end_reason = 'AUTHORIZATION_CHANGED'
  WHERE connection_id = NEW.id AND state = 'ACTIVE';
END;

CREATE TRIGGER IF NOT EXISTS trg_retire_microsoft_designer_web_lease_insert
AFTER INSERT ON exclusive_connection_leases
WHEN NEW.state = 'ACTIVE'
  AND (
    lower(trim(NEW.provider, ' ' || char(9) || char(10) || char(11) || char(12) || char(13)))
      IN ('microsoft-designer-web', 'msdesigner')
    OR EXISTS (
      SELECT 1
      FROM provider_connections
      WHERE id = NEW.connection_id
        AND lower(trim(provider, ' ' || char(9) || char(10) || char(11) || char(12) || char(13)))
          IN ('microsoft-designer-web', 'msdesigner')
    )
  )
BEGIN
  UPDATE exclusive_connection_leases
  SET state = 'INVALIDATED',
      ended_at = COALESCE(ended_at, CURRENT_TIMESTAMP),
      end_reason = 'AUTHORIZATION_CHANGED'
  WHERE id = NEW.id AND state = 'ACTIVE';
END;

CREATE TRIGGER IF NOT EXISTS trg_retire_microsoft_designer_web_lease_update
AFTER UPDATE OF provider, connection_id, state ON exclusive_connection_leases
WHEN NEW.state = 'ACTIVE'
  AND (
    lower(trim(NEW.provider, ' ' || char(9) || char(10) || char(11) || char(12) || char(13)))
      IN ('microsoft-designer-web', 'msdesigner')
    OR EXISTS (
      SELECT 1
      FROM provider_connections
      WHERE id = NEW.connection_id
        AND lower(trim(provider, ' ' || char(9) || char(10) || char(11) || char(12) || char(13)))
          IN ('microsoft-designer-web', 'msdesigner')
    )
  )
BEGIN
  UPDATE exclusive_connection_leases
  SET state = 'INVALIDATED',
      ended_at = COALESCE(ended_at, CURRENT_TIMESTAMP),
      end_reason = 'AUTHORIZATION_CHANGED'
  WHERE id = NEW.id AND state = 'ACTIVE';
END;
