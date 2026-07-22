import test from "node:test";
import assert from "node:assert/strict";

// Split out of translator-resp-openai-responses.test.ts (file-size ratchet —
// this file plus the new tests would have exceeded both the production and
// test-file frozen baselines). Covers the response.completed batched
// tool-call synthesis path (no prior incremental output_item.* events) and
// its dedup guard against providers that DO stream incrementally and then
// echo the same function_call items in response.completed's output[]
// snapshot (would otherwise double-emit — see openai-responses.ts's
// `toolCallIdsSeen` guard).
const { openaiResponsesToOpenAIResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");

test("Responses -> OpenAI: response.completed with function_call in output[] synthesizes tool call chunks", () => {
  const state = {};
  const result = openaiResponsesToOpenAIResponse(
    {
      type: "response.completed",
      response: {
        id: "resp_1",
        status: "completed",
        model: "deepseek-v4",
        output: [
          {
            type: "function_call",
            call_id: "call_1",
            name: "read_file",
            arguments: { path: "/tmp/a" },
          },
        ],
        usage: {
          input_tokens: 5,
          output_tokens: 3,
          total_tokens: 8,
        },
      },
    },
    state
  );

  // Should return an array of chunks (header + args + final)
  assert.ok(Array.isArray(result), "should return array of chunks");
  assert.equal(result.length, 3, "should have 3 chunks: header, args, final");

  // First chunk: tool call header with id, type, function.name
  const header = result[0];
  assert.equal(header.choices[0].delta.tool_calls[0].id, "call_1");
  assert.equal(header.choices[0].delta.tool_calls[0].type, "function");
  assert.equal(header.choices[0].delta.tool_calls[0].function.name, "read_file");
  assert.equal(header.choices[0].delta.tool_calls[0].function.arguments, "");
  assert.equal(header.choices[0].finish_reason, null);

  // Second chunk: arguments delta
  const argsChunk = result[1];
  assert.equal(argsChunk.choices[0].delta.tool_calls[0].index, 0);
  assert.equal(
    argsChunk.choices[0].delta.tool_calls[0].function.arguments,
    JSON.stringify({ path: "/tmp/a" })
  );
  assert.equal(argsChunk.choices[0].finish_reason, null);

  // Third chunk: final with finish_reason
  const final = result[2];
  assert.equal(final.choices[0].finish_reason, "tool_calls");
  assert.equal(final.usage.prompt_tokens, 5);
  assert.equal(final.usage.completion_tokens, 3);
});

test("Responses -> OpenAI: response.completed with multiple function_calls in output[]", () => {
  const state = {};
  const result = openaiResponsesToOpenAIResponse(
    {
      type: "response.completed",
      response: {
        id: "resp_2",
        status: "completed",
        model: "deepseek-v4",
        output: [
          {
            type: "function_call",
            call_id: "call_a",
            name: "read_file",
            arguments: { path: "/tmp/a" },
          },
          {
            type: "function_call",
            call_id: "call_b",
            name: "write_file",
            arguments: { path: "/tmp/b", content: "hello" },
          },
        ],
        usage: {
          input_tokens: 10,
          output_tokens: 6,
          total_tokens: 16,
        },
      },
    },
    state
  );

  assert.ok(Array.isArray(result), "should return array of chunks");
  // 2 tool calls = 2 headers + 2 args + 1 final = 5 chunks
  assert.equal(result.length, 5, "should have 5 chunks for 2 tool calls");

  // First tool call header
  assert.equal(result[0].choices[0].delta.tool_calls[0].id, "call_a");
  assert.equal(result[0].choices[0].delta.tool_calls[0].function.name, "read_file");

  // Second tool call header
  assert.equal(result[2].choices[0].delta.tool_calls[0].id, "call_b");
  assert.equal(result[2].choices[0].delta.tool_calls[0].function.name, "write_file");

  // Final chunk
  const final = result[4];
  assert.equal(final.choices[0].finish_reason, "tool_calls");
  assert.equal(final.usage.prompt_tokens, 10);
});

test("Responses -> OpenAI: response.completed without function_call in output[] still returns stop", () => {
  const state = {};
  const result = openaiResponsesToOpenAIResponse(
    {
      type: "response.completed",
      response: {
        id: "resp_3",
        status: "completed",
        model: "deepseek-v4",
        output: [
          {
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: "Hello!" }],
          },
        ],
        usage: {
          input_tokens: 5,
          output_tokens: 2,
          total_tokens: 7,
        },
      },
    },
    state
  );

  // Should return a single chunk (not array) with finish_reason: "stop"
  assert.ok(!Array.isArray(result), "should return single chunk, not array");
  assert.equal(result.choices[0].finish_reason, "stop");
  assert.equal(result.usage.prompt_tokens, 5);
});

