import test from "node:test";
import assert from "node:assert/strict";
import { getEventListeners } from "node:events";

import {
  createBodyTimeoutError,
  createUpstreamStartTimeoutError,
  createAbortError,
  executeWithUpstreamStartTimeout,
  computeBillableTokens,
  getExecutorTimeoutMs,
  normalizeExecutorResult,
} from "../../open-sse/handlers/chatCore/upstreamTimeouts.ts";

test("error factories set name and message", () => {
  const body = createBodyTimeoutError(1234);
  assert.equal(body.name, "BodyTimeoutError");
  assert.match(body.message, /1234ms/);

  const start = createUpstreamStartTimeoutError(500, "openai", "gpt-4o");
  assert.equal(start.name, "TimeoutError");
  assert.match(start.message, /openai\/gpt-4o/);

  const ctrl = new AbortController();
  ctrl.abort("nope");
  const ab = createAbortError(ctrl.signal);
  assert.equal(ab.name, "AbortError");
});

test("computeBillableTokens sums input+output+reasoning (no cache double-count)", () => {
  const total = computeBillableTokens({
    prompt_tokens: 10,
    completion_tokens: 5,
    reasoning_tokens: 2,
  });
  assert.equal(total, 17);
});

test("getExecutorTimeoutMs floors valid values and falls back to default", () => {
  assert.equal(getExecutorTimeoutMs({ getTimeoutMs: () => 1234.9 }), 1234);
  assert.equal(getExecutorTimeoutMs({ getTimeoutMs: () => NaN }), getExecutorTimeoutMs(null));
  assert.ok(Number.isFinite(getExecutorTimeoutMs(null)));
});

test("normalizeExecutorResult wraps bare Response and passes through rich result", () => {
  const r = new Response("x");
  const wrapped = normalizeExecutorResult(r);
  assert.equal(wrapped.response, r);
  assert.equal(wrapped.url, "");
  const rich = normalizeExecutorResult({ response: r, url: "u", headers: { a: "b" } });
  assert.equal(rich.url, "u");
  assert.equal(rich.headers.a, "b");
});

test("normalizeExecutorResult rejects malformed executor output", () => {
  assert.throws(() => normalizeExecutorResult({}), /must contain a Response/);
  assert.throws(
    () => normalizeExecutorResult({ response: "not-a-response" }),
    /must contain a Response/
  );
});
test("executeWithUpstreamStartTimeout leaves no abort listener on the client signal after a resolving execute", async () => {
  const client = new AbortController();
  const before = getEventListeners(client.signal, "abort").length;
  const result = await executeWithUpstreamStartTimeout({
    executor: {},
    provider: "test-provider",
    model: "test-model",
    connectionTimeoutMs: 5_000,
    signal: client.signal,
    execute: async () => "ok",
  });
  assert.equal(result, "ok");
  assert.equal(
    getEventListeners(client.signal, "abort").length,
    before,
    "every listener registered for the race must be removed once it settles"
  );
});

test("executeWithUpstreamStartTimeout releases the client-abort link when the settled Response has no body", async () => {
  const client = new AbortController();
  const before = getEventListeners(client.signal, "abort").length;
  let inner: AbortSignal | null = null;
  const result = await executeWithUpstreamStartTimeout({
    executor: {},
    provider: "test-provider",
    model: "test-model",
    connectionTimeoutMs: 5_000,
    signal: client.signal,
    execute: async (s) => {
      inner = s;
      return { response: new Response(null, { status: 204 }) };
    },
  });
  assert.equal(result.response.status, 204);
  assert.equal(getEventListeners(client.signal, "abort").length, before);
  client.abort();
  assert.equal(inner!.aborted, false, "no live body, so the link must already be gone");
});

test("executeWithUpstreamStartTimeout keeps exactly one client-abort link while the settled body can still stream (#14342)", async () => {
  const client = new AbortController();
  const before = getEventListeners(client.signal, "abort").length;
  let inner: AbortSignal | null = null;
  await executeWithUpstreamStartTimeout({
    executor: {},
    provider: "test-provider",
    model: "test-model",
    connectionTimeoutMs: 5_000,
    signal: client.signal,
    execute: async (s) => {
      inner = s;
      return { response: new Response(new ReadableStream({ pull() {} })) };
    },
  });
  assert.equal(getEventListeners(client.signal, "abort").length, before + 1);
  client.abort("client_gone");
  assert.equal(inner!.aborted, true, "a client abort after headers must reach the upstream signal");
  assert.equal(getEventListeners(client.signal, "abort").length, before);
});

test("executeWithUpstreamStartTimeout: a synchronously throwing execute cannot orphan abortPromise (2026-08-31 hedge-cancelled exit)", async () => {
  // Production shape: execute() threw before Promise.race subscribed, so the
  // abortPromise listener stayed on the long-lived client signal with nobody
  // awaiting its rejection. The next hedge cancellation / client disconnect
  // then aborted that signal with a string reason and the rejection became an
  // unhandledRejection: `Error [AbortError]: hedge-cancelled`.
  const client = new AbortController();
  const before = getEventListeners(client.signal, "abort").length;
  await assert.rejects(
    executeWithUpstreamStartTimeout({
      executor: {},
      provider: "test-provider",
      model: "test-model",
      connectionTimeoutMs: 5_000,
      signal: client.signal,
      execute: () => {
        throw new Error("sync failure before the race subscribed");
      },
    }),
    /sync failure before the race subscribed/
  );
  assert.equal(
    getEventListeners(client.signal, "abort").length,
    before,
    "no listener may leak onto the client signal when execute() throws synchronously"
  );

  let unhandled: unknown = null;
  const onUnhandled = (reason: unknown) => {
    unhandled = reason;
  };
  process.on("unhandledRejection", onUnhandled);
  try {
    client.abort("hedge-cancelled");
    await new Promise((resolve) => setTimeout(resolve, 25));
  } finally {
    process.off("unhandledRejection", onUnhandled);
  }
  assert.equal(
    unhandled,
    null,
    "a late abort must not surface as an unhandledRejection: " + String(unhandled)
  );
});
