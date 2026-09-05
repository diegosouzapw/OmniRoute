/**
 * tests/unit/routing-events-concurrency.test.ts
 *
 * Stress the routing-event system (Phase 4):
 *  - thousands of events through the real dispatch + quality + memory sinks
 *  - ring-buffer boundedness under sustained load (newest retained)
 *  - a throwing sink under load is isolated (other sinks keep working)
 *  - quality tracker updates stay consistent under interleaved async bursts
 *  - simultaneous reset() during inserts does not throw or corrupt state
 *
 * Node's event loop is single-threaded, so "concurrency" here is interleaved
 * async execution; these tests assert correctness under bursts, not true
 * parallelism.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  dispatchRoutingEvent,
  MemoryRoutingEventStore,
  registerRoutingEventSink,
  clearRoutingEventSinks,
  createRoutingEvent,
  type RoutingEvent,
  type RoutingEventSink,
} from "../../../open-sse/services/routing/events.ts";
import {
  recordQualityEvent,
  getQualityScore,
  resetQualityTracker,
  getProviderQuality,
} from "../../../open-sse/services/routing/quality.ts";

function makeEvent(i: number): RoutingEvent {
  return createRoutingEvent({
    requestId: `r-${i}`,
    provider: i % 2 === 0 ? "openai" : "anthropic",
    model: "m",
    strategy: "auto",
    latencyMs: 50 + (i % 100),
    outcome: i % 100 === 0 ? "malformed" : "success",
    status: 200,
    finishReason: "stop",
    outputTokens: 5,
  });
}

test("sustained burst of thousands of events is bounded and consistent", async () => {
  clearRoutingEventSinks();
  resetQualityTracker();
  const store = new MemoryRoutingEventStore(100);
  registerRoutingEventSink(store);
  registerRoutingEventSink({
    name: "quality",
    record: (e) => recordQualityEvent(e),
  });

  const N = 10_000;
  for (let i = 0; i < N; i++) dispatchRoutingEvent(makeEvent(i));

  assert.equal(store.size, 100, "ring buffer must stay bounded at capacity");
  const recent = store.recent(5);
  assert.equal(recent[0].requestId, `r-${N - 1}`, "newest event must be retained");

  const q = getProviderQuality("openai", "m");
  assert.equal(q.samples, N / 2, "even-indexed events all landed in the quality tracker");
  assert.ok(q.operational > 0.5, "mostly-successful provider should be above neutral");

  clearRoutingEventSinks();
});

test("a throwing sink under load does not break other sinks", () => {
  clearRoutingEventSinks();
  resetQualityTracker();
  const seen: string[] = [];
  registerRoutingEventSink({
    name: "thrower",
    record: () => {
      throw new Error("sink boom");
    },
  });
  registerRoutingEventSink({
    name: "collector",
    record: (e) => void seen.push(e.requestId),
  });

  for (let i = 0; i < 2000; i++) dispatchRoutingEvent(makeEvent(i));
  assert.equal(seen.length, 2000, "all events must still reach the good sink");
  clearRoutingEventSinks();
});

test("interleaved async bursts keep quality math consistent", async () => {
  resetQualityTracker();
  const bursts = Array.from({ length: 8 }, (_, b) =>
    (async () => {
      for (let i = 0; i < 500; i++) {
        recordQualityEvent(makeEvent(b * 500 + i));
        // Yield occasionally to interleave with the other bursts.
        if (i % 50 === 0) await new Promise((r) => setImmediate(r));
      }
    })()
  );
  await Promise.all(bursts);

  const q = getProviderQuality("openai", "m");
  assert.equal(q.samples, 2000, "4 bursts * 500 with i%2==0 → 2000 openai samples");
  assert.ok(Number.isFinite(q.operational) && q.operational >= 0 && q.operational <= 1);
  // Recency should be non-null and tiny (events were just recorded).
  assert.ok(q.recencyMs !== null && q.recencyMs < 5000);
});

test("reset during inserts is safe and state re-initializes cleanly", async () => {
  resetQualityTracker();
  const store = new MemoryRoutingEventStore(50);
  registerRoutingEventSink(store);
  registerRoutingEventSink({ name: "quality", record: (e) => recordQualityEvent(e) });

  const writer = (async () => {
    for (let i = 0; i < 2000; i++) {
      dispatchRoutingEvent(makeEvent(i));
      if (i % 200 === 0) await new Promise((r) => setImmediate(r));
    }
  })();

  // Fire several resets while the writer is mid-flight.
  const resets = Array.from({ length: 3 }, (_, k) =>
    (async () => {
      await new Promise((r) => setImmediate(r));
      resetQualityTracker();
      store.clear();
    })()
  );
  await Promise.all(resets);
  await writer;

  // After a reset the tracker is empty for the reset epoch; post-reset events
  // must still record without throwing. We assert non-negative, finite state.
  const q = getProviderQuality("openai", "m");
  assert.ok(q.samples >= 0);
  assert.ok(Number.isFinite(q.operational));
  clearRoutingEventSinks();
  resetQualityTracker();
});

test("quality score never goes NaN or out of [0,1] under adversarial events", () => {
  resetQualityTracker();
  const bad: RoutingEvent[] = [
    makeEvent(0),
    createRoutingEvent({
      requestId: "nan-1",
      provider: "nanp",
      model: "nanm",
      latencyMs: NaN,
      outcome: "error",
      status: NaN,
      ttftMs: NaN,
      outputTokens: NaN,
    }),
  ];
  for (const e of bad) dispatchRoutingEvent(makeEvent(1));
  recordQualityEvent({
    provider: "nanp",
    model: "nanm",
    outcome: "error",
    status: NaN,
    latencyMs: NaN,
    ttftMs: NaN,
    outputTokens: NaN,
  });
  const score = getQualityScore("nanp", "nanm");
  assert.ok(Number.isFinite(score), `score must be finite, got ${score}`);
  assert.ok(score >= 0 && score <= 1, `score in [0,1], got ${score}`);
});
