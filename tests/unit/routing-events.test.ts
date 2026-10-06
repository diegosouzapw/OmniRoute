/**
 * tests/unit/routing-events.test.ts
 *
 * Routing feedback foundation (open-sse/services/routing/events.ts):
 *  - createRoutingEvent normalizes defaults
 *  - outcomeFromStatus classifies HTTP statuses
 *  - MemoryRoutingEventStore is bounded and returns newest-first
 *  - dispatchRoutingEvent fans out to sinks and isolates a throwing sink
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  MemoryRoutingEventStore,
  createRoutingEvent,
  outcomeFromStatus,
  dispatchRoutingEvent,
  registerRoutingEventSink,
  listRoutingEventSinks,
  clearRoutingEventSinks,
  type RoutingEvent,
  type RoutingEventSink,
} from "../../open-sse/services/routing/events.ts";

function event(partial: Partial<RoutingEvent> = {}): RoutingEvent {
  return createRoutingEvent({
    requestId: "req-1",
    provider: "openai",
    model: "gpt-4o",
    strategy: "auto",
    latencyMs: 120,
    outcome: "success",
    status: 200,
    ...partial,
  });
}

test("createRoutingEvent fills observability defaults", () => {
  const e = createRoutingEvent({
    requestId: "req-x",
    provider: "anthropic",
    model: "claude-4",
    latencyMs: 50,
    outcome: "error",
    status: 500,
  });
  assert.equal(e.strategy, "direct");
  assert.equal(e.ttftMs, null);
  assert.equal(e.inputTokens, null);
  assert.equal(e.outputTokens, null);
  assert.equal(e.cost, null);
  assert.equal(e.retries, 0);
  assert.equal(e.fallbackUsed, false);
  assert.equal(e.finishReason, null);
  assert.equal(e.connectionId, null);
  assert.ok(e.ts > 0);
  assert.equal(e.status, 500);
});

test("outcomeFromStatus classifies statuses", () => {
  assert.equal(outcomeFromStatus(200), "success");
  assert.equal(outcomeFromStatus(201), "success");
  assert.equal(outcomeFromStatus(429), "rate_limited");
  assert.equal(outcomeFromStatus(408), "timeout");
  assert.equal(outcomeFromStatus(504), "timeout");
  assert.equal(outcomeFromStatus(500), "error");
  assert.equal(outcomeFromStatus(400), "error");
  assert.equal(outcomeFromStatus(null), "error");
  assert.equal(outcomeFromStatus(undefined), "error");
});

test("MemoryRoutingEventStore returns newest-first within capacity", () => {
  const store = new MemoryRoutingEventStore(5);
  for (let i = 0; i < 5; i++) store.record(event({ requestId: `r-${i}` }));
  const recent = store.recent(5);
  assert.equal(recent.length, 5);
  assert.equal(recent[0].requestId, "r-4");
  assert.equal(recent[4].requestId, "r-0");
});

test("MemoryRoutingEventStore is bounded and still newest-first after overflow", () => {
  const store = new MemoryRoutingEventStore(3);
  for (let i = 0; i < 10; i++) store.record(event({ requestId: `r-${i}` }));
  assert.equal(store.size, 3);
  const recent = store.recent(3);
  assert.deepEqual(
    recent.map((e) => e.requestId),
    ["r-9", "r-8", "r-7"]
  );
  store.clear();
  assert.equal(store.size, 0);
  assert.deepEqual(store.recent(), []);
});

test("dispatchRoutingEvent fans out to every registered sink", () => {
  const seen: string[] = [];
  const sink: RoutingEventSink = {
    name: "test-a",
    record: (e) => void seen.push(e.requestId),
  };
  const unsub = registerRoutingEventSink(sink);
  try {
    dispatchRoutingEvent(event({ requestId: "fan-1" }));
    dispatchRoutingEvent(event({ requestId: "fan-2" }));
    assert.deepEqual(seen, ["fan-1", "fan-2"]);
  } finally {
    unsub();
  }
});

test("dispatchRoutingEvent isolates a throwing sink", () => {
  const badSink: RoutingEventSink = {
    name: "test-throw",
    record: () => {
      throw new Error("boom");
    },
  };
  const goodSeen: string[] = [];
  const goodSink: RoutingEventSink = {
    name: "test-good",
    record: (e) => void goodSeen.push(e.requestId),
  };
  registerRoutingEventSink(badSink);
  registerRoutingEventSink(goodSink);
  try {
    dispatchRoutingEvent(event({ requestId: "isolated" }));
    assert.deepEqual(goodSeen, ["isolated"]);
  } finally {
    clearRoutingEventSinks();
  }
});

test("listRoutingEventSinks reports registered names", () => {
  clearRoutingEventSinks();
  assert.deepEqual(listRoutingEventSinks(), []);
  const unsub = registerRoutingEventSink({ name: "probe", record: () => {} });
  try {
    assert.deepEqual(listRoutingEventSinks(), ["probe"]);
  } finally {
    unsub();
  }
});
