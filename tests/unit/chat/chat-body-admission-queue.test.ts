// #9654: queue-wait, AbortSignal cancellation, and the queued-bytes heap valve.
// Split from chat-body-admission.test.ts to stay under the 1000-line new-file cap.
import test from "node:test";
import assert from "node:assert/strict";

const admissionModule = await import("../../../src/shared/middleware/chatBodyAdmission.ts");
const {
  admitChatRequest,
  admitChatStructure,
  ChatAdmissionController,
  CHAT_ADMISSION_QUEUE_MAX_MS,
  CHAT_ADMISSION_MAX_QUEUED_BYTES,
  CHAT_LARGE_BODY_BYTES,
} = admissionModule;

function chatRequest(body: string, contentLength: string | null = String(body.length)): Request {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (contentLength !== null) headers["content-length"] = contentLength;
  return new Request("http://x/v1/chat/completions", {
    method: "POST",
    headers,
    body,
  });
}

test("a heavy structural request waits for capacity instead of failing immediately", async () => {
  const controller = new ChatAdmissionController(1);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const pending = admitChatStructure(
    {
      messages: [
        { role: "user", content: "one" },
        { role: "user", content: "two" },
      ],
    },
    null,
    {
      controller,
      maxMessages: 10,
      heavyMessages: 2,
      heavyTools: 10,
      heavyTokens: 10_000,
      queueMs: 500,
      // #10183/#10268: entry into the bounded-wait path requires real heap
      // pressure now; force it so this test still exercises the wait.
      heapPressureCheck: () => true,
    }
  );

  // Capacity is still busy: the request must not have resolved (admit/reject) yet.
  let settled = false;
  void pending.then(() => {
    settled = true;
  });
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(settled, false, "must wait while capacity is busy");

  held.release();
  const result = await pending;
  assert.equal(result.admit, true);
  if (result.admit) {
    assert.equal(controller.activeHeavy, 1, "waiting request acquires the freed lease");
    result.lease?.release();
  }
  assert.equal(controller.activeHeavy, 0);
});

test("waiting for admission times out into a retryable 503", async () => {
  const controller = new ChatAdmissionController(1);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const started = Date.now();
  const result = await admitChatStructure(
    {
      messages: [
        { role: "user", content: "one" },
        { role: "user", content: "two" },
      ],
    },
    null,
    {
      controller,
      maxMessages: 10,
      heavyMessages: 2,
      heavyTools: 10,
      heavyTokens: 10_000,
      queueMs: 50,
      // #10183/#10268: entry into the bounded-wait/shed path requires real
      // heap pressure now; force it to still exercise the timeout.
      heapPressureCheck: () => true,
    }
  );

  assert.equal(result.admit, false);
  if (!result.admit) {
    assert.equal(result.response.status, 503);
    assert.equal(result.response.headers.get("retry-after"), "1");
    assert.equal((await result.response.json()).error.code, "chat_admission_busy");
  }
  assert.ok(Date.now() - started >= 40, "must wait for the queue deadline before rejecting");
  assert.equal(controller.activeHeavy, 1, "the holder keeps its lease");
  held.release();
  assert.equal(controller.activeHeavy, 0);
});

test("byte-heavy admission waits for capacity when queueMs is set", async () => {
  const controller = new ChatAdmissionController(1);
  const body = JSON.stringify({ messages: [{ role: "user", content: "x".repeat(40) }] });
  const options = {
    controller,
    largeBodyBytes: 32,
    hardMaxBytes: 1024,
    queueMs: 500,
    heapPressureCheck: () => true,
  };

  const first = await admitChatRequest(chatRequest(body), options);
  assert.equal(first.admit, true);
  if (!first.admit) return;

  const second = admitChatRequest(chatRequest(body), options);
  let secondSettled = false;
  void second.then(() => {
    secondSettled = true;
  });
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(
    secondSettled,
    false,
    "second heavy request must queue while the first holds capacity"
  );

  first.lease?.release();
  const secondResult = await second;
  assert.equal(secondResult.admit, true, "second request acquires capacity after release");
  if (secondResult.admit) secondResult.lease?.release();
  assert.equal(controller.activeHeavy, 0);
});

