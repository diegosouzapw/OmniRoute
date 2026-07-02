/**
 * Pricing data — frontier-labs family (first-party frontier model labs).
 * Pure data; merged by default-pricing.ts via spread (god-file decomposition; semantic split).
 */
import {
  GPT_5_5_PRICING,
  CLAUDE_FABLE_5_PRICING,
  CLAUDE_OPUS_4_PRICING,
  CLAUDE_SONNET_4_PRICING,
  CLAUDE_OPUS_46_PRICING,
  CLAUDE_SONNET_46_PRICING,
} from "./shared-tiers";

export const DEFAULT_PRICING_FRONTIER = {
  openai: {
    "gpt-5.5": GPT_5_5_PRICING,
    // The -pro tier mirrors its base family pricing until OpenAI publishes a
    // distinct pro rate; without these rows the openai provider's gpt-5.x-pro
    // models (in the registry) resolved to $0 and tripped the catalog pricing gate.
    "gpt-5.5-pro": GPT_5_5_PRICING,
    // gpt-5.4 family (public API tier; mirrors the codex 5.4 tier for the
    // base/mini, with a lower nano tier). Without these rows the openai
    // provider's gpt-5.4* models resolved to $0.
    "gpt-5.4": {
      input: 5.0,
      output: 20.0,
      cached: 2.5,
      reasoning: 30.0,
      cache_creation: 5.0,
    },
    "gpt-5.4-pro": {
      input: 5.0,
      output: 20.0,
      cached: 2.5,
      reasoning: 30.0,
      cache_creation: 5.0,
    },
    "gpt-5.4-mini": {
      input: 1.5,
      output: 6.0,
      cached: 0.75,
      reasoning: 9.0,
      cache_creation: 1.5,
    },
    "gpt-5.4-nano": {
      input: 0.4,
      output: 1.6,
      cached: 0.2,
      reasoning: 2.4,
      cache_creation: 0.4,
    },
    "gpt-4.1": {
      input: 2.0,
      output: 8.0,
      cached: 0.5,
      reasoning: 12.0,
      cache_creation: 2.0,
    },
    "gpt-4.1-mini": {
      input: 0.4,
      output: 1.6,
      cached: 0.1,
      reasoning: 2.4,
      cache_creation: 0.4,
    },
    "gpt-4.1-nano": {
      input: 0.1,
      output: 0.4,
      cached: 0.025,
      reasoning: 0.6,
      cache_creation: 0.1,
    },
    "gpt-4o": {
      input: 2.5,
      output: 10.0,
      cached: 1.25,
      reasoning: 15.0,
      cache_creation: 2.5,
    },
    "gpt-4o-2024-11-20": {
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
    o3: {
      input: 2.0,
      output: 8.0,
      cached: 0.5,
      reasoning: 12.0,
      cache_creation: 2.0,
    },
    "o3-mini": {
      input: 1.1,
      output: 4.4,
      cached: 0.55,
      reasoning: 6.6,
      cache_creation: 1.1,
    },
    "o4-mini": {
      input: 1.1,
      output: 4.4,
      cached: 0.275,
      reasoning: 6.6,
      cache_creation: 1.1,
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
    // Claude 4.5 Haiku — modelo eco mais recente da Anthropic (2025-10)
    "claude-haiku-4-5-20251001": {
      input: 1.0,
      output: 5.0,
      cached: 0.5,
      reasoning: 7.5,
      cache_creation: 1.0,
    },
    "claude-haiku-4.5": {
      input: 1.0,
      output: 5.0,
      cached: 0.5,
      reasoning: 7.5,
      cache_creation: 1.0,
    },
    // Claude Sonnet 4.6 — maxOutput 64k tokens, $3/$15/M
    "claude-sonnet-4-6-20251031": {
      input: 3.0,
      output: 15.0,
      cached: 1.5,
      reasoning: 22.5,
      cache_creation: 3.0,
    },
    "claude-sonnet-4.6": {
      input: 3.0,
      output: 15.0,
      cached: 1.5,
      reasoning: 22.5,
      cache_creation: 3.0,
    },
    // Claude Opus 4.6 — mais barato que Opus 4 ($5/$25 vs $15/$75)
    "claude-opus-4-6-20251031": {
      input: 5.0,
      output: 25.0,
      cached: 2.5,
      reasoning: 37.5,
      cache_creation: 5.0,
    },
    "claude-opus-4.6": {
      input: 5.0,
      output: 25.0,
      cached: 2.5,
      reasoning: 37.5,
      cache_creation: 5.0,
    },
    // Common model IDs (without dates) used across providers
    // Intentional duplicates of dot-notation variants (e.g. claude-opus-4.6)
    // to cover hyphen-notation IDs (claude-opus-4-6) used by some clients
    "claude-fable-5": CLAUDE_FABLE_5_PRICING,
    "claude-opus-4.8": CLAUDE_OPUS_4_PRICING,
    "claude-opus-4-8": CLAUDE_OPUS_4_PRICING,
    "claude-opus-4-7": CLAUDE_OPUS_4_PRICING,
    "claude-opus-4-6": CLAUDE_OPUS_46_PRICING,
    "claude-sonnet-4-6": CLAUDE_SONNET_46_PRICING,
    "claude-opus-4-5-20251101": CLAUDE_OPUS_4_PRICING,
    "claude-sonnet-4-5-20250929": CLAUDE_SONNET_4_PRICING,
    "claude-sonnet-4": CLAUDE_SONNET_4_PRICING,
    "claude-opus-4": CLAUDE_OPUS_4_PRICING,
  },
  gemini: {
    // Gemini 3.1 Pro — novo flagship Google (2026-03-17)
    // Context: 1.050.000 tokens | Max Output: 65.536
    "gemini-3.1-pro": {
      input: 2.0,
      output: 12.0,
      cached: 0.25,
      reasoning: 18.0,
      cache_creation: 2.0,
    },
    "gemini-3-1-pro": {
      input: 2.0,
      output: 12.0,
      cached: 0.25,
      reasoning: 18.0,
      cache_creation: 2.0,
    },
    "gemini-3-pro-preview": {
      input: 2.0,
      output: 12.0,
      cached: 0.25,
      reasoning: 18.0,
      cache_creation: 2.0,
    },
    "gemini-3.1-pro-preview": {
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
    // Gemini 2.5 Flash Lite — preco corrigido: $0.10/$0.40 (ClawRouter)
    "gemini-2.5-flash-lite": {
      input: 0.1,
      output: 0.4,
      cached: 0.025,
      reasoning: 0.6,
      cache_creation: 0.1,
    },
  },
  deepseek: {
    "deepseek-chat": {
      input: 0.28,
      output: 0.42,
      cached: 0.014,
      reasoning: 0.42,
      cache_creation: 0.28,
    },
    "deepseek-v3": {
      input: 0.28,
      output: 0.42,
      cached: 0.014,
      reasoning: 0.42,
      cache_creation: 0.28,
    },
    "deepseek-v3.2": {
      input: 0.28,
      output: 0.42,
      cached: 0.014,
      reasoning: 0.42,
      cache_creation: 0.28,
    },
    "deepseek-reasoner": {
      input: 0.55,
      output: 2.19,
      cached: 0.14,
      reasoning: 2.19,
      cache_creation: 0.55,
    },
    "deepseek-r1": {
      input: 0.55,
      output: 2.19,
      cached: 0.14,
      reasoning: 2.19,
      cache_creation: 0.55,
    },
    // DeepSeek V4 Pro — promo until 2026-05-31, then list ($0.145 / $3.48)
    "deepseek-v4-pro": {
      input: 0.435,
      output: 0.87,
      cached: 0.0036,
      reasoning: 0.87,
      cache_creation: 0.435,
    },
    "deepseek-v4-flash": {
      input: 0.07,
      output: 0.28,
      cached: 0.014,
      reasoning: 0.28,
      cache_creation: 0.07,
    },
  },
  blackbox: {
    "gpt-4o": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "gemini-2.5-flash": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "claude-sonnet-4": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "deepseek-v3": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    blackboxai: { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "blackboxai-pro": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
  },
  xai: {
    "grok-3": {
      input: 3.0,
      output: 15.0,
      cached: 1.5,
      reasoning: 22.5,
      cache_creation: 3.0,
    },
    "grok-3-mini": {
      input: 0.3,
      output: 0.5,
      cached: 0.15,
      reasoning: 0.75,
      cache_creation: 0.3,
    },
    // Grok-4 Fast Family — ultrabaratos ($0.20/$0.50/M)
    "grok-4-fast-non-reasoning": {
      input: 0.2,
      output: 0.5,
      cached: 0.1,
      reasoning: 0.0,
      cache_creation: 0.2,
    },
    "grok-4-fast-reasoning": {
      input: 0.2,
      output: 0.5,
      cached: 0.1,
      reasoning: 0.75,
      cache_creation: 0.2,
    },
    "grok-4-1-fast-non-reasoning": {
      input: 0.2,
      output: 0.5,
      cached: 0.1,
      reasoning: 0.0,
      cache_creation: 0.2,
    },
    "grok-4-1-fast-reasoning": {
      input: 0.2,
      output: 0.5,
      cached: 0.1,
      reasoning: 0.75,
      cache_creation: 0.2,
    },
    "grok-4-0709": {
      input: 0.2,
      output: 1.5,
      cached: 0.1,
      reasoning: 2.25,
      cache_creation: 0.2,
    },
  },
};
