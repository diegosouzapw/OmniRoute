import { isComboNameAllowedForKey, type ApiKeyMetadata } from "@/shared/utils/apiKeyPolicy";

type CatalogKeyFilterDeps = {
  isModelAllowedForKey: (key: string, modelId: string) => Promise<boolean>;
  isModelBlockedByPatterns: (
    blockedModels: string[] | null | undefined,
    modelId: string
  ) => Promise<boolean>;
};

/**
 * Decide whether a provider-model catalog row is visible to a restricted API key.
 *
 * The row's `id` is the authoritative identifier. Its `root` is also consulted so a
 * bare allowlist entry (e.g. `gpt-4o`) keeps matching `openai/gpt-4o` (#781) — but
 * only when the root is bare. `root` is a raw upstream string with no owning-provider
 * namespace: an aggregator row such as `cline/deepseek/deepseek-v4-flash` carries
 * `root = deepseek/deepseek-v4-flash`, which the permission check would read as the
 * deepseek provider's model and list for a key that never allowed cline (#15409).
 * A row whose `id` is blocked is never brought back through its root.
 */
export async function isCatalogModelAllowedForKey(
  apiKey: string,
  model: { id?: unknown; root?: unknown },
  blockedModels: string[] | null | undefined,
  deps?: CatalogKeyFilterDeps
): Promise<boolean> {
  deps ??= await import("@/lib/db/apiKeys");
  const id = typeof model.id === "string" ? model.id : "";
  if (await deps.isModelAllowedForKey(apiKey, id)) return true;

  const root = typeof model.root === "string" ? model.root : "";
  if (!root || root === id || root.includes("/")) return false;
  if (await deps.isModelBlockedByPatterns(blockedModels, id)) return false;
  return deps.isModelAllowedForKey(apiKey, root);
}

/** Filter the ordered catalog using one permission module and the builder's yield cadence. */
export async function filterCatalogModelsForKey<
  T extends { id?: unknown; root?: unknown; owned_by?: unknown },
>(
  apiKey: string,
  models: T[],
  keyMeta: Pick<ApiKeyMetadata, "catalogScope" | "allowedCombos" | "blockedModels">,
  deps: CatalogKeyFilterDeps,
  maybeYieldCatalogBuild: () => Promise<void>
): Promise<T[]> {
  // Per-key catalog scope: `combos` advertises only combo rows, `models`
  // only provider models, `all` (the default) both. This is a listing
  // preference, not an access control — dispatch is unaffected either way.
  const catalogScope = keyMeta.catalogScope ?? "all";
  const filtered: T[] = [];
  for (const m of models) {
    // Awaiting cached permission Promises alone does not let timers or
    // unrelated requests run. Share the catalog's cooperative cadence.
    await maybeYieldCatalogBuild();
    const isComboRow = m.owned_by === "combo";
    if (catalogScope === "combos" && !isComboRow) continue;
    if (catalogScope === "models" && isComboRow) continue;
    // A combo is gated by `allowedCombos`, not by the model allow/deny lists:
    // those govern provider models. Without this branch a `restricted` key with
    // an empty `allowedModels` gets an EMPTY catalog even though every combo in
    // its `allowedCombos` dispatches fine — the catalog contradicted the key.
    // Listing a combo the key can already dispatch grants no new access.
    // auto/* rows are exempt: they fail open at dispatch (they resolve to no
    // stored combo), and `allowAutoCombos` already gated their synthesis above.
    if (m.owned_by === "combo" && !String(m.id).startsWith("auto/")) {
      if (isComboNameAllowedForKey(keyMeta.allowedCombos, String(m.id))) {
        filtered.push(m);
      }
      continue;
    }
    // m.id decides; a bare m.root also matches a bare allowlist entry (#781, #15409).
    if (await isCatalogModelAllowedForKey(apiKey, m, keyMeta.blockedModels, deps)) {
      filtered.push(m);
    }
  }
  return filtered;
}
