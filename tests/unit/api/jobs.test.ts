/** /api/jobs route tests . */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-jobs-api-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_WARMUP_ENABLED = "1";

const core = await import("../../../src/lib/db/core.ts");
const { getJobRegistry, __resetJobRegistry } =
  await import("../../../src/lib/jobRegistry/index.ts");
const route = await import("../../../src/app/api/jobs/route.ts");
const runsRoute = await import("../../../src/app/api/jobs/[id]/runs/route.ts");
const enableRoute = await import("../../../src/app/api/jobs/[id]/enable/route.ts");
const disableRoute = await import("../../../src/app/api/jobs/[id]/disable/route.ts");
const runNowRoute = await import("../../../src/app/api/jobs/[id]/run-now/route.ts");
const { isLocalOnlyPath } = await import("../../../src/server/authz/routeGuard.ts");

function resetAll() {
  try {
    getJobRegistry().stopAll();
  } catch {
    // no singleton yet
  }
  __resetJobRegistry();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetAll();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function params(id: string) {
  return Promise.resolve({ id });
}

async function json(res: Response) {
  return res.json();
}

test("GET /api/jobs -> 200 + list with lastRun, seeds present", async () => {
  const reg = getJobRegistry();
  // Register a custom job so listJobs reflects runtime registrations.
  reg.register({
    id: "custom",
    type: "interval",
    cron: null,
    intervalMs: 1000,
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    handler: async () => ({ success: true }),
  });
  const res = await route.GET();
  assert.equal(res.status, 200);
  const body = (await json(res)) as { data: Array<{ id: string; lastRun: unknown }> };
  assert.ok(Array.isArray(body.data));
  const ids = body.data.map((j) => j.id);
  assert.ok(ids.includes("budget_reset"), "seeded budget_reset present");
  assert.ok(ids.includes("warmup"), "seeded warmup present");
  assert.ok(ids.includes("custom"), "runtime-registered custom present");
  // DTO whitelist: no handler/timer leaked.
  for (const job of body.data) {
    assert.ok(!("handler" in job), "DTO must not expose handler");
    assert.ok(Object.prototype.hasOwnProperty.call(job, "lastRun"), "lastRun present");
  }
});

test("GET /api/jobs/:id/runs -> 200 + history", async () => {
  const reg = getJobRegistry();
  reg.register({
    id: "custom",
    type: "interval",
    cron: null,
    intervalMs: 1000,
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    handler: async () => ({ success: true, recordsAffected: 2 }),
  });
  await reg.runNow("custom");
  await new Promise((r) => setTimeout(r, 30));
  const res = await runsRoute.GET(new Request("http://localhost/api/jobs/custom/runs"), {
    params: params("custom"),
  });
  assert.equal(res.status, 200);
  const body = (await json(res)) as { data: Array<{ status: string }> };
  assert.ok(body.data.length >= 1);
  assert.equal(body.data[0].status, "success");
});

test("GET /api/jobs/unknown/runs -> 404", async () => {
  const res = await runsRoute.GET(new Request("http://localhost/api/jobs/nope/runs"), {
    params: params("nope"),
  });
  assert.equal(res.status, 404);
});

test("POST /api/jobs/:id/enable -> 200 + enabled:true", async () => {
  const reg = getJobRegistry();
  reg.register({
    id: "custom",
    type: "interval",
    cron: null,
    intervalMs: 1000,
    enabled: false,
    envFlag: null,
    config: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    handler: async () => ({ success: true }),
  });
  const res = await enableRoute.POST(
    new Request("http://localhost/api/jobs/custom/enable", { method: "POST" }),
    { params: params("custom") }
  );
  assert.equal(res.status, 200);
  const body = (await json(res)) as { data: { id: string; enabled: boolean } };
  assert.deepEqual(body.data, { id: "custom", enabled: true });
  assert.equal(reg.listJobs().find((j) => j.id === "custom")!.enabled, true);
});

test("POST /api/jobs/:id/disable -> 200 + enabled:false", async () => {
  const reg = getJobRegistry();
  reg.register({
    id: "custom",
    type: "interval",
    cron: null,
    intervalMs: 1000,
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    handler: async () => ({ success: true }),
  });
  const res = await disableRoute.POST(
    new Request("http://localhost/api/jobs/custom/disable", { method: "POST" }),
    { params: params("custom") }
  );
  assert.equal(res.status, 200);
  const body = (await json(res)) as { data: { id: string; enabled: boolean } };
  assert.deepEqual(body.data, { id: "custom", enabled: false });
  assert.equal(reg.listJobs().find((j) => j.id === "custom")!.enabled, false);
});

test("POST /api/jobs/:id/run-now -> 200 + started:true", async () => {
  const reg = getJobRegistry();
  reg.register({
    id: "custom",
    type: "interval",
    cron: null,
    intervalMs: 1000,
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    handler: async () => ({ success: true }),
  });
  const res = await runNowRoute.POST(
    new Request("http://localhost/api/jobs/custom/run-now", { method: "POST" }),
    { params: params("custom") }
  );
  assert.equal(res.status, 200);
  const body = (await json(res)) as { data: { started: boolean } };
  assert.equal(body.data.started, true);
});

test("POST /api/jobs/unknown/run-now -> 404", async () => {
  const res = await runNowRoute.POST(
    new Request("http://localhost/api/jobs/nope/run-now", { method: "POST" }),
    { params: params("nope") }
  );
  assert.equal(res.status, 404);
});

test("LOCAL_ONLY guard: /api/jobs and children are loopback-only", () => {
  assert.equal(isLocalOnlyPath("/api/jobs"), true, "bare /api/jobs");
  assert.equal(isLocalOnlyPath("/api/jobs/"), true, "/api/jobs/");
  assert.equal(isLocalOnlyPath("/api/jobs/budget_reset/runs"), true, "runs sub-path");
  assert.equal(isLocalOnlyPath("/api/jobs/warmup/enable"), true, "enable sub-path");
  assert.equal(isLocalOnlyPath("/api/jobs/warmup/disable"), true, "disable sub-path");
  assert.equal(isLocalOnlyPath("/api/jobs/warmup/run-now"), true, "run-now sub-path");
});

test("error responses do not leak stack traces", async () => {
  // 404 path - assert the error message is sanitized (no "at /" frame).
  const res = await runsRoute.GET(new Request("http://localhost/api/jobs/nope/runs"), {
    params: params("nope"),
  });
  const body = (await json(res)) as { error: { message: string } };
  assert.ok(!body.error.message.includes("at /"), "error message must not leak stack path");
});
