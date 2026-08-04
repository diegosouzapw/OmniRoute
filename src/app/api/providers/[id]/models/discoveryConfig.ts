import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import type { ProviderModelsConfigEntry } from "./discovery/providerModelsConfig";

const DISCOVERY_EXCLUDED_MODEL_IDS: Readonly<Record<string, ReadonlySet<string>>> = {
  "github-models": new Set([
    "meta/llama-3.2-11b-vision-instruct",
    "meta/llama-3.2-90b-vision-instruct",
  ]),
};

function parseRegistryModelsResponse(provider: string, data: unknown): unknown[] {
  const response = data as { data?: unknown; models?: unknown } | null;
  const models = Array.isArray(data)
    ? data
    : Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.models)
        ? response.models
        : [];
  const excludedIds = DISCOVERY_EXCLUDED_MODEL_IDS[provider];

  if (!excludedIds) return models;

  return models.filter((model) => {
    if (!model || typeof model !== "object" || !("id" in model)) return true;
    const id = (model as { id?: unknown }).id;
    return typeof id !== "string" || !excludedIds.has(id.toLowerCase());
  });
}

/**
 * Derive a models-discovery config from the provider's registry `modelsUrl`
 * when the provider is absent from the hardcoded PROVIDER_MODELS_CONFIG.
 *
 * Returns a config object with Bearer auth suitable for fetching an
 * OpenAI-compatible `/v1/models` endpoint, or `undefined` when the
 * registry entry has no `modelsUrl`.
 */
export function deriveConfigFromRegistryModelsUrl(
  provider: string
): ProviderModelsConfigEntry | undefined {
  const entry = getRegistryEntry(provider);
  if (typeof entry?.modelsUrl === "string" && entry.modelsUrl.length > 0) {
    return {
      url: entry.modelsUrl,
      method: "GET",
      authHeader: "Authorization",
      authPrefix: "Bearer ",
      headers: { "Content-Type": "application/json" },
      parseResponse: (data) => parseRegistryModelsResponse(provider, data),
    };
  }
  return undefined;
}
