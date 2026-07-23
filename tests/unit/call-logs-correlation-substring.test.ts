import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cid-substr-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// Seed test data
function seedLogs() {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT OR REPLACE INTO call_logs (id, timestamp, method, path, status, model, provider, account, duration, tokens_in, tokens_out, correlation_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "log-1",
    now,
    "POST",
    "/v1/chat/completions",
    200,
    "gpt-4",
    "openai",
    "acc1",
    100,
    10,
    20,
    "abc123-def456-ghi789"
  );
  db.prepare(
    `INSERT OR REPLACE INTO call_logs (id, timestamp, method, path, status, model, provider, account, duration, tokens_in, tokens_out, correlation_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "log-2",
    now,
    "POST",
    "/v1/chat/completions",
    200,
    "claude-3",
    "anthropic",
    "acc2",
    200,
    15,
    30,
    "xyz999-uvw888-tsr777"
  );
  db.prepare(
    `INSERT OR REPLACE INTO call_logs (id, timestamp, method, path, status, model, provider, account, duration, tokens_in, tokens_out, correlation_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "log-3",
    now,
    "POST",
    "/v1/chat/completions",
    500,
    "gpt-4",
    "openai",
    "acc1",
    50,
    0,
    0,
    null
  );
}

// ── Exact match ───────────────────────────────────────────────────────────

test("correlationId exact match returns single entry", async () => {
  seedLogs();
  const results = await callLogs.getCallLogs({ correlationId: "abc123-def456-ghi789" });
  assert.equal(results.length, 1);
  assert.equal(results[0].correlationId, "abc123-def456-ghi789");
});

// ── Substring match ───────────────────────────────────────────────────────

test("correlationId substring match (prefix)", async () => {
  seedLogs();
  const results = await callLogs.getCallLogs({ correlationId: "abc123" });
  assert.equal(results.length, 1);
  assert.equal(results[0].id, "log-1");
});

test("correlationId substring match (middle)", async () => {
  seedLogs();
  const results = await callLogs.getCallLogs({ correlationId: "def456" });
  assert.equal(results.length, 1);
  assert.equal(results[0].id, "log-1");
});

test("correlationId substring match (suffix)", async () => {
  seedLogs();
  const results = await callLogs.getCallLogs({ correlationId: "ghi789" });
  assert.equal(results.length, 1);
  assert.equal(results[0].id, "log-1");
});

test("correlationId substring match returns multiple when shared", async () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  // Add another log sharing a substring
  db.prepare(
    `INSERT OR REPLACE INTO call_logs (id, timestamp, method, path, status, model, provider, account, duration, tokens_in, tokens_out, correlation_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "log-4",
    now,
    "POST",
    "/v1/chat/completions",
    200,
    "gpt-4",
    "openai",
    "acc1",
    100,
    10,
    20,
    "abc123-RETRY-suffix"
  );

  const results = await callLogs.getCallLogs({ correlationId: "abc123" });
  assert.equal(results.length, 2);
  const ids = results.map((r: { id: string }) => r.id).sort();
  assert.deepEqual(ids, ["log-1", "log-4"]);
});

// ── No match ──────────────────────────────────────────────────────────────

test("correlationId no match returns empty", async () => {
  seedLogs();
  const results = await callLogs.getCallLogs({ correlationId: "nonexistent" });
  assert.equal(results.length, 0);
});

// ── Null/empty correlationId rows excluded ─────────────────────────────────

test("rows with null correlationId are excluded from substring search", async () => {
  seedLogs();
  // Search for a unique substring that only matches log-1
  const results = await callLogs.getCallLogs({ correlationId: "ghi789" });
  const ids = results.map((r: { id: string }) => r.id);
  assert.ok(!ids.includes("log-3"), "null correlation_id rows must be excluded");
  assert.equal(results.length, 1);
});
