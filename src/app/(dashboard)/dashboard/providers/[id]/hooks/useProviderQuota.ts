"use client";

/**
 * useProviderQuota — data source for the per-account quota panel on the
 * provider detail page.
 *
 * The server already owns the whole quota pipeline: per-provider usage
 * fetchers persist their latest snapshot into `providerLimitsCache`
 * (namespace of the key_value store), a background scheduler refreshes it
 * every ~70 min, and two routes expose it:
 *   - GET /api/usage/provider-limits  → all cached entries, no upstream calls
 *   - GET /api/usage/[connectionId]   → live upstream fetch + persist
 *
 * This hook only loads the cached map once per page and refreshes a single
 * connection on demand — it never talks to an upstream provider itself.
 *
 * Kept cycle-safe like the sibling hooks: imports only React + leaf types,
 * never from ProviderDetailPageClient.
 */

import { useCallback, useEffect, useState } from "react";

export interface ProviderQuotaCacheEntry {
  quotas?: Record<string, unknown> | null;
  modelQuotas?: Record<string, unknown>;
  plan?: unknown;
  message?: string | null;
  fetchedAt?: string;
  source?: string | null;
  bankedResetCredits?: number;
}

export function useProviderQuota() {
  const [quotaByConnectionId, setQuotaByConnectionId] = useState<
    Record<string, ProviderQuotaCacheEntry>
  >({});
  const [quotaLoading, setQuotaLoading] = useState(true);
  const [refreshingIds, setRefreshingIds] = useState<ReadonlySet<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/usage/provider-limits", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled || !data?.caches || typeof data.caches !== "object") return;
        setQuotaByConnectionId(data.caches as Record<string, ProviderQuotaCacheEntry>);
      } catch {
        // Cached quotas are best-effort — rows simply stay without data and
        // the per-row refresh button remains available.
      } finally {
        if (!cancelled) setQuotaLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const refreshConnection = useCallback(async (connectionId: string) => {
    if (!connectionId) return;
    setRefreshingIds((prev) => {
      const next = new Set(prev);
      next.add(connectionId);
      return next;
    });
    try {
      const res = await fetch(`/api/usage/${encodeURIComponent(connectionId)}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const usage = await res.json();
        setQuotaByConnectionId((prev) => ({
          ...prev,
          [connectionId]: {
            ...usage,
            // The live route returns the usage payload, not the cache entry —
            // stamp the merge time so "updated X ago" stays meaningful.
            fetchedAt: usage?.fetchedAt || new Date().toISOString(),
          },
        }));
      }
    } catch {
      // Keep the previous cached entry on failure.
    } finally {
      setRefreshingIds((prev) => {
        const next = new Set(prev);
        next.delete(connectionId);
        return next;
      });
    }
  }, []);

  return { quotaByConnectionId, quotaLoading, refreshingIds, refreshConnection };
}
