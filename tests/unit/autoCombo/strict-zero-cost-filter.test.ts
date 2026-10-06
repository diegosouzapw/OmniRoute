/**
 * STRICT_ZERO_COST — regression guard for `strictZeroCostFilter.ts`, wired
 * into `open-sse/services/autoCombo/virtualFactory.ts::buildPreparedPool`
 * right after `filterPaidOnlyCandidates` (#6512). Mirrors the style/shape of
 * `tests/unit/autoCombo/paid-model-filter-6512.test.ts`.
 *
 * Pure, dependency-light by design: `resolveFreeAccessState` is injected as a
 * plain function, so no DB/network mocking is needed anywhere in this file.
 *
 * Connection-safety-specific cases (the keyless bypass and multi-account
 * bugs found in code review) live in their own file,
 * `strict-zero-cost-connection-safety.test.ts` — this file covers the
 * single-connection / no-connection-ambiguity cases only.
 */
import { test } from "vitest";
import assert from "node:assert/strict";

import {
  evaluateCandidateConnections,
  filterStrictZeroCostCandidates,
  filterTosAvoidCandidates,
  type FreeAccessState,
} from "../../../open-sse/services/autoCombo/strictZeroCostFilter.ts";
import { SYNTHETIC_NOAUTH_CONNECTION_ID } from "../../../open-sse/services/autoCombo/resilienceCandidateFilter.ts";
import { FREE_MODEL_BUDGETS } from "../../../open-sse/config/freeModelCatalog.ts";

const NOW = "2026-08-20T00:00:00.000Z";
const nowMs = () => Date.parse(NOW);

function freshState(overrides: Partial<FreeAccessState> = {}): FreeAccessState {
  return {
    status: "SAFE",
    remainingFreeAllowance: 50,
    resetAt: null,
    checkedAt: NOW,
    ...overrides,
  };
}

const BASE_OPTIONS = { minRemainingAllowance: 1, maxStateAgeMs: 180_000, now: nowMs };

const REAL_CONN = "conn-real-1";

// A real keyless entry from the catalog (OpenCode Free, all models keyless/tos=avoid),
// as a genuine no-auth candidate (the only shape that legitimately gets the shortcut).
const KEYLESS = {
  provider: "opencode",
  model: "big-pickle",
  connectionId: SYNTHETIC_NOAUTH_CONNECTION_ID,
};
// A real quota-based entry with hardStopGuaranteed: true (added by this feature),
// as a concrete single-connection candidate.
// 2026-09-02: was groq/llama-3.3-70b-versatile, retired from the Groq free tier on 2026-08-16.
const QUOTA_SAFE = { provider: "groq", model: "openai/gpt-oss-120b", connectionId: REAL_CONN };
// A real quota-based entry WITHOUT hardStopGuaranteed (agentrouter: one-time-initial,
// no usage adapter, no documented "no credit card" claim — must never pass).
const QUOTA_UNGUARANTEED = {
  provider: "agentrouter",
  model: "claude-opus-5",
  connectionId: REAL_CONN,
};
// Not in FREE_MODEL_BUDGETS at all.
const UNKNOWN_MODEL = {
  provider: "groq",
  model: "definitely-not-cataloged",
  connectionId: REAL_CONN,
};
// A provider with no free models documented anywhere (mirrors paid-model-filter-6512's own PAID fixture).
const PAID = { provider: "openai", model: "gpt-4o", connectionId: REAL_CONN };

test("sanity: fixtures exist in the real catalog with the metadata these tests assume", () => {
  const groqEntry = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === "groq" && m.modelId === "openai/gpt-oss-120b"
  );
  assert.equal(groqEntry?.hardStopGuaranteed, true, "groq must carry hardStopGuaranteed: true");
  const arEntry = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === "agentrouter" && m.modelId === "claude-opus-5"
  );
  assert.notEqual(
    arEntry?.hardStopGuaranteed,
    true,
    "agentrouter must NOT carry hardStopGuaranteed: true (no documented hard-stop guarantee)"
  );
  const keylessEntry = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === "opencode" && m.modelId === "big-pickle"
  );
  assert.equal(keylessEntry?.freeType, "keyless");
  assert.equal(
    keylessEntry?.tos,
    "avoid",
    "opencode must be tos=avoid for the ToS-guard tests below"
  );
});

// 1. keyless SAFE (genuine no-auth candidate) → PASS
test("keyless candidate from the genuine no-auth path passes with no state at all", () => {
  const entry = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === "opencode" && m.modelId === "big-pickle"
  );
  assert.deepEqual(
    evaluateCandidateConnections(KEYLESS, entry, () => undefined, BASE_OPTIONS),
    [SYNTHETIC_NOAUTH_CONNECTION_ID]
  );
});

// 2. paid → EXCLUDE
test("paid candidate (no free-model documentation at all) is excluded", () => {
  assert.deepEqual(
    evaluateCandidateConnections(PAID, undefined, () => undefined, BASE_OPTIONS),
    []
  );
});

// 3 & 4. unknown model / unknown provider → EXCLUDE
test("model absent from the free catalog is excluded even under a known provider", () => {
  assert.deepEqual(
    evaluateCandidateConnections(UNKNOWN_MODEL, undefined, () => undefined, BASE_OPTIONS),
    []
  );
});

