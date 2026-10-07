/**
 * Unit tests for the #6150 "configured / non-exhausted" filters on the Free
 * Provider Rankings page.
 *
 * Targets the PURE helpers `isProviderUsable` + `filterFreeProviderRankings`
 * (no DB, no I/O) so the filter logic is exercised in isolation. The async
 * `computeFreeProviderRankings` merely wraps these over `getProviderConnections`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isProviderUsable,
  filterFreeProviderRankings,
  attachProviderReliability,
  attachProviderUsage,
  type ConnectionState,
  type FreeProviderRanking,
} from "../../src/lib/freeProviderRankings.ts";

const FIXED_NOW = 1_700_000_000_000; // deterministic "now" for rate-limit math
const future = () => new Date(FIXED_NOW + 60_000).toISOString();
const past = () => new Date(FIXED_NOW - 60_000).toISOString();

function ranking(id: string): FreeProviderRanking {
  return {
    id,
    name: id,
    icon: "",
    color: "#000",
    category: "apikey",
    topModel: null,
    averageScore: 0.5,
    modelCount: 1,
  };
}

function conn(provider: string, extra: Partial<ConnectionState> = {}): ConnectionState {
  return { provider, testStatus: "active", rateLimitedUntil: null, ...extra };
}

// ──────────────── isProviderUsable ────────────────

test("isProviderUsable: healthy connection is usable", () => {
  assert.equal(isProviderUsable([conn("glm")], FIXED_NOW), true);
});

test("isProviderUsable: empty connection list is not usable", () => {
  assert.equal(isProviderUsable([], FIXED_NOW), false);
});

test("isProviderUsable: terminal statuses (credits_exhausted/banned/expired) are not usable", () => {
  for (const status of ["credits_exhausted", "banned", "expired"]) {
    assert.equal(
      isProviderUsable([conn("glm", { testStatus: status })], FIXED_NOW),
      false,
      `expected ${status} to be unusable`
    );
  }
  // case/whitespace-insensitive normalization
  assert.equal(isProviderUsable([conn("glm", { testStatus: "  BANNED " })], FIXED_NOW), false);
});

test("isProviderUsable: future rateLimitedUntil is not usable; past/null is usable", () => {
  assert.equal(isProviderUsable([conn("glm", { rateLimitedUntil: future() })], FIXED_NOW), false);
  assert.equal(isProviderUsable([conn("glm", { rateLimitedUntil: past() })], FIXED_NOW), true);
  assert.equal(isProviderUsable([conn("glm", { rateLimitedUntil: null })], FIXED_NOW), true);
});

test("isProviderUsable: mixed — one usable connection makes the provider usable", () => {
  const conns = [
    conn("glm", { testStatus: "credits_exhausted" }),
    conn("glm", { rateLimitedUntil: future() }),
    conn("glm"), // healthy
  ];
  assert.equal(isProviderUsable(conns, FIXED_NOW), true);
});

// ──────────────── filterFreeProviderRankings ────────────────

const RANKINGS = [ranking("glm"), ranking("groq"), ranking("cerebras")];

test("filter: both flags off returns the input unchanged (regression)", () => {
  const out = filterFreeProviderRankings(RANKINGS, [], {}, FIXED_NOW);
  assert.deepEqual(
    out.map((r) => r.id),
    ["glm", "groq", "cerebras"]
  );
  // identical even when connections exist but no flag is set
  const out2 = filterFreeProviderRankings(RANKINGS, [conn("glm")], {}, FIXED_NOW);
  assert.equal(out2.length, 3);
});

test("filter: configuredOnly keeps only providers with ≥1 connection", () => {
  const connections = [conn("glm"), conn("groq", { testStatus: "credits_exhausted" })];
  const out = filterFreeProviderRankings(
    RANKINGS,
    connections,
    { configuredOnly: true },
    FIXED_NOW
  );
  // cerebras has no connection → dropped; groq stays (configured, exhaustion ignored)
  assert.deepEqual(
    out.map((r) => r.id),
    ["glm", "groq"]
  );
});

test("filter: availableOnly drops exhausted-only provider, keeps healthy", () => {
  const connections = [conn("glm"), conn("groq", { testStatus: "credits_exhausted" })];
  const out = filterFreeProviderRankings(RANKINGS, connections, { availableOnly: true }, FIXED_NOW);
  assert.deepEqual(
    out.map((r) => r.id),
    ["glm"]
  );
});

test("filter: availableOnly drops rate-limited-only provider; recovers when in the past", () => {
  const dropped = filterFreeProviderRankings(
    RANKINGS,
    [conn("glm", { rateLimitedUntil: future() })],
    { availableOnly: true },
    FIXED_NOW
  );
  assert.deepEqual(
    dropped.map((r) => r.id),
    []
  );

  const recovered = filterFreeProviderRankings(
    RANKINGS,
    [conn("glm", { rateLimitedUntil: past() })],
    { availableOnly: true },
    FIXED_NOW
  );
  assert.deepEqual(
    recovered.map((r) => r.id),
    ["glm"]
  );
});

test("filter: availableOnly keeps a provider that has at least one usable connection", () => {
  const connections = [
    conn("glm", { testStatus: "banned" }),
    conn("glm"), // second connection is healthy
  ];
  const out = filterFreeProviderRankings(RANKINGS, connections, { availableOnly: true }, FIXED_NOW);
  assert.deepEqual(
    out.map((r) => r.id),
    ["glm"]
  );
});

test("filter: availableOnly implies configured (unconfigured provider excluded)", () => {
  // no connections at all → nothing survives availableOnly
  const out = filterFreeProviderRankings(RANKINGS, [], { availableOnly: true }, FIXED_NOW);
  assert.equal(out.length, 0);
});

// ──────────────── attachProviderReliability ────────────────

test("attachProviderReliability: healthy connections -> state healthy, signals exposed raw", () => {
  const rankings = [ranking("alpha"), ranking("beta")];
  const connections = [
    conn("alpha", { testStatus: "active", rateLimitedUntil: null }),
    conn("alpha", { testStatus: "active", rateLimitedUntil: past() }),
  ];
  const out = attachProviderReliability(rankings, connections, FIXED_NOW);

  assert.equal(out.length, 2);
  const alpha = out[0];
  assert.ok(alpha.reliability, "reliability must be attached to alpha");
  assert.equal(alpha.reliability.state, "healthy");
  assert.deepEqual(alpha.reliability.connections, [
    { testStatus: "active", rateLimitedUntil: null, state: "healthy" },
    { testStatus: "active", rateLimitedUntil: past(), state: "healthy" },
  ]);
  assert.equal(out[1].reliability, undefined, "beta has no connection -> no reliability");
});

test("attachProviderReliability: a terminal status is down, not degraded", () => {
  const rankings = [ranking("alpha")];
  const connections = [conn("alpha", { testStatus: "expired", rateLimitedUntil: null })];
  const out = attachProviderReliability(rankings, connections, FIXED_NOW);

  // Same split as `classifyAccount` in the health matrix: terminal => down.
  assert.equal(out[0].reliability?.state, "down");
  assert.equal(out[0].reliability?.connections[0].state, "down");
  // Raw signal is NOT reinterpreted: "expired" is exposed exactly as stored.
  assert.equal(out[0].reliability?.connections[0].testStatus, "expired");
});

test("attachProviderReliability: future rateLimitedUntil degrades; past one does not", () => {
  const futureLimited = [ranking("alpha")];
  const f = attachProviderReliability(
    futureLimited,
    [conn("alpha", { testStatus: "active", rateLimitedUntil: future() })],
    FIXED_NOW
  );
  assert.equal(f[0].reliability?.state, "degraded");
  assert.equal(f[0].reliability?.connections[0].rateLimitedUntil, future());

  const pastLimited = [ranking("alpha")];
  const p = attachProviderReliability(
    pastLimited,
    [conn("alpha", { testStatus: "active", rateLimitedUntil: past() })],
    FIXED_NOW
  );
  assert.equal(p[0].reliability?.state, "healthy");
});

test("attachProviderReliability: one down + one healthy connection -> provider degraded", () => {
  // Only an all-down set is `down` (as in `classifyProvider`) — and this is the
  // case that survives `availableOnly`, so the field stays informative under it.
  const out = attachProviderReliability(
    [ranking("alpha")],
    [conn("alpha", { testStatus: "banned" }), conn("alpha", { testStatus: "active" })],
    FIXED_NOW
  );
  assert.equal(out[0].reliability?.state, "degraded");
  assert.deepEqual(
    out[0].reliability?.connections.map((c) => c.state),
    ["down", "healthy"]
  );
});

test("attachProviderReliability: every connection down -> provider down", () => {
  const out = attachProviderReliability(
    [ranking("alpha")],
    [conn("alpha", { testStatus: "banned" }), conn("alpha", { testStatus: "credits_exhausted" })],
    FIXED_NOW
  );
  assert.equal(out[0].reliability?.state, "down");
});

test("attachProviderReliability: raw testStatus stays verbatim, never rewritten by the state", () => {
  // The state reads `testStatus`, it never replaces it: the stored value comes
  // back untouched, original casing and padding included.
  const out = attachProviderReliability(
    [ranking("alpha")],
    [conn("alpha", { testStatus: "  EXPIRED ", rateLimitedUntil: null })],
    FIXED_NOW
  );
  assert.equal(out[0].reliability?.connections[0].testStatus, "  EXPIRED ");
  assert.equal(out[0].reliability?.connections[0].state, "down");
});

test("attachProviderReliability: provider without connection keeps its ranking unchanged (no field)", () => {
  const rankings = [ranking("alpha"), ranking("beta")];
  const out = attachProviderReliability(rankings, [conn("alpha")], FIXED_NOW);
  assert.equal(out[1].reliability, undefined);
  assert.deepEqual(
    out[1],
    ranking("beta"),
    "entry without connection must be structurally identical to input"
  );
});

test("attachProviderReliability: input rankings are never mutated (pure function)", () => {
  const rankings = [ranking("alpha")];
  const before = JSON.stringify(rankings);
  const out = attachProviderReliability(
    rankings,
    [conn("alpha", { testStatus: "expired" })],
    FIXED_NOW
  );
  assert.notEqual(out, rankings, "returns a new array");
  assert.notEqual(out[0], rankings[0], "returns new objects");
  assert.equal(JSON.stringify(rankings), before, "input untouched");
});

// ──────────────── attachProviderUsage ────────────────

const WINDOW_HOURS = 24;

function usage(provider: string, requests: number, successes: number) {
  return {
    provider,
    requests,
    successes,
    avgLatencyMs: 120,
    lastRequestAt: "2025-07-02T12:00:00.000Z",
  };
}

/** A ranking already carrying #10909's reliability, which `usage` extends. */
function rankingWithReliability(id: string): FreeProviderRanking {
  return {
    ...ranking(id),
    reliability: {
      connections: [{ testStatus: "active", rateLimitedUntil: null, state: "healthy" }],
      state: "healthy",
    },
  };
}

