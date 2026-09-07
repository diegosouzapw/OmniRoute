/**
 * Centralized specifications for AI Models.
 * Contains maximum token caps and thinking budgets to prevent API errors
 * when clients request more than the model supports.
 */

export interface ModelSpec {
  maxOutputTokens?: number;
  contextWindow?: number;
  defaultThinkingBudget?: number;
  thinkingBudgetCap?: number;
  thinkingOverhead?: number; // buffer de tokens para thinking
  adaptiveMaxTokens?: number; // tokens disponíveis para output quando thinking ativo
  aliases?: string[]; // IDs alternativos para este modelo
  supportsThinking?: boolean;
  supportsTools?: boolean;
  supportsVision?: boolean;
  supportsAudio?: boolean;
  supportsVideo?: boolean;
  // Model defaults to adaptive thinking and REJECTS an explicit `thinking.type:"disabled"`
  // (upstream returns 400). Used to normalize the request when a combo/route substitutes
  // this model after the client already chose `disabled`. See issue #3554.
  rejectsThinkingDisabled?: boolean;
  // Model ONLY supports adaptive thinking: manual extended thinking was removed. Sending
  // `thinking.type:"enabled"` or any `thinking.budget_tokens` returns HTTP 400; reasoning
  // is steered exclusively by `output_config.effort` (low/medium/high/xhigh/max). True for
  // Claude Opus 4.7 and later (Opus 4.7/4.8/5, Fable 5/5.1). Per Anthropic's migration guide,
  // any request that tries to set a fixed thinking budget gets a 400 error.
  adaptiveThinkingOnly?: boolean;
  // The model rejects tool_choice values that require a tool call. Keep tools available,
  // but normalize a forced choice to the default auto behavior before dispatch. Fable 5.1 always runs
  // adaptive thinking, so forced tool use cannot be combined with any valid request.
  rejectsForcedToolChoice?: boolean;
  // Highest effort accepted while `thinking.type:"disabled"` is present. Claude Opus 5
  // rejects disabled thinking with xhigh/max, while accepting it through high.
  maxEffortWhenThinkingDisabled?: "high";
  // Explicit operator override for the no-thinking gateway alias (Fase 8.1). When unset,
  // the catalog auto-advertises a `no-think/…` variant for
  // Claude-family thinking-capable models that honor `disabled`. Set `true` to force the
  // variant on for any other model, or `false` to suppress it. See open-sse/utils/noThinkingAlias.ts.
  noThinkingAlias?: boolean;
  // Per-model default reasoning effort (#6879). When the incoming request carries no
  // `reasoning_effort` / `reasoning` / `thinking` field of any shape, the resolved
  // upstream model's `defaultReasoningEffort` is injected as `reasoning_effort` on the
  // OpenAI-format dispatch path before the request leaves the gateway. An explicit
  // client value — including one forwarded verbatim through a combo leg — always wins;
  // this is a no-op for it. Unset preserves current behavior (no injection). Lets an
  // operator strip-by-default a thinks-by-default model (measured: gemini-flash-lite
  // burns ~277 reasoning tokens on a plain request; `reasoning_effort:"none"` → 0)
  // without patching every client. See open-sse/services/defaultReasoningEffort.ts.
  defaultReasoningEffort?: "none" | "low" | "medium" | "high";
}

const BEDROCK_CLAUDE_ALIASES = (...modelIds: string[]) => [
  ...new Set(
    modelIds.flatMap((modelId) => [
      modelId,
      `anthropic.${modelId}`,
      `eu.anthropic.${modelId}`,
      `us.anthropic.${modelId}`,
      `global.anthropic.${modelId}`,
      `bedrock/anthropic.${modelId}`,
      `bedrock/eu.anthropic.${modelId}`,
      `bedrock/us.anthropic.${modelId}`,
      `bedrock/global.anthropic.${modelId}`,
    ])
  ),
];

