import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const llmgatewayProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "llmgateway",
  alias: "llmgateway",
  baseUrl: "https://api.llmgateway.io/v1/chat/completions",
  modelsUrl: "https://api.llmgateway.io/v1/models",
  models: [],
  passthroughModels: true,
});
