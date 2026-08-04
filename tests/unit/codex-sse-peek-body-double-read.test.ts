// Live-VPS bug (2026-07-16, release/v3.8.49): a Codex (ChatGPT account) NON-STREAM
// chat request fails 100% of the time with `[502]: Response body is already used
// (reset after 1m)`, returned almost instantly (not a real network/timeout error).
// The streaming (playground) path is unaffected.
//
// Root cause: `peekCodexSseTransientError` (open-sse/executors/codex.ts) peeks the
// first bytes of the upstream SSE response by calling `response.body.getReader()`,
// then — when no transient error is found — calls `reader.releaseLock()` followed
// by a SECOND `response.body.getReader()` on the very same underlying body to
// "continue draining" it into a replacement stream. Re-acquiring a reader on a
// response body that has already been disturbed is exactly the pattern undici's
// fetch/Response implementation guards against ("Body is unusable: Body has
// already been read" / surfaced upstream as "Response body is already used").
// Any runtime/build where the second `getReader()` call on the SAME response.body
// throws turns every single non-streaming Codex request into an uncaught
// TypeError, which chatCore's generic upstream-error handling then classifies as
// a transient failure and stamps with a default 60s cooldown ("reset after 1m") —
// masking a pure code defect as a rate limit.
//
// This test proves the defect directly against `peekCodexSseTransientError`: it
// installs a `getReader` spy on the *original* response body that throws on any
// call after the first (reproducing the "double-acquire" hazard precisely), then
// asserts the function must complete without ever needing a second reader on the
// original body — i.e. it must not throw, and the replacement body it hands back
// must be byte-identical to the original upstream SSE payload.
import test from "node:test";
import assert from "node:assert/strict";

import { peekCodexSseTransientError } from "../../open-sse/executors/codex.ts";

function sseStreamFromChunks(chunks: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let i = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i >= chunks.length) {
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(chunks[i]));
      i++;
    },
  });
}

/**
 * Wrap a ReadableStream so that `getReader()` throws on every call after the
 * first — reproducing, at the unit level, a runtime that refuses to re-acquire
 * a reader on a body it already considers disturbed (the exact "Response body
 * is already used" failure mode observed live).
 */
function withSingleUseGetReader(stream: ReadableStream<Uint8Array>): {
  stream: ReadableStream<Uint8Array>;
  getReaderCallCount: () => number;
} {
  let calls = 0;
  const originalGetReader = stream.getReader.bind(stream);
  Object.defineProperty(stream, "getReader", {
    value: (...args: unknown[]) => {
      calls++;
      if (calls > 1) {
        throw new TypeError("Body is unusable: Body has already been read");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (originalGetReader as any)(...args);
    },
    writable: true,
    configurable: true,
  });
  return { stream, getReaderCallCount: () => calls };
}

async function drainStream(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let out = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  out += decoder.decode();
  return out;
}

test("peekCodexSseTransientError does not re-acquire a reader on the original body for a normal 200-OK SSE response", async () => {
  const normalSse =
    'event: response.output_text.delta\ndata: {"type":"response.output_text.delta","delta":"Hello"}\n\n' +
    'event: response.completed\ndata: {"type":"response.completed","response":{"status":"completed"}}\n\n';

  const { stream, getReaderCallCount } = withSingleUseGetReader(sseStreamFromChunks([normalSse]));
  const response = new Response(stream, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });

  const peek = await peekCodexSseTransientError(response);

  assert.equal(peek.matched, null, "must not classify a normal reply as a transient error");
  assert.ok(peek.replacementBody, "must hand back a replacement body to continue draining");

  const drained = await drainStream(peek.replacementBody!);
  assert.equal(drained, normalSse, "replacement body must be byte-identical to the upstream SSE payload");

  // The regression: the OLD implementation calls response.body.getReader() a
  // SECOND time (after releaseLock()) to "continue" reading the same body. A
  // runtime that refuses that second acquisition throws — which is exactly
  // what withSingleUseGetReader reproduces. The fix must never need more than
  // one reader on the ORIGINAL body.
  assert.ok(
    getReaderCallCount() <= 1,
    `expected at most 1 getReader() call on the original response body, got ${getReaderCallCount()}`
  );
});

test("peekCodexSseTransientError still detects a 200-OK transient-error SSE payload without touching the original body twice", async () => {
  const { stream, getReaderCallCount } = withSingleUseGetReader(
    sseStreamFromChunks([
      'event: error\ndata: {"error":{"message":"Selected model is at capacity. Please try a different model."}}\n\n',
    ])
  );
  const response = new Response(stream, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });

  const peek = await peekCodexSseTransientError(response);

  assert.equal(peek.matched, "selected model is at capacity");
  assert.match(peek.message ?? "", /at capacity/i);
  assert.equal(peek.replacementBody, null);
  assert.ok(
    getReaderCallCount() <= 1,
    `expected at most 1 getReader() call on the original response body, got ${getReaderCallCount()}`
  );
});
