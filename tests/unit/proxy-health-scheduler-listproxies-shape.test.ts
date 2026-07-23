/**
 * Regression guard (PR #7046 / perf-api-pagination fallout): src/lib/db/proxies.ts
 * `listProxies()` was changed to return `{ items, total }` for pagination, but
 * src/lib/proxyHealth/scheduler.ts's sweep() still did
 * `const proxies = await listProxies(); if (proxies.length === 0) return;` —
 * against the new envelope object `proxies.length` is `undefined`, so the sweep
 * silently skips every proxy on every scheduled/forced run without throwing —
 * a silent regression (proxy health checks stop working). This proves the
 * sweep actually iterates and probes real seeded proxies via
 * forceProxyHealthSweep(), the same function the auto-init scheduler calls.
 *
 * DB-backed and network-free: the probe target is a dead localhost proxy
 * (immediate ECONNREFUSED — no outbound traffic), mirroring the pattern in
 * tests/unit/proxy-health-6246.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-sched-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
process.env.PROXY_AUTO_REMOVE = "true";
process.env.PROXY_AUTO_REMOVE_AFTER = "1";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { forceProxyHealthSweep } = await import("../../src/lib/proxyHealth/scheduler.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("forceProxyHealthSweep() actually probes seeded proxies against the real listProxies() {items,total} shape", async () => {
  resetStorage();

  const created = await proxiesDb.createProxy({
    name: "Dead Local Proxy",
    type: "http",
    host: "127.0.0.1",
    port: 1, // nothing listens here — immediate ECONNREFUSED, no outbound traffic
  });

  await forceProxyHealthSweep();

  // With PROXY_AUTO_REMOVE=true and REMOVE_AFTER=1, a "fail" outcome on the very
  // first sweep auto-removes the proxy — proof the sweep loop actually iterated
  // over the seeded row instead of silently short-circuiting on an unindexed
  // {items,total} envelope.
  const removedRow = await proxiesDb.getProxyById(created!.id, { includeSecrets: false });
  assert.equal(removedRow, null, "sweep must have processed and auto-removed the dead proxy");
});
