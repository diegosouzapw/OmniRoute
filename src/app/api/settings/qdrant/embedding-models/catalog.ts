import {
  EMBEDDING_PROVIDERS,
  type EmbeddingProvider,
} from "@omniroute/open-sse/config/embeddingRegistry.ts";

export type EmbeddingModelOption = {
  value: string;
  label: string;
};

/**
 * Build quick-select options from the curated embedding registry — one option
 * per registered model, provider-prefixed so the value matches what users type
 * elsewhere (e.g. "mistral/mistral-embed"). Providers without curated
 * models (dynamic-only, like lmstudio) contribute nothing.
 */
export function buildRegistryEmbeddingOptions(): EmbeddingModelOption[] {
  const options: EmbeddingModelOption[] = [];
  for (const [providerId, config] of Object.entries(EMBEDDING_PROVIDERS) as Array<
    [string, EmbeddingProvider]
  >) {
    for (const model of config.models) {
      const value = `${providerId}/${model.id}`;
      const dims = typeof model.dimensions === "number" ? `${model.dimensions}d` : "?";
      options.push({ value, label: `${value} - ${model.name} (${dims})` });
    }
  }
  return options;
}

/**
 * Merge heuristic/live-discovered options with registry options: dedupe by
 * `value` (first occurrence wins, so chat-catalog and OpenRouter-live labels
 * keep priority), then sort by value for stable dropdown ordering.
 */
export function mergeEmbeddingOptions(
  existing: EmbeddingModelOption[],
  registry: EmbeddingModelOption[]
): EmbeddingModelOption[] {
  const seen = new Set(existing.map((o) => o.value));
  const merged = [...existing];
  for (const opt of registry) {
    if (!seen.has(opt.value)) {
      seen.add(opt.value);
      merged.push(opt);
    }
  }
  return merged.sort((a, b) => a.value.localeCompare(b.value));
}
