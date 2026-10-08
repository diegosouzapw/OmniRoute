"use client";

/**
 * useCodexPaidCreditsToggle — extracted from useProviderConnections (file-size
 * ratchet: useProviderConnections.ts is frozen; a new full handler pushed it
 * over the cap) to keep the god-file from growing, mirroring the
 * useReorderByAvailability precedent in this same directory.
 *
 * Owns the single-connection toggle for the opt-in "allow paid Codex
 * credits after subscription quota exhaustion" setting.
 */

import type { ConnectionRowConnection } from "../components/ConnectionRow";
import { providerText, type ProviderMessageTranslator } from "../providerCredentialText";

/** Minimal surface of the notification store this hook needs. */
interface CodexPaidCreditsToggleNotifier {
  success: (message: string) => void;
  error: (message: string) => void;
}

export interface UseCodexPaidCreditsToggleParams {
  connections: ConnectionRowConnection[];
  setConnections: (
    updater:
      ConnectionRowConnection[] | ((prev: ConnectionRowConnection[]) => ConnectionRowConnection[])
  ) => void;
  notify: CodexPaidCreditsToggleNotifier;
  t: ProviderMessageTranslator;
}

export interface UseCodexPaidCreditsToggleReturn {
  handleToggleCodexPaidCredits: (connectionId: string, enabled: boolean) => Promise<void>;
}

export function useCodexPaidCreditsToggle({
  connections,
  setConnections,
  notify,
  t,
}: UseCodexPaidCreditsToggleParams): UseCodexPaidCreditsToggleReturn {
  const handleToggleCodexPaidCredits = async (connectionId: string, enabled: boolean) => {
    try {
      const target = connections.find((connection) => connection.id === connectionId);
      if (!target) return;

      const providerSpecificData =
        target.providerSpecificData && typeof target.providerSpecificData === "object"
          ? target.providerSpecificData
          : {};

      const res = await fetch(`/api/providers/${connectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerSpecificData: { ...providerSpecificData, allowPaidCredits: enabled },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        notify.error(
          data.error ||
            providerText(
              t,
              "failedUpdateCodexPaidCredits",
              "Failed to update Codex paid-credit policy"
            )
        );
        return;
      }

      setConnections((prev) =>
        prev.map((connection) =>
          connection.id === connectionId
            ? {
                ...connection,
                providerSpecificData: {
                  ...(connection.providerSpecificData || {}),
                  allowPaidCredits: enabled,
                },
              }
            : connection
        )
      );
      notify.success(
        enabled
          ? providerText(
              t,
              "codexPaidCreditsEnabled",
              "Codex paid credits enabled (additional charges may apply)"
            )
          : providerText(t, "codexPaidCreditsDisabled", "Codex paid credits disabled")
      );
    } catch (error) {
      console.error("Error toggling Codex paid-credit policy:", error);
      notify.error(
        providerText(t, "failedUpdateCodexPaidCredits", "Failed to update Codex paid-credit policy")
      );
    }
  };

  return { handleToggleCodexPaidCredits };
}
