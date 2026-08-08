import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const meganovaAiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "meganova-ai",
  alias: "meganova-ai",
  baseUrl: "https://api.meganova.ai/v1/chat/completions",
  modelsUrl: "https://api.meganova.ai/v1/models",
  models: [],
  passthroughModels: true,
});
