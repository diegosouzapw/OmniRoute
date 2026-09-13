import { Hono } from "hono";

/**
 * Batch 1 BFF routes — Relay Proxy.
 *
 * The relay page manages bearer tokens for the /v1/relay/chat/completions
 * proxy endpoint, allowing external clients to route through OmniRoute
 * with per-token rate limits.
 */
export const relayRoutes = new Hono()

  /** List all relay tokens. */
  .get("/", (c) =>
    c.json({
      tokens: [],
      total: 0,
    })
  )

  /** Alias: some pages call /tokens. */
  .get("/tokens", (c) => c.json([]))

  /** Create a new relay token. */
  .post("/tokens", (c) =>
    c.json({
      ok: true,
      id: "relay_" + Date.now().toString(36),
      name: "new-token",
      rawToken: "relay_" + "x".repeat(48),
      tokenPrefix: "relay_xxxx",
      description: "",
      comboId: null,
      allowedModels: "*",
      maxRequestsPerMinute: 60,
      maxRequestsPerDay: 10000,
      enabled: true,
      createdAt: Date.now(),
      lastUsedAt: null,
    })
  )

  /** Toggle or update a relay token. */
  .patch("/tokens/:id", (c) =>
    c.json({
      ok: true,
      id: c.req.param("id"),
    })
  )

  /** Delete a relay token. */
  .delete("/tokens/:id", (c) =>
    c.json({
      ok: true,
      id: c.req.param("id"),
    })
  );
