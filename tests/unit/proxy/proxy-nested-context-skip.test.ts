import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { runWithProxyContext } from "../../../open-sse/utils/proxyFetch.ts";
import { proxyConfigToUrl } from "../../../open-sse/utils/proxyDispatcher.ts";
import {
  invalidateProxyHealth,
  __setProxyHealthTcpCheckForTesting,
} from "../../../src/lib/proxyHealth.ts";

describe("runWithProxyContext nested same-context skip (#9158)", () => {
  it("skips the reachability probe for a nested same-config call", async () => {
    const cfg = { type: "http" as const, host: "127.0.0.1", port: 8080 };
    const proxyUrl = proxyConfigToUrl(cfg)!;
    assert.ok(proxyUrl);

    let probeCount = 0;
    __setProxyHealthTcpCheckForTesting(async () => {
      probeCount += 1;
      return true;
    });
    try {
      const result = await runWithProxyContext(cfg, () => {
        invalidateProxyHealth(proxyUrl);
        return runWithProxyContext(cfg, () => "nested-marker");
      });
      assert.equal(result, "nested-marker");
      assert.equal(probeCount, 1, "nested same-context call must skip the reachability probe");
    } finally {
      __setProxyHealthTcpCheckForTesting(null);
      invalidateProxyHealth(proxyUrl);
    }
  });
});
