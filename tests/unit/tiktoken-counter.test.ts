import { test } from "node:test";
import assert from "node:assert/strict";
import {
  countTextTokens,
  isCodexTokenizerContext,
  resolveTokenizerEncoding,
} from "../../src/shared/utils/tiktokenCounter.ts";

test("countTextTokens returns exact tiktoken count for a known string", () => {
  assert.equal(countTextTokens("hello world"), 2); // cl100k_base
});

test("Codex context selects o200k_base without changing the default", () => {
  assert.equal(resolveTokenizerEncoding(), "cl100k_base");
  assert.equal(resolveTokenizerEncoding({ provider: "codex" }), "o200k_base");
  assert.equal(resolveTokenizerEncoding({ provider: "cx" }), "o200k_base");
  assert.equal(resolveTokenizerEncoding({ model: "codex/gpt-5.6-sol" }), "o200k_base");
  assert.equal(resolveTokenizerEncoding({ model: "cx/gpt-5.6-sol" }), "o200k_base");
  assert.equal(resolveTokenizerEncoding({ provider: "openai", model: "gpt-5.6" }), "cl100k_base");
  assert.equal(isCodexTokenizerContext({ provider: "codex" }), true);
  assert.equal(isCodexTokenizerContext({ provider: "openai" }), false);
});

test("Codex token counting uses the o200k encoder", () => {
  const text = "antidisestablishmentarianism 中文ภาษาไทย";
  assert.notEqual(
    countTextTokens(text, { provider: "codex" }),
    countTextTokens(text, { provider: "openai" })
  );
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
