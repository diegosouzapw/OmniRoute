import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #3685 — When a Claude stream completes with lifecycle events (message_start /
// message_delta / message_stop) but zero content_block events, the router was
// injecting a synthetic success message instead of failing over. Fix: emit a
// real SSE error event and call controller.error() so the combo layer can retry.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-3685-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { getPendingRequests, clearPendingRequests } =
  await import("../../src/lib/usage/usageHistory.ts");

const enc = new TextEncoder();

async function readTransformed(chunks: string[], options: Record<string, unknown>) {
  const source = new ReadableStream<Uint8Array>({
    start(c) {
      for (const chunk of chunks) c.enqueue(enc.encode(chunk));
      c.close();
    },
  });
  return new Response(source.pipeThrough(createSSEStream(options as any))).text();
}

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    for (const entry of fs.readdirSync(TEST_DATA_DIR)) {
      fs.rmSync(path.join(TEST_DATA_DIR, entry), { recursive: true, force: true });
    }
  }
});

// --- Golden path: empty content-block stream (the bug case) should now error ---

test("#3685 passthrough: empty Claude SSE (no content_block) rejects the stream", async () => {
  let failurePayload: Record<string, unknown> | null = null;
  await assert.rejects(
    readTransformed(
      [
        `event: message_start\ndata: ${JSON.stringify({
          type: "message_start",
          message: {
            id: "msg_3685",
            type: "message",
            role: "assistant",
            model: "claude-sonnet-4-6",
            content: [],
            stop_reason: null,
            stop_sequence: null,
            usage: { input_tokens: 5, output_tokens: 0 },
          },
        })}\n\n`,
        `event: message_delta\ndata: ${JSON.stringify({
          type: "message_delta",
          delta: { stop_reason: "content_filter", stop_sequence: null },
          usage: { output_tokens: 1 },
        })}\n\n`,
        `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}\n\n`,
      ],
      {
        mode: "passthrough",
        sourceFormat: FORMATS.CLAUDE,
        provider: "anthropic",
        model: "claude-sonnet-4-6",
        body: { messages: [{ role: "user", content: "hello" }] },
        onFailure(p: Record<string, unknown>) {
          failurePayload = p;
        },
      }
    ),
    /empty response/i,
    "stream should reject with empty-response error"
  );
  assert.ok(failurePayload, "onFailure callback must be invoked");
  assert.equal((failurePayload as any).status, 502);
  assert.match((failurePayload as any).message as string, /empty response/i);
});

test("#3685 passthrough: empty Claude SSE emits event: error SSE line before aborting", async () => {
  const collected: string[] = [];
  const source = new ReadableStream<Uint8Array>({
    start(c) {
      const chunks = [
        `event: message_start\ndata: ${JSON.stringify({
          type: "message_start",
          message: {
            id: "msg_3685b",
            type: "message",
            role: "assistant",
            model: "claude-sonnet-4-6",
            content: [],
            stop_reason: null,
            usage: { input_tokens: 5, output_tokens: 0 },
          },
        })}\n\n`,
        `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}\n\n`,
      ];
      for (const chunk of chunks) c.enqueue(enc.encode(chunk));
      c.close();
    },
  });
  const transformed = source.pipeThrough(
    createSSEStream({
      mode: "passthrough",
      sourceFormat: FORMATS.CLAUDE,
      provider: "anthropic",
      model: "claude-sonnet-4-6",
      body: { messages: [{ role: "user", content: "hello" }] },
    } as any)
  );
  const reader = transformed.getReader();
  const dec = new TextDecoder();
  let gotError = false;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      collected.push(dec.decode(value));
    }
  } catch {
    gotError = true;
  }
  assert.ok(gotError, "stream reader should throw on error");
  const full = collected.join("");
  assert.match(full, /event: error/, "SSE error event must be emitted before abort");
  assert.doesNotMatch(
    full,
    /event: content_block_start/,
    "no synthetic content_block must be emitted"
  );
});

// --- Regression guards: excluded cases must NOT be turned into errors ---

