import { getProviderModels } from "../config/providerModels.ts";

const REGISTERED_EFFORT_SUFFIXES = ["none", "low", "medium", "high", "max", "xhigh"] as const;

/**
 * Return the registered base model for an explicit effort variant.
 *
 * Both the exact variant and its base must exist in the provider registry.
 * Callers with an authoritative live catalog must additionally verify that
 * the returned base model is present in that live catalog.
 */
export function getRegisteredProviderEffortBaseModelId(
  providerId: string,
  modelId: string
): string | null {
  const providerModels = getProviderModels(providerId);
  const registeredVariant = providerModels.find((candidate) => candidate.id === modelId);

  if (!registeredVariant) return null;

  for (const effort of REGISTERED_EFFORT_SUFFIXES) {
    const suffix = `-${effort}`;
    if (!modelId.endsWith(suffix)) continue;

    const baseModelId = modelId.slice(0, -suffix.length);

    if (providerModels.some((candidate) => candidate.id === baseModelId)) return baseModelId;

    // Curated providers may intentionally expose only useful variants while the
    // authoritative live catalog exposes their unsuffixed wire model. The registry
    // declaration is the proof; never infer this relationship from spelling alone.
    const declaredLiveBase = registeredVariant.liveCatalogIds?.find(
      (candidate) => candidate === baseModelId || !candidate.endsWith(`-${effort}`)
    );
    return declaredLiveBase ?? null;
  }

  return null;
}

export function isRegisteredProviderEffortVariant(providerId: string, modelId: string): boolean {
  return getRegisteredProviderEffortBaseModelId(providerId, modelId) !== null;
}
