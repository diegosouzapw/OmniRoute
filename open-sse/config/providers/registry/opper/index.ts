import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const opperProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "opper",
  alias: "opper",
  baseUrl: "https://api.opper.ai/v3/compat/chat/completions",
  modelsUrl: "https://api.opper.ai/v3/compat/models",
  models: [],
  passthroughModels: true,
});
