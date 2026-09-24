import assert from "node:assert/strict";
import test from "node:test";

import {
  RESPONSES_FIRST_BYTE_TIMEOUT_CODE,
  guardFirstByte,
  guardResponsesStreamFirstByte,
  isResponsesFirstByteTimeout,
} from "../../open-sse/utils/firstByteWatchdog.ts";
import {
  DEFAULT_RESPONSES_FIRST_BYTE_TIMEOUT_MS,
  getResponsesFirstByteTimeoutMs,
} from "../../src/shared/utils/runtimeTimeouts.ts";

const encoder = new TextEncoder();

function neverYieldingBody(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    pull() {
      // Never enqueue, never close.
    },
  });
}

function chunksBody(chunks: string[]): ReadableStream<Uint8Array> {
  let i = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i < chunks.length) controller.enqueue(encoder.encode(chunks[i++]));
      else controller.close();
    },
  });
}

const OPTIONS = {
  code: "TEST_CODE",
  message: (ms: number) => `no first byte within ${ms}ms`,
};

test("a healthy body passes through byte for byte", { timeout: 5000 }, async () => {
  const response = new Response(chunksBody(["data: a\n\n", "data: b\n\n"]), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
  const guarded = await guardFirstByte(response, {
    ...OPTIONS,
    timeoutMs: 200,
  });
  assert.equal(guarded.status, 200);
  assert.equal(guarded.headers.get("content-type"), "text/event-stream");
  assert.equal(await guarded.text(), "data: a\n\ndata: b\n\n");
});

test(
  "a body that never yields throws a TimeoutError carrying the caller code",
  { timeout: 5000 },
  async () => {
    const response = new Response(neverYieldingBody(), { status: 200 });
    const started = Date.now();
    await assert.rejects(
      guardFirstByte(response, { ...OPTIONS, timeoutMs: 60 }),
      (err: unknown) => {
        assert.ok(err instanceof Error);
        assert.equal(err.name, "TimeoutError");
        assert.equal((err as Error & { code?: string }).code, "TEST_CODE");
        assert.equal(err.message, "no first byte within 60ms");
        return true;
      }
    );
    assert.ok(Date.now() - started < 1000);
  }
);

test("timeoutMs <= 0 returns the same response untouched", async () => {
  const response = new Response(neverYieldingBody(), { status: 200 });
  assert.equal(await guardFirstByte(response, { ...OPTIONS, timeoutMs: 0 }), response);
});

test("an immediately closed body passes", { timeout: 5000 }, async () => {
  const response = new Response(chunksBody([]), { status: 200 });
  const guarded = await guardFirstByte(response, {
    ...OPTIONS,
    timeoutMs: 200,
  });
  assert.equal(await guarded.text(), "");
});

test("the passthrough reads upstream on demand, not eagerly", { timeout: 5000 }, async () => {
  let upstreamPulls = 0;
  const infinite = new ReadableStream<Uint8Array>({
    pull(controller) {
      upstreamPulls++;
      controller.enqueue(encoder.encode("x"));
    },
  });
  const guarded = await guardFirstByte(new Response(infinite, { status: 200 }), {
    ...OPTIONS,
    timeoutMs: 200,
  });
  await new Promise((resolve) => setTimeout(resolve, 50));
  assert.ok(upstreamPulls < 10, `upstream pulled ${upstreamPulls} times without a reader`);
  await guarded.body?.cancel();
});

test("an aborted signal rejects without waiting for the timer", { timeout: 5000 }, async () => {
  const controller = new AbortController();
  const response = new Response(neverYieldingBody(), { status: 200 });
  const started = Date.now();
  const pending = guardFirstByte(response, {
    ...OPTIONS,
    timeoutMs: 10_000,
    signal: controller.signal,
  });
  setTimeout(() => controller.abort(), 20);
  await assert.rejects(pending, (err: unknown) => {
    assert.ok(err instanceof Error);
    assert.equal(err.name, "AbortError");
    return true;
  });
  assert.ok(Date.now() - started < 1000);
});

test(
  "the Responses helper tags its timeout so callers can recognise it",
  { timeout: 5000 },
  async () => {
    const response = new Response(neverYieldingBody(), { status: 200 });
    await assert.rejects(guardResponsesStreamFirstByte(response, 40), (err: unknown) => {
      assert.equal((err as Error & { code?: string }).code, RESPONSES_FIRST_BYTE_TIMEOUT_CODE);
      assert.equal(isResponsesFirstByteTimeout(err), true);
      return true;
    });
    assert.equal(isResponsesFirstByteTimeout(new Error("fetch failed")), false);
  }
);

test("Responses first-byte timeout defaults to 15s, accepts 0, ignores garbage", () => {
  assert.equal(DEFAULT_RESPONSES_FIRST_BYTE_TIMEOUT_MS, 15_000);
  assert.equal(getResponsesFirstByteTimeoutMs({}), 15_000);
  assert.equal(getResponsesFirstByteTimeoutMs({ RESPONSES_FIRST_BYTE_TIMEOUT_MS: "0" }), 0);
  assert.equal(getResponsesFirstByteTimeoutMs({ RESPONSES_FIRST_BYTE_TIMEOUT_MS: "250" }), 250);
  assert.equal(getResponsesFirstByteTimeoutMs({ RESPONSES_FIRST_BYTE_TIMEOUT_MS: "abc" }), 15_000);
});
