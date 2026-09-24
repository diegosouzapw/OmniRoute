/**
 * Synced-available-model vision lookup (#14081).
 *
 * Custom OpenAI-compatible nodes persist a per-connection `supportsVision`
 * boolean on their `syncedAvailableModels` row (see `detectVisionInput` in
 * `src/lib/providerModels/modelDiscovery.ts`). `/v1/models` already reads
 * that field through `buildSyncedCapabilities()` and reports
 * `capabilities.vision: true`, but the runtime capability resolver
 * (`resolveVisionCapability()` in `src/lib/modelCapabilities.ts`) had no
 * code path back to this table at all, so the Vision Bridge guardrail
 * disagreed with the catalog it feeds.
 *
 * Positive-only by design: a row's `supportsVision` is only ever persisted
 * as `true` (see `normalizeSyncedAvailableModels`), so a missing entry here
 * means "no signal from this source", never "not vision capable" — callers
 * must not use `false` from this helper to downgrade another source's verdict.
 */
import type { SqliteAdapter } from "../adapters/types";
import { getDbInstance } from "../core";
import { getKeyValue } from "./shared";
import { normalizeSyncedAvailableModels } from "./synced";

/** Provider → set of model ids with at least one connection's synced row saying supportsVision:true. */
export type SyncedAvailableModelVisionMap = ReadonlyMap<string, ReadonlySet<string>>;
export type SyncedAvailableModelVisionDatabase = Pick<SqliteAdapter, "prepare">;

export interface SyncedAvailableModelVisionReadOptions {
  /** Narrow test seam; production uses the canonical DB singleton. */
  getDatabase?: () => SyncedAvailableModelVisionDatabase;
}

function collectVisionModelIds(providerId: string, rawValue: string | null): string[] {
  if (!rawValue) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawValue);
  } catch {
    return [];
  }
  return normalizeSyncedAvailableModels(parsed, providerId)
    .filter((model) => model.supportsVision === true)
    .map((model) => model.id);
}

/**
 * Bulk-load every provider's synced-available-model vision verdicts with one
 * SQLite query, unioned across all of a provider's connections. Mirrors
 * `listCustomModelVisionOverrides()` so catalog/snapshot generation stays a
 * single bulk read instead of N+1 queries.
 */
export function listSyncedAvailableModelVision(
  options: SyncedAvailableModelVisionReadOptions = {}
): SyncedAvailableModelVisionMap {
  try {
    const db = options.getDatabase?.() ?? getDbInstance();
    const rows = db
      .prepare("SELECT key, value FROM key_value WHERE namespace = 'syncedAvailableModels'")
      .all();
    const result = new Map<string, Set<string>>();
    for (const row of rows) {
      const { key, value } = getKeyValue(row);
      if (!key || !value) continue;
      const providerId = key.split(":")[0];
      if (!providerId) continue;
      const visionIds = collectVisionModelIds(providerId, value);
      if (visionIds.length === 0) continue;
      let byModel = result.get(providerId);
      if (!byModel) {
        byModel = new Set();
        result.set(providerId, byModel);
      }
      for (const id of visionIds) byModel.add(id);
    }
    return result;
  } catch {
    return new Map<string, Set<string>>();
  }
}

/**
 * Resolve one provider+model synced-available-model vision verdict. A
 * supplied bulk map avoids a SQLite read for request/build-local capability
 * resolution (mirrors `getCustomModelVisionOverride()`).
 *
 * Positive-only: returns `true` when at least one connection's synced row
 * for this provider+model has `supportsVision === true`, otherwise `null`
 * — never `false`, so this source can never downgrade another one.
 */
export function getSyncedAvailableModelVision(
  providerId: string,
  modelId: string,
  bulk?: SyncedAvailableModelVisionMap | null,
  options: SyncedAvailableModelVisionReadOptions = {}
): boolean | null {
  if (!providerId || !modelId) return null;
  try {
    if (bulk) {
      return bulk.get(providerId)?.has(modelId) === true ? true : null;
    }
    const db = options.getDatabase?.() ?? getDbInstance();
    const rows = db
      .prepare(
        "SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key LIKE ?"
      )
      .all(`${providerId}:%`);
    for (const row of rows) {
      const { value } = getKeyValue(row);
      if (collectVisionModelIds(providerId, value).includes(modelId)) return true;
    }
    return null;
  } catch {
    return null;
  }
}
