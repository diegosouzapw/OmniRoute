import { DEFAULT_PRICING } from "./pricing/default-pricing";

export { DEFAULT_PRICING } from "./pricing/default-pricing";
// Default pricing rates for AI models
// All rates are in dollars per million tokens ($/1M tokens)
// Based on user-provided pricing for Antigravity models and industry standards for others

// Shared pricing constants to reduce duplication

type ProviderPricingTable = Record<string, Record<string, unknown>>;
type PricingRow = {
  input: number;
  output: number;
  cached?: number;
  reasoning?: number;
  cache_creation?: number;
};
type TokenUsage = Record<string, number | undefined>;

/**
 * Get pricing for a specific provider and model
 * @param {string} provider - Provider ID (e.g., "openai", "cc", "gemini-cli")
 * @param {string} model - Model ID
 * @returns {object|null} Pricing object or null if not found
 */
export function getPricingForModel(
  provider: string,
  model: string
): Record<string, unknown> | null {
  if (!provider || !model) return null;

  const providerPricing = (DEFAULT_PRICING as ProviderPricingTable)[provider];
  if (!providerPricing) return null;

  const modelPricing = providerPricing[model];
  if (!modelPricing || typeof modelPricing !== "object") return null;
  return modelPricing as Record<string, unknown>;
}

/**
 * Get all pricing data
 * @returns {object} All default pricing
 */
export function getDefaultPricing() {
  return DEFAULT_PRICING;
}

export { formatCost } from "../utils/formatting";