test("attachProviderUsage: fills usage from the windowed aggregate", () => {
  const out = attachProviderUsage(
    [rankingWithReliability("alpha")],
    [usage("alpha", 100, 90)],
    WINDOW_HOURS
  );
  assert.deepEqual(out[0].reliability?.usage, {
    requests: 100,
    successes: 90,
    successRate: 0.9,
    avgLatencyMs: 120,
    lastRequestAt: "2025-07-02T12:00:00.000Z",
    windowHours: 24,
  });
});

test("attachProviderUsage: zero requests -> successRate null, never 0", () => {
  const out = attachProviderUsage(
    [rankingWithReliability("alpha")],
    [usage("alpha", 0, 0)],
    WINDOW_HOURS
  );
  // A provider nobody called has no success *rate*; reporting 0 would read as
  // "always fails" on a brand new provider.
  assert.equal(out[0].reliability?.usage?.successRate, null);
  assert.equal(out[0].reliability?.usage?.requests, 0);
});

test("attachProviderUsage: below MIN_REQUESTS -> successRate null, requests still exposed", () => {
  const out = attachProviderUsage(
    [rankingWithReliability("alpha")],
    [usage("alpha", 2, 1)],
    WINDOW_HOURS
  );
  // 1 failure out of 2 is not "50% broken" — it is too small a sample to say.
  assert.equal(out[0].reliability?.usage?.successRate, null);
  assert.equal(out[0].reliability?.usage?.requests, 2);
  assert.equal(out[0].reliability?.usage?.successes, 1);
});

