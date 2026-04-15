import test from "node:test";
import assert from "node:assert/strict";

const { createSseHeartbeatTransform } = await import("../../open-sse/utils/sseHeartbeat.ts");

function withFakeIntervals(fn) {
  const originalSetInterval = globalThis.setInterval;
  const originalClearInterval = globalThis.clearInterval;
  const intervals = [];
  let nextId = 0;

  globalThis.setInterval = (callback, delay = 0, ...args) => {
    const interval = {
      id: ++nextId,
      callback,
      delay,
      args,
      cleared: false,
    };
    intervals.push(interval);
    return interval;
  };

  globalThis.clearInterval = (interval) => {
    if (interval && typeof interval === "object") {
      interval.cleared = true;
    }
  };

  return Promise.resolve()
    .then(() => fn(intervals))
    .finally(() => {
      globalThis.setInterval = originalSetInterval;
      globalThis.clearInterval = originalClearInterval;
    });
}

function decodeChunk(value) {
  return typeof value === "string" ? value : new TextDecoder().decode(value);
}

test("createSseHeartbeatTransform emits SSE comments while preserving stream output", async () => {
  await withFakeIntervals(async (intervals) => {
    const transform = createSseHeartbeatTransform({ intervalMs: 250 });
    const writer = transform.writable.getWriter();
    const reader = transform.readable.getReader();
    const emitted = [];
    const pump = (async () => {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        emitted.push(decodeChunk(value));
      }
    })();

    await writer.write(new TextEncoder().encode('data: {"chunk":"one"}\n\n'));

    assert.equal(intervals.length, 1);
    assert.equal(intervals[0].delay, 250);

    await intervals[0].callback(...intervals[0].args);
    await writer.close();
    await pump;

    assert.equal(emitted[0], 'data: {"chunk":"one"}\n\n');
    assert.match(emitted[1], /^: keepalive /);
    assert.equal(intervals[0].cleared, true);
  });
});

test("createSseHeartbeatTransform clears the interval when aborted", async () => {
  await withFakeIntervals(async (intervals) => {
    const controller = new AbortController();
    const transform = createSseHeartbeatTransform({ signal: controller.signal });
    const reader = transform.readable.getReader();
    const writer = transform.writable.getWriter();

    assert.equal(intervals.length, 1);
    assert.equal(intervals[0].cleared, false);

    controller.abort();
    assert.equal(intervals[0].cleared, true);

    await writer.close();
    await reader.cancel();
  });
});
