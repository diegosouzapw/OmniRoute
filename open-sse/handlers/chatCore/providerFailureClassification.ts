import { classifyProviderError, PROVIDER_ERROR_TYPES } from "../../services/errorClassifier.ts";
import { classifyModelScope429 } from "../../services/modelscopePolicy.ts";
import { normalizeHeaders } from "../../utils/headers.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";
import { writeTerminalStatus } from "@/shared/utils/terminalStatus";
import { connectionHasExtraKeys } from "../../services/apiKeyRotator.ts";
import { updateProviderConnection } from "@/lib/db/providers";
import { getKimiTemporaryRateLimitResetAt } from "./kimiQuotaRecovery.ts";
import { COOLDOWN_MS } from "../../config/constants.ts";
import {
  lockModel,
  lockModelIfPerModelQuota,
  recordCoreOwnedAntigravityQuotaState,
  shouldDeferAntigravityQuotaStateToCaller,
} from "../../services/accountFallback.ts";
import { resolveAccountSemaphoreKey } from "./executorHelpers.ts";
import { markBlocked as markAccountSemaphoreBlocked } from "../../services/accountSemaphore.ts";
import { getQuotaScopeLabelForProvider } from "../../services/antigravityQuotaFamily.ts";
import { excludeConnectionForCooldown } from "./connectionCooldown.ts";
import { handleRequestRejectedFailure } from "./requestRejectedFailure.ts";
import { updateFromHeaders, updateFromResponseBody } from "../../services/rateLimitManager.ts";

export interface ProviderFailureClassificationDeps {
  provider: string;
  model: string;
  connectionId?: string | null;
  credentials?: Record<string, unknown> | null;
  onStreamFailure?: ((err?: unknown) => unknown) | null;
  isModelScope: () => boolean;
  getCurrentConnectionId: () => string | null | undefined;
  log?: {
    warn?: (tag: string, message: string, ...args: unknown[]) => void;
    info?: (tag: string, message: string, ...args: unknown[]) => void;
    debug?: (tag: string, message: string, ...args: unknown[]) => void;
  } | null;
}

export interface ProviderFailureClassificationArgs {
  statusCode: number;
  message: string;
  headers?: Headers | null;
  upstreamErrorBody?: unknown;
  retryAfterMs?: number | null;
  targetModel: string;
}

/**
 * Classifies and applies provider failure side-effects (connection cooldowns,
 * terminal statuses, lockouts, quota state updates, and response/header telemetry).
 *
 * Lifted verbatim out of handleChatCore into a focused leaf module.
 */
