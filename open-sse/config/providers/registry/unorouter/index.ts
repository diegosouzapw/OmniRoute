import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const unorouterProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "unorouter",
  alias: "unorouter",
  baseUrl: "https://api.unorouter.com/v1/chat/completions",
  modelsUrl: "https://api.unorouter.com/v1/models",
  models: [],
  passthroughModels: true,
});
