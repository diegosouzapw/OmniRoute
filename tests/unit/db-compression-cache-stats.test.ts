import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  recordCacheStats,
  getCacheStatsSummary,
} from "../../src/lib/db/compressionCacheStats.ts";

describe("compressionCacheStats", () => {
  it("getCacheStatsSummary returns summary", () => {
    const summary = getCacheStatsSummary();
    assert.ok(typeof summary.totalRequests === "number");
    assert.ok(typeof summary.avgNetSavings === "number");
    assert.ok(typeof summary.cacheHitRate === "number");
    assert.ok(typeof summary.byProvider === "object");
  });

  it("recordCacheStats inserts and getCacheStatsSummary retrieves", () => {
    recordCacheStats({
      provider: "test-provider",
      model: "test-model",
      compressionMode: "lite",
      cacheControlPresent: true,
      estimatedCacheHit: true,
      tokensSavedCompression: 100,
      tokensSavedCaching: 50,
      netSavings: 150,
    });
    const summary = getCacheStatsSummary();
    assert.ok(summary.totalRequests >= 1, "should have at least 1 request");
    assert.ok("test-provider" in summary.byProvider, "should have test-provider");
  });

  it("recordCacheStats handles missing model", () => {
    recordCacheStats({
      provider: "no-model-provider",
      compressionMode: "standard",
      cacheControlPresent: false,
      estimatedCacheHit: false,
      tokensSavedCompression: 0,
      tokensSavedCaching: 0,
      netSavings: 0,
    });
    const summary = getCacheStatsSummary();
    assert.ok("no-model-provider" in summary.byProvider);
  });

  it("getCacheStatsSummary with since filter", () => {
    const future = new Date(Date.now() + 86400000);
    const summary = getCacheStatsSummary(future);
    assert.equal(summary.totalRequests, 0, "future date should return 0");
  });
});