test("Responses -> OpenAI: response.completed with function_call in output[] sets assistant role on first delta", () => {
  const state = {};
  const result = openaiResponsesToOpenAIResponse(
    {
      type: "response.completed",
      response: {
        id: "resp_4",
        status: "completed",
        model: "deepseek-v4",
        output: [
          {
            type: "function_call",
            call_id: "call_1",
            name: "read_file",
            arguments: { path: "/tmp/a" },
          },
        ],
      },
    },
    state
  );

  assert.ok(Array.isArray(result));
  // First chunk should have role: "assistant" in delta
  assert.equal(result[0].choices[0].delta.role, "assistant");
  assert.equal(state.roleEmitted, true);
});

test("Responses -> OpenAI: incremental tool call events + response.completed snapshot does NOT double-emit", () => {
  // Regression test: when a provider streams incrementally (output_item.added ->
  // function_call_arguments.delta -> output_item.done) and then response.completed
  // echoes the same function_call items in its output[] snapshot, we must NOT
  // synthesize a second set of tool call chunks for already-seen call_ids.
  const state = {};

  // Phase 1: incremental events for call_a (identical to real streaming provider)
  const added = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_a", name: "read_file" },
    },
    state
  );
  assert.ok(added, "should emit header chunk for incremental tool call");
  assert.equal(added.choices[0].delta.tool_calls[0].id, "call_a");

  const args = openaiResponsesToOpenAIResponse(
    {
      type: "response.function_call_arguments.delta",
      delta: '{"path":"/tmp/a"}',
    },
    state
  );
  assert.ok(args, "should emit args delta chunk");

  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_a",
        name: "read_file",
        arguments: { path: "/tmp/a" },
      },
    },
    state
  );

  // Phase 2: incremental events for call_b
  const addedB = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_b", name: "write_file" },
    },
    state
  );
  assert.ok(addedB);

  openaiResponsesToOpenAIResponse(
    {
      type: "response.function_call_arguments.delta",
      delta: '{"path":"/tmp/b","content":"hello"}',
    },
    state
  );

  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_b",
        name: "write_file",
        arguments: { path: "/tmp/b", content: "hello" },
      },
    },
    state
  );

  // Phase 3: response.completed echoes BOTH call_a and call_b in output[]
  // This is the test: the guard should skip synthesis since both call_ids were
  // already tracked via the incremental events above.
  const completed = openaiResponsesToOpenAIResponse(
    {
      type: "response.completed",
      response: {
        id: "resp_combined",
        status: "completed",
        model: "deepseek-v4",
        output: [
          {
            type: "function_call",
            call_id: "call_a",
            name: "read_file",
            arguments: { path: "/tmp/a" },
          },
          {
            type: "function_call",
            call_id: "call_b",
            name: "write_file",
            arguments: { path: "/tmp/b", content: "hello" },
          },
        ],
        usage: {
          input_tokens: 10,
          output_tokens: 5,
          total_tokens: 15,
        },
      },
    },
    state
  );

  // response.completed should return a single chunk (not array of chunks)
  // because both call_ids were already seen — no synthesis needed.
  assert.ok(!Array.isArray(completed), "should NOT return array — no synthesis for seen call_ids");
  assert.equal(
    completed.choices[0].finish_reason,
    "tool_calls",
    "finish_reason should still be tool_calls"
  );
  assert.equal(completed.usage.prompt_tokens, 10);
  assert.equal(completed.usage.completion_tokens, 5);

  // toolCallIndex should be 2 (two tool calls were processed via incremental events)
  assert.equal(state.toolCallIndex, 2, "toolCallIndex should reflect both incremental tool calls");
});
