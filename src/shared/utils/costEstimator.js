// @ts-check
/**
 * Cost Estimator — Pre-flight cost estimation for LLM requests
 *
 * Estimates token-based costs before routing to a provider.
 * Uses pricing data from the dashboard/database.
 *
 * @module shared/utils/costEstimator
 */

/**
 * Default pricing per 1M tokens (fallback when no pricing config exists).
 * Values in USD.
 */
const DEFAULT_PRICING = {
  "gpt-4o": { input: 2.5, output: 10.0 },
  "gpt-4o-mini": { input: 0.15, output: 0.6 },
  "gpt-4.1": { input: 2.0, output: 8.0 },
  "gpt-4.1-mini": { input: 0.4, output: 1.6 },
  "gpt-4.1-nano": { input: 0.1, output: 0.4 },
  o3: { input: 2.0, output: 8.0 },
  "o4-mini": { input: 1.1, output: 4.4 },
  "claude-sonnet-4-5-20250514": { input: 3.0, output: 15.0 },
  "claude-3-5-haiku-20241022": { input: 0.8, output: 4.0 },
  "gemini-2.5-pro": { input: 1.25, output: 10.0 },
  "gemini-2.5-flash": { input: 0.15, output: 0.6 },
};

/**
 * Rough token estimation from text.
 * Uses ~4 chars per token approximation (GPT-family average).
 *
 * @param {string} text
 * @returns {number} Estimated token count
 */
export function estimateTokens(text) {
  if (!text || typeof text !== "string") return 0;
  return Math.ceil(text.length / 4);
}

/**
 * Estimate input tokens from a chat completion request body.
 *
 * @param {Object} body - Request body
 * @param {Array<{role: string, content: string|Array<{type: string, text?: string}>}>} [body.messages]
 * @param {string} [body.system]
 * @returns {number} Estimated input token count
 */
export function estimateInputTokens(body) {
  if (!body) return 0;
  let total = 0;

  if (body.system) total += estimateTokens(body.system);

  if (Array.isArray(body.messages)) {
    for (const msg of body.messages) {
      if (typeof msg.content === "string") {
        total += estimateTokens(msg.content);
      } else if (Array.isArray(msg.content)) {
        for (const part of msg.content) {
          if (part.type === "text" && typeof part.text === "string") {
            total += estimateTokens(part.text);
          }
        }
      }
      // Add ~4 tokens overhead per message (role, separators)
      total += 4;
    }
  }

  return total;
}

/**
 * Estimate the cost of a request given a model.
 *
 * @param {Object} params
 * @param {string} params.model - Model identifier
 * @param {number} params.inputTokens - Estimated input tokens
 * @param {number} [params.maxOutputTokens=1000] - Max output tokens
 * @param {Object} [params.pricingOverrides] - Custom pricing { input, output } per 1M tokens
 * @returns {{ inputCost: number, outputCost: number, totalCost: number, model: string, inputTokens: number, outputTokens: number }}
 */
export function estimateCost({ model, inputTokens, maxOutputTokens = 1000, pricingOverrides }) {
  // Find matching pricing (exact match or prefix match)
  let pricing = pricingOverrides;
  if (!pricing) {
    const key = Object.keys(DEFAULT_PRICING).find((k) => model === k || model.startsWith(k));
    pricing = key ? DEFAULT_PRICING[key] : { input: 1.0, output: 3.0 }; // conservative fallback
  }

  const inputCost = (inputTokens / 1_000_000) * pricing.input;
  const outputCost = (maxOutputTokens / 1_000_000) * pricing.output;
  const totalCost = inputCost + outputCost;

  return {
    model,
    inputTokens,
    outputTokens: maxOutputTokens,
    inputCost: Math.round(inputCost * 1_000_000) / 1_000_000,
    outputCost: Math.round(outputCost * 1_000_000) / 1_000_000,
    totalCost: Math.round(totalCost * 1_000_000) / 1_000_000,
  };
}

/**
 * Format a cost value for display.
 * @param {number} usd
 * @returns {string}
 */
export function formatCost(usd) {
  if (usd < 0.01) return `$${(usd * 100).toFixed(4)}¢`;
  return `$${usd.toFixed(4)}`;
}

/**
 * Quick pre-flight estimate: given a request body and model, return estimated cost.
 *
 * @param {Object} body - Chat completion request body
 * @param {string} model - Target model
 * @param {Object} [pricingOverrides] - Optional pricing overrides
 * @returns {{ inputCost: number, outputCost: number, totalCost: number, formatted: string }}
 */
export function preflightEstimate(body, model, pricingOverrides) {
  const inputTokens = estimateInputTokens(body);
  const maxOutput = body.max_tokens || body.maxOutputTokens || 1000;
  const result = estimateCost({ model, inputTokens, maxOutputTokens: maxOutput, pricingOverrides });

  return {
    ...result,
    formatted: formatCost(result.totalCost),
  };
}
