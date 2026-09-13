import { Hono } from "hono";

/**
 * Batch 1 BFF routes — Gamification Leaderboard.
 *
 * Mock data for the leaderboard page which shows ranked API key scores
 * across global, weekly, monthly, and tokens_shared scopes.
 */
export const leaderboardRoutes = new Hono()

  /** Leaderboard entries for a given scope. */
  .get("/", (c) => {
    const scope = c.req.query("scope") ?? "global";
    const limit = Number(c.req.query("limit") ?? 50);

    return c.json({
      scope,
      entries: [],
      myRank: null,
      total: 0,
      limit,
    });
  });
