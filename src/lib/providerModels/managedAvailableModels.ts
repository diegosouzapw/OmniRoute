import {
  deleteModelAlias,
  getModelAliases,
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

export async function syncManagedAvailableModelAliases(
  providerId: string,
  modelIds: string[],
  { pruneMissing = true }: { pruneMissing?: boolean } = {}
) {
  const storagePrefix = getProviderStoragePrefix(providerId);
  const displayPrefix = await getProviderDisplayPrefix(providerId);
  const existingAliasesRaw = await getModelAliases();
  const workingAliases = Object.fromEntries(
    Object.entries(existingAliasesRaw).filter((entry): entry is [string, string] => {
      const [, value] = entry;
      return typeof value === "string";
    })
  );

  const targetModelIds = Array.from(
    new Set(
      modelIds.map((modelId) => (typeof modelId === "string" ? modelId.trim() : "")).filter(Boolean)
    )
  );
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
