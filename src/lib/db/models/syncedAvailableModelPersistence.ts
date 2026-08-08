/** Canonical comparison and write helpers for connection-scoped synced model catalogs. */

import { backupDbFile } from "../backup";
import { getDbInstance } from "../core";
import { invalidateModelCatalogCache } from "../readCache";
import { getKeyValue } from "./shared";

type ModelNormalizer<T> = (models: unknown) => T[];

export function finishSyncedAvailableModelsWrite(): void {
  backupDbFile("pre-write");
  invalidateModelCatalogCache();
}

export function persistCanonicalSyncedAvailableModels<T>(
  key: string,
  normalizedModels: T[],
  normalizeModels: ModelNormalizer<T>
): boolean {
  const db = getDbInstance();
  const existingRow = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?")
    .get(key);
  const existingValue = getKeyValue(existingRow).value;
  let existingModels: T[] | null = null;
  if (existingValue !== null) {
    try {
      existingModels = normalizeModels(JSON.parse(existingValue));
    } catch {
      existingModels = null;
    }
  }

  const unchanged =
    (normalizedModels.length > 0 &&
      existingModels !== null &&
      JSON.stringify(existingModels) === JSON.stringify(normalizedModels)) ||
    (normalizedModels.length === 0 && existingValue === null);
  if (unchanged) return false;

  if (normalizedModels.length === 0) {
    db.prepare("DELETE FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?").run(
      key
    );
  } else {
    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
    ).run(key, JSON.stringify(normalizedModels));
  }
  finishSyncedAvailableModelsWrite();
  return true;
}
