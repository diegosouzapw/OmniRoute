import type { RegistryEntry } from "../../shared.ts";

export const freeaiapikeyProvider: RegistryEntry = {
  id: "freeaiapikey",
  alias: "faik",
  format: "openai",
  executor: "default",
  baseUrl: "https://freeaiapikey.com/v1/chat/completions",
  modelsUrl: "https://freeaiapikey.com/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [
    { id: "openai/gpt-5", name: "GPT-5 (via FreeAIAPIKey)", contextLength: 400000 },
    { id: "openai/gpt-4o", name: "GPT-4o (via FreeAIAPIKey)" },
    { id: "openai/gpt-5.2-codex", name: "GPT-5.2 Codex (via FreeAIAPIKey)" },
    {
      id: "anthropic/claude-opus-4.6",
      name: "Claude Opus 4.6 (via FreeAIAPIKey)",
      contextLength: 1000000,
    },
    {
      id: "anthropic/claude-sonnet-4.6",
      name: "Claude Sonnet 4.6 (via FreeAIAPIKey)",
      contextLength: 1000000,
    },
    {
      id: "Alibaba/qwen3.5",
      name: "Qwen 3.5 (via FreeAIAPIKey)",
      contextLength: 128000,
    },
    {
      id: "Alibaba/qwen3-vl:235b",
      name: "Qwen 3 VL 235B (via FreeAIAPIKey)",
      contextLength: 128000,
    },
  ],
};
