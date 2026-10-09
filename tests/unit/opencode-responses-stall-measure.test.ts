import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  makeStallGuardedCall,
  noteStallShadow,
} from "../../open-sse/executors/opencodeResponsesStall.ts";

function silentBody(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({ pull() {} });
}

function talkingBody(): ReadableStream<Uint8Array> {
  const text =
    'event: response.created\ndata: {"type":"response.created","response":{"id":"r1"}}\n\n';
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });
}

function watchedResult(body: ReadableStream<Uint8Array>): {
  response: Response;
} {
  return { response: new Response(body, { status: 200 }) };
}

// Reported watch failures are read back from the next hit warn line, which
// carries the cumulative count (`watch failures N`). Fixed-date runs only:
// the watch uses real short windows with the shared settle delay below.
function watchFailures(message: string): number {
  const found = /watch failures (\d+)/.exec(message);
  assert.ok(found, `expected a watch failures count in: ${message}`);
  return Number(found[1]);
}

async function settle(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 60));
}

describe("silent stream shadow measurement", () => {
  it("shadow counts a silent streamed reply while the guard stays off", async () => {
    const seen: string[] = [];
    const result = watchedResult(silentBody());
    const returned = noteStallShadow(result, {
      stream: true,
      requestFormat: "openai-responses",
      windowMs: 0,
      log: { warn: (_tag, message) => seen.push(message) },
      cid: "",
      readBound: () => 80_000,
      readConfigured: () => 30,
    });
    assert.equal(returned, result);
    await settle();
    assert.equal(seen.length, 1);
    assert.match(seen[0] as string, /silent streamed reply past 30ms/);
    assert.match(seen[0] as string, /shadow count 1/);
    await result.response.body?.cancel().catch(() => {});
  });

  it("shadow stays silent on a talking body", async () => {
    const seen: string[] = [];
    const result = watchedResult(talkingBody());
    noteStallShadow(result, {
      stream: true,
      requestFormat: "openai-responses",
      windowMs: 0,
      log: { warn: (_tag, message) => seen.push(message) },
      readBound: () => 80_000,
      readConfigured: () => 30,
    });
    await settle();
    assert.deepEqual(seen, []);
    const text = await result.response.text();
    assert.match(text, /response\.created/);
  });

  it("shadow ignores non-streamed and non-responses requests", async () => {
    const seen: string[] = [];
    noteStallShadow(watchedResult(silentBody()), {
      stream: false,
      requestFormat: "openai-responses",
      windowMs: 0,
      log: { warn: (_tag, message) => seen.push(message) },
      readBound: () => 80_000,
      readConfigured: () => 30,
    });
    noteStallShadow(watchedResult(silentBody()), {
      stream: true,
      requestFormat: "openai-chat",
      windowMs: 0,
      log: { warn: (_tag, message) => seen.push(message) },
      readBound: () => 80_000,
      readConfigured: () => 30,
    });
    await settle();
    assert.deepEqual(seen, []);
  });

  it("shadow stays off while the guard is armed", async () => {
    const seen: string[] = [];
    const result = watchedResult(silentBody());
    noteStallShadow(result, {
      stream: true,
      requestFormat: "openai-responses",
      windowMs: 50,
      log: { warn: (_tag, message) => seen.push(message) },
      readBound: () => 80_000,
      readConfigured: () => 50,
    });
    await settle();
    assert.deepEqual(seen, []);
    await result.response.body?.cancel().catch(() => {});
  });

  it("shadow storage stays constant after several requests", async () => {
    const seen: string[] = [];
    for (let i = 0; i < 5; i++) {
      const result = watchedResult(silentBody());
      noteStallShadow(result, {
        stream: true,
        requestFormat: "openai-responses",
        windowMs: 0,
        log: { warn: (_tag, message) => seen.push(message) },
        readBound: () => 80_000,
        readConfigured: () => 20,
      });
      await result.response.body?.cancel().catch(() => {});
    }
    await settle();
    assert.equal(seen.length, 5);
  });

  it("miss then hit reports the counted miss in delta", async () => {
    const prelim: string[] = [];
    const seen: string[] = [];
    const seenDebug: string[] = [];
    const log = {
      warn: (_tag: string, message: string) => seen.push(message),
      debug: (_tag: string, message: string) => seenDebug.push(message),
    };
    // Baseline through a hit first: module counters are cumulative per
    // process, so every assertion below reads a delta, in order.
    const baseline = watchedResult(silentBody());
    noteStallShadow(baseline, {
      stream: true,
      requestFormat: "openai-responses",
      windowMs: 0,
      log: { warn: (_tag, message) => prelim.push(message) },
      readBound: () => 80_000,
      readConfigured: () => 30,
    });
    await settle();
    assert.equal(prelim.length, 1);
    const baseFailures = watchFailures(prelim[0] as string);
    await baseline.response.body?.cancel().catch(() => {});
    // A pre-aborted signal fails the shadow watch with a non-timeout error,
    // so the miss path runs without waiting out a window.
    const aborted = new AbortController();
    aborted.abort(new Error("stalled before the shadow watch"));
    const missed = watchedResult(silentBody());
    const returned = noteStallShadow(missed, {
      stream: true,
      requestFormat: "openai-responses",
      windowMs: 0,
      signal: aborted.signal,
      log,
      readBound: () => 80_000,
      readConfigured: () => 30,
    });
    try {
      assert.equal(returned, missed);
      await settle();
      // A miss stays silent: counted, with no warn and no debug line.
      assert.deepEqual(seen, []);
      assert.deepEqual(seenDebug, []);
      const hit = watchedResult(silentBody());
      noteStallShadow(hit, {
        stream: true,
        requestFormat: "openai-responses",
        windowMs: 0,
        log,
        readBound: () => 80_000,
        readConfigured: () => 30,
      });
      await settle();
      // One miss plus one hit: the hit warn line carries base + 1 failure.
      assert.equal(seen.length, 1);
      assert.equal(watchFailures(seen[0] as string), baseFailures + 1);
      assert.deepEqual(seenDebug, []);
      await hit.response.body?.cancel().catch(() => {});
    } finally {
      await missed.response.body?.cancel().catch(() => {});
    }
  });

  it("zero configured window leaves the shadow inert", async () => {
    const seen: string[] = [];
    const seenDebug: string[] = [];
    const result = watchedResult(silentBody());
    const returned = noteStallShadow(result, {
      stream: true,
      requestFormat: "openai-responses",
      windowMs: 0,
      log: {
        warn: (_tag, message) => seen.push(message),
        debug: (_tag, message) => seenDebug.push(message),
      },
      readBound: () => 80_000,
      readConfigured: () => 0,
    });
    try {
      assert.equal(returned, result);
      await settle();
      assert.deepEqual(seen, []);
      assert.deepEqual(seenDebug, []);
    } finally {
      await result.response.body?.cancel().catch(() => {});
    }
  });

  it("rejected input propagates with the shadow untouched", async () => {
    const seen: string[] = [];
    const seenDebug: string[] = [];
    const failures: unknown[] = [];
    const onUnhandled = (reason: unknown) => {
      failures.push(reason);
    };
    process.on("unhandledRejection", onUnhandled);
    try {
      const failure = new Error("upstream refused");
      const guarded = makeStallGuardedCall(true, "openai-responses", 0, null, {
        warn: (_tag, message) => seen.push(message),
        debug: (_tag, message) => seenDebug.push(message),
      });
      await assert.rejects(guarded(Promise.reject(failure)), (error: unknown) => {
        assert.equal(error, failure);
        return true;
      });
      await settle();
      assert.deepEqual(seen, []);
      assert.deepEqual(seenDebug, []);
      assert.deepEqual(failures, []);
    } finally {
      process.removeListener("unhandledRejection", onUnhandled);
    }
  });
});
