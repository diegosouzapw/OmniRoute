import {
  getCustomModels,
  getSyncedAvailableModelsForConnection,
  mergeModelCompatOverride,
  replaceCustomModels,
  replaceSyncedAvailableModelsForConnection,
  type ModelCompatPatch,
  type SyncedAvailableModel,
} from "@/lib/db/models";
import {
  syncManagedAvailableModelAliases,
  usesManagedAvailableModels,
} from "@/lib/providerModels/managedAvailableModels";
import { normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";

type JsonRecord = Record<string, unknown>;

export type ManagedModelImportMode = "merge" | "sync";

export type ManagedImportedModel = {
  id: string;
  name: string;
  source: "imported";
  apiFormat: "chat-completions";
  supportedEndpoints?: string[];
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  description?: string;
  supportsThinking?: boolean;
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

function normalizeImportedModels(fetchedModels: unknown): ManagedImportedModel[] {
  const discovered = normalizeDiscoveredModels(fetchedModels);

  return discovered.map((model) => ({
    id: model.id,
    name: model.name || model.id,
    source: "imported",
    apiFormat: "chat-completions",
    ...(Array.isArray(model.supportedEndpoints) && model.supportedEndpoints.length > 0
      ? { supportedEndpoints: model.supportedEndpoints }
      : {}),
    ...(typeof model.inputTokenLimit === "number"
      ? { inputTokenLimit: model.inputTokenLimit }
      : {}),
    ...(typeof model.outputTokenLimit === "number"
      ? { outputTokenLimit: model.outputTokenLimit }
      : {}),
    ...(typeof model.description === "string" ? { description: model.description } : {}),
    ...(model.supportsThinking === true ? { supportsThinking: true } : {}),
  }));
}

function isImportedSource(source: unknown): boolean {
  return normalizeManagedSource(source) === "imported";
}

function getModelId(model: JsonRecord): string | null {
  return toNonEmptyString(model.id);
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

  const toComparable = (model: JsonRecord | undefined) => {
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
    return {
      id,
      name: toNonEmptyString(model.name) || id,
      source: normalizeManagedSource(model.source),
      apiFormat: toNonEmptyString(model.apiFormat) || "chat-completions",
      supportedEndpoints,
      ...(typeof model.inputTokenLimit === "number"
        ? { inputTokenLimit: model.inputTokenLimit }
        : {}),
      ...(typeof model.outputTokenLimit === "number"
        ? { outputTokenLimit: model.outputTokenLimit }
        : {}),
      ...(typeof model.description === "string" ? { description: model.description } : {}),
      ...(model.supportsThinking === true ? { supportsThinking: true } : {}),
    };
  };

  for (const id of importedIds) {
    const previous = previousMap.get(id);
    const next = nextMap.get(id);
    if (!next) continue;
    if (!previous) {
      added += 1;
      continue;
    }
    if (JSON.stringify(toComparable(previous)) === JSON.stringify(toComparable(next))) {
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
      supportedEndpoints?: string[];
      inputTokenLimit?: number;
      outputTokenLimit?: number;
      description?: string;
      supportsThinking?: boolean;
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

  let syncedAliases = 0;
  if (usesManagedAvailableModels(providerId) && (mode === "merge" || discoveredModels.length > 0)) {
    const aliasSync = await syncManagedAvailableModelAliases(
      providerId,
      discoveredModels.map((model) => model.id),
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
