import type { RegistryEntry } from "../../shared.ts";

// Official Agnes chat contract from live /v1/chat/completions probes
// (2026-09-14, apihub.agnes-ai.com). 2.0/2.5 accept none/low/medium/high/max
// and 400 on xhigh/off/ultra/minimal. 3.0 additionally accepts minimal and
// xhigh. HuggingFace's Agnes-3.0-Flash card lists four of these
// (none/low/medium/high); live 3.0 also takes minimal and xhigh, so the
// registry follows the live API rather than the shorter card.
export const AGNES_FLASH_THINKING_EFFORTS = ["none", "low", "medium", "high", "max"] as const;
export const AGNES_30_THINKING_EFFORTS = [
  "none",
  "minimal",
  "low",
  "medium",
  "high",
  "xhigh",
  "max",
] as const;

export const agnesProvider: RegistryEntry = {
  id: "agnes",
  format: "openai",
  executor: "default",
  baseUrl: "https://apihub.agnes-ai.com/v1/chat/completions",
  modelsUrl: "https://apihub.agnes-ai.com/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    {
      id: "agnes-2.0-flash",
      name: "Agnes 2.0 Flash",
      contextLength: 262144,
      maxOutputTokens: 65536,
      supportsReasoning: true,
      supportedThinkingEfforts: [...AGNES_FLASH_THINKING_EFFORTS],
      supportsVision: true,
      toolCalling: true,
    },
    {
      id: "agnes-2.5-flash",
      name: "Agnes 2.5 Flash",
      contextLength: 524288,
      maxOutputTokens: 65536,
      supportsReasoning: true,
      supportedThinkingEfforts: [...AGNES_FLASH_THINKING_EFFORTS],
      supportsVision: true,
      toolCalling: true,
      interleavedField: "reasoning_content",
    },
    // Wiki (2026-09-10): agnes-3.0-flash is 512k context / 65,536
    // output, same window as 2.5-flash. Live /v1/models lists it.
    {
      id: "agnes-3.0-flash",
      name: "Agnes 3.0 Flash",
      contextLength: 524288,
      maxOutputTokens: 65536,
      supportsReasoning: true,
      supportedThinkingEfforts: [...AGNES_30_THINKING_EFFORTS],
      supportsVision: true,
      toolCalling: true,
      interleavedField: "reasoning_content",
    },
  ],
};