test("expired admission queue keeps the legacy immediate 503 behaviour", async () => {
  const controller = new ChatAdmissionController(1);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const result = await admitChatStructure(
    {
      messages: [
        { role: "user", content: "one" },
        { role: "user", content: "two" },
      ],
    },
    null,
    {
      controller,
      maxMessages: 10,
      heavyMessages: 2,
      heavyTools: 10,
      heavyTokens: 10_000,
      queueMs: 0,
      // #10183/#10268: shedding now requires real heap pressure; force it to
      // still exercise the legacy immediate-reject path.
      heapPressureCheck: () => true,
    }
  );

  assert.equal(result.admit, false);
  if (!result.admit) assert.equal(result.response.status, 503);
  held.release();
});

test("admission waiters are served FIFO as capacity frees", async () => {
  const controller = new ChatAdmissionController(1);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const body = {
    messages: [
      { role: "user", content: "one" },
      { role: "user", content: "two" },
    ],
  };
  const options = {
    controller,
    maxMessages: 10,
    heavyMessages: 2,
    heavyTools: 10,
    heavyTokens: 10_000,
    queueMs: 500,
    // #10183/#10268: entry into the bounded-wait path requires real heap
    // pressure now; force it so both waiters still queue.
    heapPressureCheck: () => true,
  };
  const first = admitChatStructure(body, null, options);
  const second = admitChatStructure(body, null, options);

  held.release();
  const firstResult = await first;
  assert.equal(firstResult.admit, true);
  if (firstResult.admit) firstResult.lease?.release();
  const secondResult = await second;
  assert.equal(secondResult.admit, true);
  if (secondResult.admit) secondResult.lease?.release();
  assert.equal(controller.activeHeavy, 0);
});

// ── AbortSignal support in acquireHeavyWithin (#9654 / U2) ────────────────
// A disconnected client must not keep parking in the admission queue for the
// full queueMs. On abort the waiter is removed from the FIFO immediately and
// the acquire resolves `null` early (the caller's 503 is dropped on the dead
// connection); no capacity is consumed and the freed slot does not wake it.

test("aborting the admission wait settles early, grants no lease, and removes the waiter", async () => {
  const controller = new ChatAdmissionController(1);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const abortController = new AbortController();
  const pending = controller.acquireHeavyWithin(2_000, abortController.signal);

  // Parked while capacity is busy.
  let settled = false;
  void pending.then(() => {
    settled = true;
  });
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(settled, false, "must be parked while capacity is busy");

  abortController.abort();

  // Must settle well before the 2s deadline.
  let settledAfterAbort = false;
  void pending.then(() => {
    settledAfterAbort = true;
  });
  await new Promise((resolve) => setTimeout(resolve, 50));
  assert.equal(
    settledAfterAbort,
    true,
    "abort must settle the wait promptly, not park for queueMs"
  );

  const lease = await pending;
  assert.equal(lease, null, "abort must not grant a lease");
  assert.equal(
    controller.activeHeavy,
    1,
    "the holder keeps its lease; the aborted wait consumed nothing"
  );

  // Releasing must NOT wake the removed waiter: capacity stays free.
  held.release();
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(controller.activeHeavy, 0, "releasing after abort must not wake the removed waiter");
});

test("aborting the head waiter preserves FIFO order for remaining waiters", async () => {
  const controller = new ChatAdmissionController(1);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const firstAbort = new AbortController();
  const first = controller.acquireHeavyWithin(2_000, firstAbort.signal);
  const second = controller.acquireHeavyWithin(2_000);

  // Both are parked, head-first.
  await new Promise((resolve) => setTimeout(resolve, 30));

  // Abort the HEAD waiter: it must leave the queue without disturbing the rest.
  firstAbort.abort();
  assert.equal(await first, null, "head waiter returns null on abort");

  // The remaining waiter is now first in line and must get the freed capacity.
  held.release();
  const secondLease = await second;
  assert.ok(secondLease, "remaining waiter must acquire the freed capacity");
  secondLease?.release();
  assert.equal(controller.activeHeavy, 0);
});

// ── Heap-pressure safety valve (#9654 / U3) ───────────────────────────────
// The queue-wait parks fully-buffered bodies; the queued-bytes cap bounds the
// total buffered memory parked per lane so the wait cannot recreate the #4380
// heap amplification. Over-budget waits are rejected immediately (503).

