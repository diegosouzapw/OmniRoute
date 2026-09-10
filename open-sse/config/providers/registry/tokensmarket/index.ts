import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Token Market — OpenAI-compatible multi-model API gateway.
 *
 * Models are discovered from the authenticated `/v1/models` endpoint so the
 * catalog can evolve without requiring a new OmniRoute release.
 */
export const tokensmarketProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "tokensmarket",
  alias: "tokensmarket",
  baseUrl: "https://api.tokensmarket.ai/v1/chat/completions",
  modelsUrl: "https://api.tokensmarket.ai/v1/models",
  models: [],
  passthroughModels: true,
});
