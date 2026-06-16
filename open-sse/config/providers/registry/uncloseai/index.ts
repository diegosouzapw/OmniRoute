import type { RegistryEntry } from "../../shared.ts";

export const uncloseaiProvider: RegistryEntry = {
  id: "uncloseai",
  alias: "unc",
  format: "openai",
  executor: "default",
  baseUrl: "https://hermes.ai.unturf.com/v1/chat/completions",
  authType: "optional",
  authHeader: "bearer",
  models: [
    {
      id: "adamo1139/Hermes-3-Llama-3.1-8B-FP8-Dynamic",
      name: "Hermes 3 Llama 3.1 8B (🆓 Free)",
    },
    { id: "qwen3.6:27b", name: "Qwen3 Coder 27B (🆓 Free)" },
    { id: "gemma4:31b", name: "Gemma 4 31B (🆓 Free)" },
  ],
};
