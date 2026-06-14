/**
 * #3173 — cross-request tool latency metrics.
 *
 * toolLatencyTracker aggregates per-provider TTFT/gap after tool calls;
 * sessionManager persists a one-shot tool-finish timestamp so the follow-up
 * request (Request 2) can measure cross-request TTFT.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  recordToolLatency,
  getToolLatencyByProvider,
  recordToolTtft,
  resetToolLatency,
} = await import("../../open-sse/services/toolLatencyTracker.ts");
const { markToolFinish, consumeToolFinishTime } = await import(
  "../../open-sse/services/sessionManager.ts"
);

test("recordToolLatency averages TTFT/gap per provider and counts requests", () => {
  resetToolLatency();
  recordToolLatency("openai", 100, 40);
  recordToolLatency("openai", 300, 60);
  recordToolLatency("anthropic", 200, null);

  const m = getToolLatencyByProvider();
  assert.equal(m.openai.avgTtftAfterToolMs, 200); // (100+300)/2
  assert.equal(m.openai.avgGapAfterToolMs, 50); // (40+60)/2
  assert.equal(m.openai.measurementCount, 2);
  assert.equal(m.anthropic.avgTtftAfterToolMs, 200);
  assert.equal(m.anthropic.avgGapAfterToolMs, 0); // no gap samples
  assert.equal(m.anthropic.measurementCount, 1);
});

test("recordToolLatency ignores null/negative samples but still counts the request", () => {
  resetToolLatency();
  recordToolLatency("glm", null, null);
  recordToolLatency("glm", -5, -5);
  const m = getToolLatencyByProvider();
  assert.equal(m.glm.measurementCount, 2);
  assert.equal(m.glm.avgTtftAfterToolMs, 0);
  assert.equal(m.glm.avgGapAfterToolMs, 0);
});

test("recordToolTtft accumulates and resetToolLatency clears", () => {
  resetToolLatency();
  recordToolTtft("codex", 120);
  recordToolTtft("codex", 80);
  assert.equal(getToolLatencyByProvider().codex.avgTtftAfterToolMs, 100);
  resetToolLatency();
  assert.deepEqual(getToolLatencyByProvider(), {});
});

test("markToolFinish/consumeToolFinishTime is a one-shot per session", () => {
  // null session is a no-op / null
  markToolFinish(null);
  assert.equal(consumeToolFinishTime(null), null);
  // unknown session (never touched) → null
  assert.equal(consumeToolFinishTime("sess-never-seen-xyz"), null);
});
