import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { parseToolCallsFromText } from "../../open-sse/translator/webTools.ts";

// Regression coverage for #3260: web-cookie providers (e.g. ds-web/deepseek-v4-pro)
// emit tool calls wrapped as `<tool_call name="...">{json}</tool_call>` instead of the
// canonical `<tool>{json}</tool>`. The parser must read the REAL tool name from the JSON
// body, never from the tag's `name="..."` attribute, and must not silently drop the call.

const OPENCODE_TOOL = [
  { type: "function", function: { name: "customize-opencode" } },
];

const WEATHER_TOOL = [
  {
    type: "function",
    function: {
      name: "get_weather",
      parameters: { type: "object", properties: { city: { type: "string" } } },
    },
  },
];

describe("webTools — parseToolCallsFromText <tool_call name=...> wrapper (#3260)", () => {
  test("uses the JSON body name, not the tag attribute, and does not drop the call", () => {
    const text = '<tool_call name="skill">{"name": "customize-opencode"}</tool_call>';
    const { content, toolCalls } = parseToolCallsFromText(text, "call", OPENCODE_TOOL);

    assert.ok(toolCalls && toolCalls.length === 1, "the tool call must not be dropped");
    assert.equal(
      toolCalls[0].function.name,
      "customize-opencode",
      "name must come from the JSON body, not the tag attribute (\"skill\")"
    );
    assert.equal(toolCalls[0].function.arguments, "{}", "missing arguments default to {}");
    assert.ok(!content.includes("<tool_call"), "the wrapper must be stripped from content");
  });

  test("parses arguments inside the <tool_call> body", () => {
    const text =
      '<tool_call name="function">{"name": "get_weather", "arguments": {"city": "Paris"}}</tool_call>';
    const { toolCalls } = parseToolCallsFromText(text, "call", WEATHER_TOOL);

    assert.ok(toolCalls && toolCalls.length === 1);
    assert.equal(toolCalls[0].function.name, "get_weather");
    assert.deepEqual(JSON.parse(toolCalls[0].function.arguments), { city: "Paris" });
  });

  test("still parses the canonical <tool> block (no regression)", () => {
    const text = '<tool>{"name": "get_weather", "arguments": {"city": "SP"}}</tool>';
    const { toolCalls } = parseToolCallsFromText(text, "call", WEATHER_TOOL);
    assert.ok(toolCalls && toolCalls.length === 1);
    assert.equal(toolCalls[0].function.name, "get_weather");
  });
});
