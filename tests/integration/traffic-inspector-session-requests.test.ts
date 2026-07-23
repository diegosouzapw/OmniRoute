/**
 * Integration tests: POST /api/tools/traffic-inspector/sessions/[id]/requests
 *
 * Tests snapshot persistence: seq increments, request_count sync, validation, 404.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ti-session-requests-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { resetDbInstance, getDbInstance } = await import("../../src/lib/db/core.ts");

async function resetStorage() {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  getDbInstance();
}

const sessionsRoute = await import(
  "../../src/app/api/tools/traffic-inspector/sessions/route.ts"
);
const sessionDetailRoute = await import(
  "../../src/app/api/tools/traffic-inspector/sessions/[id]/route.ts"
);
const sessionRequestsRoute = await import(
  "../../src/app/api/tools/traffic-inspector/sessions/[id]/requests/route.ts"
);

async function createSession(name?: string): Promise<string> {
  const res = await sessionsRoute.POST(
    new Request("http://localhost/api/tools/traffic-inspector/sessions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(name !== undefined ? { name } : {}),
    })
  );
  const body = (await res.json()) as { id: string };
  return body.id;
}

async function postRequest(sessionId: string, payload: string): Promise<Response> {
  return sessionRequestsRoute.POST(
    new Request("http://localhost/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ payload }),
    }),
    { params: Promise.resolve({ id: sessionId }) }
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("POST /sessions/[id]/requests: seq increments 1, 2, 3", async () => {
  const id = await createSession("seq-test");

  const r1 = await postRequest(id, JSON.stringify({ note: "first" }));
  assert.equal(r1.status, 201);
  const b1 = (await r1.json()) as { seq: number };
  assert.equal(b1.seq, 1);

  const r2 = await postRequest(id, JSON.stringify({ note: "second" }));
  assert.equal(r2.status, 201);
  const b2 = (await r2.json()) as { seq: number };
  assert.equal(b2.seq, 2);

  const r3 = await postRequest(id, JSON.stringify({ note: "third" }));
  assert.equal(r3.status, 201);
  const b3 = (await r3.json()) as { seq: number };
  assert.equal(b3.seq, 3);
});

test("POST /sessions/[id]/requests: GET session reflects requestCount === 3", async () => {
  const id = await createSession("count-test");

  await postRequest(id, "payload-1");
  await postRequest(id, "payload-2");
  await postRequest(id, "payload-3");

  const getRes = await sessionDetailRoute.GET(new Request("http://localhost/"), {
    params: Promise.resolve({ id }),
  });
  assert.equal(getRes.status, 200);
  const body = (await getRes.json()) as { session: { request_count: number } };
  assert.equal(body.session.request_count, 3);
});

test("POST /sessions/[id]/requests: invalid body returns 400", async () => {
  const id = await createSession("validation-test");

  // Missing `payload` field
  const res = await sessionRequestsRoute.POST(
    new Request("http://localhost/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ not_payload: "oops" }),
    }),
    { params: Promise.resolve({ id }) }
  );
  assert.equal(res.status, 400);
});

test("POST /sessions/[id]/requests: payload exceeding 1MB cap returns 400", async () => {
  const id = await createSession("size-cap-test");

  // Exceed 1_048_576 bytes
  const oversized = "x".repeat(1_048_577);
  const res = await postRequest(id, oversized);
  assert.equal(res.status, 400);
});

test("POST /sessions/[id]/requests: non-existent session id returns 404", async () => {
  const res = await postRequest("00000000-0000-4000-8000-000000000000", "some-payload");
  assert.equal(res.status, 404);
});

test("POST /sessions/[id]/requests: error response does not leak stack trace", async () => {
  // POST to non-existent session — exercises the 404 path error body
  const res = await postRequest("00000000-0000-4000-8000-000000000099", "data");
  assert.equal(res.status, 404);
  const body = await res.json() as { error?: { message?: string } };
  const msg = body?.error?.message ?? "";
  assert.ok(!msg.includes("at /"), "should not contain stack trace");
});
