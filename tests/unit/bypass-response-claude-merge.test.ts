import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { mergeChunksToResponse } from "../../open-sse/utils/bypassResponse.ts";

/**
 * Regression guard for the Claude-format non-streaming bypass response bug:
 * mergeChunksToResponse() used to return `messageStart.message` as-is, which
 * the openai-to-claude translator always initializes with `content: []` —
 * the actual text only exists in the separate content_block_start/delta
 * events. A synthetic (non-streaming) Claude-format bypass response
 * therefore always came back with an empty `content` array, silently
 * dropping the bypass text ("CLI Command Execution: Clear Terminal", etc.)
 * from every Claude-format client (e.g. the Claude Code CLI).
 */
describe("mergeChunksToResponse (Claude format content reconstruction)", () => {
  const chunks = [
    {
      type: "message_start",
      message: {
        id: "msg_1",
        type: "message",
        role: "assistant",
        model: "demo",
        content: [],
        stop_reason: null,
        stop_sequence: null,
        usage: { input_tokens: 1, cache_read_input_tokens: 2 },
      },
    },
    { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "hello world" } },
    { type: "content_block_stop", index: 0 },
    {
      type: "message_delta",
      delta: { stop_reason: "end_turn", stop_sequence: null },
      usage: { output_tokens: 3 },
    },
    { type: "message_stop" },
  ];

  it("reconstructs the message content from content_block_start/delta chunks", () => {
    const result = mergeChunksToResponse(chunks, "claude") as Record<string, unknown>;

    assert.equal(result.type, "message");
    assert.equal(result.role, "assistant");
    assert.deepEqual(result.content, [{ type: "text", text: "hello world" }]);
  });

  it("merges start + delta usage and carries the final stop_reason", () => {
    const result = mergeChunksToResponse(chunks, "claude") as Record<string, unknown>;

    assert.equal(result.stop_reason, "end_turn");
    assert.deepEqual(result.usage, {
      input_tokens: 1,
      cache_read_input_tokens: 2,
      output_tokens: 3,
    });
  });

  it("falls back to the last chunk untouched for non-Claude formats", () => {
    const openaiChunks = [{ type: "chat.completion.chunk", choices: [] }];
    assert.equal(mergeChunksToResponse(openaiChunks, "openai"), openaiChunks[0]);
  });

  it("falls back to a canned unknown response for an empty chunk list", () => {
    const result = mergeChunksToResponse([], "claude") as {
      model: string;
      choices: Array<{ message: { role: string } }>;
    };
    assert.equal(result.model, "unknown");
    assert.equal(result.choices[0].message.role, "assistant");
  });
});