// Provider discovery/sync sources can under-report GLM-5.2 IDs as 128K.
// Keep native/bare Z.AI GLM-5.2 context authoritative, but do not blindly apply
// it to every provider-wrapped alias: hosted providers can and do cap lower.
const AUTHORITATIVE_CONTEXT_WINDOW_MODEL_IDS = new Set([
  "glm-5.3-flash",
  "glm-5.3",
  "glm-5.3-high",
  "glm-5.3-low",
  "glm-5.3-max",
  "glm-5.3-flash",
  "glm-5.3-flash-high",
  "glm-5.3-flash-low",
  "glm-5.3-flash-max",
  "glm-5.2",
  "glm-5.2-high",
  "glm-5.2-max",
]);
const AUTHORITATIVE_PROVIDER_CONTEXT_WINDOWS = new Map<string, number>([
  ["cloudflare-ai/@cf/zai-org/glm-5.2", 262144],
  // Hugging Face Router has 1M-capable backends, but bare routing can select
  // lower-context providers (notably Together at 262K), so advertise a safe floor
  // unless the caller can pin a 1M-capable backend.
  ["huggingface/zai-org/glm-5.2", 262144],
  ["opencode/glm-5.2", 1000000],
  ["opencode-zen/glm-5.2", 1000000],
  ["opencode-go/glm-5.2", 1000000],
  ["zenmux/z-ai/glm-5.2", 1000000],
  ["zenmux/z-ai/glm-5.2-free", 1000000],
]);

const GPT_5_6_MODEL_SPEC = {
  maxOutputTokens: 128000,
  contextWindow: 1050000,
  // Reserve 32K for visible response: thinking + response must both fit
  // under maxOutputTokens. A cap equal to maxOutputTokens leaves zero room
  // for the actual response when thinking consumes the full budget.
  thinkingBudgetCap: 96000,
  supportsThinking: true,
  supportsTools: true,
  supportsVision: true,
} satisfies ModelSpec;

const GEMINI_36_FLASH_MODEL_SPEC = {
  maxOutputTokens: 65536,
  contextWindow: 1048576,
  supportsThinking: false,
  supportsTools: true,
  supportsVision: true,
} satisfies ModelSpec;

