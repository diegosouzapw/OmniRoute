import { test } from "node:test";
import assert from "node:assert";
import { evaluateComplexity } from "../../scripts/check/check-complexity.mjs";

// The .mjs module has no .d.ts; type the pure comparator locally so the test file
// stays free of explicit `any` (ratchet 3482 — zero new warnings allowed).
type ComplexityVerdict = { regressed: boolean; improved: boolean };
const evaluate = evaluateComplexity as (current: number, baseline: number) => ComplexityVerdict;

const BASELINE = 1739;

test("equal to baseline passes", () => {
  const r = evaluate(BASELINE, BASELINE);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, false);
});

test("one more violation is a regression", () => {
  const r = evaluate(BASELINE + 1, BASELINE);
  assert.equal(r.regressed, true);
  assert.equal(r.improved, false);
});

test("a large increase is a regression", () => {
  const r = evaluate(BASELINE + 200, BASELINE);
  assert.equal(r.regressed, true);
});

test("one fewer violation is an improvement (ratchet down)", () => {
  const r = evaluate(BASELINE - 1, BASELINE);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("zero violations is an improvement and never regresses", () => {
  const r = evaluate(0, BASELINE);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("exact-integer comparison — no epsilon tolerance", () => {
  // Unlike the duplication gate (float %), complexity is an integer count: any increase
  // at all must fail, with no slack.
  assert.equal(evaluate(11, 10).regressed, true);
  assert.equal(evaluate(10, 10).regressed, false);
});
