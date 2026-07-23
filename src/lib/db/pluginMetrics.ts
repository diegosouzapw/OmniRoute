/**
 * Plugin Metrics DB module — per-plugin hook execution tracking.
 *
 * STATUS: The `plugin_metrics` table (migration 090) is a reserved aggregate table.
 * `recordPluginMetric` is currently NOT called from any production code path — the
 * per-execution row store is `plugin_analytics` (migration 091, read by the
 * `plugin_executions` MCP tool). `plugin_metrics` is intended for future aggregate
 * rollups (e.g. bumping per-(plugin, event) counters from `recordPluginExecution`),
 * but that write path has not been wired yet. Do NOT remove the migration — it is
 * harmless and reserves the schema for the planned rollup feature.
 *
 * @module db/pluginMetrics
 */

import { getDbInstance } from "./core";

export interface PluginMetricRow {
  pluginName: string;
  event: string;
  calls: number;
  errors: number;
  totalDurationMs: number;
  lastCalledAt: string | null;
}

function rowToMetric(row: Record<string, unknown>): PluginMetricRow {
  return {
    pluginName: row.plugin_name as string,
    event: row.event as string,
    calls: row.calls as number,
    errors: row.errors as number,
    totalDurationMs: row.total_duration_ms as number,
    lastCalledAt: row.last_called_at as string | null,
  };
}

/**
 * Record a hook execution metric. Uses UPSERT to increment counters.
 */
export function recordPluginMetric(
  pluginName: string,
  event: string,
  durationMs: number,
  isError: boolean
): void {
  try {
    const db = getDbInstance();
    const now = new Date().toISOString();

    db.prepare(
      `INSERT INTO plugin_metrics (plugin_name, event, calls, errors, total_duration_ms, last_called_at)
       VALUES (?, ?, 1, ?, ?, ?)
       ON CONFLICT(plugin_name, event) DO UPDATE SET
         calls = calls + 1,
         errors = errors + excluded.errors,
         total_duration_ms = total_duration_ms + excluded.total_duration_ms,
         last_called_at = excluded.last_called_at`
    ).run(pluginName, event, isError ? 1 : 0, durationMs, now);
  } catch {
    // Best-effort: DB hiccup should never break hook execution
  }
}

/**
 * Get plugin metrics, optionally filtered by plugin name.
 */
export function getPluginMetrics(pluginName?: string): PluginMetricRow[] {
  try {
    const db = getDbInstance();
    const rows = pluginName
      ? db.prepare("SELECT * FROM plugin_metrics WHERE plugin_name = ? ORDER BY event").all(pluginName)
      : db.prepare("SELECT * FROM plugin_metrics ORDER BY plugin_name, event").all();
    return (rows as Record<string, unknown>[]).map(rowToMetric);
  } catch {
    return [];
  }
}

/**
 * Clear plugin metrics, optionally filtered by plugin name.
 */
export function clearPluginMetrics(pluginName?: string): number {
  const db = getDbInstance();
  const result = pluginName
    ? db.prepare("DELETE FROM plugin_metrics WHERE plugin_name = ?").run(pluginName)
    : db.prepare("DELETE FROM plugin_metrics").run();
  return result.changes;
}
