/**
 * complexityRouter.ts — Request-complexity classification for tier-aware routing.
 *
 * 2026 strategy: route by the intrinsic difficulty of the *request* (not only by
 * provider stats), so trivial prompts can use cheap models and hard/reasoning
 * prompts escalate to capable ones. Built on the existing specificity detector
 * (codeComplexity / mathComplexity / reasoningDepth / contextSize / toolCalling
 * / domainSpecificity), adding an explicit tool-use → minimum-tier escalation:
 * a request carrying tool/function schemas (or agentic tool-calling signals)
 * should not be routed below the "cheap" tier even when the prose looks
 * trivial, because function-calling reliability matters more than raw cost.
 *
 * The classification maps to a `recommendedTier` that feeds the auto-router's
 * tier-affinity / specificity-match scoring factors (see scoreAutoTargets,
 * gated by config.complexityAwareRouting).
 */
import {
  analyzeSpecificity,
  getSpecificityLevel,
  getRecommendedMinTier,
} from "../specificityDetector";
import type { RuleInput, SpecificityLevel } from "../specificityTypes";
import { generateRoutingHints, type RoutingHint } from "../manifestAdapter";

export type ComplexityTier = "free" | "cheap" | "premium";

export interface ComplexityClassification {
  /** 0..100 specificity / difficulty score. */
  score: number;
  /** trivial | simple | moderate | complex | expert */
  level: SpecificityLevel;
  /** Minimum provider tier recommended for this request. */
  recommendedTier: ComplexityTier;
  /** True when the request carries tool/function schemas or agentic tool signals. */
  hasToolUse: boolean;
  /** Names of the specificity rules that fired (for the inspector / dashboard). */
  signals: string[];
}

const TIER_ORDER: ComplexityTier[] = ["free", "cheap", "premium"];

/** Raise `tier` to at least `floor`; never lowers it. */
export function escalateTier(tier: ComplexityTier, floor: ComplexityTier): ComplexityTier {
  return TIER_ORDER.indexOf(tier) >= TIER_ORDER.indexOf(floor) ? tier : floor;
}

/**
 * Classify a request's complexity and recommend a minimum provider tier.
 * Pure + dependency-light (no DB / network); safe on the hot path.
 */
export function classifyRequestComplexity(input: RuleInput): ComplexityClassification {
  const result = analyzeSpecificity(input);
  const level = getSpecificityLevel(result.score);

  const explicitTools = Array.isArray(input.tools) && input.tools.length > 0;
  const hasToolUse = explicitTools || result.breakdown.toolCalling > 0;

  let recommendedTier = getRecommendedMinTier(level) as ComplexityTier;
  // Tool-using / agentic requests need reliable function calling — floor at "cheap".
  if (hasToolUse) recommendedTier = escalateTier(recommendedTier, "cheap");

  return {
    score: result.score,
    level,
    recommendedTier,
    hasToolUse,
    signals: result.rulesTriggered,
  };
}

/**
 * Build the opt-in complexity-aware routing hint for the auto-router. Returns a
 * RoutingHint whose `recommendedMinTier` is escalated to the request's intrinsic
 * complexity (and floored at "cheap" for tool-using requests), or `null` on any
 * failure — fail-open, so scoring stays tier-neutral. Extracted from combo.ts to
 * keep the complexity-routing logic in one module.
 */
export function buildComplexityRoutingHint(
  modelTargets: Parameters<typeof generateRoutingHints>[0],
  body: { messages?: unknown; tools?: unknown; model?: unknown } | null | undefined,
  log: { info: (tag: string, message: string) => void }
): RoutingHint | null {
  try {
    const ruleInput = {
      messages: Array.isArray(body?.messages)
        ? (body.messages as Array<{ role?: string; content?: string | unknown }>)
        : [],
      tools: Array.isArray(body?.tools)
        ? (body.tools as Array<{
            function?: { name: string; description?: string; parameters?: unknown };
          }>)
        : undefined,
      model: typeof body?.model === "string" ? body.model : undefined,
    };
    const hint = generateRoutingHints(modelTargets, ruleInput);
    // Tool-use escalation: floor the recommended tier at "cheap" so scoring
    // favors function-calling-reliable models for agentic requests.
    const classification = classifyRequestComplexity(ruleInput);
    hint.recommendedMinTier = escalateTier(
      hint.recommendedMinTier as ComplexityTier,
      classification.recommendedTier
    ) as typeof hint.recommendedMinTier;
    log.info(
      "COMBO",
      `Complexity-aware routing: level=${classification.level} score=${classification.score} minTier=${hint.recommendedMinTier} tools=${classification.hasToolUse}`
    );
    return hint;
  } catch {
    return null; // fail-open: scoring stays tier-neutral
  }
}
