import assert from "node:assert/strict";
import test from "node:test";
import { applyLossyRequestPolicy } from "../../../open-sse/services/compression/lossyRequestPolicy.ts";
import type { DerivedPlan } from "../../../open-sse/services/compression/deriveDefaultPlan.ts";

const lossyProfile: DerivedPlan = {
  mode: "stacked",
  source: "active-profile",
  stackedPipeline: [
    { engine: "rtk", intensity: "standard" },
    { engine: "caveman", intensity: "full" },
  ],
};

test("default path replaces a lossy profile with dedup and whitespace folding", () => {
  const plan = applyLossyRequestPolicy(lossyProfile, null);
  assert.equal(plan.mode, "stacked");
  assert.deepEqual(plan.stackedPipeline, [{ engine: "session-dedup" }, { engine: "lite" }]);
});

test("allow-lossy keeps the operator profile for this request", () => {
  const plan = applyLossyRequestPolicy(lossyProfile, "allow-lossy");
  assert.deepEqual(plan.stackedPipeline, lossyProfile.stackedPipeline);
});

test("engine header is the opt-in for that engine", () => {
  const plan = applyLossyRequestPolicy(
    {
      mode: "rtk",
      source: "request-header",
      stackedPipeline: [],
    },
    "engine:rtk"
  );
  assert.equal(plan.mode, "rtk");
});

test("a safe stacked plan is left as-is", () => {
  const safe: DerivedPlan = {
    mode: "stacked",
    source: "default",
    stackedPipeline: [{ engine: "lite" }],
  };
  assert.equal(applyLossyRequestPolicy(safe, null), safe);
});
