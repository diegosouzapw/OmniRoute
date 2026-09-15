/**
 * Tests for kimiToolCallNarration.ts — recovers structured tool calls from
 * Kimi models that mimic flattenMessages' "Assistant called tool ..." history
 * narration and append native closing delimiters, instead of emitting a
 * native Cursor tool call.
 *
 * Follow-up (2026-09-15): also covers the streaming narration scrubber and
 * the tool-result dialects ("Tool result (…): …", "User: <tool_result>…")
 * observed leaking in production.
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  recoverKimiToolCallNarration,
  createNarrationStreamScrubber,
  scrubKimiNarrationText,
  applyKimiToolCallRecovery,
} from "../../open-sse/utils/kimiToolCallNarration.ts";

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

// ─── Streaming scrubber ──────────────────────────────────────────────────────

test("streaming: passes plain prose through verbatim", () => {
  const s = createNarrationStreamScrubber();
  const out = s.feed("Hello world, this is a normal sentence.\n") + s.finish();
  assert.equal(out, "Hello world, this is a normal sentence.\n");
});

test("streaming: holds back and drops a full narration + delimiter tail", () => {
  const s = createNarrationStreamScrubber();
  let out = s.feed("Prose before.\n\n");
  out += s.feed("Assistant called tool terminal (call_1) with arguments: ");
  out += s.feed('{"command":"ls -la"}');
  out += s.feed(DELIM);
  out += s.feed("\nProse after.");
  out += s.finish();
  assert.equal(out, "Prose before.\n\nProse after.");
});

test("streaming: surfaces narrated call via onToolCall callback", () => {
  const calls: Array<{ id: string; name: string; args: string }> = [];
  const s = createNarrationStreamScrubber((tc) =>
    calls.push({ id: tc.id, name: tc.function.name, args: tc.function.arguments })
  );
  s.feed("Assistant called tool terminal (call_9) with arguments: ");
  s.feed('{"command":"pwd"}');
  s.feed(DELIM);
  s.finish();
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "terminal");
  assert.equal(calls[0].id, "call_9");
  assert.deepEqual(JSON.parse(calls[0].args), { command: "pwd" });
});

test("streaming: narration split across many tiny deltas is fully held back", () => {
  const s = createNarrationStreamScrubber();
  const full =
    "Intro.\n\nAssistant called tool terminal (call_2) with arguments: {\"code\":\"print(1)\"}" +
    DELIM +
    "\nDone.";
  let out = "";
  for (const ch of full) out += s.feed(ch);
  out += s.finish();
  // Prose preserved in order; no dialect remains. (Exact blank-line count
  // around a dropped construct is unspecified.)
  assert.ok(out.startsWith("Intro."));
  assert.ok(out.includes("Done."));
  assert.ok(!out.includes("Assistant called tool"));
  assert.ok(!out.includes("<|close|>"));
  assert.ok(!out.includes("print(1)"));
});

test("streaming: char-by-char narration also fires onToolCall", () => {
  const calls: unknown[] = [];
  const s = createNarrationStreamScrubber(() => calls.push(1));
  const full =
    'Assistant called tool execute_code (call_3) with arguments: {"code":"x=1"}' + DELIM;
  for (const ch of full) s.feed(ch);
  s.finish();
  assert.equal(calls.length, 1);
});

test("streaming: drops Tool result (…) line", () => {
  const s = createNarrationStreamScrubber();
  let out = s.feed("Before.\n");
  out += s.feed("Tool result (call_verify_gw_npm): \n");
  out += s.feed("After.");
  out += s.finish();
  assert.equal(out, "Before.\nAfter.");
});

test("streaming: drops User: <tool_result> XML block", () => {
  const s = createNarrationStreamScrubber();
  let out = s.feed("Before.\n\n");
  out += s.feed("User: <tool_result>\n");
  out += s.feed("<tool_name>execute_code</tool_name>\n");
  out += s.feed("<tool_call_id>call_verify_gw_npm</tool_call_id>\n");
  out += s.feed('<result>{"status": "success", "output": "ok"}</result>\n');
  out += s.feed("</tool_result>\n");
  out += s.feed("After.");
  out += s.finish();
  assert.equal(out, "Before.\n\nAfter.");
});

test("streaming: plain 'User:' prose is NOT dropped", () => {
  const s = createNarrationStreamScrubber();
  let out = s.feed("The model wrote User: hello there.\n");
  out += s.finish();
  assert.equal(out, "The model wrote User: hello there.\n");
});

test("streaming: 'User:' followed by unrelated text is kept verbatim", () => {
  const s = createNarrationStreamScrubber();
  let out = s.feed("User: what is going on?\n");
  out += s.finish();
  assert.equal(out, "User: what is going on?\n");
});

test("streaming: prose line that merely starts with 'Assistant called tool' is kept", () => {
  const s = createNarrationStreamScrubber();
  let out = s.feed("Assistant called tool is a phrase models imitate.\nNext line.\n");
  out += s.finish();
  assert.equal(out, "Assistant called tool is a phrase models imitate.\nNext line.\n");
});

test("streaming: partial trigger at EOF flushes as prose", () => {
  const s = createNarrationStreamScrubber();
  let out = s.feed("Trailing text Assistant called");
  out += s.finish();
  assert.equal(out, "Trailing text Assistant called");
});

test("streaming: truncated narration JSON at EOF is dropped", () => {
  const s = createNarrationStreamScrubber();
  let out = s.feed("Prose.\nAssistant called tool terminal (call_t) with arguments: ");
  out += s.feed('{"command":"never');
  out += s.finish();
  assert.equal(out, "Prose.\n");
});

test("streaming: truncated <tool_result> block at EOF is dropped", () => {
  const s = createNarrationStreamScrubber();
  let out = s.feed("Prose.\nUser: <tool_result>\n<tool_name>x</tool_name>\n");
  out += s.finish();
  assert.equal(out, "Prose.\n");
});

test("streaming: recovered call from truncated-then-completed narration", () => {
  // Narration arriving in awkward split: head marker split across feeds.
  const s = createNarrationStreamScrubber();
  let out = s.feed("A.\nAssistant called");
  out += s.feed(" tool terminal (call_z) with arguments: ");
  out += s.feed('{"a":');
  out += s.feed('1}');
  out += s.feed("<|close|>argument<|sep|>");
  out += s.finish();
  assert.equal(out, "A.\n");
});

test("batch scrub removes every dialect from the production leak specimen", () => {
  // Shape taken from the 2026-09-15 production leak (message id 1488693):
  // prose + narration + delimiters + narration again (no delimiters) +
  // "Tool result (…):" line + "User: <tool_result>…" block.
  const specimen =
    "WAL checkpointed — 64MB → 0B. Verifying the gateway.\n\n" +
    "Assistant called tool execute_code (call_verify_gw_npm) with arguments: " +
    '{"code":"print(1)"}' +
    DELIM +
    "\n\n" +
    "Assistant called tool execute_code (call_verify_gw_npm) with arguments: " +
    '{"code":"print(2)"}' +
    "\n\n" +
    "Tool result (call_verify_gw_npm): \n\n" +
    "User: <tool_result>\n" +
    "<tool_name>execute_code</tool_name>\n" +
    "<tool_call_id>call_verify_gw_npm</tool_call_id>\n" +
    '<result>{"status": "success", "output": "$ health attempt 1"}</result>\n' +
    "</tool_result>\n";

  const r = scrubKimiNarrationText(specimen);
  assert.ok(r.changed);
  assert.ok(r.content.startsWith("WAL checkpointed — 64MB → 0B. Verifying the gateway."));
  assert.ok(!r.content.includes("Assistant called tool"));
  assert.ok(!r.content.includes("Tool result ("));
  assert.ok(!r.content.includes("<tool_result>"));
  assert.ok(!r.content.includes("<tool_name>"));
  assert.ok(!r.content.includes("User:"));
  assert.ok(!r.content.includes("<|close|>"));
  assert.ok(!r.content.includes("print(1)"));
  assert.ok(!r.content.includes("print(2)"));
  assert.ok(!r.content.includes("health attempt"));
});

test("batch scrub leaves clean text unchanged", () => {
  const r = scrubKimiNarrationText("Just a normal assistant reply.\nSecond line.");
  assert.equal(r.content, "Just a normal assistant reply.\nSecond line.");
  assert.equal(r.changed, false);
});

// ─── applyKimiToolCallRecovery: gating fix ───────────────────────────────────

test("recovery: scrub now runs even when structured tool calls exist", () => {
  // The production gating hole: a real structured call AND narration text in
  // the same turn. Previously returned early (toolCalls non-empty) and leaked.
  const ctx = {
    totalText:
      "Done. WAL is clean.\n\n" +
      "Assistant called tool execute_code (call_a) with arguments: " +
      '{"code":"x"}' +
      DELIM,
    toolCalls: [{ id: "call_real", name: "terminal", argumentsJson: '{"command":"ls"}' }],
    emittedToolCallIndex: 1,
  };
  const before = ctx.toolCalls.length;
  const recovered = applyKimiToolCallRecovery(ctx);
  assert.equal(recovered, false); // no NEW calls synthesized
  assert.equal(ctx.toolCalls.length, before); // existing call untouched
  assert.ok(ctx.totalText.startsWith("Done. WAL is clean."));
  assert.ok(!ctx.totalText.includes("Assistant called tool"));
  assert.ok(!ctx.totalText.includes("<|close|>"));
});

test("recovery: still synthesizes a call when none structured existed", () => {
  const ctx = {
    totalText:
      'Working.\nAssistant called tool terminal (call_b) with arguments: {"command":"ls"}' +
      DELIM,
    toolCalls: [],
    emittedToolCallIndex: 0,
  };
  const emitted: unknown[] = [];
  const ok = applyKimiToolCallRecovery(ctx, (c) => emitted.push(c));
  assert.equal(ok, true);
  assert.equal(ctx.toolCalls.length, 1);
  assert.equal(ctx.toolCalls[0].id, "call_b");
  assert.equal(emitted.length, 1);
  assert.equal(ctx.totalText, "Working.");
});

test("recovery: empty text returns false, no crash", () => {
  const ctx = { totalText: "", toolCalls: [], emittedToolCallIndex: 0 };
  assert.equal(applyKimiToolCallRecovery(ctx), false);
});
