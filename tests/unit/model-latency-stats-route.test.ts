import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-latency-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const route = await import("../../src/app/api/usage/model-latency-stats/route.ts");

async function resetStorage() {
  delete process.env.API_KEY_SECRET;
  delete process.env.INITIAL_PASSWORD;
  delete process.env.OMNIROUTE_API_KEY;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeRequest(url: string) {
  return new Request(url);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  if (ORIGINAL_API_KEY_SECRET === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  if (ORIGINAL_OMNIROUTE_API_KEY === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = ORIGINAL_OMNIROUTE_API_KEY;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function seedUsage() {
  const now = Date.now();
  const rows = [
    { provider: "openai", model: "gpt-4o", latencyMs: 100, success: true },
    { provider: "openai", model: "gpt-4o", latencyMs: 200, success: true },
    { provider: "openai", model: "gpt-4o", latencyMs: 500, success: false },
    { provider: "anthropic", model: "claude-sonnet", latencyMs: 300, success: true },
  ];

  for (const [index, row] of rows.entries()) {
    await usageHistory.saveRequestUsage({
      ...row,
      timestamp: new Date(now - index * 60_000).toISOString(),
    });
  }
}

test("GET /api/usage/model-latency-stats returns model latency snapshots", async () => {
  await seedUsage();

  const request = makeRequest(
    "http://localhost/api/usage/model-latency-stats?windowHours=1&minSamples=2"
  );
  const response = await route.GET(request);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.windowHours, 1);
  assert.equal(body.minSamples, 2);
  assert.equal(body.count, 1);
  assert.equal(body.entries[0].provider, "openai");
  assert.equal(body.entries[0].model, "gpt-4o");
  assert.equal(body.entries[0].totalRequests, 3);
  assert.equal(body.entries[0].successfulRequests, 2);
  assert.equal(body.entries[0].successRate, 2 / 3);
  assert.equal(body.entries[0].avgLatencyMs, 150);
  assert.equal(body.entries[0].p95LatencyMs, 200);
});

test("GET /api/usage/model-latency-stats filters by provider and model", async () => {
  await seedUsage();

  const request = makeRequest(
    "http://localhost/api/usage/model-latency-stats?provider=anthropic&model=claude-sonnet"
  );
  const response = await route.GET(request);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.count, 1);
  assert.equal(body.entries[0].provider, "anthropic");
  assert.equal(body.entries[0].model, "claude-sonnet");
});

test("GET /api/usage/model-latency-stats rejects invalid query params", async () => {
  const request = makeRequest("http://localhost/api/usage/model-latency-stats?windowHours=0");
  const response = await route.GET(request);
  const body = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(body.error.type, "invalid_request");
});
