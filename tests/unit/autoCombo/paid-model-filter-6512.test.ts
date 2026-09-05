/**
 * #6512 (follow-up to #6328 / #6495) — regression guard for excluding paid-only
 * backends from the `auto/*` candidate pool when `hidePaidModels` is on.
 *
 * Tests the pure `filterPaidOnlyCandidates` helper wired into
 * `open-sse/services/autoCombo/virtualFactory.ts::createVirtualAutoCombo`.
 */
import { test } from "vitest";
import assert from "node:assert/strict";

import { filterPaidOnlyCandidates, filterPaidOnlyCandidatesWithDiagnosis } from "../../../open-sse/services/autoCombo/paidModelFilter.ts";

// `agentrouter/claude-opus-4-8` is a documented free model (FREE_MODEL_BUDGETS);
// `openai/gpt-4o` is paid (openai has no documented free models).
const FREE = { provider: "agentrouter", model: "claude-opus-4-8" };
const PAID = { provider: "openai", model: "gpt-4o" };

test("hidePaid off returns pool identity with null diagnosis", () => {
  const pool = [FREE, PAID];
  const { pool: out, diagnosis } = filterPaidOnlyCandidatesWithDiagnosis(pool, false);
  assert.equal(out, pool, "must return the exact same array reference when opt-in is off");
  assert.equal(diagnosis, null);
});

test("hidePaid on all-paid pool reports excludedPaid equal to total", () => {
  const pool = [PAID, { provider: "openai", model: "gpt-4.1" }];
  const { pool: out, diagnosis } = filterPaidOnlyCandidatesWithDiagnosis(pool, true);
  assert.deepEqual(out, []);
  assert.equal(diagnosis!.excludedPaid, 2);
  assert.equal(diagnosis!.total, 2);
});

test("hidePaid on mixed pool keeps free candidate and reports one exclusion", () => {
  const pool = [FREE, PAID];
  const { pool: out, diagnosis } = filterPaidOnlyCandidatesWithDiagnosis(pool, true);
  assert.deepEqual(out, [FREE]);
  assert.equal(diagnosis!.excludedPaid, 1);
  assert.equal(diagnosis!.total, 2);
});

test("legacy wrapper keeps its pool-only contract", () => {
  const pool = [FREE, PAID];
  assert.equal(filterPaidOnlyCandidates(pool, false), pool);
  assert.deepEqual(filterPaidOnlyCandidates(pool, true), [FREE]);
});

test("hidePaidModels ON drops the paid-only backend, keeps the free one", () => {
  const result = filterPaidOnlyCandidates([FREE, PAID], true);
  assert.deepEqual(
    result,
    [FREE],
    "openai/gpt-4o (paid) must be excluded; agentrouter/claude-opus-4-8 (free) kept"
  );
});

test("hidePaidModels ON with an all-paid pool degrades to an empty pool", () => {
  const result = filterPaidOnlyCandidates([PAID, { provider: "openai", model: "gpt-4.1" }], true);
  assert.deepEqual(result, [], "an all-paid pool becomes empty — the graceful empty-pool path");
});

test("hidePaidModels ON preserves extra candidate fields on kept entries", () => {
  const enriched = {
    provider: "agentrouter",
    model: "claude-opus-4-8",
    connectionId: "abc",
    extra: 1,
  };
  const result = filterPaidOnlyCandidates([enriched, PAID], true);
  assert.deepEqual(result, [enriched], "generic <T> filter must not strip candidate fields");
});
