/**
 * Translate mode with a Responses-API upstream (e.g. grok-cli, targetFormat
 * openai-responses) serving a Chat Completions client. The call-log
 * responseBody built in onComplete must carry the visible answer once, with
 * reasoning in `reasoning_content` — not the generic `delta`/`text` fallback's
 * concatenation of every reasoning/output delta AND their `.done` snapshots.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { FORMATS } from "../../open-sse/translator/formats.ts";

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");

type ChatMessage = { content?: string | null; reasoning_content?: string };
type OnCompletePayload = {
  responseBody?: { choices?: Array<{ message?: ChatMessage }> };
};

function event(payload: Record<string, unknown>): string {
  return `event: ${payload.type}\ndata: ${JSON.stringify(payload)}\n\n`;
}

async function runTranslate(chunks: string[]): Promise<OnCompletePayload | undefined> {
  let completed: OnCompletePayload | undefined;
  const encoder = new TextEncoder();
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
  await new Response(
    source.pipeThrough(
      createSSEStream({
        mode: "translate",
        targetFormat: FORMATS.OPENAI_RESPONSES,
        sourceFormat: FORMATS.OPENAI,
        provider: "grok-cli",
        model: "grok-4.6",
        body: { messages: [{ role: "user", content: "hi" }] },
        onComplete: (payload: OnCompletePayload) => {
          completed = payload;
        },
      })
    )
  ).text();
  return completed;
}

test("Responses upstream: call-log content is the answer once, reasoning kept separate", async () => {
  const reasoningItem = {
    type: "reasoning",
    id: "rs_1",
    summary: [],
    content: [{ type: "reasoning_text", text: "Think hard." }],
  };
  const messageItem = { type: "message", id: "msg_1", role: "assistant", content: [] };
  const completed = await runTranslate([
    event({ type: "response.created", response: { id: "resp_1", status: "in_progress" } }),
    event({ type: "response.output_item.added", output_index: 0, item: reasoningItem }),
    event({ type: "response.reasoning_text.delta", item_id: "rs_1", delta: "Think " }),
    event({ type: "response.reasoning_text.delta", item_id: "rs_1", delta: "hard." }),
    event({ type: "response.reasoning_text.done", item_id: "rs_1", text: "Think hard." }),
    event({ type: "response.output_item.done", output_index: 0, item: reasoningItem }),
    event({ type: "response.output_item.added", output_index: 1, item: messageItem }),
    event({ type: "response.output_text.delta", item_id: "msg_1", delta: "Hello " }),
    event({ type: "response.output_text.delta", item_id: "msg_1", delta: "world" }),
    event({ type: "response.output_text.done", item_id: "msg_1", text: "Hello world" }),
    event({
      type: "response.content_part.done",
      item_id: "msg_1",
      part: { type: "output_text", text: "Hello world" },
    }),
    event({
      type: "response.completed",
      response: {
        id: "resp_1",
        status: "completed",
        usage: { input_tokens: 3, output_tokens: 5, total_tokens: 8 },
      },
    }),
  ]);

  const message = completed?.responseBody?.choices?.[0]?.message;
  assert.equal(message?.content, "Hello world");
  assert.equal(message?.reasoning_content, "Think hard.");
});

test("Responses upstream: reasoning and tool-argument deltas stay out of call-log content", async () => {
  const completed = await runTranslate([
    event({ type: "response.created", response: { id: "resp_2", status: "in_progress" } }),
    event({ type: "response.reasoning_summary_text.delta", item_id: "rs_2", delta: "Plan." }),
    event({ type: "response.reasoning_summary_text.done", item_id: "rs_2", text: "Plan." }),
    event({ type: "response.output_text.delta", item_id: "msg_2", delta: "Done" }),
    event({ type: "response.output_text.done", item_id: "msg_2", text: "Done" }),
    event({
      type: "response.output_item.added",
      output_index: 2,
      item: { type: "function_call", id: "fc_2", call_id: "call_2", name: "read", arguments: "" },
    }),
    event({
      type: "response.function_call_arguments.delta",
      item_id: "fc_2",
      output_index: 2,
      delta: '{"path":"a"}',
    }),
    event({ type: "response.completed", response: { id: "resp_2", status: "completed" } }),
  ]);

  const message = completed?.responseBody?.choices?.[0]?.message;
  assert.equal(message?.content, "Done");
});
