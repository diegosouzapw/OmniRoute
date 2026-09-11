import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const eurouterProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "eurouter",
  alias: "eurouter",
  baseUrl: "https://api.eurouter.ai/v1/chat/completions",
  modelsUrl: "https://api.eurouter.ai/v1/models",
  models: [],
  passthroughModels: true,
});
