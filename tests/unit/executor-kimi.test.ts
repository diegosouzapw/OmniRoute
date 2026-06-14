import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { KimiExecutor } from "../../open-sse/executors/kimi.ts";
import { NON_ANTHROPIC_THINKING_PLACEHOLDER } from "../../open-sse/translator/helpers/claudeHelper.ts";

type TransformedBody = {
  thinking?: Record<string, unknown>;
  messages?: Array<Record<string, unknown>>;
  reasoning_effort?: unknown;
};

describe("KimiExecutor", () => {
  it("injects placeholder reasoning_content for assistant tool call messages when thinking is enabled", () => {
    const executor = new KimiExecutor();

    const transformed = executor.transformRequest(
      "kimi-k2",
      {
        thinking: { type: "enabled" },
        messages: [
          { role: "user", content: "hi" },
          {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call_1",
                type: "function",
                function: { name: "search", arguments: "{}" },
              },
            ],
            reasoning_content: null,
          },
        ],
      },
      false,
      { apiKey: "test" }
    ) as TransformedBody;

    assert.ok(Array.isArray(transformed.messages));
    assert.equal(transformed.messages?.[1]?.reasoning_content, NON_ANTHROPIC_THINKING_PLACEHOLDER);
  });

  it("injects Claude thinking content before the first tool_use block", () => {
    const executor = new KimiExecutor();

    const transformed = executor.transformRequest(
      "kimi-k2",
      {
        thinking: { type: "enabled" },
        messages: [
          { role: "user", content: [{ type: "text", text: "hi" }] },
          {
            role: "assistant",
            reasoning_content: "I should call the search tool.",
            content: [
              { type: "text", text: "Let me check." },
              { type: "tool_use", id: "toolu_1", name: "search", input: { query: "kimi" } },
              { type: "text", text: "Trailing text is preserved by this executor." },
            ],
          },
        ],
      },
      false,
      { apiKey: "test" }
    ) as TransformedBody;

    const assistant = transformed.messages?.[1];
    assert.ok(assistant);
    assert.ok(Array.isArray(assistant.content));
    const content = assistant.content as Array<Record<string, unknown>>;
    assert.deepEqual(
      content.map((block) => block.type),
      ["text", "thinking", "tool_use", "text"]
    );
    assert.deepEqual(content[1], {
      type: "thinking",
      thinking: "I should call the search tool.",
    });
  });

  it("disables Kimi preserved thinking for Claude-protocol bodies", () => {
    const executor = new KimiExecutor();

    const transformed = executor.transformRequest(
      "kimi-k2",
      {
        thinking: { type: "enabled", keep: "all", budget_tokens: 4096 },
        messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
      },
      false,
      { apiKey: "test" }
    ) as TransformedBody;

    assert.deepEqual(transformed.thinking, {
      type: "enabled",
      keep: null,
      budget_tokens: 4096,
    });
  });

  it("does not treat OpenAI reasoning_effort as Kimi thinking enablement", () => {
    const executor = new KimiExecutor();

    const transformed = executor.transformRequest(
      "kimi-k2",
      {
        reasoning_effort: "high",
        messages: [
          { role: "user", content: "hi" },
          {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call_1",
                type: "function",
                function: { name: "search", arguments: "{}" },
              },
            ],
          },
        ],
      },
      false,
      { apiKey: "test" }
    ) as TransformedBody;

    assert.equal(transformed.messages?.[1]?.reasoning_content, undefined);
    assert.equal(transformed.reasoning_effort, "high");
  });
});
