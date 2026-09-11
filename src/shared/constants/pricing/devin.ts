type DevinTokenPricing = {
  input: number;
  cached: number;
  output: number;
};

const QUALITY_EFFORTS = ["max", "xhigh", "high", "medium", "low"] as const;
const GPT_EFFORTS = ["max", "xhigh", "high", "medium", "low", "none"] as const;

function variantIds(base: string, efforts: readonly string[]): string[] {
  return efforts.map((effort) => `${base}-${effort}`);
}

function fastVariantIds(base: string): string[] {
  return QUALITY_EFFORTS.map((effort) => `${base}-${effort}-fast`);
}

function priorityVariantIds(base: string): string[] {
  return GPT_EFFORTS.map((effort) => `${base}-${effort}-priority`);
}

function priced(ids: readonly string[], pricing: DevinTokenPricing) {
  return Object.fromEntries(ids.map((id) => [id, pricing]));
}

const CLAUDE_FABLE_5_1 = { input: 10, cached: 0.25, output: 50 };
const CLAUDE_OPUS = { input: 5, cached: 0.5, output: 25 };
const CLAUDE_OPUS_FAST = { input: 10, cached: 1, output: 50 };
const CLAUDE_SONNET_5 = { input: 2, cached: 0.2, output: 10 };
const CLAUDE_SONNET_4_6 = { input: 3, cached: 0.3, output: 15 };
const CLAUDE_HAIKU_4_5 = { input: 1, cached: 0.1, output: 5 };

const GPT_5_6_SOL = { input: 4, cached: 0.4, output: 20 };
const GPT_5_6_SOL_FAST = { input: 8, cached: 0.8, output: 40 };
const GPT_5_6_TERRA = { input: 2, cached: 0.2, output: 12 };
const GPT_5_6_TERRA_FAST = { input: 4, cached: 0.4, output: 24 };
const GPT_5_6_LUNA = { input: 0.2, cached: 0.02, output: 1.2 };
const GPT_5_6_LUNA_FAST = { input: 0.4, cached: 0.04, output: 2.4 };

/**
 * Exact per-UID rates returned by Devin's authenticated live catalog on
 * 2026-09-02. Rates are USD per one million tokens.
 */
export const DEVIN_MODEL_PRICING: Record<string, DevinTokenPricing> = {
  ...priced(variantIds("claude-fable-5-1", QUALITY_EFFORTS), CLAUDE_FABLE_5_1),
  ...priced(variantIds("claude-opus-5", QUALITY_EFFORTS), CLAUDE_OPUS),
  ...priced(fastVariantIds("claude-opus-5"), CLAUDE_OPUS_FAST),
  ...priced(variantIds("claude-opus-4-8", QUALITY_EFFORTS), CLAUDE_OPUS),
  ...priced(fastVariantIds("claude-opus-4-8"), CLAUDE_OPUS_FAST),
  ...priced(variantIds("claude-sonnet-5", QUALITY_EFFORTS), CLAUDE_SONNET_5),
  ...priced(
    [
      "claude-sonnet-4-6",
      "claude-sonnet-4-6-thinking",
      "claude-sonnet-4-6-1m",
      "claude-sonnet-4-6-thinking-1m",
    ],
    CLAUDE_SONNET_4_6
  ),
  MODEL_PRIVATE_11: CLAUDE_HAIKU_4_5,

  ...priced(variantIds("gpt-5-6-sol", GPT_EFFORTS), GPT_5_6_SOL),
  ...priced(priorityVariantIds("gpt-5-6-sol"), GPT_5_6_SOL_FAST),
  ...priced(variantIds("gpt-5-6-terra", GPT_EFFORTS), GPT_5_6_TERRA),
  ...priced(priorityVariantIds("gpt-5-6-terra"), GPT_5_6_TERRA_FAST),
  ...priced(variantIds("gpt-5-6-luna", GPT_EFFORTS), GPT_5_6_LUNA),
  ...priced(priorityVariantIds("gpt-5-6-luna"), GPT_5_6_LUNA_FAST),

  ...priced(variantIds("kimi-k3", ["max", "high", "low"]), {
    input: 3,
    cached: 0.3,
    output: 15,
  }),
  "kimi-k2-7": { input: 0.95, cached: 0.19, output: 4 },
  ...priced(variantIds("glm-5-3", ["max", "high", "low"]), {
    input: 1.4,
    cached: 0.26,
    output: 4.4,
  }),
  ...priced(variantIds("glm-5-3-flash", ["max", "high", "low"]), {
    input: 0.15,
    cached: 0.03,
    output: 0.5,
  }),

  ...priced(["swe-1-7", "swe-1-7-medium"], {
    input: 0.5,
    cached: 0.2,
    output: 2.5,
  }),
  ...priced(["swe-1-7-lightning", "swe-1-7-lightning-medium"], {
    input: 2.5,
    cached: 1,
    output: 12.5,
  }),
  adaptive: { input: 0.5, cached: 0.1, output: 2 },
  ...priced(variantIds("grok-4-6", ["xhigh", "high", "medium", "low"]), {
    input: 2,
    cached: 0.3,
    output: 6,
  }),
  ...priced(variantIds("inkling", ["max", "xhigh", "high", "medium", "low", "none"]), {
    input: 1.4,
    cached: 0.26,
    output: 4.4,
  }),
  ...priced(variantIds("deepseek-v4-flash", ["max", "high", "low"]), {
    input: 0.14,
    cached: 0.03,
    output: 0.28,
  }),
  ...priced(variantIds("nemotron-3-ultra", ["high", "medium", "none"]), {
    input: 0.6,
    cached: 0.12,
    output: 2.4,
  }),
  ...priced(variantIds("gemini-3-7-flash", ["high", "medium", "low"]), {
    input: 1.5,
    cached: 0.15,
    output: 7.5,
  }),
  ...priced(variantIds("gemini-3-1-pro", ["high", "low"]), {
    input: 2,
    cached: 0.2,
    output: 12,
  }),
  ...priced(variantIds("deepseek-v4-pro", ["max", "high", "low"]), {
    input: 1.32,
    cached: 0.04,
    output: 3.96,
  }),
};

// Each transport gets its own provider namespace. They share today's upstream
// rate snapshot, but can diverge independently if Devin changes one channel.
export const DEFAULT_PRICING_DEVIN = {
  "devin-cli": { ...DEVIN_MODEL_PRICING },
  dv: { ...DEVIN_MODEL_PRICING },
  "devin-desktop": { ...DEVIN_MODEL_PRICING },
  "devin-cli-agentic": { ...DEVIN_MODEL_PRICING },
  dva: { ...DEVIN_MODEL_PRICING },
};
