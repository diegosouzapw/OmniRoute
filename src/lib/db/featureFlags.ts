/**
 * db/featureFlags.ts — Feature flag DB overrides.
 *
 * Stores per-flag override values in the key_value table under the
 * "feature_flags" namespace. When an override is present it takes precedence
 * over the process environment variable of the same name.
 */

import { getDbInstance } from "./core";

const NAMESPACE = "feature_flags";

/**
 * Returns all feature flag overrides as a key→value map.
 */
export function getFeatureFlagOverrides(): Record<string, string> {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(NAMESPACE) as Array<{ key: string; value: string }>;

  const result: Record<string, string> = {};
  for (const row of rows) {
    result[row.key] = row.value;
  }
  return result;
}

/**
 * Returns the override value for a single flag, or undefined if no override
 * is stored.
 */
export function getFeatureFlagOverride(key: string): string | undefined {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, key) as { value: string } | undefined;
  return row?.value;
}

/**
 * Persists (or replaces) an override for a single flag.
 */
export function setFeatureFlagOverride(key: string, value: string): void {
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  ).run(NAMESPACE, key, value);
}

/**
 * Removes the override for a single flag, restoring env-var / default
 * behaviour.
 */
export function removeFeatureFlagOverride(key: string): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(NAMESPACE, key);
}

/**
 * Removes all stored feature flag overrides.
 */
export function clearAllFeatureFlagOverrides(): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = ?").run(NAMESPACE);
}
