/**
 * db/models.js — Model aliases, MITM aliases, and custom models.
 */

import { getDbInstance } from "./core";
import { backupDbFile } from "./backup";
import {
  MODEL_COMPAT_PROTOCOL_KEYS,
  type ModelCompatProtocolKey,
} from "@/shared/constants/modelCompat";
import { isForbiddenUpstreamHeaderName } from "@/shared/constants/upstreamHeaders";

type JsonRecord = Record<string, unknown>;

/** Built-in / alias models: tool-call + developer-role flags without a full custom row */
const MODEL_COMPAT_NAMESPACE = "modelCompatOverrides";

export { MODEL_COMPAT_PROTOCOL_KEYS, type ModelCompatProtocolKey };

export type ModelCompatPerProtocol = {
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  /** Merged into upstream HTTP requests for this model (after default auth headers). */
  upstreamHeaders?: Record<string, string>;
};

type CompatByProtocolMap = Partial<Record<ModelCompatProtocolKey, ModelCompatPerProtocol>>;

function isCompatProtocolKey(p: string): p is ModelCompatProtocolKey {
  return (MODEL_COMPAT_PROTOCOL_KEYS as readonly string[]).includes(p);
}

const UPSTREAM_HEADERS_MAX = 16;
const UPSTREAM_HEADER_NAME_MAX = 128;
const UPSTREAM_HEADER_VALUE_MAX = 4096;

function isValidUpstreamHeaderName(k: string): boolean {
  if (!k || k.length > UPSTREAM_HEADER_NAME_MAX) return false;
  if (isForbiddenUpstreamHeaderName(k)) return false;
  if (/[\r\n\0]/.test(k)) return false;
  if (/\s/.test(k)) return false;
  if (k.includes(":")) return false;
  return true;
}

/** Sanitize user-provided upstream header map (used when persisting and when reading for requests). */
export function sanitizeUpstreamHeadersMap(
  raw: Record<string, unknown> | null | undefined
): Record<string, string> {
  const out: Record<string, string> = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [k0, v0] of Object.entries(raw)) {
    const k = String(k0).trim();
    if (!k || !isValidUpstreamHeaderName(k)) {
      continue;
    }
    const v =
      typeof v0 === "string"
        ? v0.trim().slice(0, UPSTREAM_HEADER_VALUE_MAX)
        : String(v0 ?? "")
            .trim()
            .slice(0, UPSTREAM_HEADER_VALUE_MAX);
    if (v.includes("\r") || v.includes("\n")) continue;
    out[k] = v;
    if (Object.keys(out).length >= UPSTREAM_HEADERS_MAX) break;
  }
  return out;
}

function deepMergeCompatByProtocol(
  prev: CompatByProtocolMap | undefined,
  patch: Partial<Record<ModelCompatProtocolKey, Partial<ModelCompatPerProtocol>>>
): CompatByProtocolMap {
  const out: CompatByProtocolMap = { ...(prev || {}) };
  for (const key of Object.keys(patch) as ModelCompatProtocolKey[]) {
    if (!isCompatProtocolKey(key)) continue;
    const deltas = patch[key];
    if (!deltas || typeof deltas !== "object") continue;
    const hasDelta =
      Object.prototype.hasOwnProperty.call(deltas, "normalizeToolCallId") ||
      Object.prototype.hasOwnProperty.call(deltas, "preserveOpenAIDeveloperRole") ||
      Object.prototype.hasOwnProperty.call(deltas, "upstreamHeaders");
    if (!hasDelta) continue;
    const cur: ModelCompatPerProtocol = { ...(out[key] || {}) };
    if ("normalizeToolCallId" in deltas) {
      cur.normalizeToolCallId = Boolean(deltas.normalizeToolCallId);
    }
    if ("preserveOpenAIDeveloperRole" in deltas) {
      cur.preserveOpenAIDeveloperRole = Boolean(deltas.preserveOpenAIDeveloperRole);
    }
    if ("upstreamHeaders" in deltas) {
      const uh = deltas.upstreamHeaders;
      if (uh === undefined) {
        /* skip */
      } else {
        const s = sanitizeUpstreamHeadersMap(uh as Record<string, unknown>);
        if (Object.keys(s).length === 0) delete cur.upstreamHeaders;
        else cur.upstreamHeaders = s;
      }
    }
    if (Object.keys(cur).length === 0) delete out[key];
    else out[key] = cur;
  }
  return out;
}

