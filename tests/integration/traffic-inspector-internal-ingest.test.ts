/**
 * Integration tests: Traffic Inspector internal ingest endpoint
 *
 * Tests:
 *   - POST without token → 403
 *   - POST with wrong token → 403
 *   - POST with valid token + valid body → 200 + buffer push
 *   - POST with valid token + invalid body → 400 (no stack trace)
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ti-ingest-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Set a known token BEFORE importing the route so the module picks it up
const VALID_TOKEN = "test-ingest-token-abc123xyz789-longer-than-16";
process.env.INSPECTOR_INTERNAL_INGEST_TOKEN = VALID_TOKEN;

const { globalTrafficBuffer } = await import("../../src/mitm/inspector/buffer.ts");
const ingestRoute = await import(
  "../../src/app/api/tools/traffic-inspector/internal/ingest/route.ts"
);

function makeIngestRequest(token: string | null, body: unknown): Request {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };
  if (token !== null) {
    headers["authorization"] = `Bearer ${token}`;
  }
  return new Request(
    "http://localhost/api/tools/traffic-inspector/internal/ingest",
    {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }
  );
}

function minimalEntry(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: randomUUID(),
    timestamp: new Date().toISOString(),
    method: "POST",
    host: "api.openai.com",
    path: "/v1/chat/completions",
    source: "agent-bridge",
    requestHeaders: {},
    requestSize: 0,
    responseHeaders: {},
    responseSize: 0,
    status: 200,
    ...overrides,
  };
}

test.beforeEach(() => {
  globalTrafficBuffer.clear();
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("ingest: POST without Authorization header → 403", async () => {
  const req = makeIngestRequest(null, minimalEntry());
  const res = await ingestRoute.POST(req);
  assert.equal(res.status, 403);
  const body = await res.json() as { error: { message: string } };
  assert.ok(!body.error.message.includes("at /"), "must not leak stack trace");
});

test("ingest: POST with wrong token → 403", async () => {
  const req = makeIngestRequest("wrong-token", minimalEntry());
  const res = await ingestRoute.POST(req);
  assert.equal(res.status, 403);
});

test("ingest: POST with empty string token → 403", async () => {
  const req = makeIngestRequest("", minimalEntry());
  const res = await ingestRoute.POST(req);
  assert.equal(res.status, 403);
});

test("ingest: POST with valid token + valid body → 200 + buffer push", async () => {
  const id = randomUUID();
  const req = makeIngestRequest(VALID_TOKEN, minimalEntry({ id }));
  const res = await ingestRoute.POST(req);
  assert.equal(res.status, 200);
  const body = await res.json() as { ok: boolean; id: string };
  assert.equal(body.ok, true);
  assert.equal(body.id, id);

  // Verify the entry was added to the buffer
  const entry = globalTrafficBuffer.get(id);
  assert.ok(entry, "entry should be in the buffer");
  assert.equal(entry?.host, "api.openai.com");
});

test("ingest: valid token + missing required field → 400", async () => {
  const req = makeIngestRequest(VALID_TOKEN, {
    // missing 'host', 'path', 'source', etc.
    id: randomUUID(),
    timestamp: new Date().toISOString(),
    method: "GET",
  });
  const res = await ingestRoute.POST(req);
  assert.equal(res.status, 400);
  const body = await res.json() as { error: { message: string } };
  assert.ok(!body.error.message.includes("at /"), "must not leak stack trace");
});

test("ingest: valid token + invalid JSON → 400", async () => {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "authorization": `Bearer ${VALID_TOKEN}`,
  };
  const req = new Request(
    "http://localhost/api/tools/traffic-inspector/internal/ingest",
    {
      method: "POST",
      headers,
      body: "not valid json",
    }
  );
  const res = await ingestRoute.POST(req);
  assert.equal(res.status, 400);
});

test("ingest: getIngestTokenForBootstrap returns a non-empty token", () => {
  const token = ingestRoute.getIngestTokenForBootstrap();
  assert.ok(typeof token === "string" && token.length >= 16, "token should be ≥16 chars");
});

test("ingest: multiple pushes accumulate in buffer", async () => {
  const ids = [randomUUID(), randomUUID(), randomUUID()];
  for (const id of ids) {
    const req = makeIngestRequest(VALID_TOKEN, minimalEntry({ id }));
    const res = await ingestRoute.POST(req);
    assert.equal(res.status, 200);
  }
  assert.equal(globalTrafficBuffer.size(), 3);
});