test("queued-bytes cap rejects an over-budget wait without parking", async () => {
  const controller = new ChatAdmissionController(1, 200);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  // First waiter parks within budget.
  const first = controller.acquireHeavyWithin(2_000, undefined, 150);
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(controller.queuedBytes, 150);

  // Second waiter would push the total over the 200-byte budget → must NOT park.
  const started = Date.now();
  const second = await controller.acquireHeavyWithin(2_000, undefined, 100);
  assert.equal(second, null, "over-budget wait must be rejected");
  assert.ok(Date.now() - started < 500, "rejection must be immediate, not park for queueMs");
  assert.equal(controller.queuedBytes, 150, "rejected waiter must not be charged");
  assert.equal(controller.activeHeavy, 1, "holder keeps its lease");

  // Free the slot: the parked waiter acquires and its bytes leave the queue.
  held.release();
  const firstLease = await first;
  assert.ok(firstLease, "in-budget waiter acquires the freed slot");
  assert.equal(controller.queuedBytes, 0, "acquired waiter's bytes must leave the queue");
  firstLease?.release();
  assert.equal(controller.activeHeavy, 0);
});

test("aborting a parked wait releases its queued bytes", async () => {
  const controller = new ChatAdmissionController(1, 1_000);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const abortController = new AbortController();
  const pending = controller.acquireHeavyWithin(2_000, abortController.signal, 400);
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(controller.queuedBytes, 400);

  abortController.abort();
  assert.equal(await pending, null);
  assert.equal(controller.queuedBytes, 0, "abort must release the charged bytes");

  held.release();
  assert.equal(controller.activeHeavy, 0);
});

test("a timed-out wait releases its queued bytes", async () => {
  const controller = new ChatAdmissionController(1, 1_000);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const pending = controller.acquireHeavyWithin(50, undefined, 400);
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(controller.queuedBytes, 400);

  assert.equal(await pending, null);
  assert.equal(controller.queuedBytes, 0, "timeout must release the charged bytes");
  held.release();
  assert.equal(controller.activeHeavy, 0);
});

test("byte-heavy admission enforces the queued-bytes cap end-to-end", async () => {
  const controller = new ChatAdmissionController(1, 100);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const body = JSON.stringify({ messages: [{ role: "user", content: "x".repeat(40) }] });
  const options = {
    controller,
    largeBodyBytes: 32,
    hardMaxBytes: 1024,
    queueMs: 2_000,
    heapPressureCheck: () => true,
  };

  // First request parks: declared length (~70B) fits the budget.
  const first = admitChatRequest(chatRequest(body), options);
  await new Promise((resolve) => setTimeout(resolve, 30));

  // Second request would exceed the 100-byte budget → rejected immediately.
  const started = Date.now();
  const second = await admitChatRequest(chatRequest(body), options);
  assert.equal(second.admit, false, "over-budget byte-heavy wait must not admit");
  if (!second.admit) assert.equal(second.response.status, 503);
  assert.ok(Date.now() - started < 500, "over-budget wait must reject immediately");

  held.release();
  const firstResult = await first;
  assert.equal(firstResult.admit, true);
  if (firstResult.admit) firstResult.lease?.release();
  assert.equal(controller.activeHeavy, 0);
});

test("structural admission enforces the queued-bytes cap end-to-end", async () => {
  const controller = new ChatAdmissionController(1, CHAT_LARGE_BODY_BYTES);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const structural = {
    messages: [
      { role: "user", content: "one" },
      { role: "user", content: "two" },
    ],
  };
  const options = {
    controller,
    maxMessages: 10,
    heavyMessages: 2,
    heavyTools: 10,
    heavyTokens: 10_000,
    queueMs: 2_000,
    // #10183/#10268: entry into the bounded-wait path requires real heap
    // pressure now; force it so the queued-bytes cap is still exercised.
    heapPressureCheck: () => true,
  };

  // First structural wait parks, charging the conservative 256KB weight.
  const first = admitChatStructure(structural, null, options);
  await new Promise((resolve) => setTimeout(resolve, 30));

  // Second would double the charge → rejected immediately.
  const started = Date.now();
  const second = await admitChatStructure(structural, null, options);
  assert.equal(second.admit, false, "over-budget structural wait must not admit");
  if (!second.admit) assert.equal(second.response.status, 503);
  assert.ok(Date.now() - started < 500, "over-budget structural wait must reject immediately");

  held.release();
  const firstResult = await first;
  assert.equal(firstResult.admit, true);
  if (firstResult.admit) firstResult.lease?.release();
  assert.equal(controller.activeHeavy, 0);
});