export type ModelCompatOverride = {
  id: string;
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  compatByProtocol?: CompatByProtocolMap;
  upstreamHeaders?: Record<string, string>;
  isHidden?: boolean;
};

function readCompatList(providerId: string): ModelCompatOverride[] {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(MODEL_COMPAT_NAMESPACE, providerId);
  const value = getKeyValue(row).value;
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCompatList(providerId: string, list: ModelCompatOverride[]) {
  const db = getDbInstance();
  if (list.length === 0) {
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
      MODEL_COMPAT_NAMESPACE,
      providerId
    );
  } else {
    db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      MODEL_COMPAT_NAMESPACE,
      providerId,
      JSON.stringify(list)
    );
  }
  backupDbFile("pre-write");
}

export function getModelCompatOverrides(providerId: string): ModelCompatOverride[] {
  return readCompatList(providerId);
}

export type ModelCompatPatch = {
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean | null;
  compatByProtocol?: CompatByProtocolMap;
  /** Replace top-level extra headers for override-only rows; omit to leave unchanged. */
  upstreamHeaders?: Record<string, string> | null;
  isHidden?: boolean | null;
};

function compatByProtocolHasEntries(map: CompatByProtocolMap | undefined): boolean {
  if (!map || typeof map !== "object") return false;
  return Object.keys(map).some((k) => {
    const v = map[k as ModelCompatProtocolKey];
    return v && typeof v === "object" && Object.keys(v).length > 0;
  });
}

export function mergeModelCompatOverride(
  providerId: string,
  modelId: string,
  patch: ModelCompatPatch
) {
  const list = readCompatList(providerId);
  const idx = list.findIndex((e) => e.id === modelId);
  const prev = idx >= 0 ? { ...list[idx] } : { id: modelId };
  const next: ModelCompatOverride = { ...prev, id: modelId };
  if ("normalizeToolCallId" in patch) {
    if (patch.normalizeToolCallId) next.normalizeToolCallId = true;
    else delete next.normalizeToolCallId;
  }
  if ("preserveOpenAIDeveloperRole" in patch) {
    if (patch.preserveOpenAIDeveloperRole === null) {
      delete next.preserveOpenAIDeveloperRole; // unset: revert to default (undefined at read time)
    } else {
      next.preserveOpenAIDeveloperRole = Boolean(patch.preserveOpenAIDeveloperRole);
    }
  }
  if (patch.compatByProtocol && Object.keys(patch.compatByProtocol).length > 0) {
    const merged = deepMergeCompatByProtocol(next.compatByProtocol, patch.compatByProtocol);
    if (compatByProtocolHasEntries(merged)) next.compatByProtocol = merged;
    else delete next.compatByProtocol;
  }
  if ("upstreamHeaders" in patch) {
    if (patch.upstreamHeaders === null) {
      delete next.upstreamHeaders;
    } else if (patch.upstreamHeaders && typeof patch.upstreamHeaders === "object") {
      const s = sanitizeUpstreamHeadersMap(patch.upstreamHeaders as Record<string, unknown>);
      if (Object.keys(s).length === 0) delete next.upstreamHeaders;
      else next.upstreamHeaders = s;
    }
  }
  const filtered = list.filter((e) => e.id !== modelId);
  const hasPreserveFlag = Object.prototype.hasOwnProperty.call(next, "preserveOpenAIDeveloperRole");
  const hasTopUpstream = next.upstreamHeaders && Object.keys(next.upstreamHeaders).length > 0;
  if ("isHidden" in patch) {
    if (patch.isHidden === null) {
      delete next.isHidden;
    } else {
      next.isHidden = Boolean(patch.isHidden);
    }
  }
  const hasHiddenFlag = Object.prototype.hasOwnProperty.call(next, "isHidden");
  if (
    next.normalizeToolCallId ||
    hasPreserveFlag ||
    hasHiddenFlag ||
    compatByProtocolHasEntries(next.compatByProtocol) ||
    hasTopUpstream
  ) {
    filtered.push(next);
  }
  writeCompatList(providerId, filtered);
}

