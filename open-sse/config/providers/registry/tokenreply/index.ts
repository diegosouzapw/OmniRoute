import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const tokenreplyProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "tokenreply",
  alias: "tokenreply",
  baseUrl: "https://api.tokenreply.com/v1/chat/completions",
  modelsUrl: "https://api.tokenreply.com/v1/models",
  models: [],
  passthroughModels: true,
});
