import assert from "node:assert/strict";
import { describe, it } from "node:test";

// Complements the structural extraction checks in integration-wiring.test.ts.
// Exercise registered MCP RPC tools and the exported A2A skill, not private handlers.
describe("Quota — public A2A and MCP consumers", () => {
  it("serializes the quota API response through the real consumers", async () => {
    const { exerciseQuotaWiring } = await import("../helpers/quotaWiring.ts");
    const { a2a, quota, metrics, requests } = await exerciseQuotaWiring();
    assert.equal(a2a.metadata.providerCount, 1);
    assert.match(a2a.artifacts[0].content, /\*\*quota-fixture:\*\* 20 \/ 100 \(valid\)/);
    assert.notEqual(quota.isError, true);
    const quotaContent = quota.content as Array<{ type: string; text: string }>;
    assert.equal(quotaContent[0].type, "text");
    const quotaBody = JSON.parse(quotaContent[0].text);
    assert.equal(quotaBody.providers[0].provider, "quota-fixture");
    assert.equal(quotaBody.providers[0].quotaUsed, 20);
    assert.equal(quotaBody.providers[0].quotaTotal, 100);
    assert.equal(quotaBody.providers[0].percentRemaining, 80);
    assert.notEqual(metrics.isError, true);
    const metricsContent = metrics.content as Array<{ type: string; text: string }>;
    assert.equal(metricsContent[0].type, "text");
    assert.deepEqual(JSON.parse(metricsContent[0].text).quotaInfo, {
      used: 20,
      total: 100,
      resetAt: "2026-10-11T00:00:00Z",
    });
    assert.deepEqual(requests, [
      "/api/usage/quota",
      "/api/combos",
      "/api/usage/quota?provider=quota-fixture",
      "/api/monitoring/health",
      "/api/usage/quota?provider=quota-fixture",
      "/api/usage/analytics?range=1d&provider=quota-fixture",
    ]);
  });

  it("does not report a successful MCP quota response when the quota API fails", async () => {
    const { exerciseQuotaWiring } = await import("../helpers/quotaWiring.ts");
    const { quota, requests } = await exerciseQuotaWiring(503);
    assert.equal(quota.isError, true);
    const content = quota.content as Array<{ type: string; text: string }>;
    assert.equal(content[0].type, "text");
    assert.match(content[0].text, /503/);
    assert.ok(requests.includes("/api/usage/quota?provider=quota-fixture"));
  });
});
