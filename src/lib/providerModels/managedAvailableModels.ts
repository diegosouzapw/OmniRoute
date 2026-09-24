import {
  deleteModelAlias,
  getManagedModelAliasNames,
  getModelAliases,
  getModelIsHidden,
  markManagedModelAlias,
  setModelAlias,
} from "@/lib/db/models";
import { getProviderNodeById } from "@/lib/db/providers";
import {
  getProviderAlias,
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";
import { resolveManagedModelAlias } from "@/shared/utils/providerModelAliases";

function isCompatibleProvider(providerId: string): boolean {
  return isOpenAICompatibleProvider(providerId) || isAnthropicCompatibleProvider(providerId);
}

export function usesManagedAvailableModels(providerId: string): boolean {
  return providerId === "openrouter" || isCompatibleProvider(providerId);
}

function getProviderStoragePrefix(providerId: string): string {
  if (isCompatibleProvider(providerId)) return providerId;
  return getProviderAlias(providerId) || providerId;
}

async function getProviderDisplayPrefix(providerId: string): Promise<string> {
  if (!isCompatibleProvider(providerId)) {
    return getProviderAlias(providerId) || providerId;
  }

  const providerNode = await getProviderNodeById(providerId);
  const prefix = providerNode?.prefix;
  return typeof prefix === "string" && prefix.trim().length > 0 ? prefix.trim() : providerId;
}

function normalizeModelIds(modelIds: string[]): string[] {
  return Array.from(
    new Set(
      modelIds.map((modelId) => (typeof modelId === "string" ? modelId.trim() : "")).filter(Boolean)
    )
  );
}

function getManagedFullModelSet(providerId: string, modelIds: string[]): Set<string> {
  const storagePrefix = getProviderStoragePrefix(providerId);
  return new Set(normalizeModelIds(modelIds).map((modelId) => `${storagePrefix}/${modelId}`));
}

export async function deleteManagedAvailableModelAliases(
  providerId: string,
  modelIds: string[]
): Promise<string[]> {
  if (!usesManagedAvailableModels(providerId)) return [];

  const targetFullModels = getManagedFullModelSet(providerId, modelIds);
  if (targetFullModels.size === 0) return [];

  const existingAliasesRaw = await getModelAliases();
  const removedAliases: string[] = [];

  for (const [alias, value] of Object.entries(existingAliasesRaw)) {
    if (typeof value !== "string" || !targetFullModels.has(value)) continue;
    await deleteModelAlias(alias);
    removedAliases.push(alias);
  }

  return removedAliases;
}

export async function deleteManagedAvailableModelAliasesForProvider(
  providerId: string
): Promise<string[]> {
  if (!usesManagedAvailableModels(providerId)) return [];

  const storagePrefix = getProviderStoragePrefix(providerId);
  const existingAliasesRaw = await getModelAliases();
  const removedAliases: string[] = [];

  for (const [alias, value] of Object.entries(existingAliasesRaw)) {
    if (typeof value !== "string" || !value.startsWith(`${storagePrefix}/`)) continue;
    await deleteModelAlias(alias);
    removedAliases.push(alias);
  }

  return removedAliases;
}

type AliasSyncState = {
  workingAliases: Record<string, string>;
  managedAliasNames: Set<string>;
  removedAliases: string[];
};

// Deletes one managed alias and keeps the in-memory sync state (workingAliases,
// managedAliasNames, removedAliases) consistent with the deletion.
async function dropManagedAlias(state: AliasSyncState, alias: string): Promise<void> {
  await deleteModelAlias(alias);
  delete state.workingAliases[alias];
  state.managedAliasNames.delete(alias);
  state.removedAliases.push(alias);
}

// Prune pass (#11836): only alias names OmniRoute itself generated/adopted
// (`managedAliasNames`) are eligible for deletion here — a hand-created custom alias that
// happens to already point at a model's full id must never be deleted just because that
// model transiently drops out of the sync's target set.
async function pruneMissingManagedAliases(
  state: AliasSyncState,
  storagePrefix: string,
  targetFullModels: Set<string>
): Promise<void> {
  for (const [alias, value] of Object.entries(state.workingAliases)) {
    if (!state.managedAliasNames.has(alias)) continue;
    if (!value.startsWith(`${storagePrefix}/`)) continue;
    if (targetFullModels.has(value)) continue;

    await dropManagedAlias(state, alias);
  }
}

// A hidden model keeps no managed alias — drop any managed alias still pointing at it.
async function pruneHiddenModelAliases(state: AliasSyncState, fullModel: string): Promise<void> {
  for (const [alias, value] of Object.entries(state.workingAliases)) {
    if (value !== fullModel || !state.managedAliasNames.has(alias)) continue;
    await dropManagedAlias(state, alias);
  }
}

// Assigns (or adopts) the alias for one visible model. Only an alias OmniRoute itself
// writes here is eligible for the prune passes above (#11836) — an alias that already
// carries the right value (whether it is a genuinely managed alias from a prior sync, or a
// hand-created custom alias that happens to coincide with `fullModel`) is left exactly
// as-is and its provenance is never changed.
async function assignManagedAlias(
  state: AliasSyncState,
  modelId: string,
  fullModel: string,
  displayPrefix: string
): Promise<string | null> {
  const alias = resolveManagedModelAlias({
    modelId,
    fullModel,
    providerDisplayAlias: displayPrefix,
    existingAliases: state.workingAliases,
  });

  if (!alias) return null;

  if (state.workingAliases[alias] !== fullModel) {
    await setModelAlias(alias, fullModel);
    state.workingAliases[alias] = fullModel;
    if (!state.managedAliasNames.has(alias)) {
      await markManagedModelAlias(alias);
      state.managedAliasNames.add(alias);
    }
  }

  return alias;
}

export async function syncManagedAvailableModelAliases(
  providerId: string,
  modelIds: string[],
  { pruneMissing = true }: { pruneMissing?: boolean } = {}
) {
  if (!usesManagedAvailableModels(providerId)) {
    return {
      assignedAliases: [],
      removedAliases: [],
      storagePrefix: getProviderStoragePrefix(providerId),
    };
  }

  const storagePrefix = getProviderStoragePrefix(providerId);
  const displayPrefix = await getProviderDisplayPrefix(providerId);
  const existingAliasesRaw = await getModelAliases();
  const state: AliasSyncState = {
    workingAliases: Object.fromEntries(
      Object.entries(existingAliasesRaw).filter((entry): entry is [string, string] => {
        const [, value] = entry;
        return typeof value === "string";
      })
    ),
    // Provenance marker (#11836): only alias names OmniRoute itself generated/adopted are
    // eligible for the prune passes below — a hand-created custom alias that happens to
    // already point at a model's full id must never be deleted just because that model
    // transiently drops out of the sync's target set.
    managedAliasNames: await getManagedModelAliasNames(),
    removedAliases: [],
  };

  const targetModelIds = normalizeModelIds(modelIds);
  const targetFullModels = new Set(targetModelIds.map((modelId) => `${storagePrefix}/${modelId}`));

  if (pruneMissing) {
    await pruneMissingManagedAliases(state, storagePrefix, targetFullModels);
  }

  const assignedAliases: string[] = [];

  for (const modelId of targetModelIds) {
    const fullModel = `${storagePrefix}/${modelId}`;

    if (getModelIsHidden(providerId, modelId)) {
      await pruneHiddenModelAliases(state, fullModel);
      continue;
    }

    const alias = await assignManagedAlias(state, modelId, fullModel, displayPrefix);
    if (alias) assignedAliases.push(alias);
  }

  return {
    assignedAliases,
    removedAliases: state.removedAliases,
    storagePrefix,
  };
}
