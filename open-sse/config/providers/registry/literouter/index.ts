import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const literouterProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "literouter",
  alias: "literouter",
  baseUrl: "https://api.literouter.com/v1/chat/completions",
  modelsUrl: "https://api.literouter.com/v1/models",
  models: [],
  passthroughModels: true,
});
