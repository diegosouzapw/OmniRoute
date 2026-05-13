import test from "node:test";
import assert from "node:assert/strict";

const { prepareClaudeRequest } = await import("../../open-sse/translator/helpers/claudeHelper.ts");
const { DEFAULT_THINKING_CLAUDE_SIGNATURE } =
  await import("../../open-sse/config/defaultThinkingSignature.ts");

function multiTurnBodyWithoutThinkingBlock() {
  return {
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "call_x", name: "ls", input: { path: "." } }],
      },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "call_x",
            content: "README.md\npackage.json",
          },
        ],
      },
    ],
  };
}

test("prepareClaudeRequest: claude provider — injects thinking before tool_use (regression)", () => {
  const body = multiTurnBodyWithoutThinkingBlock();
  const result = prepareClaudeRequest(body as any, "claude");
  const assistantContent = (result as any).messages[1].content;
  assert.equal(assistantContent.length, 2, "thinking + tool_use");
  assert.equal(assistantContent[0].type, "redacted_thinking");
  assert.equal(assistantContent[0].data, DEFAULT_THINKING_CLAUDE_SIGNATURE);
  assert.equal(assistantContent[0].thinking, undefined);
  assert.equal(assistantContent[0].signature, undefined);
  assert.equal(assistantContent[1].type, "tool_use");
});

test("prepareClaudeRequest: kimi-coding provider — injects thinking before tool_use (new behavior)", () => {
  // Previously: kimi-coding was excluded by the provider gate and the assistant
  // turn shipped to api.kimi.com/coding/v1/messages without a thinking
  // precursor, triggering 400 "thinking is enabled but reasoning_content is
  // missing in assistant tool call message at index N".
  const body = multiTurnBodyWithoutThinkingBlock();
  const result = prepareClaudeRequest(body as any, "kimi-coding");
  const assistantContent = (result as any).messages[1].content;
  assert.equal(assistantContent.length, 2, "thinking + tool_use");
  assert.equal(assistantContent[0].type, "redacted_thinking");
  assert.equal(assistantContent[0].data, DEFAULT_THINKING_CLAUDE_SIGNATURE);
  assert.equal(assistantContent[0].thinking, undefined);
  assert.equal(assistantContent[0].signature, undefined);
});

test("prepareClaudeRequest: existing thinking block — redacted, signature replaced, no double-inject", () => {
  const body = {
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "reasoning here", signature: "old-sig" },
          { type: "tool_use", id: "call_y", name: "ls", input: {} },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "call_y", content: "ok" }],
      },
    ],
  };
  const result = prepareClaudeRequest(body as any, "kimi-coding");
  const assistantContent = (result as any).messages[1].content;
  assert.equal(assistantContent.length, 2, "no double-inject — exactly 2 blocks");
  assert.equal(assistantContent[0].type, "redacted_thinking", "thinking → redacted_thinking");
  assert.equal(assistantContent[0].data, DEFAULT_THINKING_CLAUDE_SIGNATURE);
  assert.equal(assistantContent[0].thinking, undefined, "thinking field stripped");
  assert.equal(assistantContent[0].signature, undefined, "signature field stripped");
  assert.equal(assistantContent[1].type, "tool_use");
});

test("prepareClaudeRequest: thinking disabled — no inject regardless of tool_use presence", () => {
  const body = {
    thinking: { type: "disabled" },
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "call_z", name: "ls", input: {} }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "call_z", content: "ok" }],
      },
    ],
  };
  const result = prepareClaudeRequest(body as any, "kimi-coding");
  const assistantContent = (result as any).messages[1].content;
  assert.equal(assistantContent.length, 1, "no thinking injected when thinking is disabled");
  assert.equal(assistantContent[0].type, "tool_use");
});

test("prepareClaudeRequest: thinking enabled + no tool_use — no inject (single-turn text)", () => {
  const body = {
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
  };
  const result = prepareClaudeRequest(body as any, "kimi-coding");
  const userContent = (result as any).messages[0].content;
  assert.ok(Array.isArray(userContent));
  assert.equal(userContent[0].type, "text");
  // No new thinking block prepended on user messages
  assert.equal(userContent.length, 1);
});
