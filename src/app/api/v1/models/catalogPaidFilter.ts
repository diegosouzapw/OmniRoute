import { isFreeForProvider } from "@/shared/utils/freeModels";
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
  // #12744 pairs providerHasFreeModels with isFreeModel per id, in isFreeForProvider.
  // ORing the two ids into a single freeProvider flag loosens that: an id whose own
  // provider documents no free tier would still read as free whenever its sibling
  // alias did. Per-id is the guarantee #12744 establishes, so evaluate per id.
  const candidate = { id: modelId, pricing: pricing as never, isFree } as never;
  if (isFreeForProvider(resolved, candidate)) return false;
  if (isFreeForProvider(canonical, candidate)) return false;
  return true;
}
