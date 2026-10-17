"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { formatProviderModelsErrorResponse, providerText } from "../providerPageHelpers";

function parseVisionOverrides(body: unknown): Record<string, boolean> {
  const values: Record<string, boolean> = Object.create(null);
  if (!body || typeof body !== "object") return values;
  const data = body as Record<string, unknown>;
  // Custom model values override legacy compatibility values, matching runtime policy.
  for (const rows of [data.modelCompatOverrides, data.models]) {
    if (!Array.isArray(rows)) continue;
    for (const row of rows) {
      if (typeof row?.id === "string" && typeof row.supportsVision === "boolean") {
        values[row.id] = row.supportsVision;
      }
    }
  }
  return values;
}

async function readVisionOverrides(provider: string): Promise<Record<string, boolean> | null> {
  try {
    const response = await fetch(`/api/provider-models?provider=${encodeURIComponent(provider)}`);
    if (!response.ok) return null;
    return parseVisionOverrides(await response.json());
  } catch {
    return null;
  }
}

type OverrideState = { provider: string; values: Record<string, boolean> };

function applyVisionOverride(
  current: OverrideState,
  provider: string,
  modelId: string,
  value: boolean | null
): OverrideState {
  const next = { ...(current.provider === provider ? current.values : {}) };
  if (value === null) delete next[modelId];
  else next[modelId] = value;
  return { provider, values: next };
}

export function useModelVisionOverrides(
  provider: string,
  t: (key: string, values?: Record<string, unknown>) => string,
  onModelsChanged?: () => void
) {
  const [state, setState] = useState<OverrideState>({ provider, values: {} });
  const [saving, setSaving] = useState<{ scope: { provider: string }; modelId: string } | null>(
    null
  );
  const providerScope = useMemo(() => ({ provider }), [provider]);
  const scopeRef = useRef(providerScope);
  const pendingScopeRef = useRef<{ provider: string } | null>(null);
  const readRevisionRef = useRef(0);
  const notify = useNotificationStore();
  useEffect(() => {
    scopeRef.current = providerScope;
    const revision = readRevisionRef.current;
    let active = true;
    void readVisionOverrides(provider).then((next) => {
      if (active && revision === readRevisionRef.current)
        setState({ provider, values: next || {} });
    });
    return () => {
      active = false;
      scopeRef.current = { provider: "" };
    };
  }, [provider, providerScope]);
  const save = useCallback(
    async (modelId: string, value: boolean | null): Promise<boolean> => {
      const scope = scopeRef.current;
      // One write per provider scope prevents stale overlapping refreshes from winning.
      if (pendingScopeRef.current === scope) return false;
      pendingScopeRef.current = scope;
      const isCurrent = () => scopeRef.current === scope && scope.provider === provider;
      const request = { scope, modelId };
      setSaving(request);
      try {
        const response = await fetch("/api/provider-models", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider, modelId, supportsVision: value }),
        });
        if (!isCurrent()) return false;
        if (!response.ok) throw new Error(await formatProviderModelsErrorResponse(response));
        // Reads started before this confirmed write must not replace its value.
        const revision = ++readRevisionRef.current;
        // Use the confirmed write even if the following read temporarily fails.
        setState((current) => applyVisionOverride(current, provider, modelId, value));
        const next = await readVisionOverrides(provider);
        if (!isCurrent()) return false;
        if (next && revision === readRevisionRef.current) setState({ provider, values: next });
        notify.success(
          providerText(t, "savedModelEndpointSettings", "Saved model endpoint settings")
        );
        onModelsChanged?.();
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
        if (isCurrent()) {
          pendingScopeRef.current = null;
          setSaving((current) => (current === request ? null : current));
        }
      }
    },
    [provider, notify, t, onModelsChanged]
  );
  return {
    overrides: state.provider === provider ? state.values : {},
    savingModelId: saving?.scope === providerScope ? saving.modelId : null,
    save,
  };
}
