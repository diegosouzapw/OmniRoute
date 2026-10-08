/**
 * Blocked-history display wiring (RED-first, extension 2026-09-27).
 *
 * The persisted store (`blockedHistory.ts`) must be readable where the
 * sweep verdict is already exposed: both health routes join
 * `getBlockedHistory(proxyId)` next to `getSweepVerdicts`, and the
 * dashboard cell renders the last persistent blocked observation.
 *
 * RED: `blockedHistory` is absent from the route payload at the tip, so the
 * presence assertions fail until the routes join the store.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-blocked-history-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { recordBlockedObservation, clearBlockedHistoryForTesting } =
  await import("../../src/lib/proxyHealth/blockedHistory.ts");
const { clearSweepVerdicts } = await import("../../src/lib/proxyHealth/sweepVerdict.ts");
const { GET: settingsGet } = await import("../../src/app/api/settings/proxies/health/route.ts");
const { GET: v1Get } = await import("../../src/app/api/v1/management/proxies/health/route.ts");

function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

resetStorage();
const created = await proxiesDb.createProxy({
  name: "blocked-history-route-probe",
  type: "http",
  host: "127.0.0.1",
  port: 19092,
  status: "active",
});
const proxyId = String(created?.id ?? "");
assert.ok(proxyId, "proxy fixture created");

function get(url: string) {
  return new Request(`http://localhost${url}`);
}

interface RouteItem {
  proxyId: string;
  blockedHistory?: {
    count: number;
    lastCause: string;
    lastStatus: number | null;
    lastSeen: number;
    ageMs: number;
  };
}

test("settings health route joins the persistent blocked history", async () => {
  clearSweepVerdicts();
  clearBlockedHistoryForTesting();
  const at = Date.now() - 240_000;
  recordBlockedObservation(proxyId, "unproven", 403, at);
  recordBlockedObservation(proxyId, "unproven", 403, at + 1);
  const res = await settingsGet(get("/api/settings/proxies/health"));
  assert.equal(res.status, 200);
  const body = (await res.json()) as { items: RouteItem[] };
  const item = body.items.find((i) => i.proxyId === proxyId);
  assert.ok(item, "proxy present in health items");
  assert.ok(item.blockedHistory, "blockedHistory field present");
  assert.equal(item.blockedHistory.count, 2);
  assert.equal(item.blockedHistory.lastCause, "unproven");
  assert.equal(item.blockedHistory.lastStatus, 403);
  assert.ok(item.blockedHistory.ageMs >= 0, "age clamped non-negative");
});

test("settings health route omits blockedHistory when no history recorded", async () => {
  clearSweepVerdicts();
  clearBlockedHistoryForTesting();
  const res = await settingsGet(get("/api/settings/proxies/health"));
  assert.equal(res.status, 200);
  const body = (await res.json()) as { items: RouteItem[] };
  const item = body.items.find((i) => i.proxyId === proxyId);
  assert.ok(item, "proxy present in health items");
  assert.equal(item.blockedHistory, undefined);
});

test("v1 health route mirrors the persistent blocked history", async () => {
  clearSweepVerdicts();
  clearBlockedHistoryForTesting();
  recordBlockedObservation(proxyId, "unproven", 403, Date.now() - 60_000);
  const res = await v1Get(get("/api/v1/management/proxies/health"));
  assert.equal(res.status, 200);
  const body = (await res.json()) as { items: RouteItem[] };
  const item = body.items.find((i) => i.proxyId === proxyId);
  assert.ok(item?.blockedHistory, "v1 blockedHistory field present");
  assert.equal(item.blockedHistory?.count, 1);
  assert.ok((item.blockedHistory?.ageMs ?? -1) >= 0, "v1 age clamped non-negative");
});

test.after(() => {
  clearSweepVerdicts();
  clearBlockedHistoryForTesting();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
