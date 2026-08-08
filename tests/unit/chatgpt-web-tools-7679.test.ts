// Hardened tool contract serialization for chatgpt-web thinking models (#7679).
//
// GPT-5.6 Thinking via chatgpt-web ignores the injected `<tool>` pseudo-contract
// and replies in prose claiming tools are unavailable. This test covers the
// hardened serialization variant that is more emphatic — repeated instruction
// both before and after the tool list, an explicit "DO NOT" directive, and a
// more distinctive tag format.
//
// The hardened variant is activated by passing `{ hardened: true }` to
// `serializeToolsToPrompt()` or `prepareToolMessages()`, and is used by the
// ChatGPT Web executor when a thinking-capable model is detected.

import test from "node:test";
import assert from "node:assert/strict";

const {
  serializeToolsToPrompt,
  prepareToolMessages,
  parseToolCallsFromText,
} = await import("../../open-sse/translator/webTools.ts");

const WEATHER_TOOL = {
  type: "function",
  function: {
    name: "get_weather",
    description: "Get the current weather for a location",
    parameters: {
      type: "object",
      properties: { location: { type: "string" } },
      required: ["location"],
    },
  },
};

const SEARCH_TOOL = {
  type: "function",
  function: {
    name: "search_web",
    description: "Search the web for current information",
    parameters: {
      type: "object",
      properties: { query: { type: "string" } },
      required: ["query"],
    },
  },
};

const TOOLS = [WEATHER_TOOL, SEARCH_TOOL];

// ─── serializeToolsToPrompt — hardened variant ───────────────────────────────

test("serializeToolsToPrompt({ hardened: true }) contains 'DO NOT' directive (#7679)", () => {
  const result = serializeToolsToPrompt(TOOLS, { hardened: true });
  assert.match(result, /Do NOT say you cannot use tools/);
});

test("serializeToolsToPrompt({ hardened: true }) contains 'CAN and MUST' directive (#7679)", () => {
  const result = serializeToolsToPrompt(TOOLS, { hardened: true });
  assert.match(result, /CAN and MUST use these tools/);
});

test("serializeToolsToPrompt({ hardened: true }) contains tool names from the input (#7679)", () => {
  const result = serializeToolsToPrompt(TOOLS, { hardened: true });
  assert.match(result, /get_weather/);
  assert.match(result, /search_web/);
});

