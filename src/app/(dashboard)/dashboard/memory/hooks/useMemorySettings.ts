"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MemorySettingsExtended } from "@/shared/schemas/memory";

export interface UseMemorySettingsResult {
  settings: MemorySettingsExtended | null;
  isLoading: boolean;
  isError: boolean;
  mutate: () => Promise<void>;
  save: (updates: Partial<MemorySettingsExtended>) => Promise<boolean>;
}

/**
 * Lightweight settings fetcher + saver.
 * Avoids the swr dependency (not installed in this project) while keeping a
 * compatible mutate()/save() surface for callers.
 */
export function useMemorySettings(): UseMemorySettingsResult {
  const [settings, setSettings] = useState<MemorySettingsExtended | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const mounted = useRef(true);

  const fetchOnce = useCallback(async (): Promise<void> => {
    try {
      const res = await fetch("/api/settings/memory");
      if (!res.ok) throw new Error(`status_${res.status}`);
      const data = (await res.json()) as MemorySettingsExtended;
      if (mounted.current) {
        setSettings(data);
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
    return () => {
      mounted.current = false;
    };
  }, [fetchOnce]);

  const save = useCallback(
    async (updates: Partial<MemorySettingsExtended>): Promise<boolean> => {
      try {
        const res = await fetch("/api/settings/memory", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        if (!res.ok) return false;
        await fetchOnce();
        return true;
      } catch {
        return false;
      }
    },
    [fetchOnce]
  );

  return { settings, isLoading, isError, mutate: fetchOnce, save };
}
