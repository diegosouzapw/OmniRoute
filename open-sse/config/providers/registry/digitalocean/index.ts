import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const digitaloceanProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "digitalocean",
  alias: "digitalocean",
  baseUrl: "https://inference.do-ai.run/v1/chat/completions",
  modelsUrl: "https://inference.do-ai.run/v1/models",
  models: [],
  passthroughModels: true,
});
