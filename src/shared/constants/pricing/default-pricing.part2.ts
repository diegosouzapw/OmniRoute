/**
 * Pricing data — DEFAULT_PRICING part 2 of 2 (god-file decomposition). Pure data; merged by the barrel.
 */
import {
  GLM_PRICING,
} from "./shared-tiers";

export const DEFAULT_PRICING_PART2 = {
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

  // DeepSeek — API nativa (V3.2 Chat), separada de free providers
  // Preco: $0.28/$0.42/M tokens (verificado via ClawRouter 2026-03-17)
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

  // OpenRouter
  agentrouter: {
    auto: { input: 2.0, output: 8.0 },
  },
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
  glm: GLM_PRICING,
  glmt: GLM_PRICING,

  // Kimi (Moonshot)
  kimi: {
    "kimi-latest": {
      input: 1.0,
      output: 4.0,
      cached: 0.5,
      reasoning: 6.0,
      cache_creation: 1.0,
    },
    // Kimi K2.5 — acesso direto via Moonshot API
    // Context: 262.144 tokens | Capabilities: reasoning, vision, agentic, tools
    "kimi-k2.5": {
      input: 0.6,
      output: 3.0,
      cached: 0.3,
      reasoning: 4.5,
      cache_creation: 0.6,
    },
    "kimi-k2.5-thinking": {
      input: 0.6,
      output: 3.0,
      cached: 0.3,
      reasoning: 4.5,
      cache_creation: 0.6,
    },
    "kimi-for-coding": {
      input: 0.6,
      output: 3.0,
      cached: 0.3,
      reasoning: 4.5,
      cache_creation: 0.6,
    },
    "moonshot-kimi-k2.5": {
      input: 0.6,
      output: 3.0,
      cached: 0.3,
      reasoning: 4.5,
      cache_creation: 0.6,
    },
  },

  // Kimi Coding aliases (OAuth/API key)
  kmc: {
    "kimi-k2.5": { input: 0.6, output: 3.0, cached: 0.3, reasoning: 4.5, cache_creation: 0.6 },
    "kimi-k2.5-thinking": {
      input: 0.6,
      output: 3.0,
      cached: 0.3,
      reasoning: 4.5,
      cache_creation: 0.6,
    },
    "kimi-latest": { input: 1.0, output: 4.0, cached: 0.5, reasoning: 6.0, cache_creation: 1.0 },
  },
  kmca: {
    "kimi-k2.5": { input: 0.6, output: 3.0, cached: 0.3, reasoning: 4.5, cache_creation: 0.6 },
    "kimi-k2.5-thinking": {
      input: 0.6,
      output: 3.0,
      cached: 0.3,
      reasoning: 4.5,
      cache_creation: 0.6,
    },
    "kimi-latest": { input: 1.0, output: 4.0, cached: 0.5, reasoning: 6.0, cache_creation: 1.0 },
  },

  // MiniMax
  minimax: {
    "minimax-m2.1": {
      input: 0.5,
      output: 2.0,
      cached: 0.25,
      reasoning: 3.0,
      cache_creation: 0.5,
    },
    "MiniMax-M2.1": {
      input: 0.5,
      output: 2.0,
      cached: 0.25,
      reasoning: 3.0,
      cache_creation: 0.5,
    },
    // MiniMax M2.5 — mais barato que M2.1, reasoning + tools
    // Context: 204.800 tokens | Max Output: 16.384 tokens
    "minimax-m2.5": {
      input: 0.27,
      output: 0.95,
      cached: 0.135,
      reasoning: 1.425,
      cache_creation: 0.27,
    },
    "MiniMax-M2.5": {
      input: 0.27,
      output: 0.95,
      cached: 0.135,
      reasoning: 1.425,
      cache_creation: 0.27,
    },
    // T12: MiniMax M2.7 — new default model (sub2api PR #1120)
    // Upgraded from M2.5, same API endpoint api.minimax.io
    // Pricing estimated, check https://platform.minimaxi.com/document/Price
    "minimax-m2.7": {
      input: 0.4,
      output: 1.6,
      cached: 0.2,
      reasoning: 2.4,
      cache_creation: 0.4,
    },
    "MiniMax-M2.7": {
      input: 0.4,
      output: 1.6,
      cached: 0.2,
      reasoning: 2.4,
      cache_creation: 0.4,
    },
    "minimax-m2.7-highspeed": {
      input: 0.4,
      output: 1.6,
      cached: 0.2,
      reasoning: 2.4,
      cache_creation: 0.4,
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

  // Blackbox AI
  blackbox: {
    "gpt-4o": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "gemini-2.5-flash": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "claude-sonnet-4": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "deepseek-v3": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    blackboxai: { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    "blackboxai-pro": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
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
    "nvidia/gpt-oss-120b": { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
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

  // ─────────────────────────────────────────────────────────────────────
  // xAI (Grok) — Grok-3 + Grok-4 Family
  // Source: ClawRouter benchmarks 2026-03-17
  // Grok-4-fast-non-reasoning: 1143ms P50 (mais rapido do benchmark)
  // ─────────────────────────────────────────────────────────────────────
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

  // ─────────────────────────────────────────────────────────────────────
  // Z.AI / ZhipuAI — GLM-5 Family
  // Adicionados via ClawRouter 2026-03-17 | maxOutput: 128k tokens!
  // ─────────────────────────────────────────────────────────────────────
  zai: {
    "glm-5": {
      input: 0.38,
      output: 1.98,
      cached: 0.19,
      reasoning: 2.97,
      cache_creation: 0.38,
    },
    "glm-5-turbo": {
      input: 1.2,
      output: 4.0,
      cached: 0.6,
      reasoning: 6.0,
      cache_creation: 1.2,
    },
    "glm-4.7": {
      input: 0.38,
      output: 1.98,
      cached: 0.19,
      reasoning: 2.97,
      cache_creation: 0.38,
    },
  },

  kiro: {
    "claude-fable-5": {
      input: 15.0,
      output: 75.0,
      cached: 7.5,
      reasoning: 112.5,
      cache_creation: 15.0,
    },
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
    // Models from issue #334
    "claude-sonnet-4": {
      input: 3.0,
      output: 15.0,
      cached: 1.5,
      reasoning: 15.0,
      cache_creation: 3.0,
    },
    "claude-opus-4.8": {
      input: 15.0,
      output: 75.0,
      cached: 7.5,
      reasoning: 75.0,
      cache_creation: 15.0,
    },
    "claude-opus-4.7": {
      input: 15.0,
      output: 75.0,
      cached: 7.5,
      reasoning: 75.0,
      cache_creation: 15.0,
    },
    "claude-opus-4.6": {
      input: 15.0,
      output: 75.0,
      cached: 7.5,
      reasoning: 75.0,
      cache_creation: 15.0,
    },
    "claude-sonnet-4.6": {
      input: 3.0,
      output: 15.0,
      cached: 1.5,
      reasoning: 15.0,
      cache_creation: 3.0,
    },
    "deepseek-v3.2": {
      input: 0.27,
      output: 1.1,
      cached: 0.07,
      reasoning: 1.1,
      cache_creation: 0.27,
    },
    // Registry exposes this model as "deepseek-3.2" (no "v") — keep both keys priced.
    "deepseek-3.2": {
      input: 0.27,
      output: 1.1,
      cached: 0.07,
      reasoning: 1.1,
      cache_creation: 0.27,
    },
    "minimax-m2.1": {
      input: 0.4,
      output: 1.6,
      cached: 0.1,
      reasoning: 1.6,
      cache_creation: 0.4,
    },
    // MiniMax M2.5 — cheaper than M2.1, reasoning + tools
    "minimax-m2.5": {
      input: 0.27,
      output: 0.95,
      cached: 0.135,
      reasoning: 1.425,
      cache_creation: 0.27,
    },
    "glm-5": {
      input: 1.0,
      output: 3.2,
      cached: 0.2,
      reasoning: 4.8,
      cache_creation: 1.0,
    },
    "qwen3-coder-next": {
      input: 2.0,
      output: 8.0,
      cached: 0.5,
      reasoning: 8.0,
      cache_creation: 2.0,
    },
    // Kiro "Auto" model — routes to best available
    auto: {
      input: 3.0,
      output: 15.0,
      cached: 1.5,
      reasoning: 15.0,
      cache_creation: 3.0,
    },
    // Registry exposes the Auto model as id "auto-kiro" — keep both keys priced.
    "auto-kiro": {
      input: 3.0,
      output: 15.0,
      cached: 1.5,
      reasoning: 15.0,
      cache_creation: 3.0,
    },
  },
};
