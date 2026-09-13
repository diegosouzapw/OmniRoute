import { Hono } from "hono";

/**
 * Batch 1 BFF routes — Free Tiers.
 *
 * Mock data for the free-tiers page which shows the FreeBudgetCard
 * with per-provider free budget balances and cooldown status.
 */
export const freeTiersRoutes = new Hono()

  /** Free tier budget summary across all providers. */
  .get("/", (c) =>
    c.json({
      budgets: [],
      totalFreeRequests: 0,
      totalFreeTokens: 0,
      cooldowns: [],
    })
  );
