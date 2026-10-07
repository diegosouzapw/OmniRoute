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
  medians: Partial<Record<VideoBridgePromotionMetricName, number>>;
  p95: Partial<Record<VideoBridgePromotionMetricName, number>>;
}

export type { PromotionVerdict };

function retentionRatio(baseline: number | undefined, candidate: number | undefined): number | null {
  if (baseline === undefined || candidate === undefined || baseline <= 0) return null;
  return candidate / baseline;
}

function reductionRatio(baseline: number | undefined, candidate: number | undefined): number | null {
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

export function buildFu07PromotionInputFromAggregates(input: Fu07ComparisonInput): Fu07PromotionInput {
  const qualityRetention =
    retentionRatio(input.baseline.medians.factRetention, input.candidate.medians.factRetention) ?? 0;
  const p95LatencyRatio = retentionRatio(input.baseline.p95.latencyMs, input.candidate.p95.latencyMs);
  const captionEfficiencyGain = reductionRatio(
    input.baseline.medians.modelCalls,
    input.candidate.medians.modelCalls
  );
  const qualityGain =
    input.baseline.medians.factRetention !== undefined &&
    input.candidate.medians.factRetention !== undefined
      ? input.candidate.medians.factRetention - input.baseline.medians.factRetention
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

export function buildFu09PromotionInputFromAggregates(input: Fu09ComparisonInput): Fu09PromotionInput {
  return {
    absoluteQuality: input.candidate.medians.factRetention ?? 0,
    criticalOrSecurityLoss: input.criticalOrSecurityLoss,
    latencyReductionRatio: reductionRatio(
      input.baseline.medians.latencyMs,
      input.candidate.medians.latencyMs
    ),
    qualityRetention:
      retentionRatio(input.baseline.medians.factRetention, input.candidate.medians.factRetention) ?? 0,
    tokenReductionRatio: reductionRatio(
      input.baseline.medians.totalTokens,
      input.candidate.medians.totalTokens
    ),
    tokenUsageAvailable: input.tokenUsageAvailable,
  };
}
