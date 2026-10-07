import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateFu07Promotion,
  evaluateFu09Promotion,
  FU07_PROMOTION_THRESHOLDS,
  FU09_PROMOTION_THRESHOLDS,
  type Fu07PromotionInput,
  type Fu09PromotionInput,
} from "../../../src/lib/guardrails/videoBridgePromotionEvaluator.ts";

function fu07Input(overrides: Partial<Fu07PromotionInput> = {}): Fu07PromotionInput {
  return {
    criticalFactLoss: false,
    materialGain: { captionEfficiencyGain: 0.05, qualityGain: null },
    p95LatencyRatio: 1.1,
    qualityRetention: 0.99,
    securityCasesPassed: true,
    tokenUsageAvailable: true,
    ...overrides,
  };
}

function fu09Input(overrides: Partial<Fu09PromotionInput> = {}): Fu09PromotionInput {
  return {
    absoluteQuality: 0.9,
    criticalOrSecurityLoss: false,
    latencyReductionRatio: 0.3,
    qualityRetention: 0.97,
    tokenReductionRatio: 0.15,
    tokenUsageAvailable: true,
    ...overrides,
  };
}

// ── FU-07 ────────────────────────────────────────────────────────────────────

test("FU-07: all thresholds satisfied -> eligible with no reasons", () => {
  assert.deepEqual(evaluateFu07Promotion(fu07Input()), { reasons: [], status: "eligible" });
});

test("FU-07: quality retention exactly at the 0.98 floor still passes (inclusive threshold)", () => {
  const verdict = evaluateFu07Promotion(fu07Input({ qualityRetention: 0.98 }));
  assert.equal(verdict.status, "eligible");
});

test("FU-07: quality retention just below 0.98 demotes to experimental, not hold", () => {
  const verdict = evaluateFu07Promotion(fu07Input({ qualityRetention: 0.979 }));
  assert.equal(verdict.status, "experimental");
  assert.ok(verdict.reasons.includes("QUALITY_RETENTION_BELOW_THRESHOLD"));
});

test("FU-07: p95 ratio exactly at the 1.20x ceiling still passes (inclusive threshold)", () => {
  const verdict = evaluateFu07Promotion(fu07Input({ p95LatencyRatio: 1.2 }));
  assert.equal(verdict.status, "eligible");
});

test("FU-07: p95 ratio just above 1.20x demotes to experimental", () => {
  const verdict = evaluateFu07Promotion(fu07Input({ p95LatencyRatio: 1.201 }));
  assert.equal(verdict.status, "experimental");
  assert.ok(verdict.reasons.includes("P95_LATENCY_RATIO_EXCEEDED"));
});

test("FU-07: missing p95 data is treated as failing the p95 gate (never assumed passing)", () => {
  const verdict = evaluateFu07Promotion(fu07Input({ p95LatencyRatio: null }));
  assert.equal(verdict.status, "experimental");
  assert.ok(verdict.reasons.includes("P95_LATENCY_RATIO_EXCEEDED"));
});

test("FU-07: any critical fact loss forces hold regardless of every other metric", () => {
  const verdict = evaluateFu07Promotion(fu07Input({ criticalFactLoss: true }));
  assert.equal(verdict.status, "hold");
  assert.deepEqual(verdict.reasons, ["CRITICAL_FACT_LOSS"]);
});

test("FU-07: any failed security case forces hold regardless of every other metric", () => {
  const verdict = evaluateFu07Promotion(fu07Input({ securityCasesPassed: false }));
  assert.equal(verdict.status, "hold");
  assert.deepEqual(verdict.reasons, ["SECURITY_CASE_FAILED"]);
});

test("FU-07: missing token usage forces hold and is never eligible even if every other metric passes", () => {
  const verdict = evaluateFu07Promotion(fu07Input({ tokenUsageAvailable: false }));
  assert.equal(verdict.status, "hold");
  assert.deepEqual(verdict.reasons, ["USAGE_DATA_MISSING"]);
});

test("FU-07: zero material gain (neither quality nor caption-efficiency) demotes to experimental", () => {
  const verdict = evaluateFu07Promotion(
    fu07Input({ materialGain: { captionEfficiencyGain: 0, qualityGain: 0 } })
  );
  assert.equal(verdict.status, "experimental");
  assert.ok(verdict.reasons.includes("NO_MATERIAL_GAIN"));
});

test("FU-07: a strictly positive quality gain alone counts as material even with zero caption-efficiency gain", () => {
  const verdict = evaluateFu07Promotion(
    fu07Input({ materialGain: { captionEfficiencyGain: 0, qualityGain: 0.001 } })
  );
  assert.equal(verdict.status, "eligible");
});

test("FU-07: hold gates take priority over soft gates in the reason list (hard blockers reported, soft ones suppressed)", () => {
  const verdict = evaluateFu07Promotion(
    fu07Input({ criticalFactLoss: true, qualityRetention: 0.1, tokenUsageAvailable: false })
  );
  assert.equal(verdict.status, "hold");
  assert.deepEqual([...verdict.reasons].sort(), ["CRITICAL_FACT_LOSS", "USAGE_DATA_MISSING"]);
});

