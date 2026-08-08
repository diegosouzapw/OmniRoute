import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const spekaProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "speka",
  alias: "speka",
  baseUrl: "https://speka.me/v1/chat/completions",
  modelsUrl: "https://speka.me/v1/models",
  models: [],
  passthroughModels: true,
});
