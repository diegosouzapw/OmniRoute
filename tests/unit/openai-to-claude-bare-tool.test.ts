import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } = await import(
  "../../open-sse/translator/request/openai-to-claude.ts"
);

// Regression: some OpenAI-shape clients send a tool as a BARE
// `{ function: { name, description, parameters } }` object, omitting the
// spec-required `type: "function"` parent wrapper. Before this fix, the
// tools-mapping in openai-to-claude.ts only unwrapped `tool.function` when
// `tool.type === "function"` was ALSO true, so a bare-function tool fell
// through with `toolData === tool` (the wrapper itself, which has no
// `.name`) — `originalName` came out empty and the tool was silently
// dropped from the translated request (worse than a 400: the caller has no
// idea the tool never made it upstream).

test("openaiToClaudeRequest: bare {function:{...}} tool (no parent type) is NOT dropped", () => {
  const request = {
    messages: [{ role: "user", content: "hi" }],
    tools: [
      {
        function: {
          name: "get_weather",
          description: "Get the current weather",
          parameters: { type: "object", properties: { city: { type: "string" } } },
        },
      },
    ],
  };

  const translated = openaiToClaudeRequest("claude-sonnet-4", request, false);

  assert.ok(Array.isArray(translated.tools), "expected translated.tools to be an array");
  assert.equal(translated.tools.length, 1, "expected the bare-function tool to survive translation");

  const tool = translated.tools[0];
  assert.match(tool.name, /get_weather$/, "expected the original tool name to be preserved (prefixed)");
  assert.equal(tool.description, "Get the current weather");
  assert.deepEqual(tool.input_schema, {
    type: "object",
    properties: { city: { type: "string" } },
  });
});

test("openaiToClaudeRequest: spec-shape {type:'function', function:{...}} tool still converts (no regression)", () => {
  const request = {
    messages: [{ role: "user", content: "hi" }],
    tools: [
      {
        type: "function",
        function: {
          name: "get_weather",
          description: "Get the current weather",
          parameters: { type: "object", properties: { city: { type: "string" } } },
        },
      },
    ],
  };

  const translated = openaiToClaudeRequest("claude-sonnet-4", request, false);

  assert.equal(translated.tools.length, 1);
  assert.match(translated.tools[0].name, /get_weather$/);
});
