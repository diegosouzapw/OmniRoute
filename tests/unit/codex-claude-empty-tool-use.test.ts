import test from "node:test";
import assert from "node:assert/strict";

import { FORMATS } from "../../open-sse/translator/formats.ts";
import { createSSETransformStreamWithLogger } from "../../open-sse/utils/stream.ts";

function sse(type: string, data: Record<string, unknown>): string {
  return `event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`;
}

async function translateCodexToolCall(rawSse: string): Promise<Record<string, unknown>[]> {
  const transform = createSSETransformStreamWithLogger(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "codex",
    null,
    null,
    "gpt-5.6-sol",
    "connection-codex-tool",
    { model: "gpt-5.6-sol", stream: true },
    null,
    null,
    null
  );
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const readAll = (async () => {
    const decoder = new TextDecoder();
    let output = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      output += decoder.decode(value, { stream: true });
    }
    output += decoder.decode();
    return output;
  })();

  await writer.write(new TextEncoder().encode(rawSse));
  await writer.close();

  return (await readAll)
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trim())
    .filter((payload) => payload && payload !== "[DONE]")
    .map((payload) => JSON.parse(payload) as Record<string, unknown>);
}

test("Codex Responses tool call emits exactly one named Claude tool_use block", async () => {
  const callId = "call_codex_claude_1";
  const itemId = "fc_codex_claude_1";
  const raw = [
    sse("response.created", {
      sequence_number: 0,
      response: { id: "resp_codex_claude_1", status: "in_progress", model: "gpt-5.6-sol" },
    }),
    sse("response.output_item.added", {
      sequence_number: 1,
      output_index: 0,
      item: {
        id: itemId,
        type: "function_call",
        call_id: callId,
        name: "check_status",
        arguments: "",
        status: "in_progress",
      },
    }),
    sse("response.function_call_arguments.delta", {
      sequence_number: 2,
      item_id: itemId,
      output_index: 0,
      delta: '{"value":"ok"}',
    }),
    sse("response.function_call_arguments.done", {
      sequence_number: 3,
      item_id: itemId,
      output_index: 0,
      arguments: '{"value":"ok"}',
    }),
    sse("response.output_item.done", {
      sequence_number: 4,
      output_index: 0,
      item: {
        id: itemId,
        type: "function_call",
        call_id: callId,
        name: "check_status",
        arguments: '{"value":"ok"}',
        status: "completed",
      },
    }),
    sse("response.completed", {
      sequence_number: 5,
      response: {
        id: "resp_codex_claude_1",
        status: "completed",
        model: "gpt-5.6-sol",
        output: [
          {
            id: itemId,
            type: "function_call",
            call_id: callId,
            name: "check_status",
            arguments: '{"value":"ok"}',
            status: "completed",
          },
        ],
        usage: { input_tokens: 10, output_tokens: 5, total_tokens: 15 },
      },
    }),
  ].join("");

  const events = await translateCodexToolCall(raw);
  const starts = events.filter((event) => event.type === "content_block_start") as Array<{
    index?: number;
    content_block?: { type?: string; id?: string; name?: string };
  }>;
  const toolStarts = starts.filter((event) => event.content_block?.type === "tool_use");

  assert.equal(toolStarts.length, 1, "must not append a duplicate empty tool_use block");
  assert.deepEqual(toolStarts[0], {
    type: "content_block_start",
    index: 0,
    content_block: {
      type: "tool_use",
      id: callId,
      name: "check_status",
      input: {},
    },
  });
});
