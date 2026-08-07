"use client";

import { useState, useEffect, useCallback } from "react";

export interface ServiceStatus {
  tool: string;
  state: string;
  pid: number | null;
  port: number;
  health: string;
  startedAt: string | null;
  lastError: string | null;
  installedVersion: string | null;
  latestVersion: string | null;
  updateAvailable: boolean;
  autoStart: boolean;
  apiKeyMasked?: string | null;
  providerExpose?: boolean;
  /**
   * True when the running process was adopted from an already-listening
   * instance rather than spawned by this supervisor — it has no piped
   * stdout/stderr, so the Logs panel stays empty until it's replaced by a
   * real spawn (Stop then Start, or automatically via autoRestartAdopted).
   */
  adopted: boolean;
  /** When true, an adopted process is immediately killed and re-spawned. */
  autoRestartAdopted: boolean;
}

interface UseServiceStatusResult {
  data: ServiceStatus | null;
  isLoading: boolean;
  error: string | null;
  mutate: () => void;
}

const POLL_INTERVAL_MS = 5_000;

export function useServiceStatus(name: string): UseServiceStatusResult {
  const [data, setData] = useState<ServiceStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const mutate = useCallback(() => setTick((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function fetchStatus() {
      try {
        const res = await fetch(`/api/services/${name}/status`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as ServiceStatus;
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void fetchStatus();
    const timer = setInterval(fetchStatus, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [name, tick]);

  return { data, isLoading, error, mutate };
}
