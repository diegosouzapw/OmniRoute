// Regression test for issue #5123 — </think> leaks as delta.content before tool_calls
// in Claude→OpenAI streaming translation, corrupting OpenAI-compatible clients (Kimi Coding).
//
// Root cause: content_block_stop for a thinking block unconditionally emitted
// createChunk(state, { content: "</think>" }) even when the next block was tool_use.
//
// Fix: defer </think> emission. Only flush when the next event is a text_delta
// (preserving the #4633 behavior for Claude Code / Cursor) or at message finish
// when there are no tool_calls.

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

function collectChunks(results: ReturnType<typeof claudeToOpenAIResponse>[]): unknown[] {
  return results.flatMap((r) => (Array.isArray(r) ? r : r ? [r] : []));
}

// ─── Case (a): thinking block followed by tool_use ───────────────────────────
// This is the regression case. Before the fix, </think> appears as a spurious
// assistant text chunk right before the tool_calls delta, corrupting clients.
test("thinking block followed by tool_use: </think> must NOT appear in any content chunk", () => {
  const state = newState();

  const allResults: ReturnType<typeof claudeToOpenAIResponse>[] = [];

  // message_start
  allResults.push(
    claudeToOpenAIResponse({ type: "message_start", message: { id: "msg_1", model: "claude-3-7-sonnet" } }, state)
  );

  // thinking block open
  allResults.push(
    claudeToOpenAIResponse(
      { type: "content_block_start", index: 0, content_block: { type: "thinking", thinking: "" } },
      state
    )
  );

  // thinking delta
  allResults.push(
    claudeToOpenAIResponse(
      { type: "content_block_delta", index: 0, delta: { type: "thinking_delta", thinking: "Let me think..." } },
      state
    )
  );

  // thinking block stop — currently emits </think> unconditionally (the bug)
  allResults.push(claudeToOpenAIResponse({ type: "content_block_stop", index: 0 }, state));

  // tool_use block open
  allResults.push(
    claudeToOpenAIResponse(
      {
        type: "content_block_start",
        index: 1,
        content_block: { type: "tool_use", id: "toolu_01", name: "get_weather" },
      },
      state
    )
  );

  // tool arguments delta
  allResults.push(
    claudeToOpenAIResponse(
      { type: "content_block_delta", index: 1, delta: { type: "input_json_delta", partial_json: '{"city":"Paris"}' } },
      state
    )
  );

  // tool_use block stop
  allResults.push(claudeToOpenAIResponse({ type: "content_block_stop", index: 1 }, state));

  // message_delta with stop_reason=tool_use
  allResults.push(
    claudeToOpenAIResponse(
      { type: "message_delta", delta: { stop_reason: "tool_use" }, usage: { output_tokens: 42 } },
      state
    )
  );

  const chunks = collectChunks(allResults);

  const spuriousThinkClose = chunks.filter(
    (chunk: any) => chunk?.choices?.[0]?.delta?.content === "</think>"
  );

  assert.equal(
    spuriousThinkClose.length,
    0,
    `Expected NO chunk with delta.content === "</think>" before tool_calls, but found ${spuriousThinkClose.length}:\n${JSON.stringify(spuriousThinkClose, null, 2)}`
  );
});

// ─── Case (b): thinking block followed by text (pure-text response) ──────────
// This is the #4633 happy path. </think> MUST still be emitted so Claude Code /
// Cursor know when the thinking section ends.
test("thinking block followed by text: </think> IS still emitted (preserves #4633)", () => {
  const state = newState();

  const allResults: ReturnType<typeof claudeToOpenAIResponse>[] = [];

  // message_start
  allResults.push(
    claudeToOpenAIResponse({ type: "message_start", message: { id: "msg_2", model: "claude-3-7-sonnet" } }, state)
  );

  // thinking block open
  allResults.push(
    claudeToOpenAIResponse(
      { type: "content_block_start", index: 0, content_block: { type: "thinking", thinking: "" } },
      state
    )
  );

  // thinking delta
  allResults.push(
    claudeToOpenAIResponse(
      { type: "content_block_delta", index: 0, delta: { type: "thinking_delta", thinking: "Plan..." } },
      state
    )
  );

  // thinking block stop
  allResults.push(claudeToOpenAIResponse({ type: "content_block_stop", index: 0 }, state));

  // text block open
  allResults.push(
    claudeToOpenAIResponse(
      { type: "content_block_start", index: 1, content_block: { type: "text", text: "" } },
      state
    )
  );

  // text delta (this should trigger the deferred </think> flush)
  allResults.push(
    claudeToOpenAIResponse(
      { type: "content_block_delta", index: 1, delta: { type: "text_delta", text: "Hello!" } },
      state
    )
  );

  // text block stop
  allResults.push(claudeToOpenAIResponse({ type: "content_block_stop", index: 1 }, state));

  // message_delta with stop_reason=end_turn
  allResults.push(
    claudeToOpenAIResponse(
      { type: "message_delta", delta: { stop_reason: "end_turn" }, usage: { output_tokens: 10 } },
      state
    )
  );

  const chunks = collectChunks(allResults);

  const hasThinkClose = chunks.some(
    (chunk: any) => chunk?.choices?.[0]?.delta?.content === "</think>"
  );

  assert.ok(
    hasThinkClose,
    `Expected a chunk with delta.content === "</think>" in a pure-text thinking response, but none found.\nAll chunks: ${JSON.stringify(chunks, null, 2)}`
  );
});