export const MODEL_SPECS: Record<string, ModelSpec> = {
  "gpt-5.6": {
    ...GPT_5_6_MODEL_SPEC,
    aliases: ["openai/gpt-5.6"],
  },
  "gpt-5.6-sol": {
    ...GPT_5_6_MODEL_SPEC,
    aliases: ["openai/gpt-5.6-sol"],
  },
  "gpt-5.6-terra": {
    ...GPT_5_6_MODEL_SPEC,
    aliases: ["openai/gpt-5.6-terra"],
  },
  "gpt-5.6-luna": {
    ...GPT_5_6_MODEL_SPEC,
    aliases: ["openai/gpt-5.6-luna"],
  },

  "gpt-5.5": {
    maxOutputTokens: 128000,
    contextWindow: 1050000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },

  "gpt-5.4": {
    maxOutputTokens: 131072,
    contextWindow: 409600,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["openai/gpt-5.4"],
  },

  // ── GPT-4o family ──────────────────────────────────────────────
  "gpt-4o-mini": {
    maxOutputTokens: 16384,
    contextWindow: 128000,
    supportsThinking: false,
    supportsTools: true,
    supportsVision: true,
    aliases: ["openai/gpt-4o-mini"],
  },
  "gpt-4o": {
    maxOutputTokens: 16384,
    contextWindow: 128000,
    supportsThinking: false,
    supportsTools: true,
    supportsVision: true,
    aliases: ["openai/gpt-4o"],
  },

  // ── Gemini 2.5 Flash ─────────────────────────────────────────────
  "gemini-2.5-flash": {
    maxOutputTokens: 65536,
    contextWindow: 1048576,
    // #3842: real Google max thinking budget for 2.5-flash is 24576; declaring the
    // cap makes capThinkingBudget() actually clamp instead of passing values through.
    thinkingBudgetCap: 24576,
    supportsThinking: false,
    supportsTools: true,
    supportsVision: true,
  },
  // ── Gemini 3.7 Flash (current Antigravity/AGY live tiers) ─────────
  // The tier suffix configures the thinking budget passed to the upstream
  // gemini-3.7-flash-tiered backend (high: 24.5k, medium: 8k, low: 1k).
  "gemini-3.7-flash-high": {
    maxOutputTokens: 65536,
    contextWindow: 1048576,
    defaultThinkingBudget: 24576,
    thinkingBudgetCap: 24576,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },
  "gemini-3.7-flash-medium": {
    maxOutputTokens: 65536,
    contextWindow: 1048576,
    defaultThinkingBudget: 8192,
    thinkingBudgetCap: 24576,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },
  "gemini-3.7-flash-low": {
    maxOutputTokens: 65536,
    contextWindow: 1048576,
    defaultThinkingBudget: 1024,
    thinkingBudgetCap: 24576,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },
  "gemini-3.7-flash": {
    maxOutputTokens: 65536,
    contextWindow: 1048576,
    defaultThinkingBudget: 8192,
    thinkingBudgetCap: 24576,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["gemini-3.7-flash-tiered"],
  },
  "gemini-3.7-flash-tiered": {
    maxOutputTokens: 65536,
    contextWindow: 1048576,
    defaultThinkingBudget: 8192,
    thinkingBudgetCap: 24576,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },

  // Provider-neutral compatibility for providers that still serve Gemini 3.6.
  // Antigravity/AGY availability is governed by their own provider catalogs and
  // retirement filters; these shared specs must not be treated as an allowlist.
  "gemini-3.6-flash-high": { ...GEMINI_36_FLASH_MODEL_SPEC },
  "gemini-3.6-flash-medium": { ...GEMINI_36_FLASH_MODEL_SPEC },
  "gemini-3.6-flash-low": { ...GEMINI_36_FLASH_MODEL_SPEC },

  // ── Gemini 3 Flash series ───────────────────────────────────────
  "gemini-3-flash": {
    maxOutputTokens: 65536,
    contextWindow: 1048576,
    defaultThinkingBudget: 0,
    thinkingBudgetCap: 0,
    supportsThinking: false,
    supportsTools: true,
    supportsVision: true,
    aliases: ["gemini-3-flash-preview", "gemini-3.1-flash-lite-preview"],
  },

  // ── Gemini 3.1 Pro ───────────────────────────────────────────────
  "gemini-3.1-pro": {
    maxOutputTokens: 65535,
    contextWindow: 1048576,
    defaultThinkingBudget: 24576,
    thinkingBudgetCap: 32768,
    thinkingOverhead: 1000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: [
      "gemini-pro-agent",
      "gemini-3.1-pro-high",
      "gemini-3-pro-high",
      "gemini-3-pro-preview",
      "gemini-3.1-pro-preview",
      "gemini-3.1-pro-preview-customtools",
    ],
  },

  // ── Gemini 3.1 Pro Low (deprecated, kept for back-compat) ────────
  "gemini-3.1-pro-low": {
    maxOutputTokens: 65535,
    contextWindow: 1048576,
    defaultThinkingBudget: 8192,
    thinkingBudgetCap: 16000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["gemini-3-pro-low"],
  },

  // ── Claude Opus 4.5 ─────────────────────────────────────────────
  "claude-opus-4-5": {
    maxOutputTokens: 32768,
    contextWindow: 200000,
    defaultThinkingBudget: 10000,
    thinkingBudgetCap: 32000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },

  // ── Claude Sonnet 4.5 ───────────────────────────────────────────
  "claude-sonnet-4-5": {
    maxOutputTokens: 64000,
    contextWindow: 200000,
    thinkingBudgetCap: 62000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: BEDROCK_CLAUDE_ALIASES("claude-sonnet-4-5", "claude-sonnet-4-5-20250929"),
  },

  // ── Claude Opus 4.5 (full ID — overrides prefix match on claude-opus-4-5) ──
  "claude-opus-4-5-20251101": {
    maxOutputTokens: 64000,
    contextWindow: 200000,
    defaultThinkingBudget: 10000,
    thinkingBudgetCap: 32000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },

  // ── Claude Sonnet 4.6 ───────────────────────────────────────────
  "claude-sonnet-4-6": {
    maxOutputTokens: 64000,
    contextWindow: 1000000,
    thinkingBudgetCap: 62000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: BEDROCK_CLAUDE_ALIASES("claude-sonnet-4-6", "claude-sonnet-4.6"),
  },

  // ── Claude Sonnet 5 ─────────────────────────────────────────────
  "claude-sonnet-5": {
    // 1M context, 128K max output. Adaptive-thinking-only (manual
    // budget_tokens / thinking.type:"enabled" return 400; effort-steered);
    // unlike Fable 5 it still accepts thinking.type:"disabled".
    maxOutputTokens: 128000,
    contextWindow: 1000000,
    defaultThinkingBudget: 32000,
    thinkingBudgetCap: 120000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    adaptiveThinkingOnly: true,
    aliases: BEDROCK_CLAUDE_ALIASES("claude-sonnet-5"),
  },

  // ── Claude Opus 4.6 ─────────────────────────────────────────────
  "claude-opus-4-6": {
    maxOutputTokens: 128000,
    contextWindow: 1000000,
    // Anthropic accepts thinking.budget_tokens in [1024, 128000]; cap
    // a bit below to leave headroom for the visible response within
    // max_tokens (thinking + response must both fit under max_tokens).
    defaultThinkingBudget: 32000,
    thinkingBudgetCap: 120000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: BEDROCK_CLAUDE_ALIASES("claude-opus-4-6", "claude-opus-4.6"),
  },

  // ── Claude Opus 4.7 ─────────────────────────────────────────────
  "claude-opus-4-7": {
    maxOutputTokens: 128000,
    contextWindow: 1000000,
    // Opus 4.7 removed manual extended thinking: a fixed `thinking.budget_tokens`
    // (or `thinking.type:"enabled"`) returns 400. Reasoning is adaptive-only and
    // steered by `output_config.effort`. defaultThinkingBudget/thinkingBudgetCap
    // are retained only as caps for any legacy budget path; the request flow
    // collapses manual thinking to adaptive before dispatch (see adaptiveThinkingOnly).
    defaultThinkingBudget: 32000,
    thinkingBudgetCap: 120000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    adaptiveThinkingOnly: true,
    aliases: BEDROCK_CLAUDE_ALIASES("claude-opus-4-7", "claude-opus-4.7"),
  },

  // ── Claude Fable 5.1 ────────────────────────────────────────────
  "claude-fable-5-1": {
    maxOutputTokens: 128000,
    contextWindow: 1000000,
    defaultThinkingBudget: 32000,
    thinkingBudgetCap: 120000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    rejectsThinkingDisabled: true,
    adaptiveThinkingOnly: true,
    rejectsForcedToolChoice: true,
    aliases: BEDROCK_CLAUDE_ALIASES("claude-fable-5-1"),
  },

  // ── Claude Fable 5 ──────────────────────────────────────────────
  "claude-fable-5": {
    maxOutputTokens: 128000,
    contextWindow: 1000000,
    defaultThinkingBudget: 32000,
    thinkingBudgetCap: 120000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    // Fable 5 defaults to adaptive thinking and rejects `thinking.type:"disabled"` (#3554).
    rejectsThinkingDisabled: true,
    // …and, like Opus 4.7+, rejects manual budgets/`type:"enabled"` (adaptive-only).
    adaptiveThinkingOnly: true,
    aliases: BEDROCK_CLAUDE_ALIASES("claude-fable-5"),
  },

  // ── Claude Opus 5 ───────────────────────────────────────────────
  "claude-opus-5": {
    maxOutputTokens: 128000,
    contextWindow: 1000000,
    defaultThinkingBudget: 32000,
    thinkingBudgetCap: 120000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    adaptiveThinkingOnly: true,
    maxEffortWhenThinkingDisabled: "high",
    aliases: BEDROCK_CLAUDE_ALIASES("claude-opus-5"),
  },

  // ── Claude Opus 4.8 ─────────────────────────────────────────────
  "claude-opus-4-8": {
    maxOutputTokens: 128000,
    contextWindow: 1000000,
    // Opus 4.8 inherits Opus 4.7's adaptive thinking constraints: no fixed
    // thinking budget requests, with effort controlled by output_config.
    defaultThinkingBudget: 32000,
    thinkingBudgetCap: 120000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    adaptiveThinkingOnly: true,
    aliases: BEDROCK_CLAUDE_ALIASES("claude-opus-4-8", "claude-opus-4.8", "claude-opus-4.8-fast"),
  },

  // ── Claude Sonnet 4.5 ───────────────────────────────────────────
  "claude-sonnet-4-5-20250929": {
    maxOutputTokens: 64000,
    contextWindow: 200000,
    thinkingBudgetCap: 62000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["claude-sonnet-4.5"],
  },

  // ── Claude Haiku 4.5 ────────────────────────────────────────────
  "claude-haiku-4-5-20251001": {
    maxOutputTokens: 64000,
    contextWindow: 200000,
    thinkingBudgetCap: 62000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["claude-haiku-4.5"],
  },

  // ── Kimi K3 (Moonshot API — 1M context/output, native vision) ────
  // `k3` is the Kimi Coding / kimi-coding-apikey wire id (#8250).
  "kimi-k3": {
    maxOutputTokens: 1048576,
    contextWindow: 1048576,
    thinkingBudgetCap: 32768,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["k3"],
  },

  // ── Kimi K2.6 (Moonshot API — 262K native) ──────────────────────
  "kimi-k2.6": {
    maxOutputTokens: 262144,
    contextWindow: 262144,
    thinkingBudgetCap: 32768,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["kimi-k2.6-thinking"],
  },

  // ── Kimi K2.7 Code (Moonshot — 262K native, parity with K2.6) ───
  // #3761: importing this via Ollama Cloud's sparse /v1/models gave it no caps, so it
  // fell back to the 128K/8K defaults and lost vision/thinking. Pin the real values.
  "kimi-k2.7-code": {
    maxOutputTokens: 262144,
    contextWindow: 262144,
    thinkingBudgetCap: 32768,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["kimi-k2.7", "kimi-k2.7-code-thinking", "kimi-k2.7-code-highspeed"],
  },

  // ── Kimi K2.5 (Moonshot — 262K native, parity with K2.6) ────────
  "kimi-k2.5": {
    maxOutputTokens: 262144,
    contextWindow: 262144,
    thinkingBudgetCap: 32768,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["kimi-k2.5-thinking"],
  },

  // ── Qwen3.x Plus / Max (Bailian — multimodal text/image/video, 1M context) ─
  "qwen3-max": {
    maxOutputTokens: 65536,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["qwen3.7-max", "qwen3-max-2026-01-23"],
  },
  "qwen3.8-max-preview": {
    maxOutputTokens: 65536,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["qwen3.8-max"],
  },
  "qwen3.6-plus": {
    maxOutputTokens: 65536,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },
  "qwen3.5-plus": {
    maxOutputTokens: 65536,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },

  // ── Xiaomi MiMo V2.5 (1M context, consensus across 7+ sync sources) ──
  // Vision: ONLY mimo-v2.5 and mimo-v2-omni accept images per Xiaomi's docs
  // (mimo.mi.com .../image-understanding). The *-pro chat models are TEXT-ONLY;
  // models.dev mislabels them (hermes-agent#18884) — a hard override in
  // src/lib/modelCapabilities.ts also beats that wrong synced attachment.
  "mimo-v2.5-pro": {
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    supportsTools: true,
    supportsVision: false,
  },
  "mimo-v2.5": {
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    supportsTools: true,
    supportsVision: true,
  },
  "mimo-v2-pro": {
    maxOutputTokens: 131072,
    contextWindow: 262144,
    supportsTools: true,
    supportsVision: false,
  },
  "mimo-v2-omni": {
    maxOutputTokens: 131072,
    contextWindow: 262144,
    supportsTools: true,
    supportsVision: true,
  },
  "mimo-v2-flash": {
    maxOutputTokens: 65536,
    contextWindow: 262144,
    supportsTools: true,
  },

  // ── Z.AI GLM-5.3 (1M context mirrored from 5.2 — same base model; 128K max
  // output; effort via reasoning_effort param, tiers are OmniRoute aliases) ──
  "glm-5.3-flash": {
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },
  "glm-5.3": {
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
  },
  "glm-5.3-high": {
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
  },
  "glm-5.3-low": {
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
  },
  "glm-5.3-max": {
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
  },
  "glm-5.3-flash-high": {
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },
  "glm-5.3-flash-low": {
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },
  "glm-5.3-flash-max": {
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },

  // ── Z.AI GLM-5.2 (1M context, 128K max output, effort tiers) ────
  "glm-5.2": {
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
  },
  "glm-5.2-high": {
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
  },
  "glm-5.2-max": {
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
  },

  // ── Z.AI GLM-5.x (200K context, 128K max output) ─────────────────
  "glm-5.1": {
    maxOutputTokens: 128000,
    contextWindow: 200000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
  },
  "glm-5": {
    maxOutputTokens: 128000,
    contextWindow: 200000,
    thinkingBudgetCap: 38912,
    supportsThinking: true,
    supportsTools: true,
  },

  // ── MiniMax M3 (1M context, 512K max output) ─────────────────────
  // max output verified against MiniMax docs / OpenRouter / Artificial
  // Analysis (Nov 2025 launch): 1,048,576-token context, up to 512K output.
  "minimax-m3": {
    maxOutputTokens: 512000,
    contextWindow: 1048576,
    thinkingBudgetCap: 32768,
    supportsThinking: true,
    supportsTools: true,
    aliases: ["MiniMax-M3", "MiniMaxAI/MiniMax-M3"],
  },

  // ── MiniMax M2.x (200K context family) ───────────────────────────
  "minimax-m2.7": {
    maxOutputTokens: 131072,
    contextWindow: 204800,
    thinkingBudgetCap: 32768,
    supportsThinking: true,
    supportsTools: true,
    aliases: ["MiniMax-M2.7", "MiniMaxAI/MiniMax-M2.7"],
  },
  "minimax-m2.5": {
    maxOutputTokens: 131072,
    contextWindow: 200000,
    thinkingBudgetCap: 32768,
    supportsThinking: true,
    supportsTools: true,
    aliases: ["MiniMax-M2.5"],
  },

  // ── DeepSeek V4 (1M context, 384K max output) ────────────────────
  "deepseek-v4-pro": {
    maxOutputTokens: 384000,
    contextWindow: 1000000,
    // Reserve 4K for visible response: thinking + response must both fit
    // under maxOutputTokens. A cap equal to maxOutputTokens leaves zero room
    // for the actual response when thinking consumes the full budget.
    thinkingBudgetCap: 380000,
    supportsThinking: true,
    supportsTools: true,
  },
  "deepseek-v4-flash": {
    maxOutputTokens: 384000,
    contextWindow: 1000000,
    thinkingBudgetCap: 380000,
    supportsThinking: true,
    supportsTools: true,
  },

  // ── Tencent Hunyuan 3 Preview ────────────────────────────────────
  "hy3-preview": {
    maxOutputTokens: 262144,
    contextWindow: 262144,
    thinkingBudgetCap: 32768,
    supportsThinking: true,
    supportsTools: true,
  },

  // Defaults
  __default__: {},
};

