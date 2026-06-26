import type { RegistryEntry } from "../../shared.ts";

export const perplexityProvider: RegistryEntry = {
  id: "perplexity",
  alias: "pplx",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.perplexity.ai/chat/completions",
  // Perplexity deprecated the unversioned `/models` endpoint (returns 404), so
  // pin an explicit `modelsUrl` here. Without it, validateOpenAILikeProvider
  // (src/lib/providers/validation.ts) derives `<baseUrl>/models` via
  // addModelsSuffix and probes the dead endpoint, misclassifying valid keys.
  modelsUrl: "https://api.perplexity.ai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "sonar-deep-research", name: "Sonar Deep Research" },
    { id: "sonar-reasoning-pro", name: "Sonar Reasoning Pro" },
    { id: "sonar-pro", name: "Sonar Pro" },
    { id: "sonar", name: "Sonar" },
  ],
};
