import type { ModelAssessment, ModelCategory, ModelTier } from "./types";

const TIER_SCORES: Record<ModelTier, number> = {
  premium: 1.0,
  balanced: 0.67,
  fast: 0.5,
  free: 0.0,
};

const CATEGORY_WEIGHTS: Record<
  ModelCategory,
  { tier: number; speed: number; success: number; cost: number }
> = {
  coding: { tier: 0.4, speed: 0.3, success: 0.2, cost: 0.1 },
  reasoning: { tier: 0.5, success: 0.3, speed: 0.1, cost: 0.1 },
  reasoning_deep: { tier: 0.7, success: 0.2, speed: 0.05, cost: 0.05 },
  chat: { tier: 0.2, success: 0.4, speed: 0.3, cost: 0.1 },
  fast: { tier: 0.1, success: 0.3, speed: 0.6, cost: 0 },
  vision: { tier: 0.3, success: 0.5, speed: 0.1, cost: 0.1 },
  tool_call: { tier: 0.3, success: 0.5, speed: 0.1, cost: 0.1 },
  structured_output: { tier: 0.3, success: 0.5, speed: 0.1, cost: 0.1 },
};

const MODEL_PATTERNS: Array<{ pattern: RegExp; categories: ModelCategory[]; tier: ModelTier }> = [
  {
    pattern: /opus|o[1-4]/i,
    categories: ["reasoning_deep", "coding", "reasoning"],
    tier: "premium",
  },
  { pattern: /sonnet/i, categories: ["coding", "reasoning", "chat"], tier: "premium" },
  { pattern: /haiku/i, categories: ["fast", "coding", "chat"], tier: "fast" },
  { pattern: /gpt-4|gpt-5/i, categories: ["coding", "reasoning", "chat"], tier: "premium" },
  { pattern: /gpt-3\.5|gpt-4o-mini/i, categories: ["fast", "chat"], tier: "fast" },
  {
    pattern: /deepseek.*pro|deepseek.*v[3-9]/i,
    categories: ["coding", "reasoning"],
    tier: "balanced",
  },
  { pattern: /cogito/i, categories: ["reasoning_deep", "reasoning"], tier: "balanced" },
  { pattern: /devstral|codestral/i, categories: ["coding", "fast"], tier: "balanced" },
  { pattern: /gemma.*(?:31|71)/i, categories: ["coding", "reasoning"], tier: "balanced" },
  { pattern: /gemma.*(?:4|12)/i, categories: ["fast", "chat"], tier: "fast" },
  { pattern: /gemma.*3/i, categories: ["fast", "chat"], tier: "fast" },
  { pattern: /glm/i, categories: ["coding", "chat"], tier: "balanced" },
  { pattern: /qwen.*72|qwen.*plus/i, categories: ["reasoning", "coding"], tier: "balanced" },
  { pattern: /mini|flash|nano/i, categories: ["fast", "chat"], tier: "fast" },
];

export class Categorizer {
  categorizeModel(assessment: ModelAssessment): ModelCategory[] {
    const categories = new Set<ModelCategory>();

    if (assessment.latencyP50 !== null && assessment.latencyP50 < 2000) {
      categories.add("fast");
    }
    if (assessment.supportsVision) categories.add("vision");
    if (assessment.supportsToolCall) categories.add("tool_call");
    if (assessment.supportsStructuredOutput) categories.add("structured_output");

    for (const { pattern, categories: patternCats } of MODEL_PATTERNS) {
      if (pattern.test(assessment.modelId)) {
        for (const cat of patternCats) categories.add(cat);
        break;
      }
    }

    if (categories.size === 0) categories.add("chat");

    return Array.from(categories);
  }

  assignTier(assessment: ModelAssessment): ModelTier {
    for (const { pattern, tier } of MODEL_PATTERNS) {
      if (pattern.test(assessment.modelId)) return tier;
    }
    return "balanced";
  }

  calculateFitness(assessment: ModelAssessment, category: ModelCategory): number {
    const weights = CATEGORY_WEIGHTS[category];
    const tierScore = TIER_SCORES[assessment.tier];
    const speedScore =
      assessment.latencyP50 !== null ? Math.max(0, 1 - assessment.latencyP50 / 15000) : 0.5;
    const successScore = assessment.successRate;
    const costScore = 0.5;

    return (
      weights.tier * tierScore +
      weights.speed * speedScore +
      weights.success * successScore +
      weights.cost * costScore
    );
  }

  calculateAllFitness(assessment: ModelAssessment): Record<string, number> {
    const scores: Record<string, number> = {};
    for (const category of assessment.categories) {
      scores[category] = Math.round(this.calculateFitness(assessment, category) * 100) / 100;
    }
    return scores;
  }

  assignCategoriesAndFitness(assessment: ModelAssessment): ModelAssessment {
    const categories = this.categorizeModel(assessment);
    const tier = this.assignTier(assessment);
    const fitnessScores = categories.reduce(
      (acc, cat) => ({ ...acc, [cat]: this.calculateFitness(assessment, cat) }),
      {} as Record<string, number>
    );

    return {
      ...assessment,
      categories,
      tier,
      fitnessScores,
    };
  }
}
