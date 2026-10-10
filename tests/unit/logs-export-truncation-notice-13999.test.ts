/**
 * #13999 item 3: the dashboard Export button saved a capped export (10k-row default) without
 * telling anyone. The route now mirrors the cap metadata in response headers, the page asks for
 * the server maximum and reads those headers with `readLogExportTruncation()` to warn the user.
 *
 * The route half runs the REAL handler against a seeded test DB with a small `limit`.
 */
import { describe, it, before, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-logs-export-13999-cap-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const route = await import("../../src/app/api/logs/export/route.ts");
const logExport = await import("../../src/shared/utils/logExport.ts");

const { LOG_EXPORT_HEADERS, LOG_EXPORT_MAX_ROWS, readLogExportTruncation, buildLogExportUrl } =
  logExport;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 3600 * 1000).toISOString();
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

function headersOf(values: Record<string, string>) {
  return new Headers(values);
}

describe("readLogExportTruncation (#13999)", () => {
  it("uses the emitted count instead of the preflight estimate", async () => {
    const h = headersOf({
      [LOG_EXPORT_HEADERS.count]: "2",
      [LOG_EXPORT_HEADERS.capped]: "true",
      [LOG_EXPORT_HEADERS.limit]: "2",
      [LOG_EXPORT_HEADERS.totalAvailable]: "3",
    });
    assert.deepEqual(readLogExportTruncation(h, 1), { exported: 1, total: 3, limit: 2 });
    assert.deepEqual(readLogExportTruncation(h, 0), { exported: 0, total: 3, limit: 2 });
  });

  it("warns when rows disappeared even without the row cap being reached", () => {
    const h = headersOf({
      [LOG_EXPORT_HEADERS.count]: "3",
      [LOG_EXPORT_HEADERS.capped]: "false",
      [LOG_EXPORT_HEADERS.limit]: "10",
      [LOG_EXPORT_HEADERS.totalAvailable]: "3",
    });
    assert.deepEqual(readLogExportTruncation(h, 2), { exported: 2, total: 3, limit: 10 });
  });
  it("returns null for an export the server did not cap", () => {
    const h = headersOf({
      [LOG_EXPORT_HEADERS.count]: "42",
      [LOG_EXPORT_HEADERS.capped]: "false",
      [LOG_EXPORT_HEADERS.limit]: "50000",
      [LOG_EXPORT_HEADERS.totalAvailable]: "42",
    });
    assert.equal(readLogExportTruncation(h), null);
  });

  it("returns null when the response carries no export headers at all", () => {
    assert.equal(readLogExportTruncation(headersOf({})), null);
  });

  it("reports exported/total/limit for a capped export", () => {
    const h = headersOf({
      [LOG_EXPORT_HEADERS.count]: "50000",
      [LOG_EXPORT_HEADERS.capped]: "true",
      [LOG_EXPORT_HEADERS.limit]: "50000",
      [LOG_EXPORT_HEADERS.totalAvailable]: "73210",
    });
    assert.deepEqual(readLogExportTruncation(h), { exported: 50000, total: 73210, limit: 50000 });
  });

  it("treats total > limit as capped even if the capped flag is missing", () => {
    const h = headersOf({
      [LOG_EXPORT_HEADERS.limit]: "10",
      [LOG_EXPORT_HEADERS.totalAvailable]: "11",
    });
    assert.deepEqual(readLogExportTruncation(h), { exported: 10, total: 11, limit: 10 });
  });

  it("still warns when capped is true but the numbers are unreadable", () => {
    const h = headersOf({
      [LOG_EXPORT_HEADERS.capped]: "true",
      [LOG_EXPORT_HEADERS.limit]: "abc",
      [LOG_EXPORT_HEADERS.totalAvailable]: "-5",
    });
    const t = readLogExportTruncation(h);
    assert.ok(t, "a capped flag must never be swallowed");
  });
});

