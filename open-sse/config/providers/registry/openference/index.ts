import type { RegistryEntry } from "../../shared.ts";

/**
 * Openference — OpenAI-compatible AI inference gateway (https://openference.com/).
 *
 * OAuth access tokens are ES256 JWTs accepted as Bearer credentials on
 * api.openference.com/v1/*. Live model discovery uses NAMED_OPENAI_STYLE_PROVIDERS;
 * seed models below are the offline fallback when the live fetch fails.
 */
export const openferenceProvider: RegistryEntry = {
  id: "openference",
  alias: "of",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.openference.com/v1/chat/completions",
  responsesBaseUrl: "https://api.openference.com/v1/responses",
  authType: "oauth",
  authHeader: "bearer",
  passthroughModels: true,
  oauth: {
    clientIdDefault: "omniroute",
    tokenUrl: "https://openference.com/oauth/token",
  },
  models: [{ id: "GLM-5.2", name: "GLM 5.2", contextLength: 850000 }],
};
