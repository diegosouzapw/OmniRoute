import { randomUUID, createHash } from "crypto";
import {
  getProviderConnections,
  getProviderNodes,
  validateApiKey,
  updateProviderConnection,
  getSettings,
  getCachedSettings,
  getSessionAccountAffinity,
  upsertSessionAccountAffinity,
  touchSessionAccountAffinity,
  deleteSessionAccountAffinity,
} from "@/lib/localDb";
import {
  DEFAULT_QUOTA_THRESHOLD_PERCENT,
  getQuotaCache,
  getQuotaWindowStatus,
  isAccountQuotaExhausted,
} from "@/domain/quotaCache";
import {
  isAccountUnavailable,
  getUnavailableUntil,
  getEarliestRateLimitedUntil,
  formatRetryAfter,
  checkFallbackError,
  isModelLocked,
  getModelLockoutInfo,
  lockModel,
  hasPerModelQuota,
  getRuntimeProviderProfile,
  recordModelLockoutFailure,
} from "@omniroute/open-sse/services/accountFallback.ts";
import { isLocalProvider } from "@omniroute/open-sse/config/providerRegistry.ts";
import { COOLDOWN_MS } from "@omniroute/open-sse/config/constants.ts";
import {
  preflightQuota,
  isQuotaPreflightEnabled,
} from "@omniroute/open-sse/services/quotaPreflight.ts";
import { resolveResilienceSettings } from "@/lib/resilience/settings";
import { syncHealthFromDB, type KeyHealth } from "@omniroute/open-sse/services/apiKeyRotator.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "@omniroute/open-sse/services/errorClassifier.ts";
import { looksLikeQuotaExhausted } from "@/shared/utils/classify429";
import { getCodexModelScope } from "@omniroute/open-sse/executors/codex.ts";
import {
  getProviderById,
  getProviderAlias,
  resolveProviderId,
  NOAUTH_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
} from "@/shared/constants/providers";
import { isModelExcludedByConnection } from "@/domain/connectionModelRules";
import * as log from "../utils/logger";
import { fisherYatesShuffle, getNextFromDeckSync } from "@/shared/utils/shuffleDeck";
import crypto from "node:crypto";

import { isTerminalConnectionStatus, resolveTerminalConnectionStatus } from "./connectionStatus.ts";
import { asRecord, toProviderConnection } from "./utils.ts";
import { RecoverableConnectionState } from "./types.ts";
import { markMutexes } from "./selectionLocks.ts";
import { getCodexScopeRateLimitedUntil } from "./quotaLimits.ts";

/**
 * Mark account as unavailable — reads backoffLevel from DB, calculates cooldown with exponential backoff, saves new level
 * @param {string} connectionId
 * @param {number} status - HTTP status code
 * @param {string} errorText - Error message
 * @param {string|null} provider
 * @param {string|null} model - Model name for per-model lockout
 * @returns {{ shouldFallback: boolean, cooldownMs: number }}
 */
