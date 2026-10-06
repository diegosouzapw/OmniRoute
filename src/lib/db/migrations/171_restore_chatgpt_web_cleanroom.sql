-- Migration 171 restores only the independently reimplemented canonical `chatgpt-web` provider.
--
-- Migration 168 intentionally retired both `chatgpt-web` and its legacy `cgpt-web`
-- alias because the removed implementation had unclear provenance. The new common
-- provider does not reuse that source or credential contract. Keep existing rows
-- disabled until an operator explicitly supplies the new storage-state credential;
-- this migration only relaxes the durable triggers for future canonical writes.
--
-- `cgpt-web` remains retired. It is not an alias of the clean-room provider.

DROP TRIGGER IF EXISTS provider_connections_retire_chatgpt_web_insert;
DROP TRIGGER IF EXISTS provider_connections_retire_chatgpt_web_update;
DROP TRIGGER IF EXISTS exclusive_connection_leases_retire_chatgpt_web_insert;
DROP TRIGGER IF EXISTS exclusive_connection_leases_retire_chatgpt_web_update;

CREATE TRIGGER provider_connections_retire_chatgpt_web_insert
AFTER INSERT ON provider_connections
WHEN lower(trim(NEW.provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
    = 'cgpt-web'
BEGIN
  UPDATE provider_connections
  SET is_active = 0,
      test_status = 'unavailable',
      error_code = 'PROVIDER_REMOVED',
      last_error = 'Provider integration retired from OmniRoute v3.8.51',
      last_error_type = 'provider_removed',
      last_error_source = 'migration:retire-chatgpt-web',
      last_error_at = datetime('now'),
      updated_at = datetime('now')
  WHERE id = NEW.id
    AND (
      is_active IS NOT 0
      OR test_status IS NOT 'unavailable'
      OR error_code IS NOT 'PROVIDER_REMOVED'
      OR last_error IS NOT 'Provider integration retired from OmniRoute v3.8.51'
      OR last_error_type IS NOT 'provider_removed'
      OR last_error_source IS NOT 'migration:retire-chatgpt-web'
      OR last_error_at IS NULL
    );

  UPDATE exclusive_connection_leases
  SET state = 'INVALIDATED',
      ended_at = datetime('now'),
      end_reason = 'CONNECTION_INELIGIBLE'
  WHERE state = 'ACTIVE'
    AND connection_id = NEW.id;
END;

CREATE TRIGGER provider_connections_retire_chatgpt_web_update
AFTER UPDATE OF provider, is_active, test_status, error_code, last_error,
  last_error_type, last_error_source, last_error_at ON provider_connections
WHEN lower(trim(NEW.provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
    = 'cgpt-web'
BEGIN
  UPDATE provider_connections
  SET is_active = 0,
      test_status = 'unavailable',
      error_code = 'PROVIDER_REMOVED',
      last_error = 'Provider integration retired from OmniRoute v3.8.51',
      last_error_type = 'provider_removed',
      last_error_source = 'migration:retire-chatgpt-web',
      last_error_at = datetime('now'),
      updated_at = datetime('now')
  WHERE id = NEW.id
    AND (
      is_active IS NOT 0
      OR test_status IS NOT 'unavailable'
      OR error_code IS NOT 'PROVIDER_REMOVED'
      OR last_error IS NOT 'Provider integration retired from OmniRoute v3.8.51'
      OR last_error_type IS NOT 'provider_removed'
      OR last_error_source IS NOT 'migration:retire-chatgpt-web'
      OR last_error_at IS NULL
    );

  UPDATE exclusive_connection_leases
  SET state = 'INVALIDATED',
      ended_at = datetime('now'),
      end_reason = 'CONNECTION_INELIGIBLE'
  WHERE state = 'ACTIVE'
    AND connection_id = NEW.id;
END;

CREATE TRIGGER exclusive_connection_leases_retire_chatgpt_web_insert
AFTER INSERT ON exclusive_connection_leases
WHEN NEW.state = 'ACTIVE'
  AND (
    lower(trim(NEW.provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
      = 'cgpt-web'
    OR EXISTS (
      SELECT 1
      FROM provider_connections
      WHERE id = NEW.connection_id
        AND lower(trim(provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
          = 'cgpt-web'
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

CREATE TRIGGER exclusive_connection_leases_retire_chatgpt_web_update
AFTER UPDATE OF provider, connection_id, state ON exclusive_connection_leases
WHEN NEW.state = 'ACTIVE'
  AND (
    lower(trim(NEW.provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
      = 'cgpt-web'
    OR EXISTS (
      SELECT 1
      FROM provider_connections
      WHERE id = NEW.connection_id
        AND lower(trim(provider, char(9,10,11,12,13,32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)))
          = 'cgpt-web'
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
