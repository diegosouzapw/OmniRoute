import assert from "node:assert/strict";
import test from "node:test";

import {
  aggregatePromotionObservations,
  computeMedian,
  computeP95,
} from "../../../src/lib/guardrails/videoBridgePromotionAggregator.ts";

test("computeMedian: odd-length sample returns the middle value regardless of input order", () => {
  assert.equal(computeMedian([5, 1, 3]), 3);
  assert.equal(computeMedian([3, 1, 5]), 3);
});

test("computeMedian: even-length sample averages the two middle values", () => {
  assert.equal(computeMedian([1, 2, 3, 4]), 2.5);
});

test("computeMedian: single sample returns that exact value", () => {
  assert.equal(computeMedian([42]), 42);
});

test("computeMedian: tied values collapse to the tied value", () => {
  assert.equal(computeMedian([7, 7, 7, 7]), 7);
});

test("computeMedian: throws on an empty sample instead of silently returning 0/NaN", () => {
  assert.throws(() => computeMedian([]), /empty/);
});

test("computeP95: nearest-rank method on a known 100-point distribution", () => {
  const values = Array.from({ length: 100 }, (_unused, index) => index + 1); // 1..100
  // Nearest-rank p95 on 100 ascending samples is the 95th smallest value.
  assert.equal(computeP95(values), 95);
});

test("computeP95: single sample returns that exact value", () => {
  assert.equal(computeP95([9]), 9);
});

test("computeP95: small sample (below 20 points) still returns a defined, deterministic value", () => {
  const values = [10, 20, 30, 40];
  const first = computeP95(values);
  const second = computeP95([...values].reverse());
  assert.equal(first, second);
  assert.ok(Number.isFinite(first));
});

test("computeP95: tied values collapse to the tied value", () => {
  assert.equal(computeP95([4, 4, 4, 4, 4]), 4);
});

test("computeP95: throws on an empty sample", () => {
  assert.throws(() => computeP95([]), /empty/);
});

test("aggregatePromotionObservations: groups by caseId+model and computes per-metric median/p95", () => {
  const aggregates = aggregatePromotionObservations([
    { caseId: "c1", metrics: { latencyMs: 100 }, model: "m1" },
    { caseId: "c1", metrics: { latencyMs: 200 }, model: "m1" },
    { caseId: "c1", metrics: { latencyMs: 300 }, model: "m1" },
    { caseId: "c1", metrics: { latencyMs: 9_999 }, model: "m2" },
  ]);
  assert.equal(aggregates.length, 2);
  const m1 = aggregates.find((entry) => entry.model === "m1" && entry.caseId === "c1");
  assert.ok(m1);
  assert.equal(m1!.sampleCount, 3);
  assert.equal(m1!.medians.latencyMs, 200);
  assert.deepEqual(m1!.missingMetrics, []);
  const m2 = aggregates.find((entry) => entry.model === "m2");
  assert.ok(m2);
  assert.equal(m2!.sampleCount, 1);
  assert.equal(m2!.medians.latencyMs, 9_999);
  assert.equal(m2!.p95.latencyMs, 9_999);
});

test("aggregatePromotionObservations: a metric recorded elsewhere but absent from this group is reported missing, not zero", () => {
  const aggregates = aggregatePromotionObservations([
    { caseId: "c1", metrics: { latencyMs: 100 }, model: "m1" },
    { caseId: "c1", metrics: { latencyMs: 120 }, model: "m1" },
    { caseId: "c2", metrics: { latencyMs: 50, totalTokens: 10 }, model: "m1" },
  ]);
  const c1 = aggregates.find((entry) => entry.caseId === "c1" && entry.model === "m1");
  assert.ok(c1);
  assert.deepEqual(c1!.missingMetrics, ["totalTokens"]);
  assert.equal(c1!.medians.totalTokens, undefined);
});

test("aggregatePromotionObservations: empty input returns an empty aggregate list", () => {
  assert.deepEqual(aggregatePromotionObservations([]), []);
});
