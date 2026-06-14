/**
 * planResolver.ts — Resolve the quota plan for a provider connection.
 *
 * Precedence (highest to lowest):
 *   1. Manual DB override (provider_plans table via getProviderPlan)
 *   2. Known catalog (planRegistry.ts)
 *   3. Empty plan (no dimensions — manual configuration required)
 *
 * Runtime signals (upstream response headers) are accepted for future
 * extensibility but ignored in v1.
 *
 * Part of: Group B — Quota Sharing Engine (plan 22, frente F6).
 */

import { getProviderPlan } from "@/lib/localDb";
import { getKnownPlan } from "./planRegistry";
import type { ProviderPlan } from "./dimensions";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RuntimeSignals {
  /** Headers from upstream response (e.g. anthropic-ratelimit-unified-5h-utilization). */
  headers?: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Resolve the effective ProviderPlan for a connection.
 *
 * @param connectionId   Unique provider connection ID (from DB).
 * @param provider       Provider name (e.g. "codex", "kimi").
 * @param _runtimeSignals Optional upstream headers / signals (v1: ignored, reserved for future use).
 * @returns              The effective ProviderPlan (never throws).
 */
export function resolvePlan(
  connectionId: string,
  provider: string,
  _runtimeSignals?: RuntimeSignals
): ProviderPlan {
  // 1. Manual DB override
  try {
    const dbPlan = getProviderPlan(connectionId);
    if (dbPlan && dbPlan.dimensions.length > 0) {
      return {
        connectionId: dbPlan.connectionId,
        provider: dbPlan.provider,
        dimensions: dbPlan.dimensions as ProviderPlan["dimensions"],
        source: dbPlan.source,
      };
    }
  } catch {
    // DB not available (e.g. test env without migration) — fall through
  }

  // 2. Known catalog
  const catalogPlan = getKnownPlan(provider);
  if (catalogPlan) {
    return {
      connectionId: null,
      provider: catalogPlan.provider,
      dimensions: catalogPlan.dimensions,
      source: "auto",
    };
  }

  // 3. Empty (manual configuration required)
  return {
    connectionId: null,
    provider,
    dimensions: [],
    source: "manual",
  };
}
