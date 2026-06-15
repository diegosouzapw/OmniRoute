import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");

/**
 * Regression: Responses → Chat Completions streaming must announce the assistant
 * role on the FIRST emitted delta.
 *
 * OpenAI Chat Completions streams put `role: "assistant"` on the first chunk's
 * delta. The Responses API has no role-announcement event, so the translator must
 * synthesize it. Strict streaming clients — notably @langchain/openai's
 * `_convertDeltaToMessageChunk` (used by n8n's AI Agent) — key off the first
 * chunk's role to build an AIMessageChunk. Without it, streamed tool_call deltas
 * are dropped and the agent receives an empty response.
 */

test("Responses->Chat: first tool_call chunk announces role=assistant", () => {
  const state: Record<string, unknown> = {};

  const first = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: {
        type: "function_call",
        call_id: "call_abc",
        name: "get_weather",
        arguments: "",
      },
    },
    state
  );

  assert.ok(first, "should emit a chunk for output_item.added");
  assert.equal(
    first.choices[0].delta.role,
    "assistant",
    "first emitted delta must carry role=assistant"
  );
  assert.equal(first.choices[0].delta.tool_calls[0].function.name, "get_weather");

  // Subsequent argument deltas must NOT repeat the role announcement.
  const next = openaiResponsesToOpenAIResponse(
    { type: "response.function_call_arguments.delta", delta: '{"x":1}' },
    state
  );
  assert.ok(next, "should emit a chunk for arguments.delta");
  assert.equal(next.choices[0].delta.role, undefined, "only the first delta announces the role");
});

test("Responses->Chat: first text chunk announces role=assistant", () => {
  const state: Record<string, unknown> = {};

  const first = openaiResponsesToOpenAIResponse(
    { type: "response.output_text.delta", delta: "Olá" },
    state
  );

  assert.ok(first, "should emit a chunk for output_text.delta");
  assert.equal(first.choices[0].delta.role, "assistant");
  assert.equal(first.choices[0].delta.content, "Olá");

  const next = openaiResponsesToOpenAIResponse(
    { type: "response.output_text.delta", delta: " mundo" },
    state
  );
  assert.equal(next.choices[0].delta.role, undefined);
  assert.equal(next.choices[0].delta.content, " mundo");
});
