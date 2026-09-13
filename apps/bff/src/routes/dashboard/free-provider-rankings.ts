import { Hono } from "hono";

/**
 * Batch 1 BFF routes — Free Provider Rankings.
 *
 * Mock data for the free-provider-rankings page which shows a ranked
 * leaderboard of free providers by task-fit score and model category.
 */
export const freeProviderRankingsRoutes = new Hono()

  /** Rankings list, optionally filtered by category and availability. */
  .get("/", (c) => {
    const category = c.req.query("category") ?? undefined;
    const configuredOnly = c.req.query("configuredOnly") === "1";
    const availableOnly = c.req.query("availableOnly") === "1";

    return c.json({
      rankings: [],
      filters: { category, configuredOnly, availableOnly },
    });
  });
