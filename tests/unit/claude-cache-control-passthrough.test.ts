import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { prepareClaudeRequest } from "../../open-sse/translator/helpers/claudeHelper.ts";

describe("Claude cache_control passthrough", () => {
  test("preserveCacheControl=true preserves cache_control in system blocks", () => {
    const body = {
      system: [
        { type: "text", text: "System prompt 1" },
        { type: "text", text: "System prompt 2", cache_control: { type: "ephemeral", ttl: "5m" } },
      ],
      messages: [],
    };

    const result = prepareClaudeRequest(body, "claude", true);

    assert.equal(result.system.length, 2);
    assert.equal(result.system[0].cache_control, undefined);
    assert.deepEqual(result.system[1].cache_control, { type: "ephemeral", ttl: "5m" });
  });

  test("preserveCacheControl=false replaces cache_control in system blocks", () => {
    const body = {
      system: [
        { type: "text", text: "System prompt 1" },
        { type: "text", text: "System prompt 2", cache_control: { type: "ephemeral", ttl: "5m" } },
      ],
      messages: [],
    };

    const result = prepareClaudeRequest(body, "claude", false);

    assert.equal(result.system.length, 2);
    assert.equal(result.system[0].cache_control, undefined);
    assert.deepEqual(result.system[1].cache_control, { type: "ephemeral", ttl: "1h" });
  });

  test("preserveCacheControl=true preserves cache_control in message content blocks", () => {
    const body = {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "User message 1" },
            { type: "text", text: "User message 2", cache_control: { type: "ephemeral" } },
          ],
        },
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: "Assistant response",
              cache_control: { type: "ephemeral", ttl: "10m" },
            },
          ],
        },
      ],
    };

    const result = prepareClaudeRequest(body, "claude", true);

    assert.equal(result.messages.length, 2);
    assert.equal(result.messages[0].content[0].cache_control, undefined);
    assert.deepEqual(result.messages[0].content[1].cache_control, { type: "ephemeral" });
    assert.deepEqual(result.messages[1].content[0].cache_control, {
      type: "ephemeral",
      ttl: "10m",
    });
  });

  test("preserveCacheControl=false strips and re-adds cache_control in messages", () => {
    const body = {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "User message 1" },
            { type: "text", text: "User message 2", cache_control: { type: "ephemeral" } },
          ],
        },
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: "Assistant response",
              cache_control: { type: "ephemeral", ttl: "10m" },
            },
          ],
        },
      ],
    };

    const result = prepareClaudeRequest(body, "claude", false);

    // Original cache_control should be stripped and OmniRoute's strategy applied
    assert.equal(result.messages.length, 2);
    // User message should not have cache_control (only second-to-last user gets it)
    assert.equal(result.messages[0].content[0].cache_control, undefined);
    assert.equal(result.messages[0].content[1].cache_control, undefined);
    // Last assistant should have cache_control added by OmniRoute
    assert.deepEqual(result.messages[1].content[0].cache_control, { type: "ephemeral" });
  });

  test("preserveCacheControl=true preserves cache_control in tools", () => {
    const body = {
      messages: [],
      tools: [
        { name: "tool1", description: "Tool 1", input_schema: { type: "object" } },
        {
          name: "tool2",
          description: "Tool 2",
          input_schema: { type: "object" },
          cache_control: { type: "ephemeral", ttl: "30m" },
        },
      ],
    };

    const result = prepareClaudeRequest(body, "claude", true);

    assert.equal(result.tools.length, 2);
    assert.equal(result.tools[0].cache_control, undefined);
    assert.deepEqual(result.tools[1].cache_control, { type: "ephemeral", ttl: "30m" });
  });

  test("preserveCacheControl=false replaces cache_control in tools", () => {
    const body = {
      messages: [],
      tools: [
        { name: "tool1", description: "Tool 1", input_schema: { type: "object" } },
        {
          name: "tool2",
          description: "Tool 2",
          input_schema: { type: "object" },
          cache_control: { type: "ephemeral", ttl: "30m" },
        },
      ],
    };

    const result = prepareClaudeRequest(body, "claude", false);

    assert.equal(result.tools.length, 2);
    assert.equal(result.tools[0].cache_control, undefined);
    assert.deepEqual(result.tools[1].cache_control, { type: "ephemeral", ttl: "1h" });
  });

  test("preserveCacheControl=true with Claude Code-style caching", () => {
    const body = {
      system: [{ type: "text", text: "System", cache_control: { type: "ephemeral", ttl: "5m" } }],
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: "Turn 1", cache_control: { type: "ephemeral" } }],
        },
        {
          role: "assistant",
          content: [{ type: "text", text: "Response 1" }],
        },
        {
          role: "user",
          content: [{ type: "text", text: "Turn 2" }],
        },
      ],
      tools: [
        {
          name: "bash",
          description: "Execute bash",
          input_schema: { type: "object" },
          cache_control: { type: "ephemeral", ttl: "5m" },
        },
      ],
    };

    const result = prepareClaudeRequest(body, "claude", true);

    // All original cache_control should be preserved
    assert.deepEqual(result.system[0].cache_control, { type: "ephemeral", ttl: "5m" });
    assert.deepEqual(result.messages[0].content[0].cache_control, { type: "ephemeral" });
    assert.equal(result.messages[1].content[0].cache_control, undefined);
    assert.equal(result.messages[2].content[0].cache_control, undefined);
    assert.deepEqual(result.tools[0].cache_control, { type: "ephemeral", ttl: "5m" });
  });
});
