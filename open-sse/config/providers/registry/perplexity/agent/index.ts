import type { RegistryEntry } from "../../../shared.ts";

export const perplexityAgentProvider: RegistryEntry = {
  id: "perplexity-agent",
  alias: "pplx-agent",
  format: "openai-responses",
  executor: "default",
  baseUrl: "https://api.perplexity.ai/v1/responses",
  modelsUrl: "https://api.perplexity.ai/v1/models",
  testKeyModelsUrl: "https://api.perplexity.ai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  passthroughModels: true,
  liveCatalogAuthoritative: false,
  models: [
    {
      id: "openai/gpt-5.6-sol",
      name: "GPT-5.6 Sol (Perplexity Agent)",
      supportsReasoning: true,
      toolCalling: true,
    },
    {
      id: "perplexity/kimi-k3",
      name: "Kimi K3 (Perplexity Agent)",
      supportsReasoning: true,
      supportedThinkingEfforts: ["minimal", "low", "medium", "high", "xhigh", "max"],
    },
  ],
};
