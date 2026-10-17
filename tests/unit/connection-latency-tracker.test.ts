/**
 * Per-connection latency tracker that feeds the opt-in p2c latency term.
 * Covers the rolling window, TTL pruning, the LRU key cap, model-scoped stats with the
 * connection-level fallback, the fail-open recorder and the ratio-based pair penalty.
 */
import { test, mock } from "node:test";
import assert from "node:assert/strict";

import {
  LATENCY_MAX_KEYS,
  LATENCY_MIN_SAMPLES,
  LATENCY_SAMPLE_TTL_MS,
  LATENCY_WINDOW_SIZE,
  getConnectionLatencyStats,
  getP2CLatencyPenalties,
  recordConnectionOutcome,
  resetConnectionLatencyTracker,
} from "../../open-sse/services/connectionLatencyTracker.ts";

function seed(
  connectionId: string,
  model: string | null,
  ttfbMs: number,
  count: number,
  ok = true
) {
  for (let i = 0; i < count; i++) recordConnectionOutcome(connectionId, model, ttfbMs, ok);
}

test.beforeEach(() => {
  resetConnectionLatencyTracker();
});

test("an unknown connection has no samples", () => {
  const stats = getConnectionLatencyStats("missing");
  assert.equal(stats.samples, 0);
  assert.equal(stats.avgTtfbMs, 0);
  assert.equal(stats.errorRate, 0);
});

test("avg and p95 come from successful samples; failures only raise the error rate", () => {
  for (const ms of [100, 200, 300, 400]) recordConnectionOutcome("c1", null, ms, true);
  recordConnectionOutcome("c1", null, 5, false);

  const stats = getConnectionLatencyStats("c1");
  assert.equal(stats.samples, 5);
  assert.equal(stats.successes, 4);
  assert.equal(stats.avgTtfbMs, 250);
  assert.equal(stats.p95TtfbMs, 400);
  assert.equal(stats.errorRate, 0.2);
});

test("the window keeps only the most recent samples", () => {
  seed("c1", null, 1000, LATENCY_WINDOW_SIZE);
  seed("c1", null, 100, LATENCY_WINDOW_SIZE);

  const stats = getConnectionLatencyStats("c1");
  assert.equal(stats.samples, LATENCY_WINDOW_SIZE);
  assert.equal(stats.avgTtfbMs, 100);
});

test("samples older than the TTL are pruned", () => {
  mock.timers.enable({ apis: ["Date"], now: 1_000_000 });
  try {
    seed("c1", null, 900, 3);
    mock.timers.tick(LATENCY_SAMPLE_TTL_MS + 1);
    seed("c1", null, 100, 2);

    const stats = getConnectionLatencyStats("c1");
    assert.equal(stats.samples, 2);
    assert.equal(stats.avgTtfbMs, 100);
  } finally {
    mock.timers.reset();
  }
});

test("the store evicts the least recently written keys past the cap", () => {
  recordConnectionOutcome("oldest", null, 100, true);
  for (let i = 0; i < LATENCY_MAX_KEYS; i++) recordConnectionOutcome(`conn-${i}`, null, 100, true);

  assert.equal(getConnectionLatencyStats("oldest").samples, 0);
  assert.equal(getConnectionLatencyStats(`conn-${LATENCY_MAX_KEYS - 1}`).samples, 1);
});

test("model-scoped stats win once they have enough samples, else the connection-level ones", () => {
  seed("c1", "model-a", 100, LATENCY_MIN_SAMPLES);
  seed("c1", "model-b", 900, 1);

  const scoped = getConnectionLatencyStats("c1", "model-a");
  assert.equal(scoped.scoped, true);
  assert.equal(scoped.avgTtfbMs, 100);

  const fallback = getConnectionLatencyStats("c1", "model-b");
  assert.equal(fallback.scoped, false);
  assert.equal(fallback.samples, LATENCY_MIN_SAMPLES + 1);
});

test("recordConnectionOutcome never throws and ignores missing or synthetic ids", () => {
  assert.doesNotThrow(() => recordConnectionOutcome(null, null, 100, true));
  assert.doesNotThrow(() => recordConnectionOutcome(undefined, "m", Number.NaN, true));
  assert.doesNotThrow(() => recordConnectionOutcome("noauth", null, 100, true));
  assert.doesNotThrow(() => recordConnectionOutcome("c1", null, -5, true));

  assert.equal(getConnectionLatencyStats("noauth").samples, 0);
  assert.equal(getConnectionLatencyStats("c1").samples, 1);
  assert.equal(getConnectionLatencyStats("c1").avgTtfbMs, 0);
});

test("the pair penalty is zero when the weight is 0", () => {
  seed("fast", null, 100, LATENCY_MIN_SAMPLES);
  seed("slow", null, 400, LATENCY_MIN_SAMPLES);
  assert.deepEqual(getP2CLatencyPenalties("fast", "slow", null, 0), [0, 0]);
});

test("the pair penalty is zero until both candidates have minSamples", () => {
  seed("fast", null, 100, LATENCY_MIN_SAMPLES);
  seed("new", null, 400, LATENCY_MIN_SAMPLES - 1);
  assert.deepEqual(getP2CLatencyPenalties("fast", "new", null, 10), [0, 0]);
});

test("a much slower candidate takes the larger penalty, bounded by the weight", () => {
  seed("fast", null, 100, LATENCY_MIN_SAMPLES);
  seed("slow", null, 400, LATENCY_MIN_SAMPLES);
  const [fast, slow] = getP2CLatencyPenalties("fast", "slow", null, 10);
  assert.equal(fast, 0);
  assert.ok(slow > fast);
  assert.ok(slow <= 10);
});

test("ratio normalization: a clean account 10% slower beats a fast one failing 30% of calls", () => {
  for (let i = 0; i < 7; i++) recordConnectionOutcome("flaky-fast", null, 100, true);
  for (let i = 0; i < 3; i++) recordConnectionOutcome("flaky-fast", null, 100, false);
  seed("clean-slower", null, 110, 10);

  const [flaky, clean] = getP2CLatencyPenalties("flaky-fast", "clean-slower", null, 10);
  assert.ok(clean < flaky, `clean ${clean} should be below flaky ${flaky}`);
});
