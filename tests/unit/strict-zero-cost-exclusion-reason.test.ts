import assert from "node:assert/strict";
import test from "node:test";

import {
  classifyConnectionState,
  classifyStrictZeroCostCandidate,
  evaluateCandidateConnections,
  type FreeAccessState,
  type StrictZeroCostCandidate,
} from "../../open-sse/services/autoCombo/strictZeroCostFilter.ts";
import type { FreeModelBudget } from "../../open-sse/config/freeModelCatalog.ts";

const NOW = 10_000_000;
const OPTS = { minRemainingAllowance: 1, maxStateAgeMs: 60_000, now: () => NOW };

function entry(overrides: Partial<FreeModelBudget> = {}): FreeModelBudget {
  return {
    provider: "p",
    model: "m",
    freeType: "recurring-monthly",
    hardStopGuaranteed: true,
    ...overrides,
  } as FreeModelBudget;
}

function state(overrides: Partial<FreeAccessState> = {}): FreeAccessState {
  return {
    status: "SAFE",
    remainingFreeAllowance: 90,
    resetAt: null,
    checkedAt: new Date(NOW).toISOString(),
    ...overrides,
  };
}

const candidate = (overrides: Partial<StrictZeroCostCandidate> = {}): StrictZeroCostCandidate => ({
  provider: "p",
  model: "m",
  connectionId: "c1",
  ...overrides,
});

const classify = (
  c: StrictZeroCostCandidate,
  e: FreeModelBudget | undefined,
  resolve: (provider: string, connectionId: string) => FreeAccessState | undefined
) => classifyStrictZeroCostCandidate(c, e, resolve, OPTS);

// --- one connection at a time ---------------------------------------------

test("a fresh, funded reading is safe", () => {
  assert.equal(
    classifyConnectionState("p", "c1", () => state(), OPTS),
    "safe"
  );
});

test("no reading at all is unknown — the quota lookup never ran for this pair", () => {
  assert.equal(
    classifyConnectionState("p", "c1", () => undefined, OPTS),
    "state-unknown"
  );
});

test("an exhausted allowance is exhausted, not unknown", () => {
  const drained = state({ status: "EXHAUSTED", remainingFreeAllowance: 0 });
  assert.equal(
    classifyConnectionState("p", "c1", () => drained, OPTS),
    "exhausted"
  );
});

test("a funded reading at or below the threshold is exhausted", () => {
  assert.equal(
    classifyConnectionState("p", "c1", () => state({ remainingFreeAllowance: 1 }), OPTS),
    "exhausted"
  );
});

test("a reading older than the allowed age is unknown, never exhausted", () => {
  const stale = state({ checkedAt: new Date(NOW - 60_001).toISOString() });
  assert.equal(
    classifyConnectionState("p", "c1", () => stale, OPTS),
    "state-unknown"
  );
});

test("a stale EXHAUSTED reading is unknown too — freshness is checked first", () => {
  const staleDrained = state({
    status: "EXHAUSTED",
    remainingFreeAllowance: 0,
    checkedAt: new Date(NOW - 60_001).toISOString(),
  });
  assert.equal(
    classifyConnectionState("p", "c1", () => staleDrained, OPTS),
    "state-unknown"
  );
});

test("an allowance the provider does not report numerically is unknown", () => {
  assert.equal(
    classifyConnectionState("p", "c1", () => state({ remainingFreeAllowance: null }), OPTS),
    "state-unknown"
  );
});

test("an unparseable timestamp is unknown", () => {
  assert.equal(
    classifyConnectionState("p", "c1", () => state({ checkedAt: "not a date" }), OPTS),
    "state-unknown"
  );
});

// --- whole candidate -------------------------------------------------------

test("a model absent from the catalog is not-in-catalog", () => {
  assert.equal(classify(candidate(), undefined, () => state()).outcome, "not-in-catalog");
});

test("a catalogued model whose regime is not free is regime-not-free", () => {
  const paid = entry({ freeType: "discontinued" as FreeModelBudget["freeType"] });
  assert.equal(classify(candidate(), paid, () => state()).outcome, "regime-not-free");
});

test("a free regime without a documented hard stop is no-hard-stop", () => {
  const soft = entry({ hardStopGuaranteed: undefined });
  assert.equal(classify(candidate(), soft, () => state()).outcome, "no-hard-stop");
});

