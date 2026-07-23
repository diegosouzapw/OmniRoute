/**
 * #6512 (follow-up to #6328 / #6495) — regression guard for excluding paid-only
 * backends from the `auto/*` candidate pool when `hidePaidModels` is on.
 *
 * Tests the pure `filterPaidOnlyCandidates` helper wired into
 * `open-sse/services/autoCombo/virtualFactory.ts::createVirtualAutoCombo`.
 */
import { test } from "vitest";
import assert from "node:assert/strict";

import { filterPaidOnlyCandidates } from "../../../open-sse/services/autoCombo/paidModelFilter.ts";

// `agentrouter/claude-opus-4-6` is a documented free model (FREE_MODEL_BUDGETS);
// `openai/gpt-4o` is paid (openai has no documented free models).
const FREE = { provider: "agentrouter", model: "claude-opus-4-6" };
const PAID = { provider: "openai", model: "gpt-4o" };

test("hidePaidModels OFF (default) returns the pool UNCHANGED (identity, regression guard)", () => {
  const pool = [FREE, PAID];
  const result = filterPaidOnlyCandidates(pool, false);
  assert.equal(result, pool, "must return the exact same array reference when opt-in is off");
  assert.deepEqual(result, [FREE, PAID], "paid models must pass through when the flag is off");
});

test("hidePaidModels ON drops the paid-only backend, keeps the free one", () => {
  const result = filterPaidOnlyCandidates([FREE, PAID], true);
  assert.deepEqual(
    result,
    [FREE],
    "openai/gpt-4o (paid) must be excluded; agentrouter/claude-opus-4-6 (free) kept"
  );
});

test("hidePaidModels ON with an all-paid pool degrades to an empty pool", () => {
  const result = filterPaidOnlyCandidates([PAID, { provider: "openai", model: "gpt-4.1" }], true);
  assert.deepEqual(result, [], "an all-paid pool becomes empty — the graceful empty-pool path");
});

test("hidePaidModels ON preserves extra candidate fields on kept entries", () => {
  const enriched = { provider: "agentrouter", model: "claude-opus-4-6", connectionId: "abc", extra: 1 };
  const result = filterPaidOnlyCandidates([enriched, PAID], true);
  assert.deepEqual(result, [enriched], "generic <T> filter must not strip candidate fields");
});
