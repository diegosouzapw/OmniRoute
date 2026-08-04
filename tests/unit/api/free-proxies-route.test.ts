import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

// DATA_DIR must be set before the DB core module evaluates its singleton.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-free-api-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const freeProxiesDb = await import("../../../src/lib/db/freeProxies.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const listRoute = await import("../../../src/app/api/settings/free-proxies/route.ts");

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

function seed(host: string, quality: number, latency: number) {
  return freeProxiesDb.upsertFreeProxy({
    source: "1proxy",
    host,
    port: 8080,
    type: "http",
    countryCode: "US",
    qualityScore: quality,
    latencyMs: latency,
    anonymity: "elite",
    lastValidated: "2026-01-01T00:00:00.000Z",
  });
}

test("GET returns the full { proxies, total, hasMore, stats, syncErrors } shape", async () => {
  await seed("alpha.example", 90, 100);
  await seed("bravo.example", 40, 300);

  const res = await listRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/settings/free-proxies")
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    success: boolean;
    data: {
      proxies: unknown[];
      total: number;
      hasMore: boolean;
      stats: { total: number; inPool: number; bySource: Array<{ source: string; count: number }> };
      syncErrors: Record<string, string[]>;
    };
  };
  assert.equal(body.success, true);
  assert.equal(body.data.total, 2);
  assert.equal(body.data.proxies.length, 2);
  assert.equal(body.data.hasMore, false);
  assert.equal(body.data.stats.total, 2);
  assert.deepEqual(body.data.syncErrors, {});
});

test("GET search + limit via query params is reflected in the response", async () => {
  await seed("alpha.example", 90, 100);
  await seed("bravo.example", 40, 300);

  const res = await listRoute.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/settings/free-proxies?search=alph&limit=1"
    )
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    data: { proxies: unknown[]; total: number; hasMore: boolean };
  };
  assert.equal(body.data.total, 1);
  assert.equal(body.data.proxies.length, 1);
  assert.equal((body.data.proxies[0] as { host: string }).host, "alpha.example");
  assert.equal(body.data.hasMore, false);
});

test("GET rejects an unauthenticated request with 401", async () => {
  // A fresh DB has no configured password, so a loopback/unauthenticated
  // request is treated as the pre-setup bootstrap path and allowed through
  // (see `isAuthRequired` in src/shared/utils/apiAuth.ts). Configure a
  // password + requireLogin so this test actually exercises the auth gate,
  // matching the pattern used by tests/unit/api/settings-audit.test.ts.
  process.env.INITIAL_PASSWORD = "free-proxies-route-test-password";
  await settingsDb.updateSettings({ requireLogin: true });

  const res = await listRoute.GET(new Request("http://localhost/api/settings/free-proxies"));
  assert.equal(res.status, 401);
});
