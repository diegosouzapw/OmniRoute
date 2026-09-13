import { Hono } from "hono";

/**
 * Batch 1 BFF routes — Provider Discovery.
 *
 * Mock data for the discovery dashboard page which scans and verifies
 * provider compatibility and feasibility.
 */
export const discoveryRoutes = new Hono()

  /** Discovery results list. */
  .get("/", (c) =>
    c.json({
      results: [],
    })
  )

  /** Alias: some pages call /results specifically. */
  .get("/results", (c) =>
    c.json({
      results: [],
    })
  )

  /** Trigger a discovery scan for a provider. */
  .post("/scan", (c) =>
    c.json({
      ok: true,
      status: "queued",
      message: "Discovery scan queued",
    })
  )

  /** Verify a specific discovery result. */
  .post("/verify/:id", (c) =>
    c.json({
      ok: true,
      id: c.req.param("id"),
      status: "verified",
    })
  )

  /** Delete a discovery result. */
  .delete("/results/:id", (c) =>
    c.json({
      ok: true,
      id: c.req.param("id"),
    })
  );
