import assert from "node:assert/strict";
import { test } from "node:test";

import {
  toNumber,
  toNumberOrNull,
  toNumberArray,
} from "../../src/shared/utils/numeric.ts";

// Shared input matrix covering the coercion edge cases that motivated
// consolidating ~51 near-duplicate `toNumber` definitions (#7879).
const CASES: Array<{ label: string; input: unknown; finite: number | null }> = [
  { label: "null", input: null, finite: null },
  { label: "undefined", input: undefined, finite: null },
  { label: "empty string", input: "", finite: null },
  { label: "whitespace string", input: "  ", finite: null },
  { label: "numeric string", input: "12", finite: 12 },
  { label: "decimal string", input: "12.5", finite: 12.5 },
  { label: "negative string", input: "-3", finite: -3 },
  { label: "zero string", input: "0", finite: 0 },
  { label: "non-numeric string", input: "abc", finite: null },
  { label: "partially-numeric string", input: "12abc", finite: null },
  { label: "NaN", input: NaN, finite: null },
  { label: "Infinity", input: Infinity, finite: null },
  { label: "-Infinity", input: -Infinity, finite: null },
  { label: "plain object", input: {}, finite: null },
  { label: "empty array", input: [], finite: null },
  { label: "exponential string", input: "1e3", finite: 1000 },
  { label: "boolean true", input: true, finite: null },
];

test("toNumber: matrix with default fallback (0)", () => {
  for (const { label, input, finite } of CASES) {
    const expected = finite ?? 0;
    assert.equal(toNumber(input), expected, `toNumber(${label}) should be ${expected}`);
  }
});

test("toNumber: matrix with custom fallback", () => {
  for (const { label, input, finite } of CASES) {
    const expected = finite ?? -1;
    assert.equal(
      toNumber(input, -1),
      expected,
      `toNumber(${label}, -1) should be ${expected}`
    );
  }
});

test("toNumber: numbers pass through untouched", () => {
  assert.equal(toNumber(42), 42);
  assert.equal(toNumber(-7.5), -7.5);
  assert.equal(toNumber(0), 0);
});

test("toNumberOrNull: matrix returns null instead of 0 fallback", () => {
  for (const { label, input, finite } of CASES) {
    assert.equal(
      toNumberOrNull(input),
      finite,
      `toNumberOrNull(${label}) should be ${finite}`
    );
  }
});

test("toNumberOrNull: numbers pass through untouched", () => {
  assert.equal(toNumberOrNull(42), 42);
  assert.equal(toNumberOrNull(0), 0);
});

test("toNumberArray: non-array input returns the fallback unchanged", () => {
  assert.deepEqual(toNumberArray(null), []);
  assert.deepEqual(toNumberArray(undefined), []);
  assert.deepEqual(toNumberArray("not an array"), []);
  assert.deepEqual(toNumberArray({}), []);
  assert.deepEqual(toNumberArray(null, [1, 2]), [1, 2]);
});

test("toNumberArray: maps each element through toNumber, bad elements become 0", () => {
  assert.deepEqual(toNumberArray(["12", "12.5", "abc", null, 3]), [12, 12.5, 0, 0, 3]);
  assert.deepEqual(toNumberArray([]), []);
});

test("toNumberArray: element-level fallback (0) is independent of the array-level fallback", () => {
  // Array itself IS present (so array-level fallback does not apply), but one
  // element fails to coerce and must fall back to 0, not to the caller's
  // array-level fallback value.
  assert.deepEqual(toNumberArray(["abc"], [99]), [0]);
});
