import test from "node:test";
import assert from "node:assert/strict";

import { glmMonthlyRemainingPercentage } from "../../open-sse/services/usage.ts";

// #3580 — z.ai/GLM coding plans have no monthly cap (only 5-hour windows), so the
// quota API reports the TIME_LIMIT ("Monthly") entry with total=0. The previous
// `total > 0 ? … : 0` fallback rendered that as a misleading "Monthly 0% remaining",
// which can skew downstream model-choice. With no absolute cap we now fall back to the
// percentage-derived remaining (full/100% when 0% used).

test("#3580 no monthly cap (total=0), 0% used → 100% remaining (was 0%)", () => {
  assert.equal(glmMonthlyRemainingPercentage(0, 100), 100);
});

test("#3580 no monthly cap (total=0), no usage signal → defaults to full (100)", () => {
  // remaining defaults to max(0, 100 - percentage); 0% used → 100
  assert.equal(glmMonthlyRemainingPercentage(0, 100), 100);
});

test("#3580 absolute monthly cap still computes remaining/total", () => {
  assert.equal(glmMonthlyRemainingPercentage(1000, 500), 50);
  assert.equal(glmMonthlyRemainingPercentage(1000, 1000), 100);
  assert.equal(glmMonthlyRemainingPercentage(1000, 0), 0);
});

test("#3580 clamps out-of-range values to [0,100]", () => {
  assert.equal(glmMonthlyRemainingPercentage(0, 250), 100); // no cap, absolute remaining > 100 → clamp full
  assert.equal(glmMonthlyRemainingPercentage(1000, 5000), 100);
  assert.equal(glmMonthlyRemainingPercentage(0, -5), 0);
});
