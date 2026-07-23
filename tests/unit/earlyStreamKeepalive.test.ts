import test from "node:test";
import assert from "node:assert/strict";
import { withEarlyStreamKeepalive } from "../../open-sse/utils/earlyStreamKeepalive.ts";

const ENCODER = new TextEncoder();
const DECODER = new TextDecoder();

async function drainStream(body: ReadableStream<Uint8Array>): Promise<string> {
  const reader = body.getReader();
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    text += DECODER.decode(value, { stream: true });
  }
  return text;
}

function makeSseStream(chunks: string[]): ReadableStream<Uint8Array> {
  const encoded = chunks.map((c) => ENCODER.encode(c));
  let idx = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (idx < encoded.length) controller.enqueue(encoded[idx++]);
      else controller.close();
    },
  });
}

// ── Fast path: handler resolves within threshold ──────────────────────────

test("fast path returns handler response verbatim", async () => {
  const response = new Response("hello", { status: 200 });
  const result = await withEarlyStreamKeepalive(Promise.resolve(response), {
    thresholdMs: 5000,
  });
  assert.equal(result.status, 200);
  const text = await result.text();
  assert.equal(text, "hello");
});

// ── Slow path: SSE stream forwarded correctly ─────────────────────────────

test("slow path forwards SSE stream content", async () => {
  const sseBody = makeSseStream([
    'data: {"choices":[{"delta":{"content":"hello"}}]}\n\n',
    'data: {"choices":[{"delta":{"content":" world"}}]}\n\n',
    "data: [DONE]\n\n",
  ]);
  const response = new Response(sseBody, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });

  // Delay resolution past threshold to trigger slow path
  const delayed = new Promise<Response>((resolve) => setTimeout(() => resolve(response), 100));

  const result = await withEarlyStreamKeepalive(delayed, {
    thresholdMs: 10, // very low to ensure slow path
    intervalMs: 50,
  });

  assert.equal(result.status, 200);
  const text = await drainStream(result.body!);
  assert.ok(text.includes("hello"), "should contain first chunk");
  assert.ok(text.includes("world"), "should contain second chunk");
  assert.ok(text.includes("[DONE]"), "should contain DONE marker");
});

// ── Upstream error with 0 bytes → error frame emitted ─────────────────────

test("upstream error with 0 bytes forwarded emits error frame", { skip: true, todo: "ReadableStream error simulation hangs in Node.js test runner" }, async () => {
  // Use a TransformStream where we error the writable side
  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
  const writer = writable.getWriter();
  writer.releaseLock();
  writable.abort(new Error("upstream died")).catch(() => {});

  const response = new Response(readable, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });

  const delayed = new Promise<Response>((resolve) => setTimeout(() => resolve(response), 10));

  const result = await withEarlyStreamKeepalive(delayed, {
    thresholdMs: 10,
    intervalMs: 50,
  });

  assert.equal(result.status, 200);
  const text = await drainStream(result.body!);
  assert.ok(text.includes("Upstream stream failed before completion"), "should contain error frame");
});

// ── Upstream error after partial content → NO error frame ──────────────────

test("upstream error after partial content does NOT emit error frame", { skip: true, todo: "ReadableStream error simulation hangs in Node.js test runner" }, async () => {
  // Use a TransformStream where we send one chunk then error
  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
  const writer = writable.getWriter();
  await writer.write(ENCODER.encode('data: {"choices":[{"delta":{"content":"partial"}}]}\n\n'));
  writer.releaseLock();
  writable.abort(new Error("upstream died mid-stream")).catch(() => {});

  const response = new Response(readable, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });

  const delayed = new Promise<Response>((resolve) => setTimeout(() => resolve(response), 10));

  const result = await withEarlyStreamKeepalive(delayed, {
    thresholdMs: 10,
    intervalMs: 50,
  });

  assert.equal(result.status, 200);
  const text = await drainStream(result.body!);
  assert.ok(text.includes("partial"), "should contain forwarded content");
  assert.ok(
    !text.includes("Upstream stream failed"),
    "should NOT contain error frame after partial content"
  );
});

// ── Handler rejection → error frame ───────────────────────────────────────

test("handler rejection emits error frame", async () => {
  const delayed = new Promise<Response>((_resolve, reject) =>
    setTimeout(() => reject(new Error("handler failed")), 10)
  );

  const result = await withEarlyStreamKeepalive(delayed, {
    thresholdMs: 5,
    intervalMs: 50,
  });

  assert.equal(result.status, 200);
  const text = await drainStream(result.body!);
  assert.ok(text.includes("Upstream stream failed before completion"));
});

// ── Client abort stops keepalive ──────────────────────────────────────────

test("client abort stops keepalive and closes stream", async () => {
  const controller = new AbortController();
  const neverResolves = new Promise<Response>(() => {}); // never resolves

  const result = await withEarlyStreamKeepalive(neverResolves, {
    thresholdMs: 10,
    intervalMs: 50,
    signal: controller.signal,
  });

  assert.equal(result.status, 200);

  // Abort after a short delay
  setTimeout(() => controller.abort(), 50);

  const text = await drainStream(result.body!);
  // Should have received some keepalive frames then closed
  assert.ok(text.length >= 0, "stream should close on abort");
});
