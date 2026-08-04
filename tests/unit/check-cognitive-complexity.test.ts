import { test } from "node:test";
import assert from "node:assert";
import {
  countCognitiveViolations,
  evaluateCognitiveComplexity,
} from "../../scripts/check/check-cognitive-complexity.mjs";

// The .mjs module has no .d.ts; type the exported functions locally.
type EslintReport = Array<{ messages: Array<{ ruleId: string }> }>;
type CogComplexityVerdict = { regressed: boolean; improved: boolean };

const count = countCognitiveViolations as (report: EslintReport) => number;
const evaluate = evaluateCognitiveComplexity as (
  current: number,
  baseline: number
) => CogComplexityVerdict;

// --- countCognitiveViolations tests ---

test("countCognitiveViolations: empty report returns 0", () => {
  assert.equal(count([]), 0);
});

test("countCognitiveViolations: counts sonarjs/cognitive-complexity messages", () => {
  const report: EslintReport = [
    {
      messages: [
        { ruleId: "sonarjs/cognitive-complexity" },
        { ruleId: "no-unused-vars" }, // should not count
      ],
    },
    {
      messages: [
        { ruleId: "sonarjs/cognitive-complexity" },
        { ruleId: "sonarjs/cognitive-complexity" },
      ],
    },
  ];
  assert.equal(count(report), 3);
});

test("countCognitiveViolations: no matching rules returns 0", () => {
  const report: EslintReport = [{ messages: [{ ruleId: "no-eval" }, { ruleId: "no-console" }] }];
  assert.equal(count(report), 0);
});

// --- evaluateCognitiveComplexity tests ---

const FROZEN = 738;

test("evaluateCognitiveComplexity: equal to baseline passes", () => {
  const r = evaluate(FROZEN, FROZEN);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, false);
});

test("evaluateCognitiveComplexity: one more violation is a regression", () => {
  const r = evaluate(FROZEN + 1, FROZEN);
  assert.equal(r.regressed, true);
  assert.equal(r.improved, false);
});

test("evaluateCognitiveComplexity: fewer violations is an improvement", () => {
  const r = evaluate(FROZEN - 1, FROZEN);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateCognitiveComplexity: zero violations is maximum improvement", () => {
  const r = evaluate(0, FROZEN);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateCognitiveComplexity: strict integer comparison", () => {
  assert.equal(evaluate(11, 10).regressed, true);
  assert.equal(evaluate(10, 10).regressed, false);
  assert.equal(evaluate(9, 10).regressed, false);
});
