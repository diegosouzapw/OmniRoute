-- Migration 114: Seed the Mux (coder/mux) embedded service row.
--
-- Mux is a local agent-orchestration daemon (npm package `mux`, headless
-- `mux server --port <port>` mode) managed via the ServiceSupervisor
-- framework, same shape as 9Router (071) and CLIProxyAPI (016/017).
-- Seeds a `not_installed` / `auto_start=0` placeholder row so the dashboard
-- tab and /api/services/mux/status have a row to read before install.

INSERT OR IGNORE INTO version_manager
  (tool, status, port, auto_start, auto_update, provider_expose)
VALUES
  ('mux', 'not_installed', 8322, 0, 0, 0);
