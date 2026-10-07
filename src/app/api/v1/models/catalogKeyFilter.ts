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
