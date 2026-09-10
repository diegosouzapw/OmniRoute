-- Migration 163: Seed the open-wa (@open-wa/wa-automate) embedded service row.
--
-- open-wa is a WhatsApp Web automation library (npm package
-- `@open-wa/wa-automate`, CLI server mode `wa-automate --port <port>`)
-- managed via the ServiceSupervisor framework, same shape as Mux (114) and
-- Bifrost (115). It is lifecycle-managed only — not a routing target, so
-- provider_expose stays 0. Seeds a `not_installed` / `auto_start=0`
-- placeholder row so the dashboard tab and /api/services/openwa/status have
-- a row to read before install.

INSERT OR IGNORE INTO version_manager
  (tool, status, port, auto_start, auto_update, provider_expose)
VALUES
  ('openwa', 'not_installed', 8323, 0, 0, 0);
