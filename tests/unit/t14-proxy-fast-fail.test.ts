import test from "node:test";
import assert from "node:assert/strict";

import {
  isProxyReachable,
  getCachedProxyHealth,
  invalidateProxyHealth,
} from "../../src/lib/proxyHealth.ts";
import { runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";

test("T14: isProxyReachable caches unreachable proxy result", async () => {
  const proxyUrl = "http://127.0.0.1:1";
  invalidateProxyHealth(proxyUrl);

  const healthy = await isProxyReachable(proxyUrl, 120, 2_000);
  assert.equal(healthy, false);
  assert.equal(getCachedProxyHealth(proxyUrl), false);
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
    (err) => (err as any).code === "PROXY_UNREACHABLE"
  );

  assert.equal(executed, false);
});
