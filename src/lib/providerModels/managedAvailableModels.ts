import {
  deleteModelAlias,
  getModelAliases,
  getModelIsHidden,
  getProviderNodeById,
  setModelAlias,
} from "@/lib/localDb";
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
  const workingAliases = Object.fromEntries(
    Object.entries(existingAliasesRaw).filter((entry): entry is [string, string] => {
      const [, value] = entry;
      return typeof value === "string";
    })
  );

  const targetModelIds = normalizeModelIds(modelIds);
  const targetFullModels = new Set(targetModelIds.map((modelId) => `${storagePrefix}/${modelId}`));
  const removedAliases: string[] = [];

  if (pruneMissing) {
    for (const [alias, value] of Object.entries(workingAliases)) {
      if (!value.startsWith(`${storagePrefix}/`)) continue;
      if (targetFullModels.has(value)) continue;

      await deleteModelAlias(alias);
      delete workingAliases[alias];
      removedAliases.push(alias);
    }
  }

  const assignedAliases: string[] = [];

  for (const modelId of targetModelIds) {
    if (getModelIsHidden(providerId, modelId)) {
      const fullModel = `${storagePrefix}/${modelId}`;
      for (const [alias, value] of Object.entries(workingAliases)) {
        if (value !== fullModel) continue;
        await deleteModelAlias(alias);
        delete workingAliases[alias];
        removedAliases.push(alias);
      }
      continue;
    }

    const fullModel = `${storagePrefix}/${modelId}`;
    const alias = resolveManagedModelAlias({
      modelId,
      fullModel,
      providerDisplayAlias: displayPrefix,
      existingAliases: workingAliases,
    });

    if (!alias) continue;

    if (workingAliases[alias] !== fullModel) {
      await setModelAlias(alias, fullModel);
      workingAliases[alias] = fullModel;
    }

    assignedAliases.push(alias);
  }

  return {
    assignedAliases,
    removedAliases,
    storagePrefix,
  };
}
