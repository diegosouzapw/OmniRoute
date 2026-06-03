"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AgentBridgePageData } from "../AgentBridgePageClient";

interface UseAgentBridgeStateOptions {
  initialData: AgentBridgePageData;
  pollingInterval?: number;
}

interface UseAgentBridgeStateReturn {
  data: AgentBridgePageData;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Hook for fetching and revalidating AgentBridge page data.
 * Uses fetch + polling (no SWR dependency) — project pattern from cloud-agents.
 */
export function useAgentBridgeState({
  initialData,
  pollingInterval = 5000,
}: UseAgentBridgeStateOptions): UseAgentBridgeStateReturn {
  const [data, setData] = useState<AgentBridgePageData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tools/agent-bridge/state", {
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as AgentBridgePageData;
      if (!ctrl.signal.aborted) setData(json);
    } catch (err) {
      if (!ctrl.signal.aborted) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    } finally {
      if (!ctrl.signal.aborted) setLoading(false);
    }
  }, []);

  // Auto-poll
  useEffect(() => {
    if (!pollingInterval || pollingInterval <= 0) return;
    const id = setInterval(() => {
      refresh().catch(() => {/* swallow background errors */});
    }, pollingInterval);
    return () => clearInterval(id);
  }, [pollingInterval, refresh]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  return { data, loading, error, refresh };
}
