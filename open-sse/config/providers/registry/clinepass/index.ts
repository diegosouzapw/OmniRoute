import type { RegistryEntry } from "../../shared.ts";

// ClinePass — Cline's subscription gateway ($9.99/mo) bundling 10 open coding models
// from 6 labs, served OpenAI-compatible on the same host as the OAuth `cline` provider
// but with API-key auth and a `cline-pass/<model>` namespace.
// Source: https://docs.cline.bot/getting-started/clinepass (2026-07-02).
export const clinepassProvider: RegistryEntry = {
  id: "clinepass",
  alias: "cp",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.cline.bot/api/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Seed list — runtime /v1/models discovery keeps this fresh.
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