export function removeModelCompatOverride(providerId: string, modelId: string) {
  const list = readCompatList(providerId);
  const filtered = list.filter((e) => e.id !== modelId);
  if (filtered.length === list.length) return;
  writeCompatList(providerId, filtered);
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function getKeyValue(row: unknown): { key: string | null; value: string | null } {
  const record = asRecord(row);
  return {
    key: typeof record.key === "string" ? record.key : null,
    value: typeof record.value === "string" ? record.value : null,
  };
}

// ──────────────── Model Aliases ────────────────

export async function getModelAliases() {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'modelAliases'")
    .all();
  const result: Record<string, unknown> = {};
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key || value === null) continue;
    result[key] = JSON.parse(value);
  }
  return result;
}

export async function setModelAlias(alias: string, model: unknown) {
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('modelAliases', ?, ?)"
  ).run(alias, JSON.stringify(model));
  backupDbFile("pre-write");
}

export async function deleteModelAlias(alias: string) {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'modelAliases' AND key = ?").run(alias);
  backupDbFile("pre-write");
}

// ──────────────── MITM Alias ────────────────

export async function getMitmAlias(toolName?: string) {
  const db = getDbInstance();
  if (toolName) {
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'mitmAlias' AND key = ?")
      .get(toolName);
    const value = getKeyValue(row).value;
    return value ? JSON.parse(value) : {};
  }
  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'mitmAlias'").all();
  const result: Record<string, unknown> = {};
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key || value === null) continue;
    result[key] = JSON.parse(value);
  }
  return result;
}

export async function setMitmAliasAll(toolName: string, mappings: unknown) {
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('mitmAlias', ?, ?)"
  ).run(toolName, JSON.stringify(mappings || {}));
  backupDbFile("pre-write");
}

// ──────────────── Custom Models ────────────────

export async function getCustomModels(providerId?: string) {
  const db = getDbInstance();
  if (providerId) {
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
      .get(providerId);
    const value = getKeyValue(row).value;
    return value ? JSON.parse(value) : [];
  }
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'customModels'")
    .all();
  const result: Record<string, unknown> = {};
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key || value === null) continue;
    result[key] = JSON.parse(value);
  }
  return result;
}

export async function getAllCustomModels() {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'customModels'")
    .all();
  const result: Record<string, unknown> = {};
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key || value === null) continue;
    result[key] = JSON.parse(value);
  }
  return result;
}

export async function addCustomModel(
  providerId: string,
  modelId: string,
  modelName?: string,
  source = "manual",
  apiFormat:
    | "chat-completions"
    | "responses"
    | "embeddings"
    | "audio-transcriptions"
    | "audio-speech"
    | "images-generations" = "chat-completions",
  supportedEndpoints: string[] = ["chat"]
) {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
    .get(providerId);
  const value = getKeyValue(row).value;
  const models = value ? JSON.parse(value) : [];

  const exists = models.find((m: JsonRecord) => m.id === modelId);
  if (exists) return exists;

  const model = {
    id: modelId,
    name: modelName || modelId,
    source,
    apiFormat,
    supportedEndpoints,
  };
  models.push(model);
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('customModels', ?, ?)"
  ).run(providerId, JSON.stringify(models));
  backupDbFile("pre-write");
  return model;
}

/**
 * Replace the entire custom models list for a provider.
 * Preserves per-model compatibility overrides for models that still exist.
 */