// #8697-adjacent: getCanonicalModelSpecId() re-scanned Object.keys/entries(MODEL_SPECS)
// up to 3 times per call (exact ci, alias ci, prefix) — the top hotspot in a full
// catalog-rebuild profile once the pricing-path bottlenecks were fixed. MODEL_SPECS is
// a static module constant (never mutated at runtime), so the lowercase index below is
// built once, lazily, on first use and never invalidated. Iteration order for the
// prefix-match candidates is preserved exactly (same Object.keys() insertion order) so
// resolution outcomes for ambiguous prefixes are unchanged.
let modelSpecIndex: {
  exactCi: Map<string, string>;
  aliasCi: Map<string, string>;
  aliasExact: Map<string, string>;
  prefixCandidates: Array<[lowerKey: string, canonical: string]>;
} | null = null;

function getModelSpecIndex() {
  if (modelSpecIndex) return modelSpecIndex;
  const exactCi = new Map<string, string>();
  const aliasCi = new Map<string, string>();
  const aliasExact = new Map<string, string>();
  const prefixCandidates: Array<[string, string]> = [];
  for (const [canonical, spec] of Object.entries(MODEL_SPECS)) {
    const lowerCanonical = canonical.toLowerCase();
    if (!exactCi.has(lowerCanonical)) exactCi.set(lowerCanonical, canonical);
    for (const alias of spec.aliases || []) {
      const lowerAlias = alias.toLowerCase();
      if (!aliasCi.has(lowerAlias)) aliasCi.set(lowerAlias, canonical);
      if (!aliasExact.has(alias)) aliasExact.set(alias, canonical);
    }
    if (canonical !== "__default__") prefixCandidates.push([lowerCanonical, canonical]);
  }
  modelSpecIndex = { exactCi, aliasCi, aliasExact, prefixCandidates };
  return modelSpecIndex;
}

