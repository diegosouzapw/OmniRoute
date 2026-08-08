import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const freeAiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "free-ai",
  alias: "free-ai",
  baseUrl: "https://api.free.ai/v1/chat/",
  modelsUrl: "https://api.free.ai/v1/models",
  models: [],
  passthroughModels: true,
});
