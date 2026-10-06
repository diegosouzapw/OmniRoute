import type { RegistryEntry } from "../../shared.ts";
const CROF_REASONING_EFFORTS = ["none", "low", "medium", "high", "max"] as const;

export const crofProvider: RegistryEntry = {
  id: "crof",
  alias: "crof",
  format: "openai",
  executor: "default",
  baseUrl: "https://crof.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Seed list — runtime /v1/models discovery keeps this fresh.
  // Source: GET https://crof.ai/v1/models (2026-08-10; includes models absent from the 2026-05-17 roster).
  models: [
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      supportsReasoning: true,
      supportedThinkingEfforts: CROF_REASONING_EFFORTS,
    },
    {
      id: "deepseek-v4-flash",
      name: "DeepSeek V4 Flash",
      supportsReasoning: true,
      supportedThinkingEfforts: CROF_REASONING_EFFORTS,
    },
    {
      id: "deepseek-v4-flash-0731",
      name: "DeepSeek V4 Flash 0731",
      supportsReasoning: true,
      supportedThinkingEfforts: CROF_REASONING_EFFORTS,
    },
    { id: "deepseek-v3.2", name: "DeepSeek V3.2" },
    {
      id: "kimi-k2.6",
      name: "Kimi K2.6",
      supportsReasoning: true,
      supportedThinkingEfforts: CROF_REASONING_EFFORTS,
    },
    {
      id: "kimi-k2.7-code",
      name: "Kimi K2.7 Code",
      supportsReasoning: true,
      supportedThinkingEfforts: CROF_REASONING_EFFORTS,
    },
    {
      id: "kimi-k3",
      name: "Kimi K3",
      supportsReasoning: true,
      supportedThinkingEfforts: CROF_REASONING_EFFORTS,
    },
    {
      id: "kimi-k3-eco",
      name: "Kimi K3 Eco",
      supportsReasoning: true,
      supportedThinkingEfforts: CROF_REASONING_EFFORTS,
    },
    {
      id: "glm-5.1",
      name: "GLM 5.1",
      supportsReasoning: true,
      supportedThinkingEfforts: CROF_REASONING_EFFORTS,
    },
    {
      id: "glm-5.2",
      name: "GLM 5.2",
      supportsReasoning: true,
      supportedThinkingEfforts: CROF_REASONING_EFFORTS,
    },
    {
      id: "mimo-v2.5-pro",
      name: "Mimo 2.5 Pro",
      supportsReasoning: true,
      supportedThinkingEfforts: CROF_REASONING_EFFORTS,
    },
    {
      id: "gemma-4-31b-it",
      name: "Gemma 4 31B",
      supportsReasoning: true,
      supportedThinkingEfforts: CROF_REASONING_EFFORTS,
    },
    {
      id: "qwen3.6-27b",
      name: "Qwen3.6 27B",
      supportsReasoning: true,
      supportedThinkingEfforts: CROF_REASONING_EFFORTS,
    },
    {
      id: "qwen3.5-397b-a17b",
      name: "Qwen3.5 397B A17B",
      supportsReasoning: true,
      supportedThinkingEfforts: CROF_REASONING_EFFORTS,
    },
    {
      id: "qwen3.5-9b",
      name: "Qwen3.5 9B",
      supportsReasoning: true,
      supportedThinkingEfforts: CROF_REASONING_EFFORTS,
    },
  ],
};
