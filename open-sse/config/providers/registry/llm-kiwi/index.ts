import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const llmKiwiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "llm-kiwi",
  alias: "llmkiwi",
  baseUrl: "https://api.llm.kiwi/v1/chat/completions",
  modelsUrl: "https://api.llm.kiwi/v1/models",
  models: [
    { id: "auto", name: "Auto" },
    { id: "hrLLM", name: "hrLLM" },
  ],
  passthroughModels: true,
});
