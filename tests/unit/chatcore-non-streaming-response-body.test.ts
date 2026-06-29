// tests/unit/chatcore-non-streaming-response-body.test.ts
// Characterization of readNonStreamingResponseBody — the non-streaming body reader extracted from
// handleChatCore (chatCore god-file decomposition, #3501). Locks: the response.text() fallback path
// (non-stream, or non-SSE content type) and the SSE-drain path that concatenates chunks until the
// stream closes.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readNonStreamingResponseBody } from "../../open-sse/handlers/chatCore/nonStreamingResponseBody.ts";

test("falls back to response.text() when upstream is not streaming", async () => {
  const out = await readNonStreamingResponseBody(new Response("hello"), "application/json", false);
  assert.equal(out, "hello");
});

test("falls back to response.text() for a non-SSE content type even when streaming", async () => {
  const out = await readNonStreamingResponseBody(new Response("plain"), "application/json", true);
  assert.equal(out, "plain");
});

test("drains an SSE stream chunk-by-chunk and concatenates until close", async () => {
  const enc = new TextEncoder();
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(enc.encode("data: {\"a\":1}\n\n"));
      controller.enqueue(enc.encode("data: {\"b\":2}\n\n"));
      controller.close();
    },
  });
  const response = new Response(body, { headers: { "Content-Type": "text/event-stream" } });
  const out = await readNonStreamingResponseBody(response, "text/event-stream", true);
  assert.ok(out.includes('"a":1'));
  assert.ok(out.includes('"b":2'));
});
