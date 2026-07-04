import { z } from "zod";
import type { McpToolDefinition } from "./toolDefinition.ts";

export const pickFastestModelInput = z.object({
  comboId: z
    .string()
    .optional()
    .describe(
      "Optional combo id or name to scope the ranking to. Omit to rank across all enabled combos."
    ),
  includeUnhealthy: z
    .boolean()
    .optional()
    .describe(
      "When true, OPEN-circuit candidates are scored (sorted to the bottom) instead of filtered out."
    ),
  weights: z
    .object({
      ttft: z.number().min(0).optional(),
      tps: z.number().min(0).optional(),
      e2e: z.number().min(0).optional(),
      p95: z.number().min(0).optional(),
      health: z.number().min(0).optional(),
      reliability: z.number().min(0).optional(),
      stability: z.number().min(0).optional(),
    })
    .partial()
    .optional()
    .describe("Optional speed-ranking weight overrides merged onto the defaults."),
  applyToCombo: z
    .boolean()
    .optional()
    .describe("When true + comboId present, switches the combo to auto/latency routing."),
  limit: z.number().int().min(1).max(50).optional().describe("Ranked result limit."),
});

export const pickFastestModelOutput = z.object({
  fastest: z
    .object({
      provider: z.string(),
      model: z.string(),
      score: z.number(),
      reason: z.string(),
    })
    .nullable(),
  ranked: z.array(
    z.object({
      provider: z.string(),
      model: z.string(),
      score: z.number(),
      factors: z.object({
        ttft: z.number(),
        tps: z.number(),
        e2e: z.number(),
        p95: z.number(),
        health: z.number(),
        reliability: z.number(),
        stability: z.number(),
      }),
      metrics: z.object({
        avgTtftMs: z.number().nullable(),
        avgTokensPerSecond: z.number().nullable(),
        avgE2ELatencyMs: z.number().nullable(),
        p95LatencyMs: z.number().nullable(),
        latencyStdDev: z.number().nullable(),
        failureRate: z.number(),
        circuitBreakerState: z.enum(["CLOSED", "OPEN", "HALF_OPEN"]),
      }),
      reason: z.string(),
    })
  ),
  weights: z.object({
    ttft: z.number(),
    tps: z.number(),
    e2e: z.number(),
    p95: z.number(),
    health: z.number(),
    reliability: z.number(),
    stability: z.number(),
  }),
  comboScope: z.object({ id: z.string(), name: z.string() }).nullable(),
  appliedToCombo: z
    .object({
      id: z.string(),
      name: z.string(),
      strategy: z.string(),
      autoRoutingStrategy: z.string(),
    })
    .nullable(),
});

export const pickFastestModelTool: McpToolDefinition<
  typeof pickFastestModelInput,
  typeof pickFastestModelOutput
> = {
  name: "omniroute_pick_fastest_model",
  description:
    "Picks the fastest reliable provider-model pair from live telemetry and can apply latency routing to a combo.",
  inputSchema: pickFastestModelInput,
  outputSchema: pickFastestModelOutput,
  scopes: ["read:combos", "read:health", "read:usage"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: [
    "/api/combos",
    "/api/monitoring/health",
    "/api/usage/quota",
    "/api/usage/analytics",
  ],
};
