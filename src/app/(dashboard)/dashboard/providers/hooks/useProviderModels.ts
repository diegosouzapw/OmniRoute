"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";

export interface ProviderModel {
  id: string;
  /** Display-friendly id (unprefixed) */
  displayId?: string;
  object?: string;
  owned_by?: string;
  /** Catalog model type, e.g. "chat", "audio", "image". */
  type?: string;
  /** Audio subtype, e.g. "transcription" or "speech". */
  subtype?: string;
}

interface UseProviderModelsResult {
  models: ProviderModel[];
  loading: boolean;
  error: string | null;
  /** Re-runs the model fetch for the current provider. Useful for a Retry action. */
  retry: () => void;
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
  const t = useTranslations("providers");
  const [models, setModels] = useState<ProviderModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Cancels any in-flight load (component unmount or a retry superseding the
  // previous request) so a stale response never overwrites a newer one.
  const cleanupRef = useRef<(() => void) | null>(null);

  const load = useCallback(() => {
    cleanupRef.current?.();
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/v1/providers/${encodeURIComponent(providerId)}/models`);
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as {
            error?: { message?: string };
          } | null;
          const msg = body?.error?.message ?? `${t("providerTestFailed")} (HTTP ${res.status})`;
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
                connections?: Array<{
                  id: string;
                  provider: string;
                  isActive?: boolean;
                  providerSpecificData?: { autoFetchModels?: boolean };
                }>;
              };
              if (cancelled) return;
              const providerConnections = connData.connections?.filter(
                (c) => (c.provider === providerId || c.id === providerId) && c.isActive !== false
              );
              const providerConn = providerConnections?.[0];

              if (
                providerConn &&
                providerConnections.every(
                  (connection) => connection.providerSpecificData?.autoFetchModels === true
                ) &&
                !cancelled
              ) {
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
    void run();
    const cleanup = () => {
      cancelled = true;
    };
    cleanupRef.current = cleanup;
    return cleanup;
  }, [providerId, t]);

  useEffect(() => {
    if (!providerId) return;
    return load();
  }, [providerId, load]);

  // Release the current in-flight cleanup on unmount so no state updates leak.
  useEffect(() => {
    return () => {
      cleanupRef.current?.();
    };
  }, []);

  const retry = useCallback(() => {
    if (!providerId) return;
    load();
  }, [providerId, load]);

  // Without a providerId nothing ever loads, so the exposed loading flag is
  // derived instead of being reset synchronously inside the effect above.
  return { models, loading: providerId ? loading : false, error, retry };
}
