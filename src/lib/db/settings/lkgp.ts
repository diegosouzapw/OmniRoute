/**
 * db/settings/lkgp.ts — Last Known Good Provider (LKGP) persistence.
 */

import { getDbInstance } from "../core";

/**
 * Escape SQLite `LIKE` wildcards so a combo name containing `%` or `_` cannot
 * widen the prefix match into unrelated combos' pins.
 */
function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`);
}

export function deleteLKGPRowsByComboName(comboName: string): string[] {
  if (!comboName) return [];

  const db = getDbInstance();
  const prefix = `${comboName}:`;
  const rows = db
    .prepare("SELECT key FROM key_value WHERE namespace = 'lkgp' AND key LIKE ? ESCAPE '\\'")
    .all(`${escapeLikePattern(prefix)}%`) as Array<{ key?: string }>;

  const staleKeys = rows.map((row) => row?.key).filter((key): key is string => Boolean(key));
  if (staleKeys.length === 0) return [];

  const deleteStatement = db.prepare("DELETE FROM key_value WHERE namespace = 'lkgp' AND key = ?");
  for (const key of staleKeys) {
    deleteStatement.run(key);
  }

  return staleKeys;
}

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
 * Delete one persisted LKGP pin after its target fails. `setLKGP` is only ever
 * called on success — nothing previously invalidated a pin once its provider
 * started failing, so a *separate* subsequent request kept re-selecting the
 * same just-failed provider via `applyStrategyOrdering.ts`'s LKGP reordering
 * (live incident: 3 consecutive requests all picked the same timed-out
 * opencode-zen/big-pickle target instead of failing over to another combo
 * model). Circuit breaker / model lockout deliberately don't react to this
 * failure class (request-scoped timeouts, see comboPredicates.ts), so nothing
 * else clears the stale pin.
 */
export async function clearLKGP(comboName: string, modelId: string): Promise<void> {
  const db = getDbInstance();
  const key = `${comboName}:${modelId}`;
  db.prepare("DELETE FROM key_value WHERE namespace = 'lkgp' AND key = ?").run(key);
  const { invalidateCachedLKGP } = await import("../readCache");
  invalidateCachedLKGP(key);
}

/**
 * Delete every persisted LKGP pin belonging to a combo. Pins are keyed by
 * `${comboName}:${modelId}`, so deleting a combo leaves its pins addressable by
 * a name that no longer resolves — `clearAllLKGP()` is too broad and
 * `clearLKGP()` needs a modelId the caller no longer knows. Combo delete paths
 * call this so the pins die with their combo instead of accumulating as
 * unreachable rows.
 */
export async function deleteLKGPByComboName(comboName: string): Promise<number> {
  const staleKeys = deleteLKGPRowsByComboName(comboName);

  if (staleKeys.length === 0) return 0;

  const { invalidateCachedLKGP } = await import("../readCache");
  for (const key of staleKeys) {
    invalidateCachedLKGP(key);
  }

  return staleKeys.length;
}

/**
 * Delete persisted LKGP pins whose connectionId references a removed provider
 * connection (#8887). A pin persisted by `setLKGP()` carries the connection it
 * was learned from, so deleting that connection leaves the pin pointing at a
 * row that no longer exists; provider-connection delete paths call this so
 * the pin dies with its connection instead of becoming unbounded stale state.
 * Provider-level pins and legacy/unparseable values are preserved.
 */
export async function deleteLKGPByConnectionIds(connectionIds: string[]): Promise<number> {
  if (connectionIds.length === 0) return 0;

  const deletedConnectionIds = new Set(connectionIds.filter(Boolean));
  if (deletedConnectionIds.size === 0) return 0;

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
      continue;
    }

    if (typeof parsed !== "object" || parsed === null) continue;

    const connectionId = (parsed as LKGPRecord).connectionId;
    if (typeof connectionId === "string" && deletedConnectionIds.has(connectionId)) {
      staleKeys.push(row.key);
    }
  }

  if (staleKeys.length === 0) return 0;

  const deleteStatement = db.prepare("DELETE FROM key_value WHERE namespace = 'lkgp' AND key = ?");
  for (const key of staleKeys) {
    deleteStatement.run(key);
  }

  const { invalidateCachedLKGP } = await import("../readCache");
  for (const key of staleKeys) {
    invalidateCachedLKGP(key);
  }

  return staleKeys.length;
}
