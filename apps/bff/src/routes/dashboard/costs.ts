import { Hono } from "hono";

/**
 * Batch 1 BFF routes — Costs dashboard.
 *
 * Provides mock/placeholder data for the SvelteKit costs pages:
 *   - GET /           aggregate cost overview
 *   - GET /budget     budget tracking
 *   - GET /pricing    pricing tiers
 *   - GET /quota-share  quota allocation across pools
 */
export const costsRoutes = new Hono()

  /** Aggregate cost overview matching UsageAnalyticsPayload shape. */
  .get("/", (c) => {
    const range = c.req.query("range") ?? "30d";
    return c.json({
      summary: {
        totalCost: 0,
        totalRequests: 0,
        uniqueModels: 0,
        uniqueAccounts: 0,
        uniqueApiKeys: 0,
        totalTokens: 0,
        promptTokens: 0,
        completionTokens: 0,
        fallbackCount: 0,
        fallbackRatePct: 0,
        requestedModelCoveragePct: 0,
        streak: 0,
      },
      byProvider: [],
      byModel: [],
      byApiKey: [],
      byAccount: [],
      byServiceTier: [],
      dailyTrend: [],
      weeklyPattern: [],
      activityMap: {},
      presetSummaries: {
        "1d": { totalCost: 0 },
        "7d": { totalCost: 0 },
        "30d": { totalCost: 0 },
      },
      range,
    });
  })

  /** Budget tracking — how much spend remains in the current period. */
  .get("/budget", (c) =>
    c.json({
      budgetUsd: 500,
      spentUsd: 0,
      remainingUsd: 500,
      periodStart: new Date().toISOString(),
      periodEnd: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      alerts: [],
    })
  )

  /** Pricing tiers — static reference data for the pricing sub-page. */
  .get("/pricing", (c) =>
    c.json({
      tiers: [
        {
          id: "free",
          name: "Free",
          pricePerMonth: 0,
          includedRequests: 1000,
          includedTokens: 1_000_000,
          overagePerRequest: 0,
          overagePer1kTokens: 0,
          features: ["basic-routing", "community-support"],
        },
        {
          id: "pro",
          name: "Pro",
          pricePerMonth: 49,
          includedRequests: 50_000,
          includedTokens: 50_000_000,
          overagePerRequest: 0.001,
          overagePer1kTokens: 0.01,
          features: [
            "advanced-routing",
            "priority-support",
            "analytics",
            "custom-combos",
          ],
        },
        {
          id: "team",
          name: "Team",
          pricePerMonth: 149,
          includedRequests: 200_000,
          includedTokens: 200_000_000,
          overagePerRequest: 0.0005,
          overagePer1kTokens: 0.005,
          features: [
            "everything-in-pro",
            "team-management",
            "sso",
            "audit-log",
          ],
        },
      ],
    })
  )

  /** Quota share — pool-based quota allocation across provider accounts. */
  .get("/quota-share", (c) =>
    c.json({
      pools: [
        {
          id: "default",
          name: "Default Pool",
          allocation: 1.0,
          used: 0,
          accounts: [],
        },
      ],
      totalAllocation: 1.0,
    })
  );
