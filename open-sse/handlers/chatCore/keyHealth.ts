/**
 * chatCore per-request API-key health updater (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Byte-identical extraction of the `recordKeyHealthStatus` closure that lived at the top of
 * handleChatCore. Translates an upstream HTTP status into the in-memory key-health state
 * (apiKeyRotator) for the connection's currently-selected key, and persists the change to the
 * provider connection so it survives process restarts:
 *   - 401 → record a failure (warning, then invalid at the threshold), always persisted.
 *   - 2xx → record a success, persisted only when recovering from a warning/invalid state.
 * Any other status only refreshes the tracked extra-key set. The handler binds its `log` once and
 * delegates here, keeping the existing call sites unchanged.
 */

import {
  recordKeyFailure,
  recordKeySuccess,
  trackConnectionExtraKeys,
  type KeyHealth,
} from "../../services/apiKeyRotator.ts";
import { updateProviderConnection } from "@/lib/db/providers";

type KeyHealthLog = {
  warn?: (tag: string, message: string) => void;
  error?: (tag: string, message: string) => void;
} | null;

export function recordKeyHealthStatus(
  status: number,
  creds: Record<string, unknown> | null | undefined,
  log?: KeyHealthLog
): void {
  const connId = creds?.connectionId as string | undefined;
  if (!connId) return;

  const psd = creds.providerSpecificData as Record<string, unknown> | undefined;
  const extraKeys = (psd?.extraApiKeys as string[] | undefined) ?? [];
  const health = psd?.apiKeyHealth as Record<string, KeyHealth> | undefined;
  const currentKeyId = (psd?.selectedKeyId as string | undefined) ?? "primary";

  trackConnectionExtraKeys(connId, extraKeys);

  if (status === 401) {
    const updatedHealth = recordKeyFailure(connId, currentKeyId);
    log?.warn?.(
      "AUTH",
      `401 on connection ${connId.slice(0, 8)} - key marked as failed (failure #${updatedHealth.failures})`
    );

    // Persist health status to DB on every failure (not just invalid transitions)
    // This ensures in-memory state survives process restarts
    const prevStatus = health?.[currentKeyId]?.status;
    const prevFailures = health?.[currentKeyId]?.failures ?? 0;
    if (updatedHealth.status !== prevStatus || updatedHealth.failures !== prevFailures) {
      updateProviderConnection(connId, {
        providerSpecificData: {
          ...psd,
          apiKeyHealth: { ...health, [currentKeyId]: updatedHealth },
        },
      }).catch((err: unknown) => {
        log?.error?.(
          "DB",
          `Failed to persist apiKeyHealth: ${err instanceof Error ? err.message : String(err)}`
        );
      });
    }
  } else if (status >= 200 && status < 300) {
    const updatedHealth = recordKeySuccess(connId, currentKeyId);
    const prevStatus = health?.[currentKeyId]?.status;
    if (prevStatus === "warning" || prevStatus === "invalid") {
      updateProviderConnection(connId, {
        providerSpecificData: {
          ...psd,
          apiKeyHealth: { ...health, [currentKeyId]: updatedHealth },
        },
      }).catch((err: unknown) => {
        log?.error?.(
          "DB",
          `Failed to persist apiKeyHealth: ${err instanceof Error ? err.message : String(err)}`
        );
      });
    }
  }
}
