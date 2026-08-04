// tests/unit/build/check-type-coverage.test.ts
// Unit tests for the parseTypeCoverageOutput() helper in check-type-coverage.mjs.
// Tests exercise the pure parsing logic against synthetic JSON strings — no child
// process is spawned, so the suite is fast and hermetic.

import test from "node:test";
import assert from "node:assert/strict";
import { parseTypeCoverageOutput } from "../../../scripts/check/check-type-coverage.mjs";

test("parseTypeCoverageOutput: parses standard type-coverage JSON output", () => {
  const raw = JSON.stringify({
    succeeded: true,
    atLeastFailed: false,
    correctCount: 246617,
    percent: 91.66,
    percentString: "91.66",
    totalCount: 269047,
  });
  const pct = parseTypeCoverageOutput(raw);
  assert.strictEqual(pct, 91.66);
});

test("parseTypeCoverageOutput: returns integer percent when exactly 100", () => {
  const raw = JSON.stringify({
    succeeded: true,
    atLeastFailed: false,
    correctCount: 1000,
    percent: 100,
    percentString: "100",
    totalCount: 1000,
  });
  const pct = parseTypeCoverageOutput(raw);
  assert.strictEqual(pct, 100);
});

test("parseTypeCoverageOutput: returns 0 when everything is untyped", () => {
  const raw = JSON.stringify({
    succeeded: true,
    atLeastFailed: false,
    correctCount: 0,
    percent: 0,
    percentString: "0",
    totalCount: 500,
  });
  const pct = parseTypeCoverageOutput(raw);
  assert.strictEqual(pct, 0);
});

test("parseTypeCoverageOutput: handles high-precision decimals", () => {
  const raw = JSON.stringify({
    succeeded: true,
    atLeastFailed: false,
    correctCount: 173155,
    percent: 96.98,
    percentString: "96.98",
    totalCount: 178539,
  });
  const pct = parseTypeCoverageOutput(raw);
  assert.strictEqual(pct, 96.98);
});

test("parseTypeCoverageOutput: throws on invalid JSON", () => {
  assert.throws(
    () => parseTypeCoverageOutput("not-valid-json"),
    /Failed to parse JSON output/,
  );
});

test("parseTypeCoverageOutput: throws when percent field is missing", () => {
  const raw = JSON.stringify({ succeeded: true, correctCount: 100 });
  assert.throws(
    () => parseTypeCoverageOutput(raw),
    /missing numeric 'percent' field/,
  );
});

test("parseTypeCoverageOutput: throws when percent field is a string instead of number", () => {
  const raw = JSON.stringify({
    succeeded: true,
    percent: "91.66",
    percentString: "91.66",
    totalCount: 100,
    correctCount: 91,
  });
  assert.throws(
    () => parseTypeCoverageOutput(raw),
    /missing numeric 'percent' field/,
  );
});

test("parseTypeCoverageOutput: throws on empty string", () => {
  assert.throws(
    () => parseTypeCoverageOutput(""),
    /Failed to parse JSON output/,
  );
});

test("parseTypeCoverageOutput: ignores extra unknown fields", () => {
  const raw = JSON.stringify({
    succeeded: false,
    atLeastFailed: true,
    correctCount: 50,
    percent: 50.0,
    percentString: "50.00",
    totalCount: 100,
    extra: "ignored",
  });
  const pct = parseTypeCoverageOutput(raw);
  assert.strictEqual(pct, 50);
});