test("attachProviderUsage: above the sample floor, all failing -> successRate 0 (not null)", () => {
  const out = attachProviderUsage(
    [rankingWithReliability("alpha")],
    [usage("alpha", 50, 0)],
    WINDOW_HOURS
  );
  // This is the very case the field exists for: null here would hide the outage.
  assert.equal(out[0].reliability?.usage?.successRate, 0);
});

test("attachProviderUsage: a provider with no usage row gets no usage field", () => {
  const out = attachProviderUsage([rankingWithReliability("alpha")], [], WINDOW_HOURS);
  assert.ok(out[0].reliability, "reliability itself is preserved");
  assert.equal(out[0].reliability?.usage, undefined);
});

test("attachProviderUsage: a ranking without reliability is left untouched", () => {
  const bare = ranking("beta");
  const out = attachProviderUsage([bare], [usage("beta", 100, 90)], WINDOW_HOURS);
  assert.deepEqual(out[0], bare, "no connection loaded => nothing to extend");
});

test("attachProviderUsage: inputs are never mutated", () => {
  const rankings = [rankingWithReliability("alpha")];
  const before = JSON.stringify(rankings);
  const out = attachProviderUsage(rankings, [usage("alpha", 100, 90)], WINDOW_HOURS);
  assert.notEqual(out[0], rankings[0]);
  assert.notEqual(out[0].reliability, rankings[0].reliability);
  assert.equal(JSON.stringify(rankings), before);
});

