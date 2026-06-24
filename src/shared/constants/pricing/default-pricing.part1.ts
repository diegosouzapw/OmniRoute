/**
 * Pricing data — DEFAULT_PRICING part 1 of 2 (god-file decomposition). Pure data; merged by the barrel.
 */
import {
  GPT_5_3_CODEX_PRICING,
  GPT_5_5_PRICING,
  CLAUDE_FABLE_5_PRICING,
  CLAUDE_OPUS_4_PRICING,
  CLAUDE_SONNET_4_PRICING,
  CLAUDE_OPUS_46_PRICING,
  CLAUDE_SONNET_46_PRICING,
} from "./shared-tiers";

export const DEFAULT_PRICING_PART1 = {
  // OAuth Providers (using aliases)

  // Claude Code (cc)
  // Rates aligned with Anthropic's published per-MTok pricing
  // (https://platform.claude.com/docs/en/about-claude/pricing).
  // Cache write = 1.25x input, cache hit = 0.1x input, reasoning = output rate.
  cc: {
    "claude-fable-5": {
      input: 10.0,
      output: 50.0,
      cached: 1.0,
      reasoning: 50.0,
      cache_creation: 12.5,
    },
    "claude-opus-4-8": {
      input: 5.0,
      output: 25.0,
      cached: 0.5,
      reasoning: 25.0,
      cache_creation: 6.25,
    },
    "claude-opus-4-7": {
      input: 5.0,
      output: 25.0,
      cached: 0.5,
      reasoning: 25.0,
      cache_creation: 6.25,
    },
    "claude-opus-4-6": {
      input: 5.0,
      output: 25.0,
      cached: 0.5,
      reasoning: 25.0,
      cache_creation: 6.25,
    },
    "claude-sonnet-4-6": {
      input: 3.0,
      output: 15.0,
      cached: 0.3,
      reasoning: 15.0,
      cache_creation: 3.75,
    },
    "claude-opus-4-5-20251101": {
      input: 5.0,
      output: 25.0,
      cached: 0.5,
      reasoning: 25.0,
      cache_creation: 6.25,
    },
    "claude-sonnet-4-5-20250929": {
      input: 3.0,
      output: 15.0,
      cached: 0.3,
      reasoning: 15.0,
      cache_creation: 3.75,
    },
    "claude-haiku-4-5-20251001": {
      input: 1.0,
      output: 5.0,
      cached: 0.1,
      reasoning: 5.0,
      cache_creation: 1.25,
    },
  },

  // OpenAI Codex (cx)
  cx: {
    "codex-auto-review": GPT_5_5_PRICING,
    // GPT 5.5
    "gpt-5.5": GPT_5_5_PRICING,
    "gpt5.5": GPT_5_5_PRICING,
    "gpt-5.5-xhigh": GPT_5_5_PRICING,
    "gpt-5.5-high": GPT_5_5_PRICING,
    "gpt-5.5-medium": GPT_5_5_PRICING,
    "gpt-5.5-low": GPT_5_5_PRICING,
    "gpt-5.5-none": GPT_5_5_PRICING,
    // GPT 5.4
    "gpt-5.4": {
      input: 5.0,
      output: 20.0,
      cached: 2.5,
      reasoning: 30.0,
      cache_creation: 5.0,
    },
    "gpt5.4": {
      input: 5.0,
      output: 20.0,
      cached: 2.5,
      reasoning: 30.0,
      cache_creation: 5.0,
    },
    // T12: fallback pricing for gpt-5.4 mini variants
    "gpt-5.4-mini": {
      input: 1.5,
      output: 6.0,
      cached: 0.75,
      reasoning: 9.0,
      cache_creation: 1.5,
    },
    "gpt5.4-mini": {
      input: 1.5,
      output: 6.0,
      cached: 0.75,
      reasoning: 9.0,
      cache_creation: 1.5,
    },
    // gpt-5.4 reasoning-effort variants share the gpt-5.4 tier (registry exposes
    // -xhigh/-high/-medium/-low; without these rows they resolved to $0).
    "gpt-5.4-xhigh": GPT_5_3_CODEX_PRICING,
    "gpt-5.4-high": GPT_5_3_CODEX_PRICING,
    "gpt-5.4-medium": GPT_5_3_CODEX_PRICING,
    "gpt-5.4-low": GPT_5_3_CODEX_PRICING,
    // GPT 5.3 Codex family (all same pricing tier)
    "gpt-5.3-codex-spark": GPT_5_3_CODEX_PRICING,
    "gpt-5.3-codex": GPT_5_3_CODEX_PRICING,
    "gpt-5.3-codex-xhigh": GPT_5_3_CODEX_PRICING,
    "gpt-5.3-codex-high": GPT_5_3_CODEX_PRICING,
    "gpt-5.3-codex-low": GPT_5_3_CODEX_PRICING,
    "gpt-5.3-codex-none": GPT_5_3_CODEX_PRICING,
    "gpt-5.1-codex-mini-high": {
      input: 1.5,
      output: 6.0,
      cached: 0.75,
      reasoning: 9.0,
      cache_creation: 1.5,
    },
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

  // Gemini CLI
  "gemini-cli": {
    "gemini-3-flash-preview": {
      input: 0.5,
      output: 3.0,
      cached: 0.03,
      reasoning: 4.5,
      cache_creation: 0.5,
    },
    "gemini-3.1-flash-lite-preview": {
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
    // Gemini 2.5 Flash Lite — preco corrigido via ClawRouter: $0.10/$0.40 (era $0.15/$1.25)
    "gemini-2.5-flash-lite": {
      input: 0.1,
      output: 0.4,
      cached: 0.025,
      reasoning: 0.6,
      cache_creation: 0.1,
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
    // Next-generation Qwen Coder tier (added Mar 2026)
    "qwen3-coder-next": {
      input: 2.0,
      output: 8.0,
      cached: 1.0,
      reasoning: 12.0,
      cache_creation: 2.0,
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
    // Qwen3.5/3.6 Coder Model — ported from upstream 9router PR #156 (zx07).
    // Priced identically to the vision tier per upstream defaults.
    "coder-model": {
      input: 1.5,
      output: 6.0,
      cached: 0.75,
      reasoning: 9.0,
      cache_creation: 1.5,
    },
  },

  // Qoder AI (if)
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
      input: 0.28,
      output: 0.42,
      cached: 0.014,
      reasoning: 0.63,
      cache_creation: 0.28,
    },
    "deepseek-v3.2": {
      input: 0.28,
      output: 0.42,
      cached: 0.014,
      reasoning: 0.63,
      cache_creation: 0.28,
    },
    "deepseek-v3.2-reasoner": {
      input: 0.55,
      output: 2.19,
      cached: 0.14,
      reasoning: 2.19,
      cache_creation: 0.55,
    },
    // Short-form aliases (Mar 2026)
    "deepseek-3.1": {
      input: 0.27,
      output: 1.1,
      cached: 0.07,
      reasoning: 2.2,
      cache_creation: 0.27,
    },
    "deepseek-3.2": {
      input: 0.27,
      output: 1.1,
      cached: 0.07,
      reasoning: 2.2,
      cache_creation: 0.27,
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
    // Antigravity 2.0.4+ exposes Gemini 3.5 Flash as three public client ids
    // (see ANTIGRAVITY_PUBLIC_MODELS in open-sse/config/antigravityModelAliases.ts):
    //   gemini-3-flash-agent   → "Gemini 3.5 Flash (High)"
    //   gemini-3.5-flash-low   → "Gemini 3.5 Flash (Medium)"
    // Both bill at the same per-MTok rates as legacy `gemini-3-flash` above —
    // without these rows, getPricingForModel("ag", id) returned null and downstream
    // cost / quota calculations silently fell back to $0.
    "gemini-3-flash-agent": {
      input: 0.5,
      output: 3.0,
      cached: 0.03,
      reasoning: 4.5,
      cache_creation: 0.5,
    },
    "gemini-3.5-flash-low": {
      input: 0.5,
      output: 3.0,
      cached: 0.03,
      reasoning: 4.5,
      cache_creation: 0.5,
    },
    // `gemini-pro-agent` is the Antigravity v1.23+ Agent-mode alias for the
    // Gemini 3.1 Pro (High) tier — bills at the same rates as `gemini-3.1-pro-high`.
    "gemini-pro-agent": {
      input: 4.0,
      output: 18.0,
      cached: 0.5,
      reasoning: 27.0,
      cache_creation: 4.0,
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

  // Gemini
};