test("serializeToolsToPrompt({ hardened: true }) contains the tag format example (#7679)", () => {
  const result = serializeToolsToPrompt(TOOLS, { hardened: true });
  assert.match(result, /<tool>\{"name": "<tool_name>"/);
});

test("serializeToolsToPrompt({ hardened: true }) contains the post-list instruction block (#7679)", () => {
  const result = serializeToolsToPrompt(TOOLS, { hardened: true });

  // The tool list comes before the post-list instruction.
  // Confirm both are present in order: tools list then IMPORTANT.
  const toolIdx = result.indexOf("get_weather");
  const importantIdx = result.indexOf("IMPORTANT:");
  assert.ok(toolIdx >= 0, "tool name appears in the output");
  assert.ok(importantIdx >= 0, "IMPORTANT block appears in the output");
  assert.ok(
    importantIdx > toolIdx,
    "IMPORTANT block appears AFTER the tool list"
  );
});

test("serializeToolsToPrompt({ hardened: true }) returns empty string for empty tools (#7679)", () => {
  assert.equal(serializeToolsToPrompt([], { hardened: true }), "");
});

test("serializeToolsToPrompt({ hardened: true }) returns empty string for null/undefined tools (#7679)", () => {
  assert.equal(serializeToolsToPrompt(null, { hardened: true }), "");
  assert.equal(serializeToolsToPrompt(undefined, { hardened: true }), "");
});

// ─── serializeToolsToPrompt — backward compatibility ─────────────────────────

test("serializeToolsToPrompt({ hardened: false }) produces same output as no-options (#7679)", () => {
  const withFalse = serializeToolsToPrompt(TOOLS, { hardened: false });
  const withDefault = serializeToolsToPrompt(TOOLS);
  assert.equal(withFalse, withDefault);
});

test("serializeToolsToPrompt() without options uses the standard contract (#7679)", () => {
  const result = serializeToolsToPrompt(TOOLS);
  assert.doesNotMatch(result, /Do NOT say you cannot use tools/);
  assert.doesNotMatch(result, /CAN and MUST use these tools/);
  assert.match(result, /You can call tools/);
});

// ─── prepareToolMessages — hardened variant ──────────────────────────────────

test("prepareToolMessages with { hardened: true } prepends system message with hardened content (#7679)", () => {
  const body = { tools: TOOLS };
  const messages = [{ role: "user", content: "What is the weather?" }];
  const result = prepareToolMessages(body, messages, { hardened: true });

  assert.equal(result.hasTools, true);
  assert.ok(Array.isArray(result.effectiveMessages));
  assert.equal(result.effectiveMessages.length, 2);

  const sysMsg = result.effectiveMessages[0];
  assert.equal(sysMsg.role, "system");
  assert.match(
    String(sysMsg.content),
    /Do NOT say you cannot use tools/
  );
  assert.match(
    String(sysMsg.content),
    /CAN and MUST use these tools/
  );
});

test("prepareToolMessages without options uses standard contract (#7679)", () => {
  const body = { tools: TOOLS };
  const messages = [{ role: "user", content: "hi" }];
  const result = prepareToolMessages(body, messages);

  assert.equal(result.hasTools, true);
  const sysMsg = result.effectiveMessages[0];
  assert.equal(sysMsg.role, "system");
  assert.match(String(sysMsg.content), /You can call tools/);
  assert.doesNotMatch(String(sysMsg.content), /Do NOT say you cannot use tools/);
});

test("prepareToolMessages with { hardened: true } and no tools returns hasTools: false (#7679)", () => {
  const body = {};
  const messages = [{ role: "user", content: "hi" }];
  const result = prepareToolMessages(body, messages, { hardened: true });
  assert.equal(result.hasTools, false);
  assert.equal(result.effectiveMessages.length, 1);
});

// ─── parseToolCallsFromText — compatibility with hardened instruction text ───

test("parseToolCallsFromText correctly extracts <tool> blocks from hardened instruction text (#7679)", () => {
  const hardenedPrompt = serializeToolsToPrompt(TOOLS, { hardened: true });

  const text = [
    hardenedPrompt,
    "",
    "Let me look up the weather in Tokyo.",
    '<tool>{"name":"get_weather","arguments":{"location":"Tokyo"}}</tool>',
    "",
    'And now search the web: <tool>{"name":"search_web","arguments":{"query":"latest news 2026"}}</tool>',
  ].join("\n");

  const result = parseToolCallsFromText(text, "call", TOOLS);

  assert.ok(result.toolCalls !== null, "tool calls should be parsed");
  assert.equal(result.toolCalls.length, 2, "should find two tool calls");

  assert.equal(result.toolCalls[0].function.name, "get_weather");
  assert.equal(result.toolCalls[0].type, "function");
  assert.deepEqual(JSON.parse(result.toolCalls[0].function.arguments), {
    location: "Tokyo",
  });

  assert.equal(result.toolCalls[1].function.name, "search_web");
  assert.deepEqual(JSON.parse(result.toolCalls[1].function.arguments), {
    query: "latest news 2026",
  });

  // Assert the actual tool call <tool> blocks are stripped from the content.
  // The tool names themselves remain in the content because they appear in the
  // prompt's tool list (the "Available tools:" section) — only the `<tool>{json}</tool>`
  // blocks that were parsed as tool calls are stripped.
  assert.doesNotMatch(result.content, /<tool>\{"name":"get_weather"/);
  assert.doesNotMatch(result.content, /<tool>\{"name":"search_web"/);
  assert.match(result.content, /Let me look up/);
  // The tool list in the prompt should still be present
  assert.match(result.content, /get_weather/);
  assert.match(result.content, /search_web/);
});

test("parseToolCallsFromText returns null when hardened text has no tool blocks (#7679)", () => {
  const hardenedPrompt = serializeToolsToPrompt(TOOLS, { hardened: true });
  const text = [hardenedPrompt, "", "I don't need any tools for this."].join(
    "\n"
  );

  const result = parseToolCallsFromText(text, "call", TOOLS);

  assert.equal(result.toolCalls, null, "no tool calls when no <tool> blocks present");
  assert.match(result.content, /I don't need any tools/);
});

test("parseToolCallsFromText handles <tool> blocks line-boundary crossing in hardened text (#7679)", () => {
  // Some thinking models may emit the tool block adjacent to explanatory text
  // with no preceding newline
  const text = [
    'I will use the weather tool. <tool>{"name":"get_weather","arguments":{"location":"Paris"}}</tool>',
    "I hope this helps.",
  ].join("\n");

  const result = parseToolCallsFromText(text, "call", TOOLS);

  assert.ok(result.toolCalls !== null);
  assert.equal(result.toolCalls.length, 1);
  assert.equal(result.toolCalls[0].function.name, "get_weather");
  assert.deepEqual(JSON.parse(result.toolCalls[0].function.arguments), {
    location: "Paris",
  });
});
