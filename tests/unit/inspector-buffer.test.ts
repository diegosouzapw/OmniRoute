import test from "node:test";
import assert from "node:assert/strict";
import { TrafficBuffer } from "../../src/mitm/inspector/buffer.ts";
import type {
  InterceptedRequest,
  WsEvent,
} from "../../src/mitm/inspector/types.ts";

function makeReq(overrides: Partial<InterceptedRequest> = {}): InterceptedRequest {
  return {
    id: overrides.id ?? `id-${Math.random().toString(36).slice(2, 10)}`,
    source: "agent-bridge",
    timestamp: new Date().toISOString(),
    method: "POST",
    host: "api.openai.com",
    path: "/v1/chat/completions",
    requestHeaders: {},
    requestBody: JSON.stringify({
      messages: [
        { role: "system", content: "You are an assistant." },
        { role: "user", content: "Hi" },
      ],
    }),
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: 200,
    ...overrides,
  };
}

test("push appends entries and auto-applies detectedKind=llm", () => {
  const buf = new TrafficBuffer(10);
  const r = makeReq({ id: "r1" });
  buf.push(r);
  const got = buf.get("r1");
  assert.ok(got);
  assert.equal(got.detectedKind, "llm");
});

test("push auto-computes contextKey from system prompt", () => {
  const buf = new TrafficBuffer(10);
  const r = makeReq({ id: "r1" });
  buf.push(r);
  const got = buf.get("r1");
  assert.ok(got);
  assert.ok(got.contextKey);
  assert.match(got.contextKey!, /^[0-9a-f]{12}$/);
});

test("push does not override an existing contextKey", () => {
  const buf = new TrafficBuffer(10);
  const r = makeReq({ id: "r1", contextKey: "preexisting1" });
  buf.push(r);
  const got = buf.get("r1");
  assert.equal(got!.contextKey, "preexisting1");
});

test("push truncates large requestBody with marker", () => {
  // 1 KiB so cap is hit reliably; override env via fresh buffer w/ explicit byte cap
  const big = "a".repeat(3000);
  const buf = new TrafficBuffer(10, 1024); // 1 KiB max body
  buf.push(makeReq({ id: "r1", requestBody: big }));
  const got = buf.get("r1");
  assert.ok(got);
  assert.ok(got.requestBody!.length > 1024); // marker increases length slightly
  assert.match(got.requestBody!, /truncated for performance/);
});

test("push rotates oldest when over maxSize", () => {
  const buf = new TrafficBuffer(3, 1024);
  buf.push(makeReq({ id: "a" }));
  buf.push(makeReq({ id: "b" }));
  buf.push(makeReq({ id: "c" }));
  buf.push(makeReq({ id: "d" }));
  assert.equal(buf.size(), 3);
  assert.equal(buf.get("a"), null);
  assert.ok(buf.get("d"));
});

test("update replaces existing entry by id and broadcasts update", () => {
  const buf = new TrafficBuffer(5);
  buf.push(makeReq({ id: "r1" }));
  const events: WsEvent[] = [];
  const off = buf.subscribe((e) => events.push(e));
  // initial snapshot received
  buf.update("r1", makeReq({ id: "r1", status: 500, responseBody: "err" }));
  off();
  const got = buf.get("r1");
  assert.equal(got!.status, 500);
  const updates = events.filter((e) => e.type === "update");
  assert.equal(updates.length, 1);
});

test("update is a no-op when id is unknown", () => {
  const buf = new TrafficBuffer(5);
  buf.update("missing", makeReq({ id: "missing" }));
  assert.equal(buf.size(), 0);
});

test("list applies filters by source, host, status, profile, agent, sessionId", () => {
  const buf = new TrafficBuffer(20);
  buf.push(makeReq({ id: "a", host: "api.openai.com", source: "agent-bridge", agent: "codex" }));
  buf.push(
    makeReq({
      id: "b",
      host: "random.example.com",
      source: "http-proxy",
      requestBody: JSON.stringify({ name: "not-llm" }),
      detectedKind: "app",
    })
  );
  buf.push(
    makeReq({
      id: "c",
      host: "api.anthropic.com",
      source: "custom-host",
      status: 500,
      sessionId: "00000000-0000-0000-0000-000000000000",
    })
  );

  assert.equal(buf.list({ profile: "llm" }).length, 2);
  assert.equal(buf.list({ source: "http-proxy" }).length, 1);
  assert.equal(buf.list({ host: "api.openai.com" }).length, 1);
  assert.equal(buf.list({ status: "5xx" }).length, 1);
  assert.equal(buf.list({ agent: "codex" }).length, 1);
  assert.equal(
    buf.list({ sessionId: "00000000-0000-0000-0000-000000000000" }).length,
    1
  );
  assert.equal(buf.list({ profile: "custom" }).length, 1);
  assert.equal(buf.list({ profile: "all" }).length, 3);
});

test("clear empties the buffer and broadcasts a clear event", () => {
  const buf = new TrafficBuffer(5);
  buf.push(makeReq({ id: "a" }));
  buf.push(makeReq({ id: "b" }));
  const events: WsEvent[] = [];
  const off = buf.subscribe((e) => events.push(e));
  buf.clear();
  off();
  assert.equal(buf.size(), 0);
  assert.ok(events.some((e) => e.type === "clear"));
});

test("subscribe immediately delivers a snapshot of the current buffer", () => {
  const buf = new TrafficBuffer(5);
  buf.push(makeReq({ id: "a" }));
  buf.push(makeReq({ id: "b" }));
  const events: WsEvent[] = [];
  const off = buf.subscribe((e) => events.push(e));
  off();
  assert.equal(events.length, 1);
  assert.equal(events[0].type, "snapshot");
  if (events[0].type === "snapshot") {
    assert.equal(events[0].data.length, 2);
  }
});

test("subscribe returns an unsubscribe function", () => {
  const buf = new TrafficBuffer(5);
  const fn = (_e: WsEvent): void => {};
  const off = buf.subscribe(fn);
  assert.equal(buf.subscriberCount(), 1);
  off();
  assert.equal(buf.subscriberCount(), 0);
});

test("broadcast survives a throwing subscriber", () => {
  const buf = new TrafficBuffer(5);
  buf.subscribe(() => {
    throw new Error("subscriber crash");
  });
  let okCount = 0;
  buf.subscribe(() => {
    okCount += 1;
  });
  buf.push(makeReq({ id: "a" }));
  // 1 snapshot from second subscribe + 1 new event from push
  assert.ok(okCount >= 1);
});

test("broadcasts new event with the pushed request", () => {
  const buf = new TrafficBuffer(5);
  const events: WsEvent[] = [];
  buf.subscribe((e) => events.push(e));
  buf.push(makeReq({ id: "evt" }));
  const news = events.filter((e) => e.type === "new");
  assert.equal(news.length, 1);
  if (news[0].type === "new") {
    assert.equal(news[0].data.id, "evt");
  }
});

test("body cap applies to responseBody as well", () => {
  const buf = new TrafficBuffer(5, 100);
  const r = makeReq({ id: "r", responseBody: "x".repeat(500) });
  buf.push(r);
  const got = buf.get("r");
  assert.match(got!.responseBody!, /truncated for performance/);
});
