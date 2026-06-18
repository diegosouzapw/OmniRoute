import { test } from "node:test";
import assert from "node:assert/strict";

import { STREAM_RECOVERY } from "../../open-sse/config/constants.ts";
import {
  HoldbackBuffer,
  TruncatedStreamError,
  isRetryableStreamError,
  hasTerminalMarker,
} from "../../open-sse/services/streamRecovery.ts";

const enc = (s: string) => new TextEncoder().encode(s);

test("STREAM_RECOVERY constants mirror the free-claude-code values", () => {
  assert.equal(STREAM_RECOVERY.HOLDBACK_MS, 750);
  assert.equal(STREAM_RECOVERY.BUFFER_MAX_BYTES, 65536);
  assert.equal(STREAM_RECOVERY.EARLY_RETRY_MAX, 4);
});

test("HoldbackBuffer holds chunks until flushed, then commits", () => {
  // Frozen clock so neither the time nor the byte threshold trips.
  const hb = new HoldbackBuffer({ now: () => 1000 });
  assert.deepEqual(hb.push(enc("data: a\n\n")), []);
  assert.deepEqual(hb.push(enc("data: b\n\n")), []);
  assert.equal(hb.committed, false);
  assert.equal(hb.hasBuffered, true);

  const flushed = hb.flush();
  assert.equal(Buffer.concat(flushed).toString("utf8"), "data: a\n\ndata: b\n\n");
  assert.equal(hb.committed, true);
  assert.equal(hb.hasBuffered, false);
});

test("HoldbackBuffer auto-commits once buffered bytes exceed BUFFER_MAX_BYTES", () => {
  const hb = new HoldbackBuffer({ now: () => 0 });
  const emitted = hb.push(enc("x".repeat(STREAM_RECOVERY.BUFFER_MAX_BYTES + 1)));
  assert.equal(hb.committed, true, "should commit once buffer exceeds max bytes");
  assert.equal(emitted.length, 1, "the over-cap chunk flushes immediately");
});

test("HoldbackBuffer auto-commits once the holdback window elapses", () => {
  let clock = 0;
  const hb = new HoldbackBuffer({ now: () => clock });
  assert.deepEqual(hb.push(enc("data: first\n\n")), [], "first chunk still held");
  clock = STREAM_RECOVERY.HOLDBACK_MS; // window elapsed
  const emitted = hb.push(enc("data: second\n\n"));
  assert.equal(hb.committed, true, "should commit once the holdback window elapses");
  assert.equal(
    Buffer.concat(emitted).toString("utf8"),
    "data: first\n\ndata: second\n\n",
    "flush releases everything buffered so far"
  );
});

test("HoldbackBuffer passes chunks straight through once committed", () => {
  const hb = new HoldbackBuffer({ now: () => 0 });
  hb.flush(); // commit with nothing buffered
  const out = hb.push(enc("data: post\n\n"));
  assert.equal(Buffer.concat(out).toString("utf8"), "data: post\n\n");
});

test("HoldbackBuffer.discard drops buffered chunks without committing", () => {
  const hb = new HoldbackBuffer({ now: () => 0 });
  hb.push(enc("data: a\n\n"));
  hb.discard();
  assert.equal(hb.committed, false, "discard must not commit — a retry is still possible");
  assert.equal(hb.hasBuffered, false);
});

test("TruncatedStreamError is a named Error", () => {
  const err = new TruncatedStreamError("stream ended without terminal marker");
  assert.ok(err instanceof Error);
  assert.equal(err.name, "TruncatedStreamError");
  assert.match(err.message, /terminal marker/);
});

test("isRetryableStreamError: truncation and transient transport errors are retryable", () => {
  assert.equal(isRetryableStreamError(new TruncatedStreamError("x")), true);

  for (const code of ["ECONNRESET", "ECONNREFUSED", "ETIMEDOUT", "EPIPE", "UND_ERR_SOCKET"]) {
    const err = Object.assign(new Error("socket"), { code });
    assert.equal(isRetryableStreamError(err), true, `${code} should be retryable`);
  }

  const timeout = Object.assign(new Error("body timeout"), { name: "BodyTimeoutError" });
  assert.equal(isRetryableStreamError(timeout), true);

  const terminated = new Error("terminated");
  assert.equal(isRetryableStreamError(terminated), true);
});

test("isRetryableStreamError: client aborts and unknown errors are NOT retryable", () => {
  const abort = Object.assign(new Error("aborted"), { name: "AbortError" });
  assert.equal(isRetryableStreamError(abort), false, "client cancellation must not be retried");

  assert.equal(isRetryableStreamError(new Error("some unrelated failure")), false);
  assert.equal(isRetryableStreamError(null), false);
  assert.equal(isRetryableStreamError("nope"), false);
});

test("hasTerminalMarker detects OpenAI and Anthropic stream terminators", () => {
  assert.equal(hasTerminalMarker(enc("data: {...}\n\ndata: [DONE]\n\n")), true);
  assert.equal(hasTerminalMarker(enc("event: message_stop\ndata: {}\n\n")), true);
  assert.equal(hasTerminalMarker(enc("data: {\"choices\":[]}\n\n")), false);
  assert.equal(hasTerminalMarker(enc("")), false);
});
