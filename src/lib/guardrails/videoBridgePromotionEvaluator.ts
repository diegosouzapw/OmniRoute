/**
 * @file videoBridgePromotionEvaluator.ts
 * @description Pure FU-07/FU-09 promotion-verdict evaluation for the Video Bridge
 * promotion-evidence run (#11656). Each `evaluateFuXxPromotion` function takes the
 * aggregated metrics (see videoBridgePromotionAggregator.ts) for one (case, model) pair
 * and returns exactly one of `"experimental" | "eligible" | "hold"` by applying the
 * ticket's frozen numeric thresholds. Both functions are pure (no I/O, no clock reads) so
 * identical input always yields an identical verdict — the mechanism behind #11656's "two
 * consecutive runs produce the same eligible verdict" requirement.
 *
 * Status model (not fully specified by the ticket beyond "missing usage remains HOLD" —
 * documented explicitly here since the PR that introduces this file calls it out as a
 * design decision):
 *   - HOLD: a hard blocker fired — missing token usage, any critical-fact loss, or any
 *     failed security case (FU-07) / any critical-or-security loss (FU-09). These are
 *     safety/data-integrity gates, never partially satisfied.
 *   - EXPERIMENTAL: no hard blocker fired, but at least one soft numeric threshold (quality
 *     retention, p95 ratio, material gain, absolute quality, latency/token reduction) was
 *     not met — promising, not yet promotable.
 *   - ELIGIBLE: no hard blocker AND every soft threshold met.
 */

export type VideoBridgePromotionStatus = "eligible" | "experimental" | "hold";

export interface PromotionVerdict {
  reasons: string[];
  status: VideoBridgePromotionStatus;
}

function verdictFromGates(hardBlockers: string[], softFailures: string[]): PromotionVerdict {
  if (hardBlockers.length > 0) return { reasons: hardBlockers, status: "hold" };
  if (softFailures.length > 0) return { reasons: softFailures, status: "experimental" };
  return { reasons: [], status: "eligible" };
}

// ── FU-07: segment-aware structural sampling ────────────────────────────────

export const FU07_PROMOTION_THRESHOLDS = {
  maxP95LatencyRatio: 1.2,
  minQualityRetention: 0.98,
} as const;

export interface Fu07PromotionInput {
  /** Any critical fact lost by the candidate relative to the baseline. Hard blocker. */
  criticalFactLoss: boolean;
  /** At least one of these must be strictly positive for a "material" gain. */
  materialGain: { captionEfficiencyGain: number | null; qualityGain: number | null };
  /** candidate p95 latency / baseline p95 latency. null counts as failing (never assumed passing). */
  p95LatencyRatio: number | null;
  /** candidate uniform-quality score / baseline uniform-quality score. */
  qualityRetention: number;
  /** Every FU-07 security case (prompt-injection resistance) must pass. Hard blocker. */
  securityCasesPassed: boolean;
  /** Token usage was recorded for this measurement. Hard blocker when false — #11656: "missing usage remains HOLD". */
  tokenUsageAvailable: boolean;
}

function fu07HardBlockers(input: Fu07PromotionInput): string[] {
  const blockers: string[] = [];
  if (!input.tokenUsageAvailable) blockers.push("USAGE_DATA_MISSING");
  if (input.criticalFactLoss) blockers.push("CRITICAL_FACT_LOSS");
  if (!input.securityCasesPassed) blockers.push("SECURITY_CASE_FAILED");
  return blockers;
}

function fu07SoftFailures(input: Fu07PromotionInput): string[] {
  const failures: string[] = [];
  if (input.qualityRetention < FU07_PROMOTION_THRESHOLDS.minQualityRetention) {
    failures.push("QUALITY_RETENTION_BELOW_THRESHOLD");
  }
  if (
    input.p95LatencyRatio === null ||
    input.p95LatencyRatio > FU07_PROMOTION_THRESHOLDS.maxP95LatencyRatio
  ) {
    failures.push("P95_LATENCY_RATIO_EXCEEDED");
  }
  const hasMaterialGain =
    (input.materialGain.qualityGain ?? 0) > 0 || (input.materialGain.captionEfficiencyGain ?? 0) > 0;
  if (!hasMaterialGain) failures.push("NO_MATERIAL_GAIN");
  return failures;
}

/** FU-07 (segment-aware structural sampling) promotion verdict — see module doc for the status model. */
export function evaluateFu07Promotion(input: Fu07PromotionInput): PromotionVerdict {
  return verdictFromGates(fu07HardBlockers(input), fu07SoftFailures(input));
}

// ── FU-09: contact-sheet A/B ─────────────────────────────────────────────────

export const FU09_PROMOTION_THRESHOLDS = {
  minAbsoluteQuality: 0.85,
  minLatencyReductionRatio: 0.2,
  minQualityRetention: 0.95,
  minTokenReductionRatio: 0.1,
} as const;

export interface Fu09PromotionInput {
  /** Absolute contact-sheet quality score, independent of the individual-frame baseline. */
  absoluteQuality: number;
  /** Any critical-fact or security-case loss. Hard blocker. */
  criticalOrSecurityLoss: boolean;
  /** (baseline - candidate) / baseline for latency. null counts as failing. */
  latencyReductionRatio: number | null;
  /** candidate quality / individual-frame baseline quality. */
  qualityRetention: number;
  /** (baseline - candidate) / baseline for total tokens. null counts as failing. */
  tokenReductionRatio: number | null;
  /** Token usage was recorded for this measurement. Hard blocker when false. */
  tokenUsageAvailable: boolean;
}

function fu09HardBlockers(input: Fu09PromotionInput): string[] {
  const blockers: string[] = [];
  if (!input.tokenUsageAvailable) blockers.push("USAGE_DATA_MISSING");
  if (input.criticalOrSecurityLoss) blockers.push("CRITICAL_OR_SECURITY_LOSS");
  return blockers;
}

function fu09SoftFailures(input: Fu09PromotionInput): string[] {
  const failures: string[] = [];
  if (input.absoluteQuality < FU09_PROMOTION_THRESHOLDS.minAbsoluteQuality) {
    failures.push("ABSOLUTE_QUALITY_BELOW_THRESHOLD");
  }
  if (input.qualityRetention < FU09_PROMOTION_THRESHOLDS.minQualityRetention) {
    failures.push("QUALITY_RETENTION_BELOW_THRESHOLD");
  }
  if (
    input.latencyReductionRatio === null ||
    input.latencyReductionRatio < FU09_PROMOTION_THRESHOLDS.minLatencyReductionRatio
  ) {
    failures.push("LATENCY_REDUCTION_BELOW_THRESHOLD");
  }
  if (
    input.tokenReductionRatio === null ||
    input.tokenReductionRatio < FU09_PROMOTION_THRESHOLDS.minTokenReductionRatio
  ) {
    failures.push("TOKEN_REDUCTION_BELOW_THRESHOLD");
  }
  return failures;
}

/** FU-09 (contact-sheet A/B) promotion verdict — see module doc for the status model. */
export function evaluateFu09Promotion(input: Fu09PromotionInput): PromotionVerdict {
  return verdictFromGates(fu09HardBlockers(input), fu09SoftFailures(input));
}
