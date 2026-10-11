"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { formatProviderModelsErrorResponse, providerText } from "../providerPageHelpers";

async function readOutputOverrides(provider: string): Promise<Record<string, number> | null> {
  try {
    const response = await fetch(`/api/provider-models?provider=${encodeURIComponent(provider)}`);
    if (!response.ok) return null;
    const body = await response.json();
    const values: Record<string, number> = Object.create(null);
    for (const row of Array.isArray(body?.modelOutputOverrides) ? body.modelOutputOverrides : []) {
      if (
        typeof row?.modelId === "string" &&
        Number.isSafeInteger(row.maxOutputTokenOverride) &&
        row.maxOutputTokenOverride > 0
      )
        values[row.modelId] = row.maxOutputTokenOverride;
    }
    return values;
  } catch {
    return null;
  }
}

type OverrideState = { provider: string; values: Record<string, number> };

function applyOutputOverride(
  current: OverrideState,
  provider: string,
  modelId: string,
  value: number | null
): OverrideState {
  const next = { ...(current.provider === provider ? current.values : {}) };
  if (value === null) delete next[modelId];
  else next[modelId] = value;
  return { provider, values: next };
}

export function useModelOutputOverrides(
  provider: string,
  t: (key: string, values?: Record<string, unknown>) => string
) {
  const [state, setState] = useState<OverrideState>({ provider, values: {} });
  const [saving, setSaving] = useState<{ provider: string; modelId: string } | null>(null);
  const scopeRef = useRef({ provider });
  const readRevisionRef = useRef(0);
  const notify = useNotificationStore();
  useEffect(() => {
    const scope = { provider };
    scopeRef.current = scope;
    const revision = readRevisionRef.current;
    let active = true;
    void readOutputOverrides(provider).then((next) => {
      if (active && revision === readRevisionRef.current)
        setState({ provider, values: next || {} });
    });
    return () => {
      active = false;
      scopeRef.current = { provider: "" };
    };
  }, [provider]);
  const save = useCallback(
    async (modelId: string, value: number | null): Promise<boolean> => {
      if (value !== null && (!Number.isSafeInteger(value) || value <= 0)) {
        notify.error(t("maxOutputTokenOverrideHint"));
        return false;
      }
      const scope = scopeRef.current;
      const isCurrent = () => scopeRef.current === scope && scope.provider === provider;
      const request = { provider, modelId };
      setSaving(request);
      try {
        const response = await fetch("/api/provider-models", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider, modelId, maxOutputTokenOverride: value }),
        });
        if (!isCurrent()) return false;
        if (!response.ok) throw new Error(await formatProviderModelsErrorResponse(response));
        // Reads started before this confirmed write must not replace its value.
        const revision = ++readRevisionRef.current;
        // Use the confirmed write even if the following read temporarily fails.
        setState((current) => applyOutputOverride(current, provider, modelId, value));
        const next = await readOutputOverrides(provider);
        if (!isCurrent()) return false;
        if (next && revision === readRevisionRef.current) setState({ provider, values: next });
        notify.success(
          providerText(t, "savedModelEndpointSettings", "Saved model endpoint settings")
        );
        return true;
      } catch (error) {
        if (!isCurrent()) return false;
        notify.error(
          error instanceof Error && error.message
            ? error.message
            : providerText(
                t,
                "failedSaveModelEndpointSettings",
                "Failed to save model endpoint settings"
              )
        );
        return false;
      } finally {
        if (isCurrent()) setSaving((current) => (current === request ? null : current));
      }
    },
    [provider, notify, t]
  );
  return {
    overrides: state.provider === provider ? state.values : {},
    savingModelId: saving?.provider === provider ? saving.modelId : null,
    save,
  };
}
