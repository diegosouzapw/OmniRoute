/**
 * Pricing data — shared per-MTok tier constants (god-file decomposition). Pure data; merged by the barrel.
 */
export const GPT_5_3_CODEX_PRICING = {
  input: 5.0,
  output: 20.0,
  cached: 2.5,
  reasoning: 30.0,
  cache_creation: 5.0,
};

export const GPT_5_5_PRICING = {
  input: 5.0,
  output: 30.0,
  cached: 0.5,
  reasoning: 30.0,
  cache_creation: 5.0,
};

export const GPT_5_6_SOL_PRICING = {
  input: 5.0,
  output: 30.0,
  cached: 0.5,
  reasoning: 30.0,
  cache_creation: 6.25,
};

export const GPT_5_6_TERRA_PRICING = {
  input: 2.5,
  output: 15.0,
  cached: 0.25,
  reasoning: 15.0,
  cache_creation: 3.125,
};

export const GPT_5_6_LUNA_PRICING = {
  input: 1.0,
  output: 6.0,
  cached: 0.1,
  reasoning: 6.0,
  cache_creation: 1.25,
};

// Gemini 3.7 Flash introductory pricing through 2026-12-31. Google and
// GitHub Copilot both publish the same current token rates; standard pricing
// becomes $1.50/$7.50/$0.15 (input/output/cached input) on 2027-01-01.
export const GEMINI_3_7_FLASH_PROMO_PRICING = {
  input: 0.75,
  output: 3.75,
  cached: 0.075,
  reasoning: 3.75,
  cache_creation: 0.75,
};

export const CLAUDE_FABLE_5_PRICING = {
  input: 15.0,
  output: 75.0,
  cached: 7.5,
  reasoning: 112.5,
  cache_creation: 15.0,
};

export const CLAUDE_FABLE_5_1_PRICING = {
  input: 10.0,
  output: 50.0,
  cached: 0.25,
  reasoning: 50.0,
  cache_creation: 12.5,
};

export const CLAUDE_OPUS_5_PRICING = {
  input: 5.0,
  output: 25.0,
  cached: 0.5,
  reasoning: 25.0,
  cache_creation: 6.25,
};

export const CLAUDE_OPUS_4_PRICING = {
  input: 15.0,
  output: 75.0,
  cached: 7.5,
  reasoning: 112.5,
  cache_creation: 15.0,
};

export const CLAUDE_SONNET_4_PRICING = {
  input: 3.0,
  output: 15.0,
  cached: 1.5,
  reasoning: 15.0,
  cache_creation: 3.0,
};

export const CLAUDE_OPUS_46_PRICING = {
  input: 5.0,
  output: 25.0,
  cached: 2.5,
  reasoning: 37.5,
  cache_creation: 5.0,
};

export const CLAUDE_SONNET_46_PRICING = {
  input: 3.0,
  output: 15.0,
  cached: 1.5,
  reasoning: 22.5,
  cache_creation: 3.0,
};

// Claude Sonnet 5 — Sonnet-tier ($3/$15/M, same sticker as Sonnet 4.6; intro
// $2/$10 through 2026-08-31 not encoded — track the standard rate like 4.6).
export const CLAUDE_SONNET_5_PRICING = {
  input: 3.0,
  output: 15.0,
  cached: 1.5,
  reasoning: 22.5,
  cache_creation: 3.0,
};

export const GLM_PRICING = {
  // GLM-5.3 Flash (2026-08-26, https://models.dev / Z.AI)
  "glm-5.3-flash": {
    input: 0.075,
    output: 0.25,
    cached: 0.015,
    reasoning: 0.25,
    cache_creation: 0.075,
  },
  "glm-5.3-flash-high": {
    input: 0.075,
    output: 0.25,
    cached: 0.015,
    reasoning: 0.25,
    cache_creation: 0.075,
  },
  "glm-5.3-flash-low": {
    input: 0.075,
    output: 0.25,
    cached: 0.015,
    reasoning: 0.25,
    cache_creation: 0.075,
  },
  "glm-5.3-flash-max": {
    input: 0.075,
    output: 0.25,
    cached: 0.015,
    reasoning: 0.25,
    cache_creation: 0.075,
  },
  // GLM-5.3 (2026-08-14): Z.ai hasn't published 5.3 rates yet — mirrored from
  // GLM-5.2 (same base model; 5.1 and 5.2 also share identical rates).
  // Correct when https://docs.z.ai/guides/overview/pricing lists glm-5.3.
  "glm-5.3": {
    input: 1.2,
    output: 5,
    cached: 0.3,
    reasoning: 5,
    cache_creation: 1.2,
  },
  "glm-5.3-high": {
    input: 1.2,
    output: 5,
    cached: 0.3,
    reasoning: 5,
    cache_creation: 1.2,
  },
  "glm-5.3-low": {
    input: 1.2,
    output: 5,
    cached: 0.3,
    reasoning: 5,
    cache_creation: 1.2,
  },
  "glm-5.3-max": {
    input: 1.2,
    output: 5,
    cached: 0.3,
    reasoning: 5,
    cache_creation: 1.2,
  },
  "glm-5.2": {
    input: 1.2,
    output: 5,
    cached: 0.3,
    reasoning: 5,
    cache_creation: 1.2,
  },
  "glm-5.2-high": {
    input: 1.2,
    output: 5,
    cached: 0.3,
    reasoning: 5,
    cache_creation: 1.2,
  },
  "glm-5.2-max": {
    input: 1.2,
    output: 5,
    cached: 0.3,
    reasoning: 5,
    cache_creation: 1.2,
  },
  "glm-5.1": {
    input: 1.2,
    output: 5,
    cached: 0.3,
    reasoning: 5,
    cache_creation: 1.2,
  },
  "glm-5": {
    input: 1.0,
    output: 3.2,
    cached: 0.2,
    reasoning: 4.8,
    cache_creation: 1.0,
  },
  "glm-5-turbo": {
    input: 1.2,
    output: 4.0,
    cached: 0.24,
    reasoning: 4.0,
    cache_creation: 1.2,
  },
  "glm-4.7-flash": {
    input: 0,
    output: 0,
    cached: 0,
    reasoning: 0,
    cache_creation: 0,
  },
  "glm-4.7": {
    input: 0.6,
    output: 2.2,
    cached: 0.11,
    reasoning: 2.2,
    cache_creation: 0.6,
  },
  "glm-4.6": {
    input: 0.6,
    output: 2.2,
    cached: 0.11,
    reasoning: 2.2,
    cache_creation: 0.6,
  },
  "glm-4.6v": {
    input: 0.3,
    output: 0.9,
    cached: 0.05,
    reasoning: 0.9,
    cache_creation: 0.3,
  },
  "glm-4.5v": {
    input: 0.6,
    output: 1.8,
    cached: 0.11,
    reasoning: 1.8,
    cache_creation: 0.6,
  },
  "glm-4.5": {
    input: 0.6,
    output: 2.2,
    cached: 0.11,
    reasoning: 2.2,
    cache_creation: 0.6,
  },
  "glm-4.5-air": {
    input: 0.2,
    output: 1.1,
    cached: 0.03,
    reasoning: 1.1,
    cache_creation: 0.2,
  },
};
