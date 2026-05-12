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
}

export const MODEL_SPECS: Record<string, ModelSpec> = {
  "gpt-5.5": {
    maxOutputTokens: 128000,
    contextWindow: 1050000,
    supportsThinking: true,
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

  // ── Gemini 3.1 Pro High ─────────────────────────────────────────
  "gemini-3.1-pro-high": {
    maxOutputTokens: 65535,
    contextWindow: 1048576,
    defaultThinkingBudget: 24576,
    thinkingBudgetCap: 32768,
    thinkingOverhead: 1000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: [
      "gemini-3-pro-high",
      "gemini-3-pro-preview",
      "gemini-3.1-pro-preview",
      "gemini-3.1-pro-preview-customtools",
    ],
  },

  // ── Gemini 3.1 Pro Low ──────────────────────────────────────────
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

  // ── Claude Opus 4.6 (1M context tier) ───────────────────────────
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
    aliases: ["claude-opus-4.6"],
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
    aliases: ["claude-opus-4.7"],
  },

  // ── Claude Sonnet 4.6 ───────────────────────────────────────────
  "claude-sonnet-4-6": {
    maxOutputTokens: 64000,
    contextWindow: 200000,
    // ~94% of maxOutputTokens, mirroring the Opus 4.5 ratio (32000 / 32768).
    defaultThinkingBudget: 16000,
    thinkingBudgetCap: 60000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["claude-sonnet-4.6"],
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
    aliases: ["kimi-k2.6-thinking", "kimi-for-coding"],
  },

  // ── Xiaomi MiMo V2.5 (1M context, consensus across 7+ sync sources) ──
  "mimo-v2.5-pro": {
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    supportsTools: true,
  },
  "mimo-v2.5": {
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    supportsTools: true,
  },
  "mimo-v2-omni": {
    maxOutputTokens: 131072,
    contextWindow: 262144,
    supportsTools: true,
  },
  "mimo-v2-flash": {
    maxOutputTokens: 65536,
    contextWindow: 262144,
    supportsTools: true,
  },

  // Defaults
  __default__: {
    maxOutputTokens: 8192,
  },
};

export function getModelSpec(modelId: string): ModelSpec | undefined {
  if (MODEL_SPECS[modelId]) return MODEL_SPECS[modelId];

  // Buscas por alias
  for (const [canonical, spec] of Object.entries(MODEL_SPECS)) {
    if (spec.aliases?.includes(modelId)) return spec;
  }

  // Prefix matching
  for (const [key, spec] of Object.entries(MODEL_SPECS)) {
    if (key !== "__default__" && modelId.startsWith(key)) return spec;
  }

  return undefined;
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
