import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const voidAiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "void-ai",
  alias: "void-ai",
  baseUrl: "https://api.voidai.app/v1/chat/completions",
  modelsUrl: "https://api.voidai.app/v1/models",
  responsesBaseUrl: "https://api.voidai.app/v1/responses",
  models: [],
  passthroughModels: true,
});