export async function markAccountUnavailable(
  connectionId: string,
  status: number,
  errorText: string,
  provider: string | null = null,
  model: string | null = null,
  providerProfile = null,
  options: {
    persistUnavailableState?: boolean;
  } = {}
) {
  const currentMutex = markMutexes.get(connectionId) || Promise.resolve();
  let resolveMutex: (() => void) | undefined;
  markMutexes.set(
    connectionId,
    new Promise((resolve) => {
      resolveMutex = resolve;
    })
  );

  try {
    await currentMutex;

    // Read current connection to get backoffLevel
    const connectionsRaw = await getProviderConnections({ provider });
    const connections = (Array.isArray(connectionsRaw) ? connectionsRaw : [])
      .map(toProviderConnection)
      .filter((connection) => connection.id.length > 0);
    const conn = connections.find((connection) => connection.id === connectionId);
    const backoffLevel = conn?.backoffLevel || 0;

    // T06/T10/T36: terminal statuses should not be overwritten by transient cooldown state.
    if (conn && isTerminalConnectionStatus(conn)) {
      log.info(
        "AUTH",
        `${connectionId.slice(0, 8)} terminal status=${conn.testStatus}, skipping cooldown overwrite`
      );
      return { shouldFallback: true, cooldownMs: 0 };
    }

    // ─── Anti-Thundering Herd Guard ─────────────────────────────────
    // If this connection was ALREADY marked unavailable by a prior concurrent
    // request (within the mutex window), skip re-marking to avoid resetting
    // the cooldown timer or double-incrementing the backoff level.
    if (conn?.rateLimitedUntil && new Date(conn.rateLimitedUntil).getTime() > Date.now()) {
      log.info(
        "AUTH",
        `${connectionId.slice(0, 8)} already marked unavailable (until ${conn.rateLimitedUntil}), skipping duplicate mark`
      );
      return {
        shouldFallback: true,
        cooldownMs: new Date(conn.rateLimitedUntil).getTime() - Date.now(),
      };
    }

    // T09: Codex scope-aware lockout guard (codex vs spark independent pools).
    if (provider === "codex" && model) {
      const scopeRateLimitedUntil = getCodexScopeRateLimitedUntil(
        conn?.providerSpecificData || {},
        model
      );
      if (scopeRateLimitedUntil && new Date(scopeRateLimitedUntil).getTime() > Date.now()) {
        log.info(
          "AUTH",
          `${connectionId.slice(0, 8)} already scope-limited for ${getCodexModelScope(model)} (until ${scopeRateLimitedUntil}), skipping duplicate mark`
        );
        return {
          shouldFallback: true,
          cooldownMs: new Date(scopeRateLimitedUntil).getTime() - Date.now(),
        };
      }
    }

    const effectiveProviderProfile =
      providerProfile || (provider ? await getRuntimeProviderProfile(provider) : null);
    const fallbackResult = checkFallbackError(
      status,
      errorText,
      backoffLevel,
      model,
      provider,
      null,
      effectiveProviderProfile
    );

    // Read passthroughModels from connection config (user-configured per-model quota)
    const connProviderSpecificData = (conn?.providerSpecificData as Record<string, unknown>) || {};
    const connectionPassthroughModels = connProviderSpecificData.passthroughModels as
      | boolean
      | undefined;
    const disableCooling = connProviderSpecificData.disableCooling === true;

    const isPerModelQuotaProvider = hasPerModelQuota(provider, model, connectionPassthroughModels);
    if (
      isPerModelQuotaProvider &&
      provider &&
      model &&
      (status === 404 || status === 429 || status >= 500)
    ) {
      const reason =
        status === 404
          ? "not_found"
          : status === 429 && looksLikeQuotaExhausted(errorText)
            ? "quota_exhausted"
            : status === 429
              ? "rate_limited"
              : "server_error";
      const lockout = recordModelLockoutFailure(
        provider,
        connectionId,
        model,
        reason,
        status,
        status === 404
          ? (effectiveProviderProfile?.baseCooldownMs ?? COOLDOWN_MS.notFoundLocal)
          : (fallbackResult.baseCooldownMs ?? effectiveProviderProfile?.baseCooldownMs ?? 0),
        effectiveProviderProfile,
        {
          exactCooldownMs:
            fallbackResult.usedUpstreamRetryHint === true ? fallbackResult.cooldownMs : null,
        }
      );
      // Update last error for observability (without changing terminal status)
      updateProviderConnection(connectionId, {
        lastErrorType: reason,
        lastError: `Model ${model} ${reason}`,
        lastErrorAt: new Date().toISOString(),
        errorCode: status,
      }).catch(() => {});
      log.info(
        "AUTH",
        `Model-only lockout for ${provider}:${model} — ${status} ${reason} ${Math.ceil(lockout.cooldownMs / 1000)}s (failureCount=${lockout.failureCount}, connection stays active)`
      );
      return { shouldFallback: true, cooldownMs: lockout.cooldownMs };
    }
    const result = fallbackResult;
    const { shouldFallback, cooldownMs: rawCooldownMs, newBackoffLevel, reason } = result;
    if (!shouldFallback) return { shouldFallback: false, cooldownMs: 0 };
    const providerErrorType = classifyProviderError(status, errorText, provider);

    if (provider && resolveProviderId(provider) === "grok-web" && status === 403 && model) {
      const lockout = recordModelLockoutFailure(
        provider,
        connectionId,
        model,
        "forbidden",
        status,
        effectiveProviderProfile?.baseCooldownMs ?? COOLDOWN_MS.serviceUnavailable,
        effectiveProviderProfile
      );
      updateProviderConnection(connectionId, {
        lastErrorType: "forbidden",
        lastError: `Mode ${model} forbidden for this Grok account`,
        lastErrorAt: new Date().toISOString(),
        errorCode: status,
      }).catch(() => {});
      log.info(
        "AUTH",
        `Mode-only lockout for ${provider}:${model} — 403 forbidden ${Math.ceil(lockout.cooldownMs / 1000)}s (connection stays active)`
      );
      return { shouldFallback: true, cooldownMs: lockout.cooldownMs };
    }

    const terminalStatus = resolveTerminalConnectionStatus(
      status,
      result as { permanent?: boolean; creditsExhausted?: boolean },
      providerErrorType
    );
    const cooldownMs = terminalStatus ? 0 : rawCooldownMs;

    // ── #3027: per-model subscription/permission 403 → model-only lockout ──
    // Passthrough / per-model-quota providers (e.g. ollama-cloud with
    // passthroughModels:true) multiplex many upstream models behind one key.
    // A scoped 403 like "this model requires a subscription, upgrade for access"
    // is about the paid model, not the key — cooling the whole connection would
    // knock out the free models on the same key too and escalate backoff
    // (#3001/#3027). This generalizes the grok-web 403 precedent above to every
    // hasPerModelQuota provider. Terminal/credential 403s (banned/deactivated
    // key, credits exhausted) are excluded here because
    // resolveTerminalConnectionStatus() returns a non-null status for them, so
    // they keep their existing connection-level cooldown/deactivation path.
    if (isPerModelQuotaProvider && status === 403 && provider && model && !terminalStatus) {
      const lockout = recordModelLockoutFailure(
        provider,
        connectionId,
        model,
        "forbidden",
        status,
        fallbackResult.baseCooldownMs ??
          effectiveProviderProfile?.baseCooldownMs ??
          COOLDOWN_MS.serviceUnavailable,
        effectiveProviderProfile,
        {
          exactCooldownMs:
            fallbackResult.usedUpstreamRetryHint === true ? fallbackResult.cooldownMs : null,
        }
      );
      updateProviderConnection(connectionId, {
        lastErrorType: "forbidden",
        lastError: `Model ${model} forbidden (per-model access/subscription)`,
        lastErrorAt: new Date().toISOString(),
        errorCode: status,
      }).catch(() => {});
      log.info(
        "AUTH",
        `Model-only lockout for ${provider}:${model} — 403 forbidden ${Math.ceil(lockout.cooldownMs / 1000)}s (per-model quota provider, connection stays active)`
      );
      return { shouldFallback: true, cooldownMs: lockout.cooldownMs };
    }

    // ── 404 model-only lockout: connection stays active ──
    // For local providers (detected by URL), a 404 means the specific model
    // doesn't exist or isn't available for this account — it should NOT lock
    // out the entire connection.
    const connBaseUrl = (conn?.providerSpecificData as Record<string, unknown>)?.baseUrl as
      | string
      | undefined;

    if (isLocalProvider(connBaseUrl) && status === 404 && provider && model) {
      const lockout = recordModelLockoutFailure(
        provider,
        connectionId,
        model,
        "not_found",
        status,
        status === 404
          ? (effectiveProviderProfile?.baseCooldownMs ?? COOLDOWN_MS.notFoundLocal)
          : COOLDOWN_MS.notFoundLocal,
        effectiveProviderProfile
      );
      updateProviderConnection(connectionId, {
        lastErrorType: "not_found",
        lastError: `Model ${model} not_found`,
        lastErrorAt: new Date().toISOString(),
        errorCode: status,
      }).catch(() => {});
      log.info(
        "AUTH",
        `Model-only lockout for ${provider}:${model} — 404 not_found ${Math.ceil(lockout.cooldownMs / 1000)}s (failureCount=${lockout.failureCount}, connection stays active)`
      );
      return { shouldFallback: true, cooldownMs: lockout.cooldownMs };
    }

    const errorMsg = typeof errorText === "string" ? errorText.slice(0, 100) : "Provider error";

    // T09: Codex per-scope lockout (do not block the whole account globally).
    if (provider === "codex" && status === 429 && model && conn) {
      const scope = getCodexModelScope(model);
      const existingScopeMap = asRecord(conn.providerSpecificData.codexScopeRateLimitedUntil);
      const persistedScopeUntil = getCodexScopeRateLimitedUntil(conn.providerSpecificData, model);
      const scopeRateLimitedUntil = persistedScopeUntil || getUnavailableUntil(cooldownMs);
      const scopeCooldownMs = Math.max(new Date(scopeRateLimitedUntil).getTime() - Date.now(), 0);

      await updateProviderConnection(connectionId, {
        testStatus: "unavailable",
        lastError: errorMsg,
        errorCode: status,
        lastErrorAt: new Date().toISOString(),
        backoffLevel: newBackoffLevel ?? backoffLevel,
        providerSpecificData: {
          ...conn.providerSpecificData,
          codexScopeRateLimitedUntil: {
            ...existingScopeMap,
            [scope]: scopeRateLimitedUntil,
          },
        },
      });

      if (scopeCooldownMs > 0) {
        lockModel(provider, connectionId, model, reason || "unknown", scopeCooldownMs);
      }

      if (status && errorMsg) {
        console.error(`❌ ${provider} [${status}] (${scope}): ${errorMsg}`);
      }

      return { shouldFallback: true, cooldownMs: scopeCooldownMs };
    }

    const baseUpdate = {
      lastError: errorMsg,
      lastErrorType: providerErrorType,
      errorCode: status,
      lastErrorAt: new Date().toISOString(),
      backoffLevel: newBackoffLevel ?? backoffLevel,
    };
    const persistUnavailableState = options.persistUnavailableState !== false;

    if (!persistUnavailableState) {
      await updateProviderConnection(connectionId, {
        ...baseUpdate,
      });
    } else if (cooldownMs > 0 && !disableCooling) {
      await updateProviderConnection(connectionId, {
        ...baseUpdate,
        rateLimitedUntil: getUnavailableUntil(cooldownMs),
        testStatus: "unavailable",
      });
    } else {
      await updateProviderConnection(connectionId, {
        ...baseUpdate,
        rateLimitedUntil: null,
        ...(terminalStatus ? { testStatus: terminalStatus } : {}),
      });
    }

    // T-AUTODISABLE: If auto-disable setting is enabled and error is permanent/terminal,
    // mark account as inactive so it is never retried again.
    // Uses getCachedSettings() to avoid DB overhead on hot error path.
    // NOTE: For permanent bans we disable immediately — no threshold needed,
    // because a permanent ban (403 "Verify your account" / ToS violation) will
    // NEVER recover, so retrying is pointless regardless of attempt count.
    if ((result as { permanent?: boolean }).permanent) {
      try {
        const settings = await getCachedSettings();
        const autoDisableEnabled = settings.autoDisableBannedAccounts ?? false;
        if (autoDisableEnabled) {
          await updateProviderConnection(connectionId, { isActive: false });
          log.info(
            "AUTH",
            `Auto-disabled ${connectionId.slice(0, 8)} — permanent ban detected (autoDisableBannedAccounts=true)`
          );
        }
      } catch (e) {
        log.info("AUTH", `Auto-disable check failed (non-fatal): ${e}`);
      }
    }

    if (provider && status && errorMsg) {
      console.error(`❌ ${provider} [${status}]: ${errorMsg}`);
    }

    return { shouldFallback: true, cooldownMs };
  } finally {
    if (resolveMutex) resolveMutex();
    // Cleanup stale mutex entries (avoid memory leak)
    markMutexes.delete(connectionId);
  }
}

/**
 * Clear account error status (only if currently has error)
 * Optimized to avoid unnecessary DB updates
 */
export async function clearAccountError(
  connectionId: string,
  currentConnection: Partial<RecoverableConnectionState>
) {
  // Only update if currently has error status
  const hasError =
    (currentConnection.testStatus && currentConnection.testStatus !== "active") ||
    currentConnection.lastError ||
    currentConnection.rateLimitedUntil ||
    currentConnection.errorCode ||
    currentConnection.lastErrorType ||
    currentConnection.lastErrorSource;

  if (!hasError) return; // Skip if already clean

  await updateProviderConnection(connectionId, {
    testStatus: "active",
    lastError: null,
    lastErrorAt: null,
    lastErrorType: null,
    lastErrorSource: null,
    errorCode: null,
    rateLimitedUntil: null,
    backoffLevel: 0,
  });
  log.info("AUTH", `Account ${connectionId.slice(0, 8)} error cleared`);
}

export async function clearRecoveredProviderState(
  credentials: Partial<RecoverableConnectionState> | null
) {
  if (!credentials?.connectionId) return;
  await clearAccountError(credentials.connectionId, credentials);
}