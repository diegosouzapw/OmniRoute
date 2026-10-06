import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agy-lease-lifecycle-"));

const state = await import("../../src/sse/services/antigravityRoutingState.ts");
const lifecycle = await import("../../src/sse/services/antigravityLeaseLifecycle.ts");

const MODEL = "gemini-3.7-flash-high";

test.beforeEach(() => state.__resetAntigravityRoutingStateForTests());

function acquire() {
  const result = state.tryAcquireAntigravityLease({
    connectionId: "account-a",
    requestedModel: MODEL,
  });
  assert.equal(result.kind, "acquired");
  if (result.kind !== "acquired") throw new Error("unreachable");
  return result.lease;
}

function held(): boolean {
  return !state.getAntigravityLeaseAvailability({
    connectionId: "account-a",
    requestedModel: MODEL,
  }).available;
}

function sseResponse(body: ReadableStream<Uint8Array>): Response {
  return new Response(body, { headers: { "content-type": "text/event-stream" } });
}

test("only an event-stream response is treated as streaming", () => {
  assert.equal(
    lifecycle.isStreamingAntigravityResponse(
      new Response("{}", { headers: { "content-type": "text/event-stream; charset=utf-8" } })
    ),
    true
  );
  assert.equal(
    lifecycle.isStreamingAntigravityResponse(
      new Response("{}", { headers: { "content-type": "application/json" } })
    ),
    false
  );
  assert.equal(lifecycle.isStreamingAntigravityResponse({ headers: {} }), false);
});

test("the lease is held for the whole stream and released on EOF", async () => {
  const lease = acquire();
  let controller!: ReadableStreamDefaultController<Uint8Array>;
  const response = lifecycle.holdAntigravityLeaseThroughResponse(
    sseResponse(
      new ReadableStream({
        start(c) {
          controller = c;
        },
      })
    ),
    lease.id,
    null
  );
  const reader = response.body!.getReader();

  controller.enqueue(new TextEncoder().encode("data: chunk\n\n"));
  const first = await reader.read();
  assert.equal(first.done, false);
  // Mid-stream the account is still reserved.
  assert.equal(held(), true);

  controller.close();
  await reader.read();
  assert.equal(held(), false);
});

test("the lease is released when the stream is cancelled", async () => {
  const lease = acquire();
  const response = lifecycle.holdAntigravityLeaseThroughResponse(
    sseResponse(new ReadableStream()),
    lease.id,
    null
  );
  assert.equal(held(), true);
  await response.body!.cancel();
  assert.equal(held(), false);
});

test("the lease is released when the client aborts", async () => {
  const lease = acquire();
  const abort = new AbortController();
  const response = lifecycle.holdAntigravityLeaseThroughResponse(
    sseResponse(new ReadableStream()),
    lease.id,
    abort.signal
  );
  assert.equal(held(), true);
  abort.abort();
  // The abort listener cancels the reader asynchronously.
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal(held(), false);
  // Consume so the wrapper stream is not left dangling.
  await response.body!.cancel().catch(() => {});
});

test("without a lease id the response is passed through untouched", () => {
  const original = sseResponse(new ReadableStream());
  assert.equal(lifecycle.holdAntigravityLeaseThroughResponse(original, undefined, null), original);
  assert.equal(lifecycle.holdAntigravityLeaseThroughResponse(original, null, null), original);
});

test("a pre-dispatch failure frees the selector-owned lease and rethrows untouched", async () => {
  const lease = acquire();
  const failing = Promise.reject(new Error("reasoning rule failed")).catch(
    lifecycle.releasingRethrow(lease.id)
  );
  await assert.rejects(failing, /reasoning rule failed/);
  assert.equal(held(), false);
});

test("a successful pre-dispatch step keeps the lease and its resolved value", async () => {
  const lease = acquire();
  const value = await Promise.resolve(42).catch(lifecycle.releasingRethrow(lease.id));
  assert.equal(value, 42);
  assert.equal(held(), true);
});

test("release() is the fenced registry release re-exported for the dispatch path", () => {
  const lease = acquire();
  assert.equal(lifecycle.release("not-a-lease"), false);
  assert.equal(held(), true);
  assert.equal(lifecycle.release(lease.id), true);
  assert.equal(held(), false);
});

test("startAntigravityLeaseRequest is inert for every non-Antigravity provider", () => {
  const openai = lifecycle.startAntigravityLeaseRequest("openai", "req-1");
  assert.equal(openai.on, false);
  // Off ⇒ no correlation id is even carried, and the flag store is never read.
  assert.equal(openai.requestId, "");
  assert.equal(openai.earliestRetryHintAtMs, null);
  assert.equal(openai.attempted.size, 0);
});

test("trackAntigravityLeaseBusy memoizes the account and the earliest retry hint", () => {
  const state = lifecycle.startAntigravityLeaseRequest("antigravity", "req-2");
  assert.equal(
    lifecycle.trackAntigravityLeaseBusy(state, {
      leaseUnavailable: true,
      selectedConnectionId: "account-a",
      retryHintAtMs: 5_000,
    }),
    "account-a"
  );
  lifecycle.trackAntigravityLeaseBusy(state, {
    leaseUnavailable: true,
    selectedConnectionId: "account-b",
    retryHintAtMs: 3_000,
  });
  lifecycle.trackAntigravityLeaseBusy(state, {
    leaseUnavailable: true,
    selectedConnectionId: "account-c",
    retryHintAtMs: 9_000,
  });
  assert.deepEqual([...state.attempted], ["account-a", "account-b", "account-c"]);
  assert.equal(state.earliestRetryHintAtMs, 3_000);
});