export async function replaceCustomModels(
  providerId: string,
  models: Array<{
    id: string;
    name?: string;
    source?: string;
    apiFormat?: string;
    supportedEndpoints?: string[];
    inputTokenLimit?: number;
    outputTokenLimit?: number;
    description?: string;
    supportsThinking?: boolean;
  }>,
  { allowEmpty = false }: { allowEmpty?: boolean } = {}
) {
  // Guard: skip destructive clear when the caller hasn't explicitly opted in.
  // This prevents callers from wiping manually added models when the
  // upstream /models endpoint fails, times out, or returns an empty list.
  if (models.length === 0 && !allowEmpty) {
    const existing = await getCustomModels(providerId);
    return Array.isArray(existing) ? existing : [];
  }

  const db = getDbInstance();
  const existing = await getCustomModels(providerId);
  const existingMap = new Map<string, JsonRecord>();
  if (Array.isArray(existing)) {
    for (const m of existing) {
      if (m && typeof m === "object" && m.id) existingMap.set(m.id, m);
    }
  }

  // Merge: keep existing per-model compat flags if model still exists
  const merged = models.map((m) => {
    const prev = existingMap.get(m.id);
    return {
      id: m.id,
      name: m.name || m.id,
      source: m.source || "auto-sync",
      apiFormat: m.apiFormat || (prev as any)?.apiFormat || "chat-completions",
      supportedEndpoints: m.supportedEndpoints || (prev as any)?.supportedEndpoints || ["chat"],
      // Preserve metadata from provider API (or previous sync)
      ...(m.inputTokenLimit != null
        ? { inputTokenLimit: m.inputTokenLimit }
        : (prev as any)?.inputTokenLimit != null
          ? { inputTokenLimit: (prev as any).inputTokenLimit }
          : {}),
      ...(m.outputTokenLimit != null
        ? { outputTokenLimit: m.outputTokenLimit }
        : (prev as any)?.outputTokenLimit != null
          ? { outputTokenLimit: (prev as any).outputTokenLimit }
          : {}),
      ...(m.description != null
        ? { description: m.description }
        : (prev as any)?.description != null
          ? { description: (prev as any).description }
          : {}),
      ...(m.supportsThinking != null
        ? { supportsThinking: m.supportsThinking }
        : (prev as any)?.supportsThinking != null
          ? { supportsThinking: (prev as any).supportsThinking }
          : {}),
      // Preserve existing compat flags
      ...(prev && (prev as any).normalizeToolCallId !== undefined
        ? { normalizeToolCallId: (prev as any).normalizeToolCallId }
        : {}),
      ...(prev && (prev as any).preserveOpenAIDeveloperRole !== undefined
        ? { preserveOpenAIDeveloperRole: (prev as any).preserveOpenAIDeveloperRole }
        : {}),
      ...(prev && (prev as any).compatByProtocol
        ? { compatByProtocol: (prev as any).compatByProtocol }
        : {}),
      ...(prev && (prev as any).upstreamHeaders
        ? { upstreamHeaders: (prev as any).upstreamHeaders }
        : {}),
    };
  });

  if (merged.length === 0) {
    db.prepare("DELETE FROM key_value WHERE namespace = 'customModels' AND key = ?").run(
      providerId
    );
  } else {
    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('customModels', ?, ?)"
    ).run(providerId, JSON.stringify(merged));
  }

  // Remove compat overrides for models that no longer exist
  const newIds = new Set(models.map((m) => m.id));
  const compatList = readCompatList(providerId);
  const filteredCompat = compatList.filter((e) => newIds.has(e.id));
  if (filteredCompat.length !== compatList.length) {
    writeCompatList(providerId, filteredCompat);
  }

  backupDbFile("pre-write");
  return merged;
}

