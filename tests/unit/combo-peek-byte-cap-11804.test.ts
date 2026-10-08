// #11804 / #7849: the combo SSE peek must not retain an entire long stream
// while it waits for a content verdict.
import test from "node:test";
import assert from "node:assert/strict";

const { validateResponseQuality } = await import("../../open-sse/services/combo.ts");

test("#11804 peek stops retaining after 1 MiB and leaves the rest unread", async () => {
  let pulls = 0;
  const chunk = new Uint8Array(256 * 1024);
  chunk.fill(0x61);
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      pulls += 1;
      // Never ends. A correct peek returns before this producer is exhausted.
      controller.enqueue(chunk);
    },
  });
  const response = new Response(stream, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
  const out = await validateResponseQuality(response, true, { warn: () => undefined });
  assert.equal(out.valid, true);
  assert.ok(out.clonedResponse, "expected a replay of the peeked prefix");
  assert.ok(pulls <= 6, `peek kept reading, pulls=${pulls}`);
});
