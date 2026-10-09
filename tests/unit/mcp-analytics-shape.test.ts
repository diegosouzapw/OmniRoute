import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  analyticsRangeForPeriod,
  readAnalyticsTotals,
  readProviderMetrics,
} from "../../open-sse/mcp-server/analyticsShape.ts";

// The shape /api/usage/analytics actually returns: totals live under `summary`,
// and there is no top-level totalCost, requestCount, successRate or avgLatencyMs.
const ANALYTICS = {
  summary: {
    totalCost: 7.5,
    totalRequests: 1200,
    promptTokens: 400000,
    completionTokens: 90000,
  },
  byProvider: [
    { provider: "antigravity", requests: 1160, cost: 7.3 },
    { provider: "claude", requests: 40, cost: 0.2 },
  ],
  byModel: [
    {
      model: "gemini-3.6-flash",
      provider: "antigravity",
      requests: 1000,
      avgLatencyMs: 800,
      successRatePct: "99.00",
    },
    {
      model: "gemini-3.1-pro",
      provider: "antigravity",
      requests: 160,
      avgLatencyMs: 2000,
      successRatePct: "95.00",
    },
    {
      model: "claude-sonnet",
      provider: "claude",
      requests: 40,
      avgLatencyMs: 1500,
      successRatePct: "100.00",
    },
  ],
};

describe("analytics shape readers", () => {
  it("reads the totals from summary, not the top level", () => {
    const totals = readAnalyticsTotals(ANALYTICS);
    assert.equal(totals.totalCost, 7.5);
    assert.equal(totals.requestCount, 1200);
    assert.equal(totals.promptTokens, 400000);
    assert.equal(totals.completionTokens, 90000);
  });

  it("returns zeros when summary is missing", () => {
    const totals = readAnalyticsTotals({ byProvider: [] });
    assert.equal(totals.totalCost, 0);
    assert.equal(totals.requestCount, 0);
  });

  it("aggregates one provider from the byModel rows", () => {
    const metrics = readProviderMetrics(ANALYTICS, "antigravity");
    assert.equal(metrics.requestCount, 1160);
    // Weighted by requests: (1000*800 + 160*2000) / 1160 = 965.517...
    assert.equal(metrics.avgLatencyMs, 966);
    // Successful requests: 1000*0.99 + 160*0.95 = 1142, over 1160 = 0.98448
    assert.ok(Math.abs(metrics.successRate - 0.9845) < 0.001);
  });

  it("returns zeros for a provider with no rows", () => {
    const metrics = readProviderMetrics(ANALYTICS, "openai");
    assert.equal(metrics.requestCount, 0);
    assert.equal(metrics.avgLatencyMs, 0);
    assert.equal(metrics.successRate, 0);
  });

  it("maps a report period onto the range the analytics route accepts", () => {
    assert.equal(analyticsRangeForPeriod("session"), "1d");
    assert.equal(analyticsRangeForPeriod("day"), "1d");
    assert.equal(analyticsRangeForPeriod("week"), "7d");
    assert.equal(analyticsRangeForPeriod("month"), "30d");
    assert.equal(analyticsRangeForPeriod(undefined), "30d");
  });
});
