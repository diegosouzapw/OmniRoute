// src/lib/playground/types.ts
// Re-exports from codeExport + standalone pricing table

export type {
  PlaygroundEndpoint,
  ExportLanguage,
  ChatMessage,
  ToolDefinition,
  PlaygroundState,
} from "./codeExport";

export { API_KEY_PLACEHOLDER, exportCode, exportAllLanguages, endpointToPath } from "./codeExport";

export type { ImprovePromptRequest, ImprovePromptResult } from "./promptImprover";

export {
  ImprovePromptRequestSchema,
  META_SYSTEM_PROMPT,
  buildImproveChatBody,
  parseImprovedContent,
} from "./promptImprover";

/**
 * Pricing entry for a model.
 * Label "(estimated)" indicates these are approximate values for UI display (D13).
 */
export interface ProviderPricing {
  /** Cost per 1k input tokens in USD. */
  inUsdPer1k: number;
  /** Cost per 1k output tokens in USD. */
  outUsdPer1k: number;
  /** Display label — always includes "(estimated)". */
  label: string;
}

/**
 * Static inline pricing table for popular models.
 * Used in client-side cost estimation (D13).
 * DO NOT use for billing — always labeled "(estimated)".
 *
 * Prices are approximate as of 2025. For real billing see /api/usage.
 */
export const MODEL_PRICING_TABLE: Record<string, ProviderPricing> = {
  "gpt-4o": {
    inUsdPer1k: 0.0025,
    outUsdPer1k: 0.01,
    label: "(estimated)",
  },
  "gpt-4o-mini": {
    inUsdPer1k: 0.00015,
    outUsdPer1k: 0.0006,
    label: "(estimated)",
  },
  "claude-sonnet-4-6": {
    inUsdPer1k: 0.003,
    outUsdPer1k: 0.015,
    label: "(estimated)",
  },
  "claude-opus-4-7": {
    inUsdPer1k: 0.015,
    outUsdPer1k: 0.075,
    label: "(estimated)",
  },
  "claude-haiku-4-5": {
    inUsdPer1k: 0.0008,
    outUsdPer1k: 0.004,
    label: "(estimated)",
  },
  "gemini-2.5-pro": {
    inUsdPer1k: 0.00125,
    outUsdPer1k: 0.01,
    label: "(estimated)",
  },
  "gemini-2.0-flash": {
    inUsdPer1k: 0.0001,
    outUsdPer1k: 0.0004,
    label: "(estimated)",
  },
  "deepseek-chat": {
    inUsdPer1k: 0.00014,
    outUsdPer1k: 0.00028,
    label: "(estimated)",
  },
  "llama-3.3-70b": {
    inUsdPer1k: 0.00059,
    outUsdPer1k: 0.00079,
    label: "(estimated)",
  },
  "mistral-large": {
    inUsdPer1k: 0.002,
    outUsdPer1k: 0.006,
    label: "(estimated)",
  },
};

/**
 * Look up pricing for a model by name.
 * Returns null if not found (use upstream usage data instead).
 */
export function getModelPricing(model: string): ProviderPricing | null {
  return MODEL_PRICING_TABLE[model] ?? null;
}

/**
 * Look up pricing for a model — alias with explicit `estimated: true` in return type.
 * Required by §3 contract: `getProviderPricing(model): { inUsdPer1k, outUsdPer1k, estimated: true } | null`.
 */
