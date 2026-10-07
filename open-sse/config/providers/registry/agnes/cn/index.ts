import type { RegistryEntry } from "../../../shared.ts";

// Official Agnes chat effort vocabulary from live /v1/chat/completions probes
// (2026-09-14, api.agnes-ai.cn and apihub.agnes-ai.com behave identically).
// 2.0/2.5 accept none/low/medium/high/max and 400 on xhigh/minimal/off/ultra.
// 3.0 additionally accepts minimal and xhigh.
export const AGNES_CN_FLASH_THINKING_EFFORTS = ["none", "low", "medium", "high", "max"] as const;
export const AGNES_CN_30_THINKING_EFFORTS = [
  "none",
  "minimal",
  "low",
  "medium",
  "high",
  "xhigh",
  "max",
] as const;

export const agnes_cnProvider: RegistryEntry = {
  id: "agnes-cn",
  alias: "agnescn",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.agnes-ai.cn/v1/chat/completions",
  modelsUrl: "https://api.agnes-ai.cn/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  passthroughModels: true,
  liveCatalogAuthoritative: true,
  models: [
    {
      id: "agnes-2.0-flash",
      name: "Agnes 2.0 Flash",
      contextLength: 262144,
      maxOutputTokens: 65536,
      supportsReasoning: true,
      supportedThinkingEfforts: [...AGNES_CN_FLASH_THINKING_EFFORTS],
      supportsVision: true,
      toolCalling: true,
    },
    {
      id: "agnes-2.5-flash",
      name: "Agnes 2.5 Flash",
      contextLength: 524288,
      maxOutputTokens: 65536,
      supportsReasoning: true,
      supportedThinkingEfforts: [...AGNES_CN_FLASH_THINKING_EFFORTS],
      supportsVision: true,
      toolCalling: true,
      interleavedField: "reasoning_content",
    },
    {
      id: "agnes-3.0-flash",
      name: "Agnes 3.0 Flash",
      contextLength: 524288,
      maxOutputTokens: 65536,
      supportsReasoning: true,
      supportedThinkingEfforts: [...AGNES_CN_30_THINKING_EFFORTS],
      supportsVision: true,
      toolCalling: true,
      interleavedField: "reasoning_content",
    },
  ],
};
