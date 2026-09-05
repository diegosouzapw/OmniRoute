// tests/unit/virtualFactory-valuation.test.ts (part 1 — reliability)
import { test } from "node:test";
import assert from "node:assert/strict";
import { computeSnapshotWeights, resolveVirtualCost } from "../../open-sse/services/autoCombo/virtualFactory.ts";
import { DEFAULT_WEIGHTS } from "../../open-sse/services/autoCombo/scoring.ts";

function candidate(over: Record<string, unknown> = {}) {
  return {
    provider: "openai",
    connectionId: null,
    model: "gpt-4o",
    modelStr: "openai/gpt-4o",
    costPer1MTokens: 5,
    ...over,
  } as never;
}

test("absent failure rate reads fully reliable (neutral 1)", () => {
  const weights = { ...DEFAULT_WEIGHTS, reliability: 0.2 };
  const scores = computeSnapshotWeights([candidate()], weights);
  const base = computeSnapshotWeights([candidate()], { ...DEFAULT_WEIGHTS, reliability: 0 });
  const delta0 = scores.get("openai/gpt-4o")! - base.get("openai/gpt-4o")!;
  assert.ok(Math.abs(delta0 - 0.2) < 1e-9, `expected 0.2, got ${delta0}`);
});

test("failureRate 0.2 scales the reliability weight to 0.8", () => {
  const weights = { ...DEFAULT_WEIGHTS, reliability: 0.2 };
  const scores = computeSnapshotWeights([candidate({ failureRate: 0.2 })], weights);
  const base = computeSnapshotWeights([candidate()], { ...DEFAULT_WEIGHTS, reliability: 0 });
  const delta = scores.get("openai/gpt-4o")! - base.get("openai/gpt-4o")!;
  assert.ok(Math.abs(delta - 0.16) < 1e-9, `expected 0.16, got ${delta}`);
});

test("errorRate backs up a missing failureRate", () => {
  const weights = { ...DEFAULT_WEIGHTS, reliability: 0.2 };
  const scores = computeSnapshotWeights([candidate({ errorRate: 0.5 })], weights);
  const base = computeSnapshotWeights([candidate()], { ...DEFAULT_WEIGHTS, reliability: 0 });
  const delta = scores.get("openai/gpt-4o")! - base.get("openai/gpt-4o")!;
  assert.ok(Math.abs(delta - 0.1) < 1e-9, `expected 0.1, got ${delta}`);
});

test("virtual cost helper returns real table costs, not zero", () => {
  assert.equal(resolveVirtualCost("openai", "gpt-4o"), 2.5);
  assert.equal(resolveVirtualCost("ai21", "jamba-large-1.7"), 0); // catalog free
  assert.equal(resolveVirtualCost("openai", "gpt-9-never-existed"), 5.0); // conservative fallback
});
