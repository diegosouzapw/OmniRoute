import test from "node:test";
import assert from "node:assert/strict";

const { createProgressTransform, wantsProgress } =
  await import("../../open-sse/utils/progressTracker.ts");

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

test("wantsProgress reads the opt-in header from Headers and plain objects", () => {
  assert.equal(wantsProgress(new Headers({ "x-omniroute-progress": "true" })), true);
  assert.equal(wantsProgress({ "x-omniroute-progress": "true" }), true);
  assert.equal(wantsProgress({ "x-omniroute-progress": "false" }), false);
  assert.equal(wantsProgress(null), false);
});

test("createProgressTransform emits periodic progress events with token counts", async () => {
  await withFakeIntervals(async (intervals) => {
    const transform = createProgressTransform({ intervalMs: 250 });
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

    await writer.write("data: one\n\ndata: two\n\n");

    assert.equal(intervals.length, 1);
    assert.equal(intervals[0].delay, 250);

    await intervals[0].callback(...intervals[0].args);
    await writer.close();

    await pump;

    assert.equal(emitted[0], "data: one\n\ndata: two\n\n");
    assert.match(emitted[1], /^event: progress/);
    const progressPayload = JSON.parse(emitted[1].split("data: ")[1]);
    assert.equal(progressPayload.tokens_generated, 2);
    assert.equal(typeof progressPayload.elapsed_ms, "number");

    const finalPayload = JSON.parse(emitted[2].split("data: ")[1]);
    assert.equal(finalPayload.tokens_generated, 2);
    assert.equal(finalPayload.done, true);
    assert.equal(intervals[0].cleared, true);
  });
});

test("createProgressTransform clears the interval when aborted", async () => {
  await withFakeIntervals(async (intervals) => {
    const controller = new AbortController();
    const transform = createProgressTransform({ signal: controller.signal });
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

test("createProgressTransform preserves split UTF-8 and counts split data lines per stream", async () => {
  await withFakeIntervals(async () => {
    const first = createProgressTransform();
    const second = createProgressTransform();
    const firstWriter = first.writable.getWriter();
    const secondWriter = second.writable.getWriter();
    const firstOutput = [];
    const secondOutput = [];
    const pump = async (transform, output) => {
      for await (const chunk of transform.readable) output.push(chunk);
    };
    const firstPump = pump(first, firstOutput);
    const secondPump = pump(second, secondOutput);
    const firstBytes = new TextEncoder().encode("data: one 🚀\n\n");
    const secondBytes = new TextEncoder().encode("data: two 🧭\n\n");

    await firstWriter.write(firstBytes.slice(0, 2));
    await secondWriter.write(secondBytes.slice(0, 11));
    await firstWriter.write(firstBytes.slice(2, 12));
    await secondWriter.write(secondBytes.slice(11));
    await firstWriter.write(firstBytes.slice(12));
    await Promise.all([firstWriter.close(), secondWriter.close()]);
    await Promise.all([firstPump, secondPump]);

    assert.equal(
      new TextDecoder().decode(Buffer.concat(firstOutput.slice(0, -1))),
      "data: one 🚀\n\n"
    );
    assert.equal(
      new TextDecoder().decode(Buffer.concat(secondOutput.slice(0, -1))),
      "data: two 🧭\n\n"
    );
    const firstFinal = decodeChunk(firstOutput.at(-1));
    const secondFinal = decodeChunk(secondOutput.at(-1));
    assert.equal(JSON.parse(firstFinal.split("data: ")[1]).tokens_generated, 1);
    assert.equal(JSON.parse(secondFinal.split("data: ")[1]).tokens_generated, 1);
  });
});
