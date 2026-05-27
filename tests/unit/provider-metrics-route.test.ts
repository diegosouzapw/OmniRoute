import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-metrics-route-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providerMetricsRoute = await import("../../src/app/api/provider-metrics/route.ts");

type ProviderMetricsResponse = {
  metrics: Record<
    string,
    {
      totalRequests: number;
      totalSuccesses: number;
      successRate: number;
      lastRequestAt: string | null;
      lastErrorAt: string | null;
      lastStatus: number | null;
      lastErrorStatus: number | null;
    }
  >;
  topology: {
    providers: string[];
    lastProvider: string;
    errorProvider: string;
  };
};

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("GET /api/provider-metrics includes provider recency and error topology", async () => {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, provider, status, duration, error_summary)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run("openai-success", "2026-05-22T10:00:00.000Z", "openai", 200, 120, null);
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, provider, status, duration, error_summary)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run("anthropic-success", "2026-05-22T10:05:00.000Z", "anthropic", 200, 240, null);
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, provider, status, duration, error_summary)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run("openai-error", "2026-05-22T10:10:00.000Z", "openai", 500, 80, "upstream error");

  const response = await providerMetricsRoute.GET();
  const body = (await response.json()) as ProviderMetricsResponse;

  assert.equal(response.status, 200);
  assert.equal(body.metrics.openai.totalRequests, 2);
  assert.equal(body.metrics.openai.totalSuccesses, 1);
  assert.equal(body.metrics.openai.successRate, 50);
  assert.equal(body.metrics.openai.lastRequestAt, "2026-05-22T10:10:00.000Z");
  assert.equal(body.metrics.openai.lastErrorAt, "2026-05-22T10:10:00.000Z");
  assert.equal(body.metrics.openai.lastStatus, 500);
  assert.equal(body.metrics.openai.lastErrorStatus, 500);
  assert.equal(body.metrics.anthropic.lastRequestAt, "2026-05-22T10:05:00.000Z");
  assert.equal(body.metrics.anthropic.lastErrorAt, null);
  assert.deepEqual(body.topology.providers.sort(), ["anthropic", "openai"]);
  assert.equal(body.topology.lastProvider, "openai");
  assert.equal(body.topology.errorProvider, "openai");
});

test("GET /api/provider-metrics returns sanitized 500 when metrics cannot be loaded", async () => {
  const db = core.getDbInstance();
  db.close();

  const response = await providerMetricsRoute.GET();
  const body = await response.json();

  assert.equal(response.status, 500);
  assert.equal(body.error?.message, "Failed to load provider metrics");
  assert.equal(body.error?.message.includes("at /"), false);
  assert.equal(JSON.stringify(body).includes("SqliteError"), false);
});
