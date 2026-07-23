import test from "node:test";
import assert from "node:assert/strict";

import { pipeWithDisconnect } from "../../open-sse/utils/streamHandler.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function readStreamText(stream) {
  const reader = stream.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return decoder.decode(
    chunks.length === 1 ? chunks[0] : Uint8Array.from(chunks.flatMap((chunk) => Array.from(chunk)))
  );
}

// Regression guard for #8143's logging-hygiene fix: the stall watchdog's
// `streamController.handleError?.()` call used to be wrapped in a bare
// `catch {}` that silently swallowed any exception raised by the callback.
// It must now log via console.debug so the failure is observable instead of
// vanishing without a trace.
test("pipeWithDisconnect stall watchdog logs instead of silently swallowing a throwing handleError", async () => {
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode("x"));
      // never enqueue again, never close — forces the stall watchdog to fire
    },
    cancel() {},
  });

  const streamController = {
    isConnected: () => true,
    handleError() {
      throw new Error("handleError callback exploded");
    },
    handleComplete() {},
    abort() {},
  };

  const debugCalls = [];
  const originalDebug = console.debug;
  console.debug = (...args) => {
    debugCalls.push(args);
  };

  try {
    const stream = pipeWithDisconnect(new Response(source), new TransformStream(), streamController, {
      stallTimeoutMs: 40,
    });
    await readStreamText(stream);
  } finally {
    console.debug = originalDebug;
  }

  const loggedStallFailure = debugCalls.some((args) =>
    String(args[0]).includes("stall watchdog handleError failed")
  );
  assert.ok(
    loggedStallFailure,
    "a throwing handleError during the stall watchdog must be logged via console.debug, not swallowed"
  );
});
