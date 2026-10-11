import { getHiddenModelsByProvider } from "../../../src/lib/db/models";
import { parseModel } from "../model.ts";
import { createHiddenModelLookup } from "../../../src/lib/hiddenModelLookup";
import type { HiddenModelsByProvider } from "./types.ts";

// Snapshots are readonly and scoped to an invocation; WeakMap adds no TTL or stale DB cache.
const lookups = new WeakMap<HiddenModelsByProvider, ReturnType<typeof createHiddenModelLookup>>();

export function isComboModelVisible(
  modelStr: string,
  providerId: string | null = null,
  hiddenModelsByProvider: HiddenModelsByProvider = getHiddenModelsByProvider()
): boolean {
  const parsed = parseModel(modelStr);
  const hasExplicitProvider =
    providerId && providerId !== parsed.provider && providerId !== parsed.providerAlias;
  const rawModel = hasExplicitProvider ? modelStr : parsed.model || modelStr;
  let isHidden = lookups.get(hiddenModelsByProvider);
  if (!isHidden) {
    isHidden = createHiddenModelLookup(hiddenModelsByProvider);
    lookups.set(hiddenModelsByProvider, isHidden);
  }
  return !isHidden(providerId || parsed.provider || parsed.providerAlias, rawModel);
}
