import test from "node:test";
import assert from "node:assert/strict";

const { createBadgeNotificationStream } =
  await import("../../src/lib/gamification/notifications.ts");

/**
 * Count timers created while `fn` runs and are still armed afterwards.
 * The stream owns its handles privately, so this is the only way to observe them.
 */
async function withTimerAccounting<T>(
  fn: () => Promise<T> | T
): Promise<{ result: T; live: number }> {
  const live = new Set<unknown>();
  const realSet = globalThis.setInterval;
  const realClear = globalThis.clearInterval;

  globalThis.setInterval = ((...args: Parameters<typeof realSet>) => {
    const handle = realSet(...args);
    live.add(handle);
    return handle;
  }) as typeof realSet;

  globalThis.clearInterval = ((handle: Parameters<typeof realClear>[0]) => {
    if (handle !== undefined) live.delete(handle);
    return realClear(handle);
  }) as typeof realClear;

  try {
    const result = await fn();
    // Let any pending abort/microtask cleanup run.
    await new Promise((r) => setTimeout(r, 50));
    // Stop whatever survived so a failing test cannot hang the runner.
    for (const handle of live) realClear(handle as Parameters<typeof realClear>[0]);
    return { result, live: live.size };
  } finally {
    globalThis.setInterval = realSet;
    globalThis.clearInterval = realClear;
  }
}

test("aborting after the stream starts clears both intervals (#13103)", async () => {
  const controller = new AbortController();
  const { live } = await withTimerAccounting(async () => {
    createBadgeNotificationStream("key-normal", controller.signal);
    controller.abort();
  });
  assert.equal(live, 0, "the normal lifecycle must clean up (baseline for the next test)");
});

test("a signal already aborted before start() must not leave timers running (#13103)", async () => {
  const controller = new AbortController();
  // The route awaits auth before building the stream, so a client that
  // disconnects during that round-trip arrives here already aborted.
  controller.abort();

  const { live } = await withTimerAccounting(() => {
    createBadgeNotificationStream("key-preaborted", controller.signal);
  });

  assert.equal(
    live,
    0,
    `an already-aborted signal left ${live} interval(s) running for the lifetime of the process`
  );
});

test("an already-aborted stream is closed rather than left enqueuing (#13103)", async () => {
  const controller = new AbortController();
  controller.abort();

  const stream = createBadgeNotificationStream("key-closed", controller.signal);
  const reader = stream.getReader();

  // enqueue() into an unread stream only buffers -- it does not throw -- so a
  // stream left open here would keep filling its queue with nobody draining it.
  const { done } = await reader.read();
  assert.equal(done, true, "the stream must be closed when the signal was already aborted");
});
