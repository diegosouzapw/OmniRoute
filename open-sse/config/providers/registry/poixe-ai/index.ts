import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const poixeAiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "poixe-ai",
  alias: "poixe-ai",
  baseUrl: "https://api.poixe.com/v1/chat/completions",
  modelsUrl: "https://api.poixe.com/v1/models",
  models: [],
  passthroughModels: true,
  // Discovery omits call-time billing aliases such as qwen3-32b:free (#12765).
  liveCatalogAuthoritative: false,
});
