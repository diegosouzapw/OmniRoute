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

import { normalizeStatus } from "./connectionStatus.ts";
import { toStringOrNull, toNumber } from "./utils.ts";
import { ProviderConnectionView } from "./types.ts";
import { formatSessionKeyForLog } from "./sessionAffinity.ts";
import { QuotaCacheView, normalizeWindowName, resolveQuotaLimitPolicy, evaluateQuotaLimitPolicy } from "./quotaLimits.ts";

export function getConnectionQuotaHeadroomPercent(
  provider: string,
  connection: ProviderConnectionView
): number | null {
  const policy = resolveQuotaLimitPolicy(provider, connection.providerSpecificData);
  const percentages: number[] = [];
  const seenWindows = new Set<string>();

  const collectWindow = (windowName: string) => {
    const normalizedWindow = normalizeWindowName(windowName);
    if (!normalizedWindow || seenWindows.has(normalizedWindow)) return;
    seenWindows.add(normalizedWindow);

    const status = getQuotaWindowStatus(connection.id, normalizedWindow, policy.thresholdPercent);
    if (!status) return;
    percentages.push(Math.max(0, Math.min(100, status.remainingPercentage)));
  };

  for (const windowName of policy.windows) {
    collectWindow(windowName);
  }

  if (percentages.length > 0) {
    return Math.min(...percentages);
  }

  const quotaEntry = getQuotaCache(connection.id) as QuotaCacheView | null;
  const rawQuotas = quotaEntry?.quotas || {};
  for (const quota of Object.values(rawQuotas)) {
    if (!quota) continue;
    const resetAt = toStringOrNull(quota.resetAt);
    if (resetAt) {
      const resetMs = new Date(resetAt).getTime();
      if (Number.isFinite(resetMs) && resetMs <= Date.now()) {
        continue;
      }
    }
    const remaining = toNumber(quota.remainingPercentage, Number.NaN);
    if (Number.isFinite(remaining)) {
      percentages.push(Math.max(0, Math.min(100, remaining)));
    }
  }

  return percentages.length > 0 ? Math.min(...percentages) : null;
}

export function getConnectionErrorPenalty(connection: ProviderConnectionView): number {
  const errorType = normalizeStatus(connection.lastErrorType);
  const errorSource = normalizeStatus(connection.lastErrorSource);
  const numericErrorCode = toNumber(connection.errorCode, 0);

  let penalty = 0;
  if (connection.lastError) penalty += 6;

  if (
    errorType === "rate_limited" ||
    errorType === "quota_exhausted" ||
    errorType === "quota" ||
    numericErrorCode === 429
  ) {
    penalty += 24;
  } else if (numericErrorCode === 401 || numericErrorCode === 403 || errorSource === "oauth") {
    penalty += 18;
  } else if (numericErrorCode >= 500) {
    penalty += 10;
  }

  return penalty;
}

export function getConnectionRecencyPenalty(connection: ProviderConnectionView): number {
  if (!connection.lastUsedAt) return 0;
  const ageMs = Date.now() - new Date(connection.lastUsedAt).getTime();
  if (!Number.isFinite(ageMs)) return 0;
  if (ageMs < 15_000) return 3;
  if (ageMs < 60_000) return 2;
  if (ageMs < 5 * 60_000) return 1;
  return 0;
}

