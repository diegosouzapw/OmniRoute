// Default pricing rates for AI models
// All rates are in dollars per million tokens ($/1M tokens)
// Based on user-provided pricing for Antigravity models and industry standards for others

export const DEFAULT_PRICING = {
  // OAuth Providers (using aliases)

  // Claude Code (cc)
  cc: {
    "claude-opus-4-5-20251101": {
      input: 15.0,
      output: 75.0,
      cached: 7.5,
      reasoning: 75.0,
      cache_creation: 15.0,
    },
    "claude-sonnet-4-5-20250929": {
      input: 3.0,
      output: 15.0,
      cached: 1.5,
      reasoning: 15.0,
      cache_creation: 3.0,
    },
    "claude-haiku-4-5-20251001": {
      input: 0.5,
      output: 2.5,
      cached: 0.25,
      reasoning: 2.5,
      cache_creation: 0.5,
    },
  },

  // OpenAI Codex (cx)
  cx: {
    "gpt-5.2-codex": {
      input: 5.0,
      output: 20.0,
      cached: 2.5,
      reasoning: 30.0,
      cache_creation: 5.0,
    },
    "gpt-5.2": {
      input: 5.0,
      output: 20.0,
      cached: 2.5,
      reasoning: 30.0,
      cache_creation: 5.0,
    },
    "gpt-5.1-codex-max": {
      input: 8.0,
      output: 32.0,
      cached: 4.0,
      reasoning: 48.0,
      cache_creation: 8.0,
    },
    "gpt-5.1-codex": {
      input: 4.0,
      output: 16.0,
      cached: 2.0,
      reasoning: 24.0,
      cache_creation: 4.0,
    },
    "gpt-5.1-codex-mini": {
      input: 1.5,
      output: 6.0,
      cached: 0.75,
      reasoning: 9.0,
      cache_creation: 1.5,
    },
    "gpt-5.1": {
      input: 4.0,
      output: 16.0,
      cached: 2.0,
      reasoning: 24.0,
      cache_creation: 4.0,
    },
    "gpt-5-codex": {
      input: 3.0,
      output: 12.0,
      cached: 1.5,
      reasoning: 18.0,
      cache_creation: 3.0,
    },
    "gpt-5-codex-mini": {
      input: 1.0,
      output: 4.0,
      cached: 0.5,
      reasoning: 6.0,
      cache_creation: 1.0,
    },
  },

  // Gemini CLI (gc)
  gc: {
    "gemini-3-flash-preview": {
      input: 0.5,
      output: 3.0,
      cached: 0.03,
      reasoning: 4.5,
      cache_creation: 0.5,
    },
    "gemini-3-pro-preview": {
      input: 2.0,
      output: 12.0,
      cached: 0.25,
      reasoning: 18.0,
      cache_creation: 2.0,
    },
    "gemini-2.5-pro": {
      input: 2.0,
      output: 12.0,
      cached: 0.25,
      reasoning: 18.0,
      cache_creation: 2.0,
    },
    "gemini-2.5-flash": {
      input: 0.3,
      output: 2.5,
      cached: 0.03,
      reasoning: 3.75,
      cache_creation: 0.3,
    },
    "gemini-2.5-flash-lite": {
      input: 0.15,
      output: 1.25,
      cached: 0.015,
      reasoning: 1.875,
      cache_creation: 0.15,
    },
  },

  // Qwen Code (qw)
  qw: {
    "qwen3-coder-plus": {
      input: 1.0,
      output: 4.0,
      cached: 0.5,
      reasoning: 6.0,
      cache_creation: 1.0,
    },
    "qwen3-coder-flash": {
      input: 0.5,
      output: 2.0,
      cached: 0.25,
      reasoning: 3.0,
      cache_creation: 0.5,
    },
    "vision-model": {
      input: 1.5,
      output: 6.0,
      cached: 0.75,
      reasoning: 9.0,
      cache_creation: 1.5,
    },
  },

  // iFlow AI (if)
  if: {
    "qwen3-coder-plus": {
      input: 1.0,
      output: 4.0,
      cached: 0.5,
      reasoning: 6.0,
      cache_creation: 1.0,
    },
    "kimi-k2": {
      input: 1.0,
      output: 4.0,
      cached: 0.5,
      reasoning: 6.0,
      cache_creation: 1.0,
    },
    "kimi-k2-thinking": {
      input: 1.5,
      output: 6.0,
      cached: 0.75,
      reasoning: 9.0,
      cache_creation: 1.5,
    },
    "deepseek-r1": {
      input: 0.75,
      output: 3.0,
      cached: 0.375,
      reasoning: 4.5,
      cache_creation: 0.75,
    },
    "deepseek-v3.2-chat": {
      input: 0.5,
      output: 2.0,
      cached: 0.25,
      reasoning: 3.0,
      cache_creation: 0.5,
    },
    "deepseek-v3.2-reasoner": {
      input: 0.75,
      output: 3.0,
      cached: 0.375,
      reasoning: 4.5,
      cache_creation: 0.75,
    },
    "minimax-m2": {
      input: 0.5,
      output: 2.0,
      cached: 0.25,
      reasoning: 3.0,
      cache_creation: 0.5,
    },
    "glm-4.6": {
      input: 0.5,
      output: 2.0,
      cached: 0.25,
      reasoning: 3.0,
      cache_creation: 0.5,
    },
    "glm-4.7": {
      input: 0.75,
      output: 3.0,
      cached: 0.375,
      reasoning: 4.5,
      cache_creation: 0.75,
    },
  },

  // Antigravity (ag) - User-provided pricing
  ag: {
    "gemini-3.1-pro-low": {
      input: 2.0,
      output: 12.0,
      cached: 0.25,
      reasoning: 18.0,
      cache_creation: 2.0,
    },
    "gemini-3.1-pro-high": {
      input: 4.0,
      output: 18.0,
      cached: 0.5,
      reasoning: 27.0,
      cache_creation: 4.0,
    },
    "gemini-3-flash": {
      input: 0.5,
      output: 3.0,
      cached: 0.03,
      reasoning: 4.5,
      cache_creation: 0.5,
    },
    "claude-sonnet-4-6": {
      input: 3.0,
      output: 15.0,
      cached: 0.3,
      reasoning: 22.5,
      cache_creation: 3.0,
    },
    "claude-opus-4-6-thinking": {
      input: 5.0,
      output: 25.0,
      cached: 0.5,
      reasoning: 37.5,
      cache_creation: 5.0,
    },
    "gpt-oss-120b-medium": {
      input: 0.5,
      output: 2.0,
      cached: 0.25,
      reasoning: 3.0,
      cache_creation: 0.5,
    },
  },

  // GitHub Copilot (gh)
  gh: {
    "gpt-5": {
      input: 3.0,
      output: 12.0,
      cached: 1.5,
      reasoning: 18.0,
      cache_creation: 3.0,
    },
    "gpt-5-mini": {
      input: 0.75,
      output: 3.0,
      cached: 0.375,
      reasoning: 4.5,
      cache_creation: 0.75,
    },
    "gpt-5.1-codex": {
      input: 4.0,
      output: 16.0,
      cached: 2.0,
      reasoning: 24.0,
      cache_creation: 4.0,
    },
    "gpt-5.1-codex-max": {
      input: 8.0,
      output: 32.0,
      cached: 4.0,
      reasoning: 48.0,
      cache_creation: 8.0,
    },
    "gpt-4.1": {
      input: 2.5,
      output: 10.0,
      cached: 1.25,
      reasoning: 15.0,
      cache_creation: 2.5,
    },
    "claude-4.5-sonnet": {
      input: 3.0,
      output: 15.0,
      cached: 0.3,
      reasoning: 22.5,
      cache_creation: 3.0,
    },
    "claude-4.5-opus": {
      input: 5.0,
      output: 25.0,
      cached: 0.5,
      reasoning: 37.5,
      cache_creation: 5.0,
    },
    "claude-4.5-haiku": {
      input: 0.5,
      output: 2.5,
      cached: 0.05,
      reasoning: 3.75,
      cache_creation: 0.5,
    },
    "gemini-3-pro": {
      input: 2.0,
      output: 12.0,
      cached: 0.25,
      reasoning: 18.0,
      cache_creation: 2.0,
    },
    "gemini-3-flash": {
      input: 0.5,
      output: 3.0,
      cached: 0.03,
      reasoning: 4.5,
      cache_creation: 0.5,
    },
    "gemini-2.5-pro": {
      input: 2.0,
      output: 12.0,
      cached: 0.25,
      reasoning: 18.0,
      cache_creation: 2.0,
    },
    "grok-code-fast-1": {
      input: 0.5,
      output: 2.0,
      cached: 0.25,
      reasoning: 3.0,
      cache_creation: 0.5,
    },
  },

  // API Key Providers (alias = id)

  // OpenAI
  openai: {
    "gpt-4o": {
      input: 2.5,
      output: 10.0,
      cached: 1.25,
      reasoning: 15.0,
      cache_creation: 2.5,
    },
    "gpt-4o-mini": {
      input: 0.15,
      output: 0.6,
      cached: 0.075,
      reasoning: 0.9,
      cache_creation: 0.15,
    },
    "gpt-4-turbo": {
      input: 10.0,
      output: 30.0,
      cached: 5.0,
      reasoning: 45.0,
      cache_creation: 10.0,
    },
    o1: {
      input: 15.0,
      output: 60.0,
      cached: 7.5,
      reasoning: 90.0,
      cache_creation: 15.0,
    },
    "o1-mini": {
      input: 3.0,
      output: 12.0,
      cached: 1.5,
      reasoning: 18.0,
      cache_creation: 3.0,
    },
  },

  // Anthropic
  anthropic: {
    "claude-sonnet-4-20250514": {
      input: 3.0,
      output: 15.0,
      cached: 1.5,
      reasoning: 15.0,
      cache_creation: 3.0,
    },
    "claude-opus-4-20250514": {
      input: 15.0,
      output: 75.0,
      cached: 7.5,
      reasoning: 112.5,
      cache_creation: 15.0,
    },
    "claude-3-5-sonnet-20241022": {
      input: 3.0,
      output: 15.0,
      cached: 1.5,
      reasoning: 15.0,
      cache_creation: 3.0,
    },
  },

  // Gemini
  gemini: {
    "gemini-3-pro-preview": {
      input: 2.0,
      output: 12.0,
      cached: 0.25,
      reasoning: 18.0,
      cache_creation: 2.0,
    },
    "gemini-2.5-pro": {
      input: 2.0,
      output: 12.0,
      cached: 0.25,
      reasoning: 18.0,
      cache_creation: 2.0,
    },
    "gemini-2.5-flash": {
      input: 0.3,
      output: 2.5,
      cached: 0.03,
      reasoning: 3.75,
      cache_creation: 0.3,
    },
    "gemini-2.5-flash-lite": {
      input: 0.15,
      output: 1.25,
      cached: 0.015,
      reasoning: 1.875,
      cache_creation: 0.15,
    },
  },

  // OpenRouter
  openrouter: {
    auto: {
      input: 2.0,
      output: 8.0,
      cached: 1.0,
      reasoning: 12.0,
      cache_creation: 2.0,
    },
  },

  // GLM
  glm: {
    "glm-4.7": {
      input: 0.75,
      output: 3.0,
      cached: 0.375,
      reasoning: 4.5,
      cache_creation: 0.75,
    },
    "glm-4.6": {
      input: 0.5,
      output: 2.0,
      cached: 0.25,
      reasoning: 3.0,
      cache_creation: 0.5,
    },
    "glm-4.6v": {
      input: 0.75,
      output: 3.0,
      cached: 0.375,
      reasoning: 4.5,
      cache_creation: 0.75,
    },
  },

  // Kimi
  kimi: {
    "kimi-latest": {
      input: 1.0,
      output: 4.0,
      cached: 0.5,
      reasoning: 6.0,
      cache_creation: 1.0,
    },
  },

  // MiniMax
  minimax: {
    "MiniMax-M2.1": {
      input: 0.5,
      output: 2.0,
      cached: 0.25,
      reasoning: 3.0,
      cache_creation: 0.5,
    },
  },

  // ─── Free-tier API Key Providers (nominal $0 pricing) ───

  // Groq
  groq: {
    "openai/gpt-oss-120b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "gpt-oss-120b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "llama-3.3-70b-versatile": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "meta-llama/llama-4-maverick-17b-128e-instruct": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "qwen/qwen3-32b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
  },

  // Fireworks
  fireworks: {
    "accounts/fireworks/models/gpt-oss-120b": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "gpt-oss-120b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "accounts/fireworks/models/deepseek-v3p1": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "accounts/fireworks/models/llama-v3p3-70b-instruct": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "accounts/fireworks/models/qwen3-235b-a22b": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
  },

  // Cerebras
  cerebras: {
    "gpt-oss-120b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "zai-glm-4.7": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "llama-3.3-70b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "llama-4-scout-17b-16e-instruct": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "qwen-3-235b-a22b-instruct-2507": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "qwen-3-32b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
  },

  // Nvidia
  nvidia: {
    "openai/gpt-oss-120b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "gpt-oss-120b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "moonshotai/kimi-k2.5": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "z-ai/glm4.7": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "deepseek-ai/deepseek-v3.2": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "nvidia/llama-3.3-70b-instruct": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "meta/llama-4-maverick-17b-128e-instruct": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "deepseek/deepseek-r1": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
  },

  // Nebius
  nebius: {
    "openai/gpt-oss-120b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "gpt-oss-120b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "meta-llama/Llama-3.3-70B-Instruct": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
  },

  // SiliconFlow
  siliconflow: {
    "openai/gpt-oss-120b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "gpt-oss-120b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "deepseek-ai/DeepSeek-V3.2": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "deepseek-ai/DeepSeek-V3.1": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "deepseek-ai/DeepSeek-R1": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "Qwen/Qwen3-235B-A22B-Instruct-2507": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "Qwen/Qwen3-Coder-480B-A35B-Instruct": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "Qwen/Qwen3-32B": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "moonshotai/Kimi-K2.5": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "zai-org/GLM-4.7": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "baidu/ERNIE-4.5-300B-A47B": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
  },

  // Hyperbolic
  hyperbolic: {
    "openai/gpt-oss-120b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "gpt-oss-120b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "Qwen/QwQ-32B": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "deepseek-ai/DeepSeek-R1": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "deepseek-ai/DeepSeek-V3": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "meta-llama/Llama-3.3-70B-Instruct": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "meta-llama/Llama-3.2-3B-Instruct": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "Qwen/Qwen2.5-72B-Instruct": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "Qwen/Qwen2.5-Coder-32B-Instruct": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
    "NousResearch/Hermes-3-Llama-3.1-70B": {
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    },
  },

  // Kiro (AWS)
  kiro: {
    "claude-sonnet-4.5": {
      input: 3.0,
      output: 15.0,
      cached: 1.5,
      reasoning: 15.0,
      cache_creation: 3.0,
    },
    "claude-haiku-4.5": {
      input: 0.5,
      output: 2.5,
      cached: 0.25,
      reasoning: 2.5,
      cache_creation: 0.5,
    },
  },
};

/**
 * Get pricing for a specific provider and model
 * @param {string} provider - Provider ID (e.g., "openai", "cc", "gc")
 * @param {string} model - Model ID
 * @returns {object|null} Pricing object or null if not found
 */
export function getPricingForModel(provider, model) {
  if (!provider || !model) return null;

  const providerPricing = DEFAULT_PRICING[provider];
  if (!providerPricing) return null;

  return providerPricing[model] || null;
}

/**
 * Get all pricing data
 * @returns {object} All default pricing
 */
export function getDefaultPricing() {
  return DEFAULT_PRICING;
}

/**
 * Format cost for display
 * @param {number} cost - Cost in dollars
 * @returns {string} Formatted cost string
 */
export function formatCost(cost) {
  if (cost === null || cost === undefined || isNaN(cost)) return "$0.00";
  return `$${cost.toFixed(2)}`;
}

/**
 * Calculate cost from tokens and pricing
 * @param {object} tokens - Token counts
 * @param {object} pricing - Pricing object
 * @returns {number} Cost in dollars
 */
export function calculateCostFromTokens(tokens, pricing) {
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
