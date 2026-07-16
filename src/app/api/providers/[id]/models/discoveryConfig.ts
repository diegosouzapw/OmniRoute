import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import type { ProviderModelsConfigEntry } from "./discovery/providerModelsConfig";

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
      parseResponse: (data) => data.data || data.models || [],
    };
  }
  return undefined;
}