export function getP2CConnectionScore(
  provider: string,
  connection: ProviderConnectionView
): { score: number; quotaHeadroomPercent: number | null } {
  const quotaBlocked = evaluateQuotaLimitPolicy(provider, connection).blocked;
  const quotaExhausted = isAccountQuotaExhausted(connection.id);
  const quotaHeadroomPercent = getConnectionQuotaHeadroomPercent(provider, connection);

  let quotaPenalty = 0;
  if (quotaHeadroomPercent !== null) {
    quotaPenalty += Math.round((100 - quotaHeadroomPercent) / 8);
    if (quotaHeadroomPercent <= 10) quotaPenalty += 10;
    else if (quotaHeadroomPercent <= 25) quotaPenalty += 4;
  } else if (!quotaBlocked && !quotaExhausted) {
    quotaPenalty += 4;
  }

  const score =
    (quotaExhausted ? 200 : 0) +
    (quotaBlocked ? 80 : 0) +
    getConnectionErrorPenalty(connection) +
    Math.min(40, (connection.backoffLevel || 0) * 8) +
    quotaPenalty +
    Math.min(12, (connection.consecutiveUseCount || 0) * 2) +
    getConnectionRecencyPenalty(connection) +
    Math.min(6, Math.max(0, connection.priority || 0) - 1);

  return { score, quotaHeadroomPercent };
}

export function compareP2CConnections(
  provider: string,
  a: ProviderConnectionView,
  b: ProviderConnectionView
): number {
  const aScore = getP2CConnectionScore(provider, a);
  const bScore = getP2CConnectionScore(provider, b);
  if (aScore.score !== bScore.score) {
    return aScore.score - bScore.score;
  }

  const aHeadroom = aScore.quotaHeadroomPercent ?? -1;
  const bHeadroom = bScore.quotaHeadroomPercent ?? -1;
  if (aHeadroom !== bHeadroom) {
    return bHeadroom - aHeadroom;
  }

  if ((a.priority || 999) !== (b.priority || 999)) {
    return (a.priority || 999) - (b.priority || 999);
  }

  return a.id.localeCompare(b.id);
}

export function compareLruConnections(a: ProviderConnectionView, b: ProviderConnectionView): number {
  if (!a.lastUsedAt && !b.lastUsedAt) return (a.priority || 999) - (b.priority || 999);
  if (!a.lastUsedAt) return -1;
  if (!b.lastUsedAt) return 1;
  const recencyDelta = new Date(a.lastUsedAt).getTime() - new Date(b.lastUsedAt).getTime();
  if (recencyDelta !== 0) return recencyDelta;
  if ((a.consecutiveUseCount || 0) !== (b.consecutiveUseCount || 0)) {
    return (a.consecutiveUseCount || 0) - (b.consecutiveUseCount || 0);
  }
  return (a.priority || 999) - (b.priority || 999);
}

async export function selectSessionAffinityConnection(
  provider: string,
  sessionKey: string | null | undefined,
  connections: ProviderConnectionView[],
  ttlMs = 0
): Promise<ProviderConnectionView | null> {
  if (!sessionKey || connections.length === 0 || ttlMs <= 0) return null;

  const existing = getSessionAccountAffinity(sessionKey, provider, ttlMs);
  if (existing) {
    const connection = connections.find((candidate) => candidate.id === existing.connectionId);
    if (connection) {
      touchSessionAccountAffinity(sessionKey, provider, Date.now(), ttlMs);
      await updateProviderConnection(connection.id, {
        lastUsedAt: new Date().toISOString(),
        consecutiveUseCount: (connection.consecutiveUseCount || 0) + 1,
      });
      log.info(
        "AUTH",
        `session_key=${formatSessionKeyForLog(sessionKey)} -> connection ${connection.id.slice(
          0,
          8
        )} (affinity)`
      );
      return connection;
    }

    deleteSessionAccountAffinity(sessionKey, provider);
    log.info(
      "AUTH",
      `affinity cleared for session_key=${formatSessionKeyForLog(sessionKey)} provider=${provider}`
    );
  }

  const connection = [...connections].sort(compareLruConnections)[0] ?? null;
  if (!connection) return null;

  upsertSessionAccountAffinity(sessionKey, provider, connection.id, Date.now(), ttlMs);
  await updateProviderConnection(connection.id, {
    lastUsedAt: new Date().toISOString(),
    consecutiveUseCount: 1,
  });
  log.info(
    "AUTH",
    `new affinity created for session_key=${formatSessionKeyForLog(
      sessionKey
    )} -> connection ${connection.id.slice(0, 8)}`
  );
  return connection;
}