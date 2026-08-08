import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const electronhubProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "electronhub",
  alias: "electronhub",
  baseUrl: "https://api.electronhub.ai/v1/chat/completions",
  modelsUrl: "https://api.electronhub.ai/v1/models",
  models: [],
  passthroughModels: true,
});
