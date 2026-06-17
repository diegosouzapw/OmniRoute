"use client";

import { useEffect, useState } from "react";
import type { ProviderBreakerSnapshot } from "@/app/(dashboard)/dashboard/combos/live/comboFlowModel";

const DEFAULT_POLL_MS = 5000;

/**
 * Polls `GET /api/monitoring/health` and exposes its per-provider circuit-breaker
 * snapshot (`providerHealth: { [provider]: { state, retryAfterMs } }`).
 *
 * Fail-soft by design: any network/parse error keeps the last known map (or the
 * empty default), so the Combo Live Studio (U1b) simply shows no breaker badges
 * instead of breaking. Polls every `pollMs` and on mount.
 */
export function useProviderBreakerHealth(
  pollMs = DEFAULT_POLL_MS
): Record<string, ProviderBreakerSnapshot> {
  const [providerHealth, setProviderHealth] = useState<
    Record<string, ProviderBreakerSnapshot>
  >({});

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      try {
        const res = await fetch("/api/monitoring/health");
        if (!res.ok) return;
        const json = (await res.json()) as {
          providerHealth?: Record<string, ProviderBreakerSnapshot>;
        };
        if (!cancelled && json && typeof json.providerHealth === "object" && json.providerHealth) {
          setProviderHealth(json.providerHealth);
        }
      } catch {
        // Fail-soft: keep the previous snapshot; cascade degrades to no badges.
      }
    };

    poll();
    const id = setInterval(poll, pollMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [pollMs]);

  return providerHealth;
}
