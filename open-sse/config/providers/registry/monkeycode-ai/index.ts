import type { RegistryEntry } from "../../shared.ts";

/**
 * MonkeyCode AI (proxy.monkeycode-ai.net) — OpenAI-compatible gateway driven by
 * the ohmyagent CLI (chaitin/MonkeyCode `agent` submodule). Auth is per-model
 * `oma_…` Bearer keys plus an HMAC-SHA256 request signature over the first
 * system message (`X-OhMyAgent-Signature: v1=…`, see
 * open-sse/executors/monkeycode-ai.ts). The signing secret (`omas_…`) lives on
 * the connection's providerSpecificData as `signingSecret`.
 */
export const monkeycode_aiProvider: RegistryEntry = {
  id: "monkeycode-ai",
  alias: "monkeycode",
  format: "openai",
  executor: "monkeycode-ai",
  baseUrl: "https://proxy.monkeycode-ai.net/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    {
      id: "monkeycode-basic/qwen3.8-flash",
      name: "Qwen3.8 Flash (free)",
      contextLength: 200000,
      maxOutputTokens: 32000,
      toolCalling: true,
      supportsVision: true,
    },
    {
      id: "monkeycode-basic/deepseek-v4-flash",
      name: "DeepSeek V4 Flash (free)",
      contextLength: 200000,
      maxOutputTokens: 32000,
      toolCalling: true,
    },
    {
      id: "monkeycode-basic/qwen3.5-plus",
      name: "Qwen3.5 Plus (free)",
      contextLength: 200000,
      maxOutputTokens: 32000,
      toolCalling: true,
    },
    {
      id: "monkeycode-pro/deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      contextLength: 200000,
      maxOutputTokens: 32000,
      toolCalling: true,
    },
    {
      id: "monkeycode-pro/glm-5.2",
      name: "GLM 5.2",
      contextLength: 200000,
      maxOutputTokens: 32000,
      toolCalling: true,
      supportsVision: true,
    },
    {
      id: "monkeycode-pro/grok-4.6",
      name: "Grok 4.6",
      contextLength: 200000,
      maxOutputTokens: 32000,
      toolCalling: true,
      supportsVision: true,
    },
    {
      id: "monkeycode-ultra/gpt-5.5",
      name: "GPT 5.5",
      contextLength: 200000,
      maxOutputTokens: 32000,
      toolCalling: true,
      supportsVision: true,
    },
    {
      id: "monkeycode-ultra/gpt-5.6-sol",
      name: "GPT 5.6 Sol",
      contextLength: 200000,
      maxOutputTokens: 32000,
      toolCalling: true,
      supportsVision: true,
    },
  ],
};
