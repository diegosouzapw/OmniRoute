-- Migration 070: Extend version_manager for embedded services (9router + CLIProxyAPI)
-- (Originally numbered 068; renumbered to 070 to resolve a prefix collision with
--  068_free_proxies.sql. Pre-existing deployments may have version=068 recorded
--  for free_proxies, which would have caused this migration to be skipped
--  silently by the version-only pending filter in migrationRunner.ts.)
--
-- Adds 3 columns to support the embedded-services feature (v3.8.4):
--   logs_buffer_path  — path to ring-buffer log file on disk (optional)
--   provider_expose   — 1 = expose service models in routing (9router), 0 = fallback-only (CLIProxyAPI)
--   last_sync_at      — ISO timestamp of last model-list sync from the service
--
-- Seeds the 9router row with defaults. CLIProxyAPI row is seeded by T-11.
-- ALTER TABLE "duplicate column name" errors are caught by the migration runner
-- and treated as already-applied (idempotent).

ALTER TABLE version_manager ADD COLUMN logs_buffer_path TEXT;
ALTER TABLE version_manager ADD COLUMN provider_expose INTEGER NOT NULL DEFAULT 0;
ALTER TABLE version_manager ADD COLUMN last_sync_at TEXT;

INSERT OR IGNORE INTO version_manager
  (tool, status, port, auto_start, auto_update, provider_expose)
VALUES
  ('9router', 'not_installed', 20130, 0, 1, 1);
