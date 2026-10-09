import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateFu07Promotion,
  evaluateFu09Promotion,
} from "../../../src/lib/guardrails/videoBridgePromotionEvaluator.ts";

test("promotion fails closed on nonfinite and physically invalid measured values", () => {
  for (const value of [NaN, Infinity, -Infinity, -0.01]) {
    const verdict = evaluateFu07Promotion({
      criticalFactLoss: false,
      materialGain: { captionEfficiencyGain: 0.2, qualityGain: 0 },
      p95LatencyRatio: 1,
      qualityRetention: value,
      securityCasesPassed: true,
      tokenUsageAvailable: true,
    });
    assert.equal(verdict.status, "hold");
    assert.ok(verdict.reasons.includes("INVALID_MEASUREMENT"));
  }
  for (const value of [NaN, Infinity, -0.01, 1.01]) {
    assert.equal(
      evaluateFu09Promotion({
        absoluteQuality: value,
        criticalOrSecurityLoss: false,
        latencyReductionRatio: 0.3,
        qualityRetention: 1,
        tokenReductionRatio: 0.2,
        tokenUsageAvailable: true,
      }).status,
      "hold"
    );
  }
});
