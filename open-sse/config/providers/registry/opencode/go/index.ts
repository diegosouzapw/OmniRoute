import type { RegistryEntry } from "../../../shared.ts";
export const opencode_goProvider: RegistryEntry = {
  id: "opencode-go",
  alias: "opencode-go",
  format: "openai",
  executor: "opencode",
  baseUrl: "https://opencode.ai/zen/go/v1",
  // (#532) Key validation must hit the main zen endpoint (same key works for both tiers)
  testKeyBaseUrl: "https://opencode.ai/zen/v1",
  authType: "apikey",
  authHeader: "Authorization",
  authPrefix: "Bearer",
  defaultContextLength: 200000,
  models: [
    // Port from decolua/9router 8efacc11: align with official Go endpoints —
    // glm-5.2 is now advertised and Kimi chat traffic must route through
    // `kimi-k2.7-code` (the live API rejects the plain `kimi-k2.7` alias for
    // `/chat/completions`, even though the docs config example uses it).
    {
      id: "glm-5.2",
      name: "GLM-5.2",
    },
    {
      id: "glm-5.1",
      name: "GLM-5.1",
    },
    {
      id: "glm-5",
      name: "GLM-5",
    },
    {
      id: "kimi-k2.7-code",
      name: "Kimi K2.7 Code",
    },
    {
      id: "kimi-k2.6",
      name: "Kimi K2.6",
    },
    {
      id: "kimi-k2.5",
      name: "Kimi K2.5",
    },
    {
      id: "mimo-v2.5-pro",
      name: "MiMo-V2.5-Pro",
      capabilities: {
        supportsMaxEffort: false,
      },
    },
    {
      id: "mimo-v2.5",
      name: "MiMo-V2.5",
      capabilities: {
        supportsMaxEffort: false,
      },
    },
    {
      id: "mimo-v2-pro",
      name: "MiMo-V2-Pro",
      capabilities: {
        supportsMaxEffort: false,
      },
    },
    {
      id: "mimo-v2-omni",
      name: "MiMo-V2-Omni",
      capabilities: {
        supportsMaxEffort: false,
      },
    },
    // #3110: MiniMax M3 via OpenCode Go tier
    {
      id: "minimax-m3",
      name: "MiniMax M3",
      capabilities: {
        contextWindow: 1048576,
        supportsVision: true,
      },
      compat: {
        targetFormat: "claude",
      },
    },
    {
      id: "minimax-m2.7",
      name: "MiniMax M2.7",
      compat: {
        targetFormat: "claude",
      },
    },
    {
      id: "minimax-m2.5",
      name: "MiniMax M2.5",
      compat: {
        targetFormat: "claude",
      },
    },
    // Issue #2292: Qwen models on opencode-go reject oa-compat format
    // ("Model qwen3.x-* is not supported for format oa-compat") — same
    // upstream behavior already declared for opencode-zen. Route them
    // through /messages with the Claude translator.
    // Issue #2822: These models are text-only — mark supportsVision: false
    // so combo routing skips them when the request contains image blocks,
    // preventing image content from reaching a vision-incapable upstream.
    {
      id: "qwen3.7-max",
      name: "Qwen3.7 Max",
      capabilities: {
        supportsVision: false,
      },
      compat: {
        targetFormat: "claude",
      },
    },
    {
      id: "qwen3.6-plus",
      name: "Qwen3.6 Plus",
      capabilities: {
        supportsVision: false,
      },
      compat: {
        targetFormat: "claude",
      },
    },
    {
      id: "qwen3.5-plus",
      name: "Qwen3.5 Plus",
      capabilities: {
        supportsVision: false,
      },
      compat: {
        targetFormat: "claude",
      },
    },
    {
      id: "hy3-preview",
      name: "Hunyuan3 Preview",
    },
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      capabilities: {
        supportsReasoning: true,
        supportsMaxEffort: true,
      },
    },
    // OpencodeExecutor rewrites these aliases to the canonical upstream id and injects reasoning_effort.
    {
      id: "deepseek-v4-pro-low",
      name: "DeepSeek V4 Pro (low effort)",
      capabilities: {
        supportsReasoning: true,
        supportsMaxEffort: true,
      },
    },
    {
      id: "deepseek-v4-pro-medium",
      name: "DeepSeek V4 Pro (medium effort)",
      capabilities: {
        supportsReasoning: true,
        supportsMaxEffort: true,
      },
    },
    {
      id: "deepseek-v4-pro-high",
      name: "DeepSeek V4 Pro (high effort)",
      capabilities: {
        supportsReasoning: true,
        supportsMaxEffort: true,
      },
    },
    {
      id: "deepseek-v4-pro-max",
      name: "DeepSeek V4 Pro (max effort)",
      capabilities: {
        supportsReasoning: true,
        supportsMaxEffort: true,
      },
    },
    {
      id: "deepseek-v4-flash",
      name: "DeepSeek V4 Flash",
      capabilities: {
        supportsReasoning: true,
        supportsMaxEffort: true,
      },
    },
  ],
};
