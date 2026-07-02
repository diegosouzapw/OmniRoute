import type { RegistryEntry } from "../../shared.ts";

// ClinePass — Cline's subscription gateway ($9.99/mo) bundling 10 open coding models
// from 6 labs. It is served on the same `api.cline.bot` host and uses the same WorkOS
// OAuth as the free `cline` provider, but is a separate provider entry advertising the
// `cline-pass/<model>` namespace (the models a ClinePass subscription unlocks). The OAuth
// flow is reused 1:1 from `cline` (see src/lib/oauth/providers/index.ts → `clinepass`).
// Source: https://docs.cline.bot/getting-started/clinepass (2026-07-02).
export const clinepassProvider: RegistryEntry = {
  id: "clinepass",
  alias: "cp",
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
  // Seed list from docs.cline.bot/getting-started/clinepass (2026-07-02).
  models: [
    { id: "cline-pass/glm-5.2", name: "GLM 5.2", supportsReasoning: true },
    { id: "cline-pass/kimi-k2.7-code", name: "Kimi K2.7 Code", supportsReasoning: true },
    { id: "cline-pass/kimi-k2.6", name: "Kimi K2.6", supportsReasoning: true },
    { id: "cline-pass/deepseek-v4-pro", name: "DeepSeek V4 Pro", supportsReasoning: true },
    { id: "cline-pass/deepseek-v4-flash", name: "DeepSeek V4 Flash", supportsReasoning: true },
    { id: "cline-pass/mimo-v2.5", name: "MiMo V2.5", supportsReasoning: true },
    { id: "cline-pass/mimo-v2.5-pro", name: "MiMo V2.5 Pro", supportsReasoning: true },
    {
      id: "cline-pass/minimax-m3",
      name: "MiniMax M3",
      contextLength: 1048576,
      supportsVision: true,
    },
    { id: "cline-pass/qwen3.7-max", name: "Qwen3.7 Max", supportsReasoning: true },
    { id: "cline-pass/qwen3.7-plus", name: "Qwen3.7 Plus", supportsReasoning: true },
  ],
  passthroughModels: true,
};
