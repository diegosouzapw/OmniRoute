import test from "node:test";
import assert from "node:assert/strict";

import { applyResponsesInputPolicy } from "../../open-sse/services/responsesInputPolicy.ts";
import { filterToOpenAIFormat } from "../../open-sse/translator/helpers/openaiHelper.ts";

// Port of decolua/9router#1599 — strip unusable reasoning blobs from agentic
// context to prevent O(n^2) token growth across turns. Encrypted reasoning is
// self-contained and may be replayed only through an explicit connection opt-in.

test("applyResponsesInputPolicy drops object items with type=reasoning", () => {
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

  applyResponsesInputPolicy(body);

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

test("selected connection policy preserves encrypted reasoning input", () => {
  const body: Record<string, unknown> = {
    input: [
      {
        id: "rs_encrypted123",
        type: "reasoning",
        encrypted_content: "encrypted-blob",
        summary: [{ type: "summary_text", text: "safe summary" }],
      },
      { type: "message", role: "user", content: [{ type: "input_text", text: "continue" }] },
    ],
  };

  applyResponsesInputPolicy(body, true);

  assert.deepEqual(body.input, [
    {
      type: "reasoning",
      encrypted_content: "encrypted-blob",
      summary: [{ type: "summary_text", text: "safe summary" }],
    },
    { type: "message", role: "user", content: [{ type: "input_text", text: "continue" }] },
  ]);
});

test("preserving encrypted reasoning still removes stored references", () => {
  const body: Record<string, unknown> = {
    input: [
      { id: "rs_encrypted123", type: "reasoning", encrypted_content: "encrypted-blob" },
      "rs_stored123",
      { type: "item_reference", id: "resp_stored123" },
      { type: "function_call", id: "fc_stored123", call_id: "call_1" },
    ],
  };

  applyResponsesInputPolicy(body, true);

  assert.deepEqual(body.input, [
    { type: "reasoning", encrypted_content: "encrypted-blob" },
    { type: "function_call", call_id: "call_1" },
  ]);
});

test("applyResponsesInputPolicy still drops summary-only reasoning when enabled", () => {
  const body: Record<string, unknown> = {
    input: [
      { id: "rs_summary123", type: "reasoning", summary: [{ text: "thinking..." }] },
      { type: "reasoning", encrypted_content: "" },
      { type: "reasoning", encrypted_content: 42 },
      { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
    ],
  };

  applyResponsesInputPolicy(body, true);

  assert.deepEqual(body.input, [
    { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
  ]);
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
