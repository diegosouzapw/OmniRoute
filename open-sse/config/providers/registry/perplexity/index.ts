import type { RegistryEntry } from "../../shared.ts";

export const perplexityProvider: RegistryEntry = {
  id: "perplexity",
  alias: "pplx",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.perplexity.ai/chat/completions",
  // `/v1/models` lists the Agent API catalog, so use it for key validation only.
  testKeyModelsUrl: "https://api.perplexity.ai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "sonar-deep-research", name: "Sonar Deep Research" },
    { id: "sonar-reasoning-pro", name: "Sonar Reasoning Pro" },
    { id: "sonar-pro", name: "Sonar Pro" },
    { id: "sonar", name: "Sonar" },
  ],
};
