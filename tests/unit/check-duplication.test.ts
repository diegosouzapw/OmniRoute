import { test } from "node:test";
import assert from "node:assert";
import { evaluateDuplication } from "../../scripts/check/check-duplication.mjs";

const EPS = 0.05;

test("equal to baseline passes", () => {
  assert.equal(evaluateDuplication(5.72, 5.72, EPS).regressed, false);
});

test("within epsilon passes (float noise)", () => {
  assert.equal(evaluateDuplication(5.74, 5.72, EPS).regressed, false);
});

test("meaningful increase is a regression", () => {
  const r = evaluateDuplication(5.9, 5.72, EPS);
  assert.equal(r.regressed, true);
});

test("a decrease is an improvement (ratchet down)", () => {
  const r = evaluateDuplication(5.0, 5.72, EPS);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});
