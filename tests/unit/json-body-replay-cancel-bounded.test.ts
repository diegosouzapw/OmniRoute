/**
 * The JSON-to-SSE replay stream must stay cancellable when the provider
 * never settles its own cancellation.
 *
 * `maybeConvertJsonBodyToSse()` hands its still-open reader to a replay
 * stream that first serves the sniffed prefix, then keeps reading the source.
 * If that replay stream awaits the provider's `cancel()` promise, and the
 * provider controls that promise without ever settling it, the downstream
 * cancellation hangs forever.
 */
import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { maybeConvertJsonBodyToSse } from "../../open-sse/handlers/chatCore/jsonBodyToSse.ts";
import { prependBufferedChunks } from "../../open-sse/utils/streamReadiness.ts";

type Deps = Parameters<typeof maybeConvertJsonBodyToSse>[2];

const encoder = new TextEncoder();

function passthroughDeps(): Deps {
  return {
    withBodyTimeout: (<T>(p: Promise<T>) => p) as Deps["withBodyTimeout"],
    synthesizeOpenAiSseFromJson: () => null,
  } as Deps;
}

/** Source reader whose `cancel()` returns a promise that never settles. */
function unsettledCancelReader(chunks: Uint8Array[]) {
  let cancelCalls = 0;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
    },
    pull() {
      return new Promise<void>(() => {});
    },
    cancel() {
      cancelCalls += 1;
      return new Promise<void>(() => {});
    },
  });
  return { reader: stream.getReader(), getCancelCalls: () => cancelCalls };
}

async function assertCancelSettles(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  label: string
): Promise<void> {
  await Promise.race([
    reader.cancel(`${label}: client went away`),
    new Promise<never>((_resolve, reject) =>
      setTimeout(() => reject(new Error(`${label}: replay cancellation stayed pending`)), 500)
    ),
  ]);
  // A duplicate cancellation must stay a no-op for the provider.
  await reader.cancel(`${label}: duplicate cancellation`);
}

describe("json body replay cancellation stays bounded", () => {
  test("cancelling the preserved SSE replay settles when the provider cancel never does", async () => {
    const prefix = 'data: {"ok":true}\n\n';
    let providerCancelCalls = 0;
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(prefix));
      },
      pull() {
        return new Promise<void>(() => {});
      },
      cancel() {
        providerCancelCalls += 1;
        return new Promise<void>(() => {});
      },
    });
    try {
      const out = await maybeConvertJsonBodyToSse(
        new Response(body, { status: 200, headers: { "content-type": "application/json" } }),
        { provider: "p", model: "m" },
        passthroughDeps()
      );
      assert.ok(out.body, "expected a replayed response body");
      assert.equal(out.headers.get("content-type"), "text/event-stream");
      const reader = out.body.getReader();
      try {
        const first = await reader.read();
        assert.equal(first.done, false);
        assert.match(new TextDecoder().decode(first.value), /"ok":true/);
        await assertCancelSettles(reader, "preserved SSE replay");
      } finally {
        reader.releaseLock();
      }
      assert.equal(providerCancelCalls, 1);
    } finally {
      await body.cancel().catch(() => {});
    }
  });

  test("cancelling the shared replay settles and replays the prefix in order", async () => {
    const chunks = [encoder.encode("first-"), encoder.encode("second-")];
    const { reader: source, getCancelCalls } = unsettledCancelReader(chunks);
    const replayed = prependBufferedChunks(chunks, source);
    const reader = replayed.getReader();
    try {
      const first = await reader.read();
      const second = await reader.read();
      assert.equal(first.done, false);
      assert.equal(second.done, false);
      assert.equal(new TextDecoder().decode(first.value), "first-");
      assert.equal(new TextDecoder().decode(second.value), "second-");
      await assertCancelSettles(reader, "shared replay");
    } finally {
      reader.releaseLock();
    }
    assert.equal(getCancelCalls(), 1);
  });
});
