import assert from "node:assert/strict";
import test from "node:test";

import { tlsFetchStreaming } from "../../open-sse/services/claudeTlsClient.ts";

const SLOW_FIRST_BYTE_MS = 5_100;
const SSE_BODY = [
  'event: message_start\ndata: {"type":"message_start"}',
  'event: content_block_delta\ndata: {"type":"content_block_delta","delta":{"type":"text_delta","text":"OK"}}',
  'event: message_stop\ndata: {"type":"message_stop"}',
  "data: [DONE]",
  "",
].join("\n\n");

test("Claude Web keeps waiting when the first Opus SSE event takes longer than five seconds", async () => {
  const client = {
    request: async () =>
      new Response(
        new ReadableStream<Uint8Array>({
          async pull(controller) {
            await new Promise((resolve) => setTimeout(resolve, SLOW_FIRST_BYTE_MS));
            controller.enqueue(new TextEncoder().encode(SSE_BODY));
            controller.close();
          },
        }),
        { status: 200, headers: { "content-type": "text/event-stream" } }
      ),
  };

  const result = await tlsFetchStreaming(
    client,
    "https://claude.ai/api/organizations/x/chat_conversations/y/completion",
    { method: "POST" },
    "[DONE]",
    null,
    7_000
  );

  assert.equal(result.status, 200);
  assert.ok(result.body);
  assert.match(await new Response(result.body).text(), /"text":"OK"/);
});
