import test from "node:test";
import assert from "node:assert/strict";

import {
  recordModelLockoutFailure,
  isModelLocked,
  clearAllModelLockouts,
} from "../../open-sse/services/accountFallback.ts";

test("Antigravity 404 Model Not Found locks exact model ONLY, not entire family", () => {
  clearAllModelLockouts();

  // 1. Simulate a 404 error on a non-existent model "gemini-3.6"
  recordModelLockoutFailure(
    "antigravity",
    "test_connection_id",
    "gemini-3.6",
    "not_found",
    404,
    5000
  );

  // 2. Exact non-existent model should block
  assert.equal(
    isModelLocked("antigravity", "test_connection_id", "gemini-3.6"),
    true,
    "Requested non-existent model gemini-3.6 should be locked"
  );

  // 3. Valids in the same family should NOT be blocked
  assert.equal(
    isModelLocked("antigravity", "test_connection_id", "gemini-3.1-flash-lite"),
    false,
    "Valid model gemini-3.1-flash-lite should not be locked by a different model's 404 error"
  );

  assert.equal(
    isModelLocked("antigravity", "test_connection_id", "gemini-1.5-flash"),
    false,
    "Valid model gemini-1.5-flash should not be locked by a different model's 404 error"
  );
});

test("Antigravity 429 Rate Limit locks whole family", () => {
  clearAllModelLockouts();

  // 1. Simulate a 429 rate limit on "gemini-3.1-flash-lite"
  recordModelLockoutFailure(
    "antigravity",
    "test_connection_id",
    "gemini-3.1-flash-lite",
    "rate_limited",
    429,
    60000
  );

  // 2. The rate-limited model should be locked
  assert.equal(isModelLocked("antigravity", "test_connection_id", "gemini-3.1-flash-lite"), true);

  // 3. Sibling models of the same family should also be locked
  assert.equal(
    isModelLocked("antigravity", "test_connection_id", "gemini-1.5-flash"),
    true,
    "Sibling model should be locked by the family quota exhaustion"
  );
});
