import test, { mock } from "node:test";
import assert from "node:assert/strict";

// The TCP reachability probe already runs for every proxied request. With the opt-in
// PROXY_SKIP_RECENTLY_FAILED flag on, its verdict feeds proxy selection: a refused probe sets
// the proxy aside, a successful one takes it back. With the flag off nothing is written.

const health = await import("../../src/lib/proxyHealth.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");

const PROXY_URL = "http://10.7.0.1:8080";
const KEY = memory.proxyEgressKey(PROXY_URL);

test.beforeEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
  health.invalidateProxyHealth(PROXY_URL);
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
});

test.afterEach(() => {
  mock.timers.reset();
  health.__setProxyHealthTcpCheckForTesting(null);
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
});

test("a refused probe sets the proxy aside for 60 s, then 120 s on a repeat", async () => {
  mock.timers.enable({ apis: ["Date"], now: 1_800_000_000_000 });
  health.__setProxyHealthTcpCheckForTesting(async () => false);

  assert.equal(await health.isProxyReachable(PROXY_URL), false);
  const first = Date.now();
  assert.equal(memory.isProxyAvoided(KEY, first + 59_999), true);
  assert.equal(memory.isProxyAvoided(KEY, first + 60_000), false);

  mock.timers.tick(61_000);
  health.invalidateProxyHealth(PROXY_URL);
  assert.equal(await health.isProxyReachable(PROXY_URL), false);
  const second = Date.now();
  assert.equal(memory.isProxyAvoided(KEY, second + 119_999), true);
  assert.equal(memory.isProxyAvoided(KEY, second + 120_000), false);
});

test("a probe that answers again ends the period", async () => {
  health.__setProxyHealthTcpCheckForTesting(async () => false);
  await health.isProxyReachable(PROXY_URL);
  assert.equal(memory.isProxyAvoided(KEY), true);

  health.invalidateProxyHealth(PROXY_URL);
  health.__setProxyHealthTcpCheckForTesting(async () => true);
  assert.equal(await health.isProxyReachable(PROXY_URL), true);
  assert.equal(memory.isProxyAvoided(KEY), false);
});

test("with the flag at its default (off) a refused probe writes nothing", async () => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  health.__setProxyHealthTcpCheckForTesting(async () => false);
  assert.equal(await health.isProxyReachable(PROXY_URL), false);
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("a malformed proxy URL writes nothing", async () => {
  assert.equal(await health.isProxyReachable("not a url"), false);
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});
