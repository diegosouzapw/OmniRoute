// #12861 — proxyFetch: DIRECT_RESPONSE_START_TIMEOUT escapes as
// unhandledRejection -> uncaughtException, server process exits.
//
// A narrow race: if the timer fires AFTER the wrapped fetch has already
// settled (resolved or rejected) — e.g. the awaiting frame was already torn
// down — aborting the (by-then-irrelevant) AbortController can deliver its
// abort reason to a promise nobody is awaiting anymore, which Node promotes
// to an unhandledRejection -> uncaughtException. These tests use node:test's
// mock timer API to deterministically force exactly that ordering, rather
// than relying on real wall-clock timing (which cannot reliably reproduce a
// race this narrow).
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import {
  directFetchWithBoundedResponseStart,
  isDirectResponseStartTimeout,
  resolveDirectHeadersTimeoutMs,
} from "../../open-sse/utils/directResponseStartTimeout.ts";

test.afterEach(() => {
  mock.timers.reset();
});

test("resolves normally when the fetch settles well before the timeout", async () => {
  const response = new Response("ok");
  const result = await directFetchWithBoundedResponseStart(
    "http://example.test",
    {},
    async () => response,
    30_000
  );
  assert.equal(result, response);
});

test("rejects with DIRECT_RESPONSE_START_TIMEOUT when the fetch never settles before the timeout", async () => {
  mock.timers.enable({ apis: ["setTimeout"] });
  try {
    const fetchImpl = (_input: RequestInfo | URL, options: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        options.signal?.addEventListener("abort", () => {
          reject((options.signal as AbortSignal).reason);
        });
      });

    const pending = directFetchWithBoundedResponseStart(
      "http://example.test",
      {},
      fetchImpl,
      5_000
    );
    const assertion = assert.rejects(pending, (err: unknown) => {
      assert.equal(isDirectResponseStartTimeout(err), true);
      return true;
    });

    await Promise.resolve();
    mock.timers.tick(5_000);
    await assertion;
  } finally {
    mock.timers.reset();
  }
});

test("#12861: a timer firing AFTER the fetch already settled does not escape as an unhandled rejection", async () => {
  // This is the actual race the report describes: `clearTimeout()` runs in
  // the `finally` block, but the timer callback has already been dequeued by
  // the time it runs, so clearing it has no effect. Node's real timer/
  // microtask scheduler can't be forced into that exact interleaving
  // deterministically from a test, so the observable consequence is forced
  // directly instead: neuter clearTimeout so the timer fires regardless of
  // whether the code "tried" to cancel it, exactly as it would if clearTimeout
  // had lost that race.
  const realClearTimeout = globalThis.clearTimeout;
  const realSetTimeout = globalThis.setTimeout;
  globalThis.clearTimeout = (() => {}) as typeof clearTimeout;

  let unhandled: unknown = null;
  const onUnhandledRejection = (reason: unknown) => {
    unhandled = reason;
  };
  process.on("unhandledRejection", onUnhandledRejection);

  try {
    const response = new Response("ok");
    // Simulates what a real fetch/undici implementation does internally: some
    // async chain tied to the same abort signal that the OUTER caller never
    // awaits or attaches a .catch() to (e.g. background body-stream cleanup).
    // This is the actual mechanism the issue traces the escaped rejection
    // back to — not the outer `await fetchImpl(...)` itself, which normal
    // control flow already handles fine.
    const fetchImpl = async (_input: RequestInfo | URL, options: RequestInit) => {
      const detachedInternalChain = new Promise<never>((_resolve, reject) => {
        options.signal?.addEventListener(
          "abort",
          () => reject((options.signal as AbortSignal).reason),
          { once: true }
        );
      });
      void detachedInternalChain;
      return response;
    };

    const result = await directFetchWithBoundedResponseStart(
      "http://example.test",
      {},
      fetchImpl,
      10
    );
    assert.equal(result, response);

    // Real timer, real (short) wait — clearTimeout was neutered above, so the
    // 10ms timer WILL fire regardless of the `finally` block having "tried"
    // to clear it, exactly reproducing the reported race's end state.
    await new Promise((resolve) => realSetTimeout(resolve, 50));

    assert.equal(unhandled, null, "post-settlement timer fire must not produce a rejection");
  } finally {
    globalThis.clearTimeout = realClearTimeout;
    process.off("unhandledRejection", onUnhandledRejection);
  }
});

test("#12861: a timer firing AFTER the fetch already rejected (for an unrelated reason) does not escape either", async () => {
  const realClearTimeout = globalThis.clearTimeout;
  const realSetTimeout = globalThis.setTimeout;
  globalThis.clearTimeout = (() => {}) as typeof clearTimeout;

  let unhandled: unknown = null;
  const onUnhandledRejection = (reason: unknown) => {
    unhandled = reason;
  };
  process.on("unhandledRejection", onUnhandledRejection);

  try {
    const clientAbortError = Object.assign(new Error("aborted"), { code: "ECONNRESET" });
    const fetchImpl = async (_input: RequestInfo | URL, options: RequestInit) => {
      const detachedInternalChain = new Promise<never>((_resolve, reject) => {
        options.signal?.addEventListener(
          "abort",
          () => reject((options.signal as AbortSignal).reason),
          { once: true }
        );
      });
      void detachedInternalChain;
      throw clientAbortError;
    };

    await assert.rejects(
      directFetchWithBoundedResponseStart("http://example.test", {}, fetchImpl, 10),
      clientAbortError
    );

    await new Promise((resolve) => realSetTimeout(resolve, 50));

    assert.equal(unhandled, null, "post-settlement timer fire must not produce a rejection");
  } finally {
    globalThis.clearTimeout = realClearTimeout;
    process.off("unhandledRejection", onUnhandledRejection);
  }
});

test("passes through immediately with no timer when timeoutMs is 0 or negative", async () => {
  const response = new Response("ok");
  const result = await directFetchWithBoundedResponseStart(
    "http://example.test",
    {},
    async () => response,
    0
  );
  assert.equal(result, response);
});

test("resolveDirectHeadersTimeoutMs defaults to 30000 and respects OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS", () => {
  assert.equal(resolveDirectHeadersTimeoutMs({}), 30_000);
  assert.equal(resolveDirectHeadersTimeoutMs({ OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "5000" }), 5_000);
  assert.equal(resolveDirectHeadersTimeoutMs({ OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "" }), 30_000);
  assert.equal(resolveDirectHeadersTimeoutMs({ OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "not-a-number" }), 0);
});
