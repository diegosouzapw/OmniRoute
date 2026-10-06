/**
 * Regression test for issue #12398 — claude-fable-5-max returns an empty
 * stream past ~1800 messages when stream=true.
 *
 * `createSSEStream()`'s Claude-empty-response detector used to only fire
 * when at least one Claude SSE lifecycle event (message_start /
 * message_delta / message_stop) had been observed. When the upstream
 * connection closes having sent
 * LITERALLY ZERO bytes (no message_start at all — e.g. the connection is
 * held open, then closes with nothing on it, matching the reporter's
 * "~14.5s before flush" timing), the flush path used to silently complete
 * the client stream with a 200 and no content instead of surfacing a 502 —
 * exactly the reported symptom ("The request does not error; it completes
 * with no content").
 */
import test from "node:test";
import assert from "node:assert/strict";

const { createPassthroughStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

async function drainTransform(
  transform: TransformStream<Uint8Array, Uint8Array>,
  upstream: ReadableStream<Uint8Array>
) {
  const writer = transform.writable.getWriter();
  const pump = (async () => {
    const reader = upstream.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      await writer.write(value);
    }
    await writer.close();
  })();

  const reader = transform.readable.getReader();
  const chunks: Uint8Array[] = [];
  let readError: unknown = null;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
  } catch (e) {
    readError = e;
  }
  try {
    await pump;
  } catch (e) {
    readError = readError ?? e;
  }
  const decoded = new TextDecoder().decode(Buffer.concat(chunks.map((c) => Buffer.from(c))));
  return { chunks, decoded, readError };
}

test("#12398 truly empty upstream Claude stream (zero bytes, no message_start) surfaces an error", async () => {
  let failureCalled: unknown = null;
  let completeCalled: unknown = null;

  const transform = createPassthroughStreamWithLogger(
    "claude",
    null,
    null,
    "claude-fable-5-max",
    null,
    { stream: true },
    (payload: unknown) => {
      completeCalled = payload;
    },
    null,
    (failure: unknown) => {
      failureCalled = failure;
      return false;
    },
    FORMATS.CLAUDE
  );

  // Upstream connection opens (HTTP 200) but closes having emitted literally
  // zero bytes — the "held open ~14s then closed with nothing on it" case
  // from the issue report.
  const upstream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.close();
    },
  });

  const { decoded, readError } = await drainTransform(transform, upstream);

  const sawClientVisibleError =
    decoded.includes('"type":"error"') || decoded.includes("event: error");
  const surfacedAsFailure = readError !== null || failureCalled !== null || sawClientVisibleError;

  assert.equal(
    surfacedAsFailure,
    true,
    "a truly empty (zero-byte) upstream Claude stream must be surfaced as an error " +
      "(readError, onFailure callback, or a client-visible error SSE event) instead of " +
      "silently completing with 200 and no content"
  );
  assert.equal(
    completeCalled,
    null,
    "onComplete must not fire with a fabricated 200 success payload for a truly empty stream"
  );
});

test("#12398 companion: partial-lifecycle empty Claude stream (message_start + message_stop, no content) still errors", async () => {
  let failureCalled: unknown = null;

  const transform = createPassthroughStreamWithLogger(
    "claude",
    null,
    null,
    "claude-fable-5-max",
    null,
    { stream: true },
    () => {},
    null,
    (failure: unknown) => {
      failureCalled = failure;
      return false;
    },
    FORMATS.CLAUDE
  );

  const encoder = new TextEncoder();
  const upstream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          `event: message_start\ndata: ${JSON.stringify({
            type: "message_start",
            message: { id: "msg_1", model: "claude-fable-5-max", usage: {} },
          })}\n\n`
        )
      );
      controller.enqueue(
        encoder.encode(`event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}\n\n`)
      );
      controller.close();
    },
  });

  const { readError } = await drainTransform(transform, upstream);

  assert.equal(
    readError !== null || failureCalled !== null,
    true,
    "the pre-existing partial-lifecycle empty-response detector (#3685) must keep working"
  );
});
