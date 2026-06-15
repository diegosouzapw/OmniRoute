import { test } from "node:test";
import assert from "node:assert";
import {
  parseTypeCoverageOutput,
  evaluateTypeCoverage,
} from "../../scripts/check/check-type-coverage.mjs";

// The .mjs module has no .d.ts; type the exported functions locally.
type TypeCoverageVerdict = { regressed: boolean; improved: boolean };

const parse = parseTypeCoverageOutput as (jsonText: string) => number;
const evaluate = evaluateTypeCoverage as (
  current: number,
  baseline: number,
  eps?: number
) => TypeCoverageVerdict;

// --- parseTypeCoverageOutput tests ---

test("parseTypeCoverageOutput: parses valid JSON with percent field", () => {
  const pct = parse(JSON.stringify({ percent: 92.17, atLeast: 90 }));
  assert.equal(pct, 92.17);
});

test("parseTypeCoverageOutput: throws on invalid JSON", () => {
  assert.throws(() => parse("not json"), /Failed to parse JSON output/);
});

test("parseTypeCoverageOutput: throws if percent field is missing", () => {
  assert.throws(() => parse(JSON.stringify({ atLeast: 90 })), /missing numeric 'percent' field/);
});

test("parseTypeCoverageOutput: throws if percent is not a number", () => {
  assert.throws(
    () => parse(JSON.stringify({ percent: "92.17" })),
    /missing numeric 'percent' field/
  );
});

// --- evaluateTypeCoverage tests (direction = up: drops are regressions) ---

const FROZEN = 92.17;
const EPS = 0.05; // small tolerance for float noise

test("evaluateTypeCoverage: equal to baseline passes (within eps)", () => {
  const r = evaluate(FROZEN, FROZEN, EPS);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, false);
});

test("evaluateTypeCoverage: drop beyond eps is a regression", () => {
  const r = evaluate(FROZEN - 0.1, FROZEN, EPS);
  assert.equal(r.regressed, true);
  assert.equal(r.improved, false);
});

test("evaluateTypeCoverage: drop within eps is not a regression", () => {
  const r = evaluate(FROZEN - 0.03, FROZEN, EPS);
  assert.equal(r.regressed, false);
});

test("evaluateTypeCoverage: improvement passes and is flagged", () => {
  const r = evaluate(FROZEN + 1, FROZEN, EPS);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateTypeCoverage: 100% coverage is maximum improvement", () => {
  const r = evaluate(100, FROZEN, EPS);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateTypeCoverage: no eps defaults to 0 (exact comparison)", () => {
  // With eps=0, even a tiny drop regresses
  const r = evaluate(FROZEN - 0.01, FROZEN);
  assert.equal(r.regressed, true);
});
