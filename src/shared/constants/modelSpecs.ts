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
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    defaultThinkingBudget: 24576,
    thinkingBudgetCap: 32768,
    thinkingOverhead: 1000,
    supportsThinking: true,
    supportsTools: true,
    supportsVision: true,
    aliases: ["gemini-3-pro-high", "gemini-3.1-pro-preview", "gemini-3.1-pro-preview-customtools"],
  },

  // ── Gemini 3.1 Pro Low ──────────────────────────────────────────
  "gemini-3.1-pro-low": {
    maxOutputTokens: 131072,
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
