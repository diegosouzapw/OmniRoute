"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { QuotaPool } from "@/lib/quota/dimensions";

export interface UsePoolsResult {
  pools: QuotaPool[];
  loading: boolean;
  error: string | null;
  mutate: () => Promise<void>;
}

export function usePools(): UsePoolsResult {
  const [pools, setPools] = useState<QuotaPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fetchPools = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/quota/pools");
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data: unknown = await res.json();
      if (!mountedRef.current) return;
      const list = Array.isArray(data)
        ? (data as QuotaPool[])
        : Array.isArray((data as { pools?: QuotaPool[] }).pools)
          ? (data as { pools: QuotaPool[] }).pools
          : [];
      setPools(list);
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err instanceof Error ? err.message : "Failed to load pools");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    void fetchPools();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchPools]);

  const mutate = useCallback(async () => {
    await fetchPools();
  }, [fetchPools]);

  return { pools, loading, error, mutate };
}
