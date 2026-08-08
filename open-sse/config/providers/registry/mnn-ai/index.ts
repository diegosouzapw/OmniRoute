import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const mnnAiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "mnn-ai",
  alias: "mnn-ai",
  baseUrl: "https://api.mnnai.ru/v1/chat/completions",
  modelsUrl: "https://api.mnnai.ru/v1/models",
  models: [],
  passthroughModels: true,
});
