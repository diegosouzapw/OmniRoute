import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const fastrouterProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "fastrouter",
  alias: "fastrouter",
  baseUrl: "https://api.fastrouter.ai/api/v1/chat/completions",
  modelsUrl: "https://api.fastrouter.ai/api/v1/models",
  models: [],
  passthroughModels: true,
});
