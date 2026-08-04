/**
 * Regression test for #3980 — Kiro (Responses API) streaming tool calls:
 * OmniRoute changed `finish_reason` from `tool_calls` to `stop`, breaking
 * agent workflows (Hermes). The terminal `messageStopEvent` hardcoded
 * `finish_reason: "stop"` even when the stream contained tool calls.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { convertKiroToOpenAI } = await import(
  "../../open-sse/translator/response/kiro-to-openai.ts"
);

test("#3980 streaming tool call → terminal finish_reason is 'tool_calls'", () => {
  const state: Record<string, unknown> = {};

  // 1. Kiro emits a tool-use event (mid-stream)
  const toolChunk = convertKiroToOpenAI(
    {
      _eventType: "toolUseEvent",
      toolUseEvent: { toolUseId: "call_1", name: "ping", input: { text: "hi" } },
    },
    state
  ) as { choices: { delta: Record<string, unknown>; finish_reason: unknown }[] };

  assert.ok(toolChunk?.choices?.[0]?.delta?.tool_calls, "tool_calls delta should be emitted");
  assert.equal(toolChunk.choices[0].finish_reason, null, "mid-stream finish_reason stays null");

  // 2. Kiro emits the terminal stop event
  const stopChunk = convertKiroToOpenAI({ _eventType: "messageStopEvent" }, state) as {
    choices: { finish_reason: unknown }[];
  };

  assert.equal(
    stopChunk.choices[0].finish_reason,
    "tool_calls",
    "terminal finish_reason must be 'tool_calls' when the stream produced tool calls"
  );
  assert.equal(
    state.finishReason,
    "tool_calls",
    "state.finishReason (used for usage injection) must also be 'tool_calls'"
  );
});

test("#3980 plain text stream → terminal finish_reason stays 'stop'", () => {
  const state: Record<string, unknown> = {};

  convertKiroToOpenAI(
    { _eventType: "assistantResponseEvent", assistantResponseEvent: { content: "hello" } },
    state
  );

  const stopChunk = convertKiroToOpenAI({ _eventType: "messageStopEvent" }, state) as {
    choices: { finish_reason: unknown }[];
  };

  assert.equal(
    stopChunk.choices[0].finish_reason,
    "stop",
    "no tool calls → terminal finish_reason remains 'stop'"
  );
  assert.equal(state.finishReason, "stop");
});
