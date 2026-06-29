// Regression test for the Anthropic-compatible stream "thinking block never closes" bug.
//
// When clients consume the OpenAI-compatible stream that OmniRoute synthesises from
// Claude-native SSE, they need an explicit signal that the thinking/reasoning section
// has ended; otherwise the UI stays stuck on the "thinking" indicator even after the
// upstream stream has cleanly completed.
//
// Inspired by upstream decolua/9router PR #454.
//
// Before the fix, the `content_block_stop` event for a thinking block emitted NO
// terminating chunk at all (a previous drift had emitted `reasoning_content: ""`,
// which is semantically a no-op and does not signal "thinking complete" to clients
// such as Claude Code).
//
// PR #4633 added an immediate `content: "</think>"` chunk on close.
//
// PR #5123 refined this to DEFERRED emission: instead of emitting at content_block_stop
// (which caused the marker to leak before tool_calls in tool-use streams), the marker is
// now queued and flushed either:
//   • at the first text_delta that follows (preserving #4633 for Claude Code / Cursor), or
//   • at message_delta finish when there are no tool_calls (pure thinking-only responses).
// This test covers the message_delta flush path (thinking block with no subsequent text).

import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIResponse } = await import(
  "../../open-sse/translator/response/claude-to-openai.ts"
);

function newState() {
  return {
    toolCalls: new Map(),
    toolNameMap: new Map(),
    messageId: "msg_test",
    model: "claude-3-7-sonnet",
    toolCallIndex: 0,
  };
}

test("claudeToOpenAIResponse emits </think> close marker on message finish (deferred from content_block_stop)", () => {
  const state = newState();

  // Open thinking block.
  claudeToOpenAIResponse(
    {
      type: "content_block_start",
      index: 0,
      content_block: { type: "thinking", thinking: "" },
    },
    state
  );

  // Stream reasoning delta.
  claudeToOpenAIResponse(
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "thinking_delta", thinking: "Plan first." },
    },
    state
  );

  // Close the thinking block — marker is now DEFERRED (not emitted here).
  const closeChunks = claudeToOpenAIResponse(
    { type: "content_block_stop", index: 0 },
    state
  );
  // content_block_stop for a thinking block no longer emits </think> immediately
  // (the marker is deferred to prevent leaking before tool_calls — see #5123).
  const immediateClose = Array.isArray(closeChunks) ? closeChunks : [];
  const hasImmediateMarker = immediateClose.some(
    (chunk) => chunk?.choices?.[0]?.delta?.content === "</think>"
  );
  assert.equal(
    hasImmediateMarker,
    false,
    "content_block_stop must NOT emit </think> immediately (deferred — see #5123)"
  );

  // After close, the thinking-block flag is cleared and the pending marker is queued.
  assert.equal(state.inThinkingBlock, false);
  assert.equal(state.pendingThinkClose, true, "pendingThinkClose must be set after thinking block stop");

  // message_delta with stop_reason=end_turn and no tool_calls → marker must be flushed here.
  const finishChunks = claudeToOpenAIResponse(
    { type: "message_delta", delta: { stop_reason: "end_turn" }, usage: { output_tokens: 5 } },
    state
  );

  const arr = Array.isArray(finishChunks) ? finishChunks : [];
  const hasCloseMarker = arr.some(
    (chunk) => chunk?.choices?.[0]?.delta?.content === "</think>"
  );
  assert.ok(
    hasCloseMarker,
    `expected a chunk with delta.content === "</think>" in message_delta result; got ${JSON.stringify(arr)}`
  );

  // pendingThinkClose must be cleared after flush.
  assert.equal(state.pendingThinkClose, false, "pendingThinkClose must be cleared after flush");
});

test("claudeToOpenAIResponse does not emit </think> on stop of non-thinking blocks", () => {
  const state = newState();

  // Open + immediately close a text block — must NOT inject </think>.
  claudeToOpenAIResponse(
    {
      type: "content_block_start",
      index: 0,
      content_block: { type: "text", text: "" },
    },
    state
  );
  const closeChunks = claudeToOpenAIResponse(
    { type: "content_block_stop", index: 0 },
    state
  );

  const arr = Array.isArray(closeChunks) ? closeChunks : [];
  const hasCloseMarker = arr.some(
    (chunk) => chunk?.choices?.[0]?.delta?.content === "</think>"
  );
  assert.equal(
    hasCloseMarker,
    false,
    "text-block close must not emit </think> sentinel"
  );
});
