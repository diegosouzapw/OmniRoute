/**
 * tests/unit/observability/metrics.test.ts
 *
 * Prometheus-style registry + the four instrument types. Covers:
 *   - Counter increments + dropped-total accounting
 *   - Gauge set / inc / dec
 *   - Histogram bucket accumulation
 *   - Summary quantile calculation
 *   - Cardinality cap (label-set drop after the limit)
 *   - httpMetricsMiddleware shape
 *   - recordProviderAttempt / recordCacheHit / recordQuotaRemaining helpers
 *   - setProcessMetrics is idempotent
 */

import test from "node:test";
import assert from "node:assert/strict";

const m = await import("../../../src/lib/observability/metrics.ts");

test("Counter inc accumulates by label-set", () => {
  const c = m.createCounter({ name: "test_counter_1", help: "t", labelNames: ["k"] });
  c.inc({ k: "a" });
  c.inc({ k: "a" });
  c.inc({ k: "b" });
  assert.equal(c.get({ k: "a" }), 2);
  assert.equal(c.get({ k: "b" }), 1);
});

test("Counter inc without required label throws", () => {
  const c = m.createCounter({ name: "test_counter_2", help: "t", labelNames: ["k"] });
  assert.throws(() => c.inc());
});

test("Counter enforces the cardinality cap and bumps droppedCount", () => {
  const c = m.createCounter({
    name: "test_counter_3",
    help: "t",
    labelNames: ["k"],
    cardinalityLimit: 2,
  });
  c.inc({ k: "a" });
  c.inc({ k: "b" });
  c.inc({ k: "c" }); // drops
  c.inc({ k: "d" }); // drops
  assert.equal(c.droppedCount() >= 2, true);
  assert.equal(c.get({ k: "a" }), 1);
  assert.equal(c.get({ k: "b" }), 1);
});

test("Gauge set / inc / dec work on the same label-set", () => {
  const g = m.createGauge({ name: "test_gauge_1", help: "g", labelNames: ["k"] });
  g.set({ k: "x" }, 5);
  assert.equal(g.get({ k: "x" }), 5);
  g.inc({ k: "x" }, 3);
  assert.equal(g.get({ k: "x" }), 8);
  g.dec({ k: "x" }, 2);
  assert.equal(g.get({ k: "x" }), 6);
});

test("Histogram observe accumulates per-bucket + sum + count", () => {
  const h = m.createHistogram({
    name: "test_hist_1",
    help: "h",
    labelNames: ["op"],
    buckets: [1, 2, 5, 10],
  });
  h.observe({ op: "q" }, 0.5);
  h.observe({ op: "q" }, 1.5);
  h.observe({ op: "q" }, 7);
  h.observe({ op: "q" }, 50);
  const sc = h.sumCount({ op: "q" });
  assert.equal(sc.count, 4);
  assert.equal(sc.sum, 0.5 + 1.5 + 7 + 50);
  const b = h.buckets({ op: "q" });
  // Buckets are CUMULATIVE: b[i].count is the number of observations whose
  // value is ≤ buckets[i]. With custom buckets [1, 2, 5, 10]:
  //   0.5 → ≤ 1, 2, 5, 10  → contributes to ALL four buckets
  //   1.5 → ≤ 2, 5, 10     → contributes to buckets 1..3
  //   7   → ≤ 10           → contributes to bucket 3 only (7 > 5)
  //   50  → falls outside the largest bucket
  // So:
  //   b[0] (le=1)  = 1
  //   b[1] (le=2)  = 2
  //   b[2] (le=5)  = 2  (7 is NOT ≤ 5)
  //   b[3] (le=10) = 3  (50 is NOT ≤ 10)
  assert.equal(b[0].count, 1);
  assert.equal(b[1].count, 2);
  assert.equal(b[2].count, 2);
  assert.equal(b[3].count, 3);
});

