import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-db-inspector-sessions-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const mod = await import("../../src/lib/db/inspectorSessions.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("createSession returns a uuid and started_at timestamp", () => {
  const { id, started_at } = mod.createSession();

  assert.match(id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  assert.ok(Date.parse(started_at) > 0);
});

test("createSession persists name and profile", () => {
  const { id } = mod.createSession({ name: "My Session", profile: "llm" });

  const row = mod.getSession(id);
  assert.ok(row);
  assert.equal(row.name, "My Session");
  assert.equal(row.profile, "llm");
  assert.equal(row.ended_at, null);
  assert.equal(row.request_count, 0);
});

test("listSessions returns all created sessions", () => {
  const { id: id1 } = mod.createSession({ name: "First" });
  const { id: id2 } = mod.createSession({ name: "Second" });

  const sessions = mod.listSessions();
  assert.ok(sessions.length >= 2);

  const ids = sessions.map((s) => s.id);
  assert.ok(ids.includes(id1), "First session should be in the list");
  assert.ok(ids.includes(id2), "Second session should be in the list");
});

test("appendSessionRequest increments seq atomically and updates request_count", () => {
  const { id } = mod.createSession();

  mod.appendSessionRequest(id, JSON.stringify({ a: 1 }));
  mod.appendSessionRequest(id, JSON.stringify({ a: 2 }));
  mod.appendSessionRequest(id, JSON.stringify({ a: 3 }));

  const session = mod.getSession(id);
  assert.equal(session?.request_count, 3);

  const requests = mod.getSessionRequests(id);
  assert.equal(requests.length, 3);
  assert.equal(requests[0].seq, 1);
  assert.equal(requests[1].seq, 2);
  assert.equal(requests[2].seq, 3);
});

test("getSessionRequests returns payloads in seq order", () => {
  const { id } = mod.createSession();

  mod.appendSessionRequest(id, "payload-A");
  mod.appendSessionRequest(id, "payload-B");
  mod.appendSessionRequest(id, "payload-C");

  const requests = mod.getSessionRequests(id);
  assert.equal(requests[0].payload, "payload-A");
  assert.equal(requests[1].payload, "payload-B");
  assert.equal(requests[2].payload, "payload-C");
});

test("stopSession sets ended_at timestamp", () => {
  const { id } = mod.createSession();

  const before = mod.getSession(id);
  assert.equal(before?.ended_at, null);

  mod.stopSession(id);

  const after = mod.getSession(id);
  assert.ok(after?.ended_at !== null);
  assert.ok(Date.parse(after?.ended_at as string) > 0);
});

test("renameSession updates the name", () => {
  const { id } = mod.createSession({ name: "Old Name" });
  mod.renameSession(id, "New Name");

  const row = mod.getSession(id);
  assert.equal(row?.name, "New Name");
});

test("deleteSession removes session and cascade-deletes requests", () => {
  const { id } = mod.createSession();
  mod.appendSessionRequest(id, "payload-1");
  mod.appendSessionRequest(id, "payload-2");

  mod.deleteSession(id);

  const session = mod.getSession(id);
  assert.equal(session, null);

  const requests = mod.getSessionRequests(id);
  assert.equal(requests.length, 0);
});

test("getSession returns null for non-existent id", () => {
  const row = mod.getSession("00000000-0000-4000-8000-000000000000");
  assert.equal(row, null);
});

test("getSessionRequests returns empty array for session with no requests", () => {
  const { id } = mod.createSession();
  const requests = mod.getSessionRequests(id);
  assert.deepEqual(requests, []);
});

function makeValidInterceptedPayload(overrides: Record<string, unknown> = {}): string {
  return JSON.stringify({
    id: crypto.randomUUID(),
    source: "agent-bridge",
    timestamp: new Date().toISOString(),
    method: "POST",
    host: "api.example.com",
    path: "/v1/chat/completions",
    requestHeaders: { "content-type": "application/json" },
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: 200,
    ...overrides,
  });
}

test("snapshotSession returns parsed InterceptedRequest[] in seq order", () => {
  const { id } = mod.createSession();
  mod.appendSessionRequest(id, makeValidInterceptedPayload({ path: "/req-1" }));
  mod.appendSessionRequest(id, makeValidInterceptedPayload({ path: "/req-2" }));
  mod.appendSessionRequest(id, makeValidInterceptedPayload({ path: "/req-3" }));

  const snapshot = mod.snapshotSession(id);
  assert.ok(snapshot !== null);
  assert.equal(snapshot.length, 3);
  assert.equal(snapshot[0].path, "/req-1");
  assert.equal(snapshot[1].path, "/req-2");
  assert.equal(snapshot[2].path, "/req-3");
});

test("snapshotSession returns null for non-existent session", () => {
  const snapshot = mod.snapshotSession("00000000-0000-4000-8000-000000000000");
  assert.equal(snapshot, null);
});

test("snapshotSession silently skips rows that fail schema validation", () => {
  const { id } = mod.createSession();
  mod.appendSessionRequest(id, makeValidInterceptedPayload({ path: "/good" }));
  mod.appendSessionRequest(id, JSON.stringify({ malformed: true }));
  mod.appendSessionRequest(id, makeValidInterceptedPayload({ path: "/good-2" }));

  const snapshot = mod.snapshotSession(id);
  assert.ok(snapshot !== null);
  assert.equal(snapshot.length, 2);
  assert.equal(snapshot[0].path, "/good");
  assert.equal(snapshot[1].path, "/good-2");
});