export async function removeCustomModel(providerId: string, modelId: string) {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
    .get(providerId);
  if (!row) return false;

  const value = getKeyValue(row).value;
  if (!value) return false;
  const models = JSON.parse(value);
  const before = models.length;
  const filtered = models.filter((m: JsonRecord) => m.id !== modelId);

  if (filtered.length === before) return false;

  if (filtered.length === 0) {
    db.prepare("DELETE FROM key_value WHERE namespace = 'customModels' AND key = ?").run(
      providerId
    );
  } else {
    db.prepare("UPDATE key_value SET value = ? WHERE namespace = 'customModels' AND key = ?").run(
      JSON.stringify(filtered),
      providerId
    );
  }

  removeModelCompatOverride(providerId, modelId);
  backupDbFile("pre-write");
  return true;
}

// ──────────────── Synced Available Models ────────────────
// Storage: namespace = 'syncedAvailableModels', key = '<providerId>:<connectionId>'
// Each connection stores its own model list. Reads union across all connections
// for a provider. Deleting a connection removes only its models.

export interface SyncedAvailableModel {
  id: string;
  name: string;
  source: "imported";
  supportedEndpoints?: string[];
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  description?: string;
  supportsThinking?: boolean;
}

type SyncedAvailableModelInput = Omit<SyncedAvailableModel, "source"> & {
  source?: string;
};

function normalizeSyncedAvailableModel(model: unknown): SyncedAvailableModel | null {
  const record = asRecord(model);
  const id =
    toNonEmptyString(record.id) || toNonEmptyString(record.name) || toNonEmptyString(record.model);
  if (!id) return null;

  const name =
    toNonEmptyString(record.name) ||
    toNonEmptyString(record.displayName) ||
    toNonEmptyString(record.model) ||
    id;
  const supportedEndpoints = Array.isArray(record.supportedEndpoints)
    ? Array.from(
        new Set(
          record.supportedEndpoints
            .map((endpoint) => toNonEmptyString(endpoint))
            .filter((endpoint): endpoint is string => Boolean(endpoint))
        )
      ).sort()
    : undefined;

  return {
    id,
    name,
    source: "imported",
    ...(supportedEndpoints && supportedEndpoints.length > 0 ? { supportedEndpoints } : {}),
    ...(typeof record.inputTokenLimit === "number"
      ? { inputTokenLimit: record.inputTokenLimit }
      : {}),
    ...(typeof record.outputTokenLimit === "number"
      ? { outputTokenLimit: record.outputTokenLimit }
      : {}),
    ...(typeof record.description === "string" ? { description: record.description } : {}),
    ...(record.supportsThinking === true ? { supportsThinking: true } : {}),
  };
}

function normalizeSyncedAvailableModels(models: unknown): SyncedAvailableModel[] {
  if (!Array.isArray(models)) return [];
  const deduped = new Map<string, SyncedAvailableModel>();
  for (const model of models) {
    const normalized = normalizeSyncedAvailableModel(model);
    if (normalized) deduped.set(normalized.id, normalized);
  }
  return Array.from(deduped.values());
}

/**
 * Get synced available models for a specific provider connection.
 */
export async function getSyncedAvailableModelsForConnection(
  providerId: string,
  connectionId: string
): Promise<SyncedAvailableModel[]> {
  const db = getDbInstance();
  const key = `${providerId}:${connectionId}`;
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?")
    .get(key);
  const value = getKeyValue(row).value;
  if (!value) return [];
  try {
    const models = JSON.parse(value);
    return normalizeSyncedAvailableModels(models);
  } catch {
    return [];
  }
}

/**
 * Get all synced available models for a provider, unioned across all connections.
 */
export async function getSyncedAvailableModels(
  providerId: string
): Promise<SyncedAvailableModel[]> {
  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT key, value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key LIKE ?"
    )
    .all(`${providerId}:%`);
  const map = new Map<string, SyncedAvailableModel>();
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key || value === null) continue;
    const models = normalizeSyncedAvailableModels(JSON.parse(value));
    for (const m of models) {
      if (m.id) map.set(m.id, m);
    }
  }
  return Array.from(map.values());
}

/**
 * Get all synced available models across all providers.
 */
