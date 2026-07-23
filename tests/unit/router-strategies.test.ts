/**
 * tests/unit/router-strategies.test.ts
 *
 * Direct coverage for the pluggable auto-router strategies in
 * open-sse/services/autoCombo/routerStrategy.ts. The `cost` and `latency`
 * strategies and the `selectWithStrategy` entry point had NO direct test
 * (only `sla-aware`/`lkgp` were covered, indirectly, in autoCombo.test.ts).
 * Also pins the documented silent fallback to `rules` for unknown names.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  getStrategy,
  selectWithStrategy,
  listStrategies,
  type RoutingContext,
} from "../../open-sse/services/autoCombo/routerStrategy.ts";
import type { ProviderCandidate } from "../../open-sse/services/autoCombo/scoring.ts";

function cand(p: Partial<ProviderCandidate> & { provider: string }): ProviderCandidate {
  return {
    model: `${p.provider}/m`,
    quotaRemaining: 100,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 1,
    p95LatencyMs: 100,
    latencyStdDev: 10,
    errorRate: 0,
    ...p,
  } as ProviderCandidate;
}

const ctx: RoutingContext = { taskType: "default" };

// ── cost ─────────────────────────────────────────────────────────────────────
test("cost — selects the cheapest healthy candidate", () => {
  const pool = [
    cand({ provider: "a", costPer1MTokens: 5 }),
    cand({ provider: "b", costPer1MTokens: 1 }),
    cand({ provider: "c", costPer1MTokens: 3 }),
  ];
  const d = getStrategy("cost").select(pool, ctx);
  assert.equal(d.provider, "b");
  assert.equal(d.strategy, "cost");
});

test("cost — excludes OPEN-breaker candidates even if cheaper", () => {
  const pool = [
    cand({ provider: "cheap-open", costPer1MTokens: 0.1, circuitBreakerState: "OPEN" }),
    cand({ provider: "ok", costPer1MTokens: 2 }),
  ];
  assert.equal(getStrategy("cost").select(pool, ctx).provider, "ok");
});

test("cost — 'eco' alias resolves to the cost strategy", () => {
  assert.equal(getStrategy("eco").name, "cost");
});

test("cost — empty pool throws", () => {
  assert.throws(() => getStrategy("cost").select([], ctx), /No candidates/);
});

// ── latency ───────────────────────────────────────────────────────────────────
test("latency — selects the lowest p95 candidate", () => {
  const pool = [
    cand({ provider: "slow", p95LatencyMs: 900 }),
    cand({ provider: "fast", p95LatencyMs: 100 }),
    cand({ provider: "mid", p95LatencyMs: 400 }),
  ];
  assert.equal(getStrategy("latency").select(pool, ctx).provider, "fast");
});

test("latency — error rate penalizes a fast-but-flaky candidate", () => {
  // flaky: 100ms + 0.5*1000 = 600 effective; steady: 400ms + 0 = 400 → steady wins.
  const pool = [
    cand({ provider: "flaky", p95LatencyMs: 100, errorRate: 0.5 }),
    cand({ provider: "steady", p95LatencyMs: 400, errorRate: 0 }),
  ];
  assert.equal(getStrategy("latency").select(pool, ctx).provider, "steady");
});

test("latency — uses TTFT, TPS, and E2E metrics to pick the fastest provider-model pair", () => {
  const pool = [
    cand({
      provider: "low-p95-slow-stream",
      p95LatencyMs: 120,
      avgTtftMs: 160,
      avgE2ELatencyMs: 1_600,
      avgTokensPerSecond: 18,
      latencyStdDev: 120,
      failureRate: 0.01,
    }),
    cand({
      provider: "fast-streaming",
      p95LatencyMs: 180,
      avgTtftMs: 40,
      avgE2ELatencyMs: 480,
      avgTokensPerSecond: 120,
      latencyStdDev: 20,
      failureRate: 0.01,
    }),
  ];
  const decision = getStrategy("latency").select(pool, ctx);
  assert.equal(decision.provider, "fast-streaming");
  assert.match(decision.reason, /ttft=40ms/);
  assert.match(decision.reason, /tps=120/);
});

test("latency — failure rate can outweigh excellent raw speed", () => {
  const pool = [
    cand({
      provider: "fast-flaky",
      p95LatencyMs: 80,
      avgTtftMs: 20,
      avgE2ELatencyMs: 260,
      avgTokensPerSecond: 160,
      failureRate: 0.9,
    }),
    cand({
      provider: "reliable",
      p95LatencyMs: 120,
      avgTtftMs: 80,
      avgE2ELatencyMs: 400,
      avgTokensPerSecond: 120,
      failureRate: 0,
      latencyStdDev: 10,
    }),
  ];
  assert.equal(getStrategy("latency").select(pool, ctx).provider, "reliable");
});

test("latency — 'fast' alias resolves to the latency strategy", () => {
  assert.equal(getStrategy("fast").name, "latency");
});

// ── sla-aware ─────────────────────────────────────────────────────────────────
test("sla-aware — prefers a candidate meeting the p95/error SLOs", () => {
  const pool = [
    cand({ provider: "violator", p95LatencyMs: 5000, errorRate: 0.3 }),
    cand({ provider: "compliant", p95LatencyMs: 300, errorRate: 0.001 }),
  ];
  const d = getStrategy("sla-aware").select(pool, {
    taskType: "default",
    sla: { targetP95Ms: 2000, maxErrorRate: 0.05 },
  });
  assert.equal(d.provider, "compliant");
  assert.equal(d.strategy, "sla-aware");
});

test("sla-aware — 'sla' alias resolves to sla-aware", () => {
  assert.equal(getStrategy("sla").name, "sla-aware");
});

test("sla-aware — hardConstraints ranks fewest-violations first", () => {
  const pool = [
    cand({ provider: "violator", p95LatencyMs: 3000, errorRate: 0.2 }),
    cand({ provider: "within", p95LatencyMs: 1500, errorRate: 0.01 }),
  ];
  const d = getStrategy("sla-aware").select(pool, {
    taskType: "default",
    sla: { targetP95Ms: 2000, maxErrorRate: 0.05, hardConstraints: true },
  });
  assert.equal(d.provider, "within");
});

// ── lkgp ──────────────────────────────────────────────────────────────────────
test("lkgp — returns the last known good provider when healthy", () => {
  const pool = [cand({ provider: "x" }), cand({ provider: "y" })];
  const d = getStrategy("lkgp").select(pool, {
    taskType: "default",
    lastKnownGoodProvider: "y",
  });
  assert.equal(d.provider, "y");
  assert.equal(d.strategy, "lkgp");
});

test("lkgp — falls back to rules when the LKGP is OPEN", () => {
  const pool = [cand({ provider: "x" }), cand({ provider: "y", circuitBreakerState: "OPEN" })];
  const d = getStrategy("lkgp").select(pool, {
    taskType: "default",
    lastKnownGoodProvider: "y",
  });
  assert.equal(d.strategy, "rules");
});

test("lkgp — lkgpEnabled:false delegates to rules", () => {
  const pool = [cand({ provider: "x" })];
  const d = getStrategy("lkgp").select(pool, {
    taskType: "default",
    lkgpEnabled: false,
    lastKnownGoodProvider: "x",
  });
  assert.equal(d.strategy, "rules");
});

// ── selectWithStrategy + registry ─────────────────────────────────────────────
test("selectWithStrategy — dispatches by name", () => {
  const pool = [
    cand({ provider: "a", costPer1MTokens: 9 }),
    cand({ provider: "b", costPer1MTokens: 1 }),
  ];
  assert.equal(selectWithStrategy(pool, ctx, "cost").provider, "b");
});

test("selectWithStrategy — unknown strategy silently falls back to rules", () => {
  const pool = [cand({ provider: "a" })];
  const d = selectWithStrategy(pool, ctx, "totally-unknown-strategy");
  assert.equal(d.strategy, "rules");
});

test("listStrategies — exposes every registered strategy + aliases", () => {
  const names = listStrategies().map((s) => s.name);
  for (const n of ["rules", "cost", "eco", "latency", "fast", "sla-aware", "sla", "lkgp"]) {
    assert.ok(names.includes(n), `listStrategies missing '${n}'`);
  }
});
