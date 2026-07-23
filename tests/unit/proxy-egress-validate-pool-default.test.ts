/**
 * Regression guard (PR #7046 / perf-api-pagination fallout): src/lib/db/proxies.ts
 * `listProxies()` was changed to return `{ items, total }` for pagination, but
 * validateProxyPool()'s DEFAULT (non-injected) implementation still did
 * `const proxies = await listProxies(); for (const p of proxies) ...` — iterating
 * the paginated envelope object instead of `.items` crashes at runtime
 * ("proxies is not iterable"). src/app/api/settings/proxies/egress/route.ts calls
 * validateProxyPool() with no deps, so this is the real, exercised production path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-egress-default-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const egress = await import("../../src/lib/proxyEgress.ts");
const { validateProxyPool, _setEgressProbeForTests, clearEgressCache } = egress as unknown as {
  validateProxyPool: (deps?: unknown) => Promise<
    Array<{ proxyId: string; alive: boolean; newStatus: string }>
  >;
  _setEgressProbeForTests: (fn: unknown) => void;
  clearEgressCache: () => void;
};

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
  clearEgressCache();
});

test.after(() => {
  _setEgressProbeForTests(null);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("validateProxyPool() with no injected deps does not crash on the real listProxies() {items,total} shape", async () => {
  await proxiesDb.createProxy({
    name: "Default Path Proxy",
    type: "http",
    host: "default-path.local",
    port: 8080,
  });

  _setEgressProbeForTests(async (proxyUrl: string | null) => ({
    ip: proxyUrl ? "203.0.113.9" : null,
    latencyMs: 3,
  }));

  const report = await validateProxyPool();

  assert.equal(Array.isArray(report), true, "validateProxyPool must resolve to an array");
  assert.equal(report.length, 1);
  assert.equal(report[0].alive, true);
  assert.equal(report[0].newStatus, "active");

  const { items: proxies } = await proxiesDb.listProxies({ includeSecrets: false });
  assert.equal(proxies[0].status, "active", "markStatus default path must persist via updateProxy");
});
