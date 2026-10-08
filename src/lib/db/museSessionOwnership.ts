/**
 * db/museSessionOwnership.ts — persistence for Muse Code session ownership.
 *
 * Rows live in the key_value table under the "muse_session_ownership" namespace:
 *   session:<scope>            owner JSON (connection id + credential/account hashes)
 *   served:<scope>             "1" once output was served (pins the owner)
 *   opaque:<scope>:<hash>      generation that received an encrypted_content item
 *   reference:<scope>:<hash>   generation that received a tool call / output item id
 *   touched:<scope>            last activity (epoch ms) — drives idle pruning
 *   cursor                     round-robin cursor for fresh sessions
 *
 * Only SHA-256 digests are stored, never prompts or credentials. The hashing and the
 * ownership rules stay in src/sse/services/museSessionOwnership.ts; this module owns the SQL.
 */

import { getDbInstance } from "./core";

const NAMESPACE = "muse_session_ownership";

/** A session idle for this long is forgotten: its owner pin and recorded items are dropped. */
export const MUSE_SESSION_IDLE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const PRUNE_BATCH_SIZE = 200;

export function readMuseOwnershipValue(key: string): string | undefined {
  return (
    getDbInstance()
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(NAMESPACE, key) as { value: string } | undefined
  )?.value;
}

export function writeMuseOwnershipValue(key: string, value: string): void {
  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(NAMESPACE, key, value);
}

/** Run `fn` inside one IMMEDIATE transaction so claim/bind decisions are atomic. */
export function runMuseOwnershipTransaction(fn: () => void): void {
  getDbInstance().immediate(fn);
}

/** Whether replayable history (encrypted reasoning or tool references) was recorded. */
export function museScopeHasRecordedItems(scope: string): boolean {
  const db = getDbInstance();
  for (const prefix of [`opaque:${scope}:`, `reference:${scope}:`]) {
    const hit = db
      .prepare("SELECT 1 AS hit FROM key_value WHERE namespace = ? AND key LIKE ? LIMIT 1")
      .get(NAMESPACE, `${prefix}%`) as { hit?: number } | undefined;
    if (hit) return true;
  }
  return false;
}

export function touchMuseOwnershipScope(scope: string, now: number = Date.now()): void {
  writeMuseOwnershipValue(`touched:${scope}`, String(now));
}

/**
 * Delete every row of the sessions idle longer than `ttlMs`. Bounded per call so a large
 * backlog never stalls a request; the caller throttles how often it runs.
 */
export function pruneIdleMuseOwnershipScopes(
  now: number = Date.now(),
  ttlMs: number = MUSE_SESSION_IDLE_TTL_MS,
  limit: number = PRUNE_BATCH_SIZE
): number {
  const db = getDbInstance();
  const stale = db
    .prepare(
      `SELECT key FROM key_value
        WHERE namespace = ? AND key LIKE 'touched:%' AND CAST(value AS INTEGER) < ?
        LIMIT ?`
    )
    .all(NAMESPACE, now - ttlMs, limit) as Array<{ key: string }>;
  if (!stale.length) return 0;
  const deleteExact = db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?");
  const deletePrefix = db.prepare("DELETE FROM key_value WHERE namespace = ? AND key LIKE ?");
  db.immediate(() => {
    for (const { key } of stale) {
      const scope = key.slice("touched:".length);
      for (const exact of [`session:${scope}`, `served:${scope}`, key]) {
        deleteExact.run(NAMESPACE, exact);
      }
      deletePrefix.run(NAMESPACE, `opaque:${scope}:%`);
      deletePrefix.run(NAMESPACE, `reference:${scope}:%`);
    }
  });
  return stale.length;
}
