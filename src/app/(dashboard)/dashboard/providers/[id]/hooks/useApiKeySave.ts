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
  notify: {
    success: (msg: string) => void;
    error: (msg: string) => void;
    info?: (msg: string) => void;
  };
  t: ProviderMessageTranslator;
};

// Issue #10096: the unified Kimi Code dashboard card shares one page/providerId
// ("kimi-coding") between OAuth and API-key auth. "kimi-coding" is an
// OAuth-primary managed id and is NOT an admitted API-key/dual-auth connection
// id (see isManagedProviderConnectionId in src/lib/providers/catalog.ts), so
// posting it here 400s with "Invalid provider". The dedicated managed
// API-key id "kimi-coding-apikey" IS admitted — remap only the POST payload
// so the saved connection lands under the correct managed id. The OAuth flow
// (handleOAuthSuccess in ProviderDetailPageClient.tsx) does not go through
// this hook, so it keeps posting "kimi-coding" unchanged.
export function resolveApiKeySaveProviderId(providerId: string): string {
  return providerId === "kimi-coding" ? "kimi-coding-apikey" : providerId;
}

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
      // Issue #11324: callers that only want to add one manual model (rather than
      // importing an upstream provider's entire catalog) can pass `skipModelSync: true`
      // to opt out of the automatic post-save full /sync-models call. This flag is a
      // client-side intent signal only — keep it out of the persisted connection
      // payload and relay it only through the non-persisted request header below.
      const { skipModelSync, ...connectionFormData } = formData;
      const autoFetchModels =
        (
          connectionFormData.providerSpecificData as
            | Record<string, unknown>
            | null
            | undefined
        )?.autoFetchModels === true;
      try {
        const res = await fetch("/api/providers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(autoFetchModels || skipModelSync ? { "X-Skip-Model-Sync": "true" } : {}),
          },
          body: JSON.stringify({
            provider: resolveApiKeySaveProviderId(providerId),
            ...connectionFormData,
          }),
        });
        if (res.ok) {
          const connectionData = await res.json();
          const newConnection = connectionData?.connection;
          await fetchConnections();
          setShowAddApiKeyModal(false);
          setSiliconFlowInitialBaseUrl(undefined);

          // Most providers sync their live catalog after connection creation. Curated-only
          // providers intentionally use the registry list and must not show an import flow.
          // Issue #11324: callers may also opt out explicitly via `skipModelSync`.
          if (
            newConnection?.id &&
            !providerUsesCuratedModelsOnly(providerId) &&
            autoFetchModels &&
            !skipModelSync
          ) {
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
        // Even if the server returned an error, the connection may have been
        // persisted (e.g. post-commit housekeeping failed after the DB write).
        // Refresh the list so the UI picks it up on next render.
        void fetchConnections();
        const data = await res.json().catch(() => ({}));
        const errorMsg = data.error?.message || data.error || t("failedSaveConnection");
        return errorMsg;
      } catch (error) {
        console.log("Error saving connection:", error);
        // The connection may still have been persisted despite the network error.
        void fetchConnections();
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
