import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { FreeProxyItem } from "@/lib/freeProxyProviders/types";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

// DATA_DIR must be set before the DB core module evaluates its singleton.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-free-list-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const freeProxiesDb = await import("../../../src/lib/db/freeProxies.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const listRoute = await import("../../../src/app/api/settings/free-proxies/route.ts");

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

async function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function make(host: string, quality: number, latency: number): FreeProxyItem {
  return {
    source: "1proxy",
    host,
    port: 8080,
    type: "http",
    countryCode: "US",
    qualityScore: quality,
    latencyMs: latency,
    anonymity: "elite",
    lastValidated: "2026-01-01T00:00:00.000Z",
  };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

test("GET returns the full contract { proxies, total, hasMore, stats, syncErrors }", async () => {
  await reset();
  await freeProxiesDb.upsertFreeProxy(make("alpha.example", 90, 100));
  await freeProxiesDb.upsertFreeProxy(make("bravo.example", 40, 300));

  const res = await listRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/settings/free-proxies?sortBy=quality")
  );
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.success, true);

  const { proxies, total, stats, syncErrors } = body.data;
  assert.equal(total, 2);
  assert.equal(proxies.length, 2);
  assert.equal(stats.total, 2);
  assert.deepEqual(syncErrors, {});
  // quality sort → first item is the highest score.
  assert.equal(proxies[0].qualityScore, 90);
});

test("GET search param filters the returned proxies and total", async () => {
  await reset();
  await freeProxiesDb.upsertFreeProxy(make("alpha.example", 90, 100));
  await freeProxiesDb.upsertFreeProxy(make("bravo.example", 40, 300));

  const res = await listRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/settings/free-proxies?search=alph")
  );
  const body = await res.json();
  assert.equal(body.data.total, 1);
  assert.equal(body.data.proxies[0].host, "alpha.example");
});

test("GET surfaces syncErrors when a source previously failed", async () => {
  await reset();
  await freeProxiesDb.recordFreeProxySyncErrors("proxifly", ["HTTP 429 from upstream"]);

  const res = await listRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/settings/free-proxies")
  );
  const body = await res.json();
  assert.deepEqual(body.data.syncErrors, { proxifly: ["HTTP 429 from upstream"] });
});

test("GET requires management auth", async () => {
  await reset();
  // A fresh DB has no configured password, so a loopback/unauthenticated
  // request is treated as the pre-setup bootstrap path and allowed through
  // (see `isAuthRequired` in src/shared/utils/apiAuth.ts). Configure a
  // password + requireLogin so this test actually exercises the auth gate,
  // matching the pattern used by tests/unit/api/settings-audit.test.ts.
  process.env.INITIAL_PASSWORD = "free-proxies-list-route-test-password";
  await settingsDb.updateSettings({ requireLogin: true });

  const res = await listRoute.GET(new Request("http://localhost/api/settings/free-proxies"));
  assert.equal(res.status, 401);
});
