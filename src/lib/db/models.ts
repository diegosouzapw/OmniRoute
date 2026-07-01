/**
 * db/models.js — Model aliases, MITM aliases, and custom models.
 */

import { getDbInstance } from "./core";
import { backupDbFile } from "./backup";
import {
  applyCapabilityPatchDeletes,
  buildTokenLimitDeleteMarkers,
  capabilityPatchHasNonNull,
  cloneJsonRecord,
  compatByProtocolHasEntries,
  deepMergeCompatByProtocol,
  getModelIsDeleted,
  getModelCompatOverrides,
  mergeModelCompatOverride,
  modelCapabilitiesHasEntries,
  normalizeModelCapabilities,
  normalizeModelCapabilitiesFromRow,
  removeModelCompatOverride,
  resetModelConfigOverride,
  sanitizeUpstreamHeadersMap,
  type CompatByProtocolMap,
  type ModelCompatPerProtocol,
  type ModelCompatProtocolKey,
} from "./modelCompat";
import {
  buildCompatConfigFromRow,
  buildModelCompatFields,
  canonicalizeModelConfigRow,
  clearLegacyCapabilityFields,
  clearLegacyCompatFields,
  sanitizeModelConfigBaseline,
} from "./modelConfigRows";
import { getCustomModelRow, getSyncedAvailableModelRow } from "./modelConfigSnapshot";
export {
  MODEL_COMPAT_PROTOCOL_KEYS,
  getHiddenModelsByProvider,
  getModelCompatOverrides,
  getModelIsDeleted,
  getModelIsHidden,
  getModelNormalizeToolCallId,
  getModelPreserveOpenAIDeveloperRole,
  getModelUpstreamExtraHeaders,
  mergeModelCompatOverride,
  removeModelCompatOverride,
  resetModelConfigOverride,
  sanitizeUpstreamHeadersMap,
  setModelIsHidden,
  type ModelCompatPatch,
  type ModelCompatPerProtocol,
  type ModelCompatProtocolKey,
} from "./modelCompat";
export { getProviderModelConfigSnapshot } from "./modelConfigSnapshot";
import {
  type ProviderModelCapabilities,
  type ProviderModelCapabilitiesPatch,
  type ProviderModelConfig,
} from "@/shared/types/modelConfig";

type JsonRecord = Record<string, unknown>;

const CONTEXT_CAPABILITY_KEYS = [
  "contextWindow",
  "contextLength",
  "maxInputTokens",
  "inputTokenLimit",
] as const;
const OUTPUT_CAPABILITY_KEYS = ["maxOutputTokens", "outputTokenLimit"] as const;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function normalizeStringList(value: unknown, sort = false): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const list = Array.from(
    new Set(
      value
        .map((entry) => toNonEmptyString(entry))
        .filter((entry): entry is string => Boolean(entry))
    )
  );
  return sort ? list.sort() : list;
}

function getSyncedModelIdentity(record: JsonRecord): { id: string; name: string } | null {
  const id =
    toNonEmptyString(record.id) || toNonEmptyString(record.name) || toNonEmptyString(record.model);
  if (!id) return null;

  return {
    id,
    name:
      toNonEmptyString(record.name) ||
      toNonEmptyString(record.displayName) ||
      toNonEmptyString(record.model) ||
      id,
  };
}

function assignNumberField(target: JsonRecord, key: string, value: unknown) {
  if (typeof value === "number") target[key] = value;
}

function assignStringField(target: JsonRecord, key: string, value: unknown) {
  if (typeof value === "string") target[key] = value;
}

function assignNonEmptyStringField(target: JsonRecord, key: string, value: unknown) {
  const normalized = toNonEmptyString(value);
  if (normalized) target[key] = normalized;
}

function getKeyValue(row: unknown): { key: string | null; value: string | null } {
  const record = asRecord(row);
  return {
    key: typeof record.key === "string" ? record.key : null,
    value: typeof record.value === "string" ? record.value : null,
  };
}

