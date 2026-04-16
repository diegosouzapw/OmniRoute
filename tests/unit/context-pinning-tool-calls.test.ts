import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  injectModelTag,
  extractPinnedModel,
} from "../../open-sse/services/comboAgentMiddleware.ts";

describe("Context pinning — tool call responses (#721)", () => {
  test("injectModelTag appends synthetic tag when last assistant has null content (tool_calls)", () => {
    const messages = [
      { role: "user", content: "List the files" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_abc123",
            type: "function",
            function: { name: "read", arguments: '{"filePath":"/mnt/e/deer-flow"}' },
          },
        ],
      },
    ];

    const result = injectModelTag(messages, "ollamacloud/glm-5");

    // Should append a synthetic assistant message with the pin tag
    assert.equal(result.length, 3, "Should have 3 messages (original 2 + synthetic)");
    assert.equal(result[2].role, "assistant");
    assert.ok(
      result[2].content.includes("<omniModel>ollamacloud/glm-5</omniModel>"),
      "Synthetic message should contain the pin tag"
    );
  });

  test("injectModelTag appends synthetic tag when last assistant has array content", () => {
    const messages = [
      { role: "user", content: "Explain the code" },
      {
        role: "assistant",
        content: [
          { type: "text", text: "Here is the analysis" },
          { type: "text", text: "And here is part 2" },
        ],
      },
    ];

    const result = injectModelTag(messages, "nvidia/llama-3.4-70b");

    // Array content → should append synthetic message
    assert.equal(result.length, 3);
    assert.equal(result[2].role, "assistant");
    assert.ok(result[2].content.includes("<omniModel>nvidia/llama-3.4-70b</omniModel>"));
  });

  test("extractPinnedModel finds tag in synthetic message after tool_calls", () => {
    const messages = [
      { role: "user", content: "List the files" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_abc", type: "function", function: { name: "read", arguments: "{}" } },
        ],
      },
      { role: "assistant", content: "\n<omniModel>ollamacloud/glm-5</omniModel>" },
    ];

    const pinned = extractPinnedModel(messages);
    assert.equal(pinned, "ollamacloud/glm-5");
  });

  test("injectModelTag still works for normal string content", () => {
    const messages = [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there!" },
    ];

    const result = injectModelTag(messages, "openai/gpt-4o");

    assert.equal(result.length, 2, "Should not add a new message");
    assert.ok(result[1].content.includes("<omniModel>openai/gpt-4o</omniModel>"));
    assert.ok(result[1].content.startsWith("Hi there!"));
  });

  test("roundtrip: inject → extract works for tool-call messages", () => {
    const messages = [
      { role: "user", content: "List the files" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_abc123",
            type: "function",
            function: { name: "read", arguments: '{"filePath":"/home"}' },
          },
        ],
      },
    ];

    const tagged = injectModelTag(messages, "qwen/coder-model");
    const pinned = extractPinnedModel(tagged);

    assert.equal(pinned, "qwen/coder-model", "Should roundtrip the pinned model");
  });

  test("re-injection clears old pin and sets new one", () => {
    const messages = [
      { role: "user", content: "Follow up" },
      { role: "assistant", content: "Previous answer\n<omniModel>old/model</omniModel>" },
      { role: "user", content: "Continue" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_xyz", type: "function", function: { name: "exec", arguments: "{}" } },
        ],
      },
    ];

    const tagged = injectModelTag(messages, "new/model");
    const pinned = extractPinnedModel(tagged);

    assert.equal(pinned, "new/model", "Should return new pinned model, not old one");
    // Verify old tag was cleaned
    const oldTagPresent = tagged.some(
      (m) => typeof m.content === "string" && m.content.includes("old/model")
    );
    assert.equal(oldTagPresent, false, "Old pin tag should be cleaned");
  });
});
