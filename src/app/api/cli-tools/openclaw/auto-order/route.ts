/**
 * OpenClaw Integration — Dynamic provider.order based on Auto-Combo scores.
 *
 * GET /api/cli-tools/openclaw/auto-order
 */

import { NextResponse } from "next/server";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { getComboModelProvider } from "@/lib/combos/steps";
import { resolveOmniRouteBaseUrl } from "@/shared/utils/resolveOmniRouteBaseUrl";

const OMNIROUTE_BASE_URL = resolveOmniRouteBaseUrl();

export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    // Fetch current health and combos to determine best provider ordering
    const [healthRes, combosRes] = await Promise.allSettled([
      fetch(`${OMNIROUTE_BASE_URL}/api/monitoring/health`, { signal: AbortSignal.timeout(5000) }),
      fetch(`${OMNIROUTE_BASE_URL}/api/combos`, { signal: AbortSignal.timeout(5000) }),
    ]);

    const health = healthRes.status === "fulfilled" ? await healthRes.value.json() : {};
    const combosPayload = combosRes.status === "fulfilled" ? await combosRes.value.json() : [];
    const combos = Array.isArray(combosPayload)
      ? combosPayload
      : Array.isArray(combosPayload?.combos)
        ? combosPayload.combos
        : [];

    // Build provider scores from circuit breaker state
    const breakers: any[] = health?.circuitBreakers || [];
    const providerScores = new Map<string, number>();

    // Start all providers with base score
    const allProviders = new Set<string>();
    if (Array.isArray(combos)) {
      for (const combo of combos) {
        for (const model of combo.models || combo.data?.models || []) {
          const provider = getComboModelProvider(model);
          if (!provider) continue;
          allProviders.add(provider);
          providerScores.set(provider, (providerScores.get(provider) || 0) + 1);
        }
      }
    }

    // Adjust by circuit breaker state
    for (const cb of breakers) {
      const current = providerScores.get(cb.provider) || 0;
      if (cb.state === "OPEN") providerScores.set(cb.provider, current * 0.1);
      else if (cb.state === "HALF_OPEN") providerScores.set(cb.provider, current * 0.5);
    }

    // Sort by score descending
    const ordered = [...providerScores.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([provider]) => provider);

    return NextResponse.json({
      provider: {
        order: ordered,
        allow_fallbacks: true,
      },
      generated_at: new Date().toISOString(),
      source: "omniroute-auto-combo",
    });
  } catch {
    return NextResponse.json({
      provider: {
        order: ["anthropic", "google", "openai"],
        allow_fallbacks: true,
      },
      generated_at: new Date().toISOString(),
      source: "omniroute-fallback",
    });
  }
}
