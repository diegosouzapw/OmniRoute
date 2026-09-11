import type { RegistryEntry } from "../../../shared.ts";
import { OPENCODE_ZEN_GO_SHARED_MODELS } from "../../../shared.ts";

export const opencode_zenProvider: RegistryEntry = {
  id: "opencode-zen",
  alias: "opencode-zen",
  format: "openai",
  executor: "opencode",
  baseUrl: "https://opencode.ai/zen/v1",
  modelsUrl: "https://opencode.ai/zen/v1/models",
  authType: "apikey",
  authHeader: "Authorization",
  authPrefix: "Bearer",
  defaultContextLength: 200000,
  // Sync with https://opencode.ai/zen/v1/models — this list is regenerated
  // from the live API response so new models work without a code deploy.
  passthroughModels: true,
  models: [
    // ── Chat / Coding ──────────────────────────────────────────
    // #2900: big-pickle's upstream runs DeepSeek thinking mode — declare the
    // interleaved reasoning_content contract so follow-up/tool-use turns replay
    // it (otherwise DeepSeek returns 400 "reasoning_content ... must be passed back").
    {
      id: "big-pickle",
      name: "Big Pickle",
      supportsReasoning: true,
      interleavedField: "reasoning_content",
    },

    ...OPENCODE_ZEN_GO_SHARED_MODELS,
    // models[0] (big-pickle) is the dashboard default; SHARED spread kept after it.

    { id: "gpt-5.6-sol", name: "GPT 5.6 Sol" },
    { id: "gpt-5.6-terra", name: "GPT 5.6 Terra" },
    { id: "gpt-5.6-luna", name: "GPT 5.6 Luna" },
    { id: "gpt-5.4", name: "GPT 5.4" },
    { id: "gpt-5.4-mini", name: "GPT 5.4 Mini" },
    { id: "gpt-5.4-nano", name: "GPT 5.4 Nano" },
    { id: "gpt-5.3-codex-spark", name: "GPT 5.3 Codex Spark" },
    { id: "gpt-5.1", name: "GPT 5.1" },

    // ── Claude ─────────────────────────────────────────────────
    { id: "claude-fable-5", name: "Claude Fable 5" },
    { id: "claude-opus-5", name: "Claude Opus 5" },
    { id: "claude-sonnet-5", name: "Claude Sonnet 5" },
    { id: "claude-haiku-4-5", name: "Claude Haiku 4.5" },

    // ── Gemini ─────────────────────────────────────────────────
    { id: "gemini-3.7-flash", name: "Gemini 3.7 Flash" },
    { id: "gemini-3.5-flash-lite", name: "Gemini 3.5 Flash Lite" },
    { id: "gemini-3.1-pro", name: "Gemini 3.1 Pro" },
    { id: "gemini-3-flash", name: "Gemini 3 Flash" },

    // ── Grok ───────────────────────────────────────────────────
    { id: "grok-build-0.1", name: "Grok Build 0.1" },
    { id: "grok-4.6", name: "Grok 4.6" },

    // ── Muse ───────────────────────────────────────────────────
    // Muse Spark is served by OpenCode Zen only on the OpenAI Responses API
    // endpoint, not /chat/completions (see the opencode provider's own
    // muse-spark entries, #10874/#10867) — this provider is a separate
    // registry entry for the same upstream and never got the same
    // targetFormat declaration, so requests routed here still hit
    // /chat/completions with a mismatched or unanswerable body and the
    // upstream returns an empty message.
    {
      id: "muse-spark-1.3",
      name: "Muse Spark 1.3",
      supportsReasoning: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.3-contributor-free",
      name: "Muse Spark 1.3 Contributor Free",
      supportsReasoning: true,
      targetFormat: "openai-responses",
    },
    {
      id: "muse-spark-1.2",
      name: "Muse Spark 1.2",
      supportsReasoning: true,
      targetFormat: "openai-responses",
    },
    // Explicit wire-format overlay of the base opencode provider's muse-spark entry
    // (targetFormat: openai-responses). Keep in sync with base on catalog syncs.
    {
      id: "muse-spark-1.2-contributor-free",
      name: "Muse Spark 1.2 Contributor Free",
      supportsReasoning: true,
      targetFormat: "openai-responses",
    },

    // ── DeepSeek ────────────────────────────────────────────────
    // #10788: same tier vocabulary as opencode-go's DeepSeek rows — the Zen
    // upstream accepts the identical effort set on these models.
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "high", "max"],
    },
    {
      id: "deepseek-v4-flash",
      name: "DeepSeek V4 Flash",
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "high", "max"],
    },

    // ── GLM / Z.AI ─────────────────────────────────────────────
    {
      id: "glm-5.2",
      name: "GLM-5.2",
      supportsReasoning: true,
      supportedThinkingEfforts: ["high", "max"],
    },

    // ── MiniMax ────────────────────────────────────────────────
    // #3110: MiniMax M3 — frontier coding model with 1M context
    { id: "minimax-m3", name: "MiniMax M3", contextLength: 1048576, supportsVision: true },

    // ── Kimi / Moonshot ────────────────────────────────────────
    { id: "kimi-k3", name: "Kimi K3", supportsReasoning: true, supportedThinkingEfforts: ["max"] },
    // kimi-k2.7-code declared identically on opencode-go — see OPENCODE_ZEN_GO_SHARED_MODELS.

    // ── Qwen ───────────────────────────────────────────────────
    // Issue #2292: Qwen models return Claude-format SSE bodies even
    // when hitting /chat/completions. targetFormat: "claude" routes
    // through /messages and the Claude translator.
    // Issue #2822: These models are text-only — supportsVision: false
    // ensures combo routing skips them on image-bearing requests.
    // qwen3.5-plus / qwen3.6-plus declared identically on opencode-go — see
    // OPENCODE_ZEN_GO_SHARED_MODELS.

    // ── Free Tier ──────────────────────────────────────────────
    // #6998 (2026-07-14): upstream free tier rotated — minimax-m2.5-free,
    // nemotron-3-super-free and qwen3.6-plus-free were delisted (401).
    // 2026-08-17 sync: north-mini-code-free delisted; nemotron-3.5-lightning-free
    // and laguna-s-2.1-free added.
    { id: "deepseek-v4-flash-free", name: "DeepSeek V4 Flash Free", supportsReasoning: true },
    { id: "mimo-v2.5-free", name: "MiMo V2.5 Free", contextLength: 200000 },
    { id: "hy3-free", name: "HY3 Free", contextLength: 200000 },
    { id: "nemotron-3-ultra-free", name: "Nemotron 3 Ultra Free", contextLength: 1000000 },
    { id: "nemotron-3.5-lightning-free", name: "Nemotron 3.5 Lightning Free" },
    { id: "laguna-s-2.1-free", name: "Laguna S 2.1 Free" },
  ],
};
