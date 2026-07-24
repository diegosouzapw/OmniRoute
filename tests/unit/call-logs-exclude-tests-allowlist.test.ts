import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Home "Recent Requests" feed passes `excludeTests` to getCallLogs so the panel shows
 * ONLY real provider inference — never backend/management log rows. The filter is an
 * ALLOWLIST of the public gateway namespaces (`/v1/%` and `/api/v1/%`), applied before
 * LIMIT, rather than a blacklist of individual known noise types. This guards against
 * the reported regression where model-sync rows (request_type 'model-sync', path
 * `/api/providers/*`) leaked into the feed because the old blacklist only dropped
 * connection-test rows.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-calllogs-allowlist-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CALL_LOG_RETENTION_DAYS = "3650";

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");

type SeedRow = {
  id: string;
  timestamp: string;
  path: string;
  model: string;
  provider: string;
  source_format?: string;
  request_type?: string | null;
};

function insertCallLog(row: SeedRow) {
  const db = core.getDbInstance();
  db.prepare(
    `
    INSERT INTO call_logs (
      id, timestamp, method, path, status, model, provider, source_format, request_type, detail_state
    )
    VALUES (
      @id, @timestamp, 'POST', @path, 200, @model, @provider, @source_format, @request_type, 'none'
    )
  `
  ).run({
    source_format: row.source_format ?? null,
    request_type: row.request_type ?? null,
    ...row,
  });
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("excludeTests keeps only /v1 and /api/v1 inference rows, drops all backend/management rows", async () => {
  const base = Date.parse("2026-01-01T00:00:00.000Z");
  const iso = (i: number) => new Date(base + i * 1000).toISOString();

  // Two REAL provider inference rows — the only rows the feed should keep.
  insertCallLog({
    id: "real-v1",
    timestamp: iso(4),
    path: "/v1/chat/completions",
    model: "openai/gpt-4.1",
    provider: "openai",
  });
  insertCallLog({
    id: "real-api-v1",
    timestamp: iso(3),
    path: "/api/v1/chat/completions",
    model: "anthropic/claude-opus-4-8",
    provider: "anthropic",
  });

  // Backend/management NOISE — must never appear in the feed.
  insertCallLog({
    id: "noise-model-sync",
    timestamp: iso(2),
    path: "/api/providers/openai/models",
    model: "model-sync",
    provider: "openai",
    source_format: "-",
    request_type: "model-sync",
  });
  insertCallLog({
    id: "noise-connection-test",
    timestamp: iso(1),
    path: "/api/providers/test",
    model: "connection-test",
    provider: "openai",
    source_format: "test",
  });

  const rows = await callLogs.getCallLogs({ excludeTests: true, limit: 50 });
  const ids = rows.map((r: any) => r.id).sort();

  assert.deepEqual(
    ids,
    ["real-api-v1", "real-v1"],
    "only the /v1 and /api/v1 inference rows survive the allowlist"
  );
});

test("without excludeTests every row is returned (allowlist is opt-in)", async () => {
  const base = Date.parse("2026-02-01T00:00:00.000Z");
  insertCallLog({
    id: "real",
    timestamp: new Date(base).toISOString(),
    path: "/v1/chat/completions",
    model: "openai/gpt-4.1",
    provider: "openai",
  });
  insertCallLog({
    id: "sync",
    timestamp: new Date(base + 1000).toISOString(),
    path: "/api/providers/openai/models",
    model: "model-sync",
    provider: "openai",
    request_type: "model-sync",
  });

  const rows = await callLogs.getCallLogs({ limit: 50 });
  assert.equal(rows.length, 2, "no allowlist → backend rows are not filtered out");
});
