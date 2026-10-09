// Repro for issue #14727: "Response truncated — stream ended before
// completion" with cursor-grok-4.6/4.7-high(-fast).
//
// Root cause (open-sse/executors/cursor.ts):
//   driveH2()'s safety timer (CURSOR_STREAM_TIMEOUT_MS, default 300_000ms)
//   fires whenever no turn_ended/kv_after_text/server-end signal arrives in
//   time, and unconditionally rejects with a plain Error — even when
//   substantial assistant text has ALREADY been streamed to the client
//   (ctx.totalText.length > 0, delivered via ctx.emit as it arrived).
//
//   In CursorExecutor.execute()'s streaming branch, the ONLY forgiveness
//   path that gracefully finalizes the SSE stream (finalizeSseStream +
//   controller.close()) instead of nuking it (controller.error()) is gated
//   on isCursorBenignCancelError(err) — which recognizes NGHTTP2_CANCEL /
//   "cursor stream suspended" errors, NOT the safety-timeout's plain
//   Error("cursor-agent stream timed out"). So a long-running high-effort
//   Grok turn that exceeds the 5-minute ceiling gets its already-streamed
//   partial content discarded: no finish_reason chunk, no [DONE], the SSE
//   response just dies — which is exactly what a client (e.g. Hermes Agent)
//   reports as "stream ended before completion".
//
// This test drives the REAL, unmodified driveH2() (accessed via bracket
// notation past the `private` TS annotation — a no-op at runtime) against a
// fake EventEmitter-based h2 stream that: (1) delivers one real wire-encoded
// text-delta frame (so ctx.totalText/emit accumulate exactly as production
// parsing would), then (2) goes silent forever (no turn_ended, no end/error
// event) — modeling a Grok high-effort turn still reasoning when the ceiling
// hits. With CURSOR_STREAM_TIMEOUT_MS set very low via env (read at module
// load, so it must be exported before this file imports cursor.ts), the
// safety timer fires quickly and we can assert on the real rejection.
//
// RED on current code: driveH2 rejects with a plain, non-benign Error while
// ctx.totalText.length > 0 — proving the discard-everything path in
// execute() is reachable for genuine partial-progress turns, not just
// zero-content ones.
//
// Runner: plain tests/unit/*.test.ts (node:test), matching the sibling
// tests/unit/cursor-streaming.test.ts pattern in this repo.
//   CURSOR_STREAM_TIMEOUT_MS=40 node --import tsx/esm --test \
//     tests/unit/cursor-safety-timeout-drops-partial-stream-14727.test.ts

import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";

// Must be set BEFORE cursor/streamDriver.ts loads (read at module load), so the
// executor is imported dynamically below — static imports are hoisted above this.
process.env.CURSOR_STREAM_TIMEOUT_MS = "40";

const { default: CursorExecutor, newStreamCtx } =
  await import("../../open-sse/executors/cursor.ts");
type StreamCtx = ReturnType<typeof newStreamCtx>;
const { isCursorStreamTimeoutError } =
  await import("../../open-sse/executors/cursor/cursorErrors.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

// cursor.ts transitively opens the (isolated, DATA_DIR-scoped) sqlite handle on module load;
// an unreleased handle hangs node:test's process exit.
test.after(() => {
  resetDbInstance();
});

// ─── Minimal wire-format helpers (mirror tests/unit/cursor-streaming.test.ts) ──

function v(n: number): Buffer {
  const out: number[] = [];
  while (n > 0x7f) {
    out.push((n & 0x7f) | 0x80);
    n >>>= 7;
  }
  out.push(n);
  return Buffer.from(out);
}
function tag(field: number, wireType: number): Buffer {
  return v((field << 3) | wireType);
}
function lenPrefixed(field: number, payload: Buffer): Buffer {
  return Buffer.concat([tag(field, 2), v(payload.length), payload]);
}
// AgentServerMessage { interaction_update (1): { text_delta (1): { text (1): str } } }
function buildTextDeltaPayload(text: string): Buffer {
  const tdu = lenPrefixed(1, Buffer.from(text, "utf8"));
  const iu = lenPrefixed(1, tdu);
  return lenPrefixed(1, iu);
}
// Connect-RPC frame: [flags(1)][length BE(4)][payload]. flags=0 → no gzip.
function connectFrame(payload: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(payload.length, 0);
  return Buffer.concat([Buffer.from([0]), len, payload]);
}

test("issue #14727: safety timeout after partial text is tagged and finishes the SSE turn with finish_reason length + [DONE]", async () => {
  const executor = new (
    CursorExecutor as unknown as {
      new (): {
        driveH2: (...args: unknown[]) => Promise<void>;
        finalizeSseStream: (ctx: StreamCtx, body: object) => void;
        buildResponseFromCtx: (ctx: StreamCtx, body: object) => Response;
      };
    }
  )();

  const emitted: string[] = [];
  const ctx: StreamCtx = newStreamCtx("cursor-grok-4.6-high-fast", (c) => emitted.push(c));
  const req = new EventEmitter() as unknown as import("http2").ClientHttp2Stream;
  (req as unknown as { close: () => void }).close = () => {};
  const client = { close: () => {} } as unknown as import("http2").ClientHttp2Session;

  const drivePromise = executor.driveH2(
    { req, client, initialBytes: Buffer.alloc(0) },
    ctx,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );
  (req as unknown as EventEmitter).emit(
    "data",
    connectFrame(buildTextDeltaPayload("partial reasoning text"))
  );

  let rejection: unknown;
  try {
    await drivePromise;
    assert.fail("expected driveH2 to reject via the safety timeout");
  } catch (err) {
    rejection = err;
  }
  assert.match((rejection as Error).message, /cursor-agent stream timed out/);
  assert.ok(ctx.totalText.length > 0);
  assert.equal(isCursorStreamTimeoutError(rejection), true);
  assert.equal(isCursorStreamTimeoutError(new Error("cursor-agent stream timed out")), false);

  // What execute()'s catch block now does for a timeout with partial content.
  ctx.truncatedByTimeout = true;
  executor.finalizeSseStream(ctx, { messages: [] });
  const wire = emitted.join("");
  assert.match(wire, /"finish_reason":"length"/);
  assert.ok(wire.includes("data: [DONE]"));

  const json = (await executor.buildResponseFromCtx(ctx, { messages: [] }).json()) as {
    choices: { finish_reason: string }[];
  };
  assert.equal(json.choices[0].finish_reason, "length");
});
