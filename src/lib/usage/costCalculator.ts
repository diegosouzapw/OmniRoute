/**
 * Cost Calculator — extracted from usageDb.js (T-15)
 *
 * Pure function for calculating request cost based on model pricing.
 * No DB interaction — pricing is fetched from localDb.
 *
 * @module lib/usage/costCalculator
 */

/**
 * Normalize model name — strip provider path prefixes.
 * Examples:
 *   "openai/gpt-oss-120b" → "gpt-oss-120b"
 *   "accounts/fireworks/models/gpt-oss-120b" → "gpt-oss-120b"
 *   "deepseek-ai/DeepSeek-R1" → "DeepSeek-R1"
 *   "gpt-oss-120b" → "gpt-oss-120b" (no-op)
 *
 */
export function normalizeModelName(model: string): string {
  if (!model || !model.includes("/")) return model;
  const parts = model.split("/");
  return parts[parts.length - 1];
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

/**
 * Calculate cost for a usage entry.
 *
 * @param {string} provider
 * @param {string} model
 * @param {Object} tokens
 * @returns {Promise<number>} Cost in USD
 */
/**
 * Compute cost synchronously from a pre-fetched pricing record.
 * Use this when pricing has already been loaded (e.g. in batch analytics).
 */
export function computeCostFromPricing(
  pricing: Record<string, unknown> | null | undefined,
  tokens: Record<string, number | undefined> | null | undefined
): number {
  if (!pricing || !tokens) return 0;
  const inputPrice = toNumber(pricing.input, 0);
  const cachedPrice = toNumber(pricing.cached, inputPrice);
  const outputPrice = toNumber(pricing.output, 0);
  const reasoningPrice = toNumber(pricing.reasoning, outputPrice);
  const cacheCreationPrice = toNumber(pricing.cache_creation, inputPrice);

  let cost = 0;
  const inputTokens = tokens.input ?? tokens.prompt_tokens ?? tokens.input_tokens ?? 0;
  const cachedTokens =
    tokens.cacheRead ?? tokens.cached_tokens ?? tokens.cache_read_input_tokens ?? 0;
  const nonCachedInput = Math.max(0, inputTokens - cachedTokens);
  cost += nonCachedInput * (inputPrice / 1_000_000);
  if (cachedTokens > 0) cost += cachedTokens * (cachedPrice / 1_000_000);

  const outputTokens = tokens.output ?? tokens.completion_tokens ?? tokens.output_tokens ?? 0;
  cost += outputTokens * (outputPrice / 1_000_000);

  const reasoningTokens = tokens.reasoning ?? tokens.reasoning_tokens ?? 0;
  if (reasoningTokens > 0) cost += reasoningTokens * (reasoningPrice / 1_000_000);

  const cacheCreationTokens = tokens.cacheCreation ?? tokens.cache_creation_input_tokens ?? 0;
  if (cacheCreationTokens > 0) cost += cacheCreationTokens * (cacheCreationPrice / 1_000_000);

  return cost;
}

export async function calculateCost(
  provider: string,
  model: string,
  tokens: Record<string, number | undefined> | null | undefined
): Promise<number> {
  if (!tokens || !provider || !model) return 0;

  try {
    const { getPricingForModel } = await import("@/lib/localDb");

    // Try exact match first, then normalized model name
    let pricing = await getPricingForModel(provider, model);
    if (!pricing) {
      const normalized = normalizeModelName(model);
      if (normalized !== model) {
        pricing = await getPricingForModel(provider, normalized);
      }
    }
    if (!pricing) return 0;

    const pricingRecord =
      pricing && typeof pricing === "object" && !Array.isArray(pricing)
        ? (pricing as Record<string, unknown>)
        : {};
    return computeCostFromPricing(pricingRecord, tokens);
  } catch (error) {
    console.error("Error calculating cost:", error);
    return 0;
  }
}
