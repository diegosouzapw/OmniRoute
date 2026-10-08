import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const yApiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "y-api",
  alias: "y-api",
  baseUrl: "https://api.y-api.bestvirtualgoods.com/v1/chat/completions",
  modelsUrl: "https://api.y-api.bestvirtualgoods.com/v1/models",
  models: [],
  passthroughModels: true,
});
