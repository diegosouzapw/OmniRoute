/**
 * @file videoBridgePromotionComparison.ts
 * @description Derives FU-07/FU-09 evaluator inputs (videoBridgePromotionEvaluator.ts) from
 * a pair of baseline/candidate aggregates (videoBridgePromotionAggregator.ts) for
 * #11656. This is the "A/B comparison" step: it turns two absolute measurements into the
 * relative retention/reduction ratios the evaluator's thresholds are expressed in.
 *
 * A ratio is `null` whenever either side is missing the underlying metric — never
 * fabricated as passing or failing by omission; the evaluator already treats `null` as
 * failing the corresponding soft gate.
 */

import type { PromotionVerdict } from "./videoBridgePromotionEvaluator";
import type { Fu07PromotionInput, Fu09PromotionInput } from "./videoBridgePromotionEvaluator";
import type { VideoBridgePromotionMetricName } from "./videoBridgePromotionManifest";

export interface PromotionComparisonAggregate {
  /** Case-balanced mean recall; promotion is not based on a median hiding weak cases. */
  qualityMean?: number;
  medians: Partial<Record<VideoBridgePromotionMetricName, number>>;
  p95: Partial<Record<VideoBridgePromotionMetricName, number>>;
}

export type { PromotionVerdict };

function retentionRatio(
  baseline: number | undefined,
  candidate: number | undefined
): number | null {
  if (baseline === undefined || candidate === undefined || baseline <= 0) return null;
  return candidate / baseline;
}

function reductionRatio(
  baseline: number | undefined,
  candidate: number | undefined
): number | null {
  if (baseline === undefined || candidate === undefined || baseline <= 0) return null;
  return (baseline - candidate) / baseline;
}

export interface Fu07ComparisonInput {
  baseline: PromotionComparisonAggregate;
  candidate: PromotionComparisonAggregate;
  criticalFactLoss: boolean;
  securityCasesPassed: boolean;
  tokenUsageAvailable: boolean;
}

export function buildFu07PromotionInputFromAggregates(
  input: Fu07ComparisonInput
): Fu07PromotionInput {
  const baselineQuality = input.baseline.qualityMean ?? input.baseline.medians.factRetention;
  const candidateQuality = input.candidate.qualityMean ?? input.candidate.medians.factRetention;
  const qualityRetention = retentionRatio(baselineQuality, candidateQuality) ?? 0;
  const p95LatencyRatio = retentionRatio(
    input.baseline.p95.latencyMs,
    input.candidate.p95.latencyMs
  );
  const captionEfficiencyGain = reductionRatio(
    input.baseline.medians.modelCalls,
    input.candidate.medians.modelCalls
  );
  const qualityGain =
    baselineQuality !== undefined && candidateQuality !== undefined
      ? candidateQuality - baselineQuality
      : null;
  return {
    criticalFactLoss: input.criticalFactLoss,
    materialGain: { captionEfficiencyGain, qualityGain },
    p95LatencyRatio,
    qualityRetention,
    securityCasesPassed: input.securityCasesPassed,
    tokenUsageAvailable: input.tokenUsageAvailable,
  };
}

export interface Fu09ComparisonInput {
  baseline: PromotionComparisonAggregate;
  candidate: PromotionComparisonAggregate;
  criticalOrSecurityLoss: boolean;
  tokenUsageAvailable: boolean;
}

export function buildFu09PromotionInputFromAggregates(
  input: Fu09ComparisonInput
): Fu09PromotionInput {
  const baselineQuality = input.baseline.qualityMean ?? input.baseline.medians.factRetention;
  const candidateQuality = input.candidate.qualityMean ?? input.candidate.medians.factRetention;
  return {
    absoluteQuality: candidateQuality ?? 0,
    criticalOrSecurityLoss: input.criticalOrSecurityLoss,
    latencyReductionRatio: reductionRatio(
      input.baseline.medians.latencyMs,
      input.candidate.medians.latencyMs
    ),
    qualityRetention: retentionRatio(baselineQuality, candidateQuality) ?? 0,
    tokenReductionRatio: reductionRatio(
      input.baseline.medians.totalTokens,
      input.candidate.medians.totalTokens
    ),
    tokenUsageAvailable: input.tokenUsageAvailable,
  };
}
