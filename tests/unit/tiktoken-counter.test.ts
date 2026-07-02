import { test } from "node:test";
import assert from "node:assert/strict";
import { countTextTokens } from "../../src/shared/utils/tiktokenCounter.ts";

test("countTextTokens returns exact tiktoken count for a known string", () => {
  assert.equal(countTextTokens("hello world"), 2); // cl100k_base
});

test("countTextTokens handles empty and non-string safely", () => {
  assert.equal(countTextTokens(""), 0);
  assert.equal(countTextTokens(undefined as unknown as string), 0);
});

test("countTextTokens is additive-ish and monotonic for longer text", () => {
  const short = countTextTokens("the quick brown fox");
  const long = countTextTokens("the quick brown fox jumps over the lazy dog");
  assert.ok(long > short);
  assert.ok(short > 0);
});
