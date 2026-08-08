import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const aurikoProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "auriko",
  alias: "auriko",
  baseUrl: "https://api.auriko.ai/v1/chat/completions",
  modelsUrl: "https://api.auriko.ai/v1/models",
  models: [],
  passthroughModels: true,
});
