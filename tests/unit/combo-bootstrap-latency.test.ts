// tests/unit/combo-bootstrap-latency.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";

// Median helper lives in combo.ts; import it directly (export it non-default).
import { poolMedianP95Ms, bootstrapMs, shouldWarnBootstrap, resetBootstrapCounters, bootstrapLatencyHits, bootstrapLatencyTotal } from "../../open-sse/services/combo.ts";

test("median ignores corrupt entries", () => {
  const m = poolMedianP95Ms({
    "a/x": { p95LatencyMs: 1000 },
    "b/y": { p95LatencyMs: NaN },
    "c/z": { p95LatencyMs: -5 },
    "d/w": { p95LatencyMs: 3000 },
  } as never);
  assert.equal(m, 1000);
});

test("empty stats yield undefined (caller falls back to 1500, no cold-start alarm)", () => {
  assert.equal(poolMedianP95Ms({}), undefined);
});

test("counters start at zero", () => {
  resetBootstrapCounters();
  assert.equal(bootstrapLatencyHits, 0);
  assert.equal(bootstrapLatencyTotal, 0);
});

test("table hit bumps Total but not Hits; miss bumps both", () => {
  resetBootstrapCounters();
  assert.equal(bootstrapMs("gpt-4o-mini", 9999), 2764); // table hit
  assert.equal(bootstrapLatencyTotal, 1);
  assert.equal(bootstrapLatencyHits, 0);
  assert.equal(bootstrapMs("some-new-model-xyz", 1234), 1234); // miss -> median
  assert.equal(bootstrapLatencyTotal, 2);
  assert.equal(bootstrapLatencyHits, 1);
  assert.equal(bootstrapMs("another-new-model", undefined), 1500); // miss, no median
  resetBootstrapCounters();
});

test("warn gate is pure: cold start and low ratio stay silent, dominant warns once", () => {
  assert.equal(shouldWarnBootstrap(10, 10, false, 9999, 0), false); // cold start
  assert.equal(shouldWarnBootstrap(2, 10, true, 9999, 0), false); // ratio <= 0.3
  assert.equal(shouldWarnBootstrap(5, 10, true, 9999, 0), false); // throttled 1h
  assert.equal(shouldWarnBootstrap(5, 10, true, 3600_001, 0), true); // window elapsed
  assert.equal(shouldWarnBootstrap(5, 10, true, 9999, 9000), false); // throttled 1h
});
