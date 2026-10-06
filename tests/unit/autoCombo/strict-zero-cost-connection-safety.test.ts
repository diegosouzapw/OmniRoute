/**
 * STRICT_ZERO_COST — connection-safety regression guards for the two
 * blockers found in code review of commit 5d4f881:
 *
 *   BLOCKER 1 (keyless bypass): the `keyless` shortcut must apply ONLY to a
 *   candidate that genuinely came from the no-auth path
 *   (`connectionId === SYNTHETIC_NOAUTH_CONNECTION_ID`), never to a
 *   `keyless`-catalogued model reached through a real DB connection.
 *
 *   BLOCKER 2 (multi-account mismatch): a multi-account candidate's
 *   `allowedConnectionIds` must be rewritten to exactly the SAFE subset, so
 *   whatever `autoStrategy.ts` selects at dispatch time can never be a
 *   connection this filter didn't itself verify.
 *
 * Both are pure-function tests against `evaluateCandidateConnections()` /
 * `filterStrictZeroCostCandidates()` — no DB, no network.
 */
import { test } from "vitest";
import assert from "node:assert/strict";

import {
  evaluateCandidateConnections,
  filterStrictZeroCostCandidates,
  type FreeAccessState,
  type StrictZeroCostCandidate,
} from "../../../open-sse/services/autoCombo/strictZeroCostFilter.ts";
import { SYNTHETIC_NOAUTH_CONNECTION_ID } from "../../../open-sse/services/autoCombo/resilienceCandidateFilter.ts";
import type { FreeModelBudget } from "../../../open-sse/config/freeModelCatalog.ts";

const NOW = "2026-08-20T00:00:00.000Z";
const OPTIONS = { minRemainingAllowance: 1, maxStateAgeMs: 180_000, now: () => Date.parse(NOW) };

function safeState(overrides: Partial<FreeAccessState> = {}): FreeAccessState {
  return {
    status: "SAFE",
    remainingFreeAllowance: 40,
    resetAt: null,
    checkedAt: NOW,
    ...overrides,
  };
}

// A synthetic keyless budget entry — hardStopGuaranteed deliberately absent,
// matching the real catalog (keyless entries never set it; the shortcut is
// what makes them safe, not this field).
function keylessEntry(): FreeModelBudget {
  return {
    provider: "kp",
    modelId: "kp-model",
    displayName: "kp-model",
    monthlyTokens: 0,
    creditTokens: 0,
    freeType: "keyless",
    poolKey: null,
    tos: "ok",
  };
}

function quotaEntry(hardStopGuaranteed = true): FreeModelBudget {
  return {
    provider: "qp",
    modelId: "qp-model",
    displayName: "qp-model",
    monthlyTokens: 1_000_000,
    creditTokens: 0,
    freeType: "recurring-daily",
    poolKey: null,
    tos: "ok",
    hardStopGuaranteed,
  };
}

const REAL_CONN = "real-connection-42";

// ─── BLOCKER 1 — keyless bypass ─────────────────────────────────────────

// A. keyless + SYNTHETIC_NOAUTH_CONNECTION_ID → PASS
test("A: keyless + SYNTHETIC_NOAUTH_CONNECTION_ID passes with zero live checks", () => {
  const candidate: StrictZeroCostCandidate = {
    provider: "kp",
    model: "kp-model",
    connectionId: SYNTHETIC_NOAUTH_CONNECTION_ID,
  };
  const resolveFreeAccessState = () => {
    throw new Error("must never be called for a genuine no-auth candidate");
  };
  assert.deepEqual(
    evaluateCandidateConnections(candidate, keylessEntry(), resolveFreeAccessState, OPTIONS),
    [SYNTHETIC_NOAUTH_CONNECTION_ID]
  );
});