export async function getAllSyncedAvailableModels(): Promise<
  Record<string, SyncedAvailableModel[]>
> {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'syncedAvailableModels'")
    .all();
  // Group by providerId (before the colon)
  const byProvider = new Map<string, Map<string, SyncedAvailableModel>>();
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key || value === null) continue;
    const providerId = key.split(":")[0];
    if (!byProvider.has(providerId)) byProvider.set(providerId, new Map());
    const models = normalizeSyncedAvailableModels(JSON.parse(value));
    const map = byProvider.get(providerId)!;
    for (const m of models) {
      if (m.id) map.set(m.id, m);
    }
  }
  const result: Record<string, SyncedAvailableModel[]> = {};
  for (const [providerId, map] of byProvider) {
    result[providerId] = Array.from(map.values());
  }
  return result;
}

/**
 * Replace the model list for a specific connection.
 * Key format: '<providerId>:<connectionId>'
 */
export async function replaceSyncedAvailableModelsForConnection(
  providerId: string,
  connectionId: string,
  models: SyncedAvailableModelInput[]
): Promise<SyncedAvailableModel[]> {
  const db = getDbInstance();
  const key = `${providerId}:${connectionId}`;
  const normalizedModels = normalizeSyncedAvailableModels(models);
  if (normalizedModels.length === 0) {
    db.prepare("DELETE FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?").run(
      key
    );
  } else {
    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
    ).run(key, JSON.stringify(normalizedModels));
  }
  backupDbFile("pre-write");
  // Return the full unioned list for the provider
  return getSyncedAvailableModels(providerId);
}

/**
 * Delete all synced models for a specific connection.
 * Returns the remaining unioned list for the provider.
 */
export async function deleteSyncedAvailableModelsForConnection(
  providerId: string,
  connectionId: string
): Promise<SyncedAvailableModel[]> {
  const db = getDbInstance();
  const key = `${providerId}:${connectionId}`;
  db.prepare("DELETE FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?").run(
    key
  );
  backupDbFile("pre-write");
  return getSyncedAvailableModels(providerId);
}

export async function updateCustomModel(
  providerId: string,
  modelId: string,
  updates: Record<string, unknown> = {}
) {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
    .get(providerId);
  if (!row) return null;

  const value = getKeyValue(row).value;
  if (!value) return null;

  const models = JSON.parse(value);
  const index = models.findIndex((m: JsonRecord) => m.id === modelId);
  if (index === -1) return null;

  const current = models[index];
  const currentCompat = (current as JsonRecord).compatByProtocol as CompatByProtocolMap | undefined;
  let mergedCompat: CompatByProtocolMap | undefined = currentCompat;
  if (
    updates.compatByProtocol !== undefined &&
    typeof updates.compatByProtocol === "object" &&
    updates.compatByProtocol !== null &&
    !Array.isArray(updates.compatByProtocol)
  ) {
    mergedCompat = deepMergeCompatByProtocol(
      currentCompat,
      updates.compatByProtocol as Partial<
        Record<ModelCompatProtocolKey, Partial<ModelCompatPerProtocol>>
      >
    );
    if (!compatByProtocolHasEntries(mergedCompat)) mergedCompat = undefined;
  }

  const next: JsonRecord = {
    ...current,
    ...(updates.modelName !== undefined ? { name: updates.modelName || current.name } : {}),
    ...(updates.apiFormat !== undefined ? { apiFormat: updates.apiFormat } : {}),
    ...(updates.supportedEndpoints !== undefined
      ? { supportedEndpoints: updates.supportedEndpoints }
      : {}),
    ...(updates.normalizeToolCallId !== undefined
      ? { normalizeToolCallId: Boolean(updates.normalizeToolCallId) }
      : {}),
    ...(updates.isHidden !== undefined ? { isHidden: Boolean(updates.isHidden) } : {}),
  };
  if (Object.prototype.hasOwnProperty.call(updates, "preserveOpenAIDeveloperRole")) {
    if (updates.preserveOpenAIDeveloperRole === null) {
      delete next.preserveOpenAIDeveloperRole;
    } else {
      next.preserveOpenAIDeveloperRole = Boolean(updates.preserveOpenAIDeveloperRole);
    }
  }
  if (updates.compatByProtocol !== undefined) {
    if (mergedCompat && compatByProtocolHasEntries(mergedCompat)) {
      next.compatByProtocol = mergedCompat;
    } else {
      delete next.compatByProtocol;
    }
  }

  if (Object.prototype.hasOwnProperty.call(updates, "upstreamHeaders")) {
    const uh = updates.upstreamHeaders;
    if (uh === null || uh === undefined) {
      delete next.upstreamHeaders;
    } else if (typeof uh === "object" && !Array.isArray(uh)) {
      const s = sanitizeUpstreamHeadersMap(uh as Record<string, unknown>);
      if (Object.keys(s).length === 0) delete next.upstreamHeaders;
      else next.upstreamHeaders = s;
    }
  }

  models[index] = next;

  db.prepare("UPDATE key_value SET value = ? WHERE namespace = 'customModels' AND key = ?").run(
    JSON.stringify(models),
    providerId
  );

  backupDbFile("pre-write");
  return next;
}

