import { test } from "node:test";
import assert from "node:assert/strict";
import { applyLiteCompression } from "../../open-sse/services/compression/lite.ts";

// Issue #13429: lite compression's redundant-remove step collapses consecutive
// role:"tool" messages with identical content WITHOUT consulting tool_call_id.
// When two tool results are byte-identical (e.g. both empty strings), the
// second is dropped, orphaning one of the assistant message's tool_call_ids.
// Strict upstream validators (DeepSeek-class) then reject the request with
// "insufficient tool messages".
test("issue #13429: redundant-remove must not drop a tool message that has a distinct tool_call_id", () => {
  const body = {
    model: "test-model",
    messages: [
      {
        role: "assistant",
        content: "t",
        tool_calls: [
          { id: "c1", type: "function", function: { name: "f", arguments: "{}" } },
          { id: "c2", type: "function", function: { name: "g", arguments: "{}" } },
        ],
      },
      { role: "tool", tool_call_id: "c1", content: "" },
      { role: "tool", tool_call_id: "c2", content: "" },
    ],
  };

  const result = applyLiteCompression(body);
  const messages = (result.body as { messages: Array<Record<string, unknown>> }).messages;

  const toolMessages = messages.filter((m) => m.role === "tool");
  const toolCallIds = toolMessages.map((m) => m.tool_call_id);

  assert.equal(
    toolMessages.length,
    2,
    `expected 2 tool messages to survive redundant-remove, got ${toolMessages.length} (techniques: ${JSON.stringify(
      result.stats?.techniquesUsed ?? []
    )})`
  );
  assert.deepEqual(new Set(toolCallIds), new Set(["c1", "c2"]));
});

// Compound arm: compressToolResults truncates long tool content to a shared
// 2000-char prefix BEFORE redundant-remove runs, so two results that started
// distinct can still collide into the same string. Both must still survive.
test("issue #13429: tool messages that collide only after truncation must both survive", () => {
  const longA = "A".repeat(2500);
  const longB = "A".repeat(2000) + "B".repeat(500);
  const body = {
    model: "test-model",
    messages: [
      {
        role: "assistant",
        content: "t",
        tool_calls: [
          { id: "c1", type: "function", function: { name: "f", arguments: "{}" } },
          { id: "c2", type: "function", function: { name: "g", arguments: "{}" } },
        ],
      },
      { role: "tool", tool_call_id: "c1", content: longA },
      { role: "tool", tool_call_id: "c2", content: longB },
    ],
  };

  const result = applyLiteCompression(body);
  const messages = (result.body as { messages: Array<Record<string, unknown>> }).messages;

  const toolMessages = messages.filter((m) => m.role === "tool");
  const toolCallIds = toolMessages.map((m) => m.tool_call_id);

  assert.equal(
    toolMessages.length,
    2,
    "both tool messages must survive despite truncated collision"
  );
  assert.deepEqual(new Set(toolCallIds), new Set(["c1", "c2"]));
});

// Non-regression: redundant-remove must still collapse adjacent identical
// non-tool messages (e.g. duplicate user turns) — the fix is scoped to the
// "tool" role only, not a blanket disable of the technique.
test("issue #13429: redundant-remove still collapses adjacent identical user messages", () => {
  const body = {
    model: "test-model",
    messages: [
      { role: "user", content: "same text" },
      { role: "user", content: "same text" },
    ],
  };

  const result = applyLiteCompression(body);
  const messages = (result.body as { messages: Array<Record<string, unknown>> }).messages;

  assert.equal(messages.length, 1, "duplicate non-tool messages should still be collapsed");
});
