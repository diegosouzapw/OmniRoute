import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const arceeAiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "arcee-ai",
  alias: "arcee",
  baseUrl: "https://api.arcee.ai/api/v1/chat/completions",
  models: [],
  passthroughModels: true,
});
