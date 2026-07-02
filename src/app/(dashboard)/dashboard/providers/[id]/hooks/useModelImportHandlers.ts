"use client";

/**
 * useModelImportHandlers — Issue #3501 Phase 1k
 *
 * Owns import-progress state and handlers that were previously inline in
 * ProviderDetailPageClient:
 *  - importingModels, showImportModal, importProgress, togglingAutoSync
 *  - handleImportModels, handleCompatibleImportWithProgress, handleToggleAutoSync
 *  - canImportModels (derived), isAutoSyncEnabled (derived), autoSyncConnection (derived)
 *
 * Cycle-safe: imports only from leaf modules and React.
 * No import from ProviderDetailPageClient.
 */

import React, { useState } from "react";
import type { ProviderMessageTranslator } from "../providerPageHelpers";
import { useNotificationStore } from "@/store/notificationStore";
import { extractImportWarning } from "./modelImportWarning";

type NotifyStore = ReturnType<typeof useNotificationStore>;

// ──── types ──────────────────────────────────────────────────────────────────

export interface ImportProgress {
  current: number;
  total: number;
  phase: "idle" | "fetching" | "importing" | "done" | "error";
  status: string;
  logs: string[];
  error: string;
  importedCount: number;
}

export interface UseModelImportHandlersParams {
  providerId: string;
  models: Array<{ id: string; name?: string }>;
  modelMeta: { customModels: Array<{ id: string }>; modelCompatOverrides?: unknown[] };
  modelAliases: Record<string, string>;
  connections: Array<{
    id?: string;
    isActive?: boolean;
    providerSpecificData?: Record<string, unknown>;
  }>;
  isFreeNoAuth: boolean;
  handleSetAlias: (modelId: string, alias: string, providerAlias: string) => Promise<void>;
  fetchAliases: () => Promise<void>;
  fetchProviderModelMeta: () => Promise<void>;
  fetchConnections: () => Promise<void>;
  notify: NotifyStore;
  t: ProviderMessageTranslator;
  providerStorageAlias: string;
}

export interface UseModelImportHandlersReturn {
  importingModels: boolean;
  showImportModal: boolean;
  importProgress: ImportProgress;
  togglingAutoSync: boolean;
  canImportModels: boolean;
  isAutoSyncEnabled: boolean;
  autoSyncConnection: UseModelImportHandlersParams["connections"][number] | undefined;
  setShowImportModal: (v: boolean) => void;
  setImportProgress: React.Dispatch<React.SetStateAction<ImportProgress>>;
  handleImportModels: () => Promise<void>;
  handleCompatibleImportWithProgress: (connectionId: string) => Promise<void>;
  handleToggleAutoSync: () => Promise<void>;
}

// ──── hook ───────────────────────────────────────────────────────────────────

