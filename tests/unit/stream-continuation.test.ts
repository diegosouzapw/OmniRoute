import { test } from "node:test";
import assert from "node:assert/strict";

import {
  scanOpenAiSseText,
  makeContinuationBody,
  trimContinuationOverlap,
} from "../../open-sse/services/streamRecovery.ts";

// ── scanOpenAiSseText ─────────────────────────────────────────────────────────

test("scanOpenAiSseText accumulates content deltas and flags an OpenAI-compat stream", () => {
  const sse =
    'data: {"choices":[{"delta":{"role":"assistant"}}]}\n\n' +
    'data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n' +
    'data: {"choices":[{"delta":{"content":" world"}}]}\n\n';
  const r = scanOpenAiSseText(sse);
  assert.equal(r.text, "Hello world");
  assert.equal(r.parsedOpenAi, true);
  assert.equal(r.sawToolCall, false);
  assert.equal(r.terminal, false);
});

test("scanOpenAiSseText detects the terminal [DONE] marker", () => {
  const r = scanOpenAiSseText('data: {"choices":[{"delta":{"content":"hi"}}]}\n\ndata: [DONE]\n\n');
  assert.equal(r.text, "hi");
  assert.equal(r.terminal, true);
});

test("scanOpenAiSseText detects a finish_reason as terminal", () => {
  const r = scanOpenAiSseText('data: {"choices":[{"delta":{"content":"x"},"finish_reason":"stop"}]}\n\n');
  assert.equal(r.terminal, true);
});

test("scanOpenAiSseText flags tool_call deltas (never continue those)", () => {
  const r = scanOpenAiSseText('data: {"choices":[{"delta":{"tool_calls":[{"index":0,"function":{"name":"f"}}]}}]}\n\n');
  assert.equal(r.sawToolCall, true);
});

test("scanOpenAiSseText reports non-OpenAI bodies as not parsed (e.g. Anthropic events)", () => {
  const anthropic =
    "event: content_block_delta\n" +
    'data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"hi"}}\n\n';
  const r = scanOpenAiSseText(anthropic);
  assert.equal(r.parsedOpenAi, false, "Anthropic format yields no OpenAI delta → not continuable here");
  assert.equal(r.text, "");
});

// ── makeContinuationBody ──────────────────────────────────────────────────────

test("makeContinuationBody appends the partial assistant turn (OpenAI shape)", () => {
  const body = { model: "x", stream: true, messages: [{ role: "user", content: "hi" }] };
  const out = makeContinuationBody(body, "partial answer");
  assert.ok(out, "returns a continuation body");
  assert.notEqual(out, body, "does not mutate the original");
  assert.equal(out!.messages.length, 2);
  assert.deepEqual(out!.messages[1], { role: "assistant", content: "partial answer" });
  assert.equal(out!.stream, true, "stays streaming");
  assert.deepEqual(body.messages.length, 1, "original is untouched");
});

test("makeContinuationBody refuses bodies without a messages array or empty text", () => {
  assert.equal(makeContinuationBody({ model: "x", input: [] } as never, "t"), null);
  assert.equal(makeContinuationBody({ model: "x", messages: [] }, ""), null);
  assert.equal(makeContinuationBody(null as never, "t"), null);
});

// ── trimContinuationOverlap ───────────────────────────────────────────────────

test("trimContinuationOverlap removes a duplicated seam so the join is append-only", () => {
  // model repeats the last words it already emitted
  assert.equal(trimContinuationOverlap("The quick brown", " brown fox jumps"), " fox jumps");
  assert.equal(trimContinuationOverlap("Hello wor", "world!"), "ld!");
});

test("trimContinuationOverlap is a no-op when there is no overlap", () => {
  assert.equal(trimContinuationOverlap("abc", "def"), "def");
  assert.equal(trimContinuationOverlap("", "def"), "def");
  assert.equal(trimContinuationOverlap("abc", ""), "");
});

test("trimContinuationOverlap drops a continuation fully contained in what was emitted", () => {
  // continuation re-sends only text already shown → nothing new to append
  assert.equal(trimContinuationOverlap("Hello world", "world"), "");
});
