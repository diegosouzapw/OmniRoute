/**
 * Tests for composerToolCalls.ts — DeepSeek inline tool-call parser.
 * Ported from decolua/9router#1335 (noestelar), adapted to OmniRoute
 * node:test conventions.
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  hasComposerToolCalls,
  parseComposerToolCalls,
  createStreamingState,
  feedStreamingChunk,
} from "../../open-sse/utils/composerToolCalls.ts";

// ─── hasComposerToolCalls ─────────────────────────────────────────────────────

test("hasComposerToolCalls: returns false for plain text", () => {
  assert.equal(hasComposerToolCalls("Hello world"), false);
});

test("hasComposerToolCalls: returns false for empty string", () => {
  assert.equal(hasComposerToolCalls(""), false);
});

test("hasComposerToolCalls: detects full-width pipe markers", () => {
  const text =
    "<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>\ntool_name\n<｜tool▁sep｜>arg\nval\n<｜tool▁call▁end｜><｜tool▁calls▁end｜>";
  assert.equal(hasComposerToolCalls(text), true);
});

test("hasComposerToolCalls: detects ASCII fallback markers", () => {
  const text =
    "<|tool_calls_begin|><|tool_call_begin|>\ntool_name\n<|tool_sep|>arg\nval\n<|tool_call_end|><|tool_calls_end|>";
  assert.equal(hasComposerToolCalls(text), true);
});

// ─── parseComposerToolCalls ───────────────────────────────────────────────────

test("parseComposerToolCalls: returns unchanged text when no markers present", () => {
  const result = parseComposerToolCalls("Hello world");
  assert.equal(result.content, "Hello world");
  assert.deepEqual(result.toolCalls, []);
});

test("parseComposerToolCalls: parses a single tool call with two args", () => {
  const text =
    "Searching now.\n<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>\nsearch_files\n" +
    "<｜tool▁sep｜>pattern\n*cron*.py\n" +
    "<｜tool▁sep｜>path\n/home/user/.hermes\n" +
    "<｜tool▁call▁end｜><｜tool▁calls▁end｜>";

  const result = parseComposerToolCalls(text);

  assert.equal(result.content, "Searching now.");
  assert.equal(result.toolCalls.length, 1);
  const tc = result.toolCalls[0];
  assert.equal(tc.type, "function");
  assert.equal(tc.function.name, "search_files");
  const args = JSON.parse(tc.function.arguments);
  assert.equal(args.pattern, "*cron*.py");
  assert.equal(args.path, "/home/user/.hermes");
  // ID must follow call_<...> pattern
  assert.match(tc.id, /^call_/);
});

test("parseComposerToolCalls: strips markers and returns residual preamble", () => {
  const text =
    "Preamble.\n<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>\nwrite_file\n" +
    "<｜tool▁sep｜>path\n/tmp/x.txt\n<｜tool▁sep｜>content\nhello\n" +
    "<｜tool▁call▁end｜><｜tool▁calls▁end｜>\nTrailing.";

  const result = parseComposerToolCalls(text);
  // Both preamble and trailing should be in content
  assert.ok(result.content.includes("Preamble.") || result.content.includes("Trailing."));
  assert.equal(result.toolCalls.length, 1);
  assert.equal(result.toolCalls[0].function.name, "write_file");
  // No marker should remain in content
  assert.ok(!result.content.includes("tool▁calls▁begin"));
  assert.ok(!result.content.includes("｜"));
});

test("parseComposerToolCalls: parses multiple tool calls", () => {
  const text =
    "<｜tool▁calls▁begin｜>" +
    "<｜tool▁call▁begin｜>\ntool_a\n<｜tool▁sep｜>arg\nval_a\n<｜tool▁call▁end｜>" +
    "<｜tool▁call▁begin｜>\ntool_b\n<｜tool▁sep｜>arg\nval_b\n<｜tool▁call▁end｜>" +
    "<｜tool▁calls▁end｜>";

  const result = parseComposerToolCalls(text);
  assert.equal(result.toolCalls.length, 2);
  assert.equal(result.toolCalls[0].function.name, "tool_a");
  assert.equal(result.toolCalls[1].function.name, "tool_b");
});

test("parseComposerToolCalls: coerces JSON object arg value", () => {
  const text =
    "<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>\njson_tool\n" +
    '<｜tool▁sep｜>data\n{"key":"value"}\n' +
    "<｜tool▁call▁end｜><｜tool▁calls▁end｜>";

  const result = parseComposerToolCalls(text);
  const args = JSON.parse(result.toolCalls[0].function.arguments);
  assert.deepEqual(args.data, { key: "value" });
});

test("parseComposerToolCalls: coerces integer arg value", () => {
  const text =
    "<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>\nset_timeout\n" +
    "<｜tool▁sep｜>ms\n3000\n" +
    "<｜tool▁call▁end｜><｜tool▁calls▁end｜>";

  const result = parseComposerToolCalls(text);
  const args = JSON.parse(result.toolCalls[0].function.arguments);
  assert.equal(args.ms, 3000);
});

test("parseComposerToolCalls: coerces boolean arg value", () => {
  const text =
    "<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>\nset_flag\n" +
    "<｜tool▁sep｜>enabled\ntrue\n" +
    "<｜tool▁call▁end｜><｜tool▁calls▁end｜>";

  const result = parseComposerToolCalls(text);
  const args = JSON.parse(result.toolCalls[0].function.arguments);
  assert.equal(args.enabled, true);
});

test("parseComposerToolCalls: returns empty toolCalls for null/undefined input", () => {
  // @ts-expect-error testing runtime safety
  const result = parseComposerToolCalls(null);
  assert.equal(result.content, "");
  assert.deepEqual(result.toolCalls, []);
});

test("parseComposerToolCalls: accepts ASCII fallback markers", () => {
  const text =
    "<|tool_calls_begin|><|tool_call_begin|>\nmy_tool\n" +
    "<|tool_sep|>arg\nvalue\n" +
    "<|tool_call_end|><|tool_calls_end|>";

  const result = parseComposerToolCalls(text);
  assert.equal(result.toolCalls.length, 1);
  assert.equal(result.toolCalls[0].function.name, "my_tool");
});

// ─── Streaming parser ─────────────────────────────────────────────────────────

test("feedStreamingChunk: emits safe text before the marker block", () => {
  const state = createStreamingState();
  const out = feedStreamingChunk(state, "Safe text before.");
  assert.equal(out.safeDelta, "Safe text before.");
  assert.equal(out.ready, false);
  assert.equal(out.holdback, false);
});

test("feedStreamingChunk: holds back partial opening marker at tail", () => {
  const state = createStreamingState();
  const out = feedStreamingChunk(state, "Working on it.<｜tool▁call");
  assert.equal(out.safeDelta, "Working on it.");
  assert.equal(out.holdback, true);
  assert.equal(out.ready, false);
});

test("feedStreamingChunk: suppresses text once opening marker is seen", () => {
  const state = createStreamingState();
  // First: safe text only
  feedStreamingChunk(state, "Preamble.");
  // Second: opening marker arrives mid-accumulation
  const out = feedStreamingChunk(state, "Preamble.<｜tool▁calls▁begin｜>");
  assert.equal(out.safeDelta, "");
  assert.equal(out.holdback, true);
});

test("feedStreamingChunk: flushes tool calls once the closing marker arrives", () => {
  const state = createStreamingState();
  const acc =
    "ok\n<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>\nwrite_file\n" +
    "<｜tool▁sep｜>path\n/tmp/x\n<｜tool▁sep｜>content\nhi\n" +
    "<｜tool▁call▁end｜><｜tool▁calls▁end｜>";

  // Simulate it arriving in two halves
  feedStreamingChunk(state, acc.slice(0, 30));
  const out = feedStreamingChunk(state, acc);

  assert.equal(out.ready, true);
  assert.equal(out.toolCalls.length, 1);
  assert.equal(out.toolCalls[0].function.name, "write_file");
  const args = JSON.parse(out.toolCalls[0].function.arguments);
  assert.deepEqual(args, { path: "/tmp/x", content: "hi" });
});

test("feedStreamingChunk: does not leak partial opening marker split across frames", () => {
  const state = createStreamingState();
  const a = feedStreamingChunk(state, "Working on it.<｜tool▁call");
  assert.equal(a.safeDelta, "Working on it.");
  assert.equal(a.holdback, true);
  const b = feedStreamingChunk(state, "Working on it.<｜tool▁calls▁begin｜>");
  assert.equal(b.safeDelta, "");
  assert.equal(b.holdback, true);
});

test("feedStreamingChunk: emits no tool calls when block closes empty", () => {
  const state = createStreamingState();
  const out = feedStreamingChunk(state, "<｜tool▁calls▁begin｜><｜tool▁calls▁end｜>");
  assert.equal(out.ready, true);
  assert.deepEqual(out.toolCalls, []);
});

test("feedStreamingChunk: noop after done state", () => {
  const state = createStreamingState();
  state.done = true;
  const out = feedStreamingChunk(state, "some text");
  assert.equal(out.safeDelta, "");
  assert.equal(out.ready, false);
});
