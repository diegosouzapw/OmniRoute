/**
 * db/settings/lkgp.ts — Last Known Good Provider (LKGP) persistence.
 */

import { getDbInstance } from "../core";

export interface LKGPRecord {
  provider: string;
  connectionId?: string;
}

export async function getLKGP(comboName: string, modelId: string): Promise<LKGPRecord | null> {
  const db = getDbInstance();
  const key = `${comboName}:${modelId}`;
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'lkgp' AND key = ?")
    .get(key) as { value?: string } | undefined;
  if (!row?.value) return null;
  try {
    const parsed = JSON.parse(row.value);
    if (typeof parsed === "object" && parsed !== null && "provider" in parsed) {
      return parsed as LKGPRecord;
    }
    return { provider: String(parsed) };
  } catch {
    return { provider: row.value };
  }
}

export async function setLKGP(
  comboName: string,
  modelId: string,
  providerId: string,
  connectionId?: string
) {
  const db = getDbInstance();
  const key = `${comboName}:${modelId}`;
  const value: LKGPRecord = { provider: providerId };
  if (connectionId) value.connectionId = connectionId;
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('lkgp', ?, ?)").run(
    key,
    JSON.stringify(value)
  );
}

export function clearAllLKGP(): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'lkgp'").run();
}

/**
 * Drop every LKGP pin that references one of `connectionIds` (#8887).
 *
 * A pin persisted by `setLKGP()` carries the connection it was learned from, so
 * deleting that connection leaves the pin pointing at a row that no longer
 * exists. Provider-connection delete paths call this so the pin dies with its
 * connection instead of becoming unbounded stale state.
 *
 * Pins without a `connectionId` (provider-level pins) are never touched.
 * Returns the number of pins removed.
 */
export async function deleteLKGPByConnectionIds(connectionIds: string[]): Promise<number> {
  if (connectionIds.length === 0) return 0;
  const doomed = new Set(connectionIds);
  const db = getDbInstance();

  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'lkgp'")
    .all() as Array<{ key?: string; value?: string }>;

  const staleKeys: string[] = [];
  for (const row of rows) {
    if (!row?.key || !row.value) continue;
    let parsed: unknown;
    try {
      parsed = JSON.parse(row.value);
    } catch {
      continue; // legacy plain-string pin — no connection reference to invalidate
    }
    const connectionId =
      typeof parsed === "object" && parsed !== null
        ? (parsed as LKGPRecord).connectionId
        : undefined;
    if (typeof connectionId === "string" && doomed.has(connectionId)) {
      staleKeys.push(row.key);
    }
  }

  if (staleKeys.length === 0) return 0;

  const deleteStmt = db.prepare("DELETE FROM key_value WHERE namespace = 'lkgp' AND key = ?");
  for (const key of staleKeys) {
    deleteStmt.run(key);
  }

  // The read path is fronted by a 5s in-memory TTL cache; without this it would
  // keep serving the pin we just deleted. Lazy import mirrors readCache's own
  // pattern and keeps this module free of an import cycle.
  const { invalidateCachedLKGP } = await import("../readCache");
  for (const key of staleKeys) {
    invalidateCachedLKGP(key);
  }

  return staleKeys.length;
}
