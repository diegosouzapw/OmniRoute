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


/**
 * Sentinel connection id used for the synthetic credentials of no-auth /
 * keyless providers. It is NOT a real DB row, so it
 * cannot carry cooldown state — the account-fallback loop must be able to
 * exclude it (#3061), otherwise it gets re-selected forever.
 */
export const SYNTHETIC_NOAUTH_CONNECTION_ID = "noauth";

export type AnonymousFallbackProviderDefinition = {
  anonymousFallback?: boolean;
  noAuth?: boolean;
};

export function buildSyntheticNoAuthCredentials(): {
  apiKey: null;
  accessToken: null;
  refreshToken: null;
  expiresAt: null;
  projectId: null;
  copilotToken: null;
  providerSpecificData: Record<string, never>;
  connectionId: typeof SYNTHETIC_NOAUTH_CONNECTION_ID;
  testStatus: "active";
  lastError: null;
  lastErrorType: null;
  lastErrorSource: null;
  errorCode: null;
  rateLimitedUntil: null;
  maxConcurrent: null;
  allRateLimited?: never;
  allExpired?: never;
  retryAfter?: never;
  retryAfterHuman?: never;
} {
  return {
    apiKey: null,
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    projectId: null,
    copilotToken: null,
    providerSpecificData: {},
    connectionId: SYNTHETIC_NOAUTH_CONNECTION_ID,
    testStatus: "active",
    lastError: null,
    lastErrorType: null,
    lastErrorSource: null,
    errorCode: null,
    rateLimitedUntil: null,
    maxConcurrent: null,
  };
}

export function providerCanUseSyntheticNoAuthFallback(providerId: string): boolean {
  const providerDef = getProviderById(providerId) as
    | AnonymousFallbackProviderDefinition
    | undefined;
  return (
    providerDef?.anonymousFallback === true ||
    Boolean(
      (NOAUTH_PROVIDERS as Record<string, AnonymousFallbackProviderDefinition | undefined>)[
        providerId
      ]?.noAuth
    ) ||
    Boolean(
      (WEB_COOKIE_PROVIDERS as Record<string, AnonymousFallbackProviderDefinition | undefined>)[
        providerId
      ]?.noAuth
    )
  );
}

export function maybeSyntheticNoAuthFallback(providerId: string, excludedConnectionIds: Set<string>) {
  if (!providerCanUseSyntheticNoAuthFallback(providerId)) return null;
  if (excludedConnectionIds.has(SYNTHETIC_NOAUTH_CONNECTION_ID)) return null;
  return buildSyntheticNoAuthCredentials();
}