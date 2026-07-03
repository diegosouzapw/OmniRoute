import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const kenariProvider = buildOpenAiCompatibleRegistryEntry({
  id: "kenari",
  alias: "kenari",
  baseUrl: "https://kenari.id/v1/chat/completions",
  modelsUrl: "https://kenari.id/v1/models",
  passthroughModels: true,
  models: [],
});
