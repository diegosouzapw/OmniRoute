-- Retire the Raycast Relay and Hailuo Web integrations whose distributed
-- implementations were substantially derived from GPL-3.0 sources.
--
-- Keep connection rows and historical records for auditability. Disabling the
-- connections is deliberately fail-closed: API-key allowed_connections entries
-- continue to reference the same connection ids instead of becoming an empty
-- allowlist, which would mean unrestricted access in the policy layer.

UPDATE exclusive_connection_leases
SET state = 'INVALIDATED',
    ended_at = COALESCE(ended_at, datetime('now')),
    end_reason = COALESCE(end_reason, 'provider integration retired in v3.8.51')
WHERE state = 'ACTIVE'
  AND (
    provider IN ('raycast', 'rc', 'hailuo-web')
    OR connection_id IN (
      SELECT id
      FROM provider_connections
      WHERE provider IN ('raycast', 'rc', 'hailuo-web')
    )
  );

UPDATE provider_connections
SET is_active = 0,
    test_status = 'unavailable',
    error_code = 'PROVIDER_REMOVED',
    last_error = 'Provider integration retired from OmniRoute v3.8.51',
    last_error_type = 'provider_removed',
    last_error_source = 'migration:166',
    last_error_at = COALESCE(last_error_at, datetime('now')),
    updated_at = datetime('now')
WHERE provider IN ('raycast', 'rc', 'hailuo-web');
