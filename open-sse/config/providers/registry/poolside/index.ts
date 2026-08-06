import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const poolsideProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "poolside",
  alias: "poolside",
  baseUrl: "https://inference.poolside.ai/v1/chat/completions",
  modelsUrl: "https://inference.poolside.ai/v1/models",
  models: [],
  passthroughModels: true,
});
