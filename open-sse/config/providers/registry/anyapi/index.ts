import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const anyapiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "anyapi",
  alias: "anyapi",
  baseUrl: "https://api.anyapi.ai/v1/chat/completions",
  modelsUrl: "https://api.anyapi.ai/v1/models",
  models: [],
  passthroughModels: true,
});
