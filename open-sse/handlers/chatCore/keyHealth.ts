/**
 * chatCore per-request API-key health updater (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Byte-identical extraction of the `recordKeyHealthStatus` closure that lived at the top of
 * handleChatCore. Translates an upstream HTTP status into the in-memory key-health state
 * (apiKeyRotator) for the connection's currently-selected key, and persists the change to the
 * provider connection so it survives process restarts:
 *   - genuine 401/403 credential rejection → record a failure (warning, then invalid at the
 *     threshold), always persisted.
 *   - 402 → terminal (insufficient balance) on single-credential providers; mark the
 *           current key invalid immediately (#5239), persisted on the active→invalid
 *           transition. openai-compatible / per-model-quota gateways keep the key —
 *           a 402 there is a per-model billing signal, not a dead credential.
 *   - 2xx → record a success, persisted only when recovering from a warning/invalid state.
 * Model availability failures remain model/routing telemetry even when an upstream reports them
 * with 401/403. Any other status only refreshes the tracked extra-key set.
 */

import {
  recordKeyFailure,
  recordKeySuccess,
  recordKeyTerminal,
  trackConnectionExtraKeys,
  type KeyHealth,
} from "../../services/apiKeyRotator.ts";
import { isModelUnavailableError } from "../../services/modelFamilyFallback.ts";
import { hasPerModelQuota } from "../../services/accountFallback.ts";
import { updateProviderConnection } from "@/lib/db/providers";

type KeyHealthLog = {
  warn?: (tag: string, message: string) => void;
  error?: (tag: string, message: string) => void;
} | null;

const CREDENTIAL_FAILURE_PATTERNS = [
  /\b(?:invalid|incorrect|expired|missing|revoked)\s+api[\s_-]?key\b/i,
  /\bapi[\s_-]?key\s+(?:is\s+)?(?:invalid|incorrect|expired|missing|revoked|not\s+valid)\b/i,
  /\bauthentication[\s_-]+(?:failed|error|required)\b/i,
  /\b(?:invalid|expired|missing|revoked)\s+(?:token|credentials?|bearer)\b/i,
  /\bunauthorized\b/i,
  /\bnot\s+authenticated\b/i,
  /\bforbidden\b/i,
  /\baccess\s+denied\b/i,
];

function isModelCapabilityFailure(status: number, failureDetail: string): boolean {
  if (!failureDetail) return false;
  const normalizedDetail = failureDetail.replace(/[_-]+/g, " ");
  // Model-family fallback already owns these phrases. Use a model-capable status for
  // classification because some aggregators misreport the same model rejection as 401.
  return isModelUnavailableError(status === 401 ? 403 : status, normalizedDetail);
}

function isCredentialFailure(status: number, failureDetail: string): boolean {
  if (status !== 401 && status !== 403) return false;
  if (isModelCapabilityFailure(status, failureDetail)) return false;
  if (status === 401) return true;
  return CREDENTIAL_FAILURE_PATTERNS.some((pattern) => pattern.test(failureDetail));
}

export function recordKeyHealthStatus(
  status: number,
  creds: Record<string, unknown> | null | undefined,
  log?: KeyHealthLog,
  transport?: string,
  failureDetail = ""
): void {
  // CLIProxyAPI owns a shared external credential pool. Its auth failures cannot be
  // attributed to the native OmniRoute connection selected before proxy dispatch.
  if (transport === "cliproxyapi") return;

  const connId = creds?.connectionId as string | undefined;
  if (!connId) return;

  // #9827: a keyless (noauth) connection has no key to fail. Upstream 401s on
  // the anonymous path (e.g. Pollinations premium models that require a key)
  // must not poison the connection's key-health state — doing so flips the whole
  // anonymous pool to "all accounts unavailable". Mirrors the cliproxyapi guard
  // above: there is nothing to record when no key material exists.
  if (!creds?.apiKey && !creds?.accessToken) return;

  const psd = creds.providerSpecificData as Record<string, unknown> | undefined;
  const extraKeys = (psd?.extraApiKeys as string[] | undefined) ?? [];
  const health = psd?.apiKeyHealth as Record<string, KeyHealth> | undefined;
  const currentKeyId = (psd?.selectedKeyId as string | undefined) ?? "primary";

  trackConnectionExtraKeys(connId, extraKeys);

  if (isCredentialFailure(status, failureDetail)) {
    const updatedHealth = recordKeyFailure(connId, currentKeyId);
    log?.warn?.(
      "AUTH",
      `${status} on connection ${connId.slice(0, 8)} - key marked as failed (failure #${updatedHealth.failures})`
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
  } else if (status === 402) {
    // 402 "Insufficient account balance" is terminal for this key on
    // single-credential providers — the balance won't recover mid-session
    // (#5239). openai-compatible / per-model-quota gateways multiplex many
    // upstreams behind one key: a 402 is a per-model billing signal and must
    // not invalidate the credential used by sibling models.
    const provider =
      typeof creds.provider === "string"
        ? creds.provider
        : typeof connId === "string"
          ? connId
          : null;
    if (hasPerModelQuota(provider)) {
      return;
    }
    const updatedHealth = recordKeyTerminal(connId, currentKeyId);
    log?.error?.(
      "AUTH",
      `402 on connection ${connId.slice(0, 8)} - key ${currentKeyId} marked invalid (insufficient balance)`
    );

    const prevStatus = health?.[currentKeyId]?.status;
    if (updatedHealth.status !== prevStatus) {
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
