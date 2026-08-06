import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const poixeAiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "poixe-ai",
  alias: "poixe-ai",
  baseUrl: "https://api.poixe.com/v1/chat/completions",
  modelsUrl: "https://api.poixe.com/v1/models",
  models: [],
  passthroughModels: true,
});