test("a genuine keyless candidate is safe with no live check", () => {
  const keyless = entry({ freeType: "keyless" as FreeModelBudget["freeType"] });
  const verdict = classify(candidate({ connectionId: "noauth" }), keyless, () => undefined);
  assert.equal(verdict.outcome, "safe");
});

test("a no-auth candidate on a non-keyless entry is contradictory-noauth", () => {
  const verdict = classify(candidate({ connectionId: "noauth" }), entry(), () => state());
  assert.equal(verdict.outcome, "contradictory-noauth");
});

test("a funded candidate is safe and names the connection", () => {
  const verdict = classify(candidate(), entry(), () => state());
  assert.equal(verdict.outcome, "safe");
  assert.deepEqual(verdict.outcome === "safe" ? verdict.safeConnectionIds : null, ["c1"]);
});

test("exhausted wins over unknown when a candidate spans several accounts", () => {
  // Order must not decide the reason: an observed exhaustion is a fact, a
  // missing reading is the absence of one, and the operator needs the fact.
  const multi = candidate({ connectionId: null, allowedConnectionIds: ["unknown-one", "drained"] });
  const resolve = (_p: string, id: string) =>
    id === "drained" ? state({ status: "EXHAUSTED", remainingFreeAllowance: 0 }) : undefined;
  assert.equal(classify(multi, entry(), resolve).outcome, "exhausted");

  const reversed = candidate({
    connectionId: null,
    allowedConnectionIds: ["drained", "unknown-one"],
  });
  assert.equal(classify(reversed, entry(), resolve).outcome, "exhausted");
});

test("one safe account among several is still safe, and only it is named", () => {
  const multi = candidate({ connectionId: null, allowedConnectionIds: ["drained", "good"] });
  const resolve = (_p: string, id: string) =>
    id === "good" ? state() : state({ status: "EXHAUSTED", remainingFreeAllowance: 0 });
  const verdict = classify(multi, entry(), resolve);
  assert.equal(verdict.outcome, "safe");
  assert.deepEqual(verdict.outcome === "safe" ? verdict.safeConnectionIds : null, ["good"]);
});

// --- the contract the pool filter depends on, unchanged --------------------
// These mirror what `tests/unit/autoCombo/strict-zero-cost-*.test.ts` assert.
// Those files live outside every runner glob in package.json and vitest.config.ts,
// so they never execute; this block keeps the same guarantees somewhere that runs.

test("evaluateCandidateConnections still answers with connection ids", () => {
  assert.deepEqual(
    evaluateCandidateConnections(candidate(), entry(), () => state(), OPTS),
    ["c1"]
  );
});

test("evaluateCandidateConnections still answers empty for every exclusion", () => {
  const cases: Array<[string, FreeModelBudget | undefined, () => FreeAccessState | undefined]> = [
    ["not in catalog", undefined, () => state()],
    [
      "regime not free",
      entry({ freeType: "discontinued" as FreeModelBudget["freeType"] }),
      () => state(),
    ],
    ["no hard stop", entry({ hardStopGuaranteed: undefined }), () => state()],
    ["no reading", entry(), () => undefined],
    ["exhausted", entry(), () => state({ status: "EXHAUSTED", remainingFreeAllowance: 0 })],
  ];
  for (const [label, budgetEntry, resolve] of cases) {
    assert.deepEqual(
      evaluateCandidateConnections(candidate(), budgetEntry, resolve, OPTS),
      [],
      `"${label}" must still exclude`
    );
  }
});

test("a candidate with no account at all says so, rather than blaming the quota lookup", () => {
  let lookups = 0;
  const verdict = classifyStrictZeroCostCandidate(
    candidate({ connectionId: null, allowedConnectionIds: [] }),
    entry(),
    () => {
      lookups += 1;
      return state();
    },
    OPTS
  );
  assert.equal(verdict.outcome, "no-connection");
  assert.equal(lookups, 0, "nothing should have been looked up — there was nothing to look up");
});

test("no-connection still excludes, exactly as before", () => {
  assert.deepEqual(
    evaluateCandidateConnections(
      candidate({ connectionId: null, allowedConnectionIds: [] }),
      entry(),
      () => state(),
      OPTS
    ),
    []
  );
});
