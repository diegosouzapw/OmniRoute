import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_LADDER,
  aggressivenessOf,
  expectedReductionFactor,
} from "@omniroute/open-sse/services/compression/adaptiveCompression/ladder.ts";

test("default ladder is cheapest → most aggressive (stackPriority order)", () => {
  assert.deepEqual(
    DEFAULT_LADDER.map((s) => s.engine),
    ["session-dedup", "rtk", "headroom", "lite", "caveman", "aggressive", "ultra"]
  );
});

test("aggressivenessOf increases monotonically along the ladder", () => {
  const ranks = DEFAULT_LADDER.map((s) => aggressivenessOf(s.engine));
  for (let i = 1; i < ranks.length; i++) {
    assert.ok(ranks[i] > ranks[i - 1], `rank must increase at index ${i}`);
  }
  // a base "lite" plan ranks below caveman/aggressive/ultra (so floor escalates beyond it)
  assert.ok(aggressivenessOf("lite") < aggressivenessOf("caveman"));
  assert.ok(aggressivenessOf("standard") === aggressivenessOf("caveman")); // mode-name alias
});

test("expectedReductionFactor is in (0,1) and heavier engines reduce more", () => {
  assert.ok(expectedReductionFactor("rtk") < 1 && expectedReductionFactor("rtk") > 0);
  assert.ok(expectedReductionFactor("ultra") < expectedReductionFactor("rtk"));
});

import { resolveAdaptivePlan } from "@omniroute/open-sse/services/compression/adaptiveCompression/resolveAdaptivePlan.ts";
import { DEFAULT_CONTEXT_BUDGET } from "@omniroute/open-sse/services/compression/adaptiveCompression/types.ts";

const cfg = (over = {}) => ({ ...DEFAULT_CONTEXT_BUDGET, mode: "floor" as const, ...over });
const basePlan = { mode: "off", stackedPipeline: [] as Array<{ engine: string; intensity?: string }> };

test("already fits → base plan unchanged, fit=true, no stages", () => {
  const { plan, telemetry } = resolveAdaptivePlan({
    basePlan,
    estimatedTokens: 1000,        // well under target
    modelContextLimit: 200000,
    requestMaxTokens: 8000,
    config: cfg(),
  });
  assert.deepEqual(plan, basePlan);
  assert.ok(telemetry);
  assert.equal(telemetry!.fit, true);
  assert.deepEqual(telemetry!.stagesApplied, []);
  assert.equal(telemetry!.target, 200000 - 8000 - 1024);
  assert.ok(telemetry!.headroomBefore > 0);
  assert.equal(telemetry!.headroomAfter, telemetry!.headroomBefore);
});

test("over target → escalates and stops at first fitting stage (no over-escalation)", () => {
  // Injected estimator: each stage halves the prompt. target = 200000-8000-1024 = 190976.
  // Start over target at 400000: stage1 → 200000 (still over), stage2 → 100000 (fits) → STOP.
  const halve = (prior: number) => Math.round(prior / 2);
  const { plan, telemetry } = resolveAdaptivePlan({
    basePlan: { mode: "off", stackedPipeline: [] },
    estimatedTokens: 400000,
    modelContextLimit: 200000,
    requestMaxTokens: 8000,
    config: cfg(),
    estimate: halve,
  });
  assert.equal(telemetry!.fit, true);
  assert.equal(telemetry!.stagesApplied.length, 2); // stopped after the 2nd stage
  assert.equal(plan.mode, "stacked");
  assert.equal(plan.stackedPipeline.length, 2);
  // first two ladder engines above "off": session-dedup then rtk
  assert.deepEqual(telemetry!.stagesApplied, ["session-dedup", "rtk"]);
  assert.ok(telemetry!.headroomAfter >= 0);
});
