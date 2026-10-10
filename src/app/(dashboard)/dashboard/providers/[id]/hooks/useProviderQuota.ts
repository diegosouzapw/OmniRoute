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

import { useCallback, useEffect, useRef, useState } from "react";
import { classifyQuotaObservation, type QuotaRefreshState } from "./providerQuotaRefresh";

export interface ProviderQuotaCacheEntry {
  quotas?: Record<string, unknown> | null;
  modelQuotas?: Record<string, unknown>;
  plan?: unknown;
  message?: string | null;
  fetchedAt?: string;
  source?: string | null;
  bankedResetCredits?: number;
}

interface QuotaOptions {
  providerId?: string;
  connectionIds?: string[];
  refreshConnections?: () => Promise<boolean>;
}

interface PendingRefresh {
  controller: AbortController;
  providerId?: string;
  promise: Promise<void>;
}

async function readObservation(
  id: string,
  providerId: string | undefined,
  signal: AbortSignal
): Promise<ReturnType<typeof classifyQuotaObservation>> {
  try {
    const response = await fetch(`/api/usage/${encodeURIComponent(id)}`, {
      cache: "no-store",
      signal,
    });
    if (!response.ok) throw new Error("Quota request failed");
    return classifyQuotaObservation(await response.json(), providerId);
  } catch {
    return { state: { status: "error" } as QuotaRefreshState };
  }
}

async function refreshProjection(refresh?: () => Promise<boolean>): Promise<boolean> {
  if (!refresh) return true;
  try {
    return await refresh();
  } catch {
    return false;
  }
}

function useQuotaCache() {
  const [quotaByConnectionId, setQuotaByConnectionId] = useState<
    Record<string, ProviderQuotaCacheEntry>
  >({});
  const [quotaLoading, setQuotaLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/usage/provider-limits", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled || !data?.caches || typeof data.caches !== "object") return;
        // A completed explicit observation takes precedence over a delayed initial snapshot.
        setQuotaByConnectionId((prev) => ({ ...data.caches, ...prev }));
      } catch {
        // Cached quotas are best-effort; explicit per-account refresh remains available.
      } finally {
        if (!cancelled) setQuotaLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { quotaByConnectionId, setQuotaByConnectionId, quotaLoading };
}

function usePendingQuotaRequests(options: QuotaOptions) {
  const pending = useRef(new Map<string, PendingRefresh>());
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const requests = pending.current;
    return () => {
      mounted.current = false;
      for (const request of requests.values()) request.controller.abort();
    };
  }, []);

  useEffect(() => {
    for (const [id, request] of pending.current) {
      if (
        request.providerId !== options.providerId ||
        (options.connectionIds && !options.connectionIds.includes(id))
      ) {
        request.controller.abort();
      }
    }
  }, [options.providerId, options.connectionIds]);

  return { pending, mounted };
}

export function useProviderQuota(options: QuotaOptions = {}) {
  const { quotaByConnectionId, setQuotaByConnectionId, quotaLoading } = useQuotaCache();
  const [refreshingIds, setRefreshingIds] = useState<ReadonlySet<string>>(new Set());
  const [refreshStates, setRefreshStates] = useState<Record<string, QuotaRefreshState>>({});
  const { pending, mounted } = usePendingQuotaRequests(options);

  const refreshConnection = useCallback(
    (connectionId: string): Promise<void> => {
      if (!connectionId) return Promise.resolve();
      const existing = pending.current.get(connectionId);
      if (existing && !existing.controller.signal.aborted) return existing.promise;
      const request: PendingRefresh = {
        controller: new AbortController(),
        providerId: options.providerId,
        promise: Promise.resolve(),
      };
      // Register before the first asynchronous operation, including calls in the same event tick.
      pending.current.set(connectionId, request);
      setRefreshingIds((prev) => new Set(prev).add(connectionId));
      setRefreshStates((prev) => ({ ...prev, [connectionId]: { status: "loading" } }));
      request.promise = Promise.resolve().then(async () => {
        try {
          const observation = await readObservation(
            connectionId,
            options.providerId,
            request.controller.signal
          );
          if (!mounted.current || request.controller.signal.aborted) return;
          const entry = observation.entry;
          if (entry) {
            setQuotaByConnectionId((prev) => ({
              ...prev,
              [connectionId]:
                observation.state.status === "stale" && prev[connectionId]
                  ? prev[connectionId]
                  : entry,
            }));
          }
          const refreshed = await refreshProjection(options.refreshConnections);
          if (!mounted.current || request.controller.signal.aborted) return;
          setRefreshStates((prev) => ({
            ...prev,
            [connectionId]: {
              ...observation.state,
              ...(!refreshed ? { connectionsRefreshFailed: true } : {}),
            },
          }));
        } finally {
          if (pending.current.get(connectionId) === request) {
            pending.current.delete(connectionId);
            if (mounted.current)
              setRefreshingIds((prev) => {
                const next = new Set(prev);
                next.delete(connectionId);
                return next;
              });
          }
        }
      });
      return request.promise;
    },
    [options.providerId, options.refreshConnections, pending, mounted, setQuotaByConnectionId]
  );

  return { quotaByConnectionId, quotaLoading, refreshingIds, refreshConnection, refreshStates };
}
