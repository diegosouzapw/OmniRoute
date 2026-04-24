import { NextResponse } from "next/server";
import { getProviderConnections, getSettings } from "@/lib/localDb";
import { buildHealthPayload } from "@/lib/monitoring/observability";
import { APP_CONFIG } from "@/shared/constants/config";
import { AI_PROVIDERS } from "@/shared/constants/providers";

/**
 * GET /api/monitoring/health — System health overview
 *
 * Returns system info, provider health (circuit breakers),
 * rate limit status, and database stats.
 */
export async function GET() {
  try {
    const { getAllCircuitBreakerStatuses } = await import("@/shared/utils/circuitBreaker");
    const { getAllRateLimitStatus, getLearnedLimits } =
      await import("@omniroute/open-sse/services/rateLimitManager");
    const { getAllModelLockouts } = await import("@omniroute/open-sse/services/accountFallback");
    const { getInflightCount } = await import("@omniroute/open-sse/services/requestDedup.ts");
    const { getQuotaMonitorSummary, getQuotaMonitorSnapshots } =
      await import("@omniroute/open-sse/services/quotaMonitor.ts");
    const { getActiveSessions, getAllActiveSessionCountsByKey } =
      await import("@omniroute/open-sse/services/sessionManager.ts");

    const settings = await getSettings();
    const connections = await getProviderConnections();
    const circuitBreakers = getAllCircuitBreakerStatuses();
    const rateLimitStatus = getAllRateLimitStatus();
    const learnedLimits = getLearnedLimits();
    const lockouts = getAllModelLockouts();
    const quotaMonitorSummary = getQuotaMonitorSummary();
    const quotaMonitorMonitors = getQuotaMonitorSnapshots();
    const activeSessions = getActiveSessions();
    const activeSessionsByKey = getAllActiveSessionCountsByKey();
    const { getAllHealthStatuses } = await import("@/lib/localHealthCheck");
    const payload = buildHealthPayload({
      appVersion: APP_CONFIG.version,
      catalogCount: Object.keys(AI_PROVIDERS).length,
      settings,
      connections,
      circuitBreakers,
      rateLimitStatus,
      learnedLimits,
      lockouts,
      localProviders: getAllHealthStatuses(),
      inflightRequests: getInflightCount(),
      quotaMonitorSummary,
      quotaMonitorMonitors,
      activeSessions,
      activeSessionsByKey,
    });

    return NextResponse.json(payload);
  } catch (error) {
    console.error("[API] GET /api/monitoring/health error:", error);
    return NextResponse.json({ status: "error", error: "Health check failed" }, { status: 500 });
  }
}

/**
 * DELETE /api/monitoring/health — Reset all circuit breakers
 *
 * Resets all provider circuit breakers to CLOSED state,
 * clearing failure counts and persisted state.
 */
export async function DELETE() {
  try {
    const { resetAllCircuitBreakers, getAllCircuitBreakerStatuses } =
      await import("@/shared/utils/circuitBreaker");

    const before = getAllCircuitBreakerStatuses();
    const resetCount = before.length;

    resetAllCircuitBreakers();

    console.log(`[API] DELETE /api/monitoring/health — Reset ${resetCount} circuit breakers`);

    return NextResponse.json({
      success: true,
      message: `Reset ${resetCount} circuit breaker(s) to healthy state`,
      resetCount,
    });
  } catch (error) {
    console.error("[API] DELETE /api/monitoring/health error:", error);
    return NextResponse.json({ error: "Failed to reset circuit breakers" }, { status: 500 });
  }
}
