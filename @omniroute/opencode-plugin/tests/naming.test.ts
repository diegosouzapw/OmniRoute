/**
 * Tests for `formatFreeBudget` (@omniroute/opencode-plugin/src/naming.ts):
 * formats a free-tier model's budget info into a short human-readable
 * suffix, branching on `freeType`.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import { formatFreeBudget, type FreeModelFreeType } from "../src/naming.js";

test("formatFreeBudget: recurring-daily formats tokens/day", () => {
  assert.equal(
    formatFreeBudget({ freeType: "recurring-daily", monthlyTokens: 25_000_000 }),
    "25M tokens/day"
  );
});

test("formatFreeBudget: recurring-monthly formats tokens/month", () => {
  assert.equal(
    formatFreeBudget({ freeType: "recurring-monthly", monthlyTokens: 1_000_000 }),
    "1M tokens/month"
  );
});

test("formatFreeBudget: recurring-credit formats credits", () => {
  assert.equal(
    formatFreeBudget({ freeType: "recurring-credit", creditTokens: 10_000_000 }),
    "10M credits"
  );
});

test("formatFreeBudget: one-time-initial formats credits with (one-time) suffix", () => {
  assert.equal(
    formatFreeBudget({ freeType: "one-time-initial", creditTokens: 1_000_000 }),
    "1M credits (one-time)"
  );
});

test("formatFreeBudget: keyless has no token/credit args", () => {
  assert.equal(formatFreeBudget({ freeType: "keyless" }), "(keyless)");
});

test("formatFreeBudget: discontinued has no token/credit args", () => {
  assert.equal(formatFreeBudget({ freeType: "discontinued" }), "(discontinued)");
});

test("formatFreeBudget: missing token/credit counts default to 0", () => {
  assert.equal(
    formatFreeBudget({ freeType: "recurring-daily" }),
    "0 tokens/day"
  );
});

test("formatFreeBudget: unrecognised freeType falls through to the default branch", () => {
  // `freeType` is populated from catalog data at runtime, so a value the
  // build doesn't know about is reachable even though TypeScript treats the
  // `default:` arm as dead code for a well-typed caller.
  assert.equal(
    formatFreeBudget({ freeType: "some-future-type" as FreeModelFreeType }),
    ""
  );
});

test("formatFreeBudget: sub-1K token count is not abbreviated", () => {
  assert.equal(
    formatFreeBudget({ freeType: "recurring-daily", monthlyTokens: 500 }),
    "500 tokens/day"
  );
});

test("formatFreeBudget: the 999_999 rounding wart is fixed — promotes to 1M", () => {
  // `toFixed(1)` rounds 999999/1e3 up to "1000.0" before the `>= 1e6` threshold
  // check has a chance to apply. fmtTokens now promotes a rounded-up "1000" in
  // any unit to the next unit up, so this correctly reads "1M" instead of the
  // old "1000K" wart.
  assert.equal(
    formatFreeBudget({ freeType: "recurring-daily", monthlyTokens: 999_999 }),
    "1M tokens/day"
  );
});