// B. same provider/model, catalogued keyless, but reached via a real DB
// connectionId → must NOT take the keyless shortcut.
test("B: keyless-catalogued model reached via a real connectionId does NOT get the keyless shortcut", () => {
  const candidate: StrictZeroCostCandidate = {
    provider: "kp",
    model: "kp-model",
    connectionId: REAL_CONN, // NOT the sentinel — a genuine DB connection
  };
  let called = false;
  const resolveFreeAccessState = () => {
    called = true;
    return safeState(); // even if the connection WOULD report SAFE quota...
  };
  const result = evaluateCandidateConnections(
    candidate,
    keylessEntry(),
    resolveFreeAccessState,
    OPTIONS
  );
  // ...the entry has no hardStopGuaranteed (real keyless catalog rows never
  // set it — the shortcut was their only path to safety), so falling through
  // to the quota branch must still exclude it.
  assert.deepEqual(
    result,
    [],
    "must exclude — keyless metadata alone cannot authorize a real connection"
  );
  assert.equal(
    called,
    false,
    "must not even bother resolving live state once hardStopGuaranteed is absent"
  );
});

// C. a connection that later gains a credential still can't exploit the
// keyless classification — same code path as B, demonstrated with a
// multi-account (allowedConnectionIds) shape to also prove the "logical
// candidate" branch, not just the single-connectionId branch, is covered.
test("C: a keyless-catalogued model behind allowedConnectionIds (credentialed accounts) is never shortcut-eligible", () => {
  const candidate: StrictZeroCostCandidate = {
    provider: "kp",
    model: "kp-model",
    connectionId: null,
    allowedConnectionIds: ["acct-with-credential-1", "acct-with-credential-2"],
  };
  const resolveFreeAccessState = () => safeState(); // both accounts report SAFE quota
  const result = evaluateCandidateConnections(
    candidate,
    keylessEntry(),
    resolveFreeAccessState,
    OPTIONS
  );
  assert.deepEqual(
    result,
    [],
    "keyless metadata must never authorize any real, credentialed account, regardless of what its quota says"
  );
});

// Sanity: a non-keyless entry reached via the no-auth sentinel is contradictory
// metadata (shouldn't happen in practice) and must fail closed, not silently
// fall through to a quota check that can never resolve a state for "noauth".
test("sanity: non-keyless freeType via the no-auth sentinel connection fails closed", () => {
  const candidate: StrictZeroCostCandidate = {
    provider: "qp",
    model: "qp-model",
    connectionId: SYNTHETIC_NOAUTH_CONNECTION_ID,
  };
  const result = evaluateCandidateConnections(
    candidate,
    quotaEntry(true),
    () => safeState(),
    OPTIONS
  );
  assert.deepEqual(result, []);
});

// ─── BLOCKER 2 — multi-account connection mismatch ─────────────────────

// 1. account A SAFE, B UNKNOWN → dispatch can use ONLY A.
test("1: A SAFE, B UNKNOWN -> safe connection set is exactly [A]", () => {
  const candidate: StrictZeroCostCandidate = {
    provider: "qp",
    model: "qp-model",
    connectionId: null,
    allowedConnectionIds: ["A", "B"],
  };
  const resolve = (_provider: string, connectionId: string) =>
    connectionId === "A" ? safeState() : undefined; // B: no state at all == UNKNOWN
  assert.deepEqual(evaluateCandidateConnections(candidate, quotaEntry(true), resolve, OPTIONS), [
    "A",
  ]);
});

// 2. A EXHAUSTED, B SAFE → SOLO B.
test("2: A EXHAUSTED, B SAFE -> safe connection set is exactly [B]", () => {
  const candidate: StrictZeroCostCandidate = {
    provider: "qp",
    model: "qp-model",
    connectionId: null,
    allowedConnectionIds: ["A", "B"],
  };
  const resolve = (_provider: string, connectionId: string) =>
    connectionId === "A"
      ? safeState({ status: "EXHAUSTED", remainingFreeAllowance: 0 })
      : safeState();
  assert.deepEqual(evaluateCandidateConnections(candidate, quotaEntry(true), resolve, OPTIONS), [
    "B",
  ]);
});

