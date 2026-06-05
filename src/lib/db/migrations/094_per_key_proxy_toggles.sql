-- 063_per_key_proxy_toggles.sql
-- Add per-connection toggle for per-key proxy assignment.
-- When enabled, each API key under this connection can use its own proxy
-- (from api_keys.proxy_id) instead of the connection-level proxy.
--
-- New column:
--   per_key_proxy_enabled — 1=allow per-key proxy assignment, 0=disabled (default)
--
-- The global per-key proxy toggle lives in the settings namespace
-- (key: perKeyProxyEnabled).

ALTER TABLE provider_connections ADD COLUMN per_key_proxy_enabled INTEGER NOT NULL DEFAULT 0;