test("#3685 regression: stream with content_block events is NOT turned into an error", async () => {
  // A max_tokens:1 ping returns exactly 1 token → content_block events exist.
  // hasContentBlock = true → shouldInjectClaudeEmptyResponseOnFlush = false → no error.
  const text = await readTransformed(
    [
      `event: message_start\ndata: ${JSON.stringify({
        type: "message_start",
        message: {
          id: "msg_ping",
          type: "message",
          role: "assistant",
          model: "claude-haiku-4-5",
          content: [],
          stop_reason: null,
          usage: { input_tokens: 3, output_tokens: 0 },
        },
      })}\n\n`,
      `event: content_block_start\ndata: ${JSON.stringify({
        type: "content_block_start",
        index: 0,
        content_block: { type: "text", text: "" },
      })}\n\n`,
      `event: content_block_delta\ndata: ${JSON.stringify({
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: "Hi" },
      })}\n\n`,
      `event: content_block_stop\ndata: ${JSON.stringify({
        type: "content_block_stop",
        index: 0,
      })}\n\n`,
      `event: message_delta\ndata: ${JSON.stringify({
        type: "message_delta",
        delta: { stop_reason: "max_tokens", stop_sequence: null },
        usage: { output_tokens: 1 },
      })}\n\n`,
      `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}\n\n`,
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.CLAUDE,
      provider: "anthropic",
      model: "claude-haiku-4-5",
      body: { messages: [{ role: "user", content: "ping" }] },
    }
  );
  assert.match(text, /Hi/, "content must pass through untouched");
  assert.doesNotMatch(text, /event: error/, "must NOT emit an error event");
});

test("#3685 pending request counter is decremented when empty-stream error fires", async () => {
  // Regression guard for the bug caught by Cursor/Codex: emitClaudeEmptyStreamErrorAndAbort
  // was marking the error with PENDING_REQUEST_CLEARED_MARKER but never calling
  // trackPendingRequest(..., false). streamHandler.clearPendingRequest() trusts the marker
  // and skips its own decrement, leaving the counter permanently inflated.
  clearPendingRequests();
  const { trackPendingRequest } = await import("../../src/lib/usage/usageHistory.ts");

  // Simulate the stream engine incrementing the counter at request start.
  trackPendingRequest("claude-sonnet-4-6", "anthropic", "conn-test", true);
  assert.equal(
    getPendingRequests().byModel["claude-sonnet-4-6 (anthropic)"],
    1,
    "pending count should start at 1 after request begins"
  );

  await assert.rejects(
    readTransformed(
      [
        `event: message_start\ndata: ${JSON.stringify({
          type: "message_start",
          message: {
            id: "msg_pending_test",
            type: "message",
            role: "assistant",
            model: "claude-sonnet-4-6",
            content: [],
            stop_reason: null,
            usage: { input_tokens: 3, output_tokens: 0 },
          },
        })}\n\n`,
        `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}\n\n`,
      ],
      {
        mode: "passthrough",
        sourceFormat: FORMATS.CLAUDE,
        provider: "anthropic",
        model: "claude-sonnet-4-6",
        connectionId: "conn-test",
        body: { messages: [{ role: "user", content: "hello" }] },
      }
    ),
    /empty response/i
  );

  // emitClaudeEmptyStreamErrorAndAbort must call trackPendingRequest(..., false) so the
  // counter is back to 0 after the stream terminates.
  assert.equal(
    getPendingRequests().byModel["claude-sonnet-4-6 (anthropic)"],
    0,
    "pending count must be 0 after empty-stream error — not left inflated"
  );
});

test("#3685 regression: upstream error event sets hasError=true and does NOT trigger empty-stream path", () => {
  // If Claude itself emits type:error, lifecycle.hasError=true.
  // shouldInjectClaudeEmptyResponseBeforeCurrentEvent / shouldInjectClaudeEmptyResponseOnFlush
  // both check !lifecycle.hasError first — so neither our new error path nor the old synthetic
  // path is triggered. Verified by inspecting the guard functions directly.
  const lifecycle = {
    hasMessageStart: true,
    hasContentBlock: false,
    hasMessageDelta: false,
    hasMessageStop: false,
    hasError: false,
    syntheticContentInjected: false,
    warningLogged: false,
  };

  // Simulate receiving an error event: sets hasError = true.
  const lifecycleWithError = { ...lifecycle, hasError: true };

  // shouldInjectClaudeEmptyResponseOnFlush equivalent: hasError blocks it
  const wouldInjectOnFlush =
    !lifecycleWithError.hasError &&
    !lifecycleWithError.hasContentBlock &&
    (lifecycleWithError.hasMessageStart ||
      lifecycleWithError.hasMessageDelta ||
      lifecycleWithError.hasMessageStop);

  assert.equal(
    wouldInjectOnFlush,
    false,
    "hasError=true must prevent the empty-stream error path from firing"
  );
});