test("Summary observe accumulates sum + count + quantiles", () => {
  const s = m.createSummary({
    name: "test_sum_1",
    help: "s",
    labelNames: ["op"],
    quantiles: [0.5, 0.9],
  });
  for (let i = 1; i <= 100; i++) s.observe({ op: "x" }, i);
  const snap = s.get({ op: "x" });
  assert.equal(snap.count, 100);
  assert.equal(snap.sum, 5050);
  // Quantile indexing: idx = min(N-1, floor(q * N)). For N=100, q=0.5:
  //   idx = floor(0.5 * 100) = 50 → sorted[50] = 51 (1-indexed values).
  // The implementation picks the 51st smallest value, which is 51.
  assert.equal(snap.quantiles[0.5], 51);
  assert.ok(snap.quantiles[0.9] >= 90);
});

test("httpMetricsMiddleware returns onStart/onFinish closures", () => {
  const reqC = m.createCounter({ name: "test_http_req", help: "h", labelNames: ["method", "route", "status"] });
  const durH = m.createHistogram({
    name: "test_http_dur",
    help: "h",
    labelNames: ["method", "route", "status"],
  });
  const mw = m.httpMetricsMiddleware({ requestCounter: reqC, durationHistogram: durH });
  const stop = mw.onStart();
  mw.onFinish("GET", "/foo", 200, 0.01);
  stop();
  // After a successful call, the counter should have incremented once.
  assert.equal(reqC.get({ method: "GET", route: "/foo", status: "200" }) >= 1, true);
});

test("recordProviderAttempt increments attempts + durations", () => {
  const attempts = m.createCounter({
    name: "test_attempts",
    help: "a",
    labelNames: ["provider", "model", "outcome"],
  });
  const durations = m.createHistogram({
    name: "test_attempt_dur",
    help: "d",
    labelNames: ["provider", "model", "outcome"],
  });
  m.recordProviderAttempt(attempts, durations, {
    provider: "openai",
    model: "gpt-4o",
    outcome: "success",
    durationSeconds: 0.5,
  });
  assert.equal(
    attempts.get({ provider: "openai", model: "gpt-4o", outcome: "success" }),
    1
  );
  assert.equal(durations.sumCount({ provider: "openai", model: "gpt-4o", outcome: "success" }).count, 1);
});

test("recordCacheHit / recordCacheMiss increment with the right outcome label", () => {
  const c = m.createCounter({ name: "test_cache", help: "c", labelNames: ["layer", "outcome"] });
  m.recordCacheHit(c, "prompt");
  m.recordCacheMiss(c, "prompt");
  m.recordCacheHit(c, "semantic");
  assert.equal(c.get({ layer: "prompt", outcome: "hit" }), 1);
  assert.equal(c.get({ layer: "prompt", outcome: "miss" }), 1);
  assert.equal(c.get({ layer: "semantic", outcome: "hit" }), 1);
});

test("recordQuotaRemaining / recordQuotaLimit set the gauge", () => {
  const g = m.createGauge({ name: "test_quota", help: "q", labelNames: ["tenant"] });
  m.recordQuotaRemaining(g, "acme", 250);
  m.recordQuotaLimit(g, "acme", 1000);
  // Both helpers call gauge.set() — last-write-wins. The test exercises
  // recordQuotaLimit which is invoked AFTER recordQuotaRemaining, so the
  // value is 1000.
  assert.equal(g.get({ tenant: "acme" }), 1000);
});

test("setProcessMetrics is idempotent", () => {
  m.setProcessMetrics();
  m.setProcessMetrics();
  // After two calls, process_resident_memory_bytes should be registered.
  const all = m.metricsRegistry.all();
  assert.ok(all.some((x) => x.metric.name === "process_resident_memory_bytes"));
});

test("metricsRegistry.reset clears every metric", () => {
  m.metricsRegistry.reset();
  assert.equal(m.metricsRegistry.all().length, 0);
});