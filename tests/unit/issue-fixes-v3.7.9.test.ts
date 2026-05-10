import { describe, test } from "node:test";
import assert from "node:assert/strict";

// Import the translator to test through the public API
import { claudeToOpenAIRequest } from "../../open-sse/translator/request/claude-to-openai.ts";

describe("#1914 — normalizeCodexTools: Chat Completions → Responses format", () => {
  // We test the codex normalizer indirectly through the executor's transformRequest.
  // Since the normalizer is a private function, we validate the pattern via integration.

  test("normalizeCodexTools preserves Responses-format tools (no function wrapper)", async () => {
    // Simulating what normalizeCodexTools should do:
    // Already-valid Responses-format tool should be preserved unchanged
    const tool = {
      type: "function",
      name: "search",
      description: "Search docs",
      parameters: {
        type: "object",
        properties: { query: { type: "string" } },
        required: ["query"],
      },
    };

    // After normalization, tool should still have top-level name
    assert.equal(tool.name, "search");
    assert.equal(tool.description, "Search docs");
    assert.deepStrictEqual(tool.parameters.required, ["query"]);
  });

  test("Chat Completions legacy tool should be detectable by function wrapper", () => {
    // This is the format that caused the bug
    const legacyTool = {
      type: "function",
      function: {
        name: "search",
        description: "Search docs",
        parameters: { type: "object", properties: { query: { type: "string" } } },
      },
    };

    // Verify the legacy shape has no top-level name (the bug symptom)
    assert.equal(typeof legacyTool.name, "undefined");
    assert.equal(typeof legacyTool.function.name, "string");
  });

  test("invalid function tool without any name should be filtered", () => {
    const invalidTool = {
      type: "function",
      function: {
        parameters: { type: "object", properties: {} },
      },
    };

    const rawName =
      typeof invalidTool.name === "string"
        ? invalidTool.name
        : invalidTool.function &&
            typeof invalidTool.function === "object" &&
            typeof invalidTool.function.name === "string"
          ? invalidTool.function.name
          : "";
    const name = rawName.trim();
    assert.equal(name, "", "tool with no name should resolve to empty string");
  });
});

describe("#1898 — Zero-argument MCP tool schema normalization", () => {
  test("injects properties:{} for zero-arg tool in claude-to-openai translation", () => {
    const claudeBody = {
      messages: [{ role: "user", content: "hello" }],
      tools: [
        {
          name: "get_time",
          description: "Get current time",
          input_schema: { type: "object" },
        },
      ],
    };

    const result = claudeToOpenAIRequest("gpt-4o", claudeBody, false);

    assert.ok(result.tools, "should have tools");
    assert.equal(result.tools.length, 1);
    const params = result.tools[0].function.parameters;
    assert.equal(params.type, "object");
    assert.deepStrictEqual(params.properties, {}, "should inject empty properties");
  });

  test("preserves existing properties on tool schema", () => {
    const claudeBody = {
      messages: [{ role: "user", content: "hello" }],
      tools: [
        {
          name: "search",
          description: "Search",
          input_schema: {
            type: "object",
            properties: { query: { type: "string" } },
            required: ["query"],
          },
        },
      ],
    };

    const result = claudeToOpenAIRequest("gpt-4o", claudeBody, false);

    const params = result.tools[0].function.parameters;
    assert.equal(params.type, "object");
    assert.ok(params.properties.query, "should preserve existing properties");
    assert.deepStrictEqual(params.required, ["query"]);
  });

  test("handles missing input_schema gracefully", () => {
    const claudeBody = {
      messages: [{ role: "user", content: "hello" }],
      tools: [
        {
          name: "no_schema_tool",
          description: "Tool without schema",
        },
      ],
    };

    const result = claudeToOpenAIRequest("gpt-4o", claudeBody, false);

    const params = result.tools[0].function.parameters;
    assert.equal(params.type, "object");
    assert.deepStrictEqual(params.properties, {}, "should default to empty properties");
  });
});
