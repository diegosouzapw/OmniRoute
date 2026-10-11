import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const onomeoProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "onomeo",
  alias: "onomeo",
  baseUrl: "https://onomeo.com/v1/chat/completions",
  modelsUrl: "https://onomeo.com/v1/models",
  models: [],
  passthroughModels: true,
});
