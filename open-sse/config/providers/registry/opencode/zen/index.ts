import type { RegistryEntry } from "../../../shared.ts";

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
    { id: "gpt-5-nano", name: "GPT 5 Nano", contextLength: 400000 },
    { id: "gpt-5", name: "GPT 5" },
    { id: "gpt-5-codex", name: "GPT 5 Codex" },
    { id: "gpt-5.1", name: "GPT 5.1" },
    { id: "gpt-5.1-codex", name: "GPT 5.1 Codex" },
    { id: "gpt-5.1-codex-max", name: "GPT 5.1 Codex Max" },
    { id: "gpt-5.1-codex-mini", name: "GPT 5.1 Codex Mini" },
    { id: "gpt-5.2", name: "GPT 5.2" },
    { id: "gpt-5.2-codex", name: "GPT 5.2 Codex" },
    { id: "gpt-5.3-codex", name: "GPT 5.3 Codex" },
    { id: "gpt-5.3-codex-spark", name: "GPT 5.3 Codex Spark" },
    { id: "gpt-5.4", name: "GPT 5.4" },
    { id: "gpt-5.4-mini", name: "GPT 5.4 Mini" },
    { id: "gpt-5.4-nano", name: "GPT 5.4 Nano" },
    { id: "gpt-5.4-pro", name: "GPT 5.4 Pro" },
    { id: "gpt-5.5", name: "GPT 5.5" },
    { id: "gpt-5.5-pro", name: "GPT 5.5 Pro" },

    // ── Claude ─────────────────────────────────────────────────
    { id: "claude-haiku-4-5", name: "Claude Haiku 4.5" },
    { id: "claude-sonnet-4", name: "Claude Sonnet 4" },
    { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5" },
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6" },
    { id: "claude-opus-4-1", name: "Claude Opus 4.1" },
    { id: "claude-opus-4-5", name: "Claude Opus 4.5" },
    { id: "claude-opus-4-6", name: "Claude Opus 4.6" },
    { id: "claude-opus-4-7", name: "Claude Opus 4.7" },

    // ── Gemini ─────────────────────────────────────────────────
    { id: "gemini-3-flash", name: "Gemini 3 Flash" },
    { id: "gemini-3.1-pro", name: "Gemini 3.1 Pro" },
    { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash" },

    // ── Grok ───────────────────────────────────────────────────
    { id: "grok-build-0.1", name: "Grok Build 0.1" },

    // ── GLM / Z.AI ─────────────────────────────────────────────
    { id: "glm-5", name: "GLM-5" },
    { id: "glm-5.1", name: "GLM-5.1" },

    // ── MiniMax ────────────────────────────────────────────────
    // #3110: MiniMax M3 — frontier coding model with 1M context
    { id: "minimax-m3", name: "MiniMax M3", contextLength: 1048576, supportsVision: true },
    { id: "minimax-m2.5", name: "MiniMax M2.5" },
    { id: "minimax-m2.7", name: "MiniMax M2.7" },

    // ── Kimi / Moonshot ────────────────────────────────────────
    { id: "kimi-k2.5", name: "Kimi K2.5" },
    { id: "kimi-k2.6", name: "Kimi K2.6" },

    // ── Qwen ───────────────────────────────────────────────────
    // Issue #2292: Qwen models return Claude-format SSE bodies even
    // when hitting /chat/completions. targetFormat: "claude" routes
    // through /messages and the Claude translator.
    // Issue #2822: These models are text-only — supportsVision: false
    // ensures combo routing skips them on image-bearing requests.
    { id: "qwen3.5-plus", name: "Qwen3.5 Plus", targetFormat: "claude", supportsVision: false },
    { id: "qwen3.6-plus", name: "Qwen3.6 Plus", targetFormat: "claude", supportsVision: false },

    // ── Free Tier ──────────────────────────────────────────────
    { id: "deepseek-v4-flash-free", name: "DeepSeek V4 Flash Free", supportsReasoning: true },
    { id: "minimax-m2.5-free", name: "MiniMax M2.5 Free", contextLength: 204800 },
    { id: "nemotron-3-super-free", name: "Nemotron 3 Super Free", contextLength: 1000000 },
    {
      id: "qwen3.6-plus-free",
      name: "Qwen3.6 Plus Free",
      targetFormat: "claude",
      contextLength: 200000,
    },
  ],
};
