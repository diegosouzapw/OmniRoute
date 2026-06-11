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

import { getEarliestFutureDate } from "./connectionStatus.ts";
import { JsonRecord, ProviderConnectionView } from "./types.ts";

export function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

export function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

export function toNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const parsed = toNumber(value, Number.NaN);
  return Number.isFinite(parsed) ? parsed : null;
}

export function toProviderConnection(value: unknown): ProviderConnectionView {
  const row = asRecord(value);
  // Only accept the per-window override map when it's a plain object —
  // anything else collapses to null so the preflight gate treats it as "no
  // overrides set."
  const rawThresholds = row.quotaWindowThresholds;
  const quotaWindowThresholds: Record<string, number> | null =
    rawThresholds && typeof rawThresholds === "object" && !Array.isArray(rawThresholds)
      ? (rawThresholds as Record<string, number>)
      : null;
  return {
    id: toStringOrNull(row.id) || "",
    provider: toStringOrNull(row.provider) || "",
    email: toStringOrNull(row.email),
    isActive: row.isActive === true,
    rateLimitedUntil: toStringOrNull(row.rateLimitedUntil),
    testStatus: toStringOrNull(row.testStatus),
    apiKey: toStringOrNull(row.apiKey),
    accessToken: toStringOrNull(row.accessToken),
    refreshToken: toStringOrNull(row.refreshToken),
    tokenExpiresAt: toStringOrNull(row.tokenExpiresAt),
    expiresAt: toStringOrNull(row.expiresAt),
    projectId: toStringOrNull(row.projectId),
    providerSpecificData: asRecord(row.providerSpecificData),
    lastUsedAt: toStringOrNull(row.lastUsedAt),
    consecutiveUseCount: toNumber(row.consecutiveUseCount, 0),
    priority: toNumber(row.priority, 999),
    lastError: toStringOrNull(row.lastError),
    lastErrorType: toStringOrNull(row.lastErrorType),
    lastErrorSource: toStringOrNull(row.lastErrorSource),
    errorCode:
      typeof row.errorCode === "string" || typeof row.errorCode === "number" ? row.errorCode : null,
    backoffLevel: toNumber(row.backoffLevel, 0),
    maxConcurrent: toNullableNumber(row.maxConcurrent),
    quotaWindowThresholds,
  };
}

export function toBooleanOrDefault(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

export function readHeaderValue(
  headers:
    | Headers
    | { get?: (name: string) => string | null }
    | Record<string, string | string[] | undefined>
    | null
    | undefined,
  name: string
): string | null {
  if (!headers) return null;

  if (typeof (headers as Headers).get === "function") {
    const value = (headers as Headers).get(name) || (headers as Headers).get(name.toLowerCase());
    return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
  }

  const recordHeaders = headers as Record<string, string | string[] | undefined>;
  const value =
    recordHeaders[name] || recordHeaders[name.toLowerCase()] || recordHeaders[name.toUpperCase()];

  if (Array.isArray(value)) {
    return typeof value[0] === "string" && value[0].trim().length > 0 ? value[0].trim() : null;
  }

  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export function normalizeExcludedConnectionIds(
  excludeConnectionId: string | null,
  extraExcludedConnectionIds: string[] | null | undefined
): Set<string> {
  const normalized = new Set<string>();

  if (typeof excludeConnectionId === "string" && excludeConnectionId.trim().length > 0) {
    normalized.add(excludeConnectionId.trim());
  }

  if (Array.isArray(extraExcludedConnectionIds)) {
    for (const connectionId of extraExcludedConnectionIds) {
      if (typeof connectionId === "string" && connectionId.trim().length > 0) {
        normalized.add(connectionId.trim());
      }
    }
  }

  return normalized;
}

export function buildQuotaPreflightRateLimitedResult(
  provider: string,
  blockedByPreflight: Array<{
    id: string;
    quotaPercent?: number;
    resetAt?: string | null;
  }>
) {
  const retryAfter =
    getEarliestFutureDate(blockedByPreflight.map((entry) => entry.resetAt ?? null)) ||
    new Date(Date.now() + 5 * 60 * 1000).toISOString();
  const blockedSummary = blockedByPreflight
    .map((entry) => {
      const percent = Number.isFinite(entry.quotaPercent)
        ? `${Math.round((entry.quotaPercent as number) * 100)}%`
        : "quota exhausted";
      return `${entry.id.slice(0, 8)}(${percent})`;
    })
    .join("; ");

  log.info("AUTH", `${provider} | quota preflight filtered account(s): ${blockedSummary}`);

  return {
    allRateLimited: true,
    retryAfter,
    retryAfterHuman: formatRetryAfter(retryAfter),
    lastError: `All ${provider} accounts blocked by quota preflight`,
    lastErrorCode: 429,
  };
}