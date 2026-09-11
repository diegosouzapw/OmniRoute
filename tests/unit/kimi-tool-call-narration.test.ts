/**
 * Tests for kimiToolCallNarration.ts — recovers structured tool calls from
 * Kimi models that mimic flattenMessages' "Assistant called tool ..." history
 * narration and append native closing delimiters, instead of emitting a
 * native Cursor tool call.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { recoverKimiToolCallNarration } from "../../open-sse/utils/kimiToolCallNarration.ts";

const DELIM =
  "<|close|>" +
  "argument" +
  "<|sep|>" +
  "<|close|>" +
  "call" +
  "<|sep|>" +
  "<|close|>" +
  "tools" +
  "<|sep|>";

test("returns null for plain prose", () => {
  assert.equal(recoverKimiToolCallNarration("Hello world"), null);
});

test("returns null for empty string", () => {
  assert.equal(recoverKimiToolCallNarration(""), null);
});

test("recovers a tool call and strips the delimiter tail", () => {
  const text =
    "No new commit yet after ~8 minutes. Polling again.\n\n" +
    "Assistant called tool buzz-dev-mcp__shell (toolu_01PollBanner2) with arguments: " +
    '{"command":"sleep 480","timeout_ms":540000}' +
    DELIM;

  const r = recoverKimiToolCallNarration(text);
  assert.ok(r, "should recover");
  assert.equal(r.toolCalls.length, 1);
  const tc = r.toolCalls[0];
  assert.equal(tc.type, "function");
  assert.equal(tc.function.name, "buzz-dev-mcp__shell");
  assert.equal(tc.id, "toolu_01PollBanner2");
  assert.deepEqual(JSON.parse(tc.function.arguments), {
    command: "sleep 480",
    timeout_ms: 540000,
  });
  // Visible content keeps the prose, drops narration + delimiters.
  assert.equal(r.content, "No new commit yet after ~8 minutes. Polling again.");
  assert.ok(!r.content.includes("Assistant called tool"));
  assert.ok(!r.content.includes("<|close|>"));
});

test("handles args containing braces, escaped quotes and newlines", () => {
  const args = JSON.stringify({
    command: 'python3 -c "import sys; print(\\"a}\\")" && echo {x}',
    nested: { a: [1, 2, { b: "}" }] },
  });
  const text =
    "Working on it.\n\nAssistant called tool terminal (call_abc123) with arguments: " +
    args +
    DELIM;
  const r = recoverKimiToolCallNarration(text);
  assert.ok(r);
  assert.equal(r.toolCalls[0].function.name, "terminal");
  assert.equal(r.toolCalls[0].id, "call_abc123");
  assert.deepEqual(JSON.parse(r.toolCalls[0].function.arguments), JSON.parse(args));
  assert.equal(r.content, "Working on it.");
});

test("returns null when arguments JSON is truncated (unbalanced)", () => {
  const text =
    'Assistant called tool terminal (call_x) with arguments: {"command":"unterminated' + DELIM;
  assert.equal(recoverKimiToolCallNarration(text), null);
});

test("returns null when arguments are not valid JSON", () => {
  const text = "Assistant called tool terminal (call_x) with arguments: {not json}" + DELIM;
  assert.equal(recoverKimiToolCallNarration(text), null);
});

test("generates an id when narration placeholder is (unknown)", () => {
  const text =
    'Assistant called tool read_file ((unknown)) with arguments: {"path":"/tmp/a"}' + DELIM;
  const r = recoverKimiToolCallNarration(text);
  assert.ok(r);
  assert.match(r.toolCalls[0].id, /^call_/);
});

test("preserves residual non-delimiter tail content after the tool call", () => {
  const text =
    'Assistant called tool terminal (call_y) with arguments: {"command":"ls"}' +
    DELIM +
    "\nSome trailing prose.";
  const r = recoverKimiToolCallNarration(text);
  assert.ok(r);
  assert.equal(r.toolCalls.length, 1);
  assert.ok(r.content.includes("Some trailing prose."));
  assert.ok(!r.content.includes("<|close|>"));
});

test("does not fire when there is no narration marker (plain delimiter junk)", () => {
  const text = "some output " + "<|close|>" + "argument" + "<|sep|>";
  assert.equal(recoverKimiToolCallNarration(text), null);
});
