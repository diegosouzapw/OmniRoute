/**
 * db/kv.ts — Shared key_value helpers.
 *
 * Single owner for the `key_value` (namespace, key, value) pattern duplicated
 * across `intelligence/baseSync.ts`, `arenaEloSync.ts`, and the four
 * `intelligence/syncs/*Sync.ts` modules. All helpers are fail-closed:
 * reads degrade to null, writes/deletes log-and-swallow, so a broken KV
 * layer never breaks the sync itself.
 */

import { getDbInstance } from "./core";

const KV_READ_SQL = `SELECT value FROM key_value WHERE namespace = ? AND key = ? LIMIT 1`;
const KV_WRITE_SQL = `INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)`;
const KV_DELETE_SQL = `DELETE FROM key_value WHERE namespace = ? AND key = ?`;

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * Read a raw string value. Returns null when missing or on KV error.
 */
export function readKv(namespace: string, key: string, logTag = "INTEL_SYNC"): string | null {
  try {
    const db = getDbInstance();
    const row = db.prepare(KV_READ_SQL).get(namespace, key) as { value: string } | undefined;
    return row?.value ?? null;
  } catch (err) {
    console.warn(`[${logTag}] Failed to read ${namespace}/${key}: ${getErrorMessage(err)}`);
    return null;
  }
}

/**
 * Persist a raw string value. Log-and-swallow on KV error.
 */
export function writeKv(
  namespace: string,
  key: string,
  value: string,
  logTag = "INTEL_SYNC",
): void {
  try {
    const db = getDbInstance();
    db.prepare(KV_WRITE_SQL).run(namespace, key, value);
  } catch (err) {
    console.warn(`[${logTag}] Failed to persist ${namespace}/${key}: ${getErrorMessage(err)}`);
  }
}

/**
 * Delete a KV row. Log-and-swallow on KV error — a stuck row only costs
 * a redundant fetch later, never a broken sync.
 */
export function deleteKv(namespace: string, key: string, logTag = "INTEL_SYNC"): void {
  try {
    const db = getDbInstance();
    db.prepare(KV_DELETE_SQL).run(namespace, key);
  } catch (err) {
    console.warn(`[${logTag}] Failed to delete ${namespace}/${key}: ${getErrorMessage(err)}`);
  }
}

/**
 * Read an ISO-timestamp value as epoch ms. Returns null when missing,
 * unparseable, or on KV error.
 */
export function readKvTimestamp(namespace: string, key: string): number | null {
  const raw = readKv(namespace, key);
  if (!raw) return null;
  const ts = Date.parse(raw);
  return Number.isFinite(ts) ? ts : null;
}

/**
 * Persist an epoch-ms timestamp as an ISO string.
 */
export function writeKvTimestamp(
  namespace: string,
  key: string,
  ts: number,
  logTag = "INTEL_SYNC",
): void {
  writeKv(namespace, key, new Date(ts).toISOString(), logTag);
}

/**
 * Delete a timestamp row. Swallows errors (see deleteKv rationale).
 */
export function clearKvTimestamp(namespace: string, key: string, logTag = "INTEL_SYNC"): void {
  deleteKv(namespace, key, logTag);
}
