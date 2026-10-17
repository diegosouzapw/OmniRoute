"use client";
/**
 * Context-window overrides of one provider (#14337): read from
 * GET /api/provider-models (`modelContextOverrides`) and saved through the PUT
 * `contextWindowOverride` field. Shared by CompatibleModelsSection and
 * ProviderModelsSection so the two editors cannot drift apart.
 *
 * `providerKey` must be the canonical provider id (or the compatible node id):
 * that is the key the capability resolver reads `model_context_overrides` by.
 */
import { useCallback, useEffect, useState } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { formatProviderModelsErrorResponse, providerText } from "../providerPageHelpers";

// Fetch + parse kept out of the hook so the mount effect sets state only after
// the await — the shape the set-state-in-effect rule requires.
export async function fetchProviderContextOverrides(
  providerId: string
): Promise<Record<string, number> | null> {
  try {
    const res = await fetch(`/api/provider-models?provider=${encodeURIComponent(providerId)}`);
    if (!res.ok) return null;
    const data = await res.json();
    const rows = Array.isArray(data?.modelContextOverrides) ? data.modelContextOverrides : [];
    const next: Record<string, number> = {};
    for (const row of rows) {
      const id = typeof row?.modelId === "string" ? row.modelId : null;
      const value = row?.contextWindowOverride;
      if (id && typeof value === "number") next[id] = value;
    }
    return next;
  } catch {
    // A failed read leaves the badges absent; editing still works.
    return null;
  }
}

export function useProviderContextOverrides(
  providerKey: string,
  t: (key: string, values?: Record<string, unknown>) => string,
  options: { enabled?: boolean } = {}
) {
  const enabled = options.enabled !== false;
  const notify = useNotificationStore();
  const [contextOverrides, setContextOverrides] = useState<Record<string, number>>({});
  const [savingContextModelId, setSavingContextModelId] = useState<string | null>(null);

  const loadContextOverrides = useCallback(async () => {
    const next = await fetchProviderContextOverrides(providerKey);
    if (next) setContextOverrides(next);
  }, [providerKey]);

  useEffect(() => {
    if (!enabled) return;
    const run = async () => {
      const next = await fetchProviderContextOverrides(providerKey);
      if (next) setContextOverrides(next);
    };
    void run();
  }, [providerKey, enabled]);

  const saveContextWindowOverride = useCallback(
    async (modelId: string, value: number | null) => {
      // The row signals invalid input as NaN rather than guessing a value.
      if (typeof value === "number" && Number.isNaN(value)) {
        notify.error(t("contextWindowOverrideInvalid"));
        return;
      }
      setSavingContextModelId(modelId);
      try {
        const res = await fetch("/api/provider-models", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: providerKey,
            modelId,
            // #4125 semantics, unchanged: a number sets the override, null clears
            // it and the model falls back to the discovered/catalog value.
            contextWindowOverride: value,
          }),
        });
        if (!res.ok) {
          const detail = await formatProviderModelsErrorResponse(res);
          throw new Error(
            detail ||
              providerText(
                t,
                "failedSaveModelEndpointSettings",
                "Failed to save model endpoint settings"
              )
          );
        }
        await loadContextOverrides();
        notify.success(
          providerText(t, "savedModelEndpointSettings", "Saved model endpoint settings")
        );
      } catch (e) {
        console.error("Failed to save context window override:", e);
        notify.error(
          e instanceof Error && e.message
            ? e.message
            : providerText(
                t,
                "failedSaveModelEndpointSettings",
                "Failed to save model endpoint settings"
              )
        );
      } finally {
        setSavingContextModelId(null);
      }
    },
    [providerKey, loadContextOverrides, notify, t]
  );

  return { contextOverrides, savingContextModelId, saveContextWindowOverride };
}
