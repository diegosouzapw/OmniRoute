import test from "node:test";
import assert from "node:assert/strict";

import { finalizeReadableStream } from "../../../../src/app/api/v1/relay/chat/completions/streamFinalizer.ts";

test("finalizeReadableStream finalizes once after the wrapped stream completes", async () => {
  const finalized: unknown[] = [];
  const stream = finalizeReadableStream(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("hello"));
        controller.close();
      },
    }),
    (error) => finalized.push(error)
  );

  assert.equal(await new Response(stream).text(), "hello");
  assert.deepEqual(finalized, [undefined]);
});

test("finalizeReadableStream finalizes once when the consumer cancels", async () => {
  const finalized: unknown[] = [];
  let cancelReason: unknown;
  const stream = finalizeReadableStream(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("chunk"));
      },
      cancel(reason) {
        cancelReason = reason;
      },
    }),
    (error) => finalized.push(error)
  );

  const reader = stream.getReader();
  const first = await reader.read();
  assert.equal(new TextDecoder().decode(first.value), "chunk");

  await reader.cancel("client disconnected");
  await reader.cancel("second cancel");

  assert.equal(cancelReason, "client disconnected");
  assert.deepEqual(finalized, ["client disconnected"]);
});
