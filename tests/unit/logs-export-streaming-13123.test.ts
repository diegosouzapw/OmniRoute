/**
 * Tests for #13123: GET /api/logs/export should stream responses with row caps
 * instead of buffering the entire table in memory.
 *
 * These exercise the REAL route handler (`route.GET`) against a seeded test
 * database — not a local reimplementation of the streaming logic — so a
 * regression in the route itself (or in the DB-layer cursor/generator it now
 * delegates to) is actually caught.
 */
import { describe, it, before, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-logs-export-13123-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const route = await import("../../src/app/api/logs/export/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function insertProxyLog(row: { id: string; timestamp: string; provider?: string }) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO proxy_logs (id, timestamp, provider, status, proxy_type) VALUES (?, ?, ?, ?, ?)`
  ).run(row.id, row.timestamp, row.provider ?? "openai", "ok", "http");
}

async function seedCallLog(id: string, timestamp: string) {
  await callLogs.saveCallLog({
    id,
    timestamp,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4o-mini",
    provider: "openai",
    duration: 5,
    requestBody: { messages: [{ role: "user", content: `hello ${id}` }] },
    responseBody: { choices: [{ message: { content: `world ${id}` } }] },
  });
}

async function collectStreamedJson(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  return JSON.parse(text) as Record<string, unknown>;
}

// The route filters by `since = now - hours`, so seeded rows must be
// relative to the CURRENT time, not a fixed calendar date.
function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 3600 * 1000).toISOString();
}

describe("GET /api/logs/export streaming and row cap (#13123)", () => {
  before(async () => {
    await resetStorage();
  });

  beforeEach(async () => {
    await resetStorage();
  });

  after(async () => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("streamed response is valid JSON with the expected envelope shape for call-logs", async () => {
    await seedCallLog("call-1", hoursAgo(2));
    await seedCallLog("call-2", hoursAgo(1));

    const response = await route.GET(
      new Request("http://localhost/api/logs/export?hours=168&type=call-logs")
    );
    assert.equal(response.status, 200);
    const body = await collectStreamedJson(response);

    assert.equal(body.count, 2);
    assert.equal(body.hours, 168);
    assert.equal(body.type, "call-logs");
    assert.equal(body.capped, undefined);
    const logs = body.logs as Array<{ id: string }>;
    assert.equal(logs.length, 2);
    // most-recent-first (ORDER BY timestamp DESC)
    assert.equal(logs[0].id, "call-2");
    assert.equal(logs[1].id, "call-1");
  });

  it("capped call-logs response reports totalAvailable and truncates to the requested limit", async () => {
    for (let i = 0; i < 12; i++) {
      await seedCallLog(`call-${i}`, hoursAgo(12 - i));
    }

    const response = await route.GET(
      new Request("http://localhost/api/logs/export?hours=168&type=call-logs&limit=5")
    );
    assert.equal(response.status, 200);
    const body = await collectStreamedJson(response);

    assert.equal(body.count, 5, "count should reflect the cap");
    assert.equal(body.capped, true);
    assert.equal(body.limit, 5);
    assert.equal(body.totalAvailable, 12);
    assert.equal((body.logs as unknown[]).length, 5);
  });

  it("uncapped response omits cap metadata fields", async () => {
    await seedCallLog("call-only", hoursAgo(1));

    const response = await route.GET(
      new Request("http://localhost/api/logs/export?hours=168&type=call-logs")
    );
    const body = await collectStreamedJson(response);

    assert.equal(body.capped, undefined, "should not have capped field");
    assert.equal(body.limit, undefined, "should not have limit field");
    assert.equal(body.totalAvailable, undefined, "should not have totalAvailable field");
  });

  it("streams proxy-logs from the real route via LIMIT/OFFSET pagination (iterateProxyLogsSince)", async () => {
    insertProxyLog({ id: "px-1", timestamp: hoursAgo(3) });
    insertProxyLog({ id: "px-2", timestamp: hoursAgo(2) });
    insertProxyLog({ id: "px-3", timestamp: hoursAgo(1) });

    const response = await route.GET(
      new Request("http://localhost/api/logs/export?hours=168&type=proxy-logs&limit=2")
    );
    assert.equal(response.status, 200);
    const body = await collectStreamedJson(response);

    assert.equal(body.type, "proxy-logs");
    assert.equal(body.count, 2);
    assert.equal(body.capped, true);
    assert.equal(body.totalAvailable, 3);
    const logs = body.logs as Array<{ id: string }>;
    assert.equal(logs.length, 2);
    // most-recent-first: px-3, px-2 (px-1 beyond the limit)
    assert.equal(logs[0].id, "px-3");
    assert.equal(logs[1].id, "px-2");
  });

  it("only includes rows within the requested `hours` window", async () => {
    await seedCallLog("recent", new Date().toISOString());
    await seedCallLog("ancient", "2000-01-01T00:00:00.000Z");

    const response = await route.GET(
      new Request("http://localhost/api/logs/export?hours=1&type=call-logs")
    );
    const body = await collectStreamedJson(response);
    const logs = body.logs as Array<{ id: string }>;

    assert.equal(logs.length, 1);
    assert.equal(logs[0].id, "recent");
  });

  it("returns an empty logs array with count 0 when no rows match", async () => {
    const response = await route.GET(
      new Request("http://localhost/api/logs/export?hours=1&type=call-logs")
    );
    assert.equal(response.status, 200);
    const body = await collectStreamedJson(response);

    assert.equal(body.count, 0);
    assert.deepEqual(body.logs, []);
  });
});
