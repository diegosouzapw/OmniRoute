import { test } from "node:test";
import assert from "node:assert/strict";

import { STREAM_RECOVERY } from "../../open-sse/config/constants.ts";
import {
  HoldbackBuffer,
  TruncatedStreamError,
  isRetryableStreamError,
  hasTerminalMarker,
  createRecoverableStream,
} from "../../open-sse/services/streamRecovery.ts";

const enc = (s: string) => new TextEncoder().encode(s);

/** Build a mock upstream stream that emits `chunks` then ends via close or error. */
function makeStream(chunks: string[], end: "close" | Error): ReadableStream<Uint8Array> {
  let i = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i < chunks.length) {
        controller.enqueue(enc(chunks[i++]));
        return;
      }
      if (end instanceof Error) controller.error(end);
      else controller.close();
    },
  });
}

async function readAll(
  rs: ReadableStream<Uint8Array>
): Promise<{ text: string; errored: Error | null }> {
  const reader = rs.getReader();
  const dec = new TextDecoder();
  let text = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) text += dec.decode(value, { stream: true });
    }
    return { text, errored: null };
  } catch (e) {
    return { text, errored: e as Error };
  }
}

const econnreset = () => Object.assign(new Error("socket reset"), { code: "ECONNRESET" });

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

test("createRecoverableStream retries an early truncation transparently", async () => {
  let finalizeCount = 0;
  let reopened = 0;
  // Attempt 1 emits 2 held chunks then the socket resets before any commit.
  const attempt1 = makeStream(["data: a\n\n", "data: b\n\n"], econnreset());
  const attempt2 = makeStream(["data: x\n\n", "data: [DONE]\n\n"], "close");

  const rs = createRecoverableStream(
    attempt1,
    async () => {
      reopened++;
      return attempt2;
    },
    { finalize: () => finalizeCount++, now: () => 0 } // frozen clock: no time-based commit
  );

  const { text, errored } = await readAll(rs);
  assert.equal(errored, null);
  assert.equal(reopened, 1, "should re-open exactly once");
  assert.equal(text, "data: x\n\ndata: [DONE]\n\n", "client sees ONLY the recovered attempt");
  assert.equal(finalizeCount, 1, "finalize runs exactly once");
});

test("createRecoverableStream emits the held partial and closes when reopen fails", async () => {
  let finalizeCount = 0;
  // Graceful end with NO terminal marker = silent truncation; reopen can't recover.
  const attempt1 = makeStream(["data: partial\n\n"], "close");

  const rs = createRecoverableStream(attempt1, async () => null, {
    finalize: () => finalizeCount++,
    now: () => 0,
  });

  const { text, errored } = await readAll(rs);
  assert.equal(errored, null);
  assert.equal(text, "data: partial\n\n", "best-effort: held bytes are still delivered");
  assert.equal(finalizeCount, 1);
});

test("createRecoverableStream propagates errors once committed (never replays)", async () => {
  let reopened = 0;
  let finalizeCount = 0;
  const big = "x".repeat(STREAM_RECOVERY.BUFFER_MAX_BYTES + 10); // forces immediate commit
  const attempt1 = makeStream([big, "data: more\n\n"], econnreset());

  const rs = createRecoverableStream(
    attempt1,
    async () => {
      reopened++;
      return makeStream(["data: nope\n\n"], "close");
    },
    { finalize: () => finalizeCount++, now: () => 0 }
  );

  const { errored } = await readAll(rs);
  assert.ok(errored, "a post-commit failure must surface to the client");
  assert.equal(reopened, 0, "must NOT re-open after the client has already seen bytes");
  assert.equal(finalizeCount, 1);
});

test("createRecoverableStream passes a clean short stream straight through", async () => {
  let reopened = 0;
  let finalizeCount = 0;
  const attempt1 = makeStream(["data: hi\n\n", "data: [DONE]\n\n"], "close");

  const rs = createRecoverableStream(
    attempt1,
    async () => {
      reopened++;
      return null;
    },
    { finalize: () => finalizeCount++, now: () => 0 }
  );

  const { text, errored } = await readAll(rs);
  assert.equal(errored, null);
  assert.equal(reopened, 0, "a clean stream must not trigger recovery");
  assert.equal(text, "data: hi\n\ndata: [DONE]\n\n");
  assert.equal(finalizeCount, 1);
});

test("createRecoverableStream stops after maxEarlyRetries", async () => {
  let reopened = 0;
  let finalizeCount = 0;
  const attempt1 = makeStream(["data: t\n\n"], "close"); // truncated (no terminal marker)

  const rs = createRecoverableStream(
    attempt1,
    async () => {
      reopened++;
      return makeStream(["data: t\n\n"], "close"); // every retry truncates too
    },
    { finalize: () => finalizeCount++, now: () => 0, maxEarlyRetries: 2 }
  );

  const { errored } = await readAll(rs);
  assert.equal(errored, null);
  assert.equal(reopened, 2, "should re-open exactly maxEarlyRetries times, then give up");
  assert.equal(finalizeCount, 1);
});

test("createRecoverableStream finalizes on client cancel", async () => {
  let finalizeCount = 0;
  const attempt1 = makeStream(["data: a\n\n"], "close");
  const rs = createRecoverableStream(attempt1, async () => null, {
    finalize: () => finalizeCount++,
    now: () => 0,
  });

  const reader = rs.getReader();
  await reader.cancel("client gone");
  assert.equal(finalizeCount, 1);
});

test("createRecoverableStream does not spend an upstream re-open after a client cancel", async () => {
  let reopened = 0;
  let finalizeCount = 0;
  const attempt1 = makeStream(["data: a\n\n"], "close");
  const rs = createRecoverableStream(
    attempt1,
    async () => {
      reopened++;
      return makeStream(["data: t\n\n"], "close");
    },
    { finalize: () => finalizeCount++, now: () => 0 }
  );

  const reader = rs.getReader();
  await reader.cancel("client gone");
  await new Promise((r) => setTimeout(r, 10)); // let any in-flight pull settle
  assert.equal(reopened, 0, "a client cancel must never trigger a transparent re-open");
  assert.equal(finalizeCount, 1);
});