test("FU-07: threshold constants match the frozen #11656 acceptance bars", () => {
  assert.equal(FU07_PROMOTION_THRESHOLDS.minQualityRetention, 0.98);
  assert.equal(FU07_PROMOTION_THRESHOLDS.maxP95LatencyRatio, 1.2);
});

test("FU-07: identical input evaluated twice (simulating two consecutive runs) yields the identical verdict", () => {
  const input = fu07Input({ qualityRetention: 0.981 });
  assert.deepEqual(evaluateFu07Promotion(input), evaluateFu07Promotion(input));
});

// ── FU-09 ────────────────────────────────────────────────────────────────────

test("FU-09: all thresholds satisfied -> eligible with no reasons", () => {
  assert.deepEqual(evaluateFu09Promotion(fu09Input()), { reasons: [], status: "eligible" });
});

test("FU-09: absolute quality exactly at the 0.85 floor still passes", () => {
  assert.equal(evaluateFu09Promotion(fu09Input({ absoluteQuality: 0.85 })).status, "eligible");
});

test("FU-09: absolute quality just below 0.85 demotes to experimental", () => {
  const verdict = evaluateFu09Promotion(fu09Input({ absoluteQuality: 0.849 }));
  assert.equal(verdict.status, "experimental");
  assert.ok(verdict.reasons.includes("ABSOLUTE_QUALITY_BELOW_THRESHOLD"));
});

test("FU-09: retention exactly at the 0.95 floor still passes", () => {
  assert.equal(evaluateFu09Promotion(fu09Input({ qualityRetention: 0.95 })).status, "eligible");
});

test("FU-09: retention just below 0.95 demotes to experimental", () => {
  const verdict = evaluateFu09Promotion(fu09Input({ qualityRetention: 0.949 }));
  assert.equal(verdict.status, "experimental");
  assert.ok(verdict.reasons.includes("QUALITY_RETENTION_BELOW_THRESHOLD"));
});

test("FU-09: latency reduction exactly at 20% still passes", () => {
  assert.equal(evaluateFu09Promotion(fu09Input({ latencyReductionRatio: 0.2 })).status, "eligible");
});

test("FU-09: latency reduction just below 20% demotes to experimental", () => {
  const verdict = evaluateFu09Promotion(fu09Input({ latencyReductionRatio: 0.199 }));
  assert.equal(verdict.status, "experimental");
  assert.ok(verdict.reasons.includes("LATENCY_REDUCTION_BELOW_THRESHOLD"));
});

test("FU-09: token reduction exactly at 10% still passes", () => {
  assert.equal(evaluateFu09Promotion(fu09Input({ tokenReductionRatio: 0.1 })).status, "eligible");
});

test("FU-09: token reduction just below 10% demotes to experimental", () => {
  const verdict = evaluateFu09Promotion(fu09Input({ tokenReductionRatio: 0.099 }));
  assert.equal(verdict.status, "experimental");
  assert.ok(verdict.reasons.includes("TOKEN_REDUCTION_BELOW_THRESHOLD"));
});

test("FU-09: any critical-or-security loss forces hold regardless of every other metric", () => {
  const verdict = evaluateFu09Promotion(fu09Input({ criticalOrSecurityLoss: true }));
  assert.equal(verdict.status, "hold");
  assert.deepEqual(verdict.reasons, ["CRITICAL_OR_SECURITY_LOSS"]);
});

test("FU-09: missing token usage forces hold and is never eligible even if every other metric passes", () => {
  const verdict = evaluateFu09Promotion(fu09Input({ tokenUsageAvailable: false }));
  assert.equal(verdict.status, "hold");
  assert.deepEqual(verdict.reasons, ["USAGE_DATA_MISSING"]);
});

test("FU-09: missing token usage still forces hold even when a null token reduction ratio is also present", () => {
  const verdict = evaluateFu09Promotion(
    fu09Input({ tokenReductionRatio: null, tokenUsageAvailable: false })
  );
  assert.equal(verdict.status, "hold");
  assert.deepEqual(verdict.reasons, ["USAGE_DATA_MISSING"]);
});

test("FU-09: null latency/token reduction ratios (usage nominally available) fail their soft gates, not hold", () => {
  const verdict = evaluateFu09Promotion(
    fu09Input({ latencyReductionRatio: null, tokenReductionRatio: null })
  );
  assert.equal(verdict.status, "experimental");
  assert.deepEqual(
    [...verdict.reasons].sort(),
    ["LATENCY_REDUCTION_BELOW_THRESHOLD", "TOKEN_REDUCTION_BELOW_THRESHOLD"]
  );
});

test("FU-09: threshold constants match the frozen #11656 acceptance bars", () => {
  assert.equal(FU09_PROMOTION_THRESHOLDS.minAbsoluteQuality, 0.85);
  assert.equal(FU09_PROMOTION_THRESHOLDS.minQualityRetention, 0.95);
  assert.equal(FU09_PROMOTION_THRESHOLDS.minLatencyReductionRatio, 0.2);
  assert.equal(FU09_PROMOTION_THRESHOLDS.minTokenReductionRatio, 0.1);
});

test("FU-09: identical input evaluated twice (simulating two consecutive runs) yields the identical verdict", () => {
  const input = fu09Input({ absoluteQuality: 0.86 });
  assert.deepEqual(evaluateFu09Promotion(input), evaluateFu09Promotion(input));
});
