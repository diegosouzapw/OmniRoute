"use client";

/**
 * useReorderByAvailability — extracted from useProviderConnections (file-size
 * ratchet: useProviderConnections.ts is frozen at 954 lines; this feature
 * pushed it to 974) to keep the god-file from growing.
 *
 * Owns the "Reorder by availability" toolbar action: sorts a provider's
 * connections so available ones float to the top and unavailable ones sink
 * to the bottom (stable sort — see `sortConnectionsByAvailability`), then
 * persists the new order via the same per-connection priority PUT endpoint
 * `handleSwapPriority` already uses in useProviderConnections.
 *
 * Cycle-safe: imports only from leaf modules. No import from
 * ProviderDetailPageClient or useProviderConnections.
 */

import { useState } from "react";
import { sortConnectionsByAvailability } from "../components/connectionRowHelpers";
import type { ConnectionRowConnection } from "../components/ConnectionRow";

/** Minimal surface of the notification store this hook needs. */
interface ReorderNotifier {
  error: (message: string) => void;
}

export interface UseReorderByAvailabilityParams {
  connections: ConnectionRowConnection[];
  setConnections: (
    updater:
      | ConnectionRowConnection[]
      | ((prev: ConnectionRowConnection[]) => ConnectionRowConnection[])
  ) => void;
  fetchConnections: () => Promise<void>;
  notify: ReorderNotifier;
  t: (key: string, params?: Record<string, unknown>) => string;
}

export interface UseReorderByAvailabilityReturn {
  reorderingByAvailability: boolean;
  handleReorderByAvailability: () => Promise<void>;
}

export function useReorderByAvailability({
  connections,
  setConnections,
  fetchConnections,
  notify,
  t,
}: UseReorderByAvailabilityParams): UseReorderByAvailabilityReturn {
  const [reorderingByAvailability, setReorderingByAvailability] = useState(false);

  /**
   * Reorder every connection for this provider by availability: connections
   * whose effective status is active/success move to the top, the rest move
   * to the bottom, each group keeping its existing relative order (stable
   * sort — see `sortConnectionsByAvailability`). Persists the new order as
   * sequential `priority` values via the same PUT endpoint `handleSwapPriority`
   * already uses, then re-fetches from the server so the UI never runs ahead
   * of persisted state on a partial failure (#2558 upstream: fzrilsh).
   */
  const handleReorderByAvailability = async () => {
    if (reorderingByAvailability || (connections as any[]).length < 2) return;
    setReorderingByAvailability(true);
    const sorted = sortConnectionsByAvailability(connections as any[]);
    setConnections(sorted as ConnectionRowConnection[]);
    try {
      await Promise.all(
        sorted.map((conn: any, idx: number) =>
          fetch(`/api/providers/${conn.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ priority: idx }),
          })
        )
      );
      await fetchConnections();
    } catch (error) {
      console.log("Error reordering connections by availability:", error);
      notify.error(t("reorderByAvailabilityError"));
      await fetchConnections();
    } finally {
      setReorderingByAvailability(false);
    }
  };

  return { reorderingByAvailability, handleReorderByAvailability };
}
