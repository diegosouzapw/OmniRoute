/**
 * Guards for the shared probe-target resolution (#8411).
 *
 * The scheduler sweep and the "Test All" endpoint used to carry their own copy of the probe
 * target and batch size. They now share src/lib/proxyHealth/probeTarget.ts, so these tests pin
 * two things: that the defaults still match what both call sites hardcoded before, and that no
 * environment value can produce a batch size that would hang the sweep loop.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_PROBE_CONCURRENCY,
  DEFAULT_PROBE_STAGGER_MS,
  DEFAULT_PROBE_TARGET,
  MAX_PROBE_CONCURRENCY,
  MAX_PROBE_STAGGER_MS,
  resolveProbeConcurrency,
  resolveProbeStaggerMs,
  resolveProbeTarget,
  staggerDelayMs,
  waitForProbeSlot,
} from "../../../src/lib/proxyHealth/probeTarget.ts";

// ─── the loop-safety invariant ─────────────────────────

test("no environment value can yield a batch size below 1", () => {
  // `for (i = 0; i < n; i += concurrency)` never advances at 0 and walks backwards below it,
  // so this is the one property that turns a bad config into a hung sweep rather than a slow one.
  const hostile = [
    "0",
    "-1",
    "-9999",
    "",
    "   ",
    "abc",
    "NaN",
    "Infinity",
    "-Infinity",
    "1e-9",
    "0.4",
    "null",
    undefined,
  ];
  for (const raw of hostile) {
    const resolved = resolveProbeConcurrency({ PROXY_HEALTH_TEST_CONCURRENCY: raw });
    assert.ok(
      Number.isInteger(resolved) && resolved >= 1,
      `concurrency ${JSON.stringify(raw)} resolved to ${resolved}`
    );
  }
});

// ─── defaults: what both call sites hardcoded before ───

test("the defaults reproduce the previous hardcoded values", () => {
  assert.equal(resolveProbeTarget({}), DEFAULT_PROBE_TARGET);
  assert.equal(DEFAULT_PROBE_TARGET, "https://httpbin.org/ip");
  assert.equal(resolveProbeConcurrency({}), DEFAULT_PROBE_CONCURRENCY);
  assert.equal(DEFAULT_PROBE_CONCURRENCY, 10);
  assert.equal(resolveProbeStaggerMs({}), DEFAULT_PROBE_STAGGER_MS);
});

// ─── target ────────────────────────────────────────────

test("an operator-supplied target wins", () => {
  assert.equal(
    resolveProbeTarget({ PROXY_HEALTH_TEST_URL: "https://probe.internal/ping" }),
    "https://probe.internal/ping"
  );
});

test("an empty target falls back, a whitespace one is left untouched", () => {
  assert.equal(resolveProbeTarget({ PROXY_HEALTH_TEST_URL: "" }), DEFAULT_PROBE_TARGET);
  // Whitespace is truthy, so it reached the probe before this refactor. Trimming it here would
  // silently repair a broken deployment — a behavior change this change is not entitled to make.
  assert.equal(resolveProbeTarget({ PROXY_HEALTH_TEST_URL: "   " }), "   ");
});

// ─── concurrency ───────────────────────────────────────

test("concurrency honours a sane value and is capped", () => {
  assert.equal(resolveProbeConcurrency({ PROXY_HEALTH_TEST_CONCURRENCY: "3" }), 3);
  assert.equal(
    resolveProbeConcurrency({ PROXY_HEALTH_TEST_CONCURRENCY: "10000" }),
    MAX_PROBE_CONCURRENCY
  );
});

test("an unparseable concurrency falls back instead of yielding NaN", () => {
  assert.equal(
    resolveProbeConcurrency({ PROXY_HEALTH_TEST_CONCURRENCY: "abc" }),
    DEFAULT_PROBE_CONCURRENCY
  );
});

// ─── stagger ───────────────────────────────────────────

test("the stagger step is clamped to its bounds", () => {
  assert.equal(resolveProbeStaggerMs({ PROXY_HEALTH_TEST_STAGGER_MS: "250" }), 250);
  assert.equal(resolveProbeStaggerMs({ PROXY_HEALTH_TEST_STAGGER_MS: "0" }), 0);
  assert.equal(resolveProbeStaggerMs({ PROXY_HEALTH_TEST_STAGGER_MS: "-50" }), 0);
  assert.equal(
    resolveProbeStaggerMs({ PROXY_HEALTH_TEST_STAGGER_MS: "999999" }),
    MAX_PROBE_STAGGER_MS
  );
});

test("an unparseable stagger falls back instead of yielding NaN", () => {
  const resolved = resolveProbeStaggerMs({ PROXY_HEALTH_TEST_STAGGER_MS: "later" });
  assert.equal(resolved, DEFAULT_PROBE_STAGGER_MS);
  assert.ok(Number.isFinite(resolved));
});

// ─── delay computation ─────────────────────────────────

test("the head of a batch is never delayed", () => {
  assert.equal(staggerDelayMs(0, 100), 0);
});

test("delays grow strictly with the position in the batch", () => {
  const step = 100;
  for (let i = 1; i < 10; i++) {
    assert.equal(staggerDelayMs(i, step), i * step);
    assert.ok(staggerDelayMs(i, step) > staggerDelayMs(i - 1, step));
  }
});

test("a zero or negative step inserts no wait at all", () => {
  for (const step of [0, -1]) {
    for (let i = 0; i < 5; i++) {
      assert.equal(staggerDelayMs(i, step), 0);
    }
  }
});

test("a negative index cannot produce a negative wait", () => {
  assert.equal(staggerDelayMs(-1, 100), 0);
});

// ─── the wait itself ───────────────────────────────────

test("the head of a batch is not held back at all", async () => {
  const before = Date.now();
  await waitForProbeSlot(0, 100);
  // No timer is armed for slot 0, so this resolves on the microtask queue. The assertion is
  // deliberately loose: it proves no ~100ms timer fired, not a precise scheduler timing.
  assert.ok(Date.now() - before < 50, "slot 0 must not wait");
});

test("a later slot is actually held back", async () => {
  const before = Date.now();
  await waitForProbeSlot(2, 30);
  assert.ok(Date.now() - before >= 55, "slot 2 must wait about two steps");
});

test("a disabled step holds nobody back", async () => {
  const before = Date.now();
  await Promise.all([waitForProbeSlot(5, 0), waitForProbeSlot(9, 0)]);
  assert.ok(Date.now() - before < 50, "a zero step must insert no wait");
});
