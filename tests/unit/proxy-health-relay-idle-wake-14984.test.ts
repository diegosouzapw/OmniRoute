/**
 * #14984: the background proxy-health sweep must not wake idle edge-relay
 * proxies (deno / vercel / cloudflare) on the plain-proxy cadence — a probe
 * wakes the serverless isolate, which is billed (Deno "Memory Time").
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import net from "node:net";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-relay-wake-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
process.env.PROXY_AUTO_REMOVE = "false";
process.env.PROXY_AUTO_DISABLE = "false";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { forceProxyHealthSweep } = await import("../../src/lib/proxyHealth/scheduler.ts");
const { selectRelayIdsToSkip, resolveRelayIntervalMs, __resetRelayCadenceForTesting } =
  await import("../../src/lib/proxyHealth/relayCadence.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  __resetRelayCadenceForTesting();
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function listener() {
  const state = { hits: 0 };
  const server = net.createServer((socket) => {
    state.hits++;
    socket.destroy();
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("failed to bind test listener");
  return {
    state,
    port: address.port,
    close: () => new Promise((resolve) => server.close(() => resolve(undefined))),
  };
}

test("idle relay-type (deno) proxy is not network-probed by the health sweep", async () => {
  resetStorage();
  const relay = await listener();
  const created = await proxiesDb.createProxy({
    name: "Deno Relay (idle-repro)",
    type: "deno",
    host: `127.0.0.1:${relay.port}`,
    port: 443,
    source: "deno-relay",
  });
  assert.ok(created?.id, "seed proxy must be created");
  try {
    await forceProxyHealthSweep();
    await forceProxyHealthSweep();
    await new Promise((r) => setTimeout(r, 200));
    assert.equal(relay.state.hits, 0, "BUG #14984: sweep woke an idle edge-relay proxy");
  } finally {
    await relay.close();
  }
});

test("relay cadence: skipped until the relay interval elapses, plain proxies never skipped", () => {
  __resetRelayCadenceForTesting();
  const proxies = [
    { id: "r1", type: "deno" },
    { id: "p1", type: "http" },
  ];
  const interval = 1000;
  assert.deepEqual([...selectRelayIdsToSkip(proxies, 0, interval)], ["r1"], "first sight");
  assert.deepEqual([...selectRelayIdsToSkip(proxies, 999, interval)], ["r1"], "within window");
  assert.deepEqual([...selectRelayIdsToSkip(proxies, 1000, interval)], [], "due -> probed");
  assert.deepEqual([...selectRelayIdsToSkip(proxies, 1500, interval)], ["r1"], "clock restarted");
  // a removed relay is forgotten, so a re-added one starts fresh
  selectRelayIdsToSkip([], 1600, interval);
  assert.deepEqual([...selectRelayIdsToSkip(proxies, 1700, interval)], ["r1"]);
});

test("relay interval env: default 6h, floor 60s", () => {
  assert.equal(resolveRelayIntervalMs({}), 21_600_000);
  assert.equal(resolveRelayIntervalMs({ PROXY_HEALTH_RELAY_INTERVAL_MS: "10" }), 21_600_000);
  assert.equal(resolveRelayIntervalMs({ PROXY_HEALTH_RELAY_INTERVAL_MS: "120000" }), 120_000);
});
