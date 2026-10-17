import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateFu07Promotion,
  type Fu07PromotionInput,
} from "../../../src/lib/guardrails/videoBridgePromotionEvaluator.ts";

function evaluate(materialGain: Fu07PromotionInput["materialGain"]) {
  return evaluateFu07Promotion({
    criticalFactLoss: false,
    materialGain,
    p95LatencyRatio: 1.1,
    qualityRetention: 1,
    securityCasesPassed: true,
    tokenUsageAvailable: true,
  });
}

test("FU-07 requires the approved material gain, not any positive delta", () => {
  assert.equal(
    evaluate({ captionEfficiencyGain: 0.099, qualityGain: 0.049 }).status,
    "experimental"
  );
  assert.equal(evaluate({ captionEfficiencyGain: 0.1, qualityGain: 0 }).status, "eligible");
  assert.equal(evaluate({ captionEfficiencyGain: 0, qualityGain: 0.05 }).status, "eligible");
  assert.equal(evaluate({ captionEfficiencyGain: -0.1, qualityGain: 0.06 }).status, "experimental");
  assert.equal(evaluate({ captionEfficiencyGain: null, qualityGain: 0.06 }).status, "experimental");
});
