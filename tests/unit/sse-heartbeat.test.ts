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

const { shapeForClientFormat } = await import("../../open-sse/utils/sseHeartbeat.ts");

test("shape: anthropic-ping emits event: ping with empty JSON data", async () => {
  await withFakeIntervals(async (intervals) => {
    const transform = createSseHeartbeatTransform({ intervalMs: 100, shape: "anthropic-ping" });
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

    await intervals[0].callback(...intervals[0].args);
    await writer.close();
    await pump;

    assert.equal(emitted[0], "event: ping\ndata: {}\n\n");
  });
});

test("shape: openai-chunk emits valid chat.completion.chunk with empty delta", async () => {
  await withFakeIntervals(async (intervals) => {
    const transform = createSseHeartbeatTransform({ intervalMs: 100, shape: "openai-chunk" });
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

    await intervals[0].callback(...intervals[0].args);
    await writer.close();
    await pump;

    assert.ok(emitted[0].startsWith("data: "), `expected data: prefix, got: ${emitted[0]}`);
    assert.ok(emitted[0].endsWith("\n\n"), "expected trailing \n\n");
    const jsonStr = emitted[0].slice("data: ".length, -"\n\n".length);
    const json = JSON.parse(jsonStr);
    assert.equal(json.object, "chat.completion.chunk");
    assert.ok(Array.isArray(json.choices) && json.choices.length === 1);
    assert.equal(typeof json.choices[0].delta, "object");
    assert.equal(Object.keys(json.choices[0].delta).length, 0);
    assert.equal(json.choices[0].finish_reason, null);
  });
});

test("shape: openai-responses-in-progress emits response.in_progress data event", async () => {
  await withFakeIntervals(async (intervals) => {
    const transform = createSseHeartbeatTransform({ intervalMs: 100, shape: "openai-responses-in-progress" });
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

    await intervals[0].callback(...intervals[0].args);
    await writer.close();
    await pump;

    assert.equal(emitted[0], 'data: {"type":"response.in_progress"}\n\n');
  });
});

test("shape default is comment (back-compat)", async () => {
  await withFakeIntervals(async (intervals) => {
    const transform = createSseHeartbeatTransform({ intervalMs: 100 });
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

    await intervals[0].callback(...intervals[0].args);
    await writer.close();
    await pump;

    assert.match(emitted[0], /^: keepalive /);
  });
});

test("intervalMs <= 0 returns passthrough (no setInterval, no heartbeat)", async () => {
  await withFakeIntervals(async (intervals) => {
    const transform = createSseHeartbeatTransform({ intervalMs: 0 });
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

    assert.equal(intervals.length, 0);

    await writer.write(new TextEncoder().encode('data: {"chunk":"x"}\n\n'));
    await writer.close();
    await pump;

    assert.equal(emitted.length, 1);
    assert.equal(emitted[0], 'data: {"chunk":"x"}\n\n');
  });
});

test("shapeForClientFormat maps formats correctly", () => {
  assert.equal(shapeForClientFormat("claude"), "anthropic-ping");
  assert.equal(shapeForClientFormat("openai"), "openai-chunk");
  assert.equal(shapeForClientFormat("openai-responses"), "openai-responses-in-progress");
  assert.equal(shapeForClientFormat("gemini"), "comment");
  assert.equal(shapeForClientFormat(undefined), "comment");
  assert.equal(shapeForClientFormat(null), "comment");
});

test("no shape collides with stream.ts event: keepalive strip regex", async () => {
  const shapes = ["comment", "anthropic-ping", "openai-chunk", "openai-responses-in-progress"];
  for (const shape of shapes) {
    await withFakeIntervals(async (intervals) => {
      const transform = createSseHeartbeatTransform({ intervalMs: 100, shape });
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

      await intervals[0].callback(...intervals[0].args);
      await writer.close();
      await pump;

      const lines = emitted[0].split("\n");
      for (const line of lines) {
        assert.doesNotMatch(line.trim(), /^event:\s*keepalive\b/i, `shape ${shape} produced forbidden line: ${line}`);
      }
    });
  }
});
