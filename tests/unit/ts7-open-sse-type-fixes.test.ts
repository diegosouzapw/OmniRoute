/**
 * Behavioral guards for the TS7-readiness type fixes in `open-sse/utils` and
 * `open-sse/translator` (slice 1 of the TypeScript 7 migration).
 *
 * Most of that change is behavior-preserving refactoring, already covered by the
 * existing keepalive/heartbeat suites. Three things are NOT covered elsewhere and are
 * exactly the parts a future "just make the checker happy" edit would silently break:
 *
 *  1. `transformer.cancel()` — the WHATWG Streams hook that clears heartbeat/progress
 *     intervals when an SSE client disconnects. `lib.dom.d.ts` omits it from
 *     `Transformer`, so it is patched in `open-sse/types.d.ts`. If someone deletes the
 *     handlers instead of the type patch, every abandoned stream leaks a timer.
 *  2. `sanitizeToolResultId()` — now coerces a non-string id instead of throwing.
 *  3. The `Read` tool-call shim's `limit` clamping — the narrowing fix rewrote the
 *     comparison to read a local, which must stay behavior-identical at the bounds.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { sanitizeToolResultId } from "../../open-sse/translator/request/openai-to-claude/sanitizeToolResultId.ts";
import { applyToolCallShimToBuffer } from "../../open-sse/translator/helpers/toolCallShim.ts";

// ---------------------------------------------------------------------------
// 1. transformer.cancel() runtime contract
// ---------------------------------------------------------------------------

test("TransformStream invokes transformer.cancel() when the readable side is cancelled", async () => {
  let cancelled = false;
  let seenReason: unknown;

  const ts = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
    cancel(reason) {
      cancelled = true;
      seenReason = reason;
    },
  });

  const writer = ts.writable.getWriter();
  const reader = ts.readable.getReader();
  void writer.write("chunk");
  await reader.read();

  const reason = new Error("client disconnect");
  await reader.cancel(reason);

  assert.equal(
    cancelled,
    true,
    "transformer.cancel() must fire on readable cancel — the heartbeat/progress " +
      "interval cleanup in sseHeartbeat.ts and progressTracker.ts depends on it"
  );
  assert.equal(seenReason, reason, "cancel() should receive the cancellation reason");
});

test("a transformer cancel handler can clear an interval (the leak this guards)", async (t) => {
  let ticks = 0;
  let stopped = false;
  // Held in a local, not on the stream: `start()` runs inside the TransformStream
  // constructor, before the `const` binding is initialized.
  let stop: (() => void) | undefined;

  // Belt-and-braces: a stray interval keeps node:test's event loop alive forever.
  t.after(() => stop?.());

  const ts = new TransformStream({
    start() {
      const id = setInterval(() => {
        ticks += 1;
      }, 5);
      stop = () => {
        clearInterval(id);
        stopped = true;
      };
    },
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
    cancel() {
      stop?.();
    },
  });

  const reader = ts.readable.getReader();
  await reader.cancel(new Error("disconnect"));

  assert.equal(stopped, true, "cancel() should have cleared the interval");

  const before = ticks;
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(ticks, before, "interval must not keep firing after cancel()");
});

// ---------------------------------------------------------------------------
// 2. sanitizeToolResultId()
// ---------------------------------------------------------------------------

test("sanitizeToolResultId returns null for falsy ids so orphan tool_results stay skipped", () => {
  assert.equal(sanitizeToolResultId(undefined), null);
  assert.equal(sanitizeToolResultId(null), null);
  assert.equal(sanitizeToolResultId(""), null);
  assert.equal(sanitizeToolResultId(0), null);
});

test("sanitizeToolResultId passes a well-formed string id through unchanged", () => {
  assert.equal(sanitizeToolResultId("toolu_abc-123"), "toolu_abc-123");
});

test("sanitizeToolResultId replaces characters outside [A-Za-z0-9_-]", () => {
  assert.equal(sanitizeToolResultId("call:with spaces//slashes"), "call_with_spaces__slashes");
});

test("sanitizeToolResultId coerces a non-string id instead of throwing", () => {
  // Previously this reached `id.replace()` on a number and threw a TypeError.
  assert.equal(sanitizeToolResultId(12345), "12345");
});

// ---------------------------------------------------------------------------
// 3. Read shim `limit` clamping
// ---------------------------------------------------------------------------

function readShim(args: Record<string, unknown>): Record<string, unknown> {
  return JSON.parse(applyToolCallShimToBuffer("Read", JSON.stringify(args)));
}

test("Read shim clamps a limit above the 2000-line cap", () => {
  assert.equal(readShim({ file_path: "/a.txt", limit: 5000 }).limit, 2000);
});

test("Read shim leaves an in-range limit untouched at both bounds", () => {
  assert.equal(readShim({ file_path: "/a.txt", limit: 1 }).limit, 1);
  assert.equal(readShim({ file_path: "/a.txt", limit: 2000 }).limit, 2000);
  assert.equal(readShim({ file_path: "/a.txt", limit: 500 }).limit, 500);
});

test("Read shim drops a limit below 1", () => {
  assert.equal("limit" in readShim({ file_path: "/a.txt", limit: 0 }), false);
  assert.equal("limit" in readShim({ file_path: "/a.txt", limit: -10 }), false);
});

test("Read shim coerces numeric-string limit/offset before clamping", () => {
  const out = readShim({ file_path: "/a.txt", limit: "9999", offset: "-5" });
  assert.equal(out.limit, 2000);
  assert.equal(out.offset, 0);
});

test("Read shim floors a negative offset at 0", () => {
  assert.equal(readShim({ file_path: "/a.txt", offset: -1 }).offset, 0);
});
