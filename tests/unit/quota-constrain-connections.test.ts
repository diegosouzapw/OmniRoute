/**
 * tests/unit/quota-constrain-connections.test.ts
 *
 * TDD coverage for src/lib/quota/quotaKey.ts::constrainConnectionsToQuota.
 * Pure-function tests — no DB setup needed.
 *
 * Cases:
 *  1. Non-quota key (empty quotaConnectionIds) → existing returned unchanged.
 *  2. No prior constraint (empty existing) + quota [c1,c2] → [c1,c2].
 *  3. Existing [c1,c2,c3] ∩ quota [c2] → [c2].
 *  4. Disjoint sets → [].
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import { constrainConnectionsToQuota } from "../../src/lib/quota/quotaKey.ts";

test("non-quota key: empty quotaConnectionIds returns existing unchanged", () => {
  const existing = ["c1", "c2", "c3"];
  const result = constrainConnectionsToQuota(existing, []);
  assert.deepStrictEqual(result, existing);
});

test("no prior constraint: empty existing with quota [c1,c2] returns [c1,c2]", () => {
  const result = constrainConnectionsToQuota([], ["c1", "c2"]);
  assert.deepStrictEqual(result, ["c1", "c2"]);
});

test("intersection: existing [c1,c2,c3] ∩ quota [c2] returns [c2]", () => {
  const result = constrainConnectionsToQuota(["c1", "c2", "c3"], ["c2"]);
  assert.deepStrictEqual(result, ["c2"]);
});

test("disjoint sets: no common elements returns empty array", () => {
  const result = constrainConnectionsToQuota(["c1", "c2"], ["c3", "c4"]);
  assert.deepStrictEqual(result, []);
});
