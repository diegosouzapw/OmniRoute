import test from "node:test";
import assert from "node:assert/strict";

const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test("Claude native passthrough normalization keeps original tool names", () => {
  const body = {
    model: "claude-sonnet-4-6",
    max_tokens: 64,
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "Write a todo item" }],
      },
    ],
    tools: [
      {
        name: "TodoWrite",
        description: "Create or update a todo list",
        input_schema: {
          type: "object",
          properties: {
            todos: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["todos"],
        },
      },
    ],
  };

  const openaiBody = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    body.model,
    structuredClone(body),
    false,
    null,
    null,
    null
  );

  // The translated body should have function wrappers with the original name
  assert.ok(Array.isArray(openaiBody.tools), "tools should be an array");
  const tool = openaiBody.tools[0];
  assert.ok(tool.function, "tool should have a function wrapper");
  assert.ok(
    tool.function.name === "TodoWrite" || tool.function.name === "proxy_TodoWrite",
    `tool name should be preserved or prefixed, got: ${tool.function.name}`
  );
});

test("Claude-to-Claude passthrough should not alter tool names", () => {
  const body = {
    model: "claude-sonnet-4-6",
    max_tokens: 64,
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "Write a todo item" }],
      },
    ],
    tools: [
      {
        name: "TodoWrite",
        description: "Create or update a todo list",
        input_schema: {
          type: "object",
          properties: {
            todos: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["todos"],
        },
      },
    ],
  };

  const result = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.CLAUDE,
    body.model,
    structuredClone(body),
    false,
    null,
    null,
    null
  );

  // Claude-to-Claude should preserve tool names
  assert.ok(Array.isArray(result.tools), "tools should be an array");
  assert.equal(result.tools[0].name, "TodoWrite", "tool name should stay unchanged for Claude-to-Claude");
});
