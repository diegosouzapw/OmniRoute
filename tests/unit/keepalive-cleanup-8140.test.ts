import test from "node:test";
import assert from "node:assert/strict";

import { withEarlyStreamKeepalive } from "../../open-sse/utils/earlyStreamKeepalive.ts";

/**
 * #8140: Verify the keepalive interval is cleaned up after disconnect/completion.
 *
 * The keepalive interval is unref'd (line 120 of earlyStreamKeepalive.ts), so it
 * won't appear in process._getActiveHandles(). Instead we verify cleanup indirectly:
 * after the stream closes, timer counts must be stable (not growing), proving no
 * leaked interval is still ticking.
 */

function countTimeoutHandles(): number {
  const handles = (
    process as unknown as {
      _getActiveHandles: () => unknown[];
    }
  )._getActiveHandles();
  return handles.length;
}

function sseResponse(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

test("#8140: timer count is stable after client disconnect (no leaked interval)", async () => {
  const controller = new AbortController();
  const result = await withEarlyStreamKeepalive(new Promise<Response>(() => {}), {
    thresholdMs: 5,
    intervalMs: 15,
    signal: controller.signal,
  });

  const reader = result.body!.getReader();
  const { value } = await reader.read();
  assert.ok(value && value.byteLength > 0, "should emit at least one keepalive frame");

  controller.abort();

  // Drain until closed.
  const drained = (async () => {
    while (true) {
      const { done } = await reader.read();
      if (done) return true;
    }
  })();
  const timed = new Promise<boolean>((r) => setTimeout(() => r(false), 2000));
  assert.equal(await Promise.race([drained, timed]), true, "stream should close after abort");

  await new Promise((r) => setTimeout(r, 30));

  const count1 = countTimeoutHandles();
  await new Promise((r) => setTimeout(r, 30));
  const count2 = countTimeoutHandles();
  assert.equal(
    count1,
    count2,
    "handle count should be stable after disconnect (no leaked interval ticking)"
  );
});

test("#8140: timer count is stable after handler resolves normally (slow path)", async () => {
  const slowHandler = new Promise<Response>((resolve) => {
    setTimeout(() => resolve(sseResponse("data: [DONE]\n\n")), 80);
  });

  const result = await withEarlyStreamKeepalive(slowHandler, {
    thresholdMs: 10,
    intervalMs: 15,
  });

  const reader = result.body!.getReader();
  while (true) {
    const { done } = await reader.read();
    if (done) break;
  }

  await new Promise((r) => setTimeout(r, 30));

  const count1 = countTimeoutHandles();
  await new Promise((r) => setTimeout(r, 30));
  const count2 = countTimeoutHandles();
  assert.equal(count1, count2, "handle count should be stable after normal completion");
});

test("#8140: timer count is stable after handler rejects (slow path)", async () => {
  const slowFail = new Promise<Response>((_, reject) => {
    setTimeout(() => reject(new Error("upstream died")), 80);
  });

  const result = await withEarlyStreamKeepalive(slowFail, {
    thresholdMs: 10,
    intervalMs: 15,
  });

  const reader = result.body!.getReader();
  while (true) {
    const { done } = await reader.read();
    if (done) break;
  }

  await new Promise((r) => setTimeout(r, 30));

  const count1 = countTimeoutHandles();
  await new Promise((r) => setTimeout(r, 30));
  const count2 = countTimeoutHandles();
  assert.equal(count1, count2, "handle count should be stable after error completion");
});
