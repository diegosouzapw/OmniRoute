"use client";

import { useCallback, type Dispatch, type SetStateAction } from "react";

import type { ConnectionRowConnection } from "../components/ConnectionRow";
import type { ProviderMessageTranslator } from "../providerPageHelpers";

interface NotificationStore {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

export function useConnectionAutoSync(
  connections: ConnectionRowConnection[],
  setConnections: Dispatch<SetStateAction<ConnectionRowConnection[]>>,
  notify: NotificationStore,
  t: ProviderMessageTranslator
) {
  return useCallback(
    async (connectionId: string, enabled: boolean) => {
      try {
        const existingPsd = connections.find((c) => c.id === connectionId)?.providerSpecificData;
        const response = await fetch(`/api/providers/${connectionId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            providerSpecificData: { ...(existingPsd || {}), autoSync: enabled },
          }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        setConnections((previous) =>
          previous.map((connection) =>
            connection.id === connectionId
              ? {
                  ...connection,
                  providerSpecificData: {
                    ...(connection.providerSpecificData || {}),
                    autoSync: enabled,
                  },
                }
              : connection
          )
        );
        notify[enabled ? "success" : "info"](
          enabled ? t("autoSyncEnabled") : t("autoSyncDisabled")
        );
      } catch (error) {
        console.error("Error toggling connection auto-sync:", error);
        notify.error(t("autoSyncToggleFailed"));
      }
    },
    [notify, setConnections, t, connections]
  );
}
