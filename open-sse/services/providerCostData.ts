import type { TierAssignment } from "./tierTypes";
import type { TierConfig } from "./tierTypes";

export interface ModelPricing {
  inputCostPer1M: number;
  outputCostPer1M: number;
  isFree: boolean;
  freeQuotaLimit?: number;
}

export const KNOWN_MODEL_PRICING: Record<string, ModelPricing> = {
  "gpt-4o": { inputCostPer1M: 2.5, outputCostPer1M: 10.0, isFree: false },
  "gpt-4o-mini": { inputCostPer1M: 0.15, outputCostPer1M: 0.6, isFree: false },
  "claude-opus-4-7": { inputCostPer1M: 15.0, outputCostPer1M: 75.0, isFree: false },
  "claude-sonnet-4-6": { inputCostPer1M: 3.0, outputCostPer1M: 15.0, isFree: false },
  "claude-haiku-4-5": { inputCostPer1M: 0.8, outputCostPer1M: 4.0, isFree: false },
  "gemini-2.5-flash": { inputCostPer1M: 0.15, outputCostPer1M: 0.6, isFree: false },
  "gemini-2.5-pro": { inputCostPer1M: 1.25, outputCostPer1M: 5.0, isFree: false },
  "deepseek-chat": { inputCostPer1M: 0.27, outputCostPer1M: 1.1, isFree: false },
  "deepseek-reasoner": { inputCostPer1M: 0.55, outputCostPer1M: 2.19, isFree: false },
  "glm-4.7": { inputCostPer1M: 0.6, outputCostPer1M: 0.6, isFree: false },
  "glm-5.1": { inputCostPer1M: 0.5, outputCostPer1M: 0.5, isFree: false },
  "minimax-m2.1": { inputCostPer1M: 0.2, outputCostPer1M: 0.2, isFree: false },
  "grok-4-fast": { inputCostPer1M: 0.2, outputCostPer1M: 0.5, isFree: false },
  "kimi-k2-thinking": { inputCostPer1M: 0, outputCostPer1M: 0, isFree: true },
  "qwen3-coder-plus": { inputCostPer1M: 0, outputCostPer1M: 0, isFree: true },
  "longcat-flash-lite": {
    inputCostPer1M: 0,
    outputCostPer1M: 0,
    isFree: true,
    freeQuotaLimit: 50000000,
  },
};

export function getModelPricing(provider: string, model: string): ModelPricing {
  const directKey = model.toLowerCase();
  if (KNOWN_MODEL_PRICING[directKey]) {
    return KNOWN_MODEL_PRICING[directKey];
  }
  const providerKey = `${provider}/${model}`.toLowerCase();
  if (KNOWN_MODEL_PRICING[providerKey]) {
    return KNOWN_MODEL_PRICING[providerKey];
  }
  return { inputCostPer1M: 5.0, outputCostPer1M: 15.0, isFree: false };
}

export function isExplicitlyFree(provider: string, config: TierConfig): boolean {
  return config.freeProviders.includes(provider.toLowerCase());
}
