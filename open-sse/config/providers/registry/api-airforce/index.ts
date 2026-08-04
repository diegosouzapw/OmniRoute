import type { RegistryEntry } from "../../shared.ts";

export const api_airforceProvider: RegistryEntry = {
  id: "api-airforce",
  alias: "af",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.airforce/v1/chat/completions",
  modelsUrl: "https://api.airforce/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  headers: {
    "HTTP-Referer": "https://endpoint-proxy.local",
    "X-Title": "Endpoint Proxy",
  },
  models: [
    // Free tier models (55 available)
    { id: "x-ai/grok-3", name: "Grok-3 (Free)", contextLength: 131072, maxOutputTokens: 65536 },
    {
      id: "x-ai/grok-2-1212",
      name: "Grok-2 1212 (Free)",
      contextLength: 131072,
      maxOutputTokens: 65536,
    },
    {
      id: "anthropic/claude-3.7-sonnet",
      name: "Claude 3.7 Sonnet (Free)",
      contextLength: 200000,
      maxOutputTokens: 8192,
    },
    {
      id: "qwen/qwen3-32b",
      name: "Qwen3 32B (Free)",
      contextLength: 128000,
      maxOutputTokens: 8192,
    },
    {
      id: "moonshot/kimi-k2.6",
      name: "Kimi K2.6 (Free)",
      contextLength: 262144,
      maxOutputTokens: 65536,
    },
    {
      id: "google/gemini-2.5-flash",
      name: "Gemini 2.5 Flash (Free)",
      contextLength: 1048576,
      maxOutputTokens: 65536,
    },
    {
      id: "deepseek/deepseek-v3",
      name: "DeepSeek V3 (Free)",
      contextLength: 262144,
      maxOutputTokens: 16384,
    },
  ],
};
