import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

// Unifically serves text, image, video and audio models from one catalog.
// `?category=llm` narrows /v1/models to the chat models, which are the only
// ones /v1/chat/completions accepts.
export const unificallyProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "unifically",
  alias: "unifically",
  baseUrl: "https://api.unifically.com/v1/chat/completions",
  modelsUrl: "https://api.unifically.com/v1/models?category=llm",
  models: [],
  passthroughModels: true,
});
