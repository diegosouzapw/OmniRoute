import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const greenptProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "greenpt",
  alias: "greenpt",
  baseUrl: "https://api.greenpt.ai/v1/chat/completions",
  modelsUrl: "https://api.greenpt.ai/v1/models",
  models: [],
  passthroughModels: true,
});
