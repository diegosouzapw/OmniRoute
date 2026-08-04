// tests/unit/combo/effective-max-concurrency.test.ts
// Unit test for effectiveMaxConcurrency — the pure resolver that turns a
// connection's per-account concurrency cap (provider_connections.max_concurrent)
// into the semaphore's maxConcurrency for a round-robin combo target, falling
// back to the combo-level default when the connection has no positive cap.
//
// Runner: node:test + assert/strict (matches the sibling combo predicate tests).
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { effectiveMaxConcurrency } from "../../../open-sse/services/combo/comboPredicates.ts";

describe("effectiveMaxConcurrency", () => {
  test("a positive per-connection cap wins over the fallback", () => {
    assert.equal(effectiveMaxConcurrency(1, 3), 1, "GLM/MiniMax-style cap of 1 must be honored");
    assert.equal(effectiveMaxConcurrency(5, 3), 5, "a cap higher than the default is still used");
  });

  test("null cap → fallback (no per-connection limit configured)", () => {
    assert.equal(effectiveMaxConcurrency(null, 3), 3);
  });

  test("undefined cap → fallback", () => {
    assert.equal(effectiveMaxConcurrency(undefined, 7), 7);
  });

  test("zero cap → fallback (0 means 'no limit', not 'block everything')", () => {
    assert.equal(effectiveMaxConcurrency(0, 3), 3);
  });

  test("negative cap → fallback (defensive)", () => {
    assert.equal(effectiveMaxConcurrency(-2, 4), 4);
  });

  test("non-finite cap → fallback (defensive)", () => {
    assert.equal(effectiveMaxConcurrency(Number.NaN, 4), 4);
    assert.equal(effectiveMaxConcurrency(Number.POSITIVE_INFINITY, 4), 4);
  });

  test("a non-integer positive cap is floored to a whole slot count", () => {
    assert.equal(
      effectiveMaxConcurrency(2.9, 3),
      2,
      "fractional caps floor to whole concurrency slots"
    );
  });
});
