"use client";

import { useState } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { groupVisibilityPatches } from "./catalogVisibility";
import type { CatalogModelRow } from "./modelCatalogUtils";

/**
 * Hide/show catalog rows through the provider-models visibility store (the same one the
 * provider pages write and `/v1/models` filters on): one PATCH per provider + modality,
 * then `onChanged` reloads the catalog so the rows reflect what was persisted.
 */
export function useCatalogVisibility(onChanged: () => unknown, failureMessage: string) {
  const notify = useNotificationStore();
  const [visibilityBusy, setVisibilityBusy] = useState(false);

  const applyVisibility = async (rows: CatalogModelRow[], hidden: boolean) => {
    const patches = groupVisibilityPatches(rows, hidden);
    if (patches.length === 0 || visibilityBusy) return;
    setVisibilityBusy(true);
    try {
      for (const patch of patches) {
        const response = await fetch(
          `/api/provider-models?provider=${encodeURIComponent(patch.provider)}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              isHidden: hidden,
              modelIds: patch.modelIds,
              modality: patch.modality,
            }),
          }
        );
        if (!response.ok) throw new Error("visibility update failed");
      }
    } catch {
      notify.error(failureMessage);
    } finally {
      setVisibilityBusy(false);
      await onChanged();
    }
  };

  return { visibilityBusy, applyVisibility };
}
