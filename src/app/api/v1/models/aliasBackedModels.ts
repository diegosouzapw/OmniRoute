/**
 * Extract `{providerKey, modelId}` pairs from the `modelAliases` key_value namespace
 * so `/v1/models` can surface models that were registered ONLY through a model alias
 * (e.g. `setModelAlias("kimi-k2.6", "custom/kimi-k2.6")`).
 *
 * Port of upstream decolua/9router PR #730 — kept as a PURE helper so the route can
 * walk the result and merge it into the per-provider catalog without dragging DB or
 * Next-runtime imports into a unit test.
 *
 * Each stored alias value is `"<providerKey>/<modelId>"`. `providerKey` may be either
 * a provider id (e.g. `openai`) or a provider alias / prefix (e.g. `cu`, `custom`);
 * the caller is responsible for resolving that against the active connection map.
 *
 * The split is on the FIRST `/` only — OpenRouter-style ids contain an internal slash
 * (`openrouter/anthropic/claude-3.5-sonnet`) and must keep their full sub-path as the
 * model id.
 */
export interface AliasBackedModel {
  providerKey: string;
  modelId: string;
}

export function extractAliasBackedModels(
  aliases: Record<string, unknown> | null | undefined
): AliasBackedModel[] {
  if (!aliases || typeof aliases !== "object") return [];

  const seen = new Set<string>();
  const out: AliasBackedModel[] = [];

  for (const value of Object.values(aliases)) {
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (trimmed.length === 0) continue;

    const slash = trimmed.indexOf("/");
    if (slash <= 0 || slash === trimmed.length - 1) continue;

    const providerKey = trimmed.slice(0, slash);
    const modelId = trimmed.slice(slash + 1);
    if (!providerKey || !modelId) continue;

    const dedupeKey = `${providerKey}/${modelId}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);
    out.push({ providerKey, modelId });
  }

  return out;
}
