/**
 * Integration tests: Traffic Inspector requests endpoints
 *
 * Tests GET /requests (with filters), DELETE /requests, GET /requests/[id],
 * and PUT /requests/[id]/annotation.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ti-reqs-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { globalTrafficBuffer } = await import("../../src/mitm/inspector/buffer.ts");
const requestsRoute = await import(
  "../../src/app/api/tools/traffic-inspector/requests/route.ts"
);
const requestDetailRoute = await import(
  "../../src/app/api/tools/traffic-inspector/requests/[id]/route.ts"
);
const annotationRoute = await import(
  "../../src/app/api/tools/traffic-inspector/requests/[id]/annotation/route.ts"
);

function makeEntry(overrides: Partial<{
  id: string;
  host: string;
  detectedKind: "llm" | "app" | "unknown";
  status: number | "in-flight" | "error";
  source: "agent-bridge" | "custom-host" | "http-proxy" | "system-proxy";
}> = {}) {
  return {
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
    detectedKind: "llm" as const,
    ...overrides,
  };
}

test.beforeEach(() => {
  globalTrafficBuffer.clear();
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /requests: returns empty list when buffer is empty", async () => {
  const req = new Request("http://localhost/api/tools/traffic-inspector/requests");
  const res = await requestsRoute.GET(req);
  assert.equal(res.status, 200);
  const body = await res.json() as { requests: unknown[]; total: number };
  assert.deepEqual(body.requests, []);
  assert.equal(body.total, 0);
});

test("GET /requests: returns all entries without filter", async () => {
  globalTrafficBuffer.push(makeEntry({ id: randomUUID(), host: "a.com" }));
  globalTrafficBuffer.push(makeEntry({ id: randomUUID(), host: "b.com" }));

  const req = new Request("http://localhost/api/tools/traffic-inspector/requests");
  const res = await requestsRoute.GET(req);
  assert.equal(res.status, 200);
  const body = await res.json() as { requests: unknown[]; total: number };
  assert.equal(body.total, 2);
});

test("GET /requests: filters by profile=llm", async () => {
  globalTrafficBuffer.push(makeEntry({ id: randomUUID(), detectedKind: "llm" }));
  globalTrafficBuffer.push(makeEntry({ id: randomUUID(), detectedKind: "app" }));

  const req = new Request(
    "http://localhost/api/tools/traffic-inspector/requests?profile=llm"
  );
  const res = await requestsRoute.GET(req);
  assert.equal(res.status, 200);
  const body = await res.json() as { requests: unknown[]; total: number };
  assert.equal(body.total, 1);
});

test("GET /requests: filters by host", async () => {
  globalTrafficBuffer.push(makeEntry({ id: randomUUID(), host: "target.com" }));
  globalTrafficBuffer.push(makeEntry({ id: randomUUID(), host: "other.com" }));

  const req = new Request(
    "http://localhost/api/tools/traffic-inspector/requests?host=target.com"
  );
  const res = await requestsRoute.GET(req);
  assert.equal(res.status, 200);
  const body = await res.json() as { requests: Array<{ host: string }>; total: number };
  assert.equal(body.total, 1);
  assert.equal(body.requests[0]?.host, "target.com");
});

test("GET /requests: rejects invalid profile param with 400", async () => {
  const req = new Request(
    "http://localhost/api/tools/traffic-inspector/requests?profile=invalid"
  );
  const res = await requestsRoute.GET(req);
  assert.equal(res.status, 400);
  const body = await res.json() as { error: { message: string } };
  assert.ok(!body.error.message.includes("at /"), "must not leak stack trace");
});

test("DELETE /requests: clears the buffer", async () => {
  globalTrafficBuffer.push(makeEntry());

  const res = await requestsRoute.DELETE();
  assert.equal(res.status, 204);
  assert.equal(globalTrafficBuffer.size(), 0);
});

test("GET /requests/[id]: returns entry by id", async () => {
  const entry = makeEntry();
  globalTrafficBuffer.push(entry);

  const req = new Request(`http://localhost/api/tools/traffic-inspector/requests/${entry.id}`);
  const res = await requestDetailRoute.GET(req, {
    params: Promise.resolve({ id: entry.id }),
  });
  assert.equal(res.status, 200);
  const body = await res.json() as { id: string };
  assert.equal(body.id, entry.id);
});

test("GET /requests/[id]: returns 404 for unknown id", async () => {
  const req = new Request(
    `http://localhost/api/tools/traffic-inspector/requests/${randomUUID()}`
  );
  const res = await requestDetailRoute.GET(req, {
    params: Promise.resolve({ id: randomUUID() }),
  });
  assert.equal(res.status, 404);
  const body = await res.json() as { error: { message: string } };
  assert.ok(!body.error.message.includes("at /"), "must not leak stack trace");
});

test("PUT /requests/[id]/annotation: attaches annotation", async () => {
  const entry = makeEntry();
  globalTrafficBuffer.push(entry);

  const req = new Request(
    `http://localhost/api/tools/traffic-inspector/requests/${entry.id}/annotation`,
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ annotation: "my note" }),
    }
  );
  const res = await annotationRoute.PUT(req, {
    params: Promise.resolve({ id: entry.id }),
  });
  assert.equal(res.status, 200);
  const body = await res.json() as { annotation: string };
  assert.equal(body.annotation, "my note");

  // Confirm buffer was updated
  const updated = globalTrafficBuffer.get(entry.id);
  assert.equal(updated?.annotation, "my note");
});

test("PUT /requests/[id]/annotation: rejects annotation > 10000 chars", async () => {
  const entry = makeEntry();
  globalTrafficBuffer.push(entry);

  const req = new Request(
    `http://localhost/api/tools/traffic-inspector/requests/${entry.id}/annotation`,
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ annotation: "x".repeat(10_001) }),
    }
  );
  const res = await annotationRoute.PUT(req, {
    params: Promise.resolve({ id: entry.id }),
  });
  assert.equal(res.status, 400);
});
