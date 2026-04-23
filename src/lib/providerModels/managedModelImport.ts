import {
  getCustomModels,
  replaceCustomModels,
  replaceSyncedAvailableModelsForConnection,
  type SyncedAvailableModel,
} from "@/lib/db/models";
import {
  syncManagedAvailableModelAliases,
  usesManagedAvailableModels,
} from "@/lib/providerModels/managedAvailableModels";
import { normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";
import { getModelsByProviderId } from "@/shared/constants/models";

type JsonRecord = Record<string, unknown>;

export type ManagedModelImportMode = "merge" | "sync";

export type ManagedImportedModel = {
  id: string;
  name: string;
  source: "api-sync";
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
    return "api-sync";
  }
  return normalized || "manual";
}

function normalizeImportedModels(
  providerId: string,
  fetchedModels: unknown
): ManagedImportedModel[] {
  const discovered = normalizeDiscoveredModels(fetchedModels);
  const registryIds = new Set(getModelsByProviderId(providerId).map((model: any) => model.id));

  return discovered
    .filter((model) => !registryIds.has(model.id))
    .map((model) => ({
      id: model.id,
      name: model.name || model.id,
      source: "api-sync",
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

function isManagedDiscoveredSource(source: unknown): boolean {
  const normalized = toNonEmptyString(source)?.toLowerCase();
  return normalized === "api-sync" || normalized === "auto-sync" || normalized === "imported";
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
    return {
      ...model,
      source: normalizeManagedSource(model.source),
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

export async function importManagedModels({
  providerId,
  connectionId,
  fetchedModels,
  mode,
}: {
  providerId: string;
  connectionId: string;
  fetchedModels: unknown;
  mode: ManagedModelImportMode;
}) {
  const previousModels = (await getCustomModels(providerId)) as JsonRecord[];
  const candidateImportedModels = normalizeImportedModels(providerId, fetchedModels);
  const importedIds = new Set(candidateImportedModels.map((model) => model.id));

  const nextModelsMap = new Map<string, JsonRecord>();

  if (mode === "merge") {
    for (const model of previousModels) {
      if (model?.id) nextModelsMap.set(String(model.id), model);
    }
  } else {
    for (const model of previousModels) {
      if (!model?.id) continue;
      if (isManagedDiscoveredSource(model.source)) continue;
      nextModelsMap.set(String(model.id), model);
    }
  }

  for (const model of candidateImportedModels) {
    nextModelsMap.set(model.id, model);
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
    }>
  )) as JsonRecord[];

  const discoveredModels = normalizeDiscoveredModels(fetchedModels);
  let syncedAvailableModels: SyncedAvailableModel[] = [];
  if (discoveredModels.length > 0) {
    syncedAvailableModels = await replaceSyncedAvailableModelsForConnection(
      providerId,
      connectionId,
      discoveredModels
    );
  }

  let syncedAliases = 0;
  if (usesManagedAvailableModels(providerId)) {
    const aliasSync = await syncManagedAvailableModelAliases(
      providerId,
      mode === "sync"
        ? persistedModels
            .map((model) => toNonEmptyString(model.id))
            .filter((modelId): modelId is string => Boolean(modelId))
        : candidateImportedModels.map((model) => model.id),
      { pruneMissing: mode === "sync" }
    );
    syncedAliases = aliasSync.assignedAliases.length;
  }

  const importedChanges = summarizeImportedChanges(previousModels, persistedModels, importedIds);
  const importedModels = collectAddedImportedModels(previousModels, candidateImportedModels);

  return {
    previousModels,
    persistedModels,
    importedModels,
    discoveredModels,
    syncedAvailableModels,
    syncedAliases,
    importedChanges,
  };
}
