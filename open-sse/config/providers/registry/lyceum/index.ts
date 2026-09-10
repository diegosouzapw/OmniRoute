import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const lyceumProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "lyceum",
  alias: "lyceum",
  baseUrl: "https://api.lyceum.technology/openai/v1/chat/completions",
  modelsUrl: "https://api.lyceum.technology/openai/v1/models",
  models: [],
  passthroughModels: true,
});
