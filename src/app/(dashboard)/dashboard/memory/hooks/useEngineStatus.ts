"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MemoryEngineStatus } from "@/shared/schemas/memory";

export interface UseEngineStatusResult {
  status: MemoryEngineStatus | null;
  isLoading: boolean;
  isError: boolean;
  mutate: () => Promise<void>;
}

/**
 * Lightweight engine-status fetcher with periodic polling.
 * Avoids the swr dependency (not installed in this project) while keeping a
 * compatible mutate()/loading/error surface for callers.
 */
export function useEngineStatus(refreshIntervalMs = 5000): UseEngineStatusResult {
  const [status, setStatus] = useState<MemoryEngineStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const mounted = useRef(true);

  const fetchOnce = useCallback(async (): Promise<void> => {
    try {
      const res = await fetch("/api/memory/engine-status");
      if (!res.ok) throw new Error(`status_${res.status}`);
      const data = (await res.json()) as MemoryEngineStatus;
      if (mounted.current) {
        setStatus(data);
        setIsError(false);
      }
    } catch {
      if (mounted.current) setIsError(true);
    } finally {
      if (mounted.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    void fetchOnce();
    if (!refreshIntervalMs || refreshIntervalMs <= 0) {
      return () => {
        mounted.current = false;
      };
    }
    const id = setInterval(() => {
      void fetchOnce();
    }, refreshIntervalMs);
    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, [fetchOnce, refreshIntervalMs]);

  return { status, isLoading, isError, mutate: fetchOnce };
}
