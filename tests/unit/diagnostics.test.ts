/**
 * Tests for open-sse/utils/diagnostics.ts
 *
 * Covers:
 * (a) synthOpenAIErrorChunk — shape validation
 * (b) synthResponsesFailure — matches a response.failed event
 * (c) detectMalformedNonStream — empty/malformed input classified correctly
 * (d) no stack trace leakage in error chunk message
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  reportMalformed200,
  synthOpenAIErrorChunk,
  synthResponsesFailure,
  detectMalformedNonStream,
} from "../../open-sse/utils/diagnostics.ts";

// ── (a) synthOpenAIErrorChunk shape ──────────────────────────────────────────

test("synthOpenAIErrorChunk returns a valid SSE data line", () => {
  const line = synthOpenAIErrorChunk({
    provider: "testprovider",
    model: "gpt-test",
    reason: "empty_stream",
  });
  assert.match(line, /^data: /);
  assert.ok(line.endsWith("\n\n"), "must end with double newline");
});

test("synthOpenAIErrorChunk payload has expected OpenAI chunk shape", () => {
  const line = synthOpenAIErrorChunk({ provider: "myprovider", model: "mymodel", reason: "empty" });
  const payload = JSON.parse(line.slice("data: ".length).trimEnd());
  assert.equal(payload.object, "chat.completion.chunk");
  assert.ok(Array.isArray(payload.choices), "must have choices array");
  assert.equal(payload.choices.length, 1);
  assert.ok(payload.error, "must have error field");
  assert.equal(payload.error.type, "upstream_empty_response");
  assert.ok(typeof payload.error.message === "string" && payload.error.message.length > 0);
});

test("synthOpenAIErrorChunk references provider in message", () => {
  const line = synthOpenAIErrorChunk({
    provider: "mymysteriosprovider",
    model: "m",
    reason: "stall",
  });
  const payload = JSON.parse(line.slice("data: ".length).trimEnd());
  assert.ok(
    payload.error.message.includes("mymysteriosprovider"),
    `message should reference provider, got: ${payload.error.message}`
  );
});

// ── (b) synthResponsesFailure matches a response.failed event ────────────────

test("synthResponsesFailure produces a response.failed SSE event", () => {
  const sseText = synthResponsesFailure("empty_stream");
  assert.match(sseText, /event: response\.failed/);
  assert.match(sseText, /data: /);
});

test("synthResponsesFailure includes a reason in the data payload", () => {
  const sseText = synthResponsesFailure("no_terminal");
  // Extract JSON after "data: " line
  const dataLine = sseText.split("\n").find((l) => l.startsWith("data: "));
  assert.ok(dataLine, "must have a data line");
  const parsed = JSON.parse(dataLine.slice("data: ".length));
  assert.ok(
    parsed?.response?.error?.message?.length > 0,
    `response.error.message should be non-empty, got: ${JSON.stringify(parsed?.response?.error)}`
  );
});

// ── (c) detectMalformedNonStream ─────────────────────────────────────────────

test("detectMalformedNonStream returns 'empty_choices' for null input", () => {
  assert.equal(detectMalformedNonStream(null), "empty_choices");
});

test("detectMalformedNonStream returns 'empty_choices' for empty object", () => {
  assert.equal(detectMalformedNonStream({}), "empty_choices");
});

test("detectMalformedNonStream returns 'empty_choices' for choices:[]", () => {
  assert.equal(detectMalformedNonStream({ choices: [] }), "empty_choices");
});

test("detectMalformedNonStream returns 'empty_choices' when choice message has no content", () => {
  const body = {
    choices: [{ message: { content: "", tool_calls: null }, finish_reason: "stop" }],
  };
  assert.equal(detectMalformedNonStream(body), "empty_choices");
});

test("detectMalformedNonStream returns null for valid chat completion", () => {
  const body = {
    choices: [{ message: { content: "Hello!", tool_calls: null }, finish_reason: "stop" }],
  };
  assert.equal(detectMalformedNonStream(body), null);
});

test("detectMalformedNonStream returns null when tool_calls present", () => {
  const body = {
    choices: [
      {
        message: { content: null, tool_calls: [{ id: "call_1", type: "function" }] },
        finish_reason: "tool_calls",
      },
    ],
  };
  assert.equal(detectMalformedNonStream(body), null);
});

test("detectMalformedNonStream returns null when reasoning_content present (reasoning-only)", () => {
  const body = {
    choices: [
      {
        message: { content: "", reasoning_content: "some reasoning text", tool_calls: null },
        finish_reason: "stop",
      },
    ],
  };
  assert.equal(detectMalformedNonStream(body), null);
});

test("detectMalformedNonStream returns 'empty_choices' for Responses API with empty output", () => {
  const body = { object: "response", output: [], status: "completed" };
  assert.equal(detectMalformedNonStream(body), "empty_choices");
});

test("detectMalformedNonStream returns null for Responses API with text output", () => {
  const body = {
    object: "response",
    status: "completed",
    output: [
      {
        type: "message",
        content: [{ type: "output_text", text: "Hello there!" }],
      },
    ],
  };
  assert.equal(detectMalformedNonStream(body), null);
});

test("detectMalformedNonStream returns 'no_terminal' for Responses API with failed status", () => {
  const body = {
    object: "response",
    status: "failed",
    output: [
      {
        type: "message",
        content: [{ type: "output_text", text: "Some text" }],
      },
    ],
  };
  assert.equal(detectMalformedNonStream(body), "no_terminal");
});

test("detectMalformedNonStream allows Responses API function_call items as valid output", () => {
  const body = {
    object: "response",
    status: "completed",
    output: [{ type: "function_call", name: "search", arguments: "{}" }],
  };
  assert.equal(detectMalformedNonStream(body), null);
});

// ── (c2) detectMalformedNonStream — native Anthropic Messages shape ──────────
// claude→claude responses are not translated, so the body stays in Anthropic
// shape ({ type:"message", content:[…] }) with no top-level `choices`.

test("detectMalformedNonStream returns null for Anthropic text response", () => {
  const body = {
    type: "message",
    role: "assistant",
    content: [{ type: "text", text: "git status" }],
    stop_reason: "end_turn",
  };
  assert.equal(detectMalformedNonStream(body), null);
});

test("detectMalformedNonStream returns null for Anthropic tool_use response", () => {
  const body = {
    type: "message",
    role: "assistant",
    content: [{ type: "tool_use", id: "toolu_1", name: "get_weather", input: { city: "Paris" } }],
    stop_reason: "tool_use",
  };
  assert.equal(detectMalformedNonStream(body), null);
});

test("detectMalformedNonStream returns null for Anthropic thinking-only response (regression)", () => {
  // A reasoning model can return a thinking block whose text is empty but which
  // carries a valid signature. This is a valid completion, not a 502 — it is
  // exactly what Claude Code's non-streaming Bash command classifier hits.
  const body = {
    type: "message",
    role: "assistant",
    content: [{ type: "thinking", thinking: "", signature: "EoACCmMIDxgC…" }],
    stop_reason: "end_turn",
  };
  assert.equal(detectMalformedNonStream(body), null);
});

test("detectMalformedNonStream allows empty Anthropic content with a terminal stop_reason", () => {
  const body = { type: "message", role: "assistant", content: [], stop_reason: "max_tokens" };
  assert.equal(detectMalformedNonStream(body), null);
});

test("detectMalformedNonStream flags empty Anthropic content with no terminal stop_reason", () => {
  const body = { type: "message", role: "assistant", content: [], stop_reason: null };
  assert.equal(detectMalformedNonStream(body), "empty_choices");
});

// ── (d) no stack trace leakage ───────────────────────────────────────────────

test("synthOpenAIErrorChunk message does NOT contain stack trace path", () => {
  const line = synthOpenAIErrorChunk({ provider: "p", model: "m", reason: "empty_stream" });
  const payload = JSON.parse(line.slice("data: ".length).trimEnd());
  const msg = payload.error.message as string;
  assert.ok(
    !msg.includes("at /"),
    `error.message must not contain stack trace patterns, got: ${msg}`
  );
});

test("reportMalformed200 runs without throwing", () => {
  // smoke: it only logs, should not throw
  assert.doesNotThrow(() =>
    reportMalformed200({
      mode: "nonstream",
      provider: "testprov",
      model: "testmodel",
      connectionId: "conn-123",
      reason: "empty_choices",
      recvBytes: 42,
      recvLines: -1,
      emitted: -1,
      events: { "response.completed": 1 },
      ttftMs: 100,
      elapsedMs: 200,
    })
  );
});