/**
 * Exact + alias case-insensitive lookup only (no prefix phase) — shared by
 * modelCapabilities.ts's getStaticSpecCanonicalModelId(), which tries multiple id
 * candidates and never wanted prefix matching. Reuses the same lazy index as
 * getCanonicalModelSpecId() below instead of each caller maintaining its own cache
 * over the same static MODEL_SPECS table.
 *
 * Contract: returns `null` for `__default__` (never a real canonical id), for an
 * unrecognized `modelId`, or for an empty string. Matching is case-insensitive on
 * both the canonical id and its aliases; there is no prefix-matching phase (unlike
 * getCanonicalModelSpecId() below) — callers that need prefix matching should use
 * that function instead.
 */
export function findModelSpecIdByExactOrAlias(modelId: string): string | null {
  const lower = modelId.toLowerCase();
  const index = getModelSpecIndex();
  const exactHit = index.exactCi.get(lower);
  if (exactHit && exactHit !== "__default__") return exactHit;
  const aliasHit = index.aliasCi.get(lower);
  if (aliasHit && aliasHit !== "__default__") return aliasHit;
  return null;
}

export function getCanonicalModelSpecId(modelId: string): string | null {
  if (MODEL_SPECS[modelId]) return modelId;

  // Case-insensitive lookups: upstream model ids are often capitalized
  // (e.g. "MiniMax-M2.7") while specs/aliases use lowercase ids (#3141).
  const lower = modelId.toLowerCase();
  const index = getModelSpecIndex();

  // Exact match (case-insensitive)
  const exactHit = index.exactCi.get(lower);
  if (exactHit) return exactHit;

  // Buscas por alias (case-insensitive)
  const aliasHit = index.aliasCi.get(lower);
  if (aliasHit) return aliasHit;

  // Prefix matching (case-insensitive) — same insertion-order iteration as before,
  // first match wins.
  for (const [lowerKey, canonical] of index.prefixCandidates) {
    if (lower.startsWith(lowerKey)) return canonical;
  }

  return null;
}

