/**
 * Middleware Hooks DB — CRUD operations for middleware_hooks table
 *
 * Module: src/lib/db/middleware.ts
 * Table: middleware_hooks
 * Logs:  middleware_logs
 */

import { getDbInstance } from "@/lib/db/core";
import { rowToCamel } from "@/lib/db/core";
import type { HookConfig, HookConfigRow, HookLogEntry, HookScope } from "@/lib/middleware/types";

// ── Helpers ───────────────────────────────────────────────────────────────

function rowToHookConfig(row: HookConfigRow): HookConfig {
  return {
    name: row.name,
    description: row.description,
    priority: row.priority,
    scope:
      row.scope_type === "combo" && row.combo_id
        ? { type: "combo", comboId: row.combo_id }
        : { type: "global" },
    enabled: row.enabled === 1,
    code: row.code,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    runCount: row.run_count,
    lastError: row.last_error || undefined,
  };
}

function hookConfigToRow(config: HookConfig): HookConfigRow {
  return {
    name: config.name,
    description: config.description,
    priority: config.priority,
    scope_type: config.scope.type,
    combo_id: config.scope.type === "combo" ? config.scope.comboId : null,
    enabled: config.enabled ? 1 : 0,
    code: config.code,
    created_at: config.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
    run_count: config.runCount || 0,
    last_error: config.lastError,
  };
}

// ── CRUD Operations ───────────────────────────────────────────────────────

/**
 * Get all hooks from DB.
 */
export function getAllMiddlewareHooks(): HookConfig[] {
  const db = getDbInstance() as any;
  const rows = db
    .prepare("SELECT * FROM middleware_hooks ORDER BY priority ASC, name ASC")
    .all() as HookConfigRow[];
  return rows.map(rowToHookConfig);
}

/**
 * Get enabled hooks from DB (for runtime loading).
 */
export function getEnabledMiddlewareHooks(): HookConfig[] {
  const db = getDbInstance() as any;
  const rows = db
    .prepare("SELECT * FROM middleware_hooks WHERE enabled = 1 ORDER BY priority ASC")
    .all() as HookConfigRow[];
  return rows.map(rowToHookConfig);
}

/**
 * Get scoped hooks for a given combo ID.
 */
export function getComboMiddlewareHooks(comboId: string): HookConfig[] {
  const db = getDbInstance() as any;
  const rows = db
    .prepare(
      "SELECT * FROM middleware_hooks WHERE enabled = 1 AND (scope_type = 'global' OR (scope_type = 'combo' AND combo_id = ?)) ORDER BY priority ASC"
    )
    .all(comboId) as HookConfigRow[];
  return rows.map(rowToHookConfig);
}

/**
 * Get a single hook by name.
 */
export function getMiddlewareHook(name: string): HookConfig | undefined {
  const db = getDbInstance() as any;
  const row = db.prepare("SELECT * FROM middleware_hooks WHERE name = ?").get(name) as
    | HookConfigRow
    | undefined;
  return row ? rowToHookConfig(row) : undefined;
}

/**
 * Create a new middleware hook.
 */
export function createMiddlewareHook(config: HookConfig): HookConfig {
  const db = getDbInstance() as any;
  const row = hookConfigToRow(config);
  row.created_at = new Date().toISOString();
  row.updated_at = row.created_at;

  db.prepare(
    `
    INSERT INTO middleware_hooks (name, description, priority, scope_type, combo_id, enabled, code, created_at, updated_at, run_count, last_error)
    VALUES (@name, @description, @priority, @scope_type, @combo_id, @enabled, @code, @created_at, @updated_at, @run_count, @last_error)
  `
  ).run(row);

  return getMiddlewareHook(config.name)!;
}

/**
 * Update an existing middleware hook.
 */
export function updateMiddlewareHook(
  name: string,
  updates: Partial<HookConfig>
): HookConfig | undefined {
  const existing = getMiddlewareHook(name);
  if (!existing) return undefined;

  const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
  const row = hookConfigToRow(updated);
  const db = getDbInstance() as any;

  db.prepare(
    `
    UPDATE middleware_hooks SET
      description = @description,
      priority = @priority,
      scope_type = @scope_type,
      combo_id = @combo_id,
      enabled = @enabled,
      code = @code,
      updated_at = @updated_at,
      run_count = @run_count,
      last_error = @last_error
    WHERE name = @name
  `
  ).run(row);

  return getMiddlewareHook(name);
}

/**
 * Delete a middleware hook.
 */
export function deleteMiddlewareHook(name: string): boolean {
  const db = getDbInstance() as any;
  const result = db.prepare("DELETE FROM middleware_hooks WHERE name = ?").run(name);
  return result.changes > 0;
}

/**
 * Increment run count and optionally update last error.
 */
export function recordHookExecution(name: string, error?: string): void {
  const db = getDbInstance() as any;
  if (error) {
    db.prepare(
      "UPDATE middleware_hooks SET run_count = run_count + 1, last_error = ?, updated_at = datetime('now') WHERE name = ?"
    ).run(error, name);
  } else {
    db.prepare(
      "UPDATE middleware_hooks SET run_count = run_count + 1, last_error = NULL, updated_at = datetime('now') WHERE name = ?"
    ).run(name);
  }
}

// ── Log Operations ────────────────────────────────────────────────────────

/**
 * Insert a hook execution log entry.
 */
export function insertHookLog(entry: HookLogEntry): void {
  const db = getDbInstance() as any;
  db.prepare(
    `
    INSERT INTO middleware_logs (id, hook_name, request_id, duration_ms, mutated, skipped, error, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    entry.id,
    entry.hookName,
    entry.requestId,
    entry.durationMs,
    entry.mutated ? 1 : 0,
    entry.skipped ? 1 : 0,
    entry.error || null,
    entry.timestamp
  );
}

/**
 * Get hook execution logs, optionally filtered by hook name.
 */
export function getHookLogs(hookName?: string, limit = 50): HookLogEntry[] {
  const db = getDbInstance() as any;
  let rows: any[];
  if (hookName) {
    rows = db
      .prepare("SELECT * FROM middleware_logs WHERE hook_name = ? ORDER BY timestamp DESC LIMIT ?")
      .all(hookName, limit);
  } else {
    rows = db.prepare("SELECT * FROM middleware_logs ORDER BY timestamp DESC LIMIT ?").all(limit);
  }
  return rows.map((r: any) => ({
    id: r.id,
    hookName: r.hook_name,
    requestId: r.request_id,
    durationMs: r.duration_ms,
    mutated: r.mutated === 1,
    skipped: r.skipped === 1,
    error: r.error,
    timestamp: r.timestamp,
  }));
}

/**
 * Clean up old hook logs (keep last N entries).
 */
export function cleanupHookLogs(maxEntries = 10000): number {
  const db = getDbInstance() as any;
  // Delete logs beyond the max, keeping the most recent
  const result = db
    .prepare(
      `
    DELETE FROM middleware_logs WHERE id NOT IN (
      SELECT id FROM middleware_logs ORDER BY timestamp DESC LIMIT ?
    )
  `
    )
    .run(maxEntries);
  return result.changes;
}