/** Single custom model row from key_value customModels, or null */
function getCustomModelRow(providerId: string, modelId: string): JsonRecord | null {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
    .get(providerId);
  const value = getKeyValue(row).value;
  if (!value) return null;
  try {
    const models = JSON.parse(value) as unknown;
    if (!Array.isArray(models)) return null;
    const m = models.find((x: unknown) => {
      if (!x || typeof x !== "object" || Array.isArray(x)) return false;
      return (x as { id?: string }).id === modelId;
    }) as JsonRecord | undefined;
    return m ?? null;
  } catch {
    return null;
  }
}

/**
 * Whether the given provider/model has "normalize tool call id" (9-char Mistral-style) enabled.
 * Custom model row wins; otherwise {@link getModelCompatOverrides}.
 * When `sourceFormat` is one of `openai` | `openai-responses` | `claude`, per-protocol
 * `compatByProtocol[sourceFormat].normalizeToolCallId` overrides the legacy top-level flag.
 */
export function getModelNormalizeToolCallId(
  providerId: string,
  modelId: string,
  sourceFormat?: string | null
): boolean {
  const m = getCustomModelRow(providerId, modelId);
  const protocol = sourceFormat && isCompatProtocolKey(sourceFormat) ? sourceFormat : null;

  if (m) {
    if (protocol) {
      const pc = (m.compatByProtocol as CompatByProtocolMap | undefined)?.[protocol];
      if (pc && Object.prototype.hasOwnProperty.call(pc, "normalizeToolCallId")) {
        return Boolean(pc.normalizeToolCallId);
      }
    }
    return Boolean(m.normalizeToolCallId);
  }
  const co = readCompatList(providerId).find((e) => e.id === modelId);
  if (protocol && co?.compatByProtocol?.[protocol]) {
    const pc = co.compatByProtocol[protocol]!;
    if (Object.prototype.hasOwnProperty.call(pc, "normalizeToolCallId")) {
      return Boolean(pc.normalizeToolCallId);
    }
  }
  return Boolean(co?.normalizeToolCallId);
}

/**
 * Explicit preserve-openai-developer preference for this provider/model.
 * `undefined` = unset → routing keeps legacy default (preserve developer for OpenAI format).
 * `false` = map developer → system (e.g. MiniMax). `true` = keep developer.
 * Per-protocol overrides live under `compatByProtocol[sourceFormat]` when `sourceFormat` matches.
 */
