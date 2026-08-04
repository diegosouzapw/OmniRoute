import test from "node:test";
import assert from "node:assert/strict";

import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

async function processClaudeStream(events: Record<string, unknown>[]) {
  let responseBody: unknown;
  const transform = createSSEStream({
    sourceFormat: FORMATS.OPENAI,
    targetFormat: FORMATS.CLAUDE,
    model: "kimi-for-coding",
    onComplete: (result) => {
      responseBody = result.responseBody;
    },
  }) as TransformStream<Uint8Array, Uint8Array>;

  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const encoder = new TextEncoder();
  const drain = (async () => {
    while (!(await reader.read()).done) {}
  })();

  for (const event of events) {
    await writer.write(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
  }
  await writer.close();
  await drain;

  return responseBody as {
    choices: Array<{
      message: {
        content: string | null;
        reasoning_content?: string;
        tool_calls?: unknown[];
      };
    }>;
  };
}

test("reconstructed completion separates Claude thinking from visible text", async () => {
  const responseBody = await processClaudeStream([
    {
      type: "message_start",
      message: { id: "msg_test", type: "message", role: "assistant", content: [] },
    },
    {
      type: "content_block_start",
      index: 0,
      content_block: { type: "thinking", thinking: "" },
    },
    { type: "content_block_delta", index: 0, delta: { type: "thinking_delta", thinking: "plan " } },
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "thinking_delta", thinking: "carefully" },
    },
    { type: "content_block_stop", index: 0 },
    { type: "content_block_start", index: 1, content_block: { type: "text", text: "" } },
    {
      type: "content_block_delta",
      index: 1,
      delta: { type: "text_delta", text: "Visible answer" },
    },
    { type: "content_block_stop", index: 1 },
    {
      type: "content_block_start",
      index: 2,
      content_block: { type: "tool_use", id: "tool_1", name: "lookup", input: {} },
    },
    {
      type: "content_block_delta",
      index: 2,
      delta: { type: "input_json_delta", partial_json: '{"query":"test"}' },
    },
    { type: "content_block_stop", index: 2 },
    { type: "message_delta", delta: { stop_reason: "tool_use" }, usage: { output_tokens: 12 } },
    { type: "message_stop" },
  ]);

  const message = responseBody.choices[0].message;
  assert.equal(message.reasoning_content, "plan carefully");
  assert.equal(message.content, "Visible answer");
  assert.equal(message.tool_calls?.length, 1);
});
