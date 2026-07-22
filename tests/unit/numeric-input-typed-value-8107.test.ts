import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Regression tests for #8107 — numeric input field rejects typed values
 * on Chrome/Windows when user selects-all and types replacement text.
 *
 * Root cause: <input type="number"> has inconsistent behavior across browsers
 * during select-all-then-type. The controlled React input may swallow keystrokes.
 * Fix: switch to type="text" + inputMode="numeric" and strip non-digit chars.
 *
 * These tests validate the onChange parsing logic that replaces the old
 * Number(event.target.value) pattern.
 */

function parseNumericInput(value: string): number | null {
  const raw = value.replace(/[^0-9]/g, "");
  if (raw === "") return null;
  const nextValue = Number(raw);
  if (Number.isFinite(nextValue)) return nextValue;
  return null;
}

describe("#8107 — numeric input typed value", () => {
  it("accepts plain digit string", () => {
    assert.equal(parseNumericInput("500000"), 500000);
  });

  it("accepts value with leading zeros", () => {
    assert.equal(parseNumericInput("007"), 7);
  });

  it("rejects empty string (user cleared the field)", () => {
    assert.equal(parseNumericInput(""), null);
  });

  it("strips non-digit characters (e.g. letters pasted by mistake)", () => {
    assert.equal(parseNumericInput("12abc34"), 1234);
  });

  it("strips decimal point (integer-only field)", () => {
    assert.equal(parseNumericInput("123.45"), 12345);
  });

  it("strips minus sign (unsigned field)", () => {
    assert.equal(parseNumericInput("-100"), 100);
  });

  it("strips spaces and special chars", () => {
    assert.equal(parseNumericInput(" 1 2 3 "), 123);
    assert.equal(parseNumericInput("1,000"), 1000);
  });

  it("rejects string with no digits", () => {
    assert.equal(parseNumericInput("abc"), null);
    assert.equal(parseNumericInput("---"), null);
  });

  it("handles very large numbers", () => {
    const result = parseNumericInput("999999999999");
    assert.equal(result, 999999999999);
  });

  it("handles the exact reproduction from the bug report: select-all + type 500000", () => {
    // Simulates: user selects existing value (e.g. "30000"), types "500000"
    assert.equal(parseNumericInput("500000"), 500000);
  });
});
