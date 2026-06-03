"use client";

import { useEffect } from "react";
import type { QuotaPool, PoolAllocation, Policy } from "@/lib/quota/dimensions";

const LS_KEY = "omniroute:quota-share:pools";

// Shape of a legacy localStorage pool (QuotaSharePageClient.tsx old format)
interface LsPool {
  id?: string;
  connectionId?: string;
  provider?: string;
  accountLabel?: string;
  window?: string;
  policy?: string;
  allocations?: Array<{
    apiKeyId?: string;
    percent?: number;
  }>;
}

interface PoolCreate {
  connectionId: string;
  name: string;
  allocations: Array<{
    apiKeyId: string;
    weight: number;
    capValue?: number;
    capUnit?: string;
    policy: Policy;
  }>;
}

export function adaptLsPoolToApiSchema(lsPool: LsPool): PoolCreate {
  const connectionId = lsPool.connectionId || "";
  const name =
    lsPool.accountLabel ||
    lsPool.provider ||
    lsPool.connectionId?.slice(0, 12) ||
    "Migrated pool";
  const policy: Policy =
    lsPool.policy === "soft" || lsPool.policy === "burst"
      ? (lsPool.policy as Policy)
      : "hard";

  const allocations: PoolAllocation[] = (lsPool.allocations || [])
    .filter((a) => a.apiKeyId)
    .map((a) => ({
      apiKeyId: a.apiKeyId as string,
      weight: typeof a.percent === "number" ? Math.max(0, Math.min(100, a.percent)) : 0,
      policy,
    }));

  return { connectionId, name, allocations };
}

export interface UseLocalStoragePoolMigrationInput {
  pools: QuotaPool[];
  mutate: () => Promise<unknown>;
}

export function useLocalStoragePoolMigration({
  pools,
  mutate,
}: UseLocalStoragePoolMigrationInput): void {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return;

    // Idempotency: if DB already has pools, do not migrate
    if (pools.length > 0) {
      // Leave localStorage key intact (safety — let user verify before cleanup)
      return;
    }

    let lsPools: unknown[] = [];
    try {
      lsPools = JSON.parse(raw) as unknown[];
    } catch {
      window.localStorage.removeItem(LS_KEY);
      return;
    }

    if (!Array.isArray(lsPools) || lsPools.length === 0) {
      window.localStorage.removeItem(LS_KEY);
      return;
    }

    // POST batch — migrate all pools
    Promise.all(
      lsPools.map((p) =>
        fetch("/api/quota/pools", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(adaptLsPoolToApiSchema(p as LsPool)),
        }).then((r) => r.ok)
      )
    )
      .then((results) => {
        if (results.every(Boolean)) {
          window.localStorage.removeItem(LS_KEY);
          void mutate();
        }
      })
      .catch(() => {
        // fail silent — try again on next load
      });
  }, [pools.length, mutate]);
}
