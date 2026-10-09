/**
 * CodeQL #1107 (js/incomplete-sanitization): the SYNTX usage parsers used
 * String#replace with a string pattern, which only rewrites the FIRST
 * occurrence. Every "%" and "," must be normalized before parseFloat.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  parseSyntxPercentLeft,
  parseSyntxTokenBalance,
} from "../../open-sse/services/usage/syntx.ts";

test("parseSyntxPercentLeft strips every percent sign, not just the first", () => {
  assert.equal(parseSyntxPercentLeft("%%42"), 42);
  assert.equal(parseSyntxPercentLeft("42,5%"), 42.5);
  assert.equal(parseSyntxPercentLeft(" 17 % "), 17);
});

test("parseSyntxPercentLeft keeps numbers and rejects garbage", () => {
  assert.equal(parseSyntxPercentLeft(73), 73);
  assert.equal(parseSyntxPercentLeft("n/a"), 0);
  assert.equal(parseSyntxPercentLeft(null), 0);
});

test("parseSyntxTokenBalance normalizes the decimal comma", () => {
  assert.equal(parseSyntxTokenBalance("1,5"), 1.5);
  assert.equal(parseSyntxTokenBalance(250), 250);
  assert.equal(parseSyntxTokenBalance(undefined), 0);
});
