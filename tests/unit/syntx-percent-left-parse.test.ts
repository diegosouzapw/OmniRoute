import test from "node:test";
import assert from "node:assert/strict";

import { parseSyntxPercentLeft } from "../../open-sse/services/usage/syntx.ts";

test("parseSyntxPercentLeft strips every percent sign, not only the first", () => {
  assert.equal(parseSyntxPercentLeft("%%50"), 50);
  assert.equal(parseSyntxPercentLeft("% 42,5 %"), 42.5);
});

test("parseSyntxPercentLeft keeps the plain formats working", () => {
  assert.equal(parseSyntxPercentLeft("75%"), 75);
  assert.equal(parseSyntxPercentLeft("12,5%"), 12.5);
  assert.equal(parseSyntxPercentLeft(33), 33);
  assert.equal(parseSyntxPercentLeft("n/a"), 0);
  assert.equal(parseSyntxPercentLeft(null), 0);
});
