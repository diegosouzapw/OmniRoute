/**
 * Centralized specifications for AI Models.
 * Contains maximum token caps and thinking budgets to prevent API errors
 * when clients request more than the model supports.
 */

export interface ModelSpec {
  maxOutputTokens: number;
  contextWindow?: number;
  defaultThinkingBudget?: number;
  thinkingBudgetCap?: number;
  thinkingOverhead?: number; // buffer de tokens para thinking
  adaptiveMaxTokens?: number; // tokens disponíveis para output quando thinking ativo
  aliases?: string[]; // IDs alternativos para este modelo
  supportsThinking?: boolean;
  supportsTools?: boolean;
  supportsVision?: boolean;
  // Model defaults to adaptive thinking and REJECTS an explicit `thinking.type:"disabled"`
  // (upstream returns 400). Used to normalize the request when a combo/route substitutes
  // this model after the client already chose `disabled`. See issue #3554.
  rejectsThinkingDisabled?: boolean;
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

export const MODEL_SPECS: Record<string, ModelSpec> = {
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

  // ── Gemini 2.5 and 3.5 Flash series ──────────────────────────────
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
  "gemini-3.5-flash-low": {
    maxOutputTokens: 65536,
    contextWindow: 1048576,
    supportsThinking: false,
    supportsTools: true,
    supportsVision: true,
  },

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

  // ── Gemini 3.5 Flash ─────────────────────────────────────────────
  "gemini-3.5-flash": {
    maxOutputTokens: 65536,
    contextWindow: 1048576,
    supportsThinking: false,
    supportsTools: true,
    supportsVision: true,
    aliases: ["gemini-3.5-flash-high"],
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
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: BEDROCK_CLAUDE_ALIASES("claude-sonnet-4-6", "claude-sonnet-4.6"),
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
    // Anthropic accepts thinking.budget_tokens in [1024, 128000]; cap
    // a bit below to leave headroom for the visible response within
    // max_tokens. Without this cap, adaptive scaling on top of an
    // `output_config.effort=max` request can push past 128000 and
    // trigger a 400 "budget out of range" from Anthropic.
    defaultThinkingBudget: 32000,
    thinkingBudgetCap: 120000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: BEDROCK_CLAUDE_ALIASES("claude-opus-4-7", "claude-opus-4.7"),
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
    aliases: BEDROCK_CLAUDE_ALIASES("claude-fable-5"),
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
    aliases: BEDROCK_CLAUDE_ALIASES("claude-opus-4-8", "claude-opus-4.8"),
  },

  // ── Claude Sonnet 4.5 ───────────────────────────────────────────
  "claude-sonnet-4-5-20250929": {
    maxOutputTokens: 64000,
    contextWindow: 200000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["claude-sonnet-4.5"],
  },

  // ── Claude Haiku 4.5 ────────────────────────────────────────────
  "claude-haiku-4-5-20251001": {
    maxOutputTokens: 64000,
    contextWindow: 200000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["claude-haiku-4.5"],
  },

  // ── Kimi K2.6 (Moonshot Kimi Code OAuth — 262K native) ──────────
  "kimi-k2.6": {
    maxOutputTokens: 262144,
    contextWindow: 262144,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["kimi-k2.6-thinking", "kimi-for-coding"],
  },

  // ── Kimi K2.7 Code (Moonshot — 262K native, parity with K2.6) ───
  // #3761: importing this via Ollama Cloud's sparse /v1/models gave it no caps, so it
  // fell back to the 128K/8K defaults and lost vision/thinking. Pin the real values.
  "kimi-k2.7-code": {
    maxOutputTokens: 262144,
    contextWindow: 262144,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["kimi-k2.7", "kimi-k2.7-code-thinking"],
  },

  // ── Kimi K2.5 (Moonshot — 262K native, parity with K2.6) ────────
  "kimi-k2.5": {
    maxOutputTokens: 262144,
    contextWindow: 262144,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["kimi-k2.5-thinking"],
  },

  // ── Qwen3.x Plus / Max (Bailian — multimodal text/image/video, 1M context) ─
  "qwen3-max": {
    maxOutputTokens: 65536,
    contextWindow: 1000000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["qwen3.7-max", "qwen3-max-2026-01-23"],
  },
  "qwen3.6-plus": {
    maxOutputTokens: 65536,
    contextWindow: 1000000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },
  "qwen3.5-plus": {
    maxOutputTokens: 65536,
    contextWindow: 1000000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
  },

  // ── Xiaomi MiMo V2.5 (1M context, consensus across 7+ sync sources) ──
  "mimo-v2.5-pro": {
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    supportsTools: true,
    supportsVision: true,
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
    supportsVision: true,
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

  // ── Z.AI GLM-5.x (200K context, 128K max output) ─────────────────
  "glm-5.1": {
    maxOutputTokens: 128000,
    contextWindow: 200000,
    supportsThinking: true,
    supportsTools: true,
  },
  "glm-5": {
    maxOutputTokens: 128000,
    contextWindow: 200000,
    supportsThinking: true,
    supportsTools: true,
  },

  // ── MiniMax M3 (1M context, 512K max output) ─────────────────────
  // max output verified against MiniMax docs / OpenRouter / Artificial
  // Analysis (Nov 2025 launch): 1,048,576-token context, up to 512K output.
  "minimax-m3": {
    maxOutputTokens: 512000,
    contextWindow: 1048576,
    supportsThinking: true,
    supportsTools: true,
    aliases: ["MiniMax-M3", "MiniMaxAI/MiniMax-M3"],
  },

  // ── MiniMax M2.x (200K context family) ───────────────────────────
  "minimax-m2.7": {
    maxOutputTokens: 131072,
    contextWindow: 204800,
    supportsThinking: true,
    supportsTools: true,
    aliases: ["MiniMax-M2.7", "MiniMaxAI/MiniMax-M2.7"],
  },
  "minimax-m2.5": {
    maxOutputTokens: 131072,
    contextWindow: 200000,
    supportsThinking: true,
    supportsTools: true,
    aliases: ["MiniMax-M2.5"],
  },

  // ── DeepSeek V4 (1M context, 384K max output) ────────────────────
  "deepseek-v4-pro": {
    maxOutputTokens: 384000,
    contextWindow: 1000000,
    supportsThinking: true,
    supportsTools: true,
  },
  "deepseek-v4-flash": {
    maxOutputTokens: 384000,
    contextWindow: 1000000,
    supportsThinking: true,
    supportsTools: true,
  },

  // ── Tencent Hunyuan 3 Preview ────────────────────────────────────
  "hy3-preview": {
    maxOutputTokens: 262144,
    contextWindow: 262144,
    supportsThinking: true,
    supportsTools: true,
  },

  // Defaults
  __default__: {
    maxOutputTokens: 8192,
  },
};

export function getModelSpec(modelId: string): ModelSpec | undefined {
  if (MODEL_SPECS[modelId]) return MODEL_SPECS[modelId];

  // Case-insensitive lookups: upstream model ids are often capitalized
  // (e.g. "MiniMax-M2.7") while specs/aliases use lowercase ids (#3141).
  const lower = modelId.toLowerCase();

  // Exact match (case-insensitive)
  for (const [canonical, spec] of Object.entries(MODEL_SPECS)) {
    if (canonical.toLowerCase() === lower) return spec;
  }

  // Buscas por alias (case-insensitive)
  for (const [, spec] of Object.entries(MODEL_SPECS)) {
    if (spec.aliases?.some((alias) => alias.toLowerCase() === lower)) return spec;
  }

  // Prefix matching (case-insensitive)
  for (const [key, spec] of Object.entries(MODEL_SPECS)) {
    if (key !== "__default__" && lower.startsWith(key.toLowerCase())) return spec;
  }

  return undefined;
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
    return rest as T;
  }
  return body;
}

export function capMaxOutputTokens(modelId: string, requested?: number): number {
  const spec = getModelSpec(modelId);
  const cap = spec?.maxOutputTokens ?? MODEL_SPECS.__default__.maxOutputTokens;
  return requested ? Math.min(requested, cap) : cap;
}

export function getDefaultThinkingBudget(modelId: string): number {
  return getModelSpec(modelId)?.defaultThinkingBudget ?? 0;
}

export function capThinkingBudget(modelId: string, budget: number): number {
  const cap = getModelSpec(modelId)?.thinkingBudgetCap ?? budget;
  return Math.min(budget, cap);
}

export function resolveModelAlias(modelId: string): string {
  for (const [canonical, spec] of Object.entries(MODEL_SPECS)) {
    if (spec.aliases?.includes(modelId)) return canonical;
  }
  return modelId;
}
