import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } = await import(
  "../../open-sse/translator/request/openai-responses.ts"
);

test("#12141: Responses-to-Chat strips tool_choice='auto' when tools is empty array", () => {
  const body = {
    model: "vllm/qwen-2.5-72b",
    input: "hello",
    tools: [],
    tool_choice: "auto",
    stream: false,
  };

  const result = openaiResponsesToOpenAIRequest(null, body, null, null) as Record<string, unknown>;

  assert.equal(
    result.tool_choice,
    undefined,
    "Neutral tool_choice 'auto' must be omitted when no tools exist"
  );
});

test("#12141: Responses-to-Chat strips tool_choice='none' when tools is absent or empty", () => {
  const body = {
    model: "vllm/qwen-2.5-72b",
    input: "hello",
    tool_choice: "none",
    stream: false,
  };

  const result = openaiResponsesToOpenAIRequest(null, body, null, null) as Record<string, unknown>;

  assert.equal(
    result.tool_choice,
    undefined,
    "Neutral tool_choice 'none' must be omitted when no tools exist"
  );
});

test("#12141: Responses-to-Chat preserves tools and tool_choice='auto' when valid tools are present", () => {
  const body = {
    model: "vllm/qwen-2.5-72b",
    input: "what is the weather?",
    tools: [
      {
        type: "function",
        name: "get_weather",
        description: "Get weather",
        parameters: { type: "object", properties: { location: { type: "string" } } },
      },
    ],
    tool_choice: "auto",
    stream: false,
  };

  const result = openaiResponsesToOpenAIRequest(null, body, null, null) as Record<string, unknown>;

  assert.ok(Array.isArray(result.tools), "tools must be preserved as an array");
  assert.equal((result.tools as unknown[]).length, 1);
  assert.equal(result.tool_choice, "auto", "tool_choice 'auto' must be preserved when tools exist");
});

test("#12141: Responses-to-Chat preserves tool_choice='required' when tools is empty (explicit contradiction)", () => {
  const body = {
    model: "vllm/qwen-2.5-72b",
    input: "hello",
    tools: [],
    tool_choice: "required",
    stream: false,
  };

  const result = openaiResponsesToOpenAIRequest(null, body, null, null) as Record<string, unknown>;

  assert.equal(
    result.tool_choice,
    "required",
    "Contradictory tool_choice 'required' must be preserved so upstream surfaces the error"
  );
});
