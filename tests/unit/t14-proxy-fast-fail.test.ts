import test from "node:test";
import assert from "node:assert/strict";

import {
  isProxyReachable,
  getCachedProxyHealth,
  invalidateProxyHealth,
  __setProxyHealthTcpCheckForTesting,
} from "../../src/lib/proxyHealth.ts";
import { runWithProxyContext, proxyFetch } from "../../open-sse/utils/proxyFetch.ts";

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
    assert.deepEqual(
      await Promise.all(checks),
      Array.from({ length: 50 }, () => true)
    );
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

test("T14: runWithProxyContext fails an in-flight request fast when the proxy is unreachable", async () => {
  const proxyUrl = "http://127.0.0.1:1";
  invalidateProxyHealth(proxyUrl);

  // #9100: the T14 probe is now NON-BLOCKING — dispatch is optimistic and the
  // probe aborts the request only while it is still in flight. To observe the
  // fast-fail the callback must stay pending long enough for the probe to
  // resolve (a callback that resolves instantly would simply win the race).
  let executed = false;
  let releaseRequest: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    releaseRequest = resolve;
  });

  const pending = runWithProxyContext(proxyUrl, async () => {
    executed = true;
    await gate; // stay in flight until the probe resolves unreachable
    return "ok";
  });

  await assert.rejects(pending, (err) => (err as { code?: string })?.code === "PROXY_UNREACHABLE");

  assert.equal(executed, true, "dispatch is optimistic; the request was started before the abort");
  releaseRequest();
});

test("SOCKS5 ordinary data-plane: no T14 TCP health probe", async () => {
  const proxyUrl = "socks5://127.0.0.1:1080";
  invalidateProxyHealth(proxyUrl);
  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    probeCount += 1;
    return true;
  });
  try {
    let executed = false;
    const result = await runWithProxyContext(proxyUrl, async () => {
      executed = true;
      return "socks5-data-plane-ok";
    });
    assert.equal(result, "socks5-data-plane-ok");
    assert.equal(executed, true);
    assert.equal(probeCount, 0, "SOCKS5 ordinary data-plane must not probe");
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});

test("SOCKS5 real transport failure: owned by transport path, not T14 probe", async () => {
  const proxyUrl = "socks5://127.0.0.1:1";
  invalidateProxyHealth(proxyUrl);
  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    probeCount += 1;
    return false;
  });
  try {
    await runWithProxyContext(proxyUrl, async () => {
      await assert.rejects(
        proxyFetch("http://example.com"),
        (err: Error & { code?: string; message?: string }) => {
          assert.ok(
            err.code === "PROXY_REQUEST_FAILED" || err.code === "PROXY_UNREACHABLE",
            `expected transport failure code, got ${err.code}`
          );
          assert.ok(
            !err.message?.includes("[Proxy Fast-Fail]"),
            "real SOCKS failure must not manufacture [Proxy Fast-Fail] message"
          );
          return true;
        }
      );
    });
    assert.equal(probeCount, 0, "SOCKS data-plane request must not invoke reachability probe");
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});

test("control-plane directFallbackOnUnreachable SOCKS5: blocking probe preserved", async () => {
  const proxyUrl = "socks5://127.0.0.1:1080";
  invalidateProxyHealth(proxyUrl);
  const prevEnv = process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK;
  process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK = "true";
  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    probeCount += 1;
    return false;
  });
  try {
    let executed = false;
    const result = await runWithProxyContext(
      proxyUrl,
      async () => {
        executed = true;
        return "fallback-ok";
      },
      { directFallbackOnUnreachable: true }
    );
    assert.equal(result, "fallback-ok");
    assert.equal(executed, true);
    assert.equal(
      probeCount,
      1,
      "control-plane direct fallback SOCKS must invoke reachability check"
    );
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
    if (prevEnv === undefined) {
      delete process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK;
    } else {
      process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK = prevEnv;
    }
  }
});

test("control-plane directFallbackOnUnreachable HTTP: blocking probe preserved", async () => {
  const proxyUrl = "http://127.0.0.1:8080";
  invalidateProxyHealth(proxyUrl);
  const prevEnv = process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK;
  process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK = "true";
  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    probeCount += 1;
    return false;
  });
  try {
    let executed = false;
    const result = await runWithProxyContext(
      proxyUrl,
      async () => {
        executed = true;
        return "fallback-ok";
      },
      { directFallbackOnUnreachable: true }
    );
    assert.equal(result, "fallback-ok");
    assert.equal(executed, true);
    assert.equal(
      probeCount,
      1,
      "control-plane direct fallback HTTP must invoke reachability check"
    );
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
    if (prevEnv === undefined) {
      delete process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK;
    } else {
      process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK = prevEnv;
    }
  }
});

test("nested same-context: probe runs only once", async () => {
  const cfg = { type: "http" as const, host: "127.0.0.1", port: 8080 };
  const proxyUrl = "http://127.0.0.1:8080";
  invalidateProxyHealth(proxyUrl);
  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    probeCount += 1;
    return true;
  });
  try {
    const result = await runWithProxyContext(cfg, async () => {
      invalidateProxyHealth(proxyUrl);
      return runWithProxyContext(cfg, async () => "nested-marker");
    });
    assert.equal(result, "nested-marker");
    assert.equal(probeCount, 1, "nested same-context call must skip reachability probe");
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});
