/**
 * Integration tests: Traffic Inspector WebSocket endpoint
 *
 * Tests WS upgrade, initial snapshot delivery, and live buffer events.
 * We do not spin up a full HTTP server — we test the buffer subscribe
 * mechanism directly since the WS handler is a thin wrapper around it.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ti-ws-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.INSPECTOR_BUFFER_SIZE = "100";

const { TrafficBuffer } = await import("../../src/mitm/inspector/buffer.ts");
const wsRoute = await import(
  "../../src/app/api/tools/traffic-inspector/ws/route.ts"
);

function makeRequest(upgrade = "websocket", clientKey = "dGhlIHNhbXBsZSBub25jZQ=="): Request {
  return new Request("http://localhost/api/tools/traffic-inspector/ws", {
    headers: {
      upgrade,
      "sec-websocket-key": clientKey,
      connection: "Upgrade",
    },
  });
}

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("ws/route: rejects non-WebSocket GET with 426", async () => {
  const req = new Request("http://localhost/api/tools/traffic-inspector/ws");
  const res = await wsRoute.GET(req);
  assert.equal(res.status, 426);
  const body = await res.json() as { error: { message: string } };
  assert.ok(body.error.message.includes("Upgrade"), "should mention upgrade");
});

test("ws/route: rejects missing Sec-WebSocket-Key with 400", async () => {
  const req = new Request("http://localhost/api/tools/traffic-inspector/ws", {
    headers: { upgrade: "websocket", connection: "Upgrade" },
  });
  const res = await wsRoute.GET(req);
  assert.equal(res.status, 400);
});

test("ws/route: rejects when no raw socket available with 500", async () => {
  const req = makeRequest();
  // No `.socket` property injected — Next.js standalone would attach it
  const res = await wsRoute.GET(req);
  assert.equal(res.status, 500);
  const body = await res.json() as { error: { message: string } };
  assert.ok(!body.error.message.includes("at /"), "must not leak stack trace");
});

test("TrafficBuffer: subscribe receives snapshot immediately", () => {
  const buf = new TrafficBuffer(10, 1024 * 1024);
  const entry = {
    id: randomUUID(),
    source: "agent-bridge" as const,
    timestamp: new Date().toISOString(),
    method: "POST",
    host: "api.openai.com",
    path: "/v1/chat/completions",
    requestHeaders: {},
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: 200 as const,
  };
  buf.push(entry);

  const events: unknown[] = [];
  const unsub = buf.subscribe((ev) => events.push(ev));

  assert.equal(events.length, 1, "should receive snapshot immediately");
  const snapshot = events[0] as { type: string; data: unknown[] };
  assert.equal(snapshot.type, "snapshot");
  assert.ok(Array.isArray(snapshot.data));
  assert.equal(snapshot.data.length, 1);

  unsub();
});

test("TrafficBuffer: push broadcasts new event to subscribers", () => {
  const buf = new TrafficBuffer(10, 1024 * 1024);
  const events: unknown[] = [];
  const unsub = buf.subscribe((ev) => events.push(ev));

  // snapshot is at index 0
  buf.push({
    id: randomUUID(),
    source: "http-proxy" as const,
    timestamp: new Date().toISOString(),
    method: "GET",
    host: "example.com",
    path: "/",
    requestHeaders: {},
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: 200 as const,
  });

  assert.equal(events.length, 2, "should have snapshot + new event");
  const newEv = events[1] as { type: string; data: { host: string } };
  assert.equal(newEv.type, "new");
  assert.equal(newEv.data.host, "example.com");

  unsub();
});

test("TrafficBuffer: unsubscribe stops receiving events", () => {
  const buf = new TrafficBuffer(10, 1024 * 1024);
  const events: unknown[] = [];
  const unsub = buf.subscribe((ev) => events.push(ev));
  unsub();

  buf.push({
    id: randomUUID(),
    source: "system-proxy" as const,
    timestamp: new Date().toISOString(),
    method: "POST",
    host: "test.com",
    path: "/api",
    requestHeaders: {},
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: 204 as const,
  });

  assert.equal(events.length, 1, "should only have the initial snapshot");
});
