import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Openference API key — OpenAI-compatible gateway (https://openference.com/).
 *
 * Bearer API keys (`sk-…`) hit the same api.openference.com/v1/* surface as OAuth
 * JWTs. Live model discovery uses NAMED_OPENAI_STYLE_PROVIDERS; the seed below is
 * the offline fallback when the live fetch fails.
 */
export const openference_apiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "openference-api",
  alias: "ofa",
  baseUrl: "https://api.openference.com/v1/chat/completions",
  responsesBaseUrl: "https://api.openference.com/v1/responses",
  passthroughModels: true,
  models: [{ id: "GLM-5.2", name: "GLM 5.2", contextLength: 850000 }],
});
