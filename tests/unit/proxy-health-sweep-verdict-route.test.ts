/**
 * Health-route exposure of the last sweep verdict (sweep-verdict route, RED-first).
 *
 * Auth is bypassed the same way as the sibling proxy-health suites: no
 * INITIAL_PASSWORD in this env, so requireManagementAuth passes through.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sweep-verdict-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { recordSweepVerdict, clearSweepVerdicts } =
  await import("../../src/lib/proxyHealth/sweepVerdict.ts");
const { GET: settingsGet } = await import("../../src/app/api/settings/proxies/health/route.ts");
const { GET: v1Get } = await import("../../src/app/api/v1/management/proxies/health/route.ts");

function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  clearSweepVerdicts();
}

resetStorage();
const created = await proxiesDb.createProxy({
  name: "sweep-verdict-probe",
  type: "http",
  host: "127.0.0.1",
  port: 19091,
  status: "active",
});
const proxyId = String(created?.id ?? "");
assert.ok(proxyId, "proxy fixture created");

function get(url: string) {
  return new Request(`http://localhost${url}`);
}

test("settings health route exposes last sweep verdict with non-negative age", async () => {
  recordSweepVerdict(proxyId, {
    verdict: "blocked",
    cause: "unproven",
    status: 403,
    at: Date.now() - 240_000,
  });
  const res = await settingsGet(get("/api/settings/proxies/health"));
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    items: Array<{
      proxyId: string;
      sweep?: { verdict: string; cause: string; status: number; ageMs: number };
    }>;
  };
  const item = body.items.find((i) => i.proxyId === proxyId);
  assert.ok(item, "proxy present in health items");
  assert.ok(item.sweep, "sweep field present");
  assert.equal(item.sweep.verdict, "blocked");
  assert.equal(item.sweep.cause, "unproven");
  assert.equal(item.sweep.status, 403);
  assert.ok(item.sweep.ageMs >= 0, "age clamped non-negative");
});

test("settings health route omits sweep when no verdict recorded", async () => {
  clearSweepVerdicts();
  const res = await settingsGet(get("/api/settings/proxies/health"));
  assert.equal(res.status, 200);
  const body = (await res.json()) as { items: Array<{ proxyId: string; sweep?: unknown }> };
  const item = body.items.find((i) => i.proxyId === proxyId);
  assert.ok(item, "proxy present in health items");
  assert.equal(item.sweep, undefined);
});

test("v1 health route mirrors the sweep verdict", async () => {
  recordSweepVerdict(proxyId, {
    verdict: "blocked",
    cause: "unproven",
    status: 403,
    at: Date.now() - 60_000,
  });
  const res = await v1Get(get("/api/v1/management/proxies/health"));
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    items: Array<{
      proxyId: string;
      sweep?: { verdict: string; cause: string; status: number; ageMs: number };
    }>;
  };
  const item = body.items.find((i) => i.proxyId === proxyId);
  assert.ok(item?.sweep, "v1 sweep field present");
  assert.equal(item.sweep?.verdict, "blocked");
  assert.ok((item.sweep?.ageMs ?? -1) >= 0, "v1 age clamped non-negative");
});
