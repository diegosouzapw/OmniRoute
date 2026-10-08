import type { RegistryEntry } from "../../shared.ts";

export const freeaiapikeyProvider: RegistryEntry = {
  id: "freeaiapikey",
  alias: "faik",
  format: "openai",
  executor: "default",
  // 2026-08-13: the apex host answers 410 `endpoint_moved` on every /v1 route and
  // names its own replacement — "Please update your base_url to
  // https://api.freeaiapikey.com/v1". The api. host serves /v1/models (200) and
  // /v1/chat/completions (405 on GET, i.e. POST-only as expected).
  baseUrl: "https://api.freeaiapikey.com/v1/chat/completions",
  modelsUrl: "https://api.freeaiapikey.com/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  // Catalog synced 2026-08-13 against GET https://api.freeaiapikey.com/v1/models (200).
  // That response carries only id/object/created/owned_by — upstream publishes no
  // context window — so models added from it declare no contextLength and inherit
  // `defaultContextLength` above rather than an invented figure. The two pre-existing
  // contextLength values are left exactly as they were: nothing in this sweep confirms
  // or refutes them, and rewriting them would be the same guesswork in reverse.
  models: [
    { id: "openai/gpt-4o", name: "GPT-4o (via FreeAIAPIKey)" },
    { id: "openai/gpt-5.4", name: "GPT-5.4 (via FreeAIAPIKey)" },
    { id: "openai/gpt-5.5", name: "GPT-5.5 (via FreeAIAPIKey)" },
    { id: "openai/gpt-5.6-sol", name: "GPT-5.6 Sol (via FreeAIAPIKey)" },
    {
      id: "anthropic/claude-opus-4.6",
      name: "Claude Opus 4.6 (via FreeAIAPIKey)",
      contextLength: 1000000,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high", "max"],
    },
    { id: "anthropic/claude-opus-4.7", name: "Claude Opus 4.7 (via FreeAIAPIKey)" },
    { id: "anthropic/claude-opus-4.8", name: "Claude Opus 4.8 (via FreeAIAPIKey)" },
    { id: "anthropic/claude-opus-5", name: "Claude Opus 5 (via FreeAIAPIKey)" },
    {
      id: "anthropic/claude-sonnet-4.6",
      name: "Claude Sonnet 4.6 (via FreeAIAPIKey)",
      contextLength: 1000000,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high", "max"],
    },
    { id: "anthropic/claude-sonnet-5", name: "Claude Sonnet 5 (via FreeAIAPIKey)" },
  ],
};
