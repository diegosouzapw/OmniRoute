import { Hono } from "hono";

/**
 * Batch 1 BFF routes — Changelog & News.
 *
 * The changelog page displays release notes (from CHANGELOG.md / news.json)
 * and product news items.
 */
export const changelogRoutes = new Hono()

  /** Changelog entries. */
  .get("/", (c) =>
    c.json({
      entries: [],
      total: 0,
    })
  )

  /** News items. */
  .get("/news", (c) =>
    c.json({
      items: [],
      total: 0,
    })
  );