test("queue-wait defaults are bounded (2s wait, 4MB queued-bytes budget)", () => {
  if (process.env.OMNIROUTE_CHAT_ADMISSION_QUEUE_MS === undefined) {
    assert.equal(CHAT_ADMISSION_QUEUE_MAX_MS, 2_000);
  }
  if (process.env.OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES === undefined) {
    assert.equal(CHAT_ADMISSION_MAX_QUEUED_BYTES, 4 * 1024 * 1024);
  }
});

test("a pre-aborted signal never parks in the admission queue", async () => {
  const controller = new ChatAdmissionController(1);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const abortController = new AbortController();
  abortController.abort("client already disconnected");

  const pending = controller.acquireHeavyWithin(2_000, abortController.signal);
  let settled = false;
  void pending.then(() => {
    settled = true;
  });
  await new Promise((resolve) => setTimeout(resolve, 50));
  assert.equal(settled, true, "a pre-aborted signal must settle immediately, not park");

  const lease = await pending;
  assert.equal(lease, null, "no lease is granted after abort");
  assert.equal(controller.activeHeavy, 1, "holder keeps capacity; aborted wait consumed nothing");
  held.release();
  assert.equal(controller.activeHeavy, 0);
});

test("aborting the request signal cancels a queued byte-heavy wait", async () => {
  const controller = new ChatAdmissionController(1);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const abortController = new AbortController();
  const body = JSON.stringify({ messages: [{ role: "user", content: "x".repeat(40) }] });
  const request = new Request("http://x/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    signal: abortController.signal,
  });
  const pending = admitChatRequest(request, {
    controller,
    largeBodyBytes: 32,
    hardMaxBytes: 1024,
    queueMs: 2_000,
    heapPressureCheck: () => true,
  });

  let settled = false;
  void pending.then(() => {
    settled = true;
  });
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(settled, false, "must queue while capacity is busy");

  abortController.abort();
  const started = Date.now();
  const result = await pending;
  assert.ok(
    Date.now() - started < 500,
    "abort must cancel the queue-wait early, not park the full queueMs"
  );
  assert.equal(result.admit, false, "abort must not admit");
  if (!result.admit) {
    assert.equal(result.response.status, 503);
    assert.equal((await result.response.json()).error.code, "chat_admission_busy");
  }
  assert.equal(controller.activeHeavy, 1, "holder keeps capacity; aborted wait consumed nothing");
  held.release();
  assert.equal(controller.activeHeavy, 0);
});

test("aborting the signal cancels a structural queue-wait", async () => {
  const controller = new ChatAdmissionController(1);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);

  const abortController = new AbortController();
  const pending = admitChatStructure(
    {
      messages: [
        { role: "user", content: "one" },
        { role: "user", content: "two" },
      ],
    },
    null,
    {
      controller,
      maxMessages: 10,
      heavyMessages: 2,
      heavyTools: 10,
      heavyTokens: 10_000,
      queueMs: 2_000,
      signal: abortController.signal,
      // #10183/#10268: entry into the bounded-wait path requires real heap
      // pressure now; force it so the abort is still exercised mid-wait.
      heapPressureCheck: () => true,
    }
  );

  let settled = false;
  void pending.then(() => {
    settled = true;
  });
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(settled, false, "must queue while capacity is busy");

  abortController.abort();
  const started = Date.now();
  const result = await pending;
  assert.ok(
    Date.now() - started < 500,
    "abort must cancel the queue-wait early, not park the full queueMs"
  );
  assert.equal(result.admit, false, "abort must not admit");
  if (!result.admit) {
    assert.equal(result.response.status, 503);
    assert.equal((await result.response.json()).error.code, "chat_admission_busy");
  }
  assert.equal(controller.activeHeavy, 1, "holder keeps its lease");
  held.release();
  assert.equal(controller.activeHeavy, 0);
});