function parseJsonValue(value: string | null | undefined): unknown {
  if (!value) return undefined;
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

function parseJsonArray(value: string | null | undefined): unknown[] {
  const parsed = parseJsonValue(value);
  return Array.isArray(parsed) ? parsed : [];
}

function parseJsonRecordArray(value: string | null | undefined): JsonRecord[] {
  return parseJsonArray(value).filter((entry): entry is JsonRecord =>
    Boolean(entry && typeof entry === "object" && !Array.isArray(entry))
  );
}

function clearModelConfigFields(target: JsonRecord, includeCompat = false): void {
  for (const key of [
    "capabilities",
    "capabilityOverrides",
    "inputTokenLimit",
    "outputTokenLimit",
    "supportsVision",
    "supportsThinking",
    "supportsTools",
    "supportsReasoning",
    "supportsXHighEffort",
    "supportsMaxEffort",
    "reasoningEfforts",
    "defaultThinkingBudget",
    "thinkingBudgetCap",
    "thinkingOverhead",
    "adaptiveMaxTokens",
    "interleavedField",
    ...(includeCompat
      ? [
          "targetFormat",
          "unsupportedParams",
          "normalizeToolCallId",
          "preserveOpenAIDeveloperRole",
          "compatByProtocol",
          "upstreamHeaders",
        ]
      : []),
  ]) {
    delete target[key];
  }
}

function deleteCapabilityRowFields(target: JsonRecord, rawCapabilities: JsonRecord): void {
  const drop = (...keys: string[]) => keys.forEach((key) => delete target[key]);
  if (
    rawCapabilities.contextWindow === null ||
    rawCapabilities.contextLength === null ||
    rawCapabilities.maxInputTokens === null ||
    rawCapabilities.inputTokenLimit === null
  ) {
    drop("contextWindow", "contextLength", "maxInputTokens", "inputTokenLimit");
  }
  if (rawCapabilities.maxOutputTokens === null || rawCapabilities.outputTokenLimit === null) {
    drop("maxOutputTokens", "outputTokenLimit");
  }
  if (rawCapabilities.supportsTools === null || rawCapabilities.toolCalling === null) {
    drop("supportsTools", "toolCalling");
  }
  if (rawCapabilities.supportsReasoning === null || rawCapabilities.supportsThinking === null) {
    drop("supportsReasoning", "supportsThinking");
  }
  if (rawCapabilities.thinkingBudgetCap === null || rawCapabilities.maxThinkingBudget === null) {
    drop("thinkingBudgetCap", "maxThinkingBudget");
  }
  for (const key of [
    "supportsVision",
    "supportsXHighEffort",
    "supportsMaxEffort",
    "defaultThinkingBudget",
    "thinkingOverhead",
    "adaptiveMaxTokens",
    "interleavedField",
  ]) {
    if (rawCapabilities[key] === null) drop(key);
  }
  if (
    rawCapabilities.reasoningEfforts === null ||
    (Array.isArray(rawCapabilities.reasoningEfforts) &&
      rawCapabilities.reasoningEfforts.length === 0)
  ) {
    drop("reasoningEfforts");
  }
}

function updateCustomCapabilityDeleteMarkers(
  target: JsonRecord,
  rawCapabilities: JsonRecord
): void {
  const nextOverrides = applyCapabilityPatchDeletes(
    { ...asRecord(target.capabilityOverrides) },
    rawCapabilities,
    true
  );
  const clear = (...keys: string[]) => keys.forEach((key) => delete nextOverrides[key]);

  if (capabilityPatchHasNonNull(rawCapabilities, CONTEXT_CAPABILITY_KEYS)) {
    clear("contextWindow", "maxInputTokens");
  }
  if (capabilityPatchHasNonNull(rawCapabilities, OUTPUT_CAPABILITY_KEYS)) {
    clear("maxOutputTokens");
  }
  for (const key of [
    "defaultThinkingBudget",
    "thinkingOverhead",
    "adaptiveMaxTokens",
    "interleavedField",
  ]) {
    if (capabilityPatchHasNonNull(rawCapabilities, [key])) clear(key);
  }
  if (capabilityPatchHasNonNull(rawCapabilities, ["thinkingBudgetCap", "maxThinkingBudget"])) {
    clear("thinkingBudgetCap", "maxThinkingBudget");
  }
  for (const key of ["supportsVision", "supportsXHighEffort", "supportsMaxEffort"]) {
    if (capabilityPatchHasNonNull(rawCapabilities, [key])) clear(key);
  }
  if (capabilityPatchHasNonNull(rawCapabilities, ["supportsTools", "toolCalling"])) {
    clear("supportsTools", "toolCalling");
  }
  if (capabilityPatchHasNonNull(rawCapabilities, ["supportsReasoning", "supportsThinking"])) {
    clear("supportsReasoning", "supportsThinking");
  }

  if (Object.keys(nextOverrides).length > 0) {
    target.capabilityOverrides = nextOverrides;
  } else {
    delete target.capabilityOverrides;
  }
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
    const parsed = parseJsonValue(value);
    if (parsed !== undefined) result[key] = parsed;
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

/**
 * Cascade-delete every model-alias row that resolves to the given provider.
 *
 * Managed/imported aliases are stored as `key = <alias>`, `value = "<providerId>/<model>"`
 * (e.g. `setModelAlias("x-fast", "providerX/fast-model")`). When a custom provider is
 * removed, its connections and node are deleted but these alias rows are left behind,
 * which then block re-importing the same provider ("already exists" / no new models) — see
 * #1409. This removes every alias whose stored value begins with `<providerId>/`, so a
 * fresh import is unblocked.
 *
 * Only string values starting with the exact `"<providerId>/"` prefix match, so unrelated
 * providers and user-facing settings aliases (whose value is the bare alias, not a
 * `<providerId>/<model>` string) are left untouched.
 *
 * @returns the list of alias keys that were removed.
 */
export async function deleteModelAliasesForProvider(providerId: string): Promise<string[]> {
  const prefix = `${providerId}/`;
  const aliases = await getModelAliases();
  const removed: string[] = [];
  for (const [alias, value] of Object.entries(aliases)) {
    if (typeof value !== "string" || !value.startsWith(prefix)) continue;
    await deleteModelAlias(alias);
    removed.push(alias);
  }
  return removed;
}

// ──────────────── MITM Alias ────────────────

export async function getMitmAlias(toolName?: string) {
  const db = getDbInstance();
  if (toolName) {
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'mitmAlias' AND key = ?")
      .get(toolName);
    const value = getKeyValue(row).value;
    return asRecord(parseJsonValue(value));
  }
  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'mitmAlias'").all();
  const result: Record<string, unknown> = {};
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key || value === null) continue;
    const parsed = parseJsonValue(value);
    if (parsed !== undefined) result[key] = parsed;
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

export async function getCustomModels(providerId: string): Promise<JsonRecord[]>;
export async function getCustomModels(): Promise<Record<string, unknown>>;
export async function getCustomModels(
  providerId?: string
): Promise<JsonRecord[] | Record<string, unknown>> {
  const db = getDbInstance();
  if (providerId) {
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
      .get(providerId);
    const value = getKeyValue(row).value;
    return parseJsonRecordArray(value).map((model) => canonicalizeModelConfigRow(model));
  }
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'customModels'")
    .all();
  const result: Record<string, unknown> = {};
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key || value === null) continue;
    const parsed = parseJsonValue(value);
    if (Array.isArray(parsed)) {
      result[key] = parsed
        .filter((entry): entry is JsonRecord =>
          Boolean(entry && typeof entry === "object" && !Array.isArray(entry))
        )
        .map((model) => canonicalizeModelConfigRow(model));
    }
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
    const parsed = parseJsonValue(value);
    if (Array.isArray(parsed)) {
      result[key] = parsed
        .filter((entry): entry is JsonRecord =>
          Boolean(entry && typeof entry === "object" && !Array.isArray(entry))
        )
        .map((model) => canonicalizeModelConfigRow(model));
    }
  }
  return result;
}

