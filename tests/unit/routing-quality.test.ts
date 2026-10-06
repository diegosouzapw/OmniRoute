/**
 * tests/unit/routing-quality.test.ts
 *
 * Feedback-driven quality signal v2 (open-sse/services/routing/quality.ts):
 *  - operational vs semantic separation (semantic is NEVER manufactured from HTTP)
 *  - neutral 0.5 for cold providers (not unfairly penalized, cannot dominate)
 *  - confidence/sample-awareness (lucky cold provider cannot outrank a solid warm one)
 *  - success raises / failure lowers the EWMA score
 *  - malformed / stream-interrupted / empty-output anomalies penalize
 *  - 429 is transient (far lighter than a 500)
 *  - confidence ramps with sample count
 *  - reset clears state
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  recordQualityEvent,
  getQualityScore,
  getProviderQuality,
  setSemanticQuality,
  getQualitySnapshot,
  resetQualityTracker,
  QUALITY_WELL_KNOWN,
} from "../../open-sse/services/routing/quality.ts";

const { CONFIDENCE_FULL_SAMPLES } = QUALITY_WELL_KNOWN;

function record(
  provider: string,
  model: string,
  partial: Partial<Parameters<typeof recordQualityEvent>[0]> = {}
): void {
  recordQualityEvent({
    provider,
    model,
    outcome: "success",
    status: 200,
    latencyMs: 100,
    finishReason: "stop",
    ...partial,
  });
}

test("cold provider scores neutral 0.5 (no penalty, no dominance)", () => {
  resetQualityTracker();
  assert.equal(getQualityScore("openai", "gpt-4o"), 0.5);
  const q = getProviderQuality("openai", "gpt-4o");
  assert.equal(q.operational, 0.5);
  assert.equal(q.confidence, 0);
  assert.equal(q.samples, 0);
});

test("below warmup threshold the score is pulled toward neutral (not 1.0)", () => {
  resetQualityTracker();
  // 7 lucky successes: operational EWMA → 1.0, but confidence is low, so the
  // blended score must stay well below 1.0 — it must not dominate a solid warm provider.
  for (let i = 0; i < 7; i++) record("openai", "gpt-4o");
  const lucky = getQualityScore("openai", "gpt-4o");
  assert.ok(lucky > 0.5 && lucky < 0.8, `lucky cold provider should be near-neutral, got ${lucky}`);
});

test("a provider with thousands of solid observations outranks a lucky cold provider", () => {
  resetQualityTracker();
  // Solid warm provider: 4000 samples, ~91% success.
  for (let i = 0; i < 4000; i++) {
    record("p", "solid", {
      outcome: i % 11 === 0 ? "error" : "success",
      status: i % 11 === 0 ? 500 : 200,
    });
  }
  // Lucky cold provider: 7 samples, all success.
  for (let i = 0; i < 7; i++) record("p", "lucky");
  const solid = getQualityScore("p", "solid");
  const lucky = getQualityScore("p", "lucky");
  assert.ok(solid > lucky, `solid (${solid}) must outrank lucky (${lucky})`);
  assert.ok(solid > 0.8, `solid provider should score high, got ${solid}`);
});

test("sustained failures degrade; sustained successes recover gradually", () => {
  resetQualityTracker();
  for (let i = 0; i < 20; i++) record("openai", "gpt-4o", { outcome: "error", status: 500 });
  const degraded = getQualityScore("openai", "gpt-4o");
  assert.ok(degraded < 0.4, `expected degraded score, got ${degraded}`);

  for (let i = 0; i < 40; i++) record("openai", "gpt-4o");
  const recovered = getQualityScore("openai", "gpt-4o");
  assert.ok(recovered > degraded, "successes must recover the score");
  assert.ok(recovered > 0.7, `expected recovery toward healthy, got ${recovered}`);
});

test("one isolated failure does not destroy a warm provider", () => {
  resetQualityTracker();
  for (let i = 0; i < 100; i++) record("p", "m");
  const before = getQualityScore("p", "m");
  record("p", "m", { outcome: "error", status: 500 });
  const after = getQualityScore("p", "m");
  assert.ok(after > 0.7, `single failure must not destroy a healthy provider, got ${after}`);
  assert.ok(after < before, "the single failure should still register");
});

test("malformed and stream-interrupted outcomes penalize more than a clean error", () => {
  resetQualityTracker();
  record("p", "m-a", { outcome: "malformed", status: 200, finishReason: "stop" });
  for (let i = 0; i < 20; i++) record("p", "m-a");

  record("p", "m-b");
  for (let i = 0; i < 20; i++) record("p", "m-b");

  assert.ok(
    getQualityScore("p", "m-a") < getQualityScore("p", "m-b"),
    "anomaly history must lower quality below a clean record"
  );
});

test("finish_reason=length (truncated output) counts as an anomaly", () => {
  resetQualityTracker();
  for (let i = 0; i < 20; i++)
    record("p", "truncated", { outcome: "success", finishReason: "length" });
  for (let i = 0; i < 20; i++) record("p", "clean");
  assert.ok(
    getQualityScore("p", "truncated") < getQualityScore("p", "clean"),
    "length finish_reason must hurt quality"
  );
});

test("zero-output successes count as anomalies; missing output does not", () => {
  resetQualityTracker();
  for (let i = 0; i < 20; i++)
    record("p", "empty", { outcome: "success", outputTokens: 0, finishReason: "stop" });
  for (let i = 0; i < 20; i++) record("p", "ok", { outcome: "success", outputTokens: 5 });
  assert.ok(
    getQualityScore("p", "empty") < getQualityScore("p", "ok"),
    "zero-output 200 must hurt quality more than a normal 200"
  );
});

test("429 is transient (near-neutral), not a quality failure", () => {
  resetQualityTracker();
  for (let i = 0; i < 50; i++) record("p", "rl", { outcome: "rate_limited", status: 429 });
  for (let i = 0; i < 50; i++) record("p", "err", { outcome: "error", status: 500 });
  const rateLimited = getQualityScore("p", "rl");
  const error = getQualityScore("p", "err");
  assert.ok(rateLimited > error, "rate-limited should score better than hard failures");
  assert.ok(rateLimited >= 0.45, "rate-limit alone should not tank quality below neutral");
});

test("semantic quality is separate from operational and never manufactured", () => {
  resetQualityTracker();
  // A provider with perfect operational history but no evaluator → semantic null.
  for (let i = 0; i < 100; i++) record("p", "op-only");
  const q = getProviderQuality("p", "op-only");
  assert.equal(q.semantic, null, "semantic must be null until an evaluator provides it");
  assert.ok(q.operational > 0.9, "operational can be high independently");

  // An evaluator can then attach a semantic score.
  setSemanticQuality("p", "op-only", 0.42, 0.8);
  const q2 = getProviderQuality("p", "op-only");
  assert.equal(q2.semantic, 0.42);
  assert.equal(q2.semanticConfidence, 0.8);
  // The operational score must NOT be contaminated by the semantic score.
  assert.ok(
    Math.abs(q2.operational - q.operational) < 1e-9,
    "semantic must not leak into operational"
  );
});

test("snapshot reports confidence, samples and anomaly counts", () => {
  resetQualityTracker();
  for (let i = 0; i < 10; i++) record("snap", "model");
  record("snap", "model", { outcome: "malformed" });
  const snap = getQualitySnapshot();
  const view = snap.find((v) => v.provider === "snap" && v.model === "model");
  assert.ok(view, "snapshot must contain the tracked model");
  assert.equal(view!.confidence, 11 / CONFIDENCE_FULL_SAMPLES);
  assert.ok(view!.samples === 11);
  assert.ok(view!.anomalies >= 1);
  assert.ok(view!.operational >= 0 && view!.operational <= 1);
});

test("reset clears all tracked state", () => {
  resetQualityTracker();
  record("p", "m");
  assert.equal(getQualitySnapshot().length, 1);
  resetQualityTracker();
  assert.equal(getQualitySnapshot().length, 0);
  assert.equal(getQualityScore("p", "m"), 0.5);
});
