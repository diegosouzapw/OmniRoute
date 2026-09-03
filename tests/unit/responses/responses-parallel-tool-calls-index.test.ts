import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIResponse } =
  await import("../../../open-sse/translator/response/openai-responses.ts");

// Issue: 2+ `function_call` items opened (response.output_item.added) before any of
// them closes (response.output_item.done) — a genuine parallel tool-call dispatch —
// causes `state.toolCallIndex` (only incremented in the `.done` handler) to stay at 0
// for every "added" header chunk. Clients that key their tool-call accumulator by
// `delta.tool_calls[].index` (e.g. opencode's github-copilot chat-language-model
// stream parser) then see the *first* `.done` argument chunk at index 1/2 with no
// prior header and no `id`, and throw "Expected 'id' to be a string."
test("Responses -> OpenAI: parallel function_call items get distinct index+id on the added header", () => {
  const state = {};

  const added0 = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_0", name: "task" },
    },
    state
  );
  const added1 = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_1", name: "task" },
    },
    state
  );
  const added2 = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_2", name: "task" },
    },
    state
  );

  const headers = [added0, added1, added2].map((r) => r.choices[0].delta.tool_calls[0]);

  assert.deepEqual(
    headers.map((h) => h.index),
    [0, 1, 2],
    "each parallel tool call must get its own header index, not all 0"
  );
  assert.deepEqual(
    headers.map((h) => h.id),
    ["call_0", "call_1", "call_2"]
  );

  const done0 = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_0", name: "task", arguments: '{"i":0}' },
    },
    state
  );
  const done1 = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_1", name: "task", arguments: '{"i":1}' },
    },
    state
  );
  const done2 = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_2", name: "task", arguments: '{"i":2}' },
    },
    state
  );

  assert.deepEqual(
    [done0, done1, done2].map((r) => r.choices[0].delta.tool_calls[0].index),
    [0, 1, 2],
    "argument chunks must reuse the SAME index assigned at .added time for each call_id"
  );
});

test("Responses -> OpenAI: parallel calls closed out of order keep their own index", () => {
  const state = {};

  for (const callId of ["call_a", "call_b", "call_c"]) {
    openaiResponsesToOpenAIResponse(
      {
        type: "response.output_item.added",
        item: { type: "function_call", call_id: callId, name: "task" },
      },
      state
    );
  }

  // Close in reverse order: c, then a, then b.
  const doneC = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_c", name: "task", arguments: "{}" },
    },
    state
  );
  const doneA = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_a", name: "task", arguments: "{}" },
    },
    state
  );
  const doneB = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_b", name: "task", arguments: "{}" },
    },
    state
  );

  assert.equal(doneC.choices[0].delta.tool_calls[0].index, 2);
  assert.equal(doneA.choices[0].delta.tool_calls[0].index, 0);
  assert.equal(doneB.choices[0].delta.tool_calls[0].index, 1);
});

test("Responses -> OpenAI: argument deltas interleaved across 2 parallel calls do not get glued together", () => {
  const state = {};

  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_x", name: "Read", id: "fc_call_x" },
    },
    state
  );
  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_y", name: "Read", id: "fc_call_y" },
    },
    state
  );

  // Interleave argument deltas by item_id — x, y, x, y — before either closes.
  openaiResponsesToOpenAIResponse(
    { type: "response.function_call_arguments.delta", item_id: "fc_call_x", delta: '{"filePath"' },
    state
  );
  openaiResponsesToOpenAIResponse(
    { type: "response.function_call_arguments.delta", item_id: "fc_call_y", delta: '{"filePath"' },
    state
  );
  openaiResponsesToOpenAIResponse(
    { type: "response.function_call_arguments.delta", item_id: "fc_call_x", delta: ':"/a.txt"}' },
    state
  );
  openaiResponsesToOpenAIResponse(
    { type: "response.function_call_arguments.delta", item_id: "fc_call_y", delta: ':"/b.txt"}' },
    state
  );

  const doneX = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_x", name: "Read" },
    },
    state
  );
  const doneY = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_y", name: "Read" },
    },
    state
  );

  assert.equal(doneX.choices[0].delta.tool_calls[0].function.arguments, '{"filePath":"/a.txt"}');
  assert.equal(doneY.choices[0].delta.tool_calls[0].function.arguments, '{"filePath":"/b.txt"}');
});

test("Responses -> OpenAI: a deferred (nameless) call that never resolves a name never consumes an index", () => {
  const state = {};

  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_deferred", name: "" },
    },
    state
  );
  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_deferred", name: " " },
    },
    state
  );

  assert.equal(done, null);
  assert.equal(state.toolCallIndex, 0);
});

test("Responses -> OpenAI: argument deltas interleaved across 2 parallel calls resolve by output_index when the upstream omits item_id", () => {
  const state = {};

  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      output_index: 0,
      item: { type: "function_call", call_id: "call_p", name: "Read" },
    },
    state
  );
  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      output_index: 1,
      item: { type: "function_call", call_id: "call_q", name: "Read" },
    },
    state
  );

  // No item_id on any of these deltas — only output_index, which the Responses API
  // guarantees on every streamed event regardless of whether item_id is also sent.
  openaiResponsesToOpenAIResponse(
    { type: "response.function_call_arguments.delta", output_index: 0, delta: '{"filePath"' },
    state
  );
  openaiResponsesToOpenAIResponse(
    { type: "response.function_call_arguments.delta", output_index: 1, delta: '{"filePath"' },
    state
  );
  openaiResponsesToOpenAIResponse(
    { type: "response.function_call_arguments.delta", output_index: 0, delta: ':"/p.txt"}' },
    state
  );
  openaiResponsesToOpenAIResponse(
    { type: "response.function_call_arguments.delta", output_index: 1, delta: ':"/q.txt"}' },
    state
  );

  const doneP = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_p", name: "Read" },
    },
    state
  );
  const doneQ = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_q", name: "Read" },
    },
    state
  );

  assert.equal(doneP.choices[0].delta.tool_calls[0].function.arguments, '{"filePath":"/p.txt"}');
  assert.equal(doneQ.choices[0].delta.tool_calls[0].function.arguments, '{"filePath":"/q.txt"}');
});

test("Responses -> OpenAI: 2 parallel Agent calls still open at stream end each get their own flush chunk", () => {
  const state = {};

  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_agent0", name: "Agent" },
    },
    state
  );
  openaiResponsesToOpenAIResponse(
    { type: "response.function_call_arguments.delta", output_index: 0, delta: '{"task":"a"}' },
    state
  );
  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_agent1", name: "Agent" },
    },
    state
  );
  openaiResponsesToOpenAIResponse(
    { type: "response.function_call_arguments.delta", output_index: 1, delta: '{"task":"b"}' },
    state
  );

  // Stream ends (chunk === null) before either call's output_item.done arrives.
  const flushed = openaiResponsesToOpenAIResponse(null, state);

  assert.ok(Array.isArray(flushed));
  const argChunks = flushed.filter((c) => c.choices[0].delta.tool_calls);
  assert.deepEqual(
    argChunks.map((c) => c.choices[0].delta.tool_calls[0].index).sort(),
    [0, 1],
    "each still-open parallel call must get its own flush chunk, at its own index"
  );
  const finalChunk = flushed[flushed.length - 1];
  assert.equal(finalChunk.choices[0].finish_reason, "tool_calls");
});
