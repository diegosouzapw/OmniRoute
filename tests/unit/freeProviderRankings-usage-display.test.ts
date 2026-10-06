/**
 * The Free Provider Rankings page ranks by ELO, which describes a provider that
 * errors on every call as healthy. These tests pin the two rules that keep the
 * reliability column honest: a rate is only ever shown when the sample supports
 * one, and "no data" never renders as 0%.
 *
 * Targets the PURE helpers (no DB, no DOM).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatUsageReliability, usageToneClass } from "../../src/lib/freeProviderRankingsUsage";
import { needsConnectionSnapshot } from "../../src/lib/freeProviderRankings";
import type { ProviderUsage } from "../../src/lib/freeProviderRankings";

function usage(over: Partial<ProviderUsage> = {}): ProviderUsage {
  return {
    requests: 100,
    successes: 99,
    successRate: 0.99,
    avgLatencyMs: 800,
    lastRequestAt: "2026-08-25T00:00:00.000Z",
    windowHours: 24,
    ...over,
  };
}

test("a provider nobody called reads as no data, never as 0%", () => {
  const d = formatUsageReliability(undefined);
  assert.equal(d.kind, "none");
  assert.equal(d.percent, null);
  assert.equal(d.tone, "unknown");
});

test("a sample too small for a rate is reported as such, not as a rate", () => {
  // The API refuses to compute a rate below its own threshold (`successRate: null`).
  const d = formatUsageReliability(usage({ requests: 2, successes: 1, successRate: null }));
  assert.equal(d.kind, "insufficient");
  assert.equal(d.percent, null);
  assert.equal(d.tone, "unknown");
  assert.equal(d.requests, 2, "the sample size still travels, for the tooltip");
});

test("a null rate with no traffic at all is 'none', not 'insufficient'", () => {
  const d = formatUsageReliability(usage({ requests: 0, successes: 0, successRate: null }));
  assert.equal(d.kind, "none");
});

test("a provider that errors on every call cannot read as healthy", () => {
  const d = formatUsageReliability(usage({ requests: 80, successes: 0, successRate: 0 }));
  assert.equal(d.kind, "rate");
  assert.equal(d.percent, 0);
  assert.equal(d.tone, "poor");
  assert.notEqual(usageToneClass(d.tone), usageToneClass("good"));
});

test("tones split at the thresholds the column colours depend on", () => {
  assert.equal(formatUsageReliability(usage({ successRate: 0.95 })).tone, "good");
  assert.equal(formatUsageReliability(usage({ successRate: 0.949 })).tone, "fair");
  assert.equal(formatUsageReliability(usage({ successRate: 0.8 })).tone, "fair");
  assert.equal(formatUsageReliability(usage({ successRate: 0.799 })).tone, "poor");
});

test("percent is rounded, and the window travels with it", () => {
  const d = formatUsageReliability(usage({ successRate: 0.9449, windowHours: 168 }));
  assert.equal(d.percent, 94);
  assert.equal(d.windowHours, 168);
});

test("withUsage alone pulls the connection snapshot it depends on", () => {
  // Regression: `usage` hangs off `reliability`, which only exists once the
  // snapshot is loaded. `withUsage` used to be ignored unless a filter was set.
  assert.equal(needsConnectionSnapshot({ withUsage: true }), true);
  assert.equal(needsConnectionSnapshot({ configuredOnly: true }), true);
  assert.equal(needsConnectionSnapshot({ availableOnly: true }), true);
  assert.equal(needsConnectionSnapshot({}), false);
});
