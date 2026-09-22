import test from "node:test";
import assert from "node:assert/strict";

import {
  isProxyReachable,
  invalidateProxyHealth,
  __setProxyHealthTcpCheckForTesting,
} from "../../src/lib/proxyHealth.ts";

// #14157: the WHATWG URL parser drops the port when it equals the scheme
// default, so an http proxy URL on :80 lost its port entirely and the probe
// fell back to 8080 — every default-port http proxy fast-failed the
// reachability check and pushed the connection into cooldown even though
// the proxy itself was fine.
test("#14157: http proxy on its default port probes port 80, not 8080", async () => {
  const proxyUrl = "http://user:pass@p.example.test:80";
  invalidateProxyHealth(proxyUrl);

  let seenPort = 0;
  __setProxyHealthTcpCheckForTesting(async (_host, port) => {
    seenPort = port;
    return true;
  });

  try {
    assert.equal(await isProxyReachable(proxyUrl, 120, 2_000), true);
    assert.equal(
      seenPort,
      80,
      "new URL('...:80').port is '' — the probe must fall back to 80 for http"
    );
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});

test("#14157: schemeless-port forms resolve to their scheme defaults", async () => {
  const cases: Array<[string, number]> = [
    ["http://u:p@p.example.test", 80],
    ["https://u:p@p.example.test", 443],
    ["http://p.example.test:3128", 3128],
    ["https://p.example.test:8443", 8443],
  ];

  for (const [proxyUrl, expectedPort] of cases) {
    invalidateProxyHealth(proxyUrl);
    let seenPort = 0;
    __setProxyHealthTcpCheckForTesting(async (_host, port) => {
      seenPort = port;
      return true;
    });
    try {
      assert.equal(await isProxyReachable(proxyUrl, 120, 2_000), true);
      assert.equal(seenPort, expectedPort, `${proxyUrl} must probe ${expectedPort}`);
    } finally {
      __setProxyHealthTcpCheckForTesting(null);
      invalidateProxyHealth(proxyUrl);
    }
  }
});