test("no sortBy => the ELO order is untouched", async () => {
  const { computeFreeProviderRankings } = await import("../../src/lib/freeProviderRankings.ts");
  const withoutParam = await computeFreeProviderRankings(undefined, 50);
  const explicitElo = await computeFreeProviderRankings(undefined, 50, { sortBy: "elo" });
  assert.deepEqual(
    explicitElo.map((r) => r.id),
    withoutParam.map((r) => r.id)
  );
});

test("sortBy=reliability pulls the usage aggregate even without withUsage", async () => {
  const { computeFreeProviderRankings } = await import("../../src/lib/freeProviderRankings.ts");
  const ranked = await computeFreeProviderRankings(undefined, 50, { sortBy: "reliability" });
  assert.ok(Array.isArray(ranked));
  assert.ok(
    ranked.every((r, i) => {
      const rate = r.reliability?.usage?.successRate ?? null;
      const next = ranked[i + 1]?.reliability?.usage?.successRate ?? null;
      return !(rate === null && next !== null);
    }),
    "a provider without a stated rate must never precede one that has one"
  );
});

test("sortBy=reliability with limit: reliability order runs before the slice", async () => {
  const { sortRankingsByReliability } = await import("../../src/lib/freeProviderRankingsUsage.ts");
  const { filterRankingsByAuthType, sortRankingsAuthTypeFirst } =
    await import("../../src/lib/freeProviderRankingsAuthType.ts");
  // Mirrors page wiring: reliability first, then auth-type grouping (stable sort preserves inner order).
  function ranking(id: string, category: string, elo: number, rate: number | null | undefined) {
    return {
      id,
      name: id,
      category,
      topModel: { id: `${id}/m`, name: "M", score: elo },
      averageScore: elo,
      modelCount: 1,
      reliability: rate === undefined ? undefined : { connections: [], state: "healthy", usage: { requests: 100, successes: rate === null ? 0 : Math.round(rate * 100), successRate: rate, avgLatencyMs: null, lastRequestAt: null, windowHours: 24 } },
    } as unknown as import("../../src/lib/freeProviderRankings.ts").FreeProviderRanking;
  }
  // 4 inputs: 2 types × 2 rates, ELO not aligned with rate — so raw order != reliability order.
  // filterRankingsByAuthType is a no-op for "" (empty) but keeps the shape explicit.
  const input = filterRankingsByAuthType(
    [ranking("noauth-low", "noauth", 1000, 0.95), ranking("apikey-low", "apikey", 1200, 0.95), ranking("apikey-high", "apikey", 1500, 0.4), ranking("noauth-high", "noauth", 1400, 0.4)],
    ""
  );
  // On the API, `limit` applies after ordering. Here we prove the same by slicing the ordered result.
  const ordered = sortRankingsByReliability(input);
  const sliced = ordered.slice(0, 2);
  // 0.95 providers first; equal rate falls back to ELO (1200 before 1000), not input order.
  assert.deepEqual(sliced.map((r) => r.id), ["apikey-low", "noauth-low"], "top-2 by reliability, ELO on equal rate");
  assert.equal(sliced.every((r) => r.reliability?.usage?.successRate !== null), true);
  // Combined-sort stability: reliability inside each auth-type group.
  const combined = sortRankingsAuthTypeFirst(ordered);
  const noauthRank = combined.filter((r) => r.category === "noauth").map((r) => r.id);
  const apikeyRank = combined.filter((r) => r.category === "apikey").map((r) => r.id);
  assert.deepEqual(noauthRank, ["noauth-low", "noauth-high"], "within noauth, higher rate stays first");
  assert.deepEqual(apikeyRank, ["apikey-low", "apikey-high"], "within apikey, higher rate stays first");
});
