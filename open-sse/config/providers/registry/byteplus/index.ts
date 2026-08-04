import type { RegistryEntry } from "../../shared.ts";

// BytePlus ModelArk (Ark) — OpenAI-compatible, ap-southeast-1 region, Bearer auth.
// Re-added after the registry modularization (#3993) dropped it; restores #3877.
export const byteplusProvider: RegistryEntry = {
  id: "byteplus",
  alias: "bpm",
  format: "openai",
  executor: "default",
  baseUrl: "https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions",
  modelsUrl: "https://ark.ap-southeast.bytepluses.com/api/v3/models",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [
    { id: "seed-2.0", name: "Seed 2.0" },
    { id: "kimi-k2-thinking", name: "Kimi K2 Thinking", supportsReasoning: true },
    { id: "glm-4.7", name: "GLM 4.7" },
    { id: "gpt-oss-120b", name: "GPT-OSS-120B" },
  ],
};
