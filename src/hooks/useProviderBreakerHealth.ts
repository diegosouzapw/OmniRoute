"use client";

import { useEffect, useRef, useState } from "react";
import type {
  ProviderBreakerSnapshot,
  ConnectionCooldownSnapshot,
} from "@/app/(dashboard)/dashboard/combos/live/comboFlowModel";

const DEFAULT_POLL_MS = 5000;
const POLL_TIMEOUT_MS = 8000;

export interface ResilienceHealthSnapshot {
  /** Per-provider circuit-breaker state (`providerHealth`). */
  providerHealth: Record<string, ProviderBreakerSnapshot>;
  /** Per-provider connection-cooldown summary (`connectionHealth`). */
  connectionHealth: Record<string, ConnectionCooldownSnapshot>;
}

const EMPTY: ResilienceHealthSnapshot = { providerHealth: {}, connectionHealth: {} };

/**
 * Polls `GET /api/monitoring/health` and exposes the resilience overlays the Combo
 * Live Studio consumes (U1b): per-provider circuit-breaker state (`providerHealth`)
 * and per-provider connection-cooldown summary (`connectionHealth`).
 *
 * Fail-soft by design: any network/parse error keeps the last known snapshot (or the
 * empty default), so the cascade simply shows no resilience badges instead of breaking.
 * One poll covers both overlays. Polls every `pollMs` and on mount.
 */
export function useProviderBreakerHealth(pollMs = DEFAULT_POLL_MS): ResilienceHealthSnapshot {
  const [snapshot, setSnapshot] = useState<ResilienceHealthSnapshot>(EMPTY);
  const inFlightRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      if (inFlightRef.current) return;

      const controller = new AbortController();
      inFlightRef.current = controller;
      const timeoutId = setTimeout(
        () => controller.abort("Provider breaker health timeout"),
        POLL_TIMEOUT_MS
      );

      try {
        const res = await fetch("/api/monitoring/health", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) return;
        const json = (await res.json()) as {
          providerHealth?: Record<string, ProviderBreakerSnapshot>;
          connectionHealth?: Record<string, ConnectionCooldownSnapshot>;
        };
        if (cancelled || !json || typeof json !== "object") return;
        setSnapshot({
          providerHealth:
            typeof json.providerHealth === "object" && json.providerHealth
              ? json.providerHealth
              : {},
          connectionHealth:
            typeof json.connectionHealth === "object" && json.connectionHealth
              ? json.connectionHealth
              : {},
        });
      } catch {
        // Fail-soft: keep the previous snapshot; cascade degrades to no badges.
      } finally {
        clearTimeout(timeoutId);
        if (inFlightRef.current === controller) {
          inFlightRef.current = null;
        }
      }
    };

    poll();
    const id = setInterval(poll, pollMs);
    return () => {
      cancelled = true;
      inFlightRef.current?.abort("Provider breaker health unmounted");
      inFlightRef.current = null;
      clearInterval(id);
    };
  }, [pollMs]);

  return snapshot;
}
