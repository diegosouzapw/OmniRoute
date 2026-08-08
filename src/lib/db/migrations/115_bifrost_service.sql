-- Migration 115: Seed version_manager row for Bifrost embedded service
--
-- Bifrost (npm @maximhq/bifrost) is promoted from env-only relay sidecar
-- to a first-class supervised service (v3.8.43).
-- The row is seeded with status='not_installed' so the bootstrap loop
-- skips it until the user installs via /api/services/bifrost/install.
-- Guard: ensure columns added in migration 071 exist (runner may skip 071 on fresh DBs).
ALTER TABLE version_manager ADD COLUMN last_sync_at TEXT;
ALTER TABLE version_manager ADD COLUMN logs_buffer_path TEXT;
ALTER TABLE version_manager ADD COLUMN provider_expose INTEGER NOT NULL DEFAULT 0;
INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
VALUES ('bifrost', 'not_installed', 8080, 0, 1, 1);

