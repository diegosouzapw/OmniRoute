import { Hono } from "hono";

/**
 * Batch 1 BFF routes — Quota / Provider Limits.
 *
 * The quota page is the canonical home for the ProviderLimits component
 * showing per-provider quota windows, balance, and credit info.
 */
export const quotaRoutes = new Hono()

  /** Quota overview — all provider quota windows. */
  .get("/", (c) =>
    c.json({
      providers: [],
      buckets: [
        {
          id: "default",
          label: "Default tier",
          cap: 60,
          unit: "req/min",
          used: 12,
          overflow: "fallback",
        },
      ],
    })
  )
  .put("/", (c) => c.json({ ok: true }));
