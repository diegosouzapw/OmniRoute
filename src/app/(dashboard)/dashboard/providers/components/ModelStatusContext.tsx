"use client";

/**
 * ModelStatusContext — shared polling for model availability
 *
 * Prevents redundant API calls by having all ModelStatusBadge components
 * share a single polling interval. Only one request is made every 15 seconds
 * regardless of how many badges are on the page.
 */

import React, { createContext, useContext, useEffect, useRef, useCallback, useMemo } from "react";

export interface ModelStatus {
  status: "available" | "cooldown" | "unavailable" | "error" | "unknown";
  reason?: string;
  remainingMs?: number;
  lastError?: string;
}

interface ModelStatusContextValue {
  getStatus: (provider: string, model: string) => ModelStatus | null;
  registerModel: (key: string, provider: string, model: string) => void;
  unregisterModel: (key: string) => void;
}

const ModelStatusContext = createContext<ModelStatusContextValue | null>(null);

// Global map of model key -> status
let modelStatusMap = new Map<string, ModelStatus>();
// Global set of registered model keys
let registeredModels = new Set<string>();
// Polling interval ref (singleton)
let pollIntervalRef: NodeJS.Timeout | null = null;

function getModelKey(provider: string, model: string): string {
  return `${provider}/${model}`;
}

async function fetchModelStatus(): Promise<void> {
  try {
    const res = await fetch("/api/models/availability");
    if (!res.ok) return;

    const json = await res.json();
    const models = json?.models || [];

    // Update all registered models with fresh data
    const now = Date.now();
    registeredModels.forEach((key) => {
      const [provider, model] = key.split("/");
      // Use exact matching first to avoid gpt-4 matching gpt-4-turbo incorrectly
      const modelEntry =
        models.find((m: any) => m.provider === provider && m.model === model) ||
        models.find(
          // Fallback to prefix matching only for models that contain the registered key
          // This handles cases like "gpt-4o" matching badge for "gpt-4"
          (m: any) =>
            m.provider === provider &&
            m.model &&
            model &&
            (m.model.startsWith(model + "-") || model.startsWith(m.model + "-"))
        );

      if (modelEntry) {
        const newStatus: ModelStatus = {
          status: modelEntry.status || "unknown",
          reason: modelEntry.reason,
          remainingMs: modelEntry.remainingMs,
          lastError: modelEntry.lastError,
        };

        // For cooldown status, calculate remaining time based on server-provided value
        if (modelEntry.status === "cooldown" && modelEntry.remainingMs) {
          newStatus.remainingMs = modelEntry.remainingMs;
        }

        modelStatusMap.set(key, newStatus);
      } else {
        modelStatusMap.set(key, { status: "available" });
      }
    });

    // Trigger re-render by dispatching custom event
    window.dispatchEvent(new CustomEvent("model-status-update"));
  } catch {
    // Best-effort polling
  }
}

function ensurePolling(): void {
  if (pollIntervalRef) return;

  // Initial fetch
  fetchModelStatus();

  // Poll every 15 seconds
  pollIntervalRef = setInterval(fetchModelStatus, 15000);
}

function stopPolling(): void {
  if (pollIntervalRef) {
    clearInterval(pollIntervalRef);
    pollIntervalRef = null;
  }
}

export function ModelStatusProvider({ children }: { children: React.ReactNode }) {
  const [, forceUpdate] = React.useState(0);

  // Listen for status updates from the global poller
  useEffect(() => {
    const handleUpdate = () => forceUpdate((n) => n + 1);
    window.addEventListener("model-status-update", handleUpdate);
    return () => window.removeEventListener("model-status-update", handleUpdate);
  }, []);

  // Cleanup on unmount — stop polling only when no models remain registered
  useEffect(() => {
    return () => {
      if (registeredModels.size === 0) {
        stopPolling();
      }
    };
  }, []);

  const getStatus = useCallback((provider: string, model: string): ModelStatus | null => {
    const key = getModelKey(provider, model);
    return modelStatusMap.get(key) || null;
  }, []);

  const registerModel = useCallback((key: string, provider: string, model: string): void => {
    const wasEmpty = registeredModels.size === 0;
    registeredModels.add(key);

    // Start polling when first model registers
    if (wasEmpty) {
      ensurePolling();
    }

    // Immediately fetch if no data yet
    if (!modelStatusMap.has(key)) {
      fetchModelStatus();
    }
  }, []);

  const unregisterModel = useCallback((key: string): void => {
    registeredModels.delete(key);
    modelStatusMap.delete(key);

    // Stop polling when last model unregisters
    if (registeredModels.size === 0) {
      stopPolling();
    }
  }, []);

  const value = useMemo(
    () => ({
      getStatus,
      registerModel,
      unregisterModel,
    }),
    [getStatus, registerModel, unregisterModel]
  );

  return <ModelStatusContext.Provider value={value}>{children}</ModelStatusContext.Provider>;
}

export function useModelStatus(provider: string, model: string): ModelStatus | null {
  const context = useContext(ModelStatusContext);

  if (!context) {
    throw new Error("useModelStatus must be used within a ModelStatusProvider");
  }

  const key = useMemo(() => getModelKey(provider, model), [provider, model]);

  // Register/unregister on mount/unmount
  useEffect(() => {
    context.registerModel(key, provider, model);
    return () => context.unregisterModel(key);
  }, [context, key, provider, model]);

  return context.getStatus(provider, model);
}

export default ModelStatusContext;
