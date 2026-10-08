"use client";

import { useCallback, useEffect, useState } from "react";
import type { CooldownConnection } from "@/lib/resilience/cooldownManager";

export type CooldownProfile = { baseCooldownMs: number; maxBackoffSteps: number };

export interface CooldownRules {
  streamStallCooldown: boolean;
  oauth: CooldownProfile;
  apikey: CooldownProfile;
}

export interface ClearResult {
  cleared: number;
  unchanged: number;
  skippedTerminal: number;
  lockoutsCleared: number;
}

const POLL_INTERVAL_MS = 15000;

function toProfile(value: unknown): CooldownProfile {
  const record = (value ?? {}) as Partial<CooldownProfile>;
  return {
    baseCooldownMs: Number(record.baseCooldownMs ?? 0),
    maxBackoffSteps: Number(record.maxBackoffSteps ?? 0),
  };
}

export function toCooldownRules(json: Record<string, unknown>): CooldownRules {
  const cooldown = (json.connectionCooldown ?? {}) as Record<string, unknown>;
  const stall = (json.streamStallCooldown ?? {}) as { enabled?: boolean };
  return {
    streamStallCooldown: stall.enabled === true,
    oauth: toProfile(cooldown.oauth),
    apikey: toProfile(cooldown.apikey),
  };
}

async function fetchJson(url: string, init?: RequestInit): Promise<Record<string, unknown>> {
  const res = await fetch(url, { cache: "no-store", ...init });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/** Connections + cooldown rules for the cooldown manager, polled while the tab is visible. */
export function useCooldownData() {
  const [connections, setConnections] = useState<CooldownConnection[] | null>(null);
  const [rules, setRules] = useState<CooldownRules | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [receivedAt, setReceivedAt] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const [list, settings] = await Promise.all([
        fetchJson("/api/resilience/cooldowns"),
        fetchJson("/api/resilience"),
      ]);
      setConnections((list.connections as CooldownConnection[]) ?? []);
      setRules(toCooldownRules(settings));
      setReceivedAt(Date.now());
      setLoadError(false);
    } catch {
      setLoadError(true);
    }
  }, []);

  useEffect(() => {
    // Initial load plus visibility-aware polling; the fetch resolves asynchronously.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
    const timer = setInterval(() => {
      if (!document.hidden) void refresh();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [refresh]);

  const clearCooldowns = useCallback(
    async (body: { connectionIds?: string[]; all?: boolean; provider?: string }) => {
      const result = (await fetchJson("/api/resilience/cooldowns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })) as unknown as ClearResult;
      await refresh();
      return result;
    },
    [refresh]
  );

  const saveRules = useCallback(async (next: CooldownRules) => {
    const json = await fetchJson("/api/resilience", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        streamStallCooldown: { enabled: next.streamStallCooldown },
        connectionCooldown: { oauth: next.oauth, apikey: next.apikey },
      }),
    });
    setRules(toCooldownRules(json));
  }, []);

  return { connections, rules, loadError, receivedAt, refresh, clearCooldowns, saveRules };
}
