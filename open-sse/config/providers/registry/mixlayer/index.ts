import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const mixlayerProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "mixlayer",
  alias: "mixlayer",
  baseUrl: "https://models.mixlayer.ai/v1/chat/completions",
  modelsUrl: "https://models.mixlayer.ai/v1/models",
  models: [{ id: "qwen/qwen3.5-4b-free", name: "Qwen 3.5 4B (free)" }],
  passthroughModels: true,
});
