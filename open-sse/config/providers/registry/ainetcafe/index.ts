import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const ainetcafeProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "ainetcafe",
  alias: "ainetcafe",
  baseUrl: "https://microquickjs.com/v1/chat/completions",
  modelsUrl: "https://microquickjs.com/v1/models",
  models: [],
  passthroughModels: true,
});
