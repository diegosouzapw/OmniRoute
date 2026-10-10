/**
 * Jev routing helpers for the auto-combo strategy.
 *
 * Three refinements ride on one decision call per request:
 *   - intent override: Jev's calibrated task type replaces the multilingual
 *     keyword classifier's guess when available (the keyword result stays the
 *     fallback and the disagreement is logged);
 *   - complexity escalation: Jev's difficulty rating can only RAISE the
 *     complexity-aware module's `recommendedMinTier` floor, never lower it —
 *     tier de-escalation stays with the existing heuristics (safety first);
 *   - safety-aware target filtering: when the request's policy-violation
 *     probability crosses `JEV_SAFETY_RISK_MIN`, targets matching the operator's
 *     `OMNIROUTE_JEV_SAFETY_EXCLUDE` patterns are dropped for this request (an
 *     empty list — the default — keeps the pool untouched).
 *
 * Everything fails open: an unavailable decision model returns nulls/no-ops and
 * the historical routing behavior is preserved exactly.
 */
import { isJevFeatureEnabled } from "./config.ts";
import { decideRoute, type JevComplexity, type RouteDecision } from "./decisions.ts";
import { escalateTier, type ComplexityTier } from "../autoCombo/complexityRouter.ts";
import type { RoutingHint } from "../manifestAdapter.ts";

export const JEV_SAFETY_RISK_MIN = 0.75;

/** Jev difficulty → the tier floor it justifies. `trivial`/`simple` never escalate. */
const JEV_COMPLEXITY_TIER_FLOOR: Record<JevComplexity, ComplexityTier> = {
  trivial: "free",
  simple: "free",
  moderate: "cheap",
  hard: "premium",
};

export interface JevRoutingLogger {
  debug?: (tag: string, message: string, meta?: Record<string, unknown> | null) => void;
  info?: (tag: string, message: string, meta?: Record<string, unknown> | null) => void;
}

/**
 * Classify a request for routing when the routing lane is enabled; otherwise
 * resolve to `null` without any network or credential work.
 */
export async function decideRouteForRequest(input: {
  prompt: string;
  systemPrompt?: string | null;
}): Promise<RouteDecision | null> {
  if (!isJevFeatureEnabled("routing")) return null;
  if (!input.prompt?.trim()) return null;
  return decideRoute({ prompt: input.prompt, systemPrompt: input.systemPrompt ?? null });
}

/**
 * Raise the complexity hint's tier floor from Jev's difficulty rating. Returns
 * the input hint unchanged when there is nothing to escalate (never lowers).
 */
export function escalateHintWithJev(
  hint: RoutingHint | null,
  decision: RouteDecision | null,
  log?: JevRoutingLogger | null
): RoutingHint | null {
  if (!hint || !decision) return hint;
  const floor = JEV_COMPLEXITY_TIER_FLOOR[decision.complexity];
  if (floor === "free") return hint;
  const escalated = escalateTier(hint.recommendedMinTier as ComplexityTier, floor);
  if (escalated === hint.recommendedMinTier) return hint;
  log?.debug?.(
    "COMBO",
    `Jev complexity escalation: ${hint.recommendedMinTier} -> ${escalated} (complexity=${decision.complexity}, confidence=${decision.complexityConfidence})`
  );
  return { ...hint, recommendedMinTier: escalated as RoutingHint["recommendedMinTier"] };
}

/** Operator-configured target exclusion patterns for high-risk requests (csv, empty = disabled). */
export function readSafetyExclusions(
  env: Record<string, string | undefined> = process.env
): string[] {
  const raw = env.OMNIROUTE_JEV_SAFETY_EXCLUDE;
  if (!raw) return [];
  return raw
    .split(",")
    .map((pattern) => pattern.trim().toLowerCase())
    .filter((pattern) => pattern.length > 0);
}

/**
 * Drop targets matching the safety-exclusion patterns when the request is
 * judged high-risk. An empty pattern list, a low risk score or a null decision
 * all return the pool untouched; a filter that would empty the pool keeps it
 * (fail-open — an unroutable combo is worse than an imperfect match).
 */
export function filterTargetsByJevSafety<T extends { provider: string; modelStr: string }>(
  targets: T[],
  decision: RouteDecision | null,
  log?: JevRoutingLogger | null
): T[] {
  if (!decision || decision.safetyRisk < JEV_SAFETY_RISK_MIN) return targets;
  const patterns = readSafetyExclusions();
  if (patterns.length === 0) return targets;
  const kept = targets.filter((target) => {
    const identity = `${target.provider}/${target.modelStr}`.toLowerCase();
    return !patterns.some((pattern) => identity.includes(pattern));
  });
  if (kept.length === 0) {
    log?.debug?.(
      "COMBO",
      `Jev safety filter matched every target (risk=${decision.safetyRisk}); keeping the full pool`
    );
    return targets;
  }
  if (kept.length !== targets.length) {
    log?.debug?.(
      "COMBO",
      `Jev safety filter removed ${targets.length - kept.length}/${targets.length} targets (risk=${decision.safetyRisk})`
    );
  }
  return kept;
}
