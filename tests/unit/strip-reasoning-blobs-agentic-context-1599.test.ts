import test from "node:test";
import assert from "node:assert/strict";

import { stripStoredItemReferences } from "../../open-sse/executors/codex.ts";
import { filterToOpenAIFormat } from "../../open-sse/translator/helpers/openaiHelper.ts";

// Port of decolua/9router#1599 — strip reasoning blobs from agentic context to
// prevent O(n^2) token growth across turns.
//
// (1) codex.ts stripStoredItemReferences: object items of type "reasoning"
//     (encrypted_content) are unusable with store=false (previous_response_id is
//     deleted) and must be dropped from the Responses `input` array.
// (2) openaiHelper.ts filterToOpenAIFormat: assistant+tool_calls messages must
//     have `reasoning_content` stripped instead of being returned as-is.

test("stripStoredItemReferences drops object items with type=reasoning", () => {
  const body: Record<string, unknown> = {
    input: [
      { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
      { id: "rs_abc123", type: "reasoning", summary: [{ text: "thinking..." }] },
      { type: "reasoning", encrypted_content: "blob" },
      {
        type: "function_call",
        id: "fc_xyz789",
        name: "search",
        arguments: "{}",
        call_id: "call_1",
      },
    ],
  };

  stripStoredItemReferences(body);

  const input = body.input as Array<Record<string, unknown>>;
  // Both reasoning items must be gone.
  assert.equal(
    input.some((it) => it && it.type === "reasoning"),
    false,
    "reasoning items must be stripped"
  );
  // Non-reasoning items survive (message + function_call), id is sanitized.
  assert.equal(input.length, 2);
  assert.equal(input[0].type, "message");
  assert.equal(input[1].type, "function_call");
  assert.equal(input[1].id, undefined, "fc_ server id stripped, item kept");
});

test("filterToOpenAIFormat strips reasoning_content from assistant+tool_calls messages", () => {
  const body = {
    messages: [
      {
        role: "assistant",
        reasoning_content: "long chain of thought that inflates context",
        tool_calls: [{ id: "call_1", type: "function", function: { name: "f", arguments: "{}" } }],
      },
    ],
  };

  const result = filterToOpenAIFormat(body) as { messages: Array<Record<string, unknown>> };
  const msg = result.messages[0];

  assert.equal(msg.reasoning_content, undefined, "reasoning_content must be dropped");
  assert.ok(Array.isArray(msg.tool_calls), "tool_calls preserved");
  assert.equal((msg.tool_calls as unknown[]).length, 1);
  assert.equal(msg.role, "assistant");
});

test("filterToOpenAIFormat keeps assistant+tool_calls untouched when no reasoning_content", () => {
  const body = {
    messages: [
      {
        role: "assistant",
        content: null,
        tool_calls: [{ id: "call_1", type: "function", function: { name: "f", arguments: "{}" } }],
      },
    ],
  };

  const result = filterToOpenAIFormat(body) as { messages: Array<Record<string, unknown>> };
  assert.deepEqual(result.messages[0], body.messages[0]);
});