// 5. quota SAFE + fresh + hardStop → PASS
test("quota-based candidate with hardStopGuaranteed, fresh SAFE state above threshold passes", () => {
  const entry = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === "groq" && m.modelId === "openai/gpt-oss-120b"
  );
  assert.deepEqual(
    evaluateCandidateConnections(
      QUOTA_SAFE,
      entry,
      () => freshState({ remainingFreeAllowance: 40 }),
      BASE_OPTIONS
    ),
    [REAL_CONN]
  );
});

// 6. quota exhausted → EXCLUDE
test("EXHAUSTED status excludes even with a fresh checkedAt", () => {
  const entry = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === "groq" && m.modelId === "openai/gpt-oss-120b"
  );
  const state = freshState({ status: "EXHAUSTED", remainingFreeAllowance: 0 });
  assert.deepEqual(
    evaluateCandidateConnections(QUOTA_SAFE, entry, () => state, BASE_OPTIONS),
    []
  );
});

// 7. usage adapter absent (no state resolvable) → EXCLUDE
test("quota-based candidate with no resolvable state is excluded, not assumed safe", () => {
  const entry = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === "groq" && m.modelId === "openai/gpt-oss-120b"
  );
  assert.deepEqual(
    evaluateCandidateConnections(QUOTA_SAFE, entry, () => undefined, BASE_OPTIONS),
    []
  );
});

// 8. usage API error → EXCLUDE (modeled as UNKNOWN status; freeAccessQuota.ts
// deletes the cache entry on a failed refresh, which resolves to `undefined`
// here — same assertion as #7, the important contract is "never falls back to SAFE").
test("UNKNOWN status excludes", () => {
  const entry = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === "groq" && m.modelId === "openai/gpt-oss-120b"
  );
  const state = freshState({ status: "UNKNOWN", remainingFreeAllowance: null });
  assert.deepEqual(
    evaluateCandidateConnections(QUOTA_SAFE, entry, () => state, BASE_OPTIONS),
    []
  );
});

// 9. usage state stale → EXCLUDE
test("stale checkedAt excludes even when status is SAFE", () => {
  const entry = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === "groq" && m.modelId === "openai/gpt-oss-120b"
  );
  const stale = freshState({ checkedAt: "2026-08-19T00:00:00.000Z" }); // >24h before NOW
  assert.deepEqual(
    evaluateCandidateConnections(QUOTA_SAFE, entry, () => stale, BASE_OPTIONS),
    []
  );
});

// 10 & 11. hardStopGuaranteed undefined / false → EXCLUDE
test("hardStopGuaranteed undefined excludes even with a perfect SAFE state", () => {
  const entry = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === "agentrouter" && m.modelId === "claude-opus-5"
  );
  assert.deepEqual(
    evaluateCandidateConnections(QUOTA_UNGUARANTEED, entry, () => freshState(), BASE_OPTIONS),
    []
  );
});

test("hardStopGuaranteed explicitly false excludes", () => {
  const entry = {
    ...FREE_MODEL_BUDGETS[0],
    hardStopGuaranteed: false,
    freeType: "recurring-monthly" as const,
  };
  assert.deepEqual(
    evaluateCandidateConnections(
      { provider: entry.provider, model: entry.modelId, connectionId: REAL_CONN },
      entry,
      () => freshState(),
      BASE_OPTIONS
    ),
    []
  );
});

// 12 & 13. ToS guard, independent of economic evaluation
test("tos=avoid + excludeTosAvoid=true excludes a keyless-safe candidate", () => {
  const result = filterTosAvoidCandidates([KEYLESS], true);
  assert.deepEqual(result, [], "opencode (tos=avoid) must be dropped when the guard is on");
});

test("tos=avoid + excludeTosAvoid=false leaves normal economic evaluation untouched", () => {
  const result = filterTosAvoidCandidates([KEYLESS, PAID], false);
  assert.deepEqual(result, [KEYLESS, PAID], "guard off must be a pure identity pass-through");
});

// Pool-level filter: default-off regression guard, mirrors paid-model-filter-6512's own first test.
test("freeAccessPolicy off (default) returns the pool UNCHANGED (identity, regression guard)", () => {
  const pool = [KEYLESS, QUOTA_SAFE, PAID];
  const result = filterStrictZeroCostCandidates(pool, {
    enabled: false,
    resolveFreeAccessState: () => undefined,
    ...BASE_OPTIONS,
  });
  assert.equal(result, pool, "must return the exact same array reference when opt-in is off");
});

test("strict pool filter keeps only keyless(no-auth) + guaranteed-quota-SAFE candidates", () => {
  const pool = [KEYLESS, QUOTA_SAFE, QUOTA_UNGUARANTEED, PAID, UNKNOWN_MODEL];
  const result = filterStrictZeroCostCandidates(pool, {
    enabled: true,
    resolveFreeAccessState: (provider) =>
      provider === "groq" ? freshState({ remainingFreeAllowance: 40 }) : undefined,
    ...BASE_OPTIONS,
  });
  assert.deepEqual(result, [KEYLESS, QUOTA_SAFE]);
});

// Autodiscovery cases (14-19) are in
// tests/unit/autoCombo/strict-zero-cost-autodiscovery.test.ts, which fabricates
// synthetic FREE_MODEL_BUDGETS-shaped fixtures rather than real provider ids —
// see that file for why a fixture-based test is the correct tool here.
// Blocker 1 (keyless bypass) and Blocker 2 (multi-account) cases are in
// tests/unit/autoCombo/strict-zero-cost-connection-safety.test.ts.
