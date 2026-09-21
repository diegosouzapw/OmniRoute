import test from "node:test";
import assert from "node:assert/strict";

// The upstream status is captured once, around the process-wide fetch, and only while a
// provider request is being dispatched. These tests pin the wrapper on its own.

const { withUpstreamStatusCapture } = await import("../../open-sse/utils/upstreamStatusCapture.ts");
const { isProviderRequestCaptureActive, runWithCapture } =
  await import("../../open-sse/utils/providerRequestLogging.ts");

type Sink = { upstreamStatus?: number };

const dispatchCapture = { capture: () => {}, body: (fallback: unknown) => fallback };

function respond(status: number) {
  return async () => new Response(null, { status });
}

test("records the status of a dispatched call and returns the response untouched", async () => {
  const sink: Sink = {};
  const response = new Response(null, { status: 429 });
  const wrapped = withUpstreamStatusCapture(
    async () => response,
    () => sink,
    () => true
  );
  assert.equal(await wrapped(), response);
  assert.equal(sink.upstreamStatus, 429);
});

test("a call outside a dispatch leaves the sink alone", async () => {
  const sink: Sink = { upstreamStatus: 429 };
  const wrapped = withUpstreamStatusCapture(
    respond(200),
    () => sink,
    () => false
  );
  await wrapped();
  assert.equal(sink.upstreamStatus, 429);
});

test("a dispatched call that throws clears the earlier status", async () => {
  const sink: Sink = {};
  const first = withUpstreamStatusCapture(
    respond(429),
    () => sink,
    () => true
  );
  await first();
  assert.equal(sink.upstreamStatus, 429);

  const failing = withUpstreamStatusCapture(
    async () => {
      throw new TypeError("fetch failed");
    },
    () => sink,
    () => true
  );
  await assert.rejects(failing(), /fetch failed/);
  assert.equal(sink.upstreamStatus, undefined);
});

test("a response that arrives after the dispatch ended leaves the sink alone", async () => {
  const sink: Sink = { upstreamStatus: 429 };
  let dispatching = true;
  const wrapped = withUpstreamStatusCapture(
    async () => {
      dispatching = false;
      return new Response(null, { status: 500 });
    },
    () => sink,
    () => dispatching
  );
  await wrapped();
  assert.equal(sink.upstreamStatus, 429);
});

test("forwards every argument to the inner fetch", async () => {
  const seen: unknown[][] = [];
  const inner = async (...args: unknown[]) => {
    seen.push(args);
    return new Response(null, { status: 204 });
  };
  const wrapped = withUpstreamStatusCapture(
    inner,
    () => undefined,
    () => true
  );
  const deps = { marker: true };
  await wrapped("http://example.test", { method: "GET" }, deps);
  assert.deepEqual(seen, [["http://example.test", { method: "GET" }, deps]]);
});

test("no sink in scope is harmless", async () => {
  const wrapped = withUpstreamStatusCapture(
    respond(500),
    () => undefined,
    () => true
  );
  assert.equal((await wrapped()).status, 500);
});

test("a second dispatch without any fetch leaves nothing stale behind", async () => {
  const sink: Sink = {};
  const wrapped = withUpstreamStatusCapture(respond(429), () => sink);
  await runWithCapture(dispatchCapture, async () => {
    await wrapped();
  });
  assert.equal(sink.upstreamStatus, 429);
  await runWithCapture(dispatchCapture, async () => {});
  assert.equal(sink.upstreamStatus, undefined);
});

test("isProviderRequestCaptureActive is true only until runWithCapture settles", async () => {
  assert.equal(isProviderRequestCaptureActive(), false);
  const capture = { capture: () => {}, body: (fallback: unknown) => fallback };
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  let later: Promise<boolean> = Promise.resolve(true);
  const inside = await runWithCapture(capture, async () => {
    later = gate.then(() => isProviderRequestCaptureActive());
    return isProviderRequestCaptureActive();
  });
  assert.equal(inside, true);
  release();
  assert.equal(await later, false, "a continuation started inside sees the dispatch ended");
  assert.equal(isProviderRequestCaptureActive(), false);
});
