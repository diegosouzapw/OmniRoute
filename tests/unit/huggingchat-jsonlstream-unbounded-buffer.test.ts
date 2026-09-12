// Regression test for issue #12577: HuggingChat NDJSON executor buffered the
// upstream body with no byte ceiling and no timeout, so a stalled/hostile
// upstream that never emits a terminal marker (`finalAnswer` / `status:
// finished`) drove unbounded memory growth per in-flight request.

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  streamJsonlToOpenAi,
  readJsonlResponse,
  HuggingChatStreamError,
} from "../../open-sse/executors/huggingchat/jsonlStream.ts";

const REASONABLE_CAP_BYTES = 2 * 1024 * 1024; // 2 MB
const TEST_SAFETY_CEILING_BYTES = REASONABLE_CAP_BYTES * 4; // 8 MB

function makeUnboundedStream(): {
  body: ReadableStream<Uint8Array>;
  getTotalSent: () => number;
  getClosedBySafetyCeiling: () => boolean;
} {
  const encoder = new TextEncoder();
  const tokenChunk = "a".repeat(32 * 1024); // 32 KB token payload per line
  const line = JSON.stringify({ type: "stream", token: tokenChunk }) + "\n";
  const lineBytes = encoder.encode(line).byteLength;

  let totalSent = 0;
  let closedBySafetyCeiling = false;

  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (totalSent >= TEST_SAFETY_CEILING_BYTES) {
        closedBySafetyCeiling = true;
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(line));
      totalSent += lineBytes;
      // Deliberately never emit a finalAnswer/status:finished terminal marker.
    },
  });

  return {
    body,
    getTotalSent: () => totalSent,
    getClosedBySafetyCeiling: () => closedBySafetyCeiling,
  };
}

test("streamJsonlToOpenAi aborts once accumulated upstream body exceeds a size cap, instead of buffering forever", async () => {
  const { body, getTotalSent, getClosedBySafetyCeiling } = makeUnboundedStream();
  const encoder = new TextEncoder();

  let sawUpstreamErrorChunk = false;
  let bytesReceivedByConsumer = 0;

  for await (const chunk of streamJsonlToOpenAi(
    body,
    "gpt-huggingchat",
    "id-1",
    0,
    undefined,
    undefined,
    REASONABLE_CAP_BYTES
  )) {
    bytesReceivedByConsumer += encoder.encode(chunk).byteLength;
    if (/upstream_error|too_large|payload.*exceed/i.test(chunk)) {
      sawUpstreamErrorChunk = true;
      break;
    }
  }

  assert.ok(
    sawUpstreamErrorChunk,
    `expected streamJsonlToOpenAi to abort with an upstream-error chunk once the ` +
      `accumulated body exceeded ~${REASONABLE_CAP_BYTES} bytes, but it kept consuming ` +
      `upstream data with no ceiling (sent ${getTotalSent()} bytes before the TEST's own ` +
      `safety ceiling stepped in: closedBySafetyCeiling=${getClosedBySafetyCeiling()}, ` +
      `bytesReceivedByConsumer=${bytesReceivedByConsumer}). This confirms issue #12577: ` +
      `no byte cap is enforced on the read loop.`
  );
  assert.ok(
    getTotalSent() < TEST_SAFETY_CEILING_BYTES,
    "expected the cap to trip well before the test's own 8MB safety ceiling"
  );
});

test("readJsonlResponse throws a HuggingChatStreamError once accumulated upstream body exceeds a size cap", async () => {
  const { body, getClosedBySafetyCeiling } = makeUnboundedStream();

  await assert.rejects(
    () => readJsonlResponse(body, undefined, REASONABLE_CAP_BYTES),
    (err: unknown) => err instanceof HuggingChatStreamError
  );
  assert.equal(
    getClosedBySafetyCeiling(),
    false,
    "expected the cap to trip well before the test's own 8MB safety ceiling"
  );
});

test("streamJsonlToOpenAi terminates the read loop once an idle-timeout signal fires", async () => {
  const body = new ReadableStream<Uint8Array>({
    pull() {
      // Never enqueue and never close: simulates a stalled upstream connection
      // that sends nothing at all after headers, relying solely on the caller's
      // timeout signal (mirroring huggingchat.ts's combinedSignal) to unblock.
    },
  });

  const idleTimeout = AbortSignal.timeout(50);
  const chunks: string[] = [];

  for await (const chunk of streamJsonlToOpenAi(body, "gpt-huggingchat", "id-2", 0, idleTimeout)) {
    chunks.push(chunk);
  }

  assert.ok(idleTimeout.aborted, "expected the idle-timeout signal to have fired");
});
