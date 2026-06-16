import type { RegistryEntry } from "../../shared.ts";

export const clineProvider: RegistryEntry = {
  id: "cline",
  alias: "cl",
  format: "openai",
  executor: "openai",
  baseUrl: "https://api.cline.bot/api/v1/chat/completions",
  authType: "oauth",
  authHeader: "Authorization",
  authPrefix: "Bearer ",
  oauth: {
    tokenUrl: "https://api.cline.bot/api/v1/auth/token",
    refreshUrl: "https://api.cline.bot/api/v1/auth/refresh",
    authUrl: "https://api.cline.bot/api/v1/auth/authorize",
  },
  extraHeaders: {
    "HTTP-Referer": "https://cline.bot",
    "X-Title": "Cline",
  },
  models: [
    { id: "moonshotai/kimi-k2.6", name: "Kimi K2.6 (Free)" },
    { id: "anthropic/claude-sonnet-4.6", name: "Claude Sonnet 4.6" },
    { id: "anthropic/claude-opus-4.7", name: "Claude Opus 4.7" },
    { id: "google/gemini-3.1-pro-preview", name: "Gemini 3.1 Pro" },
    { id: "google/gemini-3-flash-preview", name: "Gemini 3 Flash" },
    { id: "openai/gpt-5.5", name: "GPT-5.5" },
    { id: "deepseek/deepseek-v4-flash", name: "DeepSeek V4 Flash", supportsReasoning: true },
    { id: "deepseek/deepseek-v4-pro", name: "DeepSeek V4 Pro", supportsReasoning: true },
  ],
  passthroughModels: true,
};
