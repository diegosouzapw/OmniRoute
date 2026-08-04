import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-latency-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const route = await import("../../src/app/api/usage/model-latency-stats/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "model-latency-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
}

let seedCounter = 0;

// Each call gets a distinct connectionId + timestamp so the saveRequestUsage
// dedup guard (same-second identity match on provider/model/connection/apiKey/
// tokens) never collapses two intentionally-distinct seeded rows into one —
// aggregation groups by provider/model only, so connectionId has no effect
// on the assertions below.
async function seedUsage(provider: string, model: string, latencyMs: number, success = true) {
  seedCounter += 1;
  await usageHistory.saveRequestUsage({
    provider,
    model,
    success,
    latencyMs,
    status: success ? "200" : "500",
    connectionId: `seed-conn-${seedCounter}`,
    timestamp: new Date(Date.now() + seedCounter).toISOString(),
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;

  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
});

test("model latency stats route requires management auth", async () => {
  await enableManagementAuth();

  const unauthenticated = await route.GET(
    new Request("http://localhost/api/usage/model-latency-stats")
  );
  assert.equal(unauthenticated.status, 401);
});

test("model latency stats route aggregates and returns entries for seeded providers/models", async () => {
  await enableManagementAuth();
  await seedUsage("openai", "gpt-4o-mini", 100);
  await seedUsage("openai", "gpt-4o-mini", 120);
  await seedUsage("anthropic", "claude-3-5-haiku", 200);
  await seedUsage("anthropic", "claude-3-5-haiku", 220);

  const response = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/usage/model-latency-stats")
  );
  assert.equal(response.status, 200);
  const body = await response.json();

  assert.equal(body.windowHours, 24);
  assert.ok(typeof body.generatedAt === "string");
  assert.equal(body.entries.length, 2);

  const openaiEntry = body.entries.find((e: { provider: string }) => e.provider === "openai");
  assert.ok(openaiEntry);
  assert.equal(openaiEntry.model, "gpt-4o-mini");
  assert.equal(openaiEntry.totalRequests, 2);
  assert.equal(openaiEntry.successfulRequests, 2);
  assert.equal(openaiEntry.successRate, 1);
  assert.equal(openaiEntry.avgLatencyMs, 110);
});

test("model latency stats route filters by provider query param", async () => {
  await enableManagementAuth();
  await seedUsage("openai", "gpt-4o-mini", 100);
  await seedUsage("anthropic", "claude-3-5-haiku", 200);

  const response = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/usage/model-latency-stats?provider=openai"
    )
  );
  assert.equal(response.status, 200);
  const body = await response.json();

  assert.equal(body.entries.length, 1);
  assert.equal(body.entries[0].provider, "openai");
});

test("model latency stats route filters by model query param", async () => {
  await enableManagementAuth();
  await seedUsage("openai", "gpt-4o-mini", 100);
  await seedUsage("openai", "gpt-4o", 150);

  const response = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/usage/model-latency-stats?model=gpt-4o-mini"
    )
  );
  assert.equal(response.status, 200);
  const body = await response.json();

  assert.equal(body.entries.length, 1);
  assert.equal(body.entries[0].model, "gpt-4o-mini");
});

test("model latency stats route excludes provider/model pairs below minSamples", async () => {
  await enableManagementAuth();
  await seedUsage("openai", "gpt-4o-mini", 100);
  await seedUsage("anthropic", "claude-3-5-haiku", 200);
  await seedUsage("anthropic", "claude-3-5-haiku", 220);

  const response = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/usage/model-latency-stats?minSamples=2"
    )
  );
  assert.equal(response.status, 200);
  const body = await response.json();

  assert.equal(body.entries.length, 1);
  assert.equal(body.entries[0].provider, "anthropic");
});

test("model latency stats route returns 400 with sanitized error body on invalid query params", async () => {
  await enableManagementAuth();

  const response = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/usage/model-latency-stats?windowHours=-5"
    )
  );
  assert.equal(response.status, 400);
  const body = await response.json();

  assert.ok(body.error);
  assert.ok(typeof body.error.message === "string");
  assert.ok(!body.error.message.includes("at /"));
});

test("model latency stats route returns 400 for maxRows above the allowed cap", async () => {
  await enableManagementAuth();

  const response = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/usage/model-latency-stats?maxRows=999999999"
    )
  );
  assert.equal(response.status, 400);
});

test("model latency stats route returns sanitized 500 body when the aggregate throws", async () => {
  await enableManagementAuth();

  // Close the underlying SQLite handle without resetting the module-level
  // singleton reference, so the next getDbInstance() call inside the route
  // hits a closed connection ("The database connection is not open") and
  // the route's catch block has to produce a real sanitized 500 — no
  // module-namespace mocking (ESM bindings here are non-writable at runtime
  // under node:test) and no fabricated error message.
  core.closeDbInstance();
  const db = core.getDbInstance();
  db.close();

  try {
    const response = await route.GET(
      await makeManagementSessionRequest("http://localhost/api/usage/model-latency-stats")
    );
    assert.equal(response.status, 500);
    const body = await response.json();

    assert.ok(body.error);
    assert.ok(typeof body.error.message === "string");
    assert.ok(!body.error.message.includes("at /"));
  } finally {
    core.resetDbInstance();
  }
});
