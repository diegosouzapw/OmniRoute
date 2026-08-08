import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const zerolimitaiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "zerolimitai",
  alias: "zerolimitai",
  baseUrl: "https://www.zerolimitai.com/api/v1/chat/completions",
  modelsUrl: "https://www.zerolimitai.com/api/v1/models",
  models: [],
  passthroughModels: true,
});
