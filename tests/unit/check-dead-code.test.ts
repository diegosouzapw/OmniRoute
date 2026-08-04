import { test } from "node:test";
import assert from "node:assert";
import { parseKnipMetrics, evaluateDeadCode } from "../../scripts/check/check-dead-code.mjs";

// The .mjs module has no .d.ts; type the exported functions locally.
type KnipResult = { deadExports: number; deadFiles: number; deadTotal: number };
type DeadCodeVerdict = { regressed: boolean; improved: boolean };

const parse = parseKnipMetrics as (json: unknown) => KnipResult;
const evaluate = evaluateDeadCode as (current: number, baseline: number) => DeadCodeVerdict;

// --- parseKnipMetrics tests ---

test("parseKnipMetrics: null/undefined returns zeros", () => {
  const r = parse(null);
  assert.deepStrictEqual(r, { deadExports: 0, deadFiles: 0, deadTotal: 0 });
});

test("parseKnipMetrics: empty issues array returns zeros", () => {
  const r = parse({ issues: [] });
  assert.deepStrictEqual(r, { deadExports: 0, deadFiles: 0, deadTotal: 0 });
});

test("parseKnipMetrics: counts exports in each category", () => {
  const knipJson = {
    issues: [
      {
        exports: [{ name: "foo" }, { name: "bar" }],
        types: [{ name: "MyType" }],
        nsExports: [],
        nsTypes: [],
      },
    ],
  };
  const r = parse(knipJson);
  assert.equal(r.deadExports, 3); // 2 exports + 1 type
  assert.equal(r.deadFiles, 0);
  assert.equal(r.deadTotal, 3);
});

test("parseKnipMetrics: counts dead files", () => {
  const knipJson = {
    issues: [
      {
        files: ["a.ts", "b.ts"],
      },
    ],
  };
  const r = parse(knipJson);
  assert.equal(r.deadFiles, 2);
  assert.equal(r.deadTotal, 2);
});

test("parseKnipMetrics: combines exports + files across multiple entries", () => {
  const knipJson = {
    issues: [
      { exports: [{ name: "x" }], files: ["dead.ts"] },
      { types: [{ name: "T" }], nsTypes: [{ name: "N" }] },
    ],
  };
  const r = parse(knipJson);
  assert.equal(r.deadExports, 3); // x + T + N
  assert.equal(r.deadFiles, 1);
  assert.equal(r.deadTotal, 4);
});

// --- evaluateDeadCode tests ---

const FROZEN = 327;

test("evaluateDeadCode: equal to baseline passes", () => {
  const r = evaluate(FROZEN, FROZEN);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, false);
});

test("evaluateDeadCode: one more dead symbol is a regression", () => {
  const r = evaluate(FROZEN + 1, FROZEN);
  assert.equal(r.regressed, true);
  assert.equal(r.improved, false);
});

test("evaluateDeadCode: fewer dead symbols is an improvement", () => {
  const r = evaluate(FROZEN - 1, FROZEN);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateDeadCode: zero dead symbols is a maximum improvement", () => {
  const r = evaluate(0, FROZEN);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateDeadCode: strict integer comparison — any increase regresses", () => {
  assert.equal(evaluate(11, 10).regressed, true);
  assert.equal(evaluate(10, 10).regressed, false);
  assert.equal(evaluate(9, 10).regressed, false);
});
