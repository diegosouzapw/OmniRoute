import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest, openaiToOpenAIResponsesRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

// ──────────────────────────────────────────────────────────────────────────────
// Responses API -> Chat Completions direction
// ──────────────────────────────────────────────────────────────────────────────

test("openaiResponsesToOpenAIRequest: skips function_call items with empty name", () => {
  const body = {
    model: "gpt-4",
    input: [
      { type: "message", role: "user", content: "hello" },
      { type: "function_call", call_id: "call_1", name: "", arguments: "{}" },
    ],
  };

  const result = openaiResponsesToOpenAIRequest("gpt-4", body, true, {});
  const messages = (result as any).messages;

  // Should have only the user message, no assistant message with empty tool call
  const assistantMsgs = messages.filter((m) => m.role === "assistant");
  assert.equal(assistantMsgs.length, 0, "empty-name function_call should be skipped entirely");
});

test("openaiResponsesToOpenAIRequest: skips function_call items with whitespace-only name", () => {
  const body = {
    model: "gpt-4",
    input: [
      { type: "message", role: "user", content: "hello" },
      { type: "function_call", call_id: "call_1", name: "   ", arguments: "{}" },
    ],
  };

  const result = openaiResponsesToOpenAIRequest("gpt-4", body, true, {});
  const messages = (result as any).messages;

  const assistantMsgs = messages.filter((m) => m.role === "assistant");
  assert.equal(assistantMsgs.length, 0, "whitespace-only name function_call should be skipped");
});

test("openaiResponsesToOpenAIRequest: keeps function_call items with valid name", () => {
  const body = {
    model: "gpt-4",
    input: [
      { type: "message", role: "user", content: "hello" },
      {
        type: "function_call",
        call_id: "call_1",
        name: "get_weather",
        arguments: '{"city":"NYC"}',
      },
    ],
  };

  const result = openaiResponsesToOpenAIRequest("gpt-4", body, true, {});
  const messages = (result as any).messages;

  const assistantMsgs = messages.filter((m) => m.role === "assistant");
  assert.equal(assistantMsgs.length, 1, "valid function_call should produce assistant message");
  assert.equal(assistantMsgs[0].tool_calls.length, 1);
  assert.equal(assistantMsgs[0].tool_calls[0].function.name, "get_weather");
});

test("openaiResponsesToOpenAIRequest: mixed valid and empty names keeps only valid", () => {
  const body = {
    model: "gpt-4",
    input: [
      { type: "message", role: "user", content: "hello" },
      { type: "function_call", call_id: "call_1", name: "", arguments: "{}" },
      {
        type: "function_call",
        call_id: "call_2",
        name: "get_weather",
        arguments: '{"city":"NYC"}',
      },
      { type: "function_call", call_id: "call_3", name: "  ", arguments: "{}" },
    ],
  };

  const result = openaiResponsesToOpenAIRequest("gpt-4", body, true, {});
  const messages = (result as any).messages;

  const assistantMsgs = messages.filter((m) => m.role === "assistant");
  assert.equal(assistantMsgs.length, 1);
  assert.equal(assistantMsgs[0].tool_calls.length, 1, "only valid tool call should remain");
  assert.equal(assistantMsgs[0].tool_calls[0].function.name, "get_weather");
});

// ──────────────────────────────────────────────────────────────────────────────
// Chat Completions -> Responses API direction
// ──────────────────────────────────────────────────────────────────────────────

test("openaiToOpenAIResponsesRequest: skips tool_calls with empty function name", () => {
  const body = {
    messages: [
      { role: "user", content: "hello" },
      {
        role: "assistant",
        content: null,
        tool_calls: [{ id: "call_1", type: "function", function: { name: "", arguments: "{}" } }],
      },
    ],
  };

  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, {});
  const fnCalls = (result as any).input.filter((i) => i.type === "function_call");
  assert.equal(fnCalls.length, 0, "empty-name tool_call should be skipped");
});

test("openaiToOpenAIResponsesRequest: skips tool_calls with whitespace-only function name", () => {
  const body = {
    messages: [
      { role: "user", content: "hello" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_1", type: "function", function: { name: "   ", arguments: "{}" } },
        ],
      },
    ],
  };

  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, {});
  const fnCalls = (result as any).input.filter((i) => i.type === "function_call");
  assert.equal(fnCalls.length, 0, "whitespace-only name tool_call should be skipped");
});

test("openaiToOpenAIResponsesRequest: keeps tool_calls with valid function name", () => {
  const body = {
    messages: [
      { role: "user", content: "hello" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_1",
            type: "function",
            function: { name: "get_weather", arguments: '{"city":"NYC"}' },
          },
        ],
      },
    ],
  };

  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, {});
  const fnCalls = (result as any).input.filter((i) => i.type === "function_call");
  assert.equal(fnCalls.length, 1);
  assert.equal(fnCalls[0].name, "get_weather");
});

test("openaiToOpenAIResponsesRequest: mixed valid and empty names keeps only valid", () => {
  const body = {
    messages: [
      { role: "user", content: "hello" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_1", type: "function", function: { name: "", arguments: "{}" } },
          {
            id: "call_2",
            type: "function",
            function: { name: "get_weather", arguments: '{"city":"NYC"}' },
          },
          { id: "call_3", type: "function", function: { name: "  \t  ", arguments: "{}" } },
        ],
      },
    ],
  };

  const result = openaiToOpenAIResponsesRequest("gpt-4", body, true, {});
  const fnCalls = (result as any).input.filter((i) => i.type === "function_call");
  assert.equal(fnCalls.length, 1, "only valid tool call should remain");
  assert.equal(fnCalls[0].name, "get_weather");
});