function getCustomModelRowsRaw(providerId: string): JsonRecord[] {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
    .get(providerId);
  return parseJsonRecordArray(getKeyValue(row).value);
}

function writeCustomModelRowsRaw(providerId: string, models: JsonRecord[]): void {
  const db = getDbInstance();
  if (models.length === 0) {
    db.prepare("DELETE FROM key_value WHERE namespace = 'customModels' AND key = ?").run(
      providerId
    );
    return;
  }
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('customModels', ?, ?)"
  ).run(providerId, JSON.stringify(models));
}

function removeCustomModelRowOnly(providerId: string, modelId: string): JsonRecord | null {
  const models = getCustomModelRowsRaw(providerId);
  const index = models.findIndex((m: JsonRecord) => m.id === modelId);
  if (index === -1) return null;
  const [removed] = models.splice(index, 1);
  writeCustomModelRowsRaw(providerId, models);
  backupDbFile("pre-write");
  return removed || null;
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
    | "rerank"
    | "audio-transcriptions"
    | "audio-speech"
    | "images-generations" = "chat-completions",
  supportedEndpoints: string[] = ["chat"],
  // #2905: optional per-model wire format override (e.g. "claude" for an
  // opencode-go custom model). When unset, routing falls back to the provider
  // default format.
  targetFormat?: string,
  // #1294: optional per-model token limits supplied from the "add custom model"
  // form. Persisted under the same keys the /v1/models catalog reads back.
  tokenLimits: { inputTokenLimit?: number; outputTokenLimit?: number } = {},
  modelConfig: ProviderModelConfig = {}
) {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
    .get(providerId);
  const value = getKeyValue(row).value;
  const models = parseJsonRecordArray(value);

  const exists = models.find((m: JsonRecord) => m.id === modelId);
  if (exists) return canonicalizeModelConfigRow(exists);

  const rawCapabilities = {
    ...(modelConfig.capabilities || {}),
    ...(tokenLimits.inputTokenLimit != null
      ? { contextWindow: tokenLimits.inputTokenLimit, maxInputTokens: tokenLimits.inputTokenLimit }
      : {}),
    ...(tokenLimits.outputTokenLimit != null
      ? { maxOutputTokens: tokenLimits.outputTokenLimit }
      : {}),
  };
  const capabilities = normalizeModelCapabilities(rawCapabilities);
  const capabilityOverrides = buildTokenLimitDeleteMarkers({
    capabilities: rawCapabilities,
    capabilityOverrides: modelConfig.capabilityOverrides,
  });
  const compat = asRecord(modelConfig.compat);
  const compatFields = buildModelCompatFields({
    ...compat,
    ...(targetFormat ? { targetFormat } : {}),
  });
  const model: JsonRecord = {
    id: modelId,
    name: modelName || modelId,
    source,
    apiFormat,
    supportedEndpoints,
    ...(capabilities ? { capabilities } : {}),
    ...(Object.keys(capabilityOverrides).length > 0 ? { capabilityOverrides } : {}),
    ...(Object.keys(compatFields).length > 0 ? { compat: compatFields } : {}),
  };
  model.baseline = cloneJsonRecord(model);
  models.push(model);
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('customModels', ?, ?)"
  ).run(providerId, JSON.stringify(models));
  backupDbFile("pre-write");
  return canonicalizeModelConfigRow(model);
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
    supportsVision?: boolean;
    supportsTools?: boolean;
    supportsReasoning?: boolean;
    supportsXHighEffort?: boolean;
    supportsMaxEffort?: boolean;
    capabilities?: ProviderModelCapabilities;
    unsupportedParams?: string[];
    targetFormat?: string;
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
  const existing = getCustomModelRowsRaw(providerId);
  const existingMap = new Map<string, JsonRecord>();
  for (const m of existing) {
    if (m.id) existingMap.set(String(m.id), m);
  }

  // Merge: keep existing per-model compat flags if model still exists
  const merged = models.map((m) => {
    const prev = existingMap.get(m.id);
    const incomingCapabilities = normalizeModelCapabilitiesFromRow(m as JsonRecord);
    const previousCapabilities = prev ? normalizeModelCapabilitiesFromRow(prev) : undefined;
    const capabilities = incomingCapabilities || previousCapabilities;
    const capabilityOverrides = {
      ...asRecord((prev as any)?.capabilityOverrides),
      ...asRecord((m as any)?.capabilityOverrides),
    };
    const compat = buildModelCompatFields({
      ...asRecord(prev?.compat),
      ...(prev ? buildCompatConfigFromRow(prev) : {}),
      ...asRecord((m as JsonRecord).compat),
      ...(m.targetFormat
        ? { targetFormat: m.targetFormat }
        : (prev as any)?.targetFormat
          ? { targetFormat: (prev as any).targetFormat }
          : {}),
      ...(Array.isArray(m.unsupportedParams) && m.unsupportedParams.length > 0
        ? { unsupportedParams: m.unsupportedParams }
        : Array.isArray((prev as any)?.unsupportedParams) &&
            (prev as any).unsupportedParams.length > 0
          ? { unsupportedParams: (prev as any).unsupportedParams }
          : {}),
    });
    const next: JsonRecord = {
      id: m.id,
      name: m.name || m.id,
      source: m.source || "auto-sync",
      apiFormat: m.apiFormat || (prev as any)?.apiFormat || "chat-completions",
      supportedEndpoints: m.supportedEndpoints || (prev as any)?.supportedEndpoints || ["chat"],
      ...(capabilities ? { capabilities } : {}),
      ...(Object.keys(capabilityOverrides).length > 0 ? { capabilityOverrides } : {}),
      ...(Object.keys(compat).length > 0 ? { compat } : {}),
      ...(m.description != null
        ? { description: m.description }
        : (prev as any)?.description != null
          ? { description: (prev as any).description }
          : {}),
      ...(prev && (prev as any).baseline
        ? { baseline: sanitizeModelConfigBaseline(asRecord((prev as any).baseline)) }
        : {}),
    };
    if (!next.baseline) next.baseline = sanitizeModelConfigBaseline(next);
    return next;
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

  backupDbFile("pre-write");
  return merged.map((model) => canonicalizeModelConfigRow(model));
}

export async function removeCustomModel(providerId: string, modelId: string) {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
    .get(providerId);
  if (!row) return false;

  const value = getKeyValue(row).value;
  if (!value) return false;
  const models = parseJsonRecordArray(value);
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
  apiFormat?: string;
  supportedEndpoints?: string[];
  description?: string;
  capabilities?: ProviderModelCapabilities;
  capabilityOverrides?: ProviderModelCapabilitiesPatch;
  compat?: ProviderModelConfig["compat"];
}

type SyncedAvailableModelInput = Omit<SyncedAvailableModel, "source"> & {
  source?: string;
};

function normalizeSyncedAvailableModel(model: unknown): SyncedAvailableModel | null {
  const record = asRecord(model);
  const identity = getSyncedModelIdentity(record);
  if (!identity) return null;
  const capabilities = normalizeModelCapabilitiesFromRow(record);
  const capabilityOverrides = buildTokenLimitDeleteMarkers(record);
  const targetFormat = toNonEmptyString(record.targetFormat);
  const supportedEndpoints = normalizeStringList(record.supportedEndpoints, true);
  const unsupportedParams = normalizeStringList(record.unsupportedParams);
  const compat = buildModelCompatFields({
    ...asRecord(record.compat),
    ...(targetFormat ? { targetFormat } : {}),
    ...(unsupportedParams?.length ? { unsupportedParams } : {}),
  });

  const normalized: JsonRecord = {
    id: identity.id,
    name: identity.name,
    source: "imported",
  };
  assignNonEmptyStringField(normalized, "apiFormat", record.apiFormat);
  assignStringField(normalized, "description", record.description);
  if (supportedEndpoints?.length) normalized.supportedEndpoints = supportedEndpoints;
  if (capabilities) normalized.capabilities = capabilities;
  if (Object.keys(capabilityOverrides).length > 0) {
    normalized.capabilityOverrides = capabilityOverrides;
  }
  if (Object.keys(compat).length > 0) normalized.compat = compat;
  return normalized as unknown as SyncedAvailableModel;
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

function filterVisibleSyncedAvailableModels(
  providerId: string,
  models: SyncedAvailableModel[]
): SyncedAvailableModel[] {
  return models.filter((model) => !getModelIsDeleted(providerId, model.id));
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
  return filterVisibleSyncedAvailableModels(
    providerId,
    normalizeSyncedAvailableModels(parseJsonArray(value))
  );
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
    const models = filterVisibleSyncedAvailableModels(
      providerId,
      normalizeSyncedAvailableModels(parseJsonArray(value))
    );
    for (const m of models) {
      if (m.id) map.set(m.id, m);
    }
  }
  return Array.from(map.values());
}

/**
 * Get synced available models for a provider grouped by connection id.
 */
export async function getSyncedAvailableModelsByConnection(
  providerId: string
): Promise<Record<string, SyncedAvailableModel[]>> {
  const db = getDbInstance();
  const prefix = `${providerId}:`;
  const rows = db
    .prepare(
      "SELECT key, value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key LIKE ?"
    )
    .all(`${prefix}%`);
  const result: Record<string, SyncedAvailableModel[]> = {};
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key || value === null || !key.startsWith(prefix)) continue;
    const connectionId = key.slice(prefix.length);
    result[connectionId] = filterVisibleSyncedAvailableModels(
      providerId,
      normalizeSyncedAvailableModels(parseJsonArray(value))
    );
  }
  return result;
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
    const models = filterVisibleSyncedAvailableModels(
      providerId,
      normalizeSyncedAvailableModels(parseJsonArray(value))
    );
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
  const existingRow = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?")
    .get(key);
  const existingModels = normalizeSyncedAvailableModels(
    parseJsonArray(getKeyValue(existingRow).value)
  );
  // #3199: drop ids the operator DELETED (trash) so a re-fetch does not re-import
  // a model that was explicitly removed.
  // #3782: key ONLY on the distinct `isDeleted` marker — NOT on `isHidden`.
  // Eye/visibility-hidden models (`isHidden:true`, no `isDeleted`) must stay in
  // the synced store so they remain listed-but-hidden across re-syncs instead of
  // churning back on through the managed-alias path ("Auto Sync Enabling all
  // Models"). See getModelIsDeleted for the legacy-row caveat.
  const visibleIncomingModels = normalizeSyncedAvailableModels(models).filter(
    (m) => !getModelIsDeleted(providerId, m.id)
  );
  const visibleIncomingIds = new Set(visibleIncomingModels.map((model) => model.id));
  const deletedExistingModels = existingModels.filter(
    (model) => getModelIsDeleted(providerId, model.id) && !visibleIncomingIds.has(model.id)
  );
  const modelsToStore = [...visibleIncomingModels, ...deletedExistingModels];
  if (modelsToStore.length === 0) {
    db.prepare("DELETE FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?").run(
      key
    );
  } else {
    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
    ).run(key, JSON.stringify(modelsToStore));
  }
  backupDbFile("pre-write");
  // Return the full unioned list for the provider
  return getSyncedAvailableModels(providerId);
}

