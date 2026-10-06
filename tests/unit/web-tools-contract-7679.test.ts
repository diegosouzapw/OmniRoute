// Tool contract serialization for web-cookie model adapters (#7679).
//
// Some web-cookie models ignore the injected `<tool>` pseudo-contract
// and replies in prose claiming tools are unavailable. This test covers the
// nonce-bound serialization that clearly describes client-side tools and places
// the full contract at the tail of the effective message list.

import test from "node:test";
import assert from "node:assert/strict";

const { serializeToolsToPrompt, prepareToolMessages, parseToolCallsFromText } =
  await import("../../open-sse/translator/webTools.ts");

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

test("serializeToolsToPrompt states that client tools are available (#7679)", () => {
  const result = serializeToolsToPrompt(TOOLS);
  assert.match(result, /never claim they are unavailable/);
});

test("serializeToolsToPrompt includes the nonce-bound invocation contract (#7679)", () => {
  const result = serializeToolsToPrompt(TOOLS);
  assert.match(result, /secret binding "_nonce"/);
});

test("serializeToolsToPrompt contains tool names from the input (#7679)", () => {
  const result = serializeToolsToPrompt(TOOLS);
  assert.match(result, /get_weather/);
  assert.match(result, /search_web/);
});

test("serializeToolsToPrompt contains the tag format example (#7679)", () => {
  const result = serializeToolsToPrompt(TOOLS);
  assert.match(result, /<tool>\{"name": "<tool_name>"/);
});

test("serializeToolsToPrompt returns empty string for empty tools (#7679)", () => {
  assert.equal(serializeToolsToPrompt([]), "");
});

test("serializeToolsToPrompt returns empty string for null/undefined tools (#7679)", () => {
  assert.equal(serializeToolsToPrompt(null), "");
  assert.equal(serializeToolsToPrompt(undefined), "");
});

// ─── serializeToolsToPrompt — backward compatibility ─────────────────────────

test("serializeToolsToPrompt uses the client-tool contract (#7679)", () => {
  const result = serializeToolsToPrompt(TOOLS);
  assert.match(result, /client application provides tools/);
  assert.match(result, /These client tools ARE available/);
});

// ─── prepareToolMessages — hardened variant ──────────────────────────────────

test("prepareToolMessages appends the full contract after client messages (#7679)", () => {
  const body = { tools: TOOLS };
  const messages = [{ role: "user", content: "What is the weather?" }];
  const result = prepareToolMessages(body, messages);

  assert.equal(result.hasTools, true);
  assert.ok(Array.isArray(result.effectiveMessages));
  assert.equal(result.effectiveMessages.length, 2);

  const sysMsg = result.effectiveMessages[1];
  assert.equal(sysMsg.role, "system");
  assert.match(String(sysMsg.content), /never claim they are unavailable/);
  assert.match(String(sysMsg.content), /secret binding "_nonce"/);
});

test("prepareToolMessages adds the client-tool contract (#7679)", () => {
  const body = { tools: TOOLS };
  const messages = [{ role: "user", content: "hi" }];
  const result = prepareToolMessages(body, messages);

  assert.equal(result.hasTools, true);
  const sysMsg = result.effectiveMessages[1];
  assert.equal(sysMsg.role, "system");
  assert.match(String(sysMsg.content), /These client tools ARE available/);
});

test("prepareToolMessages with no tools returns hasTools: false (#7679)", () => {
  const body = {};
  const messages = [{ role: "user", content: "hi" }];
  const result = prepareToolMessages(body, messages);
  assert.equal(result.hasTools, false);
  assert.equal(result.effectiveMessages.length, 1);
});

// ─── parseToolCallsFromText — compatibility with hardened instruction text ───

test("parseToolCallsFromText correctly extracts response <tool> blocks (#7679)", () => {
  const text = [
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
  // Only the response text remains; both tool-call blocks are stripped.
  assert.doesNotMatch(result.content, /<tool>\{"name":"get_weather"/);
  assert.doesNotMatch(result.content, /<tool>\{"name":"search_web"/);
  assert.match(result.content, /Let me look up/);
  assert.doesNotMatch(result.content, /get_weather/);
  assert.doesNotMatch(result.content, /search_web/);
});

test("parseToolCallsFromText returns null when hardened text has no tool blocks (#7679)", () => {
  const hardenedPrompt = serializeToolsToPrompt(TOOLS, { hardened: true });
  const text = [hardenedPrompt, "", "I don't need any tools for this."].join("\n");

  const result = parseToolCallsFromText(text, "call", TOOLS);

  assert.equal(result.toolCalls, null, "no tool calls when no <tool> blocks present");
  assert.match(result.content, /I don't need any tools/);
});

test("parseToolCallsFromText handles <tool> blocks line-boundary crossing in hardened text (#7679)", () => {
  // Some high-performance lanes may emit the tool block adjacent to explanatory text
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
