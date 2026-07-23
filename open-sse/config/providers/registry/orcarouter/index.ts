import type { RegistryEntry } from "../../shared.ts";

/**
 * OrcaRouter — OpenAI-compatible routing gateway (https://www.orcarouter.ai).
 *
 * Model IDs keep the OrcaRouter namespace prefix ("orcarouter/" for the router,
 * "<vendor>/" for pinned models): the distributor matches channels by the namespaced
 * id, so a bare id (e.g. "auto") returns 503 "No available channel". Capabilities and
 * limits verified live (/api/pricing + chat/completions) 2026-06-17.
 */
export const orcarouterProvider: RegistryEntry = {
  id: "orcarouter",
  alias: "orcarouter",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.orcarouter.ai/v1",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  headers: {
    "HTTP-Referer": "https://endpoint-proxy.local",
    "X-Title": "Endpoint Proxy",
  },
  models: [
    // Adaptive router (headline feature). Per-turn tool/reasoning support depends on
    // the workspace AUTO pool (https://www.orcarouter.ai/console/routing).
    { id: "orcarouter/auto", name: "Auto (smart routing)", toolCalling: true },
    {
      id: "openai/gpt-5.5",
      name: "GPT-5.5",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1050000,
      maxOutputTokens: 128000,
    },
    {
      id: "google/gemini-3.5-flash",
      name: "Gemini 3.5 Flash",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1048576,
      maxOutputTokens: 65536,
    },
    {
      id: "anthropic/claude-opus-4.8",
      name: "Claude Opus 4.8",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1000000,
      maxOutputTokens: 128000,
    },
    {
      id: "grok/grok-4.3",
      name: "Grok 4.3",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1000000,
    },
    {
      id: "deepseek/deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      toolCalling: true,
      supportsReasoning: true,
      contextLength: 1048576,
      maxOutputTokens: 384000,
    },
    {
      id: "minimax/minimax-m2.7",
      name: "MiniMax M2.7",
      toolCalling: true,
      supportsReasoning: true,
      contextLength: 204800,
      maxOutputTokens: 2048,
    },
    {
      id: "qwen/qwen3.7-max",
      name: "Qwen3.7 Max",
      toolCalling: true,
      contextLength: 1000000,
      maxOutputTokens: 64000,
    },
  ],
};
