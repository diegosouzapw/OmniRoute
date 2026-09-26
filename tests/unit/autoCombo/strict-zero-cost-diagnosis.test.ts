/**
 * STRICT zero-cost filter diagnosis — regression guard for
 * `filterStrictZeroCostCandidatesWithDiagnosis` in
 * `open-sse/services/autoCombo/strictZeroCostFilter.ts`, mirroring the
 * shape of `tests/unit/autoCombo/paid-model-filter-6512.test.ts`.
 *
 * Pure, dependency-light by design: `resolveFreeAccessState` is injected as a
 * plain function, so no DB/network mocking is needed anywhere in this file.
 */
import { test } from "vitest";
import assert from "node:assert/strict";

import {
  filterStrictZeroCostCandidates,
  filterStrictZeroCostCandidatesWithDiagnosis,
  type FreeAccessState,
} from "../../../open-sse/services/autoCombo/strictZeroCostFilter.ts";

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

// A real quota-based entry with a documented hard-stop guarantee, kept fresh
// and above threshold → survives the filter.
const QUOTA_SAFE = { provider: "groq", model: "openai/gpt-oss-120b", connectionId: REAL_CONN };
// A real quota-based entry WITHOUT a documented hard-stop guarantee → always
// excluded as `no-hard-stop`, whatever the live allowance state reports.
const QUOTA_UNGUARANTEED = {
  provider: "agentrouter",
  model: "claude-opus-5",
  connectionId: REAL_CONN,
};

function enabledOptions() {
  return {
    ...BASE_OPTIONS,
    enabled: true,
    resolveFreeAccessState: () => freshState({ remainingFreeAllowance: 40 }),
  };
}

test("mixed pool surfaces one exclusion with its no-hard-stop share", () => {
  const pool = [QUOTA_SAFE, QUOTA_UNGUARANTEED];
  const { pool: out, diagnosis } = filterStrictZeroCostCandidatesWithDiagnosis(
    pool,
    enabledOptions()
  );
  assert.deepEqual(out, [QUOTA_SAFE]);
  assert.equal(diagnosis!.excluded, 1);
  assert.equal(diagnosis!.noHardStop, 1);
  assert.equal(diagnosis!.total, 2);
});

test("disabled filter returns pool identity with null diagnosis", () => {
  const pool = [QUOTA_SAFE, QUOTA_UNGUARANTEED];
  const { pool: out, diagnosis } = filterStrictZeroCostCandidatesWithDiagnosis(pool, {
    ...BASE_OPTIONS,
    enabled: false,
    resolveFreeAccessState: () => freshState({ remainingFreeAllowance: 40 }),
  });
  assert.equal(out, pool, "must return the exact same array reference when opt-in is off");
  assert.equal(diagnosis, null);
});

test("enabled filter with nothing excluded returns pool identity with null diagnosis", () => {
  const pool = [QUOTA_SAFE];
  const { pool: out, diagnosis } = filterStrictZeroCostCandidatesWithDiagnosis(
    pool,
    enabledOptions()
  );
  assert.equal(out, pool, "must return the exact same array reference when nothing is excluded");
  assert.equal(diagnosis, null);
});

test("legacy wrapper keeps its pool-only contract and matches filtered content", () => {
  const pool = [QUOTA_SAFE, QUOTA_UNGUARANTEED];
  assert.equal(
    filterStrictZeroCostCandidates(pool, {
      ...BASE_OPTIONS,
      enabled: false,
      resolveFreeAccessState: () => freshState({ remainingFreeAllowance: 40 }),
    }),
    pool
  );
  const filtered = filterStrictZeroCostCandidates(pool, enabledOptions());
  assert.notEqual(filtered, pool, "exclusion must produce a new array reference");
  assert.deepEqual(
    filtered,
    filterStrictZeroCostCandidatesWithDiagnosis(pool, enabledOptions()).pool,
    "wrapper output must be content-identical to the WithDiagnosis pool"
  );
});