/**
 * Remove a single synced available model from all connections of a provider.
 * Returns true if the model was found and removed from at least one connection.
 */
export async function removeSyncedAvailableModel(
  providerId: string,
  modelId: string
): Promise<boolean> {
  const db = getDbInstance();
  const prefix = `${providerId}:`;
  const rows = db
    .prepare(
      "SELECT key, value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key LIKE ?"
    )
    .all(`${prefix}%`);

  let removedAny = false;
  const removeModel = db.transaction(() => {
    for (const row of rows) {
      const { key, value } = getKeyValue(row);
      if (!key || value === null) continue;

      const models = normalizeSyncedAvailableModels(parseJsonArray(value));
      const filtered = models.filter((m) => m.id !== modelId);
      if (filtered.length !== models.length) {
        removedAny = true;
        if (filtered.length === 0) {
          db.prepare(
            "DELETE FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?"
          ).run(key);
        } else {
          db.prepare(
            "UPDATE key_value SET value = ? WHERE namespace = 'syncedAvailableModels' AND key = ?"
          ).run(JSON.stringify(filtered), key);
        }
      }
    }

    if (removedAny) backupDbFile("pre-write");
  });

  removeModel();
  return removedAny;
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

/**
 * Delete all synced models for every connection belonging to a provider.
 * Returns the number of connection-scoped synced model lists removed.
 */
export async function deleteSyncedAvailableModelsForProvider(providerId: string): Promise<number> {
  const db = getDbInstance();
  const keyPrefix = `${providerId}:`;
  const result = db
    .prepare(
      "DELETE FROM key_value WHERE namespace = 'syncedAvailableModels' AND substr(key, 1, ?) = ?"
    )
    .run(keyPrefix.length, keyPrefix);
  backupDbFile("pre-write");
  return Number(result.changes || 0);
}

/**
 * Prune stale synced available models for a provider, keeping only the specified allowed connection IDs.
 * Returns the number of keys deleted.
 */
export async function pruneStaleSyncedAvailableModelsForProvider(
  providerId: string,
  allowedConnectionIds: string[]
): Promise<number> {
  const db = getDbInstance();
  if (allowedConnectionIds.length === 0) {
    return deleteSyncedAvailableModelsForProvider(providerId);
  }
  const placeholders = allowedConnectionIds.map(() => "?").join(",");
  const keyPrefix = `${providerId}:`;
  const allowedKeys = allowedConnectionIds.map((id) => `${providerId}:${id}`);
  const result = db
    .prepare(
      `DELETE FROM key_value WHERE namespace = 'syncedAvailableModels' AND key LIKE ? AND key NOT IN (${placeholders})`
    )
    .run(`${keyPrefix}%`, ...allowedKeys);
  backupDbFile("pre-write");
  return Number(result.changes || 0);
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

  const models = parseJsonRecordArray(value);
  const index = models.findIndex((m: JsonRecord) => m.id === modelId);
  if (index === -1) return null;

  const current = models[index];
  const currentCompatConfig = buildCompatConfigFromRow(current);
  const currentCompat = currentCompatConfig?.compatByProtocol as CompatByProtocolMap | undefined;
  const nextCompat: JsonRecord = { ...(currentCompatConfig || {}) };
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
    ...(updates.isHidden !== undefined ? { isHidden: Boolean(updates.isHidden) } : {}),
  };
  clearLegacyCompatFields(next);
  if (updates.normalizeToolCallId !== undefined) {
    nextCompat.normalizeToolCallId = Boolean(updates.normalizeToolCallId);
  }
  if (Object.prototype.hasOwnProperty.call(updates, "targetFormat")) {
    const targetFormat =
      typeof updates.targetFormat === "string" ? updates.targetFormat.trim() : "";
    if (targetFormat) nextCompat.targetFormat = targetFormat;
    else delete nextCompat.targetFormat;
  }
  if (Object.prototype.hasOwnProperty.call(updates, "capabilities")) {
    if (updates.capabilities === null) {
      clearModelConfigFields(next);
    } else {
      const rawCapabilities = asRecord(updates.capabilities);
      deleteCapabilityRowFields(next, rawCapabilities);
      updateCustomCapabilityDeleteMarkers(next, rawCapabilities);
      const mergedCapabilities = applyCapabilityPatchDeletes(
        { ...(normalizeModelCapabilitiesFromRow(next) || {}) },
        rawCapabilities
      );
      const capabilities = normalizeModelCapabilities(rawCapabilities);
      if (capabilities) Object.assign(mergedCapabilities, capabilities);
      if (modelCapabilitiesHasEntries(mergedCapabilities as ProviderModelCapabilities)) {
        const normalizedCapabilities = mergedCapabilities as ProviderModelCapabilities;
        next.capabilities = normalizedCapabilities;
      } else {
        delete next.capabilities;
      }
      clearLegacyCapabilityFields(next);
    }
  }
  if (Object.prototype.hasOwnProperty.call(updates, "unsupportedParams")) {
    if (Array.isArray(updates.unsupportedParams)) {
      const params = Array.from(
        new Set(
          updates.unsupportedParams
            .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
            .filter(Boolean)
        )
      );
      if (params.length > 0) nextCompat.unsupportedParams = params;
      else delete nextCompat.unsupportedParams;
    } else {
      delete nextCompat.unsupportedParams;
    }
  }
  if (Object.prototype.hasOwnProperty.call(updates, "preserveOpenAIDeveloperRole")) {
    if (updates.preserveOpenAIDeveloperRole === null) {
      delete nextCompat.preserveOpenAIDeveloperRole;
    } else {
      nextCompat.preserveOpenAIDeveloperRole = Boolean(updates.preserveOpenAIDeveloperRole);
    }
  }
  if (updates.compatByProtocol !== undefined) {
    if (mergedCompat && compatByProtocolHasEntries(mergedCompat)) {
      nextCompat.compatByProtocol = mergedCompat;
    } else {
      delete nextCompat.compatByProtocol;
    }
  }

  if (Object.prototype.hasOwnProperty.call(updates, "upstreamHeaders")) {
    const uh = updates.upstreamHeaders;
    if (uh === null || uh === undefined) {
      delete nextCompat.upstreamHeaders;
    } else if (typeof uh === "object" && !Array.isArray(uh)) {
      const s = sanitizeUpstreamHeadersMap(uh as Record<string, unknown>);
      if (Object.keys(s).length === 0) delete nextCompat.upstreamHeaders;
      else nextCompat.upstreamHeaders = s;
    }
  }

  if (Object.keys(nextCompat).length > 0) next.compat = nextCompat;
  else delete next.compat;

  models[index] = next;

  db.prepare("UPDATE key_value SET value = ? WHERE namespace = 'customModels' AND key = ?").run(
    JSON.stringify(models),
    providerId
  );

  backupDbFile("pre-write");
  return canonicalizeModelConfigRow(next);
}

