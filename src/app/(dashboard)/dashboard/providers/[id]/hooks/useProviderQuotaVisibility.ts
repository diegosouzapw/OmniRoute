"use client";

import { useCallback, type Dispatch, type SetStateAction } from "react";

import type { ConnectionRowConnection } from "../components/ConnectionRow";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";

interface NotificationStore {
  error: (message: string) => void;
}

export function useProviderQuotaVisibility(
  setConnections: Dispatch<SetStateAction<ConnectionRowConnection[]>>,
  notify: NotificationStore,
  t: ProviderMessageTranslator
) {
  return useCallback(
    async (connectionId: string, visible: boolean) => {
      try {
        const response = await fetch(`/api/providers/${connectionId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quotaVisible: visible }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        setConnections((previous) =>
          previous.map((connection) =>
            connection.id === connectionId ? { ...connection, quotaVisible: visible } : connection
          )
        );
      } catch (error) {
        console.error("Error toggling provider quota visibility:", error);
        notify.error(
          providerText(
            t,
            "quotaVisibilityUpdateFailed",
            "Failed to update Provider Quota visibility"
          )
        );
      }
    },
    [notify, setConnections, t]
  );
}
