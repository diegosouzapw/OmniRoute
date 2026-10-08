// tests/unit/combo-bootstrap-latency.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";

// Median helper lives in combo.ts; import it directly (export it non-default).
import {
  poolMedianP95Ms,
  bootstrapMs,
  bootstrapSourceFromTable,
  shouldWarnBootstrap,
  resetBootstrapCounters,
  formatBootstrapWarning,
  maybeWarnBootstrapDominant,
  bootstrapSourceCounts,
} from "../../open-sse/services/combo.ts";

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
  assert.equal(bootstrapSourceCounts.table, 0);
  assert.equal(bootstrapSourceCounts["pool-median"], 0);
  assert.equal(bootstrapSourceCounts.constant, 0);
});

test("table hit bumps the table counter; misses bump pool-median or constant", () => {
  resetBootstrapCounters();
  assert.equal(bootstrapMs("gpt-4o-mini", 9999), 2764); // table hit
  assert.equal(bootstrapSourceCounts.table, 1);
  assert.equal(bootstrapSourceCounts["pool-median"], 0);
  assert.equal(bootstrapSourceCounts.constant, 0);
  assert.equal(bootstrapMs("some-new-model-xyz", 1234), 1234); // miss -> median
  assert.equal(bootstrapSourceCounts["pool-median"], 1);
  assert.equal(bootstrapMs("another-new-model", undefined), 1500); // miss, no median
  assert.equal(bootstrapSourceCounts.constant, 1);
  resetBootstrapCounters();
});

test("bootstrap source traces table, pool median, and constant fallbacks", () => {
  // Same four provenance cases as the former model-based wrapper test,
  // expressed through the authority with the values the shared table yields:
  // gpt-4o-mini hits the table (2764), unknown models miss it (undefined).
  assert.equal(bootstrapSourceFromTable(2764, 9999), "table"); // gpt-4o-mini
  assert.equal(bootstrapSourceFromTable(undefined, 1234), "pool-median"); // some-new-model-xyz
  assert.equal(bootstrapSourceFromTable(undefined, undefined), "constant"); // another-new-model, no median
  assert.equal(bootstrapSourceFromTable(undefined, undefined), "constant"); // empty model, no median
});

test("warn gate is pure: cold start and low ratio stay silent, dominant warns once", () => {
  assert.equal(shouldWarnBootstrap(10, 10, false, 9999, 0), false); // cold start
  assert.equal(shouldWarnBootstrap(2, 10, true, 9999, 0), false); // ratio <= 0.3
  assert.equal(shouldWarnBootstrap(5, 10, true, 9999, 0), false); // throttled 1h
  assert.equal(shouldWarnBootstrap(5, 10, true, 3600_001, 0), true); // window elapsed
  assert.equal(shouldWarnBootstrap(5, 10, true, 9999, 9000), false); // throttled 1h
});

test("warning carries a per-source breakdown, never a single last-call source", () => {
  resetBootstrapCounters();
  bootstrapMs("some-new-model-xyz", 1234); // pool-median estimate
  bootstrapMs("another-new-model", undefined); // constant estimate
  bootstrapMs("gpt-4o-mini", 9999); // table hit last: must not claim "source: table"
  const { table, "pool-median": pm, constant } = bootstrapSourceCounts;
  const hits = pm + constant;
  const total = table + pm + constant;
  assert.equal(shouldWarnBootstrap(hits, total, true, 3600_001, 0), true);
  const warning = formatBootstrapWarning();
  assert.ok(warning.includes(`pool-median: ${pm}`));
  assert.ok(warning.includes(`constant: ${constant}`));
  assert.ok(!warning.includes("source: table"));
  assert.ok(warning.includes("—"));
  resetBootstrapCounters();
});

test("warning path emits the breakdown through the throttled warn helper", () => {
  resetBootstrapCounters();
  bootstrapMs("some-new-model-xyz", 1234);
  bootstrapMs("another-new-model", undefined);
  bootstrapMs("gpt-4o-mini", 9999); // table hit last
  const lines: string[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    lines.push(args.map(String).join(" "));
  };
  try {
    maybeWarnBootstrapDominant(true);
    assert.equal(lines.length, 1);
    assert.ok(lines[0].includes("pool-median: 1"));
    assert.ok(lines[0].includes("constant: 1"));
    assert.ok(!lines[0].includes("source: table"));
    maybeWarnBootstrapDominant(true); // throttled within the hour
    assert.equal(lines.length, 1);
  } finally {
    console.warn = originalWarn;
    resetBootstrapCounters();
  }
});
