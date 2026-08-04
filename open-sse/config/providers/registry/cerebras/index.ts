import type { RegistryEntry } from "../../shared.ts";

export const cerebrasProvider: RegistryEntry = {
  id: "cerebras",
  alias: "cerebras",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.cerebras.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "zai-glm-4.7", name: "GLM 4.7" },
    { id: "gemma-4-31b", name: "Gemma 4 31B" },
    { id: "gpt-oss-120b", name: "GPT OSS 120B" },
  ],
};
