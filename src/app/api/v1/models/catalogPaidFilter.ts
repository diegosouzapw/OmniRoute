import { isFreeModel, providerHasFreeModels } from "@/shared/utils/freeModels";
import { resolveProviderId } from "@/shared/constants/providers";

/**
 * Pure paid-visibility predicate shared with the `auto/*` pool filter
 * (`open-sse/services/autoCombo/paidModelFilter.ts`): a model stays visible
 * when its provider documents free models AND the model itself qualifies as
 * free — otherwise `hidePaidModels` hides it.
 */
export function decideHidePaid(
  hidePaid: boolean,
  providerKey: string,
  modelId: string,
  pricing?: unknown,
  isFree?: boolean,
  aliasMap?: Record<string, string>
): boolean {
  if (!hidePaid) return false;
  const canonical = aliasMap?.[providerKey] || providerKey;
  let resolved = canonical;
  try {
    resolved = resolveProviderId(canonical);
  } catch {
    resolved = canonical;
  }
  const freeProvider = providerHasFreeModels(resolved) || providerHasFreeModels(canonical);
  if (
    freeProvider &&
    isFreeModel(resolved, { id: modelId, pricing: pricing as never, isFree } as never)
  ) {
    return false;
  }
  if (
    freeProvider &&
    isFreeModel(canonical, { id: modelId, pricing: pricing as never, isFree } as never)
  ) {
    return false;
  }
  return true;
}
