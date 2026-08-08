import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const zyloApiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "zylo-api",
  alias: "zylo",
  baseUrl: "https://api.zyloai.net/v1/chat/completions",
  modelsUrl: "https://api.zyloai.net/v1/models",
  models: [],
  passthroughModels: true,
});