export async function applyProviderFailureClassification(
  deps: ProviderFailureClassificationDeps,
  args: ProviderFailureClassificationArgs
): Promise<void> {
  const {
    provider,
    model,
    connectionId,
    credentials,
    onStreamFailure,
    isModelScope,
    getCurrentConnectionId,
    log,
  } = deps;

  const { statusCode, message, headers, upstreamErrorBody, retryAfterMs, targetModel } = args;

  let errorType = classifyProviderError(statusCode, message, provider);
  if (statusCode === 429 && isModelScope()) {
    const decision = classifyModelScope429(message, normalizeHeaders(headers));
    errorType =
      decision.kind === "quota_exhausted"
        ? PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
        : PROVIDER_ERROR_TYPES.RATE_LIMITED;
    log?.warn?.(
      "MODELSCOPE_429",
      `${decision.kind} (model remaining: ${decision.snapshot.modelRemaining ?? "unknown"}, total remaining: ${decision.snapshot.totalRemaining ?? "unknown"})`
    );
  }
  const persistentMessage = sanitizeErrorMessage(message) || "Provider request failed";
  const errorConnectionId = getCurrentConnectionId() || connectionId;
  if (errorConnectionId && errorType) {
    try {
      if (errorType === PROVIDER_ERROR_TYPES.FORBIDDEN) {
        const probeIsolated = await shouldIsolateProbeFailures();
        await writeTerminalStatus(
          errorConnectionId,
          {
            testStatus: "banned",
            isActive: false,
            lastError: persistentMessage,
            lastErrorType: errorType,
            errorCode: String(statusCode),
          },
          probeIsolated ? "probe" : "production"
        );
        if (probeIsolated) {
          console.warn(
            `[provider] Node ${errorConnectionId} probe ${errorType} (${statusCode}) -- connection stays active`
          );
        } else {
          console.warn(
            `[provider] Node ${errorConnectionId} banned (${statusCode}) -- disabling permanently`
          );
        }
      } else if (errorType === PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED) {
        if (
          connectionHasExtraKeys(
            errorConnectionId,
            (credentials?.providerSpecificData as Record<string, unknown> | undefined)
              ?.extraApiKeys as string[] | undefined
          )
        ) {
          await updateProviderConnection(errorConnectionId, {
            lastErrorType: errorType,
            lastError: persistentMessage,
            errorCode: statusCode,
          });
          console.warn(
            `[provider] Node ${errorConnectionId} account deactivated (${statusCode}) -- has extra keys, keeping connection active`
          );
        } else {
          const probeIsolated2 = await shouldIsolateProbeFailures();
          await writeTerminalStatus(
            errorConnectionId,
            {
              testStatus: "deactivated",
              isActive: false,
              lastError: persistentMessage,
              lastErrorType: errorType,
              errorCode: String(statusCode),
            },
            probeIsolated2 ? "probe" : "production"
          );
          if (probeIsolated2) {
            console.warn(
              `[provider] Node ${errorConnectionId} probe ${errorType} (${statusCode}) -- connection stays active`
            );
          } else {
            console.warn(
              `[provider] Node ${errorConnectionId} account deactivated (${statusCode}) -- disabling permanently`
            );
          }
        }
      } else if (errorType === PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED) {
        const probeIsolated3 = await shouldIsolateProbeFailures();
        if (probeIsolated3) {
          await writeTerminalStatus(
            errorConnectionId,
            {
              testStatus: "credits_exhausted",
              lastError: persistentMessage,
              lastErrorType: errorType,
              errorCode: String(statusCode),
            },
            "probe"
          );
          console.warn(
            `[provider] Node ${errorConnectionId} probe ${errorType} (${statusCode}) -- connection stays active`
          );
        } else {
          let kimiRateLimitResetAt: string | null = null;
          if (provider === "kimi-coding") {
            try {
              const { fetchAndPersistProviderLimits } = await import("@/lib/usage/providerLimits");
              const { usage } = await fetchAndPersistProviderLimits(errorConnectionId, "manual");
              kimiRateLimitResetAt = getKimiTemporaryRateLimitResetAt(usage);
            } catch {}
          }

          let quotaCooldownMs = kimiRateLimitResetAt
            ? Math.max(new Date(kimiRateLimitResetAt).getTime() - Date.now(), 0)
            : retryAfterMs || COOLDOWN_MS.rateLimit;
          const deferAntigravityQuotaStateToCaller = shouldDeferAntigravityQuotaStateToCaller(
            provider,
            typeof onStreamFailure === "function"
          );
          const isAntigravityQuotaFamily = shouldDeferAntigravityQuotaStateToCaller(provider, true);
          let coreOwnedAntigravityLockout: {
            cooldownMs: number;
            failureCount: number;
          } | null = null;
          if (isAntigravityQuotaFamily && !deferAntigravityQuotaStateToCaller) {
            const quotaErrorText =
              typeof upstreamErrorBody === "string"
                ? upstreamErrorBody
                : upstreamErrorBody == null
                  ? message
                  : JSON.stringify(upstreamErrorBody);
            coreOwnedAntigravityLockout = await recordCoreOwnedAntigravityQuotaState({
              provider,
              connectionId: errorConnectionId,
              model,
              status: statusCode,
              errorText: quotaErrorText,
              headers: headers ?? undefined,
            });
            quotaCooldownMs = coreOwnedAntigravityLockout.cooldownMs;
          }
          const accountSemaphoreKey = resolveAccountSemaphoreKey({
            provider,
            model: targetModel,
            connectionId: errorConnectionId,
            credentials,
          });
          if (accountSemaphoreKey && !deferAntigravityQuotaStateToCaller) {
            markAccountSemaphoreBlocked(accountSemaphoreKey, quotaCooldownMs);
          }
          if (deferAntigravityQuotaStateToCaller) {
          } else if (coreOwnedAntigravityLockout) {
            console.warn(
              `[provider] Node ${errorConnectionId} Antigravity model quota exhausted (${statusCode}) for ${model} - ${Math.ceil(coreOwnedAntigravityLockout.cooldownMs / 1000)}s (failureCount=${coreOwnedAntigravityLockout.failureCount}, owner=core)`
            );
          } else if (kimiRateLimitResetAt) {
            await updateProviderConnection(errorConnectionId, {
              testStatus: "unavailable",
              rateLimitedUntil: kimiRateLimitResetAt,
              backoffLevel: 0,
              lastErrorType: PROVIDER_ERROR_TYPES.RATE_LIMITED,
              lastError: persistentMessage,
              errorCode: statusCode,
            });
            console.warn(
              `[provider] Node ${errorConnectionId} Kimi request window exhausted (${statusCode}) -- retrying after ${kimiRateLimitResetAt}`
            );
          } else if (isModelScope() && errorConnectionId) {
            lockModel(provider, errorConnectionId, model, "quota_exhausted", quotaCooldownMs);
            if (targetModel && targetModel !== model) {
              lockModel(
                provider,
                errorConnectionId,
                targetModel,
                "quota_exhausted",
                quotaCooldownMs
              );
            }
            console.warn(
              `[provider] Node ${errorConnectionId} ModelScope model quota exhausted (${statusCode}) for ${targetModel} - ${Math.ceil(quotaCooldownMs / 1000)}s (connection stays active)`
            );
          } else if (
            lockModelIfPerModelQuota(
              provider,
              errorConnectionId,
              model,
              "quota_exhausted",
              quotaCooldownMs
            ) ||
            (targetModel &&
              targetModel !== model &&
              lockModelIfPerModelQuota(
                provider,
                errorConnectionId,
                targetModel,
                "quota_exhausted",
                quotaCooldownMs
              ))
          ) {
            const quotaScope = getQuotaScopeLabelForProvider(provider, targetModel);
            console.warn(
              `[provider] Node ${errorConnectionId} ${quotaScope}-only quota exhausted (${statusCode}) for ${targetModel} - ${Math.ceil(quotaCooldownMs / 1000)}s (cooldown_scope=${quotaScope}, ttl_source=${retryAfterMs ? "upstream" : "inferred"}, connection stays active)`
            );
          } else {
            await writeTerminalStatus(
              errorConnectionId,
              {
                testStatus: "credits_exhausted",
                lastError: persistentMessage,
                lastErrorType: errorType,
                errorCode: String(statusCode),
              },
              "production"
            );
            console.warn(`[provider] Node ${errorConnectionId} exhausted quota (${statusCode})`);
          }
        }
      } else if (errorType === PROVIDER_ERROR_TYPES.UNAUTHORIZED) {
        await updateProviderConnection(errorConnectionId, {
          lastErrorType: errorType,
          lastError: persistentMessage,
          errorCode: statusCode,
        });
      } else if (errorType === PROVIDER_ERROR_TYPES.OAUTH_INVALID_TOKEN) {
        await updateProviderConnection(errorConnectionId, {
          lastErrorType: errorType,
          lastError: persistentMessage,
          errorCode: statusCode,
        });
        console.warn(
          `[provider] Node ${errorConnectionId} OAuth token invalid (${statusCode}) -- token refresh available`
        );
      } else if (errorType === PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR) {
        await updateProviderConnection(errorConnectionId, {
          lastErrorType: errorType,
          lastError: persistentMessage,
          errorCode: statusCode,
        });
        console.warn(
          `[provider] Node ${errorConnectionId} project routing error (${statusCode}) -- not banning`
        );
      } else if (errorType === PROVIDER_ERROR_TYPES.GEO_BLOCKED) {
        // Google regional refusal: account-independent, non-terminal; park the connection
        // until egress uses a supported region; probes skip the day-long cooldown (#9817).
        await excludeConnectionForCooldown({
          connectionId: errorConnectionId,
          errorType,
          message: persistentMessage,
          statusCode,
          cooldownMs: COOLDOWN_MS.geoBlocked ?? 24 * 60 * 60 * 1000,
          skipCooldownForProbe: true,
          label: "geo-blocked",
          suffix: "trying other accounts",
        });
      } else if (errorType === PROVIDER_ERROR_TYPES.REQUEST_REJECTED) {
        // Per-request refusal (#12859): growing cooldown, streak → banned.
        await handleRequestRejectedFailure({
          connectionId: errorConnectionId,
          statusCode,
          message: persistentMessage,
        });
      } else if (errorType === PROVIDER_ERROR_TYPES.GCP_PROJECT_REQUIRED) {
        // Antigravity BYOP: fixable via a Project ID; never a lockout/ban. Park the connection.
        await excludeConnectionForCooldown({
          connectionId: errorConnectionId,
          errorType,
          message: persistentMessage,
          statusCode,
          cooldownMs: COOLDOWN_MS.gcpProjectRequired ?? 24 * 60 * 60 * 1000,
          skipCooldownForProbe: false,
          label: "GCP project required",
          suffix: "routing to other accounts (enter a Project ID to restore)",
        });
      } else if (errorType === PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND) {
        const notFoundCooldownMs = COOLDOWN_MS.notFound;
        if (!(await shouldIsolateProbeFailures())) {
          const modelToLock = targetModel || model;
          lockModel(
            provider,
            errorConnectionId,
            modelToLock,
            "model_not_found",
            notFoundCooldownMs
          );
          console.warn(
            `[provider] Node ${errorConnectionId} model not found (${statusCode}) for ${modelToLock} - locking model for ${Math.ceil(notFoundCooldownMs / 1000)}s (connection stays active)`
          );
        }
      }
    } catch {}
  }

  if (headers) {
    updateFromHeaders(provider, errorConnectionId, headers, statusCode, targetModel);
  }
  if (errorConnectionId && upstreamErrorBody !== null && upstreamErrorBody !== undefined) {
    updateFromResponseBody(provider, errorConnectionId, upstreamErrorBody, statusCode, targetModel);
  }
}

export function createProviderFailureClassifier(
  deps: ProviderFailureClassificationDeps
): (args: ProviderFailureClassificationArgs) => Promise<void> {
  return (args: ProviderFailureClassificationArgs) =>
    applyProviderFailureClassification(deps, args);
}
