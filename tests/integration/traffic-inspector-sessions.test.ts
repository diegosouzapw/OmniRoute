/**
 * Integration tests: Traffic Inspector sessions CRUD
 *
 * Tests the full lifecycle: POST start → PATCH stop → GET snapshot → DELETE cascade.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ti-sessions-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { resetDbInstance, getDbInstance } = await import("../../src/lib/db/core.ts");

async function resetStorage() {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // Re-initialize db
  getDbInstance();
}

const sessionsRoute = await import(
  "../../src/app/api/tools/traffic-inspector/sessions/route.ts"
);
const sessionDetailRoute = await import(
  "../../src/app/api/tools/traffic-inspector/sessions/[id]/route.ts"
);
const sessionHarRoute = await import(
  "../../src/app/api/tools/traffic-inspector/sessions/[id]/export.har/route.ts"
);
const { appendSessionRequest } = await import("../../src/lib/db/inspectorSessions.ts");

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("POST /sessions: creates a session", async () => {
  const req = new Request("http://localhost/api/tools/traffic-inspector/sessions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Test Session" }),
  });
  const res = await sessionsRoute.POST(req);
  assert.equal(res.status, 201);
  const body = await res.json() as { id: string; started_at: string };
  assert.ok(body.id, "should have an id");
  assert.ok(body.started_at, "should have started_at");
});

test("POST /sessions: name is optional", async () => {
  const req = new Request("http://localhost/api/tools/traffic-inspector/sessions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}",
  });
  const res = await sessionsRoute.POST(req);
  assert.equal(res.status, 201);
});

test("GET /sessions: lists all sessions", async () => {
  // Create two sessions
  await sessionsRoute.POST(
    new Request("http://localhost/api/tools/traffic-inspector/sessions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "s1" }),
    })
  );
  await sessionsRoute.POST(
    new Request("http://localhost/api/tools/traffic-inspector/sessions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "s2" }),
    })
  );

  const res = await sessionsRoute.GET();
  assert.equal(res.status, 200);
  const body = await res.json() as { sessions: unknown[] };
  assert.equal(body.sessions.length, 2);
});

test("PATCH /sessions/[id]: stop adds ended_at", async () => {
  const createRes = await sessionsRoute.POST(
    new Request("http://localhost/api/tools/traffic-inspector/sessions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    })
  );
  const session = await createRes.json() as { id: string };

  const patchReq = new Request("http://localhost/", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action: "stop" }),
  });
  const patchRes = await sessionDetailRoute.PATCH(patchReq, {
    params: Promise.resolve({ id: session.id }),
  });
  assert.equal(patchRes.status, 200);
  const body = await patchRes.json() as { ended_at: string | null };
  assert.ok(body.ended_at !== null, "ended_at should be set after stop");
});

test("PATCH /sessions/[id]: rename updates name", async () => {
  const createRes = await sessionsRoute.POST(
    new Request("http://localhost/api/tools/traffic-inspector/sessions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "old-name" }),
    })
  );
  const session = await createRes.json() as { id: string };

  const patchRes = await sessionDetailRoute.PATCH(
    new Request("http://localhost/", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "rename", name: "new-name" }),
    }),
    { params: Promise.resolve({ id: session.id }) }
  );
  assert.equal(patchRes.status, 200);
  const body = await patchRes.json() as { name: string };
  assert.equal(body.name, "new-name");
});

test("GET /sessions/[id]: returns session with requests", async () => {
  const createRes = await sessionsRoute.POST(
    new Request("http://localhost/api/tools/traffic-inspector/sessions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "with-reqs" }),
    })
  );
  const session = await createRes.json() as { id: string };

  // Append a fake request
  const payload = JSON.stringify({
    id: randomUUID(),
    source: "agent-bridge",
    method: "POST",
    host: "api.openai.com",
    path: "/v1/chat/completions",
    status: 200,
    requestHeaders: {},
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    timestamp: new Date().toISOString(),
  });
  appendSessionRequest(session.id, payload);

  const getRes = await sessionDetailRoute.GET(
    new Request("http://localhost/"),
    { params: Promise.resolve({ id: session.id }) }
  );
  assert.equal(getRes.status, 200);
  const body = await getRes.json() as { session: { id: string }; requests: unknown[] };
  assert.equal(body.session.id, session.id);
  assert.equal(body.requests.length, 1);
});

test("DELETE /sessions/[id]: cascades requests", async () => {
  const createRes = await sessionsRoute.POST(
    new Request("http://localhost/api/tools/traffic-inspector/sessions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    })
  );
  const session = await createRes.json() as { id: string };

  appendSessionRequest(session.id, JSON.stringify({ note: "test" }));

  const delRes = await sessionDetailRoute.DELETE(
    new Request("http://localhost/"),
    { params: Promise.resolve({ id: session.id }) }
  );
  assert.equal(delRes.status, 204);

  // Session should be gone
  const getRes = await sessionDetailRoute.GET(
    new Request("http://localhost/"),
    { params: Promise.resolve({ id: session.id }) }
  );
  assert.equal(getRes.status, 404);
});

test("GET /sessions/[id]/export.har: returns HAR file", async () => {
  const createRes = await sessionsRoute.POST(
    new Request("http://localhost/api/tools/traffic-inspector/sessions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "har-test" }),
    })
  );
  const session = await createRes.json() as { id: string };

  const reqPayload = {
    id: randomUUID(),
    source: "agent-bridge",
    method: "POST",
    host: "api.openai.com",
    path: "/v1/chat/completions",
    status: 200,
    requestHeaders: {},
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    timestamp: new Date().toISOString(),
  };
  appendSessionRequest(session.id, JSON.stringify(reqPayload));

  const harRes = await sessionHarRoute.GET(
    new Request("http://localhost/"),
    { params: Promise.resolve({ id: session.id }) }
  );
  assert.equal(harRes.status, 200);
  assert.ok(
    harRes.headers.get("content-disposition")?.includes(".har"),
    "should have .har filename"
  );
  const har = await harRes.json() as { log: { entries: unknown[] } };
  assert.ok(har.log, "should be a HAR object");
  assert.equal(har.log.entries.length, 1);
});
