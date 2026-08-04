import type { RegistryEntry } from "../../shared.ts";

export const nubeProvider: RegistryEntry = {
  id: "nube",
  alias: "nube",
  format: "openai",
  executor: "default",
  baseUrl: "https://ai.nube.sh/api/v1/chat/completions",
  modelsUrl: "https://ai.nube.sh/api/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  // Nube.sh is an OpenAI-compatible LiteLLM gateway (BYOK). Its live catalog is only
  // reachable with a valid key (/api/v1/models returns 401 unauthenticated), so we ship
  // no hardcoded model IDs and rely on passthrough + live enumeration via modelsUrl.
  passthroughModels: true,
  models: [],
};
