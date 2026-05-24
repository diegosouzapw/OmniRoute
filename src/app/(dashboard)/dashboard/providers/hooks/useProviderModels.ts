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
        setModels(data.data ?? []);
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
