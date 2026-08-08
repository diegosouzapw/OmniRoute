import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

// International endpoint; audited free access is limited to non-commercial use.
export const chatanywhereProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "chatanywhere",
  alias: "chatanywhere",
  baseUrl: "https://api.chatanywhere.org/v1/chat/completions",
  modelsUrl: "https://api.chatanywhere.org/v1/models",
  models: [],
  passthroughModels: true,
});
