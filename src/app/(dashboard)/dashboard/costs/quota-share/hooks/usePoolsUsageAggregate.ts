"use client";

import { useEffect, useState } from "react";
import type { QuotaPool } from "@/lib/quota/dimensions";
import type { PoolUsageSnapshot } from "@/lib/quota/types";

export interface PoolsUsageAggregate {
  avgUtilizationPercent: number; // 0-100
  borrowingKeyCount: number;
  loading: boolean;
  error: string | null;
}

const POLL_MS = 15_000;

export function usePoolsUsageAggregate(pools: QuotaPool[]): PoolsUsageAggregate {
  const [state, setState] = useState<PoolsUsageAggregate>({
    avgUtilizationPercent: 0,
    borrowingKeyCount: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;
    const ids = pools.map((p) => p.id);
    if (ids.length === 0) {
      setState({ avgUtilizationPercent: 0, borrowingKeyCount: 0, loading: false, error: null });
      return;
    }

    const fetchAll = async () => {
      try {
        const snapshots = await Promise.all(
          ids.map((id) => fetch(`/api/quota/pools/${id}/usage`).then((r) => (r.ok ? r.json() : null)))
        );
        if (!mounted) return;
        const valid = snapshots.filter((s): s is { usage: PoolUsageSnapshot } => s !== null && !!s.usage);
        let totalUtil = 0;
        let utilCount = 0;
        let borrowing = 0;
        for (const { usage } of valid) {
          for (const dim of usage.dimensions ?? []) {
            if (dim.limit > 0) {
              totalUtil += (dim.consumedTotal / dim.limit) * 100;
              utilCount += 1;
            }
            for (const key of dim.perKey ?? []) {
              if (key.borrowing) borrowing += 1;
            }
          }
        }
        setState({
          avgUtilizationPercent: utilCount > 0 ? totalUtil / utilCount : 0,
          borrowingKeyCount: borrowing,
          loading: false,
          error: null,
        });
      } catch (err) {
        if (mounted) {
          setState((s) => ({ ...s, loading: false, error: err instanceof Error ? err.message : "fetch failed" }));
        }
      }
    };

    void fetchAll();
    const interval = setInterval(fetchAll, POLL_MS);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [pools.map((p) => p.id).join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}
