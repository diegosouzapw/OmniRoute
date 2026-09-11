import type { RegistryEntry } from "../../../shared.ts";
import { OPENCODE_ZEN_GO_SHARED_MODELS } from "../../../shared.ts";

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
    // GLM-5.2 — base model + effort-tier aliases (#6922).
    // #10788: the tier vocabulary is declared on the base row so the catalog's
    // variant synthesis (#9485) and the effort sanitizer share one source of
    // truth with OpencodeExecutor's EFFORT_TIERS.
    {
      id: "glm-5.2",
      name: "GLM-5.2",
      supportsReasoning: true,
      supportedThinkingEfforts: ["high", "max"],
    },
    { id: "glm-5.2-high", name: "GLM-5.2 (high effort)", supportsReasoning: true },
    { id: "glm-5.2-max", name: "GLM-5.2 (max effort)", supportsReasoning: true },

    ...OPENCODE_ZEN_GO_SHARED_MODELS,
    // models[0] (glm-5.2) is the dashboard default (LlmChatCard/ProviderTestSlideOver take models[0]).

    { id: "glm-5.1", name: "GLM-5.1" },
    { id: "glm-5", name: "GLM-5" },
    // kimi-k2.7-code declared identically on opencode-zen — see OPENCODE_ZEN_GO_SHARED_MODELS.
    { id: "kimi-k2.6", name: "Kimi K2.6" },
    { id: "kimi-k2.5", name: "Kimi K2.5" },
    // #8353: Kimi K3 base + max-effort alias from the OpenCode Go registry.
    { id: "kimi-k3", name: "Kimi K3", supportsReasoning: true, supportedThinkingEfforts: ["max"] },
    { id: "kimi-k3-max", name: "Kimi K3 (max effort)", supportsReasoning: true },
    // MiMo-V2.5 — base model + effort-tier aliases (#6922).
    { id: "mimo-v2.5-pro", name: "MiMo-V2.5-Pro", supportsReasoning: true },
    {
      id: "mimo-v2.5",
      name: "MiMo-V2.5",
      supportsReasoning: true,
      supportedThinkingEfforts: ["high", "max"],
    },
    { id: "mimo-v2.5-high", name: "MiMo-V2.5 (high effort)", supportsReasoning: true },
    { id: "mimo-v2.5-max", name: "MiMo-V2.5 (max effort)", supportsReasoning: true },
    // #3110: MiniMax M3 via OpenCode Go tier
    {
      id: "minimax-m3",
      name: "MiniMax M3",
      targetFormat: "claude",
      contextLength: 1048576,
      supportsVision: true,
    },
    { id: "minimax-m2.7", name: "MiniMax M2.7", targetFormat: "claude" },
    { id: "minimax-m2.5", name: "MiniMax M2.5", targetFormat: "claude" },
    // Issue #2292: Qwen models on opencode-go reject oa-compat format
    // ("Model qwen3.x-* is not supported for format oa-compat") — same
    // upstream behavior already declared for opencode-zen. Route them
    // through /messages with the Claude translator.
    // Issue #2822: These models are text-only — mark supportsVision: false
    // so combo routing skips them when the request contains image blocks,
    // preventing image content from reaching a vision-incapable upstream.
    // #8353: effort-tier aliases from the OpenCode Go registry.
    {
      id: "qwen3.7-max",
      name: "Qwen3.7 Max",
      targetFormat: "claude",
      supportsVision: false,
      supportsReasoning: true,
      supportedThinkingEfforts: ["high", "max"],
    },
    {
      id: "qwen3.7-max-high",
      name: "Qwen3.7 Max (high effort)",
      targetFormat: "claude",
      supportsVision: false,
      supportsReasoning: true,
    },
    {
      id: "qwen3.7-max-max",
      name: "Qwen3.7 Max (max effort)",
      targetFormat: "claude",
      supportsVision: false,
      supportsReasoning: true,
    },
    {
      id: "qwen3.7-plus",
      name: "Qwen3.7 Plus",
      targetFormat: "claude",
      supportsVision: false,
      supportsReasoning: true,
      supportedThinkingEfforts: ["high", "max"],
    },
    {
      id: "qwen3.7-plus-high",
      name: "Qwen3.7 Plus (high effort)",
      targetFormat: "claude",
      supportsVision: false,
      supportsReasoning: true,
    },
    {
      id: "qwen3.7-plus-max",
      name: "Qwen3.7 Plus (max effort)",
      targetFormat: "claude",
      supportsVision: false,
      supportsReasoning: true,
    },
    // qwen3.6-plus / qwen3.5-plus base ids declared identically on opencode-zen — see
    // OPENCODE_ZEN_GO_SHARED_MODELS.
    {
      id: "qwen3.6-plus-high",
      name: "Qwen3.6 Plus (high effort)",
      targetFormat: "claude",
      supportsVision: false,
      supportsReasoning: true,
    },
    {
      id: "qwen3.6-plus-max",
      name: "Qwen3.6 Plus (max effort)",
      targetFormat: "claude",
      supportsVision: false,
      supportsReasoning: true,
    },
    // #8353: hy3 is the Go-tier base id (distinct from hy3-preview / hy3-free).
    {
      id: "hy3",
      name: "Hunyuan3",
      contextLength: 256000,
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "high"],
    },
    {
      id: "hy3-none",
      name: "Hunyuan3 (none effort)",
      contextLength: 256000,
      supportsReasoning: true,
    },
    {
      id: "hy3-low",
      name: "Hunyuan3 (low effort)",
      contextLength: 256000,
      supportsReasoning: true,
    },
    {
      id: "hy3-high",
      name: "Hunyuan3 (high effort)",
      contextLength: 256000,
      supportsReasoning: true,
    },
    { id: "hy3-preview", name: "Hunyuan3 Preview" },
    // Muse Spark 1.2 Contributor — base + effort-tier aliases from the OpenCode Go
    // registry (`opencode models opencode-go --verbose`; exact suffix set:
    // minimal/low/medium/high/xhigh, no max).
    {
      id: "muse-spark-1.2-contributor",
      name: "Muse Spark 1.2 Contributor",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsVision: true,
      supportsAudio: true,
      supportsVideo: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.2-contributor-minimal",
      name: "Muse Spark 1.2 Contributor (minimal effort)",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsVision: true,
      supportsAudio: true,
      supportsVideo: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.2-contributor-low",
      name: "Muse Spark 1.2 Contributor (low effort)",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsVision: true,
      supportsAudio: true,
      supportsVideo: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.2-contributor-medium",
      name: "Muse Spark 1.2 Contributor (medium effort)",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsVision: true,
      supportsAudio: true,
      supportsVideo: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.2-contributor-high",
      name: "Muse Spark 1.2 Contributor (high effort)",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsVision: true,
      supportsAudio: true,
      supportsVideo: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.2-contributor-xhigh",
      name: "Muse Spark 1.2 Contributor (xhigh effort)",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsVision: true,
      supportsAudio: true,
      supportsVideo: true,
      targetFormat: "openai-responses",
    },
    // #12674: Muse Spark 1.3 Contributor — base + effort-tier aliases from the
    // OpenCode Go registry (`opencode models opencode-go --refresh --verbose`;
    // exact suffix set: minimal/low/medium/high/xhigh, no max — same as 1.2).
    // Upstream serves Muse Spark only on the Responses API; without
    // targetFormat:"openai-responses" these fall through to /chat/completions
    // and the upstream returns 500 (same class as #12196).
    {
      id: "muse-spark-1.3-contributor",
      name: "Muse Spark 1.3 Contributor",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsVision: true,
      supportsAudio: true,
      supportsVideo: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.3-contributor-minimal",
      name: "Muse Spark 1.3 Contributor (minimal effort)",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsVision: true,
      supportsAudio: true,
      supportsVideo: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.3-contributor-low",
      name: "Muse Spark 1.3 Contributor (low effort)",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsVision: true,
      supportsAudio: true,
      supportsVideo: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.3-contributor-medium",
      name: "Muse Spark 1.3 Contributor (medium effort)",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsVision: true,
      supportsAudio: true,
      supportsVideo: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.3-contributor-high",
      name: "Muse Spark 1.3 Contributor (high effort)",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsVision: true,
      supportsAudio: true,
      supportsVideo: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.3-contributor-xhigh",
      name: "Muse Spark 1.3 Contributor (xhigh effort)",
      contextLength: 1048576,
      maxOutputTokens: 131072,
      supportsReasoning: true,
      supportsVision: true,
      supportsAudio: true,
      supportsVideo: true,
      targetFormat: "openai-responses",
    },
    // #8353: Grok 4.5 + effort tiers from the OpenCode Go registry.
    {
      id: "grok-4.5",
      name: "Grok 4.5",
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high"],
    },
    { id: "grok-4.5-low", name: "Grok 4.5 (low effort)", supportsReasoning: true },
    { id: "grok-4.5-medium", name: "Grok 4.5 (medium effort)", supportsReasoning: true },
    { id: "grok-4.5-high", name: "Grok 4.5 (high effort)", supportsReasoning: true },
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "high", "max"],
      targetFormat: "openai-responses",
    },
    {
      id: "deepseek-v4-flash",
      name: "DeepSeek V4 Flash",
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "high", "max"],
      targetFormat: "openai-responses",
    },
    // Console Go free GLM-tier model (live-verified 2026-08-23): the upstream
    // rejects every reasoning_effort outside {low, high, max} whenever tools
    // are present — "[1210] This model always engages in thinking and cannot
    // be disabled; please use low, high, or max" — which broke clients that
    // default to reasoning_effort:"medium" (Hermes). Declaring the exact
    // vocabulary lets sanitizeReasoningEffortForProvider clamp off-vocabulary
    // requests to the nearest accepted tier instead of burning a 400.
    {
      id: "ox-alpha-free",
      name: "ox-alpha (free)",
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "high", "max"],
    },
  ],
};
