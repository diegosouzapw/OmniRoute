import test from "node:test";
import assert from "node:assert/strict";
import {
  SELECT_ALL_CONFIRM_THRESHOLD,
  shouldConfirmSelectAll,
} from "../../src/shared/components/modelSelectModalHelpers.ts";

// Regression guard for #8526: ModelSelectModal's "Select all" (Browse
// Catalog, combo builder) had no cap — turning off "Show configured only",
// or just having a large provider catalog, could add hundreds of models to a
// combo in one click. Above SELECT_ALL_CONFIRM_THRESHOLD the caller must
// confirm before batch-adding.

test("shouldConfirmSelectAll: does not require confirmation at or below the threshold", () => {
  assert.equal(shouldConfirmSelectAll(0), false);
  assert.equal(shouldConfirmSelectAll(1), false);
  assert.equal(shouldConfirmSelectAll(SELECT_ALL_CONFIRM_THRESHOLD), false);
});

test("shouldConfirmSelectAll: requires confirmation above the threshold", () => {
  assert.equal(shouldConfirmSelectAll(SELECT_ALL_CONFIRM_THRESHOLD + 1), true);
  assert.equal(shouldConfirmSelectAll(500), true);
});

test("shouldConfirmSelectAll: respects a caller-supplied threshold override", () => {
  assert.equal(shouldConfirmSelectAll(5, 10), false);
  assert.equal(shouldConfirmSelectAll(11, 10), true);
});

test("shouldConfirmSelectAll: tolerates non-finite counts without throwing", () => {
  assert.equal(shouldConfirmSelectAll(Number.NaN), false);
  assert.equal(shouldConfirmSelectAll(Number.POSITIVE_INFINITY), false);
});
