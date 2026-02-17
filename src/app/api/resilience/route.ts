import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";

/**
 * GET /api/resilience — Get current resilience configuration and status
 */
export async function GET() {
  try {
    // Dynamic imports for open-sse modules
    const { getAllCircuitBreakerStatuses } =
      await import("@/../../src/shared/utils/circuitBreaker");
    const { getAllRateLimitStatus } = await import("@omniroute/open-sse/services/rateLimitManager");
    const { PROVIDER_PROFILES, DEFAULT_API_LIMITS } =
      await import("@omniroute/open-sse/config/constants");

    const settings = await getSettings();
    const circuitBreakers = getAllCircuitBreakerStatuses();
    const rateLimitStatus = getAllRateLimitStatus();

    return NextResponse.json({
      profiles: settings.providerProfiles || PROVIDER_PROFILES,
      defaults: { ...DEFAULT_API_LIMITS, ...(settings.rateLimitDefaults || {}) },
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
 * PATCH /api/resilience — Update provider resilience profiles and/or rate limit defaults
 */
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { profiles, defaults } = body;

    if (!profiles && !defaults) {
      return NextResponse.json({ error: "Must provide profiles or defaults" }, { status: 400 });
    }

    // Validate profiles if provided
    if (profiles) {
      if (typeof profiles !== "object") {
        return NextResponse.json({ error: "Invalid profiles payload" }, { status: 400 });
      }
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
    }

    // Validate defaults if provided
    if (defaults) {
      if (typeof defaults !== "object") {
        return NextResponse.json({ error: "Invalid defaults payload" }, { status: 400 });
      }
      const validKeys = ["requestsPerMinute", "minTimeBetweenRequests", "concurrentRequests"];
      for (const key of validKeys) {
        if (
          defaults[key] !== undefined &&
          (typeof defaults[key] !== "number" || defaults[key] < 1)
        ) {
          return NextResponse.json(
            { error: `Invalid defaults.${key}: must be a positive number` },
            { status: 400 }
          );
        }
      }
    }

    const updates: Record<string, any> = {};
    if (profiles) updates.providerProfiles = profiles;
    if (defaults) updates.rateLimitDefaults = defaults;

    await updateSettings(updates);

    return NextResponse.json({
      ok: true,
      ...(profiles ? { profiles } : {}),
      ...(defaults ? { defaults } : {}),
    });
  } catch (err) {
    console.error("[API] PATCH /api/resilience error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to save resilience settings" },
      { status: 500 }
    );
  }
}