export function getModelSpec(modelId: string): ModelSpec | undefined {
  const canonical = getCanonicalModelSpecId(modelId);
  return canonical ? MODEL_SPECS[canonical] : undefined;
}

export function getAuthoritativeContextWindow(modelId: string | null | undefined): number | null {
  if (typeof modelId !== "string" || modelId.length === 0) return null;
  const normalized = modelId.toLowerCase();
  for (const canonical of AUTHORITATIVE_CONTEXT_WINDOW_MODEL_IDS) {
    if (canonical.toLowerCase() === normalized)
      return MODEL_SPECS[canonical]?.contextWindow ?? null;
  }
  return null;
}

export function getAuthoritativeProviderContextWindow(
  provider: string | null | undefined,
  modelId: string | null | undefined
): number | null {
  if (typeof provider !== "string" || typeof modelId !== "string") return null;
  const key = `${provider}/${modelId}`.toLowerCase();
  return AUTHORITATIVE_PROVIDER_CONTEXT_WINDOWS.get(key) ?? null;
}

/**
 * Normalize a request's `thinking` field against the (possibly combo-substituted) target model.
 *
 * A combo/route can swap the upstream model AFTER the client already chose its `thinking`
 * value. Claude Code sends `thinking:{type:"disabled"}` for internal title/name-generation
 * calls — valid for opus/sonnet, but claude-fable-5 defaults to adaptive thinking and rejects
 * `type:"disabled"` with an upstream 400. When the resolved target model is flagged
 * `rejectsThinkingDisabled`, drop the now-invalid `thinking` so the model uses its adaptive
 * default instead of hard-failing. Models that accept `disabled` are left untouched, and any
 * non-`disabled` thinking (enabled/adaptive) is always preserved. See issue #3554.
 */
