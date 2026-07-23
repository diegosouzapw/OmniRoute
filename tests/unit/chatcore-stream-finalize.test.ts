// tests/unit/chatcore-stream-finalize.test.ts
// Characterization of wrapReadableStreamWithFinalize — the stream finalize wrapper extracted from
// handleChatCore (chatCore god-file decomposition, #3501). Locks: finalize runs exactly once on
// full drain, on cancel, and is not double-invoked.
import { test } from "node:test";
import assert from "node:assert/strict";
import { wrapReadableStreamWithFinalize } from "../../open-sse/handlers/chatCore/streamFinalize.ts";

function streamOf(chunks: unknown[]): ReadableStream {
  let i = 0;
  return new ReadableStream({
    pull(controller) {
      if (i < chunks.length) {
        controller.enqueue(chunks[i++]);
      } else {
        controller.close();
      }
    },
  });
}

test("finalize runs exactly once after the stream is fully drained", async () => {
  let calls = 0;
  const wrapped = wrapReadableStreamWithFinalize(streamOf(["a", "b"]), () => {
    calls++;
  });
  const reader = wrapped.getReader();
  const seen: unknown[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    seen.push(value);
  }
  assert.deepEqual(seen, ["a", "b"]);
  assert.equal(calls, 1);
});

test("finalize runs exactly once on cancel", async () => {
  let calls = 0;
  const wrapped = wrapReadableStreamWithFinalize(streamOf(["a", "b", "c"]), () => {
    calls++;
  });
  const reader = wrapped.getReader();
  await reader.read();
  await reader.cancel("done early");
  assert.equal(calls, 1);
});