// 3. A SAFE, B billable/unverifiable (UNKNOWN) → B not selectable.
test("3: A SAFE, B UNKNOWN (billable/unverifiable) -> B never enters the safe set", () => {
  const candidate: StrictZeroCostCandidate = {
    provider: "qp",
    model: "qp-model",
    connectionId: null,
    allowedConnectionIds: ["A", "B"],
  };
  const resolve = (_provider: string, connectionId: string) =>
    connectionId === "A" ? safeState() : undefined;
  const safe = evaluateCandidateConnections(candidate, quotaEntry(true), resolve, OPTIONS);
  assert.equal(safe.includes("B"), false);
  assert.deepEqual(safe, ["A"]);
});

// 4. tutte UNKNOWN → candidato escluso.
test("4: all connections UNKNOWN -> candidate fully excluded (empty safe set)", () => {
  const candidate: StrictZeroCostCandidate = {
    provider: "qp",
    model: "qp-model",
    connectionId: null,
    allowedConnectionIds: ["A", "B", "C"],
  };
  assert.deepEqual(
    evaluateCandidateConnections(candidate, quotaEntry(true), () => undefined, OPTIONS),
    []
  );
});

// 5. account selezionato al dispatch è uno di quelli verificati SAFE — proven
// at the pool-filter level: the returned candidate's `allowedConnectionIds`
// is rewritten to exactly the safe subset, which is the same field
// `autoStrategy.ts` (open-sse/services/combo/autoStrategy.ts:315-331)
// already intersects against before connection selection — so whatever it
// picks is provably a member of this set, by construction.
test("5: filterStrictZeroCostCandidates rewrites allowedConnectionIds to exactly the verified-SAFE subset", () => {
  const candidate: StrictZeroCostCandidate = {
    provider: "qp",
    model: "qp-model",
    connectionId: null,
    allowedConnectionIds: ["A", "B", "C"],
  };
  const resolve = (_provider: string, connectionId: string) =>
    connectionId === "B" ? safeState() : undefined; // only B is SAFE
  const result = filterStrictZeroCostCandidates([candidate], {
    enabled: true,
    resolveFreeAccessState: resolve,
    catalog: [quotaEntry(true)],
    ...OPTIONS,
  });
  assert.equal(result.length, 1);
  assert.deepEqual(
    result[0].allowedConnectionIds,
    ["B"],
    "dispatch (via autoStrategy.ts's own allowedConnectionIds intersection) can only ever select B — the one connection this filter actually verified"
  );
  assert.equal(
    result[0].allowedConnectionIds?.includes("A"),
    false,
    "A (UNKNOWN) must never remain selectable"
  );
  assert.equal(
    result[0].allowedConnectionIds?.includes("C"),
    false,
    "C (UNKNOWN) must never remain selectable"
  );
});

test("multi-account candidate with an unchanged safe set is returned as the SAME reference (identity contract)", () => {
  const candidate: StrictZeroCostCandidate = {
    provider: "qp",
    model: "qp-model",
    connectionId: null,
    allowedConnectionIds: ["A"],
  };
  const pool = [candidate];
  const result = filterStrictZeroCostCandidates(pool, {
    enabled: true,
    resolveFreeAccessState: () => safeState(),
    catalog: [quotaEntry(true)],
    ...OPTIONS,
  });
  assert.equal(result, pool, "nothing was narrowed, so the pool array reference must be preserved");
  assert.equal(result[0], candidate, "the candidate object itself must be preserved, not cloned");
});

test("single-connection candidate that fails is dropped, never returned with an empty allowedConnectionIds", () => {
  const candidate: StrictZeroCostCandidate = {
    provider: "qp",
    model: "qp-model",
    connectionId: REAL_CONN,
  };
  const result = filterStrictZeroCostCandidates([candidate], {
    enabled: true,
    resolveFreeAccessState: () => undefined,
    catalog: [quotaEntry(true)],
    ...OPTIONS,
  });
  assert.deepEqual(result, []);
});
