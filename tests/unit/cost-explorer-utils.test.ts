import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  buildCostExplorerRows,
  type CostExplorerAnalyticsPayload,
} from "../../src/app/(dashboard)/dashboard/costs/costExplorerUtils";

const analytics: CostExplorerAnalyticsPayload = {
  summary: {
    totalCost: 12,
    totalRequests: 12,
  },
  byProvider: [
    {
      provider: "openai",
      requests: 8,
      promptTokens: 4000,
      completionTokens: 2000,
      totalTokens: 6000,
      cost: 9,
    },
    {
      provider: "anthropic",
      requests: 4,
      promptTokens: 2000,
      completionTokens: 1000,
      totalTokens: 3000,
      cost: 3,
    },
  ],
  byModel: [
    {
      provider: "openai",
      model: "gpt-4.1",
      requests: 5,
      totalTokens: 5000,
      cost: 7,
    },
    {
      provider: "anthropic",
      model: "claude-sonnet",
      requests: 7,
      totalTokens: 7000,
      cost: 5,
    },
  ],
  byApiKey: [
    {
      apiKeyId: "key-a",
      apiKeyName: "Production",
      requests: 10,
      totalTokens: 10000,
      cost: 10,
    },
  ],
  byAccount: [
    {
      account: "team-account",
      requests: 12,
      totalTokens: 12000,
      cost: 12,
    },
  ],
  byServiceTier: [
    {
      serviceTier: "priority",
      label: "Fast",
      requests: 2,
      totalTokens: 2000,
      cost: 4,
    },
    {
      serviceTier: "standard",
      label: "Standard",
      requests: 10,
      totalTokens: 10000,
      cost: 8,
    },
  ],
};

describe("buildCostExplorerRows", () => {
  it("maps provider rows and sorts by cost descending by default", () => {
    const rows = buildCostExplorerRows({ analytics, groupBy: "provider" });

    assert.equal(rows.length, 2);
    assert.equal(rows[0].name, "openai");
    assert.equal(rows[0].cost, 9);
    assert.equal(rows[0].avgCostPerRequest, 1.125);
    assert.equal(rows[0].sharePct, 75);
  });

  it("filters rows case-insensitively across names and details", () => {
    const rows = buildCostExplorerRows({
      analytics,
      groupBy: "model",
      searchQuery: "ANTHROPIC",
    });

    assert.equal(rows.length, 1);
    assert.equal(rows[0].name, "claude-sonnet");
    assert.equal(rows[0].detail, "anthropic");
  });

  it("sorts numeric fields ascending when requested", () => {
    const rows = buildCostExplorerRows({
      analytics,
      groupBy: "serviceTier",
      sortKey: "requests",
      sortDirection: "asc",
    });

    assert.equal(rows.length, 2);
    assert.equal(rows[0].name, "Fast");
    assert.equal(rows[1].name, "Standard");
  });

  it("falls back to request share when cost data is absent", () => {
    const freeAnalytics: CostExplorerAnalyticsPayload = {
      summary: {
        totalCost: 0,
        totalRequests: 10,
      },
      byProvider: [
        {
          provider: "local",
          requests: 4,
          totalTokens: 4000,
          cost: 0,
        },
      ],
    };

    const rows = buildCostExplorerRows({ analytics: freeAnalytics, groupBy: "provider" });

    assert.equal(rows.length, 1);
    assert.equal(rows[0].sharePct, 40);
  });

  it("keeps share percentages cost-based when paid and free rows are mixed", () => {
    const mixedAnalytics: CostExplorerAnalyticsPayload = {
      summary: {
        totalCost: 100,
        totalRequests: 200,
      },
      byProvider: [
        {
          provider: "paid-a",
          requests: 100,
          totalTokens: 10000,
          cost: 60,
        },
        {
          provider: "paid-b",
          requests: 80,
          totalTokens: 8000,
          cost: 40,
        },
        {
          provider: "free",
          requests: 20,
          totalTokens: 2000,
          cost: 0,
        },
      ],
    };

    const rows = buildCostExplorerRows({ analytics: mixedAnalytics, groupBy: "provider" });

    assert.deepEqual(
      rows.map((row) => row.sharePct),
      [60, 40, 0]
    );
    assert.equal(
      rows.reduce((sum, row) => sum + row.sharePct, 0),
      100
    );
  });
});