export async function resetCustomModelToBaseline(providerId: string, modelId: string) {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?")
    .get(providerId);
  const value = getKeyValue(row).value;
  if (!value) return null;

  const models = parseJsonRecordArray(value);
  const index = models.findIndex((m: JsonRecord) => m.id === modelId);
  if (index === -1) return null;

  const current = asRecord(models[index]);
  const baseline = asRecord(current.baseline);
  const hasBaseline = Object.keys(baseline).length > 0 && baseline.id === modelId;
  const next: JsonRecord = hasBaseline
    ? sanitizeModelConfigBaseline(baseline)
    : {
        ...current,
      };

  if (!hasBaseline) {
    clearModelConfigFields(next, true);
  }

  if (Object.prototype.hasOwnProperty.call(current, "isHidden")) {
    next.isHidden = current.isHidden;
  }
  next.baseline = hasBaseline ? sanitizeModelConfigBaseline(baseline) : cloneJsonRecord(next);
  models[index] = next;

  db.prepare("UPDATE key_value SET value = ? WHERE namespace = 'customModels' AND key = ?").run(
    JSON.stringify(models),
    providerId
  );
  resetModelConfigOverride(providerId, modelId);
  backupDbFile("pre-write");
  return canonicalizeModelConfigRow(next);
}

export async function resetProviderModelConfig(providerId: string, modelId: string) {
  const existingCustom = getCustomModelRow(providerId, modelId);
  const synced = getSyncedAvailableModelRow(providerId, modelId);

  if (existingCustom && synced) {
    removeCustomModelRowOnly(providerId, modelId);
    resetModelConfigOverride(providerId, modelId);
    if (Object.prototype.hasOwnProperty.call(existingCustom, "isHidden")) {
      mergeModelCompatOverride(providerId, modelId, { isHidden: Boolean(existingCustom.isHidden) });
    }
    return canonicalizeModelConfigRow(synced);
  }

  const custom = await resetCustomModelToBaseline(providerId, modelId);
  if (custom) return custom;
  resetModelConfigOverride(providerId, modelId);
  return synced ? canonicalizeModelConfigRow(synced) : null;
}
