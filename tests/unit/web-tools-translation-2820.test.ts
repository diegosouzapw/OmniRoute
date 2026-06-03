// #2820 — tool-call translation for web-cookie providers (deepseek-web first).
// The web UIs accept only a plain prompt string and reply with tool invocations as
// raw text. These pure helpers (a) serialize the OpenAI `tools` array into a
// system-prompt contract, and (b) parse the upstream `<tool>{...}</tool>` text back
// into OpenAI `tool_calls`.
import test from "node:test";
import assert from "node:assert/strict";

const { serializeToolsToPrompt, parseToolCallsFromText } = await import(
  "../../open-sse/translator/webTools.ts"
);

const TOOLS = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get the current weather for a city",
      parameters: {
        type: "object",
        properties: { city: { type: "string" } },
        required: ["city"],
      },
    },
  },
];

test("serializeToolsToPrompt lists the tool and the <tool> invocation contract", () => {
  const prompt = serializeToolsToPrompt(TOOLS);
  assert.ok(prompt.includes("get_weather"), "tool name present");
  assert.ok(prompt.includes("Get the current weather"), "tool description present");
  assert.ok(prompt.includes("<tool>"), "invocation contract mentions the <tool> tag");
});

test("serializeToolsToPrompt returns empty string for no tools", () => {
  assert.equal(serializeToolsToPrompt([]), "");
  assert.equal(serializeToolsToPrompt(undefined), "");
});

test("parseToolCallsFromText extracts a single tool call and strips it from content", () => {
  const text =
    'Sure, let me check.\n<tool>{"name": "get_weather", "arguments": {"city": "Paris"}}</tool>';
  const { content, toolCalls } = parseToolCallsFromText(text);
  assert.ok(toolCalls && toolCalls.length === 1, "one tool call parsed");
  assert.equal(toolCalls[0].type, "function");
  assert.equal(toolCalls[0].function.name, "get_weather");
  // OpenAI tool_calls arguments is a JSON *string*.
  assert.equal(typeof toolCalls[0].function.arguments, "string");
  assert.deepEqual(JSON.parse(toolCalls[0].function.arguments), { city: "Paris" });
  assert.ok(toolCalls[0].id, "tool call has an id");
  assert.ok(!content.includes("<tool>"), "the raw block is stripped from content");
  assert.ok(content.includes("Sure, let me check."), "surrounding text preserved");
});

test("parseToolCallsFromText returns null toolCalls when there is no tool block", () => {
  const { content, toolCalls } = parseToolCallsFromText("just a normal answer");
  assert.equal(toolCalls, null);
  assert.equal(content, "just a normal answer");
});

test("parseToolCallsFromText parses multiple tool calls", () => {
  const text =
    '<tool>{"name": "a", "arguments": {"x": 1}}</tool>\n<tool>{"name": "b", "arguments": {}}</tool>';
  const { toolCalls } = parseToolCallsFromText(text);
  assert.equal(toolCalls?.length, 2);
  assert.equal(toolCalls[0].function.name, "a");
  assert.equal(toolCalls[1].function.name, "b");
});

test("parseToolCallsFromText tolerates a tool block with no arguments", () => {
  const { toolCalls } = parseToolCallsFromText('<tool>{"name": "ping"}</tool>');
  assert.equal(toolCalls?.length, 1);
  assert.equal(toolCalls[0].function.name, "ping");
  assert.equal(toolCalls[0].function.arguments, "{}");
});
