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
 * @param {string} provider - Provider ID (e.g., "openai", "cc", "antigravity")
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

/**
 * Calculate cost from tokens and pricing
 * @param {object} tokens - Token counts
 * @param {object} pricing - Pricing object
 * @returns {number} Cost in dollars
 */
export function calculateCostFromTokens(
  tokens: TokenUsage | null | undefined,
  pricing: PricingRow | null | undefined
): number {
  if (!tokens || !pricing) return 0;

  let cost = 0;

  // Input tokens (non-cached)
  const inputTokens = tokens.prompt_tokens || tokens.input_tokens || 0;
  const cachedTokens = tokens.cached_tokens || tokens.cache_read_input_tokens || 0;
  const nonCachedInput = Math.max(0, inputTokens - cachedTokens);

  cost += nonCachedInput * (pricing.input / 1000000);

  // Cached tokens
  if (cachedTokens > 0) {
    const cachedRate = pricing.cached || pricing.input; // Fallback to input rate
    cost += cachedTokens * (cachedRate / 1000000);
  }

  // Output tokens
  const outputTokens = tokens.completion_tokens || tokens.output_tokens || 0;
  cost += outputTokens * (pricing.output / 1000000);

  // Reasoning tokens
  const reasoningTokens = tokens.reasoning_tokens || 0;
  if (reasoningTokens > 0) {
    const reasoningRate = pricing.reasoning || pricing.output; // Fallback to output rate
    cost += reasoningTokens * (reasoningRate / 1000000);
  }

  // Cache creation tokens
  const cacheCreationTokens = tokens.cache_creation_input_tokens || 0;
  if (cacheCreationTokens > 0) {
    const cacheCreationRate = pricing.cache_creation || pricing.input; // Fallback to input rate
    cost += cacheCreationTokens * (cacheCreationRate / 1000000);
  }

  return cost;
}
