import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

/**
 * POST /api/resilience/reset — Reset all provider circuit breakers and model lockouts.
 *
 * Requires management auth: flushing every breaker + model lockout disrupts
 * routing for all traffic, so it must not be reachable unauthenticated.
 */
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { getAllCircuitBreakerStatuses, getCircuitBreaker } =
      await import("@/shared/utils/circuitBreaker");

    const statuses = getAllCircuitBreakerStatuses();
    let resetCount = 0;

    for (const { name } of statuses) {
      const breaker = getCircuitBreaker(name);
      breaker.reset();
      resetCount++;
    }

    // Also clear in-memory model lockouts (per-model quota cooldowns)
    const { clearAllModelLockouts } =
      await import("@omniroute/open-sse/services/accountFallback.ts");
    clearAllModelLockouts();

    return NextResponse.json({
      ok: true,
      resetCount,
      message: `Reset ${resetCount} circuit breaker(s) and model lockouts`,
    });
  } catch (err: unknown) {
    console.error("[API] POST /api/resilience/reset error:", err);
    return NextResponse.json({ error: "Failed to reset resilience state" }, { status: 500 });
  }
}
