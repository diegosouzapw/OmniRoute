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
  // #4019: Kilo's gateway serves its free models anonymously when no account is
  // connected. Paired with `anonymousFallback: true` on the dashboard provider
  // entry, a request with no OAuth credential falls back to `Bearer anonymous`
  // (see DefaultExecutor) so the free tier works without signup. The editor-name
  // header is required by the gateway and is harmless on the authenticated path.
  anonymousApiKey: "anonymous",
  headers: {
    "X-KILOCODE-EDITORNAME": "OmniRoute",
  },
  oauth: {
    initiateUrl: "https://api.kilo.ai/api/device-auth/codes",
    pollUrlBase: "https://api.kilo.ai/api/device-auth/codes",
  },
  models: [
    { id: "openrouter/free", name: "Free Models Router" },
    { id: "openai/gpt-5.6-sol", name: "GPT-5.6 Sol" },
    { id: "openai/gpt-5.6-terra", name: "GPT-5.6 Terra" },
    { id: "openai/gpt-5.6-luna", name: "GPT-5.6 Luna" },
    { id: "anthropic/claude-opus-5", name: "Claude Opus 5" },
    { id: "anthropic/claude-sonnet-5", name: "Claude Sonnet 5" },
    { id: "anthropic/claude-haiku-4.5", name: "Claude Haiku 4.5" },
    { id: "google/gemini-3.1-pro-preview", name: "Gemini 3.1 Pro" },
    { id: "google/gemini-3.7-flash", name: "Gemini 3.7 Flash" },
    { id: "google/gemini-3.5-flash-lite", name: "Gemini 3.5 Flash Lite" },
    { id: "qwen/qwen3.8-max", name: "Qwen3.8 Max" },
    { id: "qwen/qwen3.7-plus", name: "Qwen3.7 Plus" },
    { id: "deepseek/deepseek-v4-pro-0813", name: "DeepSeek V4 Pro", supportsReasoning: true },
    { id: "deepseek/deepseek-v4-flash-0731", name: "DeepSeek V4 Flash", supportsReasoning: true },
    { id: "moonshotai/kimi-k3", name: "Kimi K3" },
  ],
  passthroughModels: true,
};
