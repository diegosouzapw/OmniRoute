import type { RegistryEntry } from "../../shared.ts";

export const kilocodeProvider: RegistryEntry = {
  id: "kilocode",
  alias: "kc",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.kilo.ai/api/openrouter/chat/completions",
  modelsUrl: "https://api.kilo.ai/api/openrouter/models",
  authType: "oauth",
  authHeader: "Authorization",
  authPrefix: "Bearer ",
  oauth: {
    initiateUrl: "https://api.kilo.ai/api/device-auth/codes",
    pollUrlBase: "https://api.kilo.ai/api/device-auth/codes",
  },
  models: [
    { id: "openrouter/free", name: "Free Models Router" },
    { id: "qwen/qwen3.6-plus", name: "Qwen3.6 Plus" },
    { id: "qwen/qwen3.5-397b-a17b", name: "Qwen3.5 397B A17B" },
    { id: "openai/gpt-5.5", name: "GPT-5.5" },
    { id: "openai/gpt-5.4-mini", name: "GPT-5.4 Mini" },
    { id: "anthropic/claude-opus-4.7", name: "Claude Opus 4.7" },
    { id: "anthropic/claude-sonnet-4.6", name: "Claude Sonnet 4.6" },
    { id: "anthropic/claude-haiku-4.5", name: "Claude Haiku 4.5" },
    { id: "google/gemini-3.1-pro-preview", name: "Gemini 3.1 Pro" },
    { id: "google/gemini-3-flash-preview", name: "Gemini 3 Flash" },
    { id: "google/gemini-3.1-flash-lite", name: "Gemini 3.1 Flash Lite" },
    { id: "deepseek/deepseek-v4-pro", name: "DeepSeek V4 Pro", supportsReasoning: true },
    { id: "deepseek/deepseek-v4-flash", name: "DeepSeek V4 Flash", supportsReasoning: true },
    { id: "moonshotai/kimi-k2.6", name: "Kimi K2.6" },
  ],
  passthroughModels: true,
};
