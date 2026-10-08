import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const beatapiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "beatapi",
  alias: "beatapi",
  baseUrl: "https://api.beatapi.io/v1/chat/completions",
  responsesBaseUrl: "https://api.beatapi.io/v1/responses",
  modelsUrl: "https://api.beatapi.io/v1/models",
  models: [],
  passthroughModels: true,
});
