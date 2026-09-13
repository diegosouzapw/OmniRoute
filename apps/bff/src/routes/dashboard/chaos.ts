import { Hono } from "hono";

/**
 * Batch 1 BFF routes — Chaos Testing Mode.
 *
 * The chaos page lets users configure multi-provider parallel/collaborative
 * testing with per-provider overrides, system prompts, and timeouts.
 */
export const chaosRoutes = new Hono()

  /** Current chaos mode configuration. */
  .get("/config", (c) =>
    c.json({
      config: {
        enabled: false,
        defaultMode: "parallel",
        providerOverrides: [],
        systemPrompt: "",
        timeoutMs: 120_000,
        maxTokens: 4096,
      },
    })
  )

  /** Save chaos mode configuration. */
  .put("/config", (c) =>
    c.json({
      ok: true,
      savedAt: new Date().toISOString(),
    })
  );
