import { getHiddenModelsByProvider } from "../../../src/lib/db/models";
import { parseModel, resolveCanonicalProviderModel } from "../model.ts";
import type { HiddenModelsByProvider } from "./types.ts";

export function isComboModelVisible(
  modelStr: string,
  providerId: string | null = null,
  hiddenModelsByProvider: HiddenModelsByProvider = getHiddenModelsByProvider()
): boolean {
  const parsed = parseModel(modelStr);
  const hasExplicitProvider =
    providerId && providerId !== parsed.provider && providerId !== parsed.providerAlias;
  const rawModel = hasExplicitProvider ? modelStr : parsed.model || modelStr;
  const resolved = resolveCanonicalProviderModel(
    providerId || parsed.provider || parsed.providerAlias,
    rawModel
  );
  return (
    !resolved.provider ||
    !resolved.model ||
    !hiddenModelsByProvider.get(resolved.provider)?.has(resolved.model)
  );
}
