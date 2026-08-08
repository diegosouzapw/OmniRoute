import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const helyxaiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "helyxai",
  alias: "helyxai",
  baseUrl: "https://helyxai.space/v1/chat/completions",
  modelsUrl: "https://helyxai.space/v1/models",
  models: [],
  passthroughModels: true,
});