export function getModelPreserveOpenAIDeveloperRole(
  providerId: string,
  modelId: string,
  sourceFormat?: string | null
): boolean | undefined {
  const m = getCustomModelRow(providerId, modelId);
  const protocol = sourceFormat && isCompatProtocolKey(sourceFormat) ? sourceFormat : null;

  if (m) {
    if (protocol) {
      const pc = (m.compatByProtocol as CompatByProtocolMap | undefined)?.[protocol];
      if (pc && Object.prototype.hasOwnProperty.call(pc, "preserveOpenAIDeveloperRole")) {
        return Boolean(pc.preserveOpenAIDeveloperRole);
      }
    }
    if (Object.prototype.hasOwnProperty.call(m, "preserveOpenAIDeveloperRole")) {
      return Boolean(m.preserveOpenAIDeveloperRole);
    }
    return undefined;
  }
  const co = readCompatList(providerId).find((e) => e.id === modelId);
  if (protocol && co?.compatByProtocol?.[protocol]) {
    const pc = co.compatByProtocol[protocol]!;
    if (Object.prototype.hasOwnProperty.call(pc, "preserveOpenAIDeveloperRole")) {
      return Boolean(pc.preserveOpenAIDeveloperRole);
    }
  }
  if (co && Object.prototype.hasOwnProperty.call(co, "preserveOpenAIDeveloperRole")) {
    return Boolean(co.preserveOpenAIDeveloperRole);
  }
  return undefined;
}

/**
 * Check if the model is flagged as hidden from the public catalog.
 */
export function getModelIsHidden(providerId: string, modelId: string): boolean {
  const m = getCustomModelRow(providerId, modelId);
  if (m && Object.prototype.hasOwnProperty.call(m, "isHidden")) {
    return Boolean(m.isHidden);
  }
  const co = readCompatList(providerId).find((e) => e.id === modelId);
  return Boolean(co?.isHidden);
}

function readUpstreamFromJsonRecord(
  row: JsonRecord | null | undefined,
  key: "upstreamHeaders"
): Record<string, string> | undefined {
  if (!row) return undefined;
  const raw = row[key];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const s = sanitizeUpstreamHeadersMap(raw as Record<string, unknown>);
  return Object.keys(s).length > 0 ? s : undefined;
}

/**
 * Extra HTTP headers to send to the upstream provider for this model (after executor auth headers).
 * Order: top-level `upstreamHeaders` on the custom model row (override list merged under custom),
 * then per-protocol `compatByProtocol[sourceFormat].upstreamHeaders` (wins on key conflict).
 * Use for gateways that expect `Authentication`, `X-API-Key`, etc. alongside Bearer.
 *
 * `modelId` should be the **canonical** model id when known. Callers that accept client aliases
 * (e.g. chat proxy) should merge results for both alias and `resolveModelAlias(alias)` so UI
 * config on the resolved id still applies — see `chatCore` merge.
 */
export function getModelUpstreamExtraHeaders(
  providerId: string,
  modelId: string,
  sourceFormat?: string | null
): Record<string, string> {
  const protocol = sourceFormat && isCompatProtocolKey(sourceFormat) ? sourceFormat : null;
  const m = getCustomModelRow(providerId, modelId);

  const base: Record<string, string> = {};
  if (m) {
    const fromModel = readUpstreamFromJsonRecord(m, "upstreamHeaders");
    if (fromModel) Object.assign(base, fromModel);
    if (protocol) {
      const pc = (m.compatByProtocol as CompatByProtocolMap | undefined)?.[protocol];
      const fromProto = pc?.upstreamHeaders;
      if (fromProto && typeof fromProto === "object") {
        Object.assign(base, sanitizeUpstreamHeadersMap(fromProto as Record<string, unknown>));
      }
    }
    return base;
  }

  const co = readCompatList(providerId).find((e) => e.id === modelId);
  if (co?.upstreamHeaders) {
    Object.assign(base, sanitizeUpstreamHeadersMap(co.upstreamHeaders as Record<string, unknown>));
  }
  if (protocol && co?.compatByProtocol?.[protocol]?.upstreamHeaders) {
    Object.assign(
      base,
      sanitizeUpstreamHeadersMap(
        co.compatByProtocol[protocol]!.upstreamHeaders as Record<string, unknown>
      )
    );
  }
  return base;
}