describe("readLogExportEmittedCount (#13999)", () => {
  it("reads only the bounded final slice of a large export", async () => {
    const blob = new Blob(['{"logs":[{"message":"', "x".repeat(100_000), '"}],"count":1}\n']);
    const slices: number[] = [];
    const source = {
      size: blob.size,
      slice(start: number) {
        slices.push(blob.size - start);
        return blob.slice(start);
      },
    };
    assert.equal(await logExport.readLogExportEmittedCount(source), 1);
    assert.ok(slices.length === 1 && slices[0] <= 128);
  });

  for (const text of [
    '{"logs":[],"count":0}\n',
    '{"logs":[],"emitted":0,"error":"failed","count":0}\n',
  ]) {
    it(`reads the final count: ${text.trim()}`, async () => {
      assert.equal(await logExport.readLogExportEmittedCount(new Blob([text])), 0);
    });
  }

  for (const text of [
    '{"count":2,"logs":[]}',
    '{"logs":[],"count":-1}',
    '{"logs":[],"count":9007199254740992}',
    '{"logs":[]',
  ]) {
    it(`does not invent a count for a legacy or invalid trailer: ${text}`, async () => {
      assert.equal(await logExport.readLogExportEmittedCount(new Blob([text])), null);
    });
  }
});

describe("buildLogExportUrl (#13999)", () => {
  it("asks for the server maximum instead of relying on the 10k default", () => {
    const url = new URL(buildLogExportUrl(6, "request-logs"), "http://localhost");
    assert.equal(url.pathname, "/api/logs/export");
    assert.equal(url.searchParams.get("hours"), "6");
    assert.equal(url.searchParams.get("type"), "request-logs");
    assert.equal(url.searchParams.get("limit"), String(LOG_EXPORT_MAX_ROWS));
  });
});

describe("GET /api/logs/export cap headers (#13999)", () => {
  before(resetStorage);
  beforeEach(resetStorage);
  after(() => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("a capped export exposes the truncation in headers the dashboard can read", async () => {
    for (let i = 0; i < 3; i++) await seedCallLog(`cap-${i}`, hoursAgo(1));

    const res = await route.GET(
      new Request("http://localhost/api/logs/export?hours=24&type=request-logs&limit=2")
    );
    assert.equal(res.status, 200);
    assert.equal(res.headers.get(LOG_EXPORT_HEADERS.capped), "true");
    assert.deepEqual(readLogExportTruncation(res.headers), { exported: 2, total: 3, limit: 2 });

    const body = JSON.parse(await res.text());
    assert.equal(body.capped, true, "headers must agree with the streamed body");
    assert.equal(body.logs.length, 2);
  });

  it("an uncapped export yields no truncation notice", async () => {
    await seedCallLog("only-1", hoursAgo(1));

    const res = await route.GET(
      new Request("http://localhost/api/logs/export?hours=24&type=request-logs&limit=5")
    );
    assert.equal(res.status, 200);
    assert.equal(res.headers.get(LOG_EXPORT_HEADERS.capped), "false");
    assert.equal(readLogExportTruncation(res.headers), null);
    await res.text();
  });
});

describe("dashboard logs page wiring (#13999)", () => {
  const pageSource = fs.readFileSync(
    path.join(process.cwd(), "src", "app", "(dashboard)", "dashboard", "logs", "page.tsx"),
    "utf8"
  );

  it("the Export button requests the server maximum and reads the cap headers", () => {
    assert.match(pageSource, /fetch\(buildLogExportUrl\(/);
    assert.match(
      pageSource,
      /readLogExportTruncation\(\s*res\.headers,\s*await readLogExportEmittedCount\(blob\),?\s*\)/
    );
    assert.doesNotMatch(pageSource, /\/api\/logs\/export\?hours=\$\{hours\}&type=\$\{logType\}`/);
  });

  it("the truncation notice is translated through the logs namespace", () => {
    assert.match(pageSource, /logsText\(t, "exportTruncated"/);
    const en = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "src", "i18n", "messages", "en.json"), "utf8")
    );
    assert.match(en.logs.exportTruncated, /\{exported\}/);
    assert.match(en.logs.exportTruncated, /\{total\}/);
  });
});
