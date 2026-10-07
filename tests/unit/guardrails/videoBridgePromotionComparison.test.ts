import assert from "node:assert/strict";
import test from "node:test";

import {
  buildFu07PromotionInputFromAggregates,
  buildFu09PromotionInputFromAggregates,
  type PromotionComparisonAggregate,
} from "../../../src/lib/guardrails/videoBridgePromotionComparison.ts";

function aggregate(
  medians: PromotionComparisonAggregate["medians"],
  p95: PromotionComparisonAggregate["p95"] = {}
): PromotionComparisonAggregate {
  return { medians, p95 };
}

test("buildFu07PromotionInputFromAggregates derives retention, p95 ratio and gains from baseline/candidate aggregates", () => {
  const input = buildFu07PromotionInputFromAggregates({
    baseline: aggregate({ factRetention: 0.9, modelCalls: 8 }, { latencyMs: 1_000 }),
    candidate: aggregate({ factRetention: 0.9, modelCalls: 4 }, { latencyMs: 1_100 }),
    criticalFactLoss: false,
    securityCasesPassed: true,
    tokenUsageAvailable: true,
  });
  assert.equal(input.qualityRetention, 1); // 0.9 / 0.9
  assert.equal(input.p95LatencyRatio, 1.1); // 1100 / 1000
  assert.ok((input.materialGain.captionEfficiencyGain ?? 0) > 0); // 8 -> 4 calls is a reduction
  assert.equal(input.criticalFactLoss, false);
  assert.equal(input.securityCasesPassed, true);
  assert.equal(input.tokenUsageAvailable, true);
});

test("buildFu07PromotionInputFromAggregates: a metric missing from either side yields null p95 ratio, not a fabricated pass", () => {
  const input = buildFu07PromotionInputFromAggregates({
    baseline: aggregate({ factRetention: 0.9 }),
    candidate: aggregate({ factRetention: 0.9 }),
    criticalFactLoss: false,
    securityCasesPassed: true,
    tokenUsageAvailable: true,
  });
  assert.equal(input.p95LatencyRatio, null);
});

test("buildFu09PromotionInputFromAggregates derives absolute quality, retention and reduction ratios", () => {
  const input = buildFu09PromotionInputFromAggregates({
    baseline: aggregate({ factRetention: 0.9, latencyMs: 1_000, totalTokens: 1_000 }),
    candidate: aggregate({ factRetention: 0.88, latencyMs: 700, totalTokens: 850 }),
    criticalOrSecurityLoss: false,
    tokenUsageAvailable: true,
  });
  assert.equal(input.absoluteQuality, 0.88);
  assert.ok(Math.abs(input.qualityRetention - 0.88 / 0.9) < 1e-9);
  assert.ok(Math.abs((input.latencyReductionRatio ?? 0) - 0.3) < 1e-9);
  assert.ok(Math.abs((input.tokenReductionRatio ?? 0) - 0.15) < 1e-9);
});

test("buildFu09PromotionInputFromAggregates: missing token totals on either side yield a null token reduction ratio", () => {
  const input = buildFu09PromotionInputFromAggregates({
    baseline: aggregate({ factRetention: 0.9, latencyMs: 1_000 }),
    candidate: aggregate({ factRetention: 0.9, latencyMs: 700 }),
    criticalOrSecurityLoss: false,
    tokenUsageAvailable: false,
  });
  assert.equal(input.tokenReductionRatio, null);
  assert.equal(input.tokenUsageAvailable, false);
});