export function normalizeThinkingForModel<T extends Record<string, unknown>>(
  body: T,
  modelId: string
): T {
  const thinking = body?.thinking as Record<string, unknown> | undefined;
  if (
    thinking &&
    typeof thinking === "object" &&
    thinking.type === "disabled" &&
    getModelSpec(modelId)?.rejectsThinkingDisabled
  ) {
    const { thinking: _omitted, ...rest } = body as Record<string, unknown>;
    return normalizeForcedToolChoiceForModel(rest as T, modelId);
  }
  return normalizeForcedToolChoiceForModel(body, modelId);
}

/**
 * Normalize tool-choice constraints that a resolved model cannot accept.
 *
 * Claude Fable 5.1 always uses adaptive thinking and rejects tool choices that force
 * either any tool or one named tool. Preserve the declared tools and every unrelated
 * request field, but drop the choice to select the default `auto` behavior so routing a
 * request to Fable 5.1 does not turn a recoverable preference into an upstream 400.
 */
export function normalizeForcedToolChoiceForModel<T extends Record<string, unknown>>(
  body: T,
  modelId: string
): T {
  if (!getModelSpec(modelId)?.rejectsForcedToolChoice) return body;

  const toolChoice = body.tool_choice;
  const forced =
    toolChoice === "required" ||
    toolChoice === "any" ||
    (toolChoice !== null &&
      typeof toolChoice === "object" &&
      !Array.isArray(toolChoice) &&
      ["any", "tool", "function"].includes(
        String((toolChoice as Record<string, unknown>).type || "").toLowerCase()
      ));
  if (!forced) return body;

  const { tool_choice: _omitted, ...rest } = body;
  return rest as T;
}

