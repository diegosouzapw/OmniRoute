"use client";

/**
 * useApiKeySave — Issue #3501 Phase 1s
 *
 * Owns the handleSaveApiKey async function that was previously inline in
 * ProviderDetailPageClient. Extracts it into a custom hook so the client
 * can simply destructure the callback.
 *
 * Cycle-safe: no import from ProviderDetailPageClient.
 */

import { useCallback } from "react";
import type React from "react";
import { providerUsesCuratedModelsOnly } from "@/lib/providers/modelListingCapability";
import type { ProviderMessageTranslator } from "../providerPageHelpers";
import type { ImportProgress } from "./useModelImportHandlers";

type UseApiKeySaveParams = {
  providerId: string;
  fetchConnections: () => Promise<void>;
  fetchProviderModelMeta: () => Promise<void>;
  setImportProgress: React.Dispatch<React.SetStateAction<ImportProgress>>;
  setShowImportModal: (open: boolean) => void;
  setShowAddApiKeyModal: (open: boolean) => void;
  setSiliconFlowInitialBaseUrl: (url: string | undefined) => void;
  notify: { success: (msg: string) => void; error: (msg: string) => void; info?: (msg: string) => void };
  t: ProviderMessageTranslator;
};

export function useApiKeySave({
  providerId,
  fetchConnections,
  fetchProviderModelMeta,
  setImportProgress,
  setShowImportModal,
  setShowAddApiKeyModal,
  setSiliconFlowInitialBaseUrl,
  t,
}: UseApiKeySaveParams) {
  const handleSaveApiKey = useCallback(
    async (formData: Record<string, unknown>) => {
      try {
        const res = await fetch("/api/providers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider: providerId, ...formData }),
        });
        if (res.ok) {
          const connectionData = await res.json();
          const newConnection = connectionData?.connection;
          await fetchConnections();
          setShowAddApiKeyModal(false);
          setSiliconFlowInitialBaseUrl(undefined);

          // Most providers sync their live catalog after connection creation. Curated-only
          // providers intentionally use the registry list and must not show an import flow.
          if (newConnection?.id && !providerUsesCuratedModelsOnly(providerId)) {
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
              const syncRes = await fetch(`/api/providers/${newConnection.id}/sync-models`, {
                method: "POST",
                signal: AbortSignal.timeout(30_000), // 30s timeout — model sync shouldn't hang
              });
              const syncData = await syncRes.json();

              if (!syncRes.ok || syncData.error) {
                setImportProgress((prev) => ({
                  ...prev,
                  phase: "error",
                  status: t("failedFetchModels"),
                  error: syncData.error?.message || syncData.error || t("failedImportModels"),
                }));
                return null;
              }

              if (syncData.freeFilterEmpty) {
                setImportProgress((prev) => ({
                  ...prev,
                  phase: "done",
                  status: t("noFreeModelsFound"),
                  total: 0,
                  current: 0,
                  importedCount: 0,
                  logs: [],
                }));
                await fetchProviderModelMeta();
                return null;
              }

              const syncedCount = syncData.syncedModels || 0;
              const availableCount =
                typeof syncData.availableModelsCount === "number"
                  ? syncData.availableModelsCount
                  : Array.isArray(syncData.models)
                    ? syncData.models.length
                    : syncedCount;
              const syncedModelList: Array<{ id: string; name?: string }> = syncData.models || [];
              const logs: string[] = [];
              if (syncedModelList.length > 0) {
                logs.push(`✓ ${availableCount} models available`);
                logs.push("");
                for (const m of syncedModelList) {
                  logs.push(`  ${m.name || m.id}`);
                }
              }

              setImportProgress((prev) => ({
                ...prev,
                phase: "done",
                status: t("modelsImported", { count: availableCount }),
                total: availableCount,
                current: availableCount,
                importedCount: availableCount,
                logs,
              }));

              await fetchProviderModelMeta();
            } catch (syncError) {
              setImportProgress((prev) => ({
                ...prev,
                phase: "error",
                status: t("failedFetchModels"),
                error: String(syncError),
              }));
            }
          }
          return null;
        }
        const data = await res.json().catch(() => ({}));
        const errorMsg = data.error?.message || data.error || t("failedSaveConnection");
        return errorMsg;
      } catch (error) {
        console.log("Error saving connection:", error);
        return t("failedSaveConnectionRetry");
      }
    },
    [
      providerId,
      fetchConnections,
      fetchProviderModelMeta,
      setImportProgress,
      setShowImportModal,
      setShowAddApiKeyModal,
      setSiliconFlowInitialBaseUrl,
      t,
    ]
  );

  return { handleSaveApiKey };
}
