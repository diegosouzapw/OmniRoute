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

export type ManagedModelImportMode = "merge" | "sync";

export type ManagedImportedModel = {
  id: string;
  name: string;
  source: "imported";
  apiFormat: string;
  targetFormat?: string;
  upstreamProtocol?: string;
  supportedEndpoints?: string[];
  supportedThinkingEfforts?: string[];
  defaultThinkingEffort?: string;
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  description?: string;
  supportsThinking?: boolean;
  alwaysThinking?: boolean;
  supportsTools?: boolean;
  supportsVideo?: boolean;
};

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

function copyImportedModelMetadata(target: ManagedImportedModel, model: JsonRecord): void {
  if (toNonEmptyString(model.targetFormat)) target.targetFormat = model.targetFormat as string;
  if (toNonEmptyString(model.upstreamProtocol)) {
    target.upstreamProtocol = model.upstreamProtocol as string;
  }
  if (Array.isArray(model.supportedEndpoints) && model.supportedEndpoints.length > 0) {
    target.supportedEndpoints = model.supportedEndpoints as string[];
  }
  if (Array.isArray(model.supportedThinkingEfforts) && model.supportedThinkingEfforts.length > 0) {
    target.supportedThinkingEfforts = model.supportedThinkingEfforts as string[];
  }
  if (toNonEmptyString(model.defaultThinkingEffort)) {
    target.defaultThinkingEffort = model.defaultThinkingEffort as string;
  }
  if (typeof model.inputTokenLimit === "number") target.inputTokenLimit = model.inputTokenLimit;
  if (typeof model.outputTokenLimit === "number") {
    target.outputTokenLimit = model.outputTokenLimit;
  }
  if (typeof model.description === "string") target.description = model.description;
  if (typeof model.supportsThinking === "boolean") {
    target.supportsThinking = model.supportsThinking;
  }
  if (model.alwaysThinking === true) target.alwaysThinking = true;
  if (typeof model.supportsTools === "boolean") target.supportsTools = model.supportsTools;
  if (typeof model.supportsVideo === "boolean") target.supportsVideo = model.supportsVideo;
}

function normalizeImportedModel(model: JsonRecord): ManagedImportedModel {
  const normalized: ManagedImportedModel = {
    id: model.id as string,
    name: (model.name as string) || (model.id as string),
    source: "imported",
    apiFormat: toNonEmptyString(model.apiFormat) || "chat-completions",
  };
  copyImportedModelMetadata(normalized, model);
  return normalized;
}

function normalizeImportedModels(fetchedModels: unknown): ManagedImportedModel[] {
  const discovered = normalizeDiscoveredModels(fetchedModels);
  return discovered.map((model) => normalizeImportedModel(model as JsonRecord));
}

function isImportedSource(source: unknown): boolean {
  return normalizeManagedSource(source) === "imported";
}

function getModelId(model: JsonRecord): string | null {
  return toNonEmptyString(model.id);
}

function copyComparableModelMetadata(target: JsonRecord, model: JsonRecord): void {
  if (toNonEmptyString(model.targetFormat)) target.targetFormat = model.targetFormat;
  if (toNonEmptyString(model.upstreamProtocol)) target.upstreamProtocol = model.upstreamProtocol;
  if (Array.isArray(model.supportedThinkingEfforts)) {
    target.supportedThinkingEfforts = model.supportedThinkingEfforts;
  }
  if (toNonEmptyString(model.defaultThinkingEffort)) {
    target.defaultThinkingEffort = model.defaultThinkingEffort;
  }
  if (typeof model.inputTokenLimit === "number") target.inputTokenLimit = model.inputTokenLimit;
  if (typeof model.outputTokenLimit === "number") {
    target.outputTokenLimit = model.outputTokenLimit;
  }
  if (typeof model.description === "string") target.description = model.description;
  if (typeof model.supportsThinking === "boolean") {
    target.supportsThinking = model.supportsThinking;
  }
  if (model.alwaysThinking === true) target.alwaysThinking = true;
  if (typeof model.supportsTools === "boolean") target.supportsTools = model.supportsTools;
  if (typeof model.supportsVideo === "boolean") target.supportsVideo = model.supportsVideo;
}

