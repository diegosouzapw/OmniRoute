// tests/unit/chatcore-non-streaming-response-body.test.ts
// Characterization of readNonStreamingResponseBody — the non-streaming body reader extracted from
// handleChatCore (chatCore god-file decomposition, #3501). Locks: the response.text() fallback path
// (non-stream, or non-SSE content type) and the SSE-drain path that concatenates chunks until the
// stream closes.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  readNonStreamingResponseBody,
  NonStreamingResponseTooLargeError,
} from "../../open-sse/handlers/chatCore/nonStreamingResponseBody.ts";

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

// #5152: bound the non-streaming buffer so a runaway upstream body cannot fill the V8 heap.

test("aborts and throws when an SSE stream exceeds the byte cap (no unbounded string)", async () => {
  const enc = new TextEncoder();
  let cancelled = false;
  const body = new ReadableStream({
    pull(controller) {
      // 1 KB chunks with no terminal signal — would grow forever without the cap.
      controller.enqueue(enc.encode("data: " + "x".repeat(1024) + "\n"));
    },
    cancel() {
      cancelled = true;
    },
  });
  const response = new Response(body, { headers: { "Content-Type": "text/event-stream" } });

  await assert.rejects(
    () => readNonStreamingResponseBody(response, "text/event-stream", true, 8 * 1024),
    (err) => err instanceof NonStreamingResponseTooLargeError && err.maxBytes === 8 * 1024
  );
  assert.equal(cancelled, true, "upstream reader must be cancelled on cap exceed");
});

test("an SSE stream within the cap still drains normally", async () => {
  const enc = new TextEncoder();
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(enc.encode('data: {"ok":1}\n\n'));
      controller.close();
    },
  });
  const response = new Response(body, { headers: { "Content-Type": "text/event-stream" } });
  const out = await readNonStreamingResponseBody(response, "text/event-stream", true, 1024 * 1024);
  assert.ok(out.includes('"ok":1'));
});

test("rejects a non-SSE response whose declared Content-Length exceeds the cap (no buffering)", async () => {
  const response = new Response("body-not-read", {
    headers: { "Content-Type": "application/json", "content-length": String(100 * 1024 * 1024) },
  });
  await assert.rejects(
    () => readNonStreamingResponseBody(response, "application/json", false, 1024 * 1024),
    (err) => err instanceof NonStreamingResponseTooLargeError
  );
});
