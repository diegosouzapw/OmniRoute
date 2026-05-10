import type { SpecificityResult, SpecificityBreakdown, SpecificityLevel } from "./specificityTypes";
import { getSpecificityBreakdown, estimateMessageTokens } from "./specificityRules";

const MAX_SPECIFICITY_SCORE = 100;

export function analyzeSpecificity(
  input: import("./specificityTypes").RuleInput
): SpecificityResult {
  const breakdown = getSpecificityBreakdown(input);
  const score = sumBreakdown(breakdown);
  const inputTokens = estimateMessageTokens(input.messages);
  const rulesTriggered = getTriggeredRules(breakdown);
  const confidence = calculateConfidence(breakdown, input);

  return {
    score: Math.min(MAX_SPECIFICITY_SCORE, score),
    breakdown,
    rulesTriggered,
    inputTokens,
    confidence,
  };
}

function sumBreakdown(breakdown: SpecificityBreakdown): number {
  return (
    breakdown.codeComplexity +
    breakdown.mathComplexity +
    breakdown.reasoningDepth +
    breakdown.contextSize +
    breakdown.toolCalling +
    breakdown.domainSpecificity
  );
}

function getTriggeredRules(breakdown: SpecificityBreakdown): string[] {
  const triggered: string[] = [];
  if (breakdown.codeComplexity > 0) triggered.push("code-complexity");
  if (breakdown.mathComplexity > 0) triggered.push("math-complexity");
  if (breakdown.reasoningDepth > 0) triggered.push("reasoning-depth");
  if (breakdown.contextSize > 0) triggered.push("context-size");
  if (breakdown.toolCalling > 0) triggered.push("tool-calling");
  if (breakdown.domainSpecificity > 0) triggered.push("domain-specificity");
  return triggered;
}

function calculateConfidence(
  breakdown: SpecificityBreakdown,
  input: import("./specificityTypes").RuleInput
): number {
  const nonZero = Object.values(breakdown).filter((v) => v > 0).length;
  const totalCategories = 6;
  const categoryCoverage = nonZero / totalCategories;

  const hasSubstantialInput = input.messages.length >= 2;
  const confidenceBoost = hasSubstantialInput ? 0.1 : 0;

  return Math.min(1, categoryCoverage * 0.8 + confidenceBoost);
}

export function getSpecificityLevel(score: number): SpecificityLevel {
  if (score <= 5) return "trivial";
  if (score <= 20) return "simple";
  if (score <= 40) return "moderate";
  if (score <= 65) return "complex";
  return "expert";
}

export function getRecommendedMinTier(level: SpecificityLevel): string {
  switch (level) {
    case "trivial":
      return "free";
    case "simple":
      return "free";
    case "moderate":
      return "cheap";
    case "complex":
      return "cheap";
    case "expert":
      return "premium";
  }
}

export function isHighSpecificity(result: SpecificityResult): boolean {
  return result.score >= 50;
}

export function isLowSpecificity(result: SpecificityResult): boolean {
  return result.score <= 15;
}
