"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PoolUsageSnapshot } from "@/lib/quota/types";

export interface UsePoolUsageResult {
  usage: PoolUsageSnapshot | null;
  loading: boolean;
  error: string | null;
}

export function usePoolUsage(poolId: string, pollIntervalMs = 15_000): UsePoolUsageResult {
  const [usage, setUsage] = useState<PoolUsageSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fetchUsage = useCallback(async () => {
    if (!poolId) return;
    try {
      const res = await fetch(`/api/quota/pools/${poolId}/usage`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // The endpoint wraps the snapshot as `{ usage: snapshot }` — unwrap it.
      // Storing the wrapper directly left `usage.dimensions` undefined, which
      // crashed StackedAllocationBar (usage.dimensions[i]) for any pool that has
      // allocations — taking down the whole quota-share page.
      const data = (await res.json()) as { usage?: PoolUsageSnapshot | null };
      if (!mountedRef.current) return;
      setUsage(data?.usage ?? null);
      setError(null);
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err instanceof Error ? err.message : "Failed to load usage");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [poolId]);

  useEffect(() => {
    mountedRef.current = true;
    void fetchUsage();

    const interval = setInterval(() => {
      void fetchUsage();
    }, pollIntervalMs);

    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, [fetchUsage, pollIntervalMs]);

  return { usage, loading, error };
}
