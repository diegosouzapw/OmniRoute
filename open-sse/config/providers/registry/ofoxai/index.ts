import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const ofoxaiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "ofoxai",
  alias: "ofoxai",
  baseUrl: "https://api.ofox.ai/v1/chat/completions",
  modelsUrl: "https://api.ofox.ai/v1/models",
  models: [],
  passthroughModels: true,
});