export function capMaxOutputTokens(modelId: string, requested?: number): number | undefined {
  const spec = getModelSpec(modelId);
  const cap = spec?.maxOutputTokens;
  const hasRequested = typeof requested === "number" && Number.isFinite(requested);
  if (typeof cap !== "number") return hasRequested ? requested : undefined;
  return hasRequested ? Math.min(requested, cap) : cap;
}

export function getDefaultThinkingBudget(modelId: string): number {
  return getModelSpec(modelId)?.defaultThinkingBudget ?? 0;
}

/**
 * True when the resolved model only supports adaptive thinking and rejects manual
 * extended thinking. For these models (Claude Opus 4.7+/Fable 5) a `thinking.type:"enabled"`
 * or any `thinking.budget_tokens` is a hard 400 — reasoning must be steered via
 * `output_config.effort`. Used by the request flow to collapse manual thinking to
 * `{type:"adaptive"}` before dispatch. Matches dated/Bedrock aliases via getModelSpec.
 */
export function isAdaptiveThinkingOnly(modelId: string | null | undefined): boolean {
  if (typeof modelId !== "string" || modelId.length === 0) return false;
  return getModelSpec(modelId)?.adaptiveThinkingOnly === true;
}

export function getMaxEffortWhenThinkingDisabled(
  modelId: string | null | undefined
): "high" | null {
  if (typeof modelId !== "string" || modelId.length === 0) return null;
  return getModelSpec(modelId)?.maxEffortWhenThinkingDisabled ?? null;
}

export function capThinkingBudget(modelId: string, budget: number): number {
  const cap = getModelSpec(modelId)?.thinkingBudgetCap ?? budget;
  return Math.min(budget, cap);
}

// #8697-adjacent: rescanned Object.entries(MODEL_SPECS) on every call, unconditionally
// once per model in a catalog rebuild — verified 1:1 call ratio (no early
// short-circuit). Case-sensitive exact match (Array.includes(), no .toLowerCase()) —
// deliberately NOT reusing the case-insensitive aliasCi index above, which would
// silently broaden matches and change behavior.
export function resolveModelAlias(modelId: string): string {
  const hit = getModelSpecIndex().aliasExact.get(modelId);
  return hit ?? modelId;
}
