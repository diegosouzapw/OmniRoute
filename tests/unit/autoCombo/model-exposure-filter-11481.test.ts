/**
 * #11481 — mandatory mirror of the `/v1/models` model exposure allow/deny
 * list into the `auto/*` candidate pool (the same trap #6512 already fixed
 * once for `hidePaidModels`: a catalog-only filter still leaks into combo
 * routing).
 *
 * Tests the pure `filterModelExposureCandidates` helper wired into
 * `open-sse/services/autoCombo/virtualFactory.ts::buildPreparedPool`.
 */
import { test } from "vitest";
import assert from "node:assert/strict";

import { filterModelExposureCandidates } from "../../../open-sse/services/autoCombo/modelExposureFilter.ts";

const DENIED = { provider: "openai", model: "gpt-4o" };
const KEPT = { provider: "anthropic", model: "claude-opus-5" };

test("no exposure lists configured (default) returns the pool UNCHANGED (identity, regression guard)", () => {
  const pool = [DENIED, KEPT];
  const result = filterModelExposureCandidates(pool, {});
  assert.equal(result, pool, "must return the exact same array reference when both lists are empty");
  assert.deepEqual(result, [DENIED, KEPT]);
});

test("null/undefined settings also return the pool UNCHANGED", () => {
  const pool = [DENIED, KEPT];
  assert.equal(filterModelExposureCandidates(pool, null), pool);
  assert.equal(filterModelExposureCandidates(pool, undefined), pool);
});

test("denylist drops the denied candidate, keeps the rest", () => {
  const result = filterModelExposureCandidates([DENIED, KEPT], {
    modelVisibilityDenylist: ["openai/gpt-4o"],
  });
  assert.deepEqual(result, [KEPT], "openai/gpt-4o must be excluded; anthropic candidate kept");
});

test("a denied model is NOT selectable in the candidate pool even with an all-denied pool", () => {
  const result = filterModelExposureCandidates([DENIED, { provider: "openai", model: "o3" }], {
    modelVisibilityDenylist: ["openai/*"],
  });
  assert.deepEqual(result, [], "an all-denied pool becomes empty — the graceful empty-pool path");
});

test("allowlist restricts the pool to exactly the listed candidates", () => {
  const result = filterModelExposureCandidates([DENIED, KEPT], {
    modelVisibilityAllowlist: ["anthropic/claude-opus-5"],
  });
  assert.deepEqual(result, [KEPT]);
});

test("preserves extra candidate fields on kept entries", () => {
  const enriched = { provider: "anthropic", model: "claude-opus-5", connectionId: "abc", extra: 1 };
  const result = filterModelExposureCandidates([enriched, DENIED], {
    modelVisibilityDenylist: ["openai/gpt-4o"],
  });
  assert.deepEqual(result, [enriched], "generic <T> filter must not strip candidate fields");
});
