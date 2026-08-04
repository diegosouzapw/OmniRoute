import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
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
    request: async (_url: string, options: Record<string, unknown>) => {
      await new Promise((resolve) => setTimeout(resolve, SLOW_FIRST_BYTE_MS));
      await writeFile(String(options.streamOutputPath), SSE_BODY);
      return {
        status: 200,
        headers: {},
        body: "",
        cookies: {},
        text: async () => "",
        json: async () => ({}),
        bytes: async () => new Uint8Array(),
      };
    },
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
