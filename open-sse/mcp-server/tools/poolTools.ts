/**
 * OmniRoute MCP Session Pool Tools — Manage and monitor anonymous web session pools.
 *
 * Tools:
 *   1. omniroute_pool_status   — Get pool stats for one or all providers
 *   2. omniroute_pool_sessions — List per-session details for a provider's pool
 *   3. omniroute_pool_reset    — Shut down and recreate a pool
 *   4. omniroute_pool_warm     — Warm up a pool to a target session count
 *   5. omniroute_pool_health   — Aggregated pool health with breaker state and issues
 */

import { z } from "zod";
import { PoolRegistry } from "../../services/sessionPool/poolRegistry.ts";
import { getWebSessionPoolHealth } from "../../services/webSessionPoolHealth.ts";

// ─── Input Schemas ─────────────────────────────────────────────────────────

export const poolStatusInput = z.object({
  provider: z
    .string()
    .optional()
    .describe("Provider name (e.g. 'pollinations'). Omit to list all pools"),
});

export const poolSessionsInput = z.object({
  provider: z.string().describe("Provider name (e.g. 'pollinations')"),
});

export const poolResetInput = z.object({
  provider: z.string().describe("Provider name (e.g. 'pollinations')"),
});

export const poolWarmInput = z.object({
  provider: z.string().describe("Provider name (e.g. 'pollinations')"),
  count: z
    .number()
    .int()
    .min(1)
    .max(50)
    .default(6)
    .describe("Target session count (1–50)"),
});

export const poolHealthInput = z.object({
  provider: z
    .string()
    .optional()
    .describe("Provider name (e.g. 'pollinations'). Omit to list all pools"),
});

// ─── Handlers ──────────────────────────────────────────────────────────────

/**
 * Handle pool_status tool: return stats for one or all pools
 */
export async function handlePoolStatus(
  args: z.infer<typeof poolStatusInput>,
): Promise<Record<string, unknown>> {
  if (args.provider) {
    const stats = PoolRegistry.getStats(args.provider);
    if (!stats) {
      return { error: `No pool found for provider '${args.provider}'` };
    }
    return { provider: args.provider, stats };
  }

  const all = PoolRegistry.getAllStats();
  return {
    totalPools: all.length,
    providers: PoolRegistry.listProviders(),
    pools: all,
  };
}

/**
 * Handle pool_sessions tool: list per-session details for a provider's pool
 */
export async function handlePoolSessions(
  args: z.infer<typeof poolSessionsInput>,
): Promise<Record<string, unknown>> {
  const details = PoolRegistry.getSessionDetails(args.provider);
  if (!details) {
    return { error: `No pool found for provider '${args.provider}'` };
  }

  const stats = PoolRegistry.getStats(args.provider);
  return {
    provider: args.provider,
    sessionCount: details.length,
    stats,
    sessions: details,
  };
}

/**
 * Handle pool_reset tool: shut down and recreate a pool
 */
export async function handlePoolReset(
  args: z.infer<typeof poolResetInput>,
): Promise<Record<string, unknown>> {
  const existed = PoolRegistry.resetPool(args.provider);
  return {
    provider: args.provider,
    reset: existed,
    message: existed
      ? `Pool '${args.provider}' shut down and removed. It will be recreated on next request.`
      : `No pool found for provider '${args.provider}'`,
  };
}

/**
 * Handle pool_warm tool: warm up a pool to a target session count
 */
export async function handlePoolWarm(
  args: z.infer<typeof poolWarmInput>,
): Promise<Record<string, unknown>> {
  // If pool doesn't exist yet, we can't warm it
  const pool = PoolRegistry.getPool(args.provider);
  if (!pool) {
    return { error: `No pool found for provider '${args.provider}'` };
  }

  const before = pool.totalCount;
  await pool.warmUp(args.count);
  const after = pool.totalCount;

  return {
    provider: args.provider,
    targetCount: args.count,
    sessionsBefore: before,
    sessionsAfter: after,
    created: after - before,
  };
}

export async function handlePoolHealth(
  args: z.infer<typeof poolHealthInput>,
): Promise<Record<string, unknown>> {
  const report = getWebSessionPoolHealth(args.provider);
  return report as unknown as Record<string, unknown>;
}

// ─── Tool Registry ─────────────────────────────────────────────────────────

export const poolTools = {
  omniroute_pool_status: {
    name: "omniroute_pool_status",
    description:
      "Returns session pool status for a specific provider or all providers. Includes session counts by state (active/cooldown/dead), request totals, success rate, and throughput.",
    scopes: ["read:health"],
    inputSchema: poolStatusInput,
    handler: (args: z.infer<typeof poolStatusInput>) => handlePoolStatus(args),
  },
  omniroute_pool_sessions: {
    name: "omniroute_pool_sessions",
    description:
      "Lists all sessions in a provider's pool with per-session details: fingerprint, status, request counts, inflight, cooldown remaining, and age.",
    scopes: ["read:health"],
    inputSchema: poolSessionsInput,
    handler: (args: z.infer<typeof poolSessionsInput>) => handlePoolSessions(args),
  },
  omniroute_pool_reset: {
    name: "omniroute_pool_reset",
    description:
      "Shuts down and removes all sessions for a provider's pool. A new pool will be created automatically on the next request.",
    scopes: ["write:resilience"],
    inputSchema: poolResetInput,
    handler: (args: z.infer<typeof poolResetInput>) => handlePoolReset(args),
  },
  omniroute_pool_warm: {
    name: "omniroute_pool_warm",
    description:
      "Warms a session pool to the specified session count (1–50). Sessions beyond the current count are created with fresh browser fingerprints.",
    scopes: ["write:resilience"],
    inputSchema: poolWarmInput,
    handler: (args: z.infer<typeof poolWarmInput>) => handlePoolWarm(args),
  },
  omniroute_pool_health: {
    name: "omniroute_pool_health",
    description:
      "Returns aggregated web-session pool health: pool stats + circuit breaker state + per-session details + health status (healthy/degraded/down) + issues list.",
    scopes: ["read:health"],
    inputSchema: poolHealthInput,
    handler: (args: z.infer<typeof poolHealthInput>) => handlePoolHealth(args),
  },
};