export function useModelImportHandlers({
  providerId,
  models,
  modelMeta,
  modelAliases,
  connections,
  isFreeNoAuth,
  handleSetAlias,
  fetchAliases,
  fetchProviderModelMeta,
  fetchConnections,
  notify,
  t,
  providerStorageAlias,
}: UseModelImportHandlersParams): UseModelImportHandlersReturn {
  const [importingModels, setImportingModels] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importProgress, setImportProgress] = useState<ImportProgress>({
    current: 0,
    total: 0,
    phase: "idle",
    status: "",
    logs: [],
    error: "",
    importedCount: 0,
  });
  const [togglingAutoSync, setTogglingAutoSync] = useState(false);

  // Derived
  const canImportModels = isFreeNoAuth || connections.some((conn) => conn.isActive !== false);
  const autoSyncConnection = connections.find((conn) => conn.isActive !== false);
  const isAutoSyncEnabled = !!(autoSyncConnection as any)?.providerSpecificData?.autoSync;

  const handleImportModels = async () => {
    if (importingModels) return;
    const activeConnection = connections.find((conn) => conn.isActive !== false);
    if (!activeConnection && !isFreeNoAuth) return;
    const importTargetId = activeConnection?.id ?? providerId;

    setImportingModels(true);
    setShowImportModal(true);
    setImportProgress({
      current: 0,
      total: 0,
      phase: "fetching",
      status: t("fetchingModels"),
      logs: [],
      error: "",
      importedCount: 0,
    });

    try {
      const res = await fetch(`/api/providers/${importTargetId}/models?refresh=true`);
      const data = await res.json();
      if (!res.ok) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "error",
          status: t("failedFetchModels"),
          error: data.error || t("failedImportModels"),
        }));
        return;
      }
      const fetchedModels = data.models || [];
      const importWarning = extractImportWarning(data);
      if (fetchedModels.length === 0) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "done",
          status: t("noModelsFound"),
          logs: [t("noModelsReturnedFromEndpoint")],
        }));
        return;
      }

      const existingIds = new Set([
        ...(modelMeta.customModels || []).map((m: any) => m.id),
        ...models.map((m: any) => m.id),
      ]);
      const newModels = fetchedModels.filter(
        (model: any) => !existingIds.has(model.id || model.name || model.model)
      );

      if (newModels.length === 0) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "done",
          status: t("allModelsAlreadyImported") || "All models already imported",
          logs: [
            ...(importWarning ? [importWarning] : []),
            t("noNewModelsToImport") || "No new models to import",
          ],
          importedCount: 0,
          total: 0,
          current: 0,
        }));
        return;
      }

      setImportProgress((prev) => ({
        ...prev,
        phase: "importing",
        total: newModels.length,
        current: 0,
        status: t("importingModelsProgress", { current: 0, total: newModels.length }),
        logs: [
          ...(importWarning ? [importWarning] : []),
          t("foundModelsStartingImport", { count: newModels.length }),
          ...(newModels.length < fetchedModels.length
            ? [
                t("skippingExistingModels", { count: fetchedModels.length - newModels.length }) ||
                  `Skipping ${fetchedModels.length - newModels.length} existing models`,
              ]
            : []),
        ],
      }));

      let importedCount = 0;
      for (let i = 0; i < newModels.length; i++) {
        const model = newModels[i];
        const modelId = model.id || model.name || model.model;
        if (!modelId) continue;
        const parts = modelId.split("/");
        const baseAlias = parts[parts.length - 1];

        setImportProgress((prev) => ({
          ...prev,
          current: i + 1,
          status: t("importingModelsProgress", { current: i + 1, total: newModels.length }),
          logs: [...prev.logs, t("importingModelById", { modelId })],
        }));

        await fetch("/api/provider-models", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: providerId,
            modelId,
            modelName: model.name || modelId,
            source: "imported",
            ...(typeof model.apiFormat === "string" ? { apiFormat: model.apiFormat } : {}),
            ...(Array.isArray(model.supportedEndpoints)
              ? { supportedEndpoints: model.supportedEndpoints }
              : {}),
          }),
        });
        if (!modelAliases[baseAlias]) {
          await handleSetAlias(modelId, baseAlias, providerStorageAlias);
        }
        importedCount += 1;
      }

      await fetchAliases();

      setImportProgress((prev) => ({
        ...prev,
        phase: "done",
        current: newModels.length,
        status:
          importedCount > 0
            ? t("importSuccessCount", { count: importedCount })
            : t("noNewModelsAddedExisting"),
        logs: [
          ...prev.logs,
          importedCount > 0
            ? t("importDoneCount", { count: importedCount })
            : t("noNewModelsAdded"),
        ],
        importedCount,
      }));

      if (importedCount > 0) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("Error importing models:", error);
      setImportProgress((prev) => ({
        ...prev,
        phase: "error",
        status: t("importFailed"),
        error: error instanceof Error ? error.message : t("unexpectedErrorOccurred"),
      }));
    } finally {
      setImportingModels(false);
    }
  };

  const handleCompatibleImportWithProgress = async (
    connectionId: string,
    mode: "import" | "sync" = "import"
  ) => {
    setShowImportModal(true);
    setImportProgress({
      current: 0,
      total: 0,
      phase: "fetching",
      status: t("fetchingModels"),
      logs: [],
      error: "",
      importedCount: 0,
    });

    try {
      // mode "import" merges/appends; "sync" replaces the available list (used when
      // re-syncing after toggling "import only free models").
      const syncUrl =
        mode === "sync"
          ? `/api/providers/${connectionId}/sync-models`
          : `/api/providers/${connectionId}/sync-models?mode=import`;
      const response = await fetch(syncUrl, {
        method: "POST",
        signal: AbortSignal.timeout(60_000),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || t("failedImportModels"));
      }

      if (data.freeFilterEmpty) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "done",
          status: t("noFreeModelsFound"),
          logs: [t("noFreeModelsFound")],
          total: 0,
          current: 0,
          importedCount: 0,
        }));
        return;
      }

      const importedModels = Array.isArray(data.importedModels) ? data.importedModels : [];
      const importedCount =
        typeof data.importedCount === "number" ? data.importedCount : importedModels.length;
      const changedCount =
        typeof data.importedChanges?.total === "number"
          ? data.importedChanges.total
          : importedCount;
      const totalChangedCount =
        changedCount +
        (typeof data.customModelChanges?.total === "number" ? data.customModelChanges.total : 0);

      if (importedModels.length === 0) {
        setImportProgress((prev) => ({
          ...prev,
          phase: "done",
          status:
            importedCount > 0
              ? t("importSuccessCount", { count: importedCount })
              : t("noNewModelsAdded"),
          logs: [
            importedCount > 0
              ? t("importDoneCount", { count: importedCount })
              : t("noNewModelsAdded"),
          ],
          importedCount,
        }));
        if (totalChangedCount > 0) {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        return;
      }

      setImportProgress((prev) => ({
        ...prev,
        phase: "done",
        total: importedModels.length,
        current: importedModels.length,
        status:
          importedCount > 0
            ? t("importSuccessCount", { count: importedCount })
            : t("noNewModelsAdded"),
        logs: [
          t("foundModelsStartingImport", { count: importedModels.length }),
          ...importedModels.map((model: any) =>
            t("importingModelById", { modelId: model.id || model.name || model.model })
          ),
          importedCount > 0
            ? t("importDoneCount", { count: importedCount })
            : t("noNewModelsAdded"),
        ],
        importedCount,
      }));

      if (totalChangedCount > 0) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("Error importing models:", error);
      setImportProgress((prev) => ({
        ...prev,
        phase: "error",
        status: t("importFailed"),
        error: error instanceof Error ? error.message : t("unexpectedErrorOccurred"),
      }));
    }
  };

  const handleToggleAutoSync = async () => {
    if (!autoSyncConnection || togglingAutoSync) return;
    setTogglingAutoSync(true);
    try {
      const newValue = !isAutoSyncEnabled;
      await fetch(`/api/providers/${(autoSyncConnection as any).id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerSpecificData: { autoSync: newValue },
        }),
      });
      await fetchConnections();
      notify[newValue ? "success" : "info"](
        newValue ? t("autoSyncEnabled") : t("autoSyncDisabled")
      );
    } catch (error) {
      console.log("Error toggling auto-sync:", error);
      notify.error(t("autoSyncToggleFailed"));
    } finally {
      setTogglingAutoSync(false);
    }
  };

  return {
    importingModels,
    showImportModal,
    importProgress,
    togglingAutoSync,
    canImportModels,
    isAutoSyncEnabled,
    autoSyncConnection,
    setShowImportModal,
    setImportProgress,
    handleImportModels,
    handleCompatibleImportWithProgress,
    handleToggleAutoSync,
  };
}
