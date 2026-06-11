"use client";

/**
 * useProviderModels — Phase 1f extraction for Issue #3501.
 *
 * Owns model-metadata state and handlers that were previously inline in
 * ProviderDetailPageClient:
 *  - modelMeta (customModels + modelCompatOverrides)
 *  - syncedAvailableModels
 *  - modelAliases
 *  - fetchProviderModelMeta, fetchAliases, handleSetAlias, handleDeleteAlias
 *
 * Cycle-safe: imports only from leaf modules.
 */

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";
import type { CompatModelRow } from "../providerPageHelpers";

// ──── types ─────────────────────────────────────────────────────────────────

export interface ModelMeta {
  customModels: CompatModelRow[];
  modelCompatOverrides: Array<CompatModelRow & { id: string }>;
}

export interface UseProviderModelsReturn {
  modelMeta: ModelMeta;
  syncedAvailableModels: any[];
  modelAliases: Record<string, string>;
  fetchProviderModelMeta: () => Promise<void>;
  fetchAliases: () => Promise<void>;
  handleSetAlias: (modelId: string, alias: string, providerAlias?: string) => Promise<void>;
  handleDeleteAlias: (alias: string) => Promise<void>;
}

export function useProviderModels(
  providerId: string,
  isSearchProvider: boolean
): UseProviderModelsReturn {
  const t = useTranslations("providers");
  const notify = useNotificationStore();

  const [modelMeta, setModelMeta] = useState<ModelMeta>({
    customModels: [],
    modelCompatOverrides: [],
  });
  const [syncedAvailableModels, setSyncedAvailableModels] = useState<any[]>([]);
  const [modelAliases, setModelAliases] = useState<Record<string, string>>({});

  const fetchAliases = useCallback(async () => {
    try {
      const res = await fetch("/api/models/alias");
      const data = await res.json();
      if (res.ok) {
        setModelAliases(data.aliases || {});
      }
    } catch (error) {
      console.log("Error fetching aliases:", error);
    }
  }, []);

  const handleSetAlias = useCallback(
    async (modelId: string, alias: string, providerAlias?: string) => {
      const qualifiedModel = providerAlias
        ? modelId.includes("/")
          ? `${providerAlias}/${modelId.split("/").slice(1).join("/")}`
          : `${providerAlias}/${modelId}`
        : modelId;
      try {
        const res = await fetch("/api/models/alias", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: qualifiedModel, alias }),
        });
        if (res.ok) {
          await fetchAliases();
          notify.success(t("setAliasSuccess", { alias }));
        } else {
          const data = await res.json().catch(() => ({}));
          notify.error(data?.error?.message || "Failed to set alias");
        }
      } catch (error) {
        console.log("Error setting alias:", error);
        notify.error("Network error setting alias");
      }
    },
    [fetchAliases, t, notify]
  );

  const handleDeleteAlias = useCallback(
    async (alias: string) => {
      try {
        const res = await fetch(`/api/models/alias?alias=${encodeURIComponent(alias)}`, {
          method: "DELETE",
        });
        if (res.ok) {
          await fetchAliases();
          notify.success(t("deleteAliasSuccess", { alias }));
        } else {
          const data = await res.json().catch(() => ({}));
          notify.error(data?.error?.message || "Failed to delete alias");
        }
      } catch (error) {
        console.log("Error deleting alias:", error);
        notify.error("Network error deleting alias");
      }
    },
    [fetchAliases, t, notify]
  );

  const fetchProviderModelMeta = useCallback(async () => {
    if (isSearchProvider) return;
    try {
      const res = await fetch(
        `/api/provider-models?provider=${encodeURIComponent(providerId)}`,
        { cache: "no-store" }
      );
      if (!res.ok) return;
      const data = await res.json();
      setModelMeta({
        customModels: data.models || [],
        modelCompatOverrides: data.modelCompatOverrides || [],
      });
      try {
        const syncRes = await fetch(
          `/api/synced-available-models?provider=${encodeURIComponent(providerId)}`,
          { cache: "no-store" }
        );
        if (syncRes.ok) {
          const syncData = await syncRes.json();
          setSyncedAvailableModels(syncData.models || []);
        } else {
          setSyncedAvailableModels([]);
        }
      } catch {
        setSyncedAvailableModels([]);
      }
    } catch (e) {
      console.error("fetchProviderModelMeta", e);
    }
  }, [providerId, isSearchProvider]);

  return {
    modelMeta,
    syncedAvailableModels,
    modelAliases,
    fetchProviderModelMeta,
    fetchAliases,
    handleSetAlias,
    handleDeleteAlias,
  };
}
