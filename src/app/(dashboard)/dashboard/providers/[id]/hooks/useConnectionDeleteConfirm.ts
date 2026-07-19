"use client";

/**
 * useConnectionDeleteConfirm — Issue #7361.
 *
 * Gates single-connection delete behind a confirmation step, mirroring the
 * existing batch-delete confirm pattern already wired in
 * useProviderConnections.ts (handleBatchDeleteOpenModal / handleBatchDeleteConfirm).
 * Extracted into its own module so the frozen useProviderConnections.ts file-size
 * ratchet does not have to absorb the extra state + handlers.
 */

import { useCallback, useState } from "react";

export interface ConnectionDeleteConfirmTarget {
  id: string;
  name: string;
}

export interface ConnectionDeleteConfirmState {
  connection: ConnectionDeleteConfirmTarget | null;
  deleting: boolean;
  request: (connectionId: string, name: string) => void;
  confirm: () => Promise<void>;
  cancel: () => void;
}

interface NotifyLike {
  success: (message: string) => void;
  error: (message: string) => void;
}

export function useConnectionDeleteConfirm(
  fetchConnections: () => Promise<void>,
  notify: NotifyLike
): ConnectionDeleteConfirmState {
  const [connection, setConnection] = useState<ConnectionDeleteConfirmTarget | null>(null);
  const [deleting, setDeleting] = useState(false);

  const request = useCallback((connectionId: string, name: string) => {
    if (!connectionId) return;
    setConnection({ id: connectionId, name });
  }, []);

  const cancel = useCallback(() => {
    setConnection(null);
  }, []);

  const confirm = useCallback(async () => {
    const connectionId = connection?.id;
    if (!connectionId) {
      setConnection(null);
      return;
    }
    setDeleting(true);
    try {
      const res = await fetch(`/api/providers/${connectionId}`, { method: "DELETE" });
      if (res.ok) {
        notify.success("Connection deleted");
        await fetchConnections();
      } else {
        const data = await res.json().catch(() => ({}));
        const message =
          (typeof data?.error === "string" && data.error) ||
          data?.error?.message ||
          "Failed to delete connection";
        notify.error(message);
      }
    } catch (error) {
      console.error("Error deleting connection:", error);
      notify.error("Failed to delete connection");
    } finally {
      setDeleting(false);
      setConnection(null);
    }
  }, [connection, fetchConnections, notify]);

  return { connection, deleting, request, confirm, cancel };
}
