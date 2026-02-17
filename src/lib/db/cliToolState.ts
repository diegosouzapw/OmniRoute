/**
 * CLI Tool State Persistence
 *
 * Stores last-configured timestamps and initial config snapshots
 * for CLI tools in the key_value table.
 *
 * Namespaces:
 *   - cliToolLastConfig: ISO timestamp of last configuration
 *   - cliToolInitialConfig: JSON snapshot of pre-OmniRoute configuration
 *
 * @module lib/db/cliToolState
 */

import { getDbInstance, isBuildPhase, isCloud } from "./core";

// ──────────────── Last Configured Timestamp ────────────────

/**
 * Save last-configured timestamp for a CLI tool.
 */
export function saveCliToolLastConfigured(
  toolId: string,
  timestamp: string = new Date().toISOString()
) {
  if (isBuildPhase || isCloud) return;
  const db = getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "cliToolLastConfig",
    toolId,
    JSON.stringify(timestamp)
  );
}

/**
 * Get last-configured timestamp for a CLI tool.
 * @returns ISO timestamp string or null if never configured.
 */
export function getCliToolLastConfigured(toolId: string): string | null {
  if (isBuildPhase || isCloud) return null;
  const db = getDbInstance();
  const row: any = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get("cliToolLastConfig", toolId);
  return row ? JSON.parse(row.value) : null;
}

/**
 * Get all CLI tool last-configured timestamps.
 * @returns Record<toolId, ISO timestamp>
 */
export function getAllCliToolLastConfigured(): Record<string, string> {
  if (isBuildPhase || isCloud) return {};
  const db = getDbInstance();
  const rows: any[] = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all("cliToolLastConfig");
  const result: Record<string, string> = {};
  for (const row of rows) {
    result[row.key] = JSON.parse(row.value);
  }
  return result;
}

/**
 * Delete last-configured timestamp for a CLI tool.
 */
export function deleteCliToolLastConfigured(toolId: string) {
  if (isBuildPhase || isCloud) return;
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
    "cliToolLastConfig",
    toolId
  );
}

// ──────────────── Initial Config Snapshot ────────────────

/**
 * Save the initial (pre-OmniRoute) config snapshot for a CLI tool.
 * Only saves if no snapshot exists yet (first-time only).
 * @returns true if saved, false if snapshot already exists.
 */
export function saveCliToolInitialConfig(toolId: string, config: Record<string, any>): boolean {
  if (isBuildPhase || isCloud) return false;
  const db = getDbInstance();
  // Only save if not already stored
  const existing: any = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get("cliToolInitialConfig", toolId);
  if (existing) return false;

  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "cliToolInitialConfig",
    toolId,
    JSON.stringify(config)
  );
  return true;
}

/**
 * Get the initial config snapshot for a CLI tool.
 * @returns Config object or null if no snapshot exists.
 */
export function getCliToolInitialConfig(toolId: string): Record<string, any> | null {
  if (isBuildPhase || isCloud) return null;
  const db = getDbInstance();
  const row: any = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get("cliToolInitialConfig", toolId);
  return row ? JSON.parse(row.value) : null;
}

/**
 * Delete the initial config snapshot for a CLI tool.
 */
export function deleteCliToolInitialConfig(toolId: string) {
  if (isBuildPhase || isCloud) return;
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
    "cliToolInitialConfig",
    toolId
  );
}
