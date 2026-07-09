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
  const out = filterFreeProviderRankings(
    RANKINGS,
    connections,
    { availableOnly: true },
    FIXED_NOW
  );
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
  const out = filterFreeProviderRankings(
    RANKINGS,
    connections,
    { availableOnly: true },
    FIXED_NOW
  );
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
