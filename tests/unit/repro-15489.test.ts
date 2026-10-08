import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { createStreamContentWatcher } = await import("../../open-sse/utils/streamReadiness.ts");

function run(events: Array<Record<string, unknown>>) {
  const state: Record<string, unknown> = {};
  const out: Array<Record<string, unknown>> = [];
  for (const ev of [...events, null]) {
    const r = openaiResponsesToOpenAIResponse(ev as never, state);
    if (Array.isArray(r)) out.push(...r);
    else if (r) out.push(r);
  }
  return out;
}

const base = [
  {
    type: "response.created",
    response: { id: "resp_1", model: "gpt-5.6-sol", status: "in_progress" },
  },
  {
    type: "response.output_item.added",
    output_index: 0,
    item: { type: "reasoning", id: "rs_1", summary: [] },
  },
  {
    type: "response.output_item.done",
    output_index: 0,
    item: { type: "reasoning", id: "rs_1", summary: [], encrypted_content: "abc" },
  },
];

const finishReasons = (chunks: Array<Record<string, unknown>>) =>
  chunks.map((c) => c.choices?.[0]?.finish_reason).filter(Boolean);

test("15489: response.incomplete(max_output_tokens) maps to finish_reason length", () => {
  const chunks = run([
    ...base,
    {
      type: "response.incomplete",
      response: {
        id: "resp_1",
        status: "incomplete",
        incomplete_details: { reason: "max_output_tokens" },
        usage: {
          input_tokens: 116000,
          output_tokens: 4,
          output_tokens_details: { reasoning_tokens: 4 },
        },
      },
    },
  ]);
  assert.deepEqual(finishReasons(chunks), ["length"]);
  const usage = chunks.find((c) => c.usage)?.usage;
  assert.equal(usage?.completion_tokens, 4);
});

test("15489: response.incomplete(content_filter) maps to content_filter", () => {
  const chunks = run([
    ...base,
    {
      type: "response.incomplete",
      response: { status: "incomplete", incomplete_details: { reason: "content_filter" } },
    },
  ]);
  assert.deepEqual(finishReasons(chunks), ["content_filter"]);
});

test("15489: truncated turn is not classified as an empty-content 502 by the stream watcher", () => {
  const chunks = run([
    ...base,
    {
      type: "response.incomplete",
      response: { status: "incomplete", incomplete_details: { reason: "max_output_tokens" } },
    },
  ]);
  const w = createStreamContentWatcher();
  w.note(chunks.map((c) => `data: ${JSON.stringify(c)}\n\n`).join("") + "data: [DONE]\n\n");
  w.finish();
  const wouldFailEmpty =
    w.sawSseFrame() && !w.sawContent() && !w.sawLegitEmptyTerminal() && !w.sawError();
  assert.equal(wouldFailEmpty, false);
});

test("15489: status:completed reasoning-only turn still ends as stop (empty guard unchanged)", () => {
  const chunks = run([
    ...base,
    { type: "response.completed", response: { status: "completed", output: [] } },
  ]);
  assert.deepEqual(finishReasons(chunks), ["stop"]);
});

test("15489: response.incomplete with a tool call keeps tool_calls", () => {
  const chunks = run([
    ...base,
    {
      type: "response.output_item.added",
      output_index: 1,
      item: { type: "function_call", id: "fc_1", call_id: "call_1", name: "t", arguments: "" },
    },
    {
      type: "response.output_item.done",
      output_index: 1,
      item: { type: "function_call", id: "fc_1", call_id: "call_1", name: "t", arguments: "{}" },
    },
    {
      type: "response.incomplete",
      response: { status: "incomplete", incomplete_details: { reason: "max_output_tokens" } },
    },
  ]);
  assert.deepEqual(finishReasons(chunks), ["tool_calls"]);
});
