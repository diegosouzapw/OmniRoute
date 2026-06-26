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
// The fix emits a `content: "</think>"` chunk on close — matching the convention
// already used throughout OmniRoute (see openai-responses.ts / responsesTransformer.ts
// which split on `</think>` to separate reasoning from final content).

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

test("claudeToOpenAIResponse emits </think> close marker on thinking content_block_stop", () => {
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

  // Close the thinking block.
  const closeChunks = claudeToOpenAIResponse(
    { type: "content_block_stop", index: 0 },
    state
  );

  assert.ok(Array.isArray(closeChunks), "stop event must return an array of chunks");
  assert.ok(
    closeChunks.length >= 1,
    "stop event for thinking block must emit at least one close-marker chunk"
  );

  const hasCloseMarker = closeChunks.some(
    (chunk) => chunk?.choices?.[0]?.delta?.content === "</think>"
  );
  assert.ok(
    hasCloseMarker,
    `expected a chunk with delta.content === "</think>"; got ${JSON.stringify(closeChunks)}`
  );

  // After close, state flag must be cleared so subsequent thinking blocks are tracked correctly.
  assert.equal(state.inThinkingBlock, false);
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