function toComparableManagedModel(model: JsonRecord | undefined): JsonRecord | null {
  if (!model) return null;
  const id = toNonEmptyString(model.id) || "";
  const supportedEndpoints = Array.isArray(model.supportedEndpoints)
    ? Array.from(
        new Set(
          model.supportedEndpoints
            .map((endpoint) => toNonEmptyString(endpoint))
            .filter((endpoint): endpoint is string => Boolean(endpoint))
        )
      ).sort()
    : ["chat"];
  const comparable: JsonRecord = {
    id,
    name: toNonEmptyString(model.name) || id,
    source: normalizeManagedSource(model.source),
    apiFormat: toNonEmptyString(model.apiFormat) || "chat-completions",
    supportedEndpoints,
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
      JSON.stringify(toComparableManagedModel(previous)) ===
      JSON.stringify(toComparableManagedModel(next))
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

function getCompatPatchFromCustomModel(model: JsonRecord): ModelCompatPatch | null {
  const patch: ModelCompatPatch = {};

  if (typeof model.normalizeToolCallId === "boolean") {
    patch.normalizeToolCallId = model.normalizeToolCallId;
  }
  if (typeof model.preserveOpenAIDeveloperRole === "boolean") {
    patch.preserveOpenAIDeveloperRole = model.preserveOpenAIDeveloperRole;
  }
  if (typeof model.isHidden === "boolean") {
    patch.isHidden = model.isHidden;
  }
  if (model.compatByProtocol && typeof model.compatByProtocol === "object") {
    patch.compatByProtocol = model.compatByProtocol as ModelCompatPatch["compatByProtocol"];
  }
  if (model.upstreamHeaders && typeof model.upstreamHeaders === "object") {
    patch.upstreamHeaders = model.upstreamHeaders as Record<string, string>;
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
  const discoveredIds = new Set(discoveredModels.map((model) => model.id));

  const nextModelsMap = new Map<string, JsonRecord>();
  const removedCustomModels: JsonRecord[] = [];

  for (const model of previousModels) {
    const modelId = getModelId(model);
    if (!modelId) continue;
    if (isImportedSource(model.source) || discoveredIds.has(modelId)) {
      removedCustomModels.push(model);
      continue;
    }
    nextModelsMap.set(modelId, model);
  }

  const persistedModels = (await replaceCustomModels(
    providerId,
    Array.from(nextModelsMap.values()) as Array<{
      id: string;
      name?: string;
      source?: string;
      apiFormat?: string;
      targetFormat?: string;
      upstreamProtocol?: string;
      supportedEndpoints?: string[];
      supportedThinkingEfforts?: string[];
      defaultThinkingEffort?: string;
      inputTokenLimit?: number;
      outputTokenLimit?: number;
      description?: string;
      supportsThinking?: boolean;
      alwaysThinking?: boolean;
      supportsTools?: boolean;
      supportsVideo?: boolean;
    }>,
    { allowEmpty: true }
  )) as JsonRecord[];
  preserveRemovedCustomModelCompat(providerId, removedCustomModels);

  let syncedAvailableModels: SyncedAvailableModel[] = previousSyncedAvailableModels;
  if (discoveredModels.length > 0) {
    syncedAvailableModels = await replaceSyncedAvailableModelsForConnection(
      providerId,
      connectionId,
      discoveredModels
    );
  }

  // Prune stale/inactive connection caches for this provider
  const activeConnections = await getProviderConnections({ provider: providerId, isActive: true });
  const allowedConnectionIds = Array.from(
    new Set([...activeConnections.map((c) => String(c.id)), connectionId])
  );
  await pruneStaleSyncedAvailableModelsForProvider(providerId, allowedConnectionIds);

  // If this is the "antigravity" provider, dynamically regenerate and persist the mitmAlias mapping for "antigravity"
  if (providerId === "antigravity") {
    const allAntigravityModels = await getSyncedAvailableModels("antigravity");
    const syncedIds = new Set(allAntigravityModels.map((m) => m.id).filter(Boolean) as string[]);

    // Transitive/recursive resolution helper
    const resolveTransitively = (name: string): string => {
      let current = name;
      const visited = new Set<string>();
      while (current && !visited.has(current)) {
        if (syncedIds.has(current)) {
          return current;
        }
        visited.add(current);
        if (ANTIGRAVITY_MODEL_ALIASES && (ANTIGRAVITY_MODEL_ALIASES as any)[current]) {
          current = (ANTIGRAVITY_MODEL_ALIASES as any)[current];
          continue;
        }
        if (
          ANTIGRAVITY_REVERSE_MODEL_ALIASES &&
          (ANTIGRAVITY_REVERSE_MODEL_ALIASES as any)[current]
        ) {
          current = (ANTIGRAVITY_REVERSE_MODEL_ALIASES as any)[current];
          continue;
        }
        break;
      }
      return current;
    };

    // Gather all candidate alias names to check
    const candidates = new Set<string>();
    for (const id of syncedIds) {
      candidates.add(id);
    }
    for (const [k, v] of Object.entries(ANTIGRAVITY_MODEL_ALIASES || {})) {
      candidates.add(k);
      candidates.add(v);
    }
    for (const [k, v] of Object.entries(ANTIGRAVITY_REVERSE_MODEL_ALIASES || {})) {
      candidates.add(k);
      candidates.add(v);
    }

    // Build the dynamic mapping dictionary
    const mappings: Record<string, string> = {};
    for (const alias of candidates) {
      const resolvedId = resolveTransitively(alias);
      if (syncedIds.has(resolvedId)) {
        mappings[alias] = `antigravity/${resolvedId}`;
      }
    }

    await setMitmAliasAll("antigravity", mappings);
  }

  let syncedAliases = 0;
  if (usesManagedAvailableModels(providerId) && (mode === "merge" || discoveredModels.length > 0)) {
    const aliasModelIds = mode === "sync" ? syncedAvailableModels : discoveredModels;
    // #3782: eye-hidden models now survive in `syncedAvailableModels` (so they stay
    // listed-but-hidden), but they must NOT be re-assigned a routable managed alias
    // — otherwise auto-sync silently re-enables routing for a model the operator hid.
    // Exclude `isHidden` ids from the alias assignment. `pruneMissing` (sync mode)
    // then drops any stale alias an eye-hidden model previously held.
    const aliasSync = await syncManagedAvailableModelAliases(
      providerId,
      aliasModelIds.map((model) => model.id).filter((id) => !getModelIsHidden(providerId, id)),
      { pruneMissing: mode === "sync" }
    );
    syncedAliases = aliasSync.assignedAliases.length;
  }

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
