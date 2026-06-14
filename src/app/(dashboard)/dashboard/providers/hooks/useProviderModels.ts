"use client";

import { useState, useEffect } from "react";

export interface ProviderModel {
  id: string;
  /** Display-friendly id (unprefixed) */
  displayId?: string;
  object?: string;
  owned_by?: string;
}

interface UseProviderModelsResult {
  models: ProviderModel[];
  loading: boolean;
  error: string | null;
}

/**
 * useProviderModels — fetch models for a specific provider via
 * GET /api/v1/providers/{providerId}/models.
 *
 * Falls back to an empty list on error so the playground is still usable.
 * The hook is stable for the lifetime of the component (only re-fetches if
 * `providerId` changes).
 */
export function useProviderModels(providerId: string): UseProviderModelsResult {
  const [models, setModels] = useState<ProviderModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!providerId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/v1/providers/${encodeURIComponent(providerId)}/models`);
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as {
            error?: { message?: string };
          } | null;
          const msg = body?.error?.message ?? `HTTP ${res.status}`;
          if (!cancelled) setError(msg);
          return;
        }
        const data = (await res.json()) as { data?: ProviderModel[] };
        if (cancelled) return;

        let list = data.data ?? [];

        // Auto-sync from upstream if local catalog is empty
        if (list.length === 0) {
          setTimeout(async () => {
            try {
              if (cancelled) return;
              const connRes = await fetch("/api/providers");
              if (!connRes.ok || cancelled) return;
              const connData = (await connRes.json()) as {
                connections?: Array<{ id: string; provider: string; isActive?: boolean }>;
              };
              if (cancelled) return;
              const providerConn = connData.connections?.find(
                (c) => (c.provider === providerId || c.id === providerId) && c.isActive !== false
              );

              if (providerConn && !cancelled) {
                const syncRes = await fetch(
                  `/api/providers/${encodeURIComponent(providerConn.id)}/sync-models?mode=sync`,
                  { method: "POST" }
                );

                if (syncRes.ok && !cancelled) {
                  const refetchRes = await fetch(
                    `/api/v1/providers/${encodeURIComponent(providerId)}/models`
                  );
                  if (refetchRes.ok && !cancelled) {
                    const refetchData = (await refetchRes.json()) as { data?: ProviderModel[] };
                    if (!cancelled) {
                      setModels(refetchData.data ?? []);
                    }
                  }
                }
              }
            } catch (syncErr) {
              if (!cancelled) {
                console.log("Auto-fetch models failed:", syncErr);
              }
            }
          }, 0);
        }

        if (cancelled) return;
        setModels(list);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load models");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [providerId]);

  return { models, loading, error };
}
