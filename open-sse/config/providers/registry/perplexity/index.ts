import type { RegistryEntry } from "../../shared.ts";

export const perplexityProvider: RegistryEntry = {
  id: "perplexity",
  alias: "pplx",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.perplexity.ai/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "sonar-deep-research", name: "Sonar Deep Research" },
    { id: "sonar-reasoning-pro", name: "Sonar Reasoning Pro" },
    { id: "sonar-pro", name: "Sonar Pro" },
    { id: "sonar", name: "Sonar" },
  ],
};
