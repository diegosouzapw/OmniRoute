import type { RegistryEntry } from "../../shared.ts";

export const llm7Provider: RegistryEntry = {
  id: "llm7",
  alias: "llm7",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.llm7.io/v1/chat/completions",
  modelsUrl: "https://api.llm7.io/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  poolConfig: {
    minSessions: 1,
    maxSessions: 3,
    cooldownBase: 2000,
    cooldownMax: 5000,
    cooldownJitter: 100,
    requestTimeout: 30000,
    requestJitter: 50,
  },
  models: [
    { id: "gpt-4o-mini-2024-07-18", name: "GPT-4o mini (LLM7)" },
    { id: "gpt-4.1-nano-2025-04-14", name: "GPT-4.1 nano (LLM7)" },
    { id: "deepseek-r1-0528", name: "DeepSeek R1 (LLM7)" },
    { id: "qwen2.5-coder-32b-instruct", name: "Qwen2.5 Coder 32B (LLM7)" },
  ],
};
