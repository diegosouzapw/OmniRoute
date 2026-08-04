import test from "node:test";
import assert from "node:assert/strict";

import {
  isProxyReachable,
  getCachedProxyHealth,
  invalidateProxyHealth,
  __setProxyHealthTcpCheckForTesting,
} from "../../src/lib/proxyHealth.ts";
import { runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";

test("T14: isProxyReachable caches unreachable proxy result", async () => {
  const proxyUrl = "http://127.0.0.1:1";
  invalidateProxyHealth(proxyUrl);

  const healthy = await isProxyReachable(proxyUrl, 120, 2_000);
  assert.equal(healthy, false);
  assert.equal(getCachedProxyHealth(proxyUrl), false);
});

test("#5109: concurrent proxy reachability checks share one TCP probe", async () => {
  const proxyUrl = "http://127.0.0.1:1080";
  invalidateProxyHealth(proxyUrl);

  let probeCount = 0;
  let releaseProbe!: (healthy: boolean) => void;
  const probeStarted = new Promise<void>((resolve) => {
    __setProxyHealthTcpCheckForTesting(async () => {
      probeCount += 1;
      resolve();
      return new Promise<boolean>((resolveProbe) => {
        releaseProbe = resolveProbe;
      });
    });
  });

  try {
    const checks = Array.from({ length: 50 }, () => isProxyReachable(proxyUrl, 120, 2_000));

    await probeStarted;
    assert.equal(probeCount, 1, "concurrent requests must not fan out TCP health probes");

    releaseProbe(true);
    assert.deepEqual(await Promise.all(checks), Array.from({ length: 50 }, () => true));
    assert.equal(getCachedProxyHealth(proxyUrl), true);
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});

test("#5109: transient unreachable results use a short negative cache", async () => {
  const proxyUrl = "http://127.0.0.1:1081";
  invalidateProxyHealth(proxyUrl);

  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    probeCount += 1;
    return probeCount > 1;
  });

  try {
    assert.equal(await isProxyReachable(proxyUrl, 120, 5), false);
    assert.equal(getCachedProxyHealth(proxyUrl), false);

    await new Promise((resolve) => setTimeout(resolve, 15));

    assert.equal(await isProxyReachable(proxyUrl, 120, 5), true);
    assert.equal(getCachedProxyHealth(proxyUrl), true);
    assert.equal(probeCount, 2, "failed probes must not poison the proxy for 30 seconds");
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});

test("T14: runWithProxyContext fast-fails when proxy is unreachable", async () => {
  const proxyUrl = "http://127.0.0.1:1";
  invalidateProxyHealth(proxyUrl);

  let executed = false;
  await assert.rejects(
    () =>
      runWithProxyContext(proxyUrl, async () => {
        executed = true;
        return "ok";
      }),
    (err) => (err as { code?: string })?.code === "PROXY_UNREACHABLE"
  );

  assert.equal(executed, false);
});
