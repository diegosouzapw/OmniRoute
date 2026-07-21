import type { RegistryEntry } from "../../../shared.ts";

export const qwen_webProvider: RegistryEntry = {
  id: "qwen-web",
  // The web/cookie variant is addressed by its own id.
  alias: "qwen-web",
  format: "openai",
  executor: "qwen-web",
  // v2 API (the legacy /api/chat/completions endpoint was retired upstream).
  // Restored after the registry modularization (#3993) regressed this to v1 with
  // a retired catalog. Source of truth: pre-#3993 providerRegistry.ts (commit 1ed01dd90^).
  baseUrl: "https://chat.qwen.ai/api/v2/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Current upstream catalog (GET https://chat.qwen.ai/api/models). Legacy
  // ids (qwen-plus, qwen3-max, ...) still resolve via the executor's
  // MODEL_ALIASES map for backward compatibility.
  models: [
    {
      id: "qwen3.8-max-preview",
      name: "Qwen3.8 Max Preview",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1_000_000,
      maxOutputTokens: 65_536,
    },
    {
      id: "qwen3.7-max",
      name: "Qwen3.7 Max",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: false,
      contextLength: 1_000_000,
      maxOutputTokens: 65_536,
    },
    {
      id: "qwen3.7-plus",
      name: "Qwen3.7 Plus",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1_000_000,
      maxOutputTokens: 65_536,
    },
    {
      id: "qwen3.6-plus",
      name: "Qwen3.6 Plus",
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1_000_000,
      maxOutputTokens: 65_536,
    },
  ],
};
