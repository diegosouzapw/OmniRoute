import {
  getCustomModels,
  getModelIsHidden,
  getSyncedAvailableModelsForConnection,
  mergeModelCompatOverride,
  replaceCustomModels,
  replaceSyncedAvailableModelsForConnection,
  pruneStaleSyncedAvailableModelsForProvider,
  setMitmAliasAll,
  getSyncedAvailableModels,
  type ModelCompatPatch,
  type SyncedAvailableModel,
} from "@/lib/db/models";
import { getProviderConnections } from "@/lib/db/providers";
import {
  syncManagedAvailableModelAliases,
  usesManagedAvailableModels,
} from "@/lib/providerModels/managedAvailableModels";
import { normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";
import {
  ANTIGRAVITY_MODEL_ALIASES,
  ANTIGRAVITY_REVERSE_MODEL_ALIASES,
} from "@omniroute/open-sse/config/antigravityModelAliases.ts";

type JsonRecord = Record<string, unknown>;
type JsonMutableRecord = Record<string, unknown>;

export type ManagedModelImportMode = "merge" | "sync";

export type ManagedImportedModel = {
  id: string;
  name: string;
  source: "imported";
  apiFormat: string;
  supportedEndpoints?: string[];
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  description?: string;
  targetFormat?: string;
  compat?: SyncedAvailableModel["compat"];
  capabilities?: SyncedAvailableModel["capabilities"];
  capabilityOverrides?: SyncedAvailableModel["capabilityOverrides"];
  supportsVision?: boolean;
  supportsTools?: boolean;
  supportsReasoning?: boolean;
  supportsXHighEffort?: boolean;
  supportsMaxEffort?: boolean;
  unsupportedParams?: string[];
};

type PersistedCustomModelInput = {
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
  targetFormat?: string;
  compat?: SyncedAvailableModel["compat"];
  capabilities?: SyncedAvailableModel["capabilities"];
  unsupportedParams?: string[];
};

const IMPORTED_BOOLEAN_KEYS = [
  "supportsVision",
  "supportsTools",
  "supportsReasoning",
  "supportsXHighEffort",
  "supportsMaxEffort",
] as const;

const CUSTOM_CAPABILITY_KEYS = [
  ...IMPORTED_BOOLEAN_KEYS,
  "defaultThinkingBudget",
  "thinkingBudgetCap",
  "thinkingOverhead",
  "adaptiveMaxTokens",
  "interleavedField",
] as const;

function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function normalizeManagedSource(source: unknown): string {
  const normalized = toNonEmptyString(source)?.toLowerCase();
  if (normalized === "api-sync" || normalized === "auto-sync" || normalized === "imported") {
    return "imported";
  }
  return normalized || "manual";
}

function normalizeImportedModels(fetchedModels: unknown): ManagedImportedModel[] {
  const discovered = normalizeDiscoveredModels(fetchedModels);
  return discovered.map(normalizeImportedModel);
}

function isImportedSource(source: unknown): boolean {
  return normalizeManagedSource(source) === "imported";
}

function getModelId(model: JsonRecord): string | null {
  return toNonEmptyString(model.id);
}

function setStringIfPresent(target: JsonMutableRecord, key: string, value: unknown) {
  if (typeof value === "string") target[key] = value;
}

function setNumberIfPresent(target: JsonMutableRecord, key: string, value: unknown) {
  if (typeof value === "number") target[key] = value;
}

function setBooleanIfPresent(target: JsonMutableRecord, key: string, value: unknown) {
  if (typeof value === "boolean") target[key] = value;
}

function setObjectIfPresent(target: JsonMutableRecord, key: string, value: unknown) {
  if (value && typeof value === "object" && !Array.isArray(value)) target[key] = value;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function setStringArrayIfPresent(target: JsonMutableRecord, key: string, value: unknown) {
  if (Array.isArray(value) && value.length > 0) target[key] = value;
}

function copyImportedModelMetadata(target: JsonMutableRecord, model: SyncedAvailableModel) {
  setStringArrayIfPresent(target, "supportedEndpoints", model.supportedEndpoints);
  setNumberIfPresent(target, "inputTokenLimit", model.inputTokenLimit);
  setNumberIfPresent(target, "outputTokenLimit", model.outputTokenLimit);
  setStringIfPresent(target, "description", model.description);
  setStringIfPresent(target, "targetFormat", model.targetFormat);
  setObjectIfPresent(target, "compat", model.compat);
  setObjectIfPresent(target, "capabilities", model.capabilities);
  setObjectIfPresent(target, "capabilityOverrides", model.capabilityOverrides);
  for (const key of IMPORTED_BOOLEAN_KEYS) setBooleanIfPresent(target, key, model[key]);
  setStringArrayIfPresent(target, "unsupportedParams", model.unsupportedParams);
}

function normalizeImportedModel(model: SyncedAvailableModel): ManagedImportedModel {
  const imported: JsonMutableRecord = {
    id: model.id,
    name: model.name || model.id,
    source: "imported",
    apiFormat: toNonEmptyString(model.apiFormat) || "chat-completions",
  };
  copyImportedModelMetadata(imported, model);
  return imported as ManagedImportedModel;
}

function normalizeSupportedEndpoints(value: unknown): string[] {
  if (!Array.isArray(value)) return ["chat"];
  return Array.from(
    new Set(
      value
        .map((endpoint) => toNonEmptyString(endpoint))
        .filter((endpoint): endpoint is string => Boolean(endpoint))
    )
  ).sort();
}

function copyComparableModelMetadata(target: JsonMutableRecord, model: JsonRecord) {
  setNumberIfPresent(target, "inputTokenLimit", model.inputTokenLimit);
  setNumberIfPresent(target, "outputTokenLimit", model.outputTokenLimit);
  setStringIfPresent(target, "description", model.description);
  setStringIfPresent(target, "targetFormat", model.targetFormat);
  setObjectIfPresent(target, "compat", model.compat);
  setObjectIfPresent(target, "capabilities", model.capabilities);
  setObjectIfPresent(target, "capabilityOverrides", model.capabilityOverrides);
  for (const key of IMPORTED_BOOLEAN_KEYS) setBooleanIfPresent(target, key, model[key]);
  setStringArrayIfPresent(target, "unsupportedParams", model.unsupportedParams);
}

function comparableImportedModel(model: JsonRecord | undefined) {
  if (!model) return null;
  const id = toNonEmptyString(model.id) || "";
  const comparable: JsonMutableRecord = {
    id,
    name: toNonEmptyString(model.name) || id,
    source: normalizeManagedSource(model.source),
    apiFormat: toNonEmptyString(model.apiFormat) || "chat-completions",
    supportedEndpoints: normalizeSupportedEndpoints(model.supportedEndpoints),
  };
  copyComparableModelMetadata(comparable, model);
  return comparable;
}

function summarizeImportedChanges(
  previousModels: JsonRecord[],
  nextModels: JsonRecord[],
  importedIds: Set<string>
) {
  let added = 0;
  let updated = 0;
  let unchanged = 0;

  const previousMap = new Map(previousModels.map((model) => [String(model.id), model]));
  const nextMap = new Map(nextModels.map((model) => [String(model.id), model]));

  for (const id of importedIds) {
    const previous = previousMap.get(id);
    const next = nextMap.get(id);
    if (!next) continue;
    if (!previous) {
      added += 1;
      continue;
    }
    if (
      JSON.stringify(comparableImportedModel(previous)) ===
      JSON.stringify(comparableImportedModel(next))
    ) {
      unchanged += 1;
      continue;
    }
    updated += 1;
  }

  return {
    added,
    updated,
    unchanged,
    total: added + updated,
  };
}

function collectAddedImportedModels(
  previousModels: JsonRecord[],
  importedModels: ManagedImportedModel[]
): ManagedImportedModel[] {
  const previousIds = new Set(
    previousModels.map((model) => toNonEmptyString(model.id)).filter(Boolean)
  );
  return importedModels.filter((model) => !previousIds.has(model.id));
}

function assignLegacyThinkingCapability(capabilities: JsonMutableRecord, model: JsonRecord) {
  if (
    Object.prototype.hasOwnProperty.call(model, "supportsThinking") &&
    !Object.prototype.hasOwnProperty.call(model, "supportsReasoning")
  ) {
    capabilities.supportsReasoning = model.supportsThinking;
  }
}

function collectCustomModelCapabilities(model: JsonRecord): JsonMutableRecord {
  const capabilities: Record<string, unknown> = {};

  if (typeof model.inputTokenLimit === "number") {
    capabilities.contextWindow = model.inputTokenLimit;
    capabilities.maxInputTokens = model.inputTokenLimit;
  }
  if (typeof model.outputTokenLimit === "number") {
    capabilities.maxOutputTokens = model.outputTokenLimit;
  }
  assignLegacyThinkingCapability(capabilities, model);
  for (const key of CUSTOM_CAPABILITY_KEYS) {
    if (Object.prototype.hasOwnProperty.call(model, key)) {
      capabilities[key] = model[key];
    }
  }
  if (model.capabilities && typeof model.capabilities === "object") {
    Object.assign(capabilities, model.capabilities);
  }
  if (
    model.capabilityOverrides &&
    typeof model.capabilityOverrides === "object" &&
    !Array.isArray(model.capabilityOverrides)
  ) {
    Object.assign(capabilities, model.capabilityOverrides);
  }
  return capabilities;
}

function assignCustomModelCompatFields(patch: ModelCompatPatch, model: JsonRecord) {
  const compat = asRecord(model.compat);
  if (
    typeof compat.normalizeToolCallId === "boolean" ||
    typeof model.normalizeToolCallId === "boolean"
  ) {
    patch.normalizeToolCallId = Boolean(compat.normalizeToolCallId ?? model.normalizeToolCallId);
  }
  if (
    typeof compat.preserveOpenAIDeveloperRole === "boolean" ||
    typeof model.preserveOpenAIDeveloperRole === "boolean"
  ) {
    patch.preserveOpenAIDeveloperRole = Boolean(
      compat.preserveOpenAIDeveloperRole ?? model.preserveOpenAIDeveloperRole
    );
  }
  if (typeof model.isHidden === "boolean") {
    patch.isHidden = model.isHidden;
  }
  const compatByProtocol = compat.compatByProtocol ?? model.compatByProtocol;
  if (compatByProtocol && typeof compatByProtocol === "object") {
    patch.compatByProtocol = compatByProtocol as ModelCompatPatch["compatByProtocol"];
  }
  const upstreamHeaders = compat.upstreamHeaders ?? model.upstreamHeaders;
  if (upstreamHeaders && typeof upstreamHeaders === "object") {
    patch.upstreamHeaders = upstreamHeaders as Record<string, string>;
  }
  const targetFormat = compat.targetFormat ?? model.targetFormat;
  if (typeof targetFormat === "string") {
    patch.targetFormat = targetFormat;
  }
  const unsupportedParams = compat.unsupportedParams ?? model.unsupportedParams;
  if (Array.isArray(unsupportedParams)) {
    patch.unsupportedParams = unsupportedParams.filter(
      (entry): entry is string => typeof entry === "string"
    );
  }
}

function getCompatPatchFromCustomModel(model: JsonRecord): ModelCompatPatch | null {
  const patch: ModelCompatPatch = {};
  const capabilities = collectCustomModelCapabilities(model);

  assignCustomModelCompatFields(patch, model);
  if (Object.keys(capabilities).length > 0) {
    patch.capabilities = capabilities as ModelCompatPatch["capabilities"];
  }
  return Object.keys(patch).length > 0 ? patch : null;
}

function preserveRemovedCustomModelCompat(providerId: string, removedModels: JsonRecord[]) {
  for (const model of removedModels) {
    const modelId = getModelId(model);
    if (!modelId) continue;
    const patch = getCompatPatchFromCustomModel(model);
    if (!patch) continue;
    mergeModelCompatOverride(providerId, modelId, patch);
  }
}

function splitCustomModelsForImport(previousModels: JsonRecord[]) {
  const nextModelsMap = new Map<string, JsonRecord>();
  const removedCustomModels: JsonRecord[] = [];

  for (const model of previousModels) {
    const modelId = getModelId(model);
    if (!modelId) continue;
    if (isImportedSource(model.source)) {
      removedCustomModels.push(model);
      continue;
    }
    nextModelsMap.set(modelId, model);
  }

  return { nextModelsMap, removedCustomModels };
}

async function replaceRetainedCustomModels(
  providerId: string,
  nextModelsMap: Map<string, JsonRecord>
) {
  return (await replaceCustomModels(
    providerId,
    Array.from(nextModelsMap.values()) as PersistedCustomModelInput[],
    { allowEmpty: true }
  )) as JsonRecord[];
}

async function syncAvailableModelsForConnection(
  providerId: string,
  connectionId: string,
  previousSyncedAvailableModels: SyncedAvailableModel[],
  discoveredModels: SyncedAvailableModel[]
): Promise<SyncedAvailableModel[]> {
  if (discoveredModels.length === 0) return previousSyncedAvailableModels;
  return replaceSyncedAvailableModelsForConnection(providerId, connectionId, discoveredModels);
}

async function pruneSyncedAvailableModelsForActiveConnections(
  providerId: string,
  connectionId: string
) {
  const activeConnections = await getProviderConnections({ provider: providerId, isActive: true });
  const allowedConnectionIds = Array.from(
    new Set([...activeConnections.map((c) => String(c.id)), connectionId])
  );
  await pruneStaleSyncedAvailableModelsForProvider(providerId, allowedConnectionIds);
}

function resolveAntigravityAliasTransitively(name: string, syncedIds: Set<string>): string {
  let current = name;
  const visited = new Set<string>();
  while (current && !visited.has(current)) {
    if (syncedIds.has(current)) return current;
    visited.add(current);
    if (ANTIGRAVITY_MODEL_ALIASES && (ANTIGRAVITY_MODEL_ALIASES as any)[current]) {
      current = (ANTIGRAVITY_MODEL_ALIASES as any)[current];
      continue;
    }
    if (ANTIGRAVITY_REVERSE_MODEL_ALIASES && (ANTIGRAVITY_REVERSE_MODEL_ALIASES as any)[current]) {
      current = (ANTIGRAVITY_REVERSE_MODEL_ALIASES as any)[current];
      continue;
    }
    break;
  }
  return current;
}

function collectAntigravityAliasCandidates(syncedIds: Set<string>): Set<string> {
  const candidates = new Set<string>(syncedIds);
  for (const [key, value] of Object.entries(ANTIGRAVITY_MODEL_ALIASES || {})) {
    candidates.add(key);
    candidates.add(value);
  }
  for (const [key, value] of Object.entries(ANTIGRAVITY_REVERSE_MODEL_ALIASES || {})) {
    candidates.add(key);
    candidates.add(value);
  }
  return candidates;
}

function buildAntigravityMitmMappings(
  candidates: Set<string>,
  syncedIds: Set<string>
): Record<string, string> {
  const mappings: Record<string, string> = {};
  for (const alias of candidates) {
    const resolvedId = resolveAntigravityAliasTransitively(alias, syncedIds);
    if (syncedIds.has(resolvedId)) mappings[alias] = `antigravity/${resolvedId}`;
  }
  return mappings;
}

async function syncAntigravityMitmAliases(providerId: string) {
  if (providerId !== "antigravity") return;
  const allAntigravityModels = await getSyncedAvailableModels("antigravity");
  const syncedIds = new Set(allAntigravityModels.map((m) => m.id).filter(Boolean) as string[]);
  const candidates = collectAntigravityAliasCandidates(syncedIds);
  await setMitmAliasAll("antigravity", buildAntigravityMitmMappings(candidates, syncedIds));
}

async function syncManagedAliasesForImport(
  providerId: string,
  mode: ManagedModelImportMode,
  discoveredModels: SyncedAvailableModel[],
  syncedAvailableModels: SyncedAvailableModel[]
): Promise<number> {
  if (!usesManagedAvailableModels(providerId)) return 0;
  if (mode !== "merge" && discoveredModels.length === 0) return 0;
  const aliasModelIds = mode === "sync" ? syncedAvailableModels : discoveredModels;
  const assignableIds = aliasModelIds
    .map((model) => model.id)
    .filter((id) => !getModelIsHidden(providerId, id));
  const aliasSync = await syncManagedAvailableModelAliases(providerId, assignableIds, {
    pruneMissing: mode === "sync",
  });
  return aliasSync.assignedAliases.length;
}

export async function importManagedModels({
  providerId,
  connectionId,
  fetchedModels,
  mode,
  previousSyncedAvailableModels: previousSyncedAvailableModelsInput,
}: {
  providerId: string;
  connectionId: string;
  fetchedModels: unknown;
  mode: ManagedModelImportMode;
  previousSyncedAvailableModels?: SyncedAvailableModel[];
}) {
  const previousModels = (await getCustomModels(providerId)) as JsonRecord[];
  const previousSyncedAvailableModels =
    previousSyncedAvailableModelsInput ??
    (await getSyncedAvailableModelsForConnection(providerId, connectionId));
  const discoveredModels = normalizeDiscoveredModels(fetchedModels);
  const candidateImportedModels = normalizeImportedModels(fetchedModels);
  const importedIds = new Set(candidateImportedModels.map((model) => model.id));

  let persistedModels = previousModels;
  if (discoveredModels.length > 0) {
    const { nextModelsMap, removedCustomModels } = splitCustomModelsForImport(previousModels);
    persistedModels = await replaceRetainedCustomModels(providerId, nextModelsMap);
    preserveRemovedCustomModelCompat(providerId, removedCustomModels);
  }

  const syncedAvailableModels = await syncAvailableModelsForConnection(
    providerId,
    connectionId,
    previousSyncedAvailableModels,
    discoveredModels
  );
  await pruneSyncedAvailableModelsForActiveConnections(providerId, connectionId);
  await syncAntigravityMitmAliases(providerId);
  const syncedAliases = await syncManagedAliasesForImport(
    providerId,
    mode,
    discoveredModels,
    syncedAvailableModels
  );

  const importedChanges = summarizeImportedChanges(
    previousSyncedAvailableModels as JsonRecord[],
    discoveredModels as JsonRecord[],
    importedIds
  );
  const importedModels = collectAddedImportedModels(
    previousSyncedAvailableModels as JsonRecord[],
    candidateImportedModels
  );

  return {
    previousModels,
    previousSyncedAvailableModels,
    persistedModels,
    importedModels,
    discoveredModels,
    syncedAvailableModels,
    syncedAliases,
    importedChanges,
  };
}
