import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } = await import(
  "../../open-sse/translator/request/openai-to-claude.ts"
);

test("tool-only assistant message with content:null does not produce empty content block", () => {
  const input = {
    model: "claude-opus-4-5",
    messages: [
      { role: "user", content: "What is 2+2?" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_abc",
            type: "function",
            function: { name: "calculator", arguments: '{"a":2,"b":2}' },
          },
        ],
      },
      {
        role: "tool",
        tool_call_id: "call_abc",
        content: "4",
      },
    ],
  };

  const result = openaiToClaudeRequest("claude-opus-4-5", input, false);

  const assistantMsg = result.messages?.find((m) => m.role === "assistant");
  assert.ok(assistantMsg, "should have an assistant message");

  // Content should not contain an empty text block
  if (Array.isArray(assistantMsg.content)) {
    const emptyTextBlocks = assistantMsg.content.filter(
      (b) => b.type === "text" && (b.text === "" || b.text === null || b.text === undefined),
    );
    assert.equal(
      emptyTextBlocks.length,
      0,
      `Should not have empty text blocks, got: ${JSON.stringify(assistantMsg.content)}`,
    );
  }
});

test("assistant message with non-null content is preserved", () => {
  const input = {
    model: "claude-opus-4-5",
    messages: [
      { role: "user", content: "Say hello" },
      { role: "assistant", content: "Hello there!" },
    ],
  };

  const result = openaiToClaudeRequest("claude-opus-4-5", input, false);
  const assistantMsg = result.messages?.find((m) => m.role === "assistant");
  assert.ok(assistantMsg, "should have assistant message");

  const hasHello = Array.isArray(assistantMsg.content)
    ? assistantMsg.content.some((b) => typeof b.text === "string" && b.text.includes("Hello"))
    : String(assistantMsg.content).includes("Hello");
  assert.ok(hasHello, "content should be preserved");
});
