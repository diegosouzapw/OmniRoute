-- 062_proxy_enable_toggles.sql
-- Add per-connection proxy enable/disable toggle to support the
-- proxy enable/disable feature with auto-selection fallback.
--
-- New column:
--   proxy_enabled — 1=proxy enabled for this connection, 0=disabled (default 1 for backward compat)
--
-- The global proxy on/off toggle lives in the settings namespace (key: proxyEnabled).
-- This per-connection column provides finer-grained control at the provider level.

ALTER TABLE provider_connections ADD COLUMN proxy_enabled INTEGER NOT NULL DEFAULT 1;

-- Set proxy_enabled=1 for all existing rows to preserve backward compatibility.
-- Before this migration, proxy was implicitly enabled (no toggle existed).
-- This UPDATE runs on the initial migration apply; on re-runs the ALTER TABLE
-- above fails with "duplicate column" and the migration runner skips the rest.
UPDATE provider_connections SET proxy_enabled = 1 WHERE proxy_enabled = 0;
