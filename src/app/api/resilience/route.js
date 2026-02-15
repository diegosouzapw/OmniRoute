import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";

/**
 * GET /api/resilience — Get current resilience configuration and status
 */
export async function GET() {
  try {
    // Dynamic imports for open-sse modules
    const { getAllCircuitBreakerStatuses } =
      await import("@/../../src/shared/utils/circuitBreaker.js");
    const { getAllRateLimitStatus } =
      await import("@omniroute/open-sse/services/rateLimitManager.js");
    const { PROVIDER_PROFILES, DEFAULT_API_LIMITS } =
      await import("@omniroute/open-sse/config/constants.js");

    const settings = await getSettings();
    const circuitBreakers = getAllCircuitBreakerStatuses();
    const rateLimitStatus = getAllRateLimitStatus();

    return NextResponse.json({
      profiles: settings.providerProfiles || PROVIDER_PROFILES,
      defaults: DEFAULT_API_LIMITS,
      circuitBreakers,
      rateLimitStatus,
    });
  } catch (err) {
    console.error("[API] GET /api/resilience error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to load resilience status" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/resilience — Update provider resilience profiles
 */
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { profiles } = body;

    if (!profiles || typeof profiles !== "object") {
      return NextResponse.json({ error: "Invalid profiles payload" }, { status: 400 });
    }

    // Validate profile shape
    for (const [key, profile] of Object.entries(profiles)) {
      if (!["oauth", "apikey"].includes(key)) {
        return NextResponse.json({ error: `Invalid profile key: ${key}` }, { status: 400 });
      }
      const required = [
        "transientCooldown",
        "rateLimitCooldown",
        "maxBackoffLevel",
        "circuitBreakerThreshold",
        "circuitBreakerReset",
      ];
      for (const field of required) {
        if (typeof profile[field] !== "number" || profile[field] < 0) {
          return NextResponse.json(
            { error: `Invalid ${key}.${field}: must be a non-negative number` },
            { status: 400 }
          );
        }
      }
    }

    await updateSettings({ providerProfiles: profiles });

    return NextResponse.json({ ok: true, profiles });
  } catch (err) {
    console.error("[API] PATCH /api/resilience error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to save resilience profiles" },
      { status: 500 }
    );
  }
}
