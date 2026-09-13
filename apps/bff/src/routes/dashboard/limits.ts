import { Hono } from "hono";

/**
 * Batch 1 BFF routes — Provider Limits.
 *
 * The limits page redirects to /dashboard/quota in Next.js, but the BFF
 * still serves the underlying data. This provides the quota/limits data
 * that the ProviderLimits component consumes.
 */
export const limitsRoutes = new Hono()

  /** Provider limits — per-provider quota and usage data. */
  .get("/", (c) =>
    c.json({
      limits: [],
      buckets: [
        {
          id: "default",
          label: "Default tier",
          cap: 60,
          unit: "req/min",
          used: 12,
          overflow: "fallback",
        },
        {
          id: "pro",
          label: "Pro tier",
          cap: 600,
          unit: "req/min",
          used: 87,
          overflow: "queue",
        },
      ],
    })
  );
