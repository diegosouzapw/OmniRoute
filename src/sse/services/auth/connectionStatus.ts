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

import { NON_RETRYABLE_MODEL_LOCKOUT_REASONS } from "./constants.ts";
import { ProviderConnectionView } from "./types.ts";

export function normalizeStatus(value: string | null): string {
  return (value || "").trim().toLowerCase();
}

export function isTerminalConnectionStatus(connection: ProviderConnectionView): boolean {
  const status = normalizeStatus(connection.testStatus);
  return status === "credits_exhausted" || status === "banned" || status === "expired";
}

export function resolveTerminalConnectionStatus(
  status: number,
  result: { permanent?: boolean; creditsExhausted?: boolean },
  providerErrorType: string | null = null
): string | null {
  if (result.creditsExhausted || status === 402) return "credits_exhausted";
  if (
    providerErrorType === PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR ||
    providerErrorType === PROVIDER_ERROR_TYPES.OAUTH_INVALID_TOKEN
  ) {
    return null;
  }
  if (result.permanent || providerErrorType === PROVIDER_ERROR_TYPES.FORBIDDEN) {
    return "banned";
  }
  if (
    providerErrorType === PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED ||
    providerErrorType === PROVIDER_ERROR_TYPES.UNAUTHORIZED ||
    status === 401
  ) {
    return "expired";
  }
  return null;
}

export function parseFutureDateMs(value: string | null): number | null {
  if (!value) return null;
  const ms = new Date(value).getTime();
  if (!Number.isFinite(ms) || ms <= Date.now()) return null;
  return ms;
}

export function getEarliestFutureDate(candidates: Array<string | null>): string | null {
  return (
    candidates
      .map((candidate) => ({
        raw: candidate,
        ms: parseFutureDateMs(candidate),
      }))
      .filter((entry) => entry.ms !== null)
      .sort((a, b) => (a.ms as number) - (b.ms as number))[0]?.raw || null
  );
}

export function isRetryableModelLockoutReason(reason: unknown): boolean {
  return typeof reason === "string" && reason.length > 0
    ? !NON_RETRYABLE_MODEL_LOCKOUT_REASONS.has(reason)
    : false;
}