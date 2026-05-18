import { NextResponse } from "next/server";

/**
 * POST /api/resilience/reset — Reset all provider circuit breakers and model lockouts
 */
export async function POST() {
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
    const message = err instanceof Error ? err.message : "Failed to reset resilience state";
    console.error("[API] POST /api/resilience/reset error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
