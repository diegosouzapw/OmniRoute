/**
 * Explicit Custom Models "Vision capable" lookup.
 *
 * Dashboard stores the flag under the connection id (often an
 * openai-compatible-chat-* uuid) and the path-shaped model id. Clients send
 * the advertised alias (`vllm/path/...`), the bare path, or the internal
 * `providerId/modelPath`. parseModel splits on the first slash, so the
 * advertised forms miss the stored pair. Match the stored row against all
 * three forms before Vision Bridge substitutes a fallback VLM.
 */
import type { SqliteAdapter } from "../adapters/types";
import { getDbInstance } from "../core";
import { getKeyValue } from "./shared";

/** Nested provider → model map of explicit custom-model vision overrides. */
export type CustomModelVisionOverrideMap = ReadonlyMap<string, ReadonlyMap<string, boolean>>;
export type CustomModelVisionDatabase = Pick<SqliteAdapter, "prepare">;

export interface CustomModelVisionOverrideReadOptions {
  /** Narrow test seam; production uses the canonical DB singleton. */
  getDatabase?: () => CustomModelVisionDatabase;
  /**
   * Raw model string from the request (`vllm/orcarouter/Qwen...`, the bare
   * path, or `providerId/modelPath`). Used when the parsed provider/model pair
   * does not match the stored customModels key.
   */
  lookupKey?: string;
}

type OverrideHit = { providerId: string; modelId: string; supportsVision: boolean };

function idsEqual(left: string, right: string): boolean {
  return left === right || left.toLowerCase() === right.toLowerCase();
}

function isPathShaped(value: string | undefined): boolean {
  return Boolean(value && value.includes("/"));
}

/** Stored custom-model id matches the parsed pair and/or the raw request string. */
export function customModelIdMatchesRequest(
  storedId: string,
  requestedModelId: string,
  lookupKey?: string
): boolean {
  if (!storedId) return false;
  if (idsEqual(storedId, requestedModelId)) return true;
  if (lookupKey && idsEqual(storedId, lookupKey)) return true;
  // Suffix only when the stored id is itself path-shaped. A leaf like "4o"
  // must not match lookupKey "openai/gpt-4o".
  if (
    isPathShaped(storedId) &&
    lookupKey &&
    lookupKey.toLowerCase().endsWith(`/${storedId.toLowerCase()}`)
  ) {
    return true;
  }
  return false;
}

function readVisionOverrideFromModels(value: string | null, modelId: string): boolean | null {
  if (!value) return null;
  try {
    const models = JSON.parse(value) as unknown;
    if (!Array.isArray(models)) return null;
    const entry = models.find(
      (candidate): candidate is { id: string; supportsVision?: boolean } =>
        candidate !== null &&
        typeof candidate === "object" &&
        !Array.isArray(candidate) &&
        typeof (candidate as { id?: unknown }).id === "string" &&
        idsEqual((candidate as { id: string }).id, modelId)
    );
    return entry && typeof entry.supportsVision === "boolean" ? entry.supportsVision : null;
  } catch {
    return null;
  }
}

function collectOverrideHits(map: CustomModelVisionOverrideMap): OverrideHit[] {
  const hits: OverrideHit[] = [];
  for (const [providerId, byModel] of map) {
    for (const [modelId, supportsVision] of byModel) {
      hits.push({ providerId, modelId, supportsVision });
    }
  }
  return hits;
}

function pickMatchingOverride(
  hits: OverrideHit[],
  providerId: string,
  modelId: string,
  lookupKey?: string
): boolean | null {
  const exact = hits.find(
    (hit) => idsEqual(hit.providerId, providerId) && idsEqual(hit.modelId, modelId)
  );
  if (exact) return exact.supportsVision;

  const matches = hits.filter((hit) =>
    customModelIdMatchesRequest(hit.modelId, modelId, lookupKey)
  );
  if (matches.length === 0) return null;
  const first = matches[0].supportsVision;
  if (!matches.every((hit) => hit.supportsVision === first)) return null;
  if (providerId) {
    const sameProvider = matches.filter((hit) => idsEqual(hit.providerId, providerId));
    if (sameProvider.length === 1) return sameProvider[0].supportsVision;
  }
  return first;
}

/**
 * Resolve one explicit custom-model vision override. A supplied bulk map avoids
 * SQLite reads for request/build-local capability resolution.
 */
export function getCustomModelVisionOverride(
  providerId: string,
  modelId: string,
  bulk?: CustomModelVisionOverrideMap | null,
  options: CustomModelVisionOverrideReadOptions = {}
): boolean | null {
  try {
    const lookupKey = options.lookupKey;
    const canScan = isPathShaped(modelId) || isPathShaped(lookupKey);
    if (!providerId && !canScan) return null;

    if (bulk) {
      if (!canScan && providerId) {
        return bulk.get(providerId)?.get(modelId) ?? null;
      }
      return pickMatchingOverride(collectOverrideHits(bulk), providerId, modelId, lookupKey);
    }
    const db = options.getDatabase?.() ?? getDbInstance();
    if (providerId) {
      const row = db
        .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
        .get(providerId);
      const exact = readVisionOverrideFromModels(getKeyValue(row).value, modelId);
      if (exact !== null) return exact;
    }
    if (!canScan) return null;
    return pickMatchingOverride(
      collectOverrideHits(listCustomModelVisionOverrides({ getDatabase: () => db })),
      providerId,
      modelId,
      lookupKey
    );
  } catch {
    return null;
  }
}

/** Bulk-load explicit custom-model vision overrides with one SQLite query. */
export function listCustomModelVisionOverrides(
  options: CustomModelVisionOverrideReadOptions = {}
): CustomModelVisionOverrideMap {
  try {
    const db = options.getDatabase?.() ?? getDbInstance();
    const rows = db
      .prepare("SELECT key, value FROM key_value WHERE namespace = 'customModels'")
      .all();
    const result = new Map<string, Map<string, boolean>>();
    for (const row of rows) {
      const { key, value } = getKeyValue(row);
      if (!key || !value) continue;
      try {
        const models = JSON.parse(value) as unknown;
        if (!Array.isArray(models)) continue;
        const byModel = new Map<string, boolean>();
        for (const candidate of models) {
          if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) continue;
          const { id, supportsVision } = candidate as {
            id?: unknown;
            supportsVision?: unknown;
          };
          if (typeof id === "string" && typeof supportsVision === "boolean") {
            byModel.set(id, supportsVision);
          }
        }
        if (byModel.size > 0) result.set(key, byModel);
      } catch {
        // Malformed custom-model rows do not participate in capability resolution.
      }
    }
    return result;
  } catch {
    return new Map<string, Map<string, boolean>>();
  }
}
