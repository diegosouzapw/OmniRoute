import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

// Free access terms may permit data collection or training use; discover models dynamically.
export const nagaAiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "naga-ai",
  alias: "naga-ai",
  baseUrl: "https://api.naga.ac/v1/chat/completions",
  modelsUrl: "https://api.naga.ac/v1/models",
  models: [],
  passthroughModels: true,
});
