import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const freeinferenceProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "freeinference",
  alias: "freeinference",
  baseUrl: "https://freeinference.org/v1/chat/completions",
  modelsUrl: "https://freeinference.org/v1/models",
  models: [],
  passthroughModels: true,
});
