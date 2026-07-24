import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #8142 — the empty `catch {}` around the caller-supplied `onFailure(failurePayload)`
// callback in createSSEStream (open-sse/utils/stream.ts) silently swallowed a throw
// from consumer code, leaving `failureHandled` false with zero diagnostic trace.
// Fix: keep the catch (a buggy failure handler must never break the stream) but emit
// a contextual console.debug so the swallowed error is discoverable.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8142-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const enc = new TextEncoder();

async function readTransformed(chunks: string[], options: Record<string, unknown>) {
  const source = new ReadableStream<Uint8Array>({
    start(c) {
      for (const chunk of chunks) c.enqueue(enc.encode(chunk));
      c.close();
    },
  });
  return new Response(
    source.pipeThrough(createSSEStream(options as Parameters<typeof createSSEStream>[0]))
  ).text();
}

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    for (const entry of fs.readdirSync(TEST_DATA_DIR)) {
      fs.rmSync(path.join(TEST_DATA_DIR, entry), { recursive: true, force: true });
    }
  }
});

// An OpenAI-Responses-style `response.failed` passthrough event reliably drives
// createSSEStream into the `failurePayload` branch (~L1941-1953) that invokes the
// caller-supplied `onFailure` callback — reused here as the trigger.
function responseFailedChunk(message: string) {
  return `data: ${JSON.stringify({
    type: "response.failed",
    response: { error: { message, code: "server_error" } },
  })}\n\n`;
}

test("#8142 onFailure throwing does not crash the stream and is logged", async () => {
  const originalDebug = console.debug;
  const debugCalls: unknown[][] = [];
  console.debug = (...args: unknown[]) => {
    debugCalls.push(args);
  };
  try {
    await assert.rejects(
      readTransformed([responseFailedChunk("boom upstream")], {
        mode: "passthrough",
        sourceFormat: FORMATS.OPENAI,
        provider: "openai",
        model: "gpt-test",
        body: { messages: [{ role: "user", content: "hello" }] },
        onFailure() {
          throw new Error("boom from consumer onFailure handler");
        },
      }),
      /boom upstream/i,
      "stream must still reject normally — the callback throw must not corrupt control flow"
    );
  } finally {
    console.debug = originalDebug;
  }
  const loggedOnFailureThrow = debugCalls.some((args) =>
    args.some((a) => typeof a === "string" && /onFailure/i.test(a))
  );
  assert.ok(
    loggedOnFailureThrow,
    "a console.debug call referencing onFailure must be emitted when the callback throws"
  );
});

test("#8142 regression: onFailure returning normally logs nothing and behaves identically", async () => {
  const originalDebug = console.debug;
  const debugCalls: unknown[][] = [];
  console.debug = (...args: unknown[]) => {
    debugCalls.push(args);
  };
  let failurePayload: Record<string, unknown> | null = null;
  try {
    await assert.rejects(
      readTransformed([responseFailedChunk("boom upstream normal")], {
        mode: "passthrough",
        sourceFormat: FORMATS.OPENAI,
        provider: "openai",
        model: "gpt-test",
        body: { messages: [{ role: "user", content: "hello" }] },
        onFailure(p: Record<string, unknown>) {
          failurePayload = p;
          return true;
        },
      }),
      /boom upstream normal/i
    );
  } finally {
    console.debug = originalDebug;
  }
  assert.ok(failurePayload, "onFailure callback must still be invoked normally");
  const loggedOnFailureThrow = debugCalls.some((args) =>
    args.some((a) => typeof a === "string" && /onFailure/i.test(a))
  );
  assert.equal(
    loggedOnFailureThrow,
    false,
    "the happy path (no throw) must not emit the onFailure-throw debug log — behavior-free regression guard"
  );
});
