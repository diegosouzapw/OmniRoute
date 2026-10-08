import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Token Market — OpenAI-compatible multi-model API gateway.
 *
 * Models are discovered from the authenticated `/v1/models` endpoint so the
 * catalog can evolve without requiring a new OmniRoute release.
 */
export const tokenmarketProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "tokenmarket",
  alias: "tokenmarket",
  baseUrl: "https://api.tokensmarket.ai/v1/chat/completions",
  modelsUrl: "https://api.tokensmarket.ai/v1/models",
  models: [],
  passthroughModels: true,
});
