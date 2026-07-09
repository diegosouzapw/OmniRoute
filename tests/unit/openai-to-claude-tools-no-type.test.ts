import test from "node:test";
import assert from "node:assert/strict";

// Port of 9router#2473 (fix(openai→claude): unwrap bare {function:{…}} tools
// (no parent type)), reported by @samir-abis.
//
// Bug: `open-sse/translator/request/openai-to-claude.ts` only unwrapped
// `tool.function` when the parent object ALSO declared `type: "function"`:
//
//   const toolData = tool.type === "function" && tool.function ? tool.function : tool;
//
// Real-world clients / library generators sometimes emit tool definitions as a
// bare `{ function: { name, parameters } }` wrapper with NO parent `type`
// field. When that shape reached this code, `toolData` stayed the un-unwrapped
// wrapper object, `toolData.name` resolved to `undefined`, `originalName`
// became `""`, and the `if (!originalName) return null` guard silently
// DROPPED the tool via `.filter(Boolean)` — the request reached the upstream
// provider with the tool missing entirely (observed as a MiniMax Anthropic
// gateway 400 "invalid tool type" once the wrapper leaked through as-is).
//
// Fix: unwrap whenever `tool.function` is present, regardless of the parent
// `type` field.

const { openaiToClaudeRequest } = await import(
  "../../open-sse/translator/request/openai-to-claude.ts"
);

function buildBody(tool: Record<string, unknown>) {
  return {
    _disableToolPrefix: true,
    messages: [{ role: "user", content: "hi" }],
    tools: [tool],
  };
}

test("tool WITH explicit type:'function' + function wrapper unwraps to Anthropic shape", () => {
  const result = openaiToClaudeRequest(
    "claude-4-sonnet",
    buildBody({
      type: "function",
      function: {
        name: "get_weather",
        description: "Get the weather",
        parameters: { type: "object", properties: { city: { type: "string" } } },
      },
    }),
    false
  );

  assert.equal(result.tools.length, 1);
  assert.equal(result.tools[0].name, "get_weather");
  assert.equal(result.tools[0].description, "Get the weather");
  assert.deepEqual(result.tools[0].input_schema, {
    type: "object",
    properties: { city: { type: "string" } },
  });
});

test("bare {function:{name,...}} tool with NO parent type still survives with correct name/schema", () => {
  // This is the reported bug: no `type` field at all, only a `function` wrapper.
  const result = openaiToClaudeRequest(
    "claude-4-sonnet",
    buildBody({
      function: {
        name: "get_weather",
        description: "Get the weather",
        parameters: { type: "object", properties: { city: { type: "string" } } },
      },
    }),
    false
  );

  assert.equal(result.tools.length, 1, "tool must not be silently dropped");
  assert.equal(result.tools[0].name, "get_weather");
  assert.equal(result.tools[0].description, "Get the weather");
  assert.deepEqual(result.tools[0].input_schema, {
    type: "object",
    properties: { city: { type: "string" } },
  });
});

test("flat Anthropic-shape tool (no function wrapper) passes through untouched", () => {
  const result = openaiToClaudeRequest(
    "claude-4-sonnet",
    buildBody({
      name: "read_file",
      description: "Read a file",
      input_schema: { type: "object", properties: { path: { type: "string" } } },
    }),
    false
  );

  assert.equal(result.tools.length, 1);
  assert.equal(result.tools[0].name, "read_file");
  assert.equal(result.tools[0].description, "Read a file");
  assert.deepEqual(result.tools[0].input_schema, {
    type: "object",
    properties: { path: { type: "string" } },
  });
});

test("non-function built-in tool type (e.g. web_search_20250305) is preserved, not dropped", () => {
  const result = openaiToClaudeRequest(
    "claude-4-sonnet",
    buildBody({
      type: "web_search_20250305",
      name: "web_search",
      description: "Search the web",
    }),
    false
  );

  assert.equal(result.tools.length, 1, "built-in tool must not be dropped");
  assert.equal(result.tools[0].name, "web_search");
  assert.equal(result.tools[0].description, "Search the web");
});
