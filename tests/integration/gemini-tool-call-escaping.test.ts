/**
 * tests/integration/gemini-tool-call-escaping.test.ts
 *
 * Live integration tests verifying tool call argument escaping through
 * the Chat Completions endpoint, the Responses API endpoint, and the
 * OmniRoute combo routing engine — both streaming and non-streaming.
 *
 * Gemma4 models emit literal 0x0A bytes in functionCall.args string values.
 * OmniRoute's translator must escape these into valid JSON \n sequences.
 *
 * Environment:
 *   OMNIROUTE_API_KEY  — required (else tests skip)
 *   OMNIROUTE_URL      — defaults to http://localhost:3000
 *   TEST_DELAY_MS      — delay between tests, defaults to 5000
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  skip,
  MODEL,
  ensureTestEnvironment,
  DELAY_BETWEEN_REQUESTS_MS,
  ToolCall,
  ChatResponse,
  ResponsesToolCall,
  ResponsesResponse,
  TOOL_DEFINITION,
  extractToolCalls,
  extractToolCallsFromResponses,
  validateToolCallArguments,
  sendToolCallChatRequest,
  sendStreamingToolCallChatRequest,
  sendToolCallResponsesRequest,
  sendStreamingToolCallResponsesRequest,
} from "./liveGeminiShared.ts";

const DIRECT_MODEL = "gemini/gemma-4-31b-it";

const TOOL_CALL_PROMPT =
  "Use write_file to create /tmp/test.py with Python code that has a function with " +
  "a for loop that prints hello 5 times. Include proper indentation.";

test.before(async () => {
  await ensureTestEnvironment();
});

// ── Gemini Direct Model — Chat Completions ────────────────────────────────

test("gemini direct: tool call arguments are valid JSON", { skip }, async () => {
  const data = await sendToolCallChatRequest(DIRECT_MODEL, TOOL_CALL_PROMPT);
  const toolCalls = extractToolCalls(data);
  validateToolCallArguments(toolCalls);
  console.log(`  [OK] gemini direct: ${toolCalls.length} tool calls, model=${data.model}`);
});

test("gemini direct: streaming tool call produces valid JSON", { skip }, async () => {
  const data = await sendStreamingToolCallChatRequest(DIRECT_MODEL, TOOL_CALL_PROMPT);
  const toolCalls = extractToolCalls(data);
  if (toolCalls.length === 0) {
    console.log("  [skip] gemini direct streaming: model did not produce a tool call");
    return;
  }
  validateToolCallArguments(toolCalls);
  console.log(
    `  [OK] gemini direct streaming: ${toolCalls.length} tool calls, finish=${data.choices[0].finish_reason}`
  );
});

// ── Gemini Direct Model — Responses API ───────────────────────────────────

test("gemini direct: responses tool call arguments are valid JSON", { skip }, async () => {
  const data = await sendToolCallResponsesRequest(DIRECT_MODEL, TOOL_CALL_PROMPT);
  const toolCalls = extractToolCallsFromResponses(data);
  if (toolCalls.length === 0) {
    console.log("  [skip] gemini direct responses: no tool call in response");
    return;
  }
  validateToolCallArguments(toolCalls);
  console.log(
    `  [OK] gemini direct responses: ${toolCalls.length} tool calls, model=${data.model}`
  );
});

test("gemini direct: streaming responses tool call produces valid JSON", { skip }, async () => {
  const toolCalls = await sendStreamingToolCallResponsesRequest(DIRECT_MODEL, TOOL_CALL_PROMPT);
  if (toolCalls.length === 0) {
    console.log("  [skip] gemini direct streaming responses: model did not produce a tool call");
    return;
  }
  validateToolCallArguments(toolCalls);
  console.log(`  [OK] gemini direct streaming responses: ${toolCalls.length} tool calls`);
});

// ── OmniRoute Combo — Chat Completions ────────────────────────────────────

test("omniroute combo: tool call arguments are valid JSON", { skip }, async () => {
  const data = await sendToolCallChatRequest(MODEL, TOOL_CALL_PROMPT);
  const toolCalls = extractToolCalls(data);
  validateToolCallArguments(toolCalls);
  console.log(`  [OK] omniroute combo: ${toolCalls.length} tool calls, model=${data.model}`);
});

test("omniroute combo: streaming tool call produces valid JSON", { skip }, async () => {
  const data = await sendStreamingToolCallChatRequest(MODEL, TOOL_CALL_PROMPT);
  const toolCalls = extractToolCalls(data);
  if (toolCalls.length === 0) {
    console.log("  [skip] omniroute combo streaming: model did not produce a tool call");
    return;
  }
  validateToolCallArguments(toolCalls);
  console.log(
    `  [OK] omniroute combo streaming: ${toolCalls.length} tool calls, finish=${data.choices[0].finish_reason}`
  );
});

// ── OmniRoute Combo — Responses API ───────────────────────────────────────

test("omniroute combo: responses tool call arguments are valid JSON", { skip }, async () => {
  const data = await sendToolCallResponsesRequest(MODEL, TOOL_CALL_PROMPT);
  const toolCalls = extractToolCallsFromResponses(data);
  if (toolCalls.length === 0) {
    console.log("  [skip] omniroute combo responses: no tool call in response");
    return;
  }
  validateToolCallArguments(toolCalls);
  console.log(
    `  [OK] omniroute combo responses: ${toolCalls.length} tool calls, model=${data.model}`
  );
});

test("omniroute combo: streaming responses tool call produces valid JSON", { skip }, async () => {
  const toolCalls = await sendStreamingToolCallResponsesRequest(MODEL, TOOL_CALL_PROMPT);
  if (toolCalls.length === 0) {
    console.log("  [skip] omniroute combo streaming responses: model did not produce a tool call");
    return;
  }
  validateToolCallArguments(toolCalls);
  console.log(`  [OK] omniroute combo streaming responses: ${toolCalls.length} tool calls`);
});
