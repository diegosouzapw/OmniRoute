import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #8249: caller session tag (X-OmniRoute-Session-Id header) propagated into call_logs
// so operators can attribute cost per caller session. Isolated DATA_DIR per PII learnings §3
// (resetDbInstance() + handle cleanup in test.after so the node:test runner doesn't hang).
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-session-tag-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("saveCallLog persists sessionTag when explicitly supplied", async () => {
  const testId = `test-sessiontag-${Date.now()}`;

  await callLogs.saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 10, out: 5 },
    sessionTag: "sess-abc",
  });

  const db = core.getDbInstance();
  const row = db
    .prepare("SELECT id, session_tag FROM call_logs WHERE id = ?")
    .get(testId) as Record<string, unknown>;
  assert.ok(row, "row should exist in call_logs");
  assert.equal(row.session_tag, "sess-abc");
});

test("auto-generated call log ids embed the process pid and stay unique per process", async () => {
  // Two OmniRoute processes (dev checkout + globally-installed CLI) can share
  // one SQLite file. A bare `Date.now()-counter` id collides the moment both
  // land on the same millisecond, so the INSERT fails with
  // "UNIQUE constraint failed: call_logs.id" and the call is never logged.
  // The pid makes ids unique per process; this guards the format + uniqueness.
  const db = core.getDbInstance();

  await callLogs.saveCallLog({
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 1, out: 1 },
  });
  await callLogs.saveCallLog({
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 1, out: 1 },
  });

  const rows = db
    .prepare("SELECT id FROM call_logs ORDER BY rowid DESC LIMIT 2")
    .all() as Array<{ id: string }>;
  assert.equal(rows.length, 2, "both auto-id rows persisted");
  const ids = rows.map((row) => row.id);
  assert.notEqual(ids[0], ids[1], "two auto-generated ids must differ");
  for (const id of ids) {
    const parts = id.split("-");
    assert.equal(parts.length, 3, `expected <ms>-<pid>-<counter>, got "${id}"`);
    assert.equal(Number(parts[1]), process.pid, `id embeds the process pid: ${id}`);
  }
});

test("saveCallLog stores NULL session_tag when absent (never synthesized)", async () => {
  const testId = `test-nosessiontag-${Date.now()}`;

  await callLogs.saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 10, out: 5 },
  });

  const db = core.getDbInstance();
  const row = db
    .prepare("SELECT id, session_tag FROM call_logs WHERE id = ?")
    .get(testId) as Record<string, unknown>;
  assert.ok(row, "row should exist in call_logs");
  assert.equal(row.session_tag, null, "session_tag must be null when no header was supplied");
});

test("getCallLogs returns sessionTag on the mapped row", async () => {
  const testId = `test-getsessiontag-${Date.now()}`;

  await callLogs.saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 10, out: 5 },
    sessionTag: "sess-roundtrip",
  });

  const logs = await callLogs.getCallLogs({ limit: 200 });
  const found = logs.find((l: { id: string }) => l.id === testId);
  assert.ok(found, "log entry should be found via getCallLogs");
  assert.equal(found.sessionTag, "sess-roundtrip");
});

test("getCallLogs filters by sessionTag (substring match, mirroring correlationId)", async () => {
  const idMatch = `test-filter-match-${Date.now()}`;
  const idOther = `test-filter-other-${Date.now()}`;

  await callLogs.saveCallLog({
    id: idMatch,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 10, out: 5 },
    sessionTag: "customer-42-session",
  });
  await callLogs.saveCallLog({
    id: idOther,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 10, out: 5 },
    sessionTag: "unrelated-session",
  });

  const results = await callLogs.getCallLogs({ sessionTag: "customer-42" });
  const ids = results.map((r: { id: string }) => r.id);
  assert.ok(ids.includes(idMatch), "matching sessionTag row must be returned");
  assert.ok(!ids.includes(idOther), "non-matching sessionTag row must be excluded");
});

test("schemaColumns self-heal ALTER for session_tag is idempotent", async () => {
  const db = core.getDbInstance();
  // Re-run the exact idempotent guard twice; must not throw either time.
  const { ensureCallLogsColumns } = await import("../../src/lib/db/schemaColumns.ts");
  assert.doesNotThrow(() => ensureCallLogsColumns(db));
  assert.doesNotThrow(() => ensureCallLogsColumns(db));

  const columns = db.prepare("PRAGMA table_info(call_logs)").all() as Array<{ name: string }>;
  assert.ok(
    columns.some((c) => c.name === "session_tag"),
    "call_logs.session_tag column must exist"
  );
});
