import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  serializeToolsToPrompt,
  parseToolCallsFromText,
  prepareToolMessages,
  buildToolAwareResult,
} from "../../open-sse/translator/webTools.ts";

// Regression coverage for the shared web-cookie tool-call translation helpers
// (#3259). These functions back tool-calling for the 8 pure-API web executors
// (adapta-web, blackbox-web, duckduckgo-web, inner-ai, muse-spark-web,
// perplexity-web, qwen-web, t3-chat-web), so the translation contract must hold.

const WEATHER_TOOL = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get the weather for a city",
      parameters: { type: "object", properties: { city: { type: "string" } } },
    },
  },
];

describe("webTools — serializeToolsToPrompt", () => {
  test("returns empty string when there are no tools", () => {
    assert.equal(serializeToolsToPrompt([]), "");
    assert.equal(serializeToolsToPrompt(undefined), "");
  });

  test("lists each tool and explains the <tool> block contract", () => {
    const prompt = serializeToolsToPrompt(WEATHER_TOOL);
    assert.ok(prompt.includes("Available tools:"));
    assert.ok(prompt.includes("- get_weather: Get the weather for a city"));
    assert.ok(prompt.includes("<tool>"), "must teach the <tool> wrapper contract");
  });
});

describe("webTools — parseToolCallsFromText", () => {
  test("parses a <tool> block into OpenAI tool_calls and strips it from content", () => {
    const text =
      'Sure, let me check.\n<tool>{"name": "get_weather", "arguments": {"city": "SP"}}</tool>';
    const { content, toolCalls } = parseToolCallsFromText(text, "call", WEATHER_TOOL);

    assert.ok(toolCalls && toolCalls.length === 1, "one tool call expected");
    assert.equal(toolCalls[0].function.name, "get_weather");
    assert.equal(typeof toolCalls[0].function.arguments, "string", "arguments must be a JSON string");
    assert.deepEqual(JSON.parse(toolCalls[0].function.arguments), { city: "SP" });
    assert.ok(!content.includes("<tool>"), "the <tool> block must be stripped from content");
  });

  test("returns null tool calls for plain text with no tool block", () => {
    const { content, toolCalls } = parseToolCallsFromText("just a normal answer", "call", WEATHER_TOOL);
    assert.equal(toolCalls, null);
    assert.equal(content, "just a normal answer");
  });

  test("accepts bare JSON tool calls only when a requested tool set is provided", () => {
    const bare = '{"name": "get_weather", "arguments": {"city": "RJ"}}';

    const withTools = parseToolCallsFromText(bare, "call", WEATHER_TOOL);
    assert.ok(withTools.toolCalls && withTools.toolCalls[0].function.name === "get_weather");

    const withoutTools = parseToolCallsFromText(bare, "call");
    assert.equal(withoutTools.toolCalls, null, "bare JSON must not be parsed without a tools[] set");
  });
});

describe("webTools — prepareToolMessages", () => {
  test("prepends a tool system prompt when tools are present", () => {
    const messages = [{ role: "user", content: "weather in SP?" }];
    const result = prepareToolMessages({ tools: WEATHER_TOOL }, messages);

    assert.equal(result.hasTools, true);
    assert.equal(result.effectiveMessages[0].role, "system");
    assert.ok(String(result.effectiveMessages[0].content).includes("get_weather"));
    assert.equal(result.effectiveMessages.length, messages.length + 1);
  });

  test("passes messages through untouched when there are no tools", () => {
    const messages = [{ role: "user", content: "hi" }];
    const result = prepareToolMessages({}, messages);

    assert.equal(result.hasTools, false);
    assert.equal(result.effectiveMessages, messages);
  });
});

describe("webTools — buildToolAwareResult", () => {
  test("finish_reason is tool_calls when a call is parsed, else stop", () => {
    const called = buildToolAwareResult(
      '<tool>{"name": "get_weather", "arguments": {}}</tool>',
      WEATHER_TOOL
    );
    assert.equal(called.finishReason, "tool_calls");
    assert.ok(called.toolCalls && called.toolCalls.length === 1);

    const plain = buildToolAwareResult("no tools here", WEATHER_TOOL);
    assert.equal(plain.finishReason, "stop");
    assert.equal(plain.toolCalls, null);
    assert.equal(plain.content, "no tools here");
  });
});
