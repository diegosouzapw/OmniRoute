-- Migration 091: plugin_analytics — per-execution records for plugin hooks.
--
-- PR #2913 (plugin framework). The original PR shipped this table only as a
-- non-canonical stray under db/migrations/079_plugin_analytics.sql (a path the
-- migration runner does not read) and its tests created the table inline, so
-- recordPluginExecution()/getPluginAnalytics() in src/lib/db/plugins.ts would
-- fail at runtime in production ("no such table: plugin_analytics"). This
-- canonical migration creates it. Idempotent: safe to run more than once.
--
-- Schema matches src/lib/db/plugins.ts (INSERT/SELECT columns) exactly.

CREATE TABLE IF NOT EXISTS plugin_analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  plugin_name TEXT NOT NULL,
  hook TEXT NOT NULL,
  duration_ms INTEGER NOT NULL DEFAULT 0,
  success INTEGER NOT NULL DEFAULT 1,
  error_message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_plugin_analytics_name ON plugin_analytics(plugin_name);
CREATE INDEX IF NOT EXISTS idx_plugin_analytics_created ON plugin_analytics(created_at);
