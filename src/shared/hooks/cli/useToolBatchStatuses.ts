"use client";

import { useCallback, useEffect, useState } from "react";
import type { ToolBatchStatusMap } from "@/shared/types/cliBatchStatus";

export interface UseToolBatchStatusesResult {
  statuses: ToolBatchStatusMap | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useToolBatchStatuses(): UseToolBatchStatusesResult {
  const [statuses, setStatuses] = useState<ToolBatchStatusMap | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatuses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cli-tools/all-statuses");
      if (!res.ok) {
        const text = await res.text().catch(() => String(res.status));
        setError(`HTTP ${res.status}: ${text.slice(0, 200)}`);
        setStatuses(null);
        return;
      }
      const data = (await res.json()) as ToolBatchStatusMap;
      setStatuses(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setStatuses(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchStatuses();

    function handleFocus() {
      void fetchStatuses();
    }

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchStatuses]);

  return { statuses, loading, error, refetch: fetchStatuses };
}
