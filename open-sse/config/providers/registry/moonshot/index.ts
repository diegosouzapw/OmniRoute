import { REASONING_UNSUPPORTED, type RegistryEntry, type RegistryModel } from "../../shared.ts";

// Kimi K3: Moonshot's flagship 1M-context model. The Chat Completions API
// currently accepts only reasoning_effort="max" while reasoning is enabled.
export const KIMI_K3_MODEL: RegistryModel = {
  id: "kimi-k3",
  name: "Kimi K3",
  contextLength: 1048576,
  maxOutputTokens: 1048576,
  supportsVision: true,
  supportsReasoning: true,
  // K3 accepts literal `max` only; it does not accept OmniRoute's `xhigh` tier.
  supportsXHighEffort: false,
  toolCalling: true,
  interleavedField: "reasoning_content",
  unsupportedParams: REASONING_UNSUPPORTED,
};

// Kimi K2.7 Code (released 2026-06-12): coding-focused successor to K2.6 — 1T
// MoE, 256K context, thinking-only (preserve_thinking forced) with a fixed
// sampling regime (temperature=1.0 / top_p=0.95 / n=1 / penalties=0). Two ids:
// `kimi-k2.7-code` and the high-speed variant `kimi-k2.7-code-highspeed`.
export const KIMI_K27_MODELS: RegistryModel[] = [
  {
    id: "kimi-k2.7-code",
    name: "Kimi K2.7 Code",
    contextLength: 262144,
    maxOutputTokens: 262144,
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
    interleavedField: "reasoning_content",
    unsupportedParams: REASONING_UNSUPPORTED,
  },
  {
    id: "kimi-k2.7-code-highspeed",
    name: "Kimi K2.7 Code (High Speed)",
    contextLength: 262144,
    maxOutputTokens: 262144,
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
    interleavedField: "reasoning_content",
    unsupportedParams: REASONING_UNSUPPORTED,
  },
];

export const MOONSHOT_KIMI_MODELS: RegistryModel[] = [
  KIMI_K3_MODEL,
  ...KIMI_K27_MODELS,
  {
    id: "kimi-k2.6",
    name: "Kimi K2.6",
    contextLength: 262144,
    maxOutputTokens: 262144,
    supportsVision: true,
    supportsReasoning: true,
    toolCalling: true,
    interleavedField: "reasoning_content",
    unsupportedParams: REASONING_UNSUPPORTED,
  },
];

export const moonshotProvider: RegistryEntry = {
  id: "moonshot",
  alias: "moonshot",
  format: "openai",
  executor: "moonshot",
  baseUrl: "https://api.moonshot.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: MOONSHOT_KIMI_MODELS,
};
