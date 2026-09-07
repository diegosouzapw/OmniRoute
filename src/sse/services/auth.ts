import { randomUUID } from "crypto";
import { nodeTypeFromId } from "@/lib/db/providerNodeSelect";
import { extractGoogApiKeyHeader } from "./googApiKeyAuth.ts";
import { describeUpstreamFailure } from "@/shared/utils/upstreamError";
import { buildAllExpiredCredentials } from "./authExpiredCredentials.ts";
import {
  getCachedRawProviderConnections,
  getCachedProviderNodes,
  getCachedSettings,
} from "@/lib/db/readCache";
import {
  getProviderConnections,
  updateProviderConnection,
  getProviderConnectionById,
  resetConnectionBackoff,
  touchConnectionLastUsed,
  clearConnectionErrorIfUnchanged,
} from "@/lib/db/providers";
import { getDbInstance } from "@/lib/db/core";
import { getRecentEgressIpForConnection, EGRESS_IP_LOOKUP_WINDOW_MS } from "@/lib/db/proxyLogs";
import { validateApiKey } from "@/lib/db/apiKeys";
import {
  getActiveExclusiveConnectionLease,
  hashLeaseOwnerId,
  type ExclusiveConnectionLease,
} from "@/lib/db/exclusiveConnectionLeases";
import { getSettings } from "@/lib/db/settings";
import {
  describePeakHourWindow,
  evaluatePeakHourProtection,
} from "@/lib/providers/peakHourProtection";
import { buildJinaEnvCredentials } from "@/lib/providers/jina";
import { buildGeminiEnvCredentials } from "@/lib/providers/gemini";
import { isCommonChatGptWebRetiredProviderId } from "@/shared/constants/chatgptWebRetirement";
import { toNumber } from "@/shared/utils/numeric";
import { isMicrosoftDesignerWebRetiredProviderId } from "@/shared/constants/designerWebRetirement";
import { isRuntimeRetiredProviderId } from "@/shared/constants/providerRetirement";
import {
  createLazyConnectionView,
  toProviderConnection,
  type ProviderConnectionView,
} from "@/lib/db/providers/lazyConnectionView";
import {
  DEFAULT_QUOTA_THRESHOLD_PERCENT,
  getQuotaCache,
  getQuotaWindowStatus,
  hydrateCodexQuotaCacheForRequest,
  isQuotaExhaustedForRequest,
} from "@/domain/quotaCache";
import {
  getQuotaScopeLabelForProvider,
  isAntigravityQuotaProvider,
} from "@omniroute/open-sse/services/antigravityQuotaFamily.ts";
import { rehydrateAntigravityFamilyLocksForConnections, persistAntigravityFamilyCooldownIfQuota } from "@omniroute/open-sse/services/antigravityFamilyCooldown.ts";
import { markQuotaPreflightAccountUnavailable } from "./quotaPreflightUnavailable.ts";
import { getCreditsMode } from "@omniroute/open-sse/services/antigravityCredits.ts";
import { preferAntigravityConnectionsWithStoredProject } from "@omniroute/open-sse/services/antigravityProjectPersistence.ts";
import {
  isAccountUnavailable,
  getUnavailableUntil,
  getEarliestRateLimitedUntil,
  cooldownUntilMs,
  formatRetryAfter,
  checkFallbackError,
  isModelLocked,
  getModelLockoutInfo,
  lockModel,
  hasPerModelQuota,
  getRuntimeProviderProfile,
  recordModelLockoutFailure,
  retryHintBypassesMaxCooldownMs,
  isProviderModelUnsupported400,
} from "@omniroute/open-sse/services/accountFallback.ts";
import { isLocalProvider } from "@omniroute/open-sse/config/providerRegistry.ts";
import { COOLDOWN_MS, RateLimitReason } from "@omniroute/open-sse/config/constants.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/errorSanitization.ts";
import {
  honorsRuleLockScope,
  isEgressBucketedLockScope,
  egressBucketedLockProviders,
} from "@omniroute/open-sse/config/providerErrorRules.ts";
import {
  preflightQuota,
  isQuotaPreflightEnabled,
} from "@omniroute/open-sse/services/quotaPreflight.ts";
import { resolveResilienceSettings } from "@/lib/resilience/settings";
import { resolveModelLockoutSettings } from "@/lib/resilience/modelLockoutSettings";
import {
  buildMixedAvailabilityError,
  isTransportCooldownErrorCode,
} from "../services/sameAccountTransportRetry";
import { syncHealthFromDB, type KeyHealth } from "@omniroute/open-sse/services/apiKeyRotator.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "@omniroute/open-sse/services/errorClassifier.ts";
import { resolveTerminalConnectionStatus } from "./authTerminalStatus.ts";
import {
  ALIBABA_FREE_DRAINED_LOCK_MS,
  getAlibabaBillingMode,
  isAlibabaFreeQuotaExhaustedError,
  isAlibabaModelFreeDrained,
  isAlibabaModelStudioProvider,
  mergeAlibabaFreeDrainedModels,
  rehydrateAlibabaFreeDrainedModelLocks,
} from "@omniroute/open-sse/services/alibabaFreeTier.ts";

import {
  getCodexModelScope,
  getCodexQuotaWindowFilterForModel,
  toCodexBaseQuotaWindowName,
  toCodexScopedQuotaWindowName,
} from "@omniroute/open-sse/config/codexQuotaScopes.ts";
import {
  getCodexChildCooldown,
  isCodexChildUnavailable,
  persistCodexChildCooldown,
} from "@omniroute/open-sse/services/codexAccount/index.ts";
import {
  getProviderById,
  getProviderAlias,
  resolveProviderId,
  NOAUTH_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  isSelfHostedChatProvider,
} from "@/shared/constants/providers";
import {
  isModelExcludedByConnection,
  isModelAdvertisedByConnection,
} from "@/domain/connectionModelRules";
import {
  getSyncedAvailableModelsByConnection,
  SYNCED_AVAILABLE_MODELS_MALFORMED,
  type SyncedAvailableModelsByConnection,
} from "@/lib/db/models";
import { isFreeModel } from "@/shared/utils/freeModels";
import {
  applySessionAffinityPin,
  formatSessionKeyForLog,
  isForcedConnectionMissingFromPool,
  resolveForcedConnectionForCredentialPool,
  resolveSessionAffinityTtlMs,
  selectSessionAffinityConnection,
  planSessionAffinityConnection,
  syncSessionAffinityRuntimeFields,
} from "./sessionAffinityPin";
import {
  isAnonymousFallbackDisabledBySettings,
  isNoAuthProviderBlockedBySettings,
} from "./noAuthProviderSettings";
import { resolveAccountProxiesFromRegistry } from "./noAuthProxyResolution";
import { getNoAuthHydrationProviderIds } from "./noAuthProviderSiblings";
import { loadOptionalNoAuthApiKeyCredentials } from "./noAuthOptionalApiKey";
import { getResource404Bypass } from "./requestResourceHealth";
import { isVertexConnectionWidePermissionDenied } from "./vertexErrorClassifier";
import { maybeAutoDisableBannedAccount } from "./autoDisableBannedAccount";
import * as log from "../utils/logger";
import {
  fisherYatesShuffle,
  getNextFromDeckSync,
  planNextFromDeckSync,
} from "@/shared/utils/shuffleDeck";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";
import {
  applyExclusiveConnectionLeasePolicy,
  invalidateManagedConnectionLease,
  mutateExclusiveConnectionLease,
  type CredentialLeaseSelectionContext,
} from "./exclusiveConnectionLeasePolicy";
import { readHeaderValue, type AuthRequestHeaders } from "./headerReader.ts";
import {
  getOAuthSessionAvailability,
  reserveOAuthSession,
} from "@omniroute/open-sse/services/oauthSessionOccupancy.ts";

type JsonRecord = Record<string, unknown>;
interface RecoverableConnectionState {
  connectionId: string;
  testStatus?: string | null;
  lastError?: string | null;
  rateLimitedUntil?: string | null;
  errorCode?: string | number | null;
  lastErrorType?: string | null;
  lastErrorSource?: string | null;
}
export interface CredentialSelectionOptions {
  allowSuppressedConnections?: boolean;
  allowRateLimitedConnections?: boolean;
  bypassQuotaPolicy?: boolean;
  forcedConnectionId?: string | null;
  excludeConnectionIds?: string[] | null;
  sessionKey?: string | null;
  sessionAffinityTtlMs?: number | null;
  reserveOAuthSession?: boolean;
  lease?: CredentialLeaseSelectionContext;
  materializeCredentials?: boolean;
  deferLeaseClaim?: boolean;
  /** Internal: a same-call UNIQUE retry already holds the provider/owner selection lock. */
  _leaseRetryWithLockHeld?: boolean;
  /** Internal: freeze the original policy-valid candidate set across lease race/preflight retry. */
  _leaseCandidateIds?: string[];
}
export type ExclusiveLeaseSelectionResult = {
  exclusiveLease: ExclusiveConnectionLease;
  connectionId: string;
  provider: string;
};
interface CooldownInspectionState {
  connection: ProviderConnectionView;
  connectionCooldownMs: number | null;
  codexScopeCooldownMs: number | null;
  retryableModelCooldownMs: number | null;
}
const MIN_QUOTA_THRESHOLD_PERCENT = 1;
const MAX_QUOTA_THRESHOLD_PERCENT = 100;
const NON_RETRYABLE_MODEL_LOCKOUT_REASONS = new Set(["not_found", "not_found_local"]);
// Antigravity Gemini family 429 with no parseable upstream hint: seed the backoff at
// this base. Real upstream Retry-After hints still win — they flow through
// `exactCooldownMs` (usedUpstreamRetryHint), not this base. (#5222)
const ANTIGRAVITY_FAMILY_INFERRED_BASE_COOLDOWN_MS = 30_000;
function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}
function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}
function toBooleanOrDefault(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}
function getCodexLimitPolicy(providerSpecificData: JsonRecord): {
  use5h: boolean;
  useWeekly: boolean;
} {
  const policy = asRecord(providerSpecificData.codexLimitPolicy);
  return {
    use5h: toBooleanOrDefault(policy.use5h, true),
    useWeekly: toBooleanOrDefault(policy.useWeekly, true),
  };
}
interface QuotaLimitPolicy {
  enabled: boolean;
  thresholdPercent: number;
  windows: string[];
}
interface QuotaCacheView {
  quotas?: Record<
    string,
    {
      remainingPercentage?: number;
      resetAt?: string | null;
    }
  >;
}
function normalizeQuotaThreshold(
  value: unknown,
  fallback = DEFAULT_QUOTA_THRESHOLD_PERCENT
): number {
  const parsed = toNumber(value, fallback);
  return Math.min(MAX_QUOTA_THRESHOLD_PERCENT, Math.max(MIN_QUOTA_THRESHOLD_PERCENT, parsed));
}
function normalizeWindowName(windowName: unknown): string | null {
  if (typeof windowName !== "string") return null;
  const normalized = windowName.trim().toLowerCase();
  return normalized.length > 0 ? normalized : null;
}
function uniqueWindows(windows: string[]): string[] {
  return [...new Set(windows)];
}
function normalizeCodexWindowName(windowName: unknown): string | null {
  if (typeof windowName !== "string") return null;
  const normalized = windowName.trim().toLowerCase();
  if (normalized === "session (5h)" || normalized === "5h" || normalized === "five_hour") {
    return "session";
  }
  if (normalized === "weekly (7d)" || normalized === "7d" || normalized === "seven_day") {
    return "weekly";
  }
  return toCodexBaseQuotaWindowName(normalized);
}
function applyCodexWindowPolicy(rawWindows: string[], providerSpecificData: JsonRecord): string[] {
  const codexPolicy = getCodexLimitPolicy(providerSpecificData);
  const normalizedRaw = rawWindows.map(normalizeCodexWindowName).filter(Boolean) as string[];

  // Preserve explicitly configured custom windows, but enforce canonical Codex windows
  // from toggles so weekly exhaustion is never skipped when useWeekly=true.
  let windows = [...normalizedRaw];
  windows = windows.filter((windowName) => {
    if (windowName === "session") return codexPolicy.use5h;
    if (windowName === "weekly") return codexPolicy.useWeekly;
    return true;
  });
  if (codexPolicy.use5h) windows.push("session");
  if (codexPolicy.useWeekly) windows.push("weekly");

  return uniqueWindows(windows);
}
function normalizeStatus(value: string | null): string {
  return (value || "").trim().toLowerCase();
}
function isTerminalConnectionStatus(connection: ProviderConnectionView): boolean {
  const status = normalizeStatus(connection.testStatus);
  return status === "credits_exhausted" || status === "banned" || status === "expired";
}

// OpenRouter's paid balance and its `:free`-suffixed models are billed
// separately — a 402 from a paid model call correctly locks the whole
// connection as credits_exhausted (see openrouter-quota-6842.test.ts), but
// that lock must not also block :free model requests on the same
// connection, or combo failover to the user's configured free models never
// fires. Scoped to provider === "openrouter" + status === credits_exhausted
// only; every other terminal status (banned, expired) and every other
// provider keep the unconditional exclusion.
function isTerminalConnectionStatusForModel(
  connection: ProviderConnectionView,
  provider: string,
  requestedModel: string | null
): boolean {
  if (!isTerminalConnectionStatus(connection)) return false;
  if (
    provider === "openrouter" &&
    normalizeStatus(connection.testStatus) === "credits_exhausted" &&
    requestedModel &&
    isFreeModel("openrouter", { id: requestedModel })
  ) {
    return false;
  }
  return true;
}

export function resolveQuotaLimitPolicy(
  provider: string,
  providerSpecificData: JsonRecord
): QuotaLimitPolicy {
  const rawPolicy = asRecord(providerSpecificData.limitPolicy);
  const rawWindows = Array.isArray(rawPolicy.windows) ? rawPolicy.windows : [];
  const windows = rawWindows.map(normalizeWindowName).filter(Boolean) as string[];

  if (provider === "codex") {
    const defaultWindows = applyCodexWindowPolicy(windows, providerSpecificData);
    const enabled = toBooleanOrDefault(rawPolicy.enabled, defaultWindows.length > 0);

    return {
      enabled,
      thresholdPercent: normalizeQuotaThreshold(rawPolicy.thresholdPercent),
      windows: defaultWindows,
    };
  }

  return {
    enabled: toBooleanOrDefault(rawPolicy.enabled, false),
    thresholdPercent: normalizeQuotaThreshold(rawPolicy.thresholdPercent),
    windows,
  };
}
export function evaluateQuotaLimitPolicy(
  provider: string,
  connection: ProviderConnectionView,
  requestedModel: string | null = null
): { blocked: boolean; reasons: string[]; resetAt: string | null } {
  const policy = resolveQuotaLimitPolicy(provider, connection.providerSpecificData);
  if (!policy.enabled || policy.windows.length === 0) {
    return { blocked: false, reasons: [], resetAt: null };
  }

  const reasons: string[] = [];
  const resetCandidates: Array<string | null> = [];

  for (const windowName of policy.windows) {
    const effectiveWindowName =
      provider === "codex" ? toCodexScopedQuotaWindowName(windowName, requestedModel) : windowName;
    const status = getQuotaWindowStatus(
      connection.id,
      effectiveWindowName,
      policy.thresholdPercent
    );
    if (!status?.reachedThreshold) continue;
    reasons.push(`${effectiveWindowName} usage ${Math.round(status.usedPercentage)}%`);
    resetCandidates.push(status.resetAt);
  }

  return {
    blocked: reasons.length > 0,
    reasons,
    resetAt: getEarliestFutureDate(resetCandidates),
  };
}
function parseFutureDateMs(value: string | null): number | null {
  if (!value) return null;
  // Tolerate numeric-epoch strings (e.g. "1781696905131.0") as well as ISO
  // strings — the rate_limited_until TEXT column can hold either (#3954).
  const ms = cooldownUntilMs(value);
  if (!Number.isFinite(ms) || ms <= Date.now()) return null;
  return ms;
}
function getEarliestFutureDate(candidates: Array<string | null>): string | null {
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
function getCachedQuotaResetAt(connectionId: string): string | null {
  const entry = getQuotaCache(connectionId);
  if (!entry?.quotas) return null;
  return getEarliestFutureDate(Object.values(entry.quotas).map((quota) => quota.resetAt));
}
function isRetryableModelLockoutReason(reason: unknown): boolean {
  return typeof reason === "string" && reason.length > 0
    ? !NON_RETRYABLE_MODEL_LOCKOUT_REASONS.has(reason)
    : false;
}
function pushClampedPercentage(percentages: number[], value: number): void {
  if (Number.isFinite(value)) {
    percentages.push(Math.max(0, Math.min(100, value)));
  }
}
function isResetAtInPast(resetAt: string | null): boolean {
  if (!resetAt) return false;
  const resetMs = new Date(resetAt).getTime();
  return Number.isFinite(resetMs) && resetMs <= Date.now();
}
function collectPolicyQuotaHeadroomPercentages(
  provider: string,
  connection: ProviderConnectionView,
  policy: QuotaLimitPolicy,
  requestedModel: string | null
): number[] {
  const percentages: number[] = [];
  const seenWindows = new Set<string>();

  for (const windowName of policy.windows) {
    const scopedWindow =
      provider === "codex" ? toCodexScopedQuotaWindowName(windowName, requestedModel) : windowName;
    const normalizedWindow = normalizeWindowName(scopedWindow);
    if (!normalizedWindow || seenWindows.has(normalizedWindow)) continue;
    seenWindows.add(normalizedWindow);

    const status = getQuotaWindowStatus(connection.id, normalizedWindow, policy.thresholdPercent);
    if (status) pushClampedPercentage(percentages, status.remainingPercentage);
  }

  return percentages;
}
function collectCachedQuotaHeadroomPercentages(
  provider: string,
  connection: ProviderConnectionView,
  requestedModel: string | null
): number[] {
  const quotaEntry = getQuotaCache(connection.id) as QuotaCacheView | null;
  const rawQuotas = quotaEntry?.quotas || {};
  const codexWindowFilter =
    provider === "codex" ? getCodexQuotaWindowFilterForModel(requestedModel) : undefined;
  const percentages: number[] = [];

  for (const [quotaName, quota] of Object.entries(rawQuotas)) {
    if (codexWindowFilter && !codexWindowFilter(quotaName)) continue;
    if (!quota || isResetAtInPast(toStringOrNull(quota.resetAt))) continue;
    pushClampedPercentage(percentages, toNumber(quota.remainingPercentage, Number.NaN));
  }

  return percentages;
}
function getConnectionQuotaHeadroomPercent(
  provider: string,
  connection: ProviderConnectionView,
  requestedModel: string | null = null
): number | null {
  const policy = resolveQuotaLimitPolicy(provider, connection.providerSpecificData);
  const policyPercentages = collectPolicyQuotaHeadroomPercentages(
    provider,
    connection,
    policy,
    requestedModel
  );
  const percentages =
    policyPercentages.length > 0
      ? policyPercentages
      : collectCachedQuotaHeadroomPercentages(provider, connection, requestedModel);

  return percentages.length > 0 ? Math.min(...percentages) : null;
}
function getConnectionErrorPenalty(connection: ProviderConnectionView): number {
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
function getConnectionRecencyPenalty(connection: ProviderConnectionView): number {
  if (!connection.lastUsedAt) return 0;
  const ageMs = Date.now() - new Date(connection.lastUsedAt).getTime();
  if (!Number.isFinite(ageMs)) return 0;
  if (ageMs < 15_000) return 3;
  if (ageMs < 60_000) return 2;
  if (ageMs < 5 * 60_000) return 1;
  return 0;
}
function getP2CConnectionScore(
  provider: string,
  connection: ProviderConnectionView,
  requestedModel: string | null = null,
  quotaResults?: Map<string, { blocked: boolean; exhausted: boolean }>
): { score: number; quotaHeadroomPercent: number | null } {
  let quotaBlocked: boolean;
  let quotaExhausted: boolean;

  if (connection.id && quotaResults?.has(connection.id)) {
    const cached = quotaResults.get(connection.id)!;
    quotaBlocked = cached.blocked;
    quotaExhausted = cached.exhausted;
  } else {
    quotaBlocked = evaluateQuotaLimitPolicy(provider, connection, requestedModel).blocked;
    quotaExhausted = isQuotaExhaustedForRequest(connection.id, provider, requestedModel);
  }

  const quotaHeadroomPercent = getConnectionQuotaHeadroomPercent(
    provider,
    connection,
    requestedModel
  );

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
function compareP2CConnections(
  provider: string,
  a: ProviderConnectionView,
  b: ProviderConnectionView,
  requestedModel: string | null = null,
  quotaResults?: Map<string, { blocked: boolean; exhausted: boolean }>
): number {
  const aScore = getP2CConnectionScore(provider, a, requestedModel, quotaResults);
  const bScore = getP2CConnectionScore(provider, b, requestedModel, quotaResults);
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

/**
 * Sentinel connection id used for the synthetic credentials of no-auth /
 * keyless providers. It is NOT a real DB row, so it
 * cannot carry cooldown state — the account-fallback loop must be able to
 * exclude it (#3061), otherwise it gets re-selected forever.
 */
const SYNTHETIC_NOAUTH_CONNECTION_ID = "noauth";
type AnonymousFallbackProviderDefinition = {
  anonymousFallback?: boolean;
  noAuth?: boolean;
};
function buildSyntheticNoAuthCredentials(providerSpecificData: JsonRecord = {}): {
  authType: "none";
  apiKey: null;
  accessToken: null;
  refreshToken: null;
  expiresAt: null;
  projectId: null;
  defaultModel: null;
  copilotToken: null;
  providerSpecificData: JsonRecord;
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
    authType: "none",
    apiKey: null,
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    projectId: null,
    defaultModel: null,
    copilotToken: null,
    providerSpecificData,
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

/** Merge one connection's fingerprints/accountProxies into `hydrated`, first-wins. */
function mergeNoAuthProviderSpecificData(
  hydrated: JsonRecord,
  conn: { providerSpecificData?: unknown }
): void {
  const psd = conn.providerSpecificData;
  if (!psd || typeof psd !== "object") return;
  const record = psd as JsonRecord;
  if (Array.isArray(record.fingerprints) && !Array.isArray(hydrated.fingerprints)) {
    hydrated.fingerprints = record.fingerprints;
  }
  if (Array.isArray(record.accountProxies) && !Array.isArray(hydrated.accountProxies)) {
    hydrated.accountProxies = record.accountProxies;
  }
}

/**
 * #4954 / #5217 (Gap 1) — no-auth providers persist a connection row whose
 * `providerSpecificData` carries `fingerprints` + `accountProxies`. Hydrate those
 * and resolve by-id Proxy Pool references to live records (./noAuthProxyResolution)
 * so the executor gets a resolved inline `proxy`. Best-effort: failures → empty.
 *
 * #7993: also checks sibling ids (e.g. "opencode-zen" -> "opencode") so a
 * proxy/fingerprint row saved under the no-auth id is still found when
 * credentials are hydrated for the apikey-gateway id that shares its public
 * endpoint.
 */
async function loadNoAuthProviderSpecificData(providerId: string): Promise<JsonRecord> {
  try {
    const providerIdsToQuery = getNoAuthHydrationProviderIds(providerId);
    const hydrated: JsonRecord = {};
    for (const pid of providerIdsToQuery) {
      const connectionsRaw = await getProviderConnections({ provider: pid });
      const connections = (Array.isArray(connectionsRaw) ? connectionsRaw : []).map(
        toProviderConnection
      );
      for (const conn of connections) mergeNoAuthProviderSpecificData(hydrated, conn);
    }
    if (Array.isArray(hydrated.accountProxies)) {
      hydrated.accountProxies = await resolveAccountProxiesFromRegistry(hydrated.accountProxies);
    }
    return hydrated;
  } catch {
    return {};
  }
}
function providerCanUseSyntheticNoAuthFallback(providerId: string): boolean {
  const providerDef = getProviderById(providerId) as
    AnonymousFallbackProviderDefinition | undefined;
  const noAuthProviderDef = (
    NOAUTH_PROVIDERS as Record<string, AnonymousFallbackProviderDefinition | undefined>
  )[providerId];
  const webCookieProviderDef = (
    WEB_COOKIE_PROVIDERS as Record<string, AnonymousFallbackProviderDefinition | undefined>
  )[providerId];
  return (
    providerDef?.anonymousFallback === true ||
    noAuthProviderDef?.noAuth === true ||
    webCookieProviderDef?.noAuth === true
  );
}

/**
 * True only for API-key gateway providers whose synthetic anonymous fallback
 * eligibility comes from `anonymousFallback: true` on the static definition —
 * NOT for true no-auth providers (NOAUTH_PROVIDERS / WEB_COOKIE_PROVIDERS),
 * where the synthetic credential is the only credential path (blockedProviders
 * is the disable mechanism for those). `noAuthFallbackDisabledProviders` gates
 * exactly this subset.
 */
function isAnonymousFallbackOnlyProvider(providerId: string): boolean {
  const providerDef = getProviderById(providerId) as
    AnonymousFallbackProviderDefinition | undefined;
  const noAuthProviderDef = (
    NOAUTH_PROVIDERS as Record<string, AnonymousFallbackProviderDefinition | undefined>
  )[providerId];
  const webCookieProviderDef = (
    WEB_COOKIE_PROVIDERS as Record<string, AnonymousFallbackProviderDefinition | undefined>
  )[providerId];
  return (
    providerDef?.anonymousFallback === true &&
    noAuthProviderDef?.noAuth !== true &&
    webCookieProviderDef?.noAuth !== true
  );
}
async function maybeSyntheticNoAuthFallback(
  providerId: string,
  excludedConnectionIds: Set<string>,
  allowedConnections: string[] | null = null
) {
  if (!providerCanUseSyntheticNoAuthFallback(providerId)) return null;
  // #9057: a key pinned to specific connections via allowedConnections must
  // NOT receive the synthetic "noauth" connection — the synthetic id is
  // never in an explicit allowlist, so returning it would let a restricted
  // key reach free providers (OpenCode Free, etc.) that it should not access.
  if (Array.isArray(allowedConnections) && allowedConnections.length > 0) return null;
  if (excludedConnectionIds.has(SYNTHETIC_NOAUTH_CONNECTION_ID)) return null;
  if (
    isAnonymousFallbackOnlyProvider(providerId) &&
    (await isAnonymousFallbackDisabledBySettings(providerId))
  ) {
    log.info("AUTH", `${providerId} | anonymous no-auth fallback disabled by settings`);
    return null;
  }
  // #4954: hydrate per-account proxy/rotation config off the connection row so
  // no-auth executors (opencode, mimocode) actually honor configured proxies.
  const providerSpecificData = await loadNoAuthProviderSpecificData(providerId);
  return buildSyntheticNoAuthCredentials(providerSpecificData);
}
function normalizeExcludedConnectionIds(
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
function formatConnectionPrefixesForLog(ids: Iterable<string>, max = 6): string {
  const prefixes = Array.from(ids)
    .filter((id) => typeof id === "string" && id.length > 0)
    .slice(0, max)
    .map((id) => `${id.slice(0, 8)}...`);
  return prefixes.length > 0 ? prefixes.join(",") : "none";
}
function buildPeakHourProtectionRateLimitedResult(
  provider: string,
  blockedByPeakHour: Array<{
    id: string;
    retryAfter: string;
    windowSummary: string;
  }>
) {
  const retryAfter =
    getEarliestFutureDate(blockedByPeakHour.map((entry) => entry.retryAfter)) ||
    new Date(Date.now() + 5 * 60 * 1000).toISOString();
  const blockedSummary = blockedByPeakHour
    .map((entry) => `${entry.id.slice(0, 8)}(${entry.windowSummary})`)
    .join("; ");

  log.info("AUTH", `${provider} | peak-hour protection filtered account(s): ${blockedSummary}`);

  return {
    allRateLimited: true,
    retryAfter,
    retryAfterHuman: formatRetryAfter(retryAfter),
    lastError: `All ${provider} accounts blocked by peak-hour protection`,
    lastErrorCode: 429,
  };
}

function buildQuotaPreflightRateLimitedResult(
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

// Provider-scoped mutexes prevent race conditions during account selection without
// serializing unrelated providers behind a single global lock.
const selectionMutexes = new Map<string, Promise<void>>();
function getSelectionMutexKey(provider: string, options: CredentialSelectionOptions): string {
  return [
    resolveProviderId(provider) || provider,
    options.forcedConnectionId ? `forced:${options.forcedConnectionId}` : "pool",
    options.lease ? `lease:${hashLeaseOwnerId(options.lease.context.leaseOwnerId)}` : "unmanaged",
  ].join(":");
}
function createSelectionLock(key: string) {
  const currentMutex = selectionMutexes.get(key) ?? Promise.resolve();
  let resolveMutex: (() => void) | undefined;
  const nextMutex = new Promise<void>((resolve) => {
    resolveMutex = resolve;
  });
  selectionMutexes.set(key, nextMutex);

  return {
    wait: currentMutex,
    release: () => {
      resolveMutex?.();
      if (selectionMutexes.get(key) === nextMutex) {
        selectionMutexes.delete(key);
      }
    },
  };
}

// ─── Anti-Thundering Herd: per-connection mutex for markAccountUnavailable ───
// Prevents multiple concurrent requests from marking the same connection
// unavailable in parallel, which was the root cause of cascading 502 lockouts.
const markMutexes = new Map<string, Promise<void>>();

// Strict-Random shuffle deck moved to src/shared/utils/shuffleDeck.ts
// auth.ts uses getNextFromDeckSync inside the provider-scoped selection mutex.
// Re-export for backwards compat with existing test imports.
export { fisherYatesShuffle, getNextFromDeckSync as getNextFromDeck };
// Re-export readHeaderValue and AuthRequestHeaders from headerReader.ts for
// backwards compat with existing imports (e.g. googApiKeyAuth.ts).
export { readHeaderValue, type AuthRequestHeaders } from "./headerReader.ts";
export { extractSessionAffinityKey } from "./sessionAffinityPin";
const PROVIDER_SEARCH_PAIRS: string[][] = [
  ["nvidia", "nvidia_nim"],
  ["kimi-coding", "kimi-coding-apikey"],
  // The model layer canonicalizes `agy/` to `antigravity`, but the Antigravity
  // CLI card stores its connection under `agy`. Same account, either id serves.
  ["antigravity", "agy"],
  // OpenCode connection card stores under `opencode`, but model alias resolves to `opencode-zen`.
  ["opencode", "opencode-zen"],
  // One Jina token works on api.jina.ai, r.jina.ai, and s.jina.ai.
  // Requested id stays first so embed/rerank do not silently pick a
  // Reader-only row when both cards are filled. jina-search has no
  // dashboard card — it must still see jina-ai / jina-reader keys
  // before falling through to JINA_AI_API_KEY.
  ["jina-ai", "jina-reader", "jina-search"],
];
/** Resolve provider aliases (e.g., nvidia -> nvidia_nim) for DB lookup. */
async function getProviderSearchPool(provider: string): Promise<string[]> {
  const canonicalProvider = resolveProviderId(provider);
  const canonicalAlias = getProviderAlias(canonicalProvider);
  if (isCommonChatGptWebRetiredProviderId(provider)) return [];
  const group = PROVIDER_SEARCH_PAIRS.find((aliases) => aliases.includes(provider));
  if (group) return [provider, ...group.filter((id) => id !== provider)];

  const searchPool = new Set([provider, canonicalProvider, canonicalAlias].filter(Boolean));

  // Built-in providers already resolve through static ids/aliases. Only
  // compatible/custom providers need provider_nodes expansion back to the
  // generated internal connection ids. (#3058)
  if (getProviderById(canonicalProvider)) {
    return Array.from(searchPool);
  }

  // Custom provider nodes are referenced by user-facing prefixes in combos
  // (for example "78code/gpt-5.4"), but live credentials are stored under
  // internal provider ids like openai-compatible-responses-<uuid>.
  try {
    const providerNodes = await getCachedProviderNodes();
    const compatibleNodes = Array.isArray(providerNodes) ? providerNodes : [];
    const nodeTypes = new Map<string, number>();
    for (const node of compatibleNodes) {
      const nodeRecord = asRecord(node);
      const nodeId = typeof nodeRecord.id === "string" ? nodeRecord.id.trim() : "";
      if (!nodeId) continue;
      const derivedType = nodeTypeFromId(nodeId);
      nodeTypes.set(derivedType, (nodeTypes.get(derivedType) || 0) + 1);
    }

    for (const node of compatibleNodes) {
      const nodeRecord = asRecord(node);
      const nodePrefix = typeof nodeRecord.prefix === "string" ? nodeRecord.prefix.trim() : "";
      const nodeId = typeof nodeRecord.id === "string" ? nodeRecord.id.trim() : "";
      if (!nodeId) continue;
      if (
        nodePrefix &&
        (nodePrefix === provider ||
          nodePrefix === canonicalProvider ||
          nodePrefix === canonicalAlias)
      ) {
        searchPool.add(nodeId);
      }

      // #10085: bridge the concrete uuid node id (what the chat path resolves,
      // "<generic-type>-<uuid>") to the GENERIC derived type id (what
      // resolveProviderNodeForConnection also accepts for connection creation,
      // #4421) -- and back. A connection created via the bare generic type
      // (e.g. "openai-compatible-chat") must still be found when the chat path
      // looks up the concrete node id, and vice versa.
      //
      // #10434: both bridging directions MUST require the derived type to be
      // unambiguous (exactly one provider node of that type) before falling
      // back to a generic-type match -- an explicit ownership check, not just
      // a string-format coincidence. This mirrors the exact rule already
      // enforced by selectProviderNodeForConnection() for connection CREATION
      // (src/lib/db/providerNodeSelect.ts, #4421): "only when exactly one such
      // node exists, so an ambiguous type never silently picks the wrong
      // node". Without this guard on the generic->concrete direction, a bare
      // generic-type lookup would pool in EVERY node sharing that derived
      // type, including a connection scoped (via its own providerSpecificData
      // baseUrl/headers) to one specific node -- leaking that node's
      // credentials/upstream URL into a lookup for a different, unrelated
      // node of the same generic type.
      const derivedType = nodeTypeFromId(nodeId);
      if (derivedType && derivedType !== nodeId) {
        const typeIsUnambiguous = nodeTypes.get(derivedType) === 1;
        if (typeIsUnambiguous) {
          if (nodeId === provider || nodeId === canonicalProvider || nodeId === canonicalAlias) {
            searchPool.add(derivedType);
          }
          if (
            derivedType === provider ||
            derivedType === canonicalProvider ||
            derivedType === canonicalAlias
          ) {
            searchPool.add(nodeId);
          }
        }
      }
    }
  } catch {
    // Best-effort alias expansion only.
  }

  return Array.from(searchPool);
}

function invalidateManagedLease(
  options: CredentialSelectionOptions,
  reason: Parameters<typeof invalidateManagedConnectionLease>[1]
) {
  invalidateManagedConnectionLease(options.lease, reason);
}

type DeferredLeaseSelection = {
  commitSelectionSideEffects?: () => Promise<void> | void;
  selectNextLeaseCandidate?: (excludedConnectionId: string) => Promise<unknown>;
};

function planLastUsedCommit(
  connection: ProviderConnectionView,
  connections: ProviderConnectionView[],
  count: number
) {
  const now = new Date().toISOString();
  return async () => {
    await touchConnectionLastUsed(connection.id, count);
    connection.lastUsedAt = now;
    connection.consecutiveUseCount = count;
    syncSessionAffinityRuntimeFields(connections, connection);
  };
}

/**
 * Resolve Proxy Pool references on a real connection row at the same boundary
 * where credentials become request-ready. The synthetic no-auth fallback above
 * already performs this hydration, but a persisted connection (for example the
 * OpenCode card's `opencode` row selected through the `opencode-zen` alias)
 * bypasses that fallback. Keep inline/legacy entries untouched and only incur a
 * registry lookup when at least one by-id reference is present.
 */
async function hydrateAccountProxyReferences(
  providerSpecificData: JsonRecord
): Promise<JsonRecord> {
  const entries = providerSpecificData.accountProxies;
  if (!Array.isArray(entries)) return providerSpecificData;

  const containsProxyReference = entries.some((entry) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return false;
    const proxyId = (entry as Record<string, unknown>).proxyId;
    return typeof proxyId === "string" && proxyId.trim().length > 0;
  });
  if (!containsProxyReference) return providerSpecificData;

  return {
    ...providerSpecificData,
    accountProxies: await resolveAccountProxiesFromRegistry(entries),
  };
}

async function materializeConnection(
  connection: ProviderConnectionView,
  options: CredentialSelectionOptions,
  extra: DeferredLeaseSelection & { exclusiveLease?: ExclusiveConnectionLease } = {}
) {
  const providerSpecificData = await hydrateAccountProxyReferences(connection.providerSpecificData);
  const apiKeyHealth = providerSpecificData.apiKeyHealth as Record<string, KeyHealth> | undefined;
  if (apiKeyHealth) syncHealthFromDB(connection.id, apiKeyHealth);
  const releaseOAuthSession =
    options.reserveOAuthSession === true && connection.authType === "oauth" && options.sessionKey
      ? reserveOAuthSession(connection.id, options.sessionKey)
      : undefined;
  return {
    apiKey: connection.apiKey,
    accessToken: connection.accessToken,
    refreshToken: connection.refreshToken,
    expiresAt: connection.tokenExpiresAt || connection.expiresAt || null,
    projectId: connection.projectId,
    defaultModel: connection.defaultModel || null,
    copilotToken:
      typeof providerSpecificData.copilotToken === "string"
        ? providerSpecificData.copilotToken
        : null,
    providerSpecificData,
    id: connection.id,
    provider: connection.provider,
    authType: connection.authType,
    email: connection.email,
    connectionId: connection.id,
    testStatus: connection.testStatus,
    lastError: connection.lastError,
    lastErrorType: connection.lastErrorType,
    lastErrorSource: connection.lastErrorSource,
    errorCode: connection.errorCode,
    rateLimitedUntil: connection.rateLimitedUntil,
    maxConcurrent: connection.maxConcurrent,
    quotaWindowThresholds: connection.quotaWindowThresholds ?? null,
    ...(releaseOAuthSession ? { releaseOAuthSession } : {}),
    ...extra,
  };
}

/**
 * #11089: load the per-connection synced model inventory for self-hosted chat
 * providers so connection selection can drop hosts that never advertised the
 * requested model.
 *
 * Scoped to SELF_HOSTED_CHAT_PROVIDER_IDS: those are the providers where one
 * provider id fans out to several independent hosts with genuinely different
 * inventories. Hosted providers share one catalog per provider, so filtering
 * there would only add a DB read.
 *
 * Returns an empty map (= no filtering) when there is no model to match, when
 * no candidate is self-hosted, or when the persisted rows are malformed — a
 * partial read must never silently shrink the pool.
 */
async function loadAdvertisedModelsForSelfHostedConnections(
  connections: ProviderConnectionView[],
  requestedModel: string | null
): Promise<Map<string, Set<string>>> {
  const advertised = new Map<string, Set<string>>();
  if (!requestedModel) return advertised;

  const selfHostedProviders = new Set(
    connections
      .map((c) => c.provider)
      .filter((p): p is string => typeof p === "string" && isSelfHostedChatProvider(p))
  );
  if (selfHostedProviders.size === 0) return advertised;

  await Promise.all(
    [...selfHostedProviders].map(async (providerId) => {
      let byConnection: SyncedAvailableModelsByConnection;
      try {
        byConnection = await getSyncedAvailableModelsByConnection(providerId);
      } catch {
        return;
      }
      // Malformed persisted rows: fail open for the whole provider.
      if (byConnection[SYNCED_AVAILABLE_MODELS_MALFORMED]) return;
      for (const [connectionId, models] of Object.entries(byConnection)) {
        if (!Array.isArray(models) || models.length === 0) continue;
        advertised.set(connectionId, new Set(models.map((m) => m.id)));
      }
    })
  );

  return advertised;
}

/**
 * Get provider credentials from localDb
 * Filters out unavailable accounts and returns the selected account based on strategy
 * @param {string} provider - Provider name
 * @param {string|null} excludeConnectionId - Connection ID to exclude (for retry with next account)
 */
export async function getProviderCredentials(
  provider: string,
  excludeConnectionId: string | null = null,
  allowedConnections: string[] | null = null,
  requestedModel: string | null = null,
  options: CredentialSelectionOptions = {}
) {
  if (isMicrosoftDesignerWebRetiredProviderId(provider)) {
    invalidateManagedLease(options, "AUTHORIZATION_CHANGED");
    log.warn("AUTH", "Retired provider credential selection denied");
    return null;
  }

  if (isRuntimeRetiredProviderId(provider)) {
    invalidateManagedLease(options, "CONNECTION_INELIGIBLE");
    log.warn("AUTH", "Retired provider rejected before credential selection");
    return null;
  }

  const selectionLock = options._leaseRetryWithLockHeld
    ? null
    : createSelectionLock(getSelectionMutexKey(provider, options));

  try {
    await selectionLock?.wait;

    // No-auth providers (e.g. opencode) need no DB connection — return synthetic credentials
    // so the executor receives a valid credentials object without auth headers being added.
    const resolvedId = resolveProviderId(provider);
    const providerMaps: Record<string, { noAuth?: boolean } | undefined>[] = [
      NOAUTH_PROVIDERS as Record<string, { noAuth?: boolean } | undefined>,
      WEB_COOKIE_PROVIDERS as Record<string, { noAuth?: boolean } | undefined>,
    ];
    if (providerMaps.some((map) => map[resolvedId]?.noAuth)) {
      if (await isNoAuthProviderBlockedBySettings(resolvedId)) return null;
      // #3061: there is only one synthetic "noauth" connection for a no-auth
      // provider. If the caller already tried and excluded it (account-fallback
      // after a persistent upstream error), do NOT hand it back — that would let
      // the chat fallback loop re-select "noauth" forever (no real DB row → no
      // cooldown to brake it), writing logs every iteration until the disk fills.
      // Returning null here lets the handler stop after a single attempt.
      const excludedForNoAuth = normalizeExcludedConnectionIds(
        excludeConnectionId,
        options.excludeConnectionIds
      );
      const optionalKey = await loadOptionalNoAuthApiKeyCredentials(resolvedId, excludedForNoAuth);
      if (
        optionalKey &&
        (!allowedConnections ||
          allowedConnections.length === 0 ||
          allowedConnections.includes(optionalKey.connectionId))
      ) {
        return optionalKey;
      }
      // #9057: when allowedConnections is set, the synthetic "noauth" connection
      // is never in the explicit allowlist, so we must NOT return it — fall through
      // to the normal connection-selection path so the connection allowlist is
      // respected (the no-auth provider will be rejected if it has no real connections
      // matching the allowlist, or a real connection row will be selected if present).
      if (!allowedConnections || allowedConnections.length === 0) {
        return await maybeSyntheticNoAuthFallback(resolvedId, excludedForNoAuth);
      }
    }

    const allowSuppressedConnections = options.allowSuppressedConnections === true;
    const allowRateLimitedConnections =
      allowSuppressedConnections || options.allowRateLimitedConnections === true;
    const bypassQuotaPolicy = options.bypassQuotaPolicy === true;
    let forcedConnectionId =
      typeof options.forcedConnectionId === "string" && options.forcedConnectionId.trim().length > 0
        ? options.forcedConnectionId.trim()
        : null;
    const excludedConnectionIds = normalizeExcludedConnectionIds(
      excludeConnectionId,
      options.excludeConnectionIds
    );

    // Fetched early so the session-affinity-pin override (#5903) can consult
    // the TTL before forcedConnectionId narrows the connection pool.
    const settings = await getSettings();
    const sessionAffinityTtlMs = resolveSessionAffinityTtlMs(provider, options, settings);

    // Fix #922: Check for aliases (nvidia/nvidia_nim) to ensure credentials are found
    const providersToSearch = await getProviderSearchPool(provider);
    const connectionResults = await Promise.all(
      providersToSearch.map((p) => getCachedRawProviderConnections({ provider: p, isActive: true }))
    );
    const connectionsRaw = connectionResults.filter(Array.isArray).flat();

    let connections = (Array.isArray(connectionsRaw) ? connectionsRaw : [])
      .map(createLazyConnectionView)
      .filter((conn) => conn.id.length > 0);
    if (isAlibabaModelStudioProvider(provider)) {
      for (const conn of connections) {
        rehydrateAlibabaFreeDrainedModelLocks(
          provider,
          conn.id,
          conn.providerSpecificData as Record<string, unknown>
        );
      }
    }
    rehydrateAntigravityFamilyLocksForConnections(provider, connections);
    // allowedConnections: restrict to specific connection IDs (from API key policy, #363)
    if (allowedConnections && allowedConnections.length > 0) {
      connections = connections.filter((conn) => allowedConnections.includes(conn.id));
    }
    const forcedConnectionEligible = connections.some((conn) => conn.id === forcedConnectionId);
    if (options.lease && forcedConnectionId && !forcedConnectionEligible) return null;
    if (options.lease?.mode === "request" && forcedConnectionId) {
      const activeLease = getActiveExclusiveConnectionLease(options.lease.context.leaseOwnerId);
      if (activeLease && activeLease.connectionId !== forcedConnectionId) {
        return { leaseConnectionMismatch: true };
      }
    }

    const isCodexScopeUnavailable = (
      connection: ProviderConnectionView,
      model: string | null
    ): boolean => provider === "codex" && isCodexChildUnavailable(connection, model);

    // #5903: an active session-affinity pin outranks a per-request reset-aware
    // forcedConnectionId (see sessionAffinityPin leaf for the full rationale).
    if (!options.lease) {
      forcedConnectionId =
        applySessionAffinityPin({
          forcedConnectionId,
          options,
          sessionAffinityTtlMs,
          connections,
          provider,
          requestedModel,
          excludedConnectionIds,
          isTerminalConnectionStatus,
          isCodexScopeUnavailable,
          isQuotaPolicyBlocked: (c) =>
            evaluateQuotaLimitPolicy(provider, c as ProviderConnectionView, requestedModel).blocked,
        }) ?? forcedConnectionId;
    }

    // A forced connection (combo step `connectionId` / `x-omniroute-connection`) is an
    // operator instruction, not a suggestion. resolveForcedConnectionForCredentialPool()
    // legitimately returns null for several *intentional* pin-release cases (forced ID
    // already in excludedConnectionIds after a failed attempt, cooldown, quota exhaustion,
    // quota-policy block) — those must keep degrading to normal sibling fallback, unchanged.
    // The bug is narrower: the forced connection was requested, was NOT intentionally
    // excluded, and simply is not present in the current active/allowed pool at all (e.g.
    // an operator deactivated it). Detect exactly that case *before* calling the resolver,
    // so it never gets folded in with the intentional-release cases above.
    if (isForcedConnectionMissingFromPool(forcedConnectionId, excludedConnectionIds, connections)) {
      // Route through the existing "target has no eligible credentials" recoverable path
      // (the connections.length === 0 branch just below) instead of falling through to the
      // full active pool. That path already returns null/CONNECTION_INELIGIBLE, which the
      // chat handler turns into a 404 for combo requests so the combo loop advances to its
      // next target — the same mechanism a whole disabled provider already relies on.
      connections = [];
    } else {
      forcedConnectionId = resolveForcedConnectionForCredentialPool({
        forcedConnectionId,
        excludedConnectionIds,
        connections,
        allowRateLimitedConnections,
        bypassQuotaPolicy,
        isQuotaExhausted: (connectionId) =>
          isQuotaExhaustedForRequest(connectionId, provider, requestedModel),
        isQuotaPolicyBlocked: (connection) =>
          evaluateQuotaLimitPolicy(provider, connection as ProviderConnectionView, requestedModel)
            .blocked,
      });

      if (forcedConnectionId) {
        connections = connections.filter((conn) => conn.id === forcedConnectionId);
      }
    }
    const activeConnectionsCount = connections.length;
    const rawConnectionsCount = connectionsRaw.length;
    const blockedByForcedConnection = forcedConnectionId
      ? rawConnectionsCount - connections.length
      : 0;
    const blockedByAllowedConnections =
      allowedConnections && allowedConnections.length > 0
        ? Math.max(0, rawConnectionsCount - connections.length - blockedByForcedConnection)
        : 0;
    const forcedIdForLog = forcedConnectionId ? `${forcedConnectionId.slice(0, 8)}...` : "none";

    log.debug(
      "AUTH",
      `${provider} | active=${activeConnectionsCount}, excluded=${excludedConnectionIds.size} (${formatConnectionPrefixesForLog(excludedConnectionIds)}), forcedId=${forcedIdForLog}, blocked_forced=${blockedByForcedConnection}, blocked_allowed=${blockedByAllowedConnections}`
    );
    if (provider === "antigravity" && (forcedConnectionId || allowedConnections?.length)) {
      const reasons: string[] = [];
      if (forcedConnectionId) reasons.push(`forcedConnectionId kept ${connections.length}`);
      if (allowedConnections?.length) {
        reasons.push(`allowedConnections=${allowedConnections.length}`);
      }
      log.info("AUTH", `${provider} selection constrained: ${reasons.join(", ")}`);
    }

    if (connections.length === 0) {
      // Check all connections (including inactive) to see if rate limited
      // Fix #922: Also search aliases here
      const allConnectionsResults = await Promise.all(
        providersToSearch.map((p) => getProviderConnections({ provider: p }))
      );
      let allConnections = (allConnectionsResults.filter(Array.isArray).flat() as unknown[])
        .map(toProviderConnection)
        .filter((conn) => conn.id.length > 0);
      if (allowedConnections && allowedConnections.length > 0) {
        allConnections = allConnections.filter((conn) => allowedConnections.includes(conn.id));
      }
      if (forcedConnectionId) {
        allConnections = allConnections.filter((conn) => conn.id === forcedConnectionId);
      }
      log.debug("AUTH", `${provider} | all connections (incl inactive): ${allConnections.length}`);
      if (allConnections.length > 0) {
        const earliest = getEarliestRateLimitedUntil(allConnections);
        if (earliest) {
          log.warn(
            "AUTH",
            `${provider} | all ${allConnections.length} accounts rate limited (${formatRetryAfter(earliest)})`
          );
          invalidateManagedLease(options, "HEALTH_OR_COOLDOWN");
          return {
            allRateLimited: true,
            retryAfter: earliest,
            retryAfterHuman: formatRetryAfter(earliest),
          };
        }
        log.debug("AUTH", `${provider} | ${allConnections.length} accounts found but none active`);
        allConnections.forEach((c) => {
          log.debug(
            "AUTH",
            `  → ${c.id?.slice(0, 8)} | isActive=${c.isActive} | rateLimitedUntil=${c.rateLimitedUntil || "none"} | testStatus=${c.testStatus}`
          );
        });

        // If every existing connection is in a terminal state (expired/banned/
        // credits_exhausted), surface that as a re-auth signal instead of the
        // generic "No credentials" 400. The classic case is AWS SSO/Kiro
        // refresh tokens hitting their 90-day TTL: all connections flip to
        // is_active=0 with testStatus=banned|expired, and without this branch
        // the dashboard sees a misleading "bad_request" code.
        const terminalConnections = allConnections.filter(isTerminalConnectionStatus);
        if (terminalConnections.length === allConnections.length) {
          invalidateManagedLease(options, "AUTHORIZATION_CHANGED");
          const syntheticFallback = await maybeSyntheticNoAuthFallback(
            resolvedId,
            excludedConnectionIds,
            allowedConnections
          );
          if (syntheticFallback) return syntheticFallback;
          return buildAllExpiredCredentials(terminalConnections);
        }
      }
      const syntheticFallback = await maybeSyntheticNoAuthFallback(
        resolvedId,
        excludedConnectionIds,
        allowedConnections
      );
      if (syntheticFallback) return syntheticFallback;
      const jinaEnvCredentials = buildJinaEnvCredentials(resolvedId, {
        forcedConnectionId,
        allowedConnections,
        excludedConnectionIds,
      });
      if (jinaEnvCredentials) {
        log.info("AUTH", `${provider} | using ${jinaEnvCredentials.connectionId} env fallback`);
        return jinaEnvCredentials;
      }
      const geminiEnvCredentials = buildGeminiEnvCredentials(resolvedId, {
        forcedConnectionId,
        allowedConnections,
        excludedConnectionIds,
      });
      if (geminiEnvCredentials) {
        log.info("AUTH", `${provider} | using ${geminiEnvCredentials.connectionId} env fallback`);
        return geminiEnvCredentials;
      }
      invalidateManagedLease(options, "CONNECTION_INELIGIBLE");
      log.debug("AUTH", `No credentials for ${provider}`);
      return null;
    }

    // Auto-decay backoffLevel for accounts whose rateLimitedUntil has passed.
    // Without this, high backoffLevel permanently deprioritizes accounts even
    // after the rate limit window expires, creating a deadlock where the account
    // needs a successful request to reset but never gets selected.
    for (const c of connections) {
      if (
        c.backoffLevel > 0 &&
        !isTerminalConnectionStatus(c) &&
        !isAccountUnavailable(c.rateLimitedUntil)
      ) {
        c.backoffLevel = 0;
        resetConnectionBackoff(c.id).catch(() => {});
      }
    }

    let modelLockedCount = 0;
    let familyLockedCount = 0;
    const connectionFilterStatus = new Map<string, string>();
    // #11089: multi-host self-hosted providers keep a per-connection synced
    // inventory. Without it, a request can be routed to a host that never had
    // the model, producing a spurious model-not-found instead of pinning to
    // the host that does. Empty map = no inventory known = no filtering.
    const advertisedModelsByConnection = await loadAdvertisedModelsForSelfHostedConnections(
      connections,
      requestedModel
    );
    // Filter out unavailable accounts and excluded connection
    let availableConnections = connections.filter((c) => {
      if (excludedConnectionIds.has(c.id)) {
        connectionFilterStatus.set(c.id, "excluded");
        return false;
      }
      if (requestedModel && isModelExcludedByConnection(requestedModel, c.providerSpecificData)) {
        connectionFilterStatus.set(c.id, "modelExcluded");
        return false;
      }
      if (
        requestedModel &&
        !isModelAdvertisedByConnection(requestedModel, advertisedModelsByConnection.get(c.id))
      ) {
        connectionFilterStatus.set(c.id, "modelNotAdvertised");
        return false;
      }
      if (!allowSuppressedConnections) {
        if (!allowRateLimitedConnections && isAccountUnavailable(c.rateLimitedUntil)) {
          connectionFilterStatus.set(c.id, "rateLimited");
          return false;
        }
        if (isTerminalConnectionStatusForModel(c, provider, requestedModel)) {
          connectionFilterStatus.set(c.id, "terminalStatus");
          return false;
        }
        if (provider === "codex" && isCodexScopeUnavailable(c, requestedModel)) {
          connectionFilterStatus.set(c.id, "codexScopeLimited");
          return false;
        }
        // Per-model lockout: if this specific model/family is locked on this connection, skip it
        if (
          requestedModel &&
          (isModelLocked(provider, c.id, requestedModel) ||
            isAlibabaModelFreeDrained(
              provider,
              c.providerSpecificData as Record<string, unknown>,
              requestedModel
            ))
        ) {
          connectionFilterStatus.set(c.id, "modelLocked");
          if (
            provider === "antigravity" &&
            getQuotaScopeLabelForProvider(provider, requestedModel) === "family"
          ) {
            familyLockedCount += 1;
          } else {
            modelLockedCount += 1;
          }
          return false;
        }
      }
      connectionFilterStatus.set(c.id, "available");
      return true;
    });

    if (provider === "antigravity" || provider === "agy") {
      const projectAwareConnections =
        preferAntigravityConnectionsWithStoredProject(availableConnections);
      if (projectAwareConnections.length > 0) {
        availableConnections = projectAwareConnections;
      }
    }

    log.debug(
      "AUTH",
      `${provider} | available: ${availableConnections.length}/${connections.length}`
    );
    if (provider === "antigravity") {
      log.info(
        "AUTH",
        `${provider} selection candidates model=${requestedModel || "none"}: active=${activeConnectionsCount}, excluded=${excludedConnectionIds.size}, modelLocked=${modelLockedCount}, familyLocked=${familyLockedCount}, eligible=${availableConnections.length}`
      );
    }
    connections.forEach((c) => {
      const status = connectionFilterStatus.get(c.id);
      const excluded = status === "excluded";
      const rateLimited = status === "rateLimited";
      const terminalStatus = status === "terminalStatus";
      const codexScopeLimited = status === "codexScopeLimited";
      const modelLocked = status === "modelLocked";
      const modelExcluded = status === "modelExcluded";
      const modelNotAdvertised = status === "modelNotAdvertised";
      if (excluded || rateLimited) {
        log.debug(
          "AUTH",
          `  → ${c.id?.slice(0, 8)} | ${excluded ? "excluded" : ""} ${rateLimited ? `rateLimited until ${c.rateLimitedUntil}` : ""}${allowSuppressedConnections && rateLimited ? " (retained for combo live test)" : ""}`
        );
      } else if (modelExcluded) {
        log.debug(
          "AUTH",
          `  → ${c.id?.slice(0, 8)} | excluded by per-account model rule for ${requestedModel}`
        );
      } else if (modelNotAdvertised) {
        log.debug(
          "AUTH",
          `  → ${c.id?.slice(0, 8)} | synced inventory does not advertise ${requestedModel}`
        );
      } else if (terminalStatus) {
        log.debug(
          "AUTH",
          allowSuppressedConnections
            ? `  → ${c.id?.slice(0, 8)} | retained terminal status=${c.testStatus} for combo live test`
            : `  → ${c.id?.slice(0, 8)} | skipped terminal status=${c.testStatus}`
        );
      } else if (codexScopeLimited) {
        const scopeUntil = getCodexChildCooldown(c, requestedModel);
        log.debug(
          "AUTH",
          allowSuppressedConnections
            ? `  → ${c.id?.slice(0, 8)} | retained codex scope-limited account until ${scopeUntil} for combo live test`
            : `  → ${c.id?.slice(0, 8)} | codex scope-limited until ${scopeUntil}`
        );
      } else if (modelLocked) {
        const lockout = getModelLockoutInfo(provider, c.id, requestedModel);
        log.debug(
          "AUTH",
          allowSuppressedConnections
            ? `  → ${c.id?.slice(0, 8)} | retained model lockout for ${requestedModel} (${lockout?.remainingMs || 0}ms remaining) for combo live test`
            : `  → ${c.id?.slice(0, 8)} | model-locked for ${requestedModel} (${lockout?.remainingMs || 0}ms remaining)`
        );
      }
    });

    if (availableConnections.length === 0) {
      const cooldownStates: CooldownInspectionState[] = connections.map((connection) => {
        const connectionCooldownMs = parseFutureDateMs(connection.rateLimitedUntil);
        const codexScopeCooldownMs =
          provider === "codex"
            ? parseFutureDateMs(getCodexChildCooldown(connection, requestedModel))
            : null;
        const modelLockout = requestedModel
          ? getModelLockoutInfo(provider, connection.id, requestedModel)
          : null;
        const retryableModelCooldownMs =
          modelLockout &&
          modelLockout.remainingMs > 0 &&
          isRetryableModelLockoutReason(modelLockout.reason)
            ? Date.now() + modelLockout.remainingMs
            : null;

        return { connection, connectionCooldownMs, codexScopeCooldownMs, retryableModelCooldownMs };
      });

      const cooldownCandidates = cooldownStates
        .flatMap((state) => {
          const candidates: Array<{ ms: number; connection: ProviderConnectionView }> = [];
          if (state.connectionCooldownMs !== null) {
            candidates.push({ ms: state.connectionCooldownMs, connection: state.connection });
          }
          if (state.codexScopeCooldownMs !== null) {
            candidates.push({ ms: state.codexScopeCooldownMs, connection: state.connection });
          }
          if (state.retryableModelCooldownMs !== null) {
            candidates.push({ ms: state.retryableModelCooldownMs, connection: state.connection });
          }
          return candidates;
        })
        .sort((a, b) => a.ms - b.ms);

      const allBlockedByModelCooldown =
        Boolean(requestedModel) &&
        cooldownStates.length > 0 &&
        cooldownStates.every((state) => {
          const hasModelSpecificCooldown =
            state.codexScopeCooldownMs !== null || state.retryableModelCooldownMs !== null;
          return hasModelSpecificCooldown && state.connectionCooldownMs === null;
        });

      const earliestCandidate = cooldownCandidates[0];
      const earliest =
        earliestCandidate?.ms && Number.isFinite(earliestCandidate.ms)
          ? new Date(earliestCandidate.ms).toISOString()
          : null;

      if (earliest) {
        const earliestConn = earliestCandidate?.connection;
        log.warn(
          "AUTH",
          allBlockedByModelCooldown
            ? `${provider} | all ${connections.length} active accounts cooling down for model ${requestedModel} (${formatRetryAfter(earliest)}) | lastErrorCode=${earliestConn?.errorCode}, lastError=${earliestConn?.lastError?.slice(0, 50)}`
            : `${provider} | all ${connections.length} active accounts rate limited (${formatRetryAfter(earliest)}) | lastErrorCode=${earliestConn?.errorCode}, lastError=${earliestConn?.lastError?.slice(0, 50)}`
        );
        invalidateManagedLease(
          options,
          allBlockedByModelCooldown ? "MODEL_INELIGIBLE" : "HEALTH_OR_COOLDOWN"
        );
        return {
          allRateLimited: true,
          retryAfter: earliest,
          retryAfterHuman: formatRetryAfter(earliest),
          lastError: earliestConn?.lastError || null,
          lastErrorCode: allBlockedByModelCooldown ? 429 : earliestConn?.errorCode || null,
          cooldownScope: allBlockedByModelCooldown ? "model" : "connection",
          cooldownModel: allBlockedByModelCooldown ? requestedModel : null,
          connectionsCount: connections.length,
        };
      }
      const syntheticFallback = await maybeSyntheticNoAuthFallback(
        resolvedId,
        excludedConnectionIds,
        allowedConnections
      );
      if (syntheticFallback) return syntheticFallback;

      // #7611: isActive terminal rows never hit the inactive allExpired branch.
      const terminalConnections = connections.filter(isTerminalConnectionStatus);
      if (terminalConnections.length === connections.length) {
        return buildAllExpiredCredentials(terminalConnections);
      }
      invalidateManagedLease(options, "CONNECTION_INELIGIBLE");
      log.warn("AUTH", `${provider} | all ${connections.length} accounts unavailable`);
      return null;
    }

    let peakHourEligibleConnections = availableConnections;
    const blockedByPeakHour: Array<{ id: string; retryAfter: string; windowSummary: string }> = [];

    if (!allowSuppressedConnections) {
      peakHourEligibleConnections = availableConnections.filter((connection) => {
        const peakHour = evaluatePeakHourProtection(connection.providerSpecificData);
        if (!peakHour.active) return true;
        blockedByPeakHour.push({
          id: connection.id,
          retryAfter: peakHour.retryAfter,
          windowSummary: describePeakHourWindow(peakHour.window),
        });
        connectionFilterStatus.set(connection.id, "peakHourProtected");
        return false;
      });
    }

    if (blockedByPeakHour.length > 0) {
      log.info(
        "AUTH",
        `${provider} | peak-hour protection filtered ${blockedByPeakHour.length} account(s): ${blockedByPeakHour
          .map((entry) => `${entry.id.slice(0, 8)}(${entry.windowSummary})`)
          .join("; ")}`
      );
    }

    if (peakHourEligibleConnections.length === 0 && availableConnections.length > 0) {
      invalidateManagedLease(options, "QUOTA_UNAVAILABLE");
      return buildPeakHourProtectionRateLimitedResult(provider, blockedByPeakHour);
    }

    let policyEligibleConnections = peakHourEligibleConnections;
    const blockedByPolicy: Array<{
      id: string;
      reasons: string[];
      resetAt: string | null;
    }> = [];
    const quotaResults = new Map<string, { blocked: boolean; exhausted: boolean }>();

    if (provider === "codex") {
      for (const connection of peakHourEligibleConnections) {
        hydrateCodexQuotaCacheForRequest(connection, requestedModel);
      }
    }

    if (!bypassQuotaPolicy) {
      policyEligibleConnections = peakHourEligibleConnections.filter((connection) => {
        const evaluation = evaluateQuotaLimitPolicy(provider, connection, requestedModel);
        quotaResults.set(connection.id, { blocked: evaluation.blocked, exhausted: false });
        if (!evaluation.blocked) return true;

        blockedByPolicy.push({
          id: connection.id,
          reasons: evaluation.reasons,
          resetAt: evaluation.resetAt,
        });
        return false;
      });
    } else if (availableConnections.length > 0) {
      log.debug("AUTH", `${provider} | bypassing cached quota policy for this request`);
    }

    if (blockedByPolicy.length > 0) {
      log.info(
        "AUTH",
        `${provider} | quota policy filtered ${blockedByPolicy.length} account(s): ${blockedByPolicy
          .map((entry) => `${entry.id.slice(0, 8)}(${entry.reasons.join(", ")})`)
          .join("; ")}`
      );
    }

    if (policyEligibleConnections.length === 0 && availableConnections.length > 0) {
      const transportUnavailable = connections.filter(
        (connection) =>
          connectionFilterStatus.get(connection.id) === "rateLimited" &&
          isTransportCooldownErrorCode(connection.errorCode)
      );
      if (transportUnavailable.length > 0) {
        const mixed = buildMixedAvailabilityError({
          provider,
          quotaFilteredCount: blockedByPolicy.length,
          transportUnavailableCount: transportUnavailable.length,
          transportStatus: Number(transportUnavailable[0]?.errorCode) || 503,
        });
        const retryAfter =
          getEarliestFutureDate(
            transportUnavailable.map((connection) => connection.rateLimitedUntil || null)
          ) || new Date(Date.now() + 3000).toISOString();
        invalidateManagedLease(options, "HEALTH_OR_COOLDOWN");
        return {
          allRateLimited: true,
          retryAfter,
          retryAfterHuman: formatRetryAfter(retryAfter),
          lastError: mixed.lastError,
          lastErrorCode: mixed.lastErrorCode,
        };
      }

      const earliestResetAt = getEarliestFutureDate(blockedByPolicy.map((entry) => entry.resetAt));
      const earliestResetMs = parseFutureDateMs(earliestResetAt);

      const retryAfter = earliestResetMs
        ? new Date(earliestResetMs).toISOString()
        : new Date(Date.now() + 5 * 60 * 1000).toISOString();

      invalidateManagedLease(options, "QUOTA_UNAVAILABLE");
      return {
        allRateLimited: true,
        retryAfter,
        retryAfterHuman: formatRetryAfter(retryAfter),
        lastError: `All ${provider} accounts reached configured quota threshold`,
        lastErrorCode: 429,
      };
    }

    // Quota-aware: partition accounts with and without quota for the requested scope.
    const withQuota: typeof policyEligibleConnections = [];
    const exhaustedQuota: typeof policyEligibleConnections = [];
    for (const c of policyEligibleConnections) {
      const exhausted = isQuotaExhaustedForRequest(c.id, provider, requestedModel);
      const existing = quotaResults.get(c.id);
      if (existing) existing.exhausted = exhausted;
      if (!exhausted) {
        withQuota.push(c);
      } else {
        exhaustedQuota.push(c);
      }
    }

    if (exhaustedQuota.length > 0) {
      log.info(
        "AUTH",
        `${provider} | quota-aware: ${withQuota.length} with quota, skipping ${exhaustedQuota.length} exhausted`
      );
    }

    if (withQuota.length === 0 && exhaustedQuota.length > 0) {
      // All remaining eligible accounts are exhausted
      const earliestResetAt = getEarliestFutureDate(
        exhaustedQuota.map((c) => {
          const entry = getQuotaCache(c.id);
          return entry?.nextResetAt || null;
        })
      );
      const earliestResetMs = parseFutureDateMs(earliestResetAt);
      const retryAfter = earliestResetMs
        ? new Date(earliestResetMs).toISOString()
        : new Date(Date.now() + 5 * 60 * 1000).toISOString();

      invalidateManagedLease(options, "QUOTA_UNAVAILABLE");
      return {
        allRateLimited: true,
        retryAfter,
        retryAfterHuman: formatRetryAfter(retryAfter),
        lastError: `All ${provider} accounts have exhausted their quota`,
        lastErrorCode: 429,
      };
    }

    const policyValidLeaseCandidates = options._leaseCandidateIds
      ? withQuota.filter((candidate) => options._leaseCandidateIds!.includes(candidate.id))
      : withQuota;
    if (policyValidLeaseCandidates.length === 0) return null;
    const leasePolicy = await applyExclusiveConnectionLeasePolicy(
      policyValidLeaseCandidates,
      options
    );
    if (leasePolicy.error) return { [leasePolicy.error]: true };
    if (leasePolicy.connections.length === 0) {
      if (options.lease?.mode === "request" && leasePolicy.activeLease) {
        invalidateManagedLease(options, "CONNECTION_INELIGIBLE");
      }
      return options.lease
        ? {
            waitingForCapacity: true,
            retryAfter: leasePolicy.retryAfter,
            eligibleCount: policyValidLeaseCandidates.length,
            freeCount: 0,
          }
        : null;
    }

    const orderedConnections = [...leasePolicy.connections].sort((a, b) => {
      if (a.authType !== "oauth" || b.authType !== "oauth") return 0;
      const priorityDelta = (a.priority || 999) - (b.priority || 999);
      if (priorityDelta !== 0) return priorityDelta;
      return (
        getOAuthSessionAvailability(b.id, options.sessionKey) -
        getOAuthSessionAvailability(a.id, options.sessionKey)
      );
    });

    const providerStrategyOverrides = (settings.providerStrategies || {}) as Record<
      string,
      { fallbackStrategy?: string; stickyRoundRobinLimit?: number }
    >;
    const providerOverride = providerStrategyOverrides[resolvedId] || {};
    const strategy = providerOverride.fallbackStrategy || settings.fallbackStrategy || "fill-first";

    let commitSelectionSideEffects: (() => Promise<void> | void) | undefined;
    let connection = leasePolicy.activeLease
      ? orderedConnections.find(
          (candidate) => candidate.id === leasePolicy.activeLease?.connectionId
        )
      : undefined;
    const affinityPlan =
      options.lease && !connection
        ? planSessionAffinityConnection(
            provider,
            options.sessionKey,
            orderedConnections,
            sessionAffinityTtlMs
          )
        : null;
    const affinityConnection = connection
      ? connection
      : options.lease
        ? affinityPlan?.connection
        : await selectSessionAffinityConnection(
            provider,
            options.sessionKey,
            orderedConnections,
            sessionAffinityTtlMs
          );
    if (affinityConnection) {
      connection = affinityConnection;
      if (options.lease) commitSelectionSideEffects = affinityPlan?.commit;
      else syncSessionAffinityRuntimeFields(connectionsRaw, connection);
    } else if (options.sessionKey) {
      log.info(
        "AUTH",
        `session_key=${formatSessionKeyForLog(options.sessionKey)} has no available affinity target`
      );
    }

    if (connection) {
      // Session affinity selected a connection before global sticky routing.
    } else if (strategy === "round-robin") {
      const stickyLimit = toNumber(
        providerOverride.stickyRoundRobinLimit ??
          (settings as Record<string, unknown>).stickyRoundRobinLimit,
        3
      );

      // If excluding account(s) (fallback scenario), skip sticky logic and go straight to LRU.
      // This prevents same-model retries from getting stuck on a failed account.
      const isFallbackScenario = excludeConnectionId !== null || excludedConnectionIds.size > 0;

      if (!isFallbackScenario) {
        // Sort by lastUsed (most recent first) to find current candidate
        const byRecency = [...orderedConnections].sort((a: any, b: any) => {
          if (!a.lastUsedAt && !b.lastUsedAt) return (a.priority || 999) - (b.priority || 999);
          if (!a.lastUsedAt) return 1;
          if (!b.lastUsedAt) return -1;
          return new Date(b.lastUsedAt).getTime() - new Date(a.lastUsedAt).getTime();
        });

        const current = byRecency[0];
        const currentCount = current?.consecutiveUseCount || 0;

        if (current && current.lastUsedAt && currentCount < stickyLimit) {
          // Stay with current account
          connection = current;
          log.debug(
            "AUTH",
            `${provider} round-robin: staying with ${current.id?.slice(0, 8)}... (count=${currentCount}/${stickyLimit})`
          );
          // Update lastUsedAt and increment count (await to ensure persistence)
          const nextCount = (connection.consecutiveUseCount || 0) + 1;
          const commit = planLastUsedCommit(connection, connectionsRaw, nextCount);
          if (options.lease) commitSelectionSideEffects = commit;
          else await commit();
        } else {
          // Pick the least recently used (excluding current if possible)
          // Also penalize accounts with high backoffLevel (previously rate-limited)
          // so they don't get immediately re-selected after cooldown (#340)
          const sortedByOldest = [...orderedConnections].sort((a: any, b: any) => {
            // Penalize previously rate-limited accounts (backoffLevel > 0)
            const aBackoff = a.backoffLevel || 0;
            const bBackoff = b.backoffLevel || 0;
            if (aBackoff !== bBackoff) return aBackoff - bBackoff; // lower backoff first
            if (!a.lastUsedAt && !b.lastUsedAt) return (a.priority || 999) - (b.priority || 999);
            if (!a.lastUsedAt) return -1;
            if (!b.lastUsedAt) return 1;
            return new Date(a.lastUsedAt).getTime() - new Date(b.lastUsedAt).getTime();
          });

          connection = sortedByOldest[0];
          log.debug(
            "AUTH",
            `${provider} round-robin: switching to LRU ${connection.id?.slice(0, 8)}... (current count=${currentCount} >= limit=${stickyLimit} or no lastUsedAt)`
          );

          // Update lastUsedAt and reset count to 1 (await to ensure persistence)
          const commit = planLastUsedCommit(connection, connectionsRaw, 1);
          if (options.lease) commitSelectionSideEffects = commit;
          else await commit();
        }
      } else {
        // Fallback scenario: excluded an account due to failure
        // Always pick the least recently used to ensure proper cycling
        // Also penalize accounts with high backoffLevel (#340)
        const sortedByOldest = [...orderedConnections].sort((a: any, b: any) => {
          const aBackoff = a.backoffLevel || 0;
          const bBackoff = b.backoffLevel || 0;
          if (aBackoff !== bBackoff) return aBackoff - bBackoff;
          if (!a.lastUsedAt && !b.lastUsedAt) return (a.priority || 999) - (b.priority || 999);
          if (!a.lastUsedAt) return -1;
          if (!b.lastUsedAt) return 1;
          return new Date(a.lastUsedAt).getTime() - new Date(b.lastUsedAt).getTime();
        });

        connection = sortedByOldest[0];
        log.info(
          "AUTH",
          `${provider} round-robin: FALLBACK MODE - excluded_count=${excludedConnectionIds.size} excluded=${formatConnectionPrefixesForLog(excludedConnectionIds)} picked_lru=${connection.id?.slice(0, 8)}...`
        );

        // Update lastUsedAt and reset count to 1 (await to ensure persistence)
        const commit = planLastUsedCommit(connection, connectionsRaw, 1);
        if (options.lease) commitSelectionSideEffects = commit;
        else await commit();
      }
    } else if (strategy === "p2c") {
      const candidatePool = orderedConnections;
      // Power of Two Choices: sample from the quota-eligible pool and compare
      // health instead of defaulting to random-first selection.
      if (candidatePool.length <= 2) {
        connection = [...candidatePool].sort((a, b) =>
          compareP2CConnections(provider, a, b, requestedModel, quotaResults)
        )[0];
      } else {
        const i =
          parseInt(randomUUID().replace(/-/g, "").substring(0, 8), 16) % candidatePool.length;
        let j =
          parseInt(randomUUID().replace(/-/g, "").substring(0, 8), 16) % (candidatePool.length - 1);
        if (j >= i) j++;
        const a = candidatePool[i];
        const b = candidatePool[j];
        connection =
          compareP2CConnections(provider, a, b, requestedModel, quotaResults) <= 0 ? a : b;
      }
    } else if (strategy === "random") {
      // Random: Fisher-Yates-inspired random pick
      const idx =
        parseInt(randomUUID().replace(/-/g, "").substring(0, 8), 16) % orderedConnections.length;
      connection = orderedConnections[idx];
    } else if (strategy === "least-used") {
      // Least Used: pick the one with oldest lastUsedAt.
      // #12279: prefer accounts without backoff first, the same tie-break the
      // round-robin fallback branch applies. Without it the oldest lastUsedAt
      // could belong to an account that just 429'd, so a failover landed on it
      // for one request before the next call settled on a healthy account.
      const sorted = [...orderedConnections].sort((a, b) => {
        const aBackoff = a.backoffLevel || 0;
        const bBackoff = b.backoffLevel || 0;
        if (aBackoff !== bBackoff) return aBackoff - bBackoff; // lower backoff first
        if (!a.lastUsedAt && !b.lastUsedAt) return (a.priority || 999) - (b.priority || 999);
        if (!a.lastUsedAt) return -1;
        if (!b.lastUsedAt) return 1;
        return new Date(a.lastUsedAt).getTime() - new Date(b.lastUsedAt).getTime();
      });
      connection = sorted[0];
      // Record the use (#10945). This strategy sorts on the very field it was
      // not writing, so on a pool where every lastUsedAt is null the tie-break
      // fell through to `priority` and returned the SAME connection on every
      // call, forever — the opposite of the documented behaviour, and silent.
      // round-robin is the only other strategy that reads lastUsedAt and it has
      // always committed here; least-used now does the same.
      const commit = planLastUsedCommit(connection, connectionsRaw, 1);
      if (options.lease) commitSelectionSideEffects = commit;
      else await commit();
    } else if (strategy === "cost-optimized") {
      // Cost Optimized: sort by priority ascending (lower = cheaper/preferred)
      // Future: can be enhanced with actual cost data per provider
      const sorted = [...orderedConnections].sort(
        (a, b) => (a.priority || 999) - (b.priority || 999)
      );
      connection = sorted[0];
    } else if (strategy === "strict-random") {
      // Strict Random: shuffle deck — uses each account once before reshuffling
      const ids = orderedConnections.map((c) => c.id);
      if (options.lease) {
        const plan = planNextFromDeckSync(`conn:${provider}`, ids);
        connection =
          orderedConnections.find((c) => c.id === plan.selectedId) || orderedConnections[0];
        commitSelectionSideEffects = plan.commit;
      } else {
        const selectedId = getNextFromDeckSync(`conn:${provider}`, ids);
        connection = orderedConnections.find((c) => c.id === selectedId) || orderedConnections[0];
      }
    } else {
      // Default: fill-first (already sorted by priority in getProviderConnections)
      connection = orderedConnections[0];
    }

    if (options.reserveOAuthSession === true && connection?.authType === "oauth") {
      const selectedPriority = connection.priority || 999;
      const selectedAvailability = getOAuthSessionAvailability(connection.id, options.sessionKey);
      const moreAvailablePeer = [...orderedConnections]
        .filter(
          (candidate) =>
            candidate.authType === "oauth" && (candidate.priority || 999) <= selectedPriority + 1
        )
        .sort(
          (a, b) =>
            getOAuthSessionAvailability(b.id, options.sessionKey) -
            getOAuthSessionAvailability(a.id, options.sessionKey)
        )
        .find(
          (candidate) =>
            getOAuthSessionAvailability(candidate.id, options.sessionKey) > selectedAvailability
        );
      if (moreAvailablePeer) connection = moreAvailablePeer;
    }

    let exclusiveLease: ExclusiveConnectionLease | undefined;
    if (options.lease) {
      const candidateIds = orderedConnections.map((candidate) => candidate.id);
      const selectNextLeaseCandidate = (excludedConnectionId: string) =>
        getProviderCredentials(provider, null, allowedConnections, requestedModel, {
          ...options,
          excludeConnectionIds: [...excludedConnectionIds, excludedConnectionId],
          deferLeaseClaim: true,
          _leaseCandidateIds: candidateIds,
        });
      if (options.deferLeaseClaim) {
        return materializeConnection(connection, options, {
          commitSelectionSideEffects,
          selectNextLeaseCandidate,
        });
      }
      let claim = mutateExclusiveConnectionLease(
        connection,
        leasePolicy.activeLease,
        options.lease
      );
      if (claim.kind === "LOST") {
        return getProviderCredentials(provider, null, allowedConnections, requestedModel, {
          ...options,
          excludeConnectionIds: [...excludedConnectionIds, connection.id],
          _leaseCandidateIds: candidateIds,
          _leaseRetryWithLockHeld: true,
        });
      }
      if (claim.kind === "STALE") return { leaseFenceStale: true };
      exclusiveLease = claim.lease;
      await commitSelectionSideEffects?.();
      if (options.materializeCredentials === false) {
        return { exclusiveLease, connectionId: connection.id, provider: connection.provider };
      }
    }

    if (provider === "antigravity" && connection) {
      log.info(
        "AUTH",
        `${provider} selected account=${connection.id?.slice(0, 8)}... eligible=${orderedConnections.length} excluded=${excludedConnectionIds.size}`
      );
    }

    return materializeConnection(connection, options, { exclusiveLease });
  } finally {
    selectionLock?.release();
  }
}
export async function getProviderCredentialsWithQuotaPreflight(
  provider: string,
  excludeConnectionId: string | null = null,
  allowedConnections: string[] | null = null,
  requestedModel: string | null = null,
  options: CredentialSelectionOptions = {}
) {
  // Credits-first requests intentionally skip both cached quota cutoffs and live
  // usage preflight. The user inference itself is the one credit-bearing request;
  // probing normal quota first would spend up to two extra credit calls.
  const bypassQuotaPolicy =
    options.bypassQuotaPolicy === true ||
    (provider === "antigravity" && getCreditsMode() === "always");
  if (bypassQuotaPolicy) {
    return getProviderCredentials(
      provider,
      excludeConnectionId,
      allowedConnections,
      requestedModel,
      {
        ...options,
        bypassQuotaPolicy: true,
      }
    );
  }

  const blockedByPreflight: Array<{
    id: string;
    quotaPercent?: number;
    resetAt?: string | null;
  }> = [];
  const excludedConnectionIds = normalizeExcludedConnectionIds(
    excludeConnectionId,
    options.excludeConnectionIds
  );

  const resilience = resolveResilienceSettings(await getCachedSettings());
  const { defaultThresholdPercent, warnThresholdPercent, providerWindowDefaults } =
    resilience.quotaPreflight;
  const providerWindowMap = providerWindowDefaults[provider] || {};
  const providerHasDefaults = Object.keys(providerWindowMap).length > 0;
  // The factory default is "block at 2% remaining" — effectively "right
  // before 429." Skipping preflight at that level is a clean no-op. If an
  // operator has raised the global to anything stricter (e.g. 20% remaining
  // = stop at 80% used), preflight needs to run for every connection so the
  // tighter floor is honored.
  const FACTORY_NO_OP_REMAINING_PERCENT = 2;
  const globalDefaultIsRestrictive = defaultThresholdPercent > FACTORY_NO_OP_REMAINING_PERCENT;
  let pendingCredentialSelection: Awaited<ReturnType<typeof getProviderCredentials>> | undefined;

  while (true) {
    const credentials =
      pendingCredentialSelection ??
      (await getProviderCredentials(provider, null, allowedConnections, requestedModel, {
        ...options,
        excludeConnectionIds: Array.from(excludedConnectionIds),
        ...(options.lease ? { deferLeaseClaim: true } : {}),
      }));
    pendingCredentialSelection = undefined;

    if (!credentials) {
      if (blockedByPreflight.length > 0) {
        return buildQuotaPreflightRateLimitedResult(provider, blockedByPreflight);
      }
      return null;
    }

    if (
      ("allRateLimited" in credentials && credentials.allRateLimited) ||
      ("allExpired" in credentials && credentials.allExpired)
    ) {
      if (
        "allRateLimited" in credentials &&
        credentials.allRateLimited &&
        blockedByPreflight.length > 0
      ) {
        return buildQuotaPreflightRateLimitedResult(provider, blockedByPreflight);
      }
      return credentials;
    }

    const selectedCredentials = credentials as Omit<
      typeof credentials,
      "selectNextLeaseCandidate"
    > & {
      connectionId?: string;
      commitSelectionSideEffects?: () => Promise<void> | void;
      selectNextLeaseCandidate?: (excludedConnectionId: string) => Promise<typeof credentials>;
      releaseOAuthSession?: () => void;
    };
    const connectionId = selectedCredentials.connectionId;
    if (!connectionId) {
      return credentials;
    }
    const commitLease = async () => {
      if (!options.lease) return credentials;
      const activeLease = getActiveExclusiveConnectionLease(options.lease.context.leaseOwnerId);
      const claim = mutateExclusiveConnectionLease(
        selectedCredentials as unknown as ProviderConnectionView,
        activeLease,
        options.lease
      );
      if (claim.kind === "LOST") {
        selectedCredentials.releaseOAuthSession?.();
        excludedConnectionIds.add(connectionId);
        pendingCredentialSelection =
          await selectedCredentials.selectNextLeaseCandidate?.(connectionId);
        return null;
      }
      if (claim.kind === "STALE") return { leaseFenceStale: true };
      await selectedCredentials.commitSelectionSideEffects?.();
      if (options.materializeCredentials === false) {
        selectedCredentials.releaseOAuthSession?.();
        return { exclusiveLease: claim.lease, connectionId, provider };
      }
      return { ...credentials, exclusiveLease: claim.lease };
    };

    // Cascading resolver: per-connection override → per-(provider, window)
    // default → global default. Used per-window when the fetcher exposes
    // multiple windows, and once (with window=null) for single-signal
    // fetchers. The warn fallback is uniform — windows don't need their own
    // warn levels in v1.
    const perConnectionWindowOverrides =
      (credentials as { quotaWindowThresholds?: Record<string, number> | null })
        .quotaWindowThresholds || {};

    // Latency gate: skip the upstream usage fetch entirely when there's
    // nothing to enforce. Preflight is only worth its cost when at least
    // one of the following is true:
    //   • a per-connection override on this row
    //   • a per-(provider, window) default in resilience settings
    //   • the legacy `quotaPreflightEnabled` flag in providerSpecificData
    //   • the operator-enabled quota cutoff (resilience.quotaPreflight.enabled /
    //     QUOTA_PREFLIGHT_CUTOFF_ENABLED) — #11234: it previously only armed the
    //     auto-strategy candidate builder and the per-target cutoff for pinned
    //     connections, so priority combos over sibling connections (no pinned
    //     connectionId) never filtered an exhausted sister
    //   • the global default is stricter than the factory no-op level
    //     (factory = 2% remaining, basically "right before 429" — anything
    //     stricter means the operator wants enforcement everywhere)
    // Otherwise the resolver would return the factory default for every
    // window, and a near-exhausted account would still be caught by the
    // normal 429 → cooldown path.
    // Explicit per-connection opt-out always wins over global/provider defaults.
    // isQuotaPreflightEnabled is strict-=== true (back-compat), so it returns
    // false for both "not set" and "explicit false" — we need an explicit check
    // here to distinguish them.
    const legacyForceDisable =
      (credentials as { providerSpecificData?: Record<string, unknown> }).providerSpecificData
        ?.quotaPreflightEnabled === false;
    if (legacyForceDisable) {
      const committed = await commitLease();
      if (committed === null) continue;
      return committed;
    }

    const hasConnectionOverrides = Object.keys(perConnectionWindowOverrides).length > 0;
    const legacyForceEnable = isQuotaPreflightEnabled(credentials as Record<string, unknown>);
    const globalCutoffEnabled = resilience.quotaPreflight.enabled === true;
    if (
      !hasConnectionOverrides &&
      !providerHasDefaults &&
      !legacyForceEnable &&
      !globalCutoffEnabled &&
      !globalDefaultIsRestrictive
    ) {
      const committed = await commitLease();
      if (committed === null) continue;
      return committed;
    }

    // Returns the minimum-remaining cutoff for a window — matches the
    // dashboard's quota bars so the number the user types in the modal
    // means the same thing as the percentage rendered on the bar.
    const resolveMinRemainingPercent = (windowName: string | null): number => {
      if (windowName !== null) {
        const lookupWindowNames =
          provider === "codex"
            ? uniqueWindows(
                [windowName, toCodexBaseQuotaWindowName(windowName)].filter(Boolean) as string[]
              )
            : [windowName];
        for (const lookupWindowName of lookupWindowNames) {
          const override = perConnectionWindowOverrides[lookupWindowName];
          if (typeof override === "number") return override;
          const providerDefault = providerWindowMap[lookupWindowName];
          if (typeof providerDefault === "number") return providerDefault;
        }
      }
      return defaultThresholdPercent;
    };
    // #6842: openrouter also needs requestedModel, for the :free-window check.
    // agy/antigravity need it so Claude weekly cannot cool a Gemini request.
    const modelAwarePreflight =
      provider === "codex" || provider === "openrouter" || isAntigravityQuotaProvider(provider);
    const preflightCredentials =
      requestedModel && modelAwarePreflight ? { ...credentials, requestedModel } : credentials;
    let preflight;
    try {
      preflight = await preflightQuota(
        provider,
        connectionId,
        preflightCredentials as Record<string, unknown>,
        {
          resolveMinRemainingPercent,
          resolveWarnRemainingPercent: () => warnThresholdPercent,
        }
      );
    } catch (error) {
      selectedCredentials.releaseOAuthSession?.();
      throw error;
    }
    if (preflight.proceed) {
      const committed = await commitLease();
      if (committed === null) continue;
      return committed;
    }

    selectedCredentials.releaseOAuthSession?.();

    const unavailableUntil = await markQuotaPreflightAccountUnavailable(
      provider,
      connectionId,
      preflight,
      requestedModel
    );
    blockedByPreflight.push({
      id: connectionId,
      quotaPercent: preflight.quotaPercent,
      resetAt: unavailableUntil,
    });
    excludedConnectionIds.add(connectionId);
    pendingCredentialSelection = await selectedCredentials.selectNextLeaseCandidate?.(connectionId);

    log.info(
      "AUTH",
      `${provider} | preflight blocked ${connectionId.slice(0, 8)}${
        Number.isFinite(preflight.quotaPercent)
          ? ` at ${Math.round((preflight.quotaPercent as number) * 100)}%`
          : ""
      } until ${unavailableUntil}`
    );
  }
}

/**
 * #10334 — Guard for the agentrouter-exclusive "connection scope" quota
 * cooldown branch in markAccountUnavailable. The "never terminal" invariant of
 * that branch is NOT structurally guaranteed by `ruleScope === "connection"`
 * alone — it also depends on the provider rule table only ever pairing scope
 * "connection" with a genuinely transient reason. Today
 * (`buildAgentrouterRules()` in providerErrorRules.ts) that is true: the only
 * rule declaring scope "connection" is the quota-exhausted one. But a FUTURE
 * agentrouter rule for a permanent account state (e.g. "账号已封禁") — or a 402
 * added to `AGENTROUTER_ERROR_STATUSES` with scope "connection", a natural-
 * looking choice for an account ban — would otherwise be silently downgraded
 * to a transient cooldown here instead of going through
 * resolveTerminalConnectionStatus()/auto-disable below. Require the
 * reason/permanent/creditsExhausted signals checkFallbackError already
 * computes to explicitly confirm "this is quota, not a permanent state"
 * before taking the early return.
 *
 * Exported (not just inlined) so a synthetic permanent/credits-exhausted
 * `fallbackResult` can be tested directly — no rule in the table produces
 * that combination today, so this predicate is the only way to pin the guard
 * without editing the (production) rule table just for a test.
 */
export function isAgentrouterConnectionQuotaScope(
  provider: string | null | undefined,
  fallbackResult: {
    ruleScope?: "model" | "provider" | "connection";
    reason?: string;
    permanent?: boolean;
    creditsExhausted?: boolean;
  }
): boolean {
  return (
    honorsRuleLockScope(provider) &&
    fallbackResult.ruleScope === "connection" &&
    fallbackResult.reason === RateLimitReason.QUOTA_EXHAUSTED &&
    !fallbackResult.permanent &&
    !fallbackResult.creditsExhausted
  );
}

async function resolveDailyResetForProvider(
  provider: string | null,
): Promise<{ timezone?: unknown; hour?: unknown } | null> {
  if (!provider) return null;
  try {
    const nodes = await getCachedProviderNodes();
    const node = nodes.find((candidate) => {
      if (!candidate) return false;
      return candidate.id === provider || candidate.prefix === provider;
    });
    if (!node) return null;
    return {
      timezone: node.dailyQuotaResetTimezone,
      hour: node.dailyQuotaResetHour,
    };
  } catch {
    return null;
  }
}

/**
 * #10880 — cools down every connection sharing the failing connection's last
 * known egress IP. Best-effort and side-effect-safe by design:
 * - The failing connection C is NOT written here: the branch marks it BEFORE
 *   calling this helper (mirror of the connection-scoped agentrouter branch)
 *   — the branch returns right after, so the generic path below is never
 *   reached and opencode (passthroughModels) would otherwise get a per-model
 *   lockModel instead of a connection cooldown.
 * - Any DB failure is caught and logged — markAccountUnavailable must never
 *   fail because of the egress lookup or the sibling writes.
 * - Siblings are re-read fresh and only written when NOT terminal (T06: a
 *   banned/credits_exhausted sibling is never downgraded by an IP-level
 *   signal) and not already in cooldown.
 * - No mutex per sibling (markMutexes is per-connection): concurrent 429s may
 *   double-write, idempotent via updateProviderConnection.
 */
async function applyEgressIpLockout(
  connectionId: string,
  provider: string,
  cooldownMs: number,
  reason: string
): Promise<void> {
  try {
    const since = new Date(Date.now() - EGRESS_IP_LOOKUP_WINDOW_MS).toISOString();
    const recent = getRecentEgressIpForConnection(connectionId, since);
    if (!recent) {
      log.info(
        "AUTH",
        `Egress lock: no known egress IP for ${provider}:${connectionId.slice(0, 8)} — skipped`
      );
      return;
    }
    const db = getDbInstance();
    // Siblings are scoped to the allowlisted provider family: the egress IP
    // budget is per provider (the opencode free tier is IP-bucketed, not
    // account-bucketed — see #9611), so a 429 from one provider must never
    // cool an unrelated provider sharing the same host IP (the default
    // no-proxy deployment egresses everything through one IP).
    //
    // The family is BOUND from the same allowlist the branch gate reads
    // (egressBucketedLockProviders() / isEgressBucketedLockScope) — never
    // re-spelled as a SQL literal: a duplicated list would not follow a
    // widening of the allowlist, leaving the opt-in half applied (the gate
    // would fire for the new provider while its siblings stayed invisible).
    const family = egressBucketedLockProviders();
    const familyPlaceholders = family.map(() => "?").join(",");
    const siblingIds = db
      .prepare(
        `SELECT DISTINCT connection_id FROM proxy_logs
         WHERE egress_ip = ? AND timestamp >= ? AND connection_id != ?
         AND provider IN (${familyPlaceholders})`
      )
      .all(recent.egressIp, since, connectionId, ...family)
      .map((row: { connection_id: string }) => row.connection_id);
    const now = Date.now();
    let cooledCount = 0;
    for (const id of siblingIds) {
      // Fresh camelCase re-read per sibling (never trust a stale snapshot) —
      // reuse the house getter so terminal/cooldown checks see the same shape
      // the rotation uses (pattern agentrouter test).
      const sibling = toProviderConnection(await getProviderConnectionById(id));
      if (!sibling.id) continue;
      if (isTerminalConnectionStatus(sibling)) continue; // T06
      // cooldownUntilMs (not a raw new Date()) because rate_limited_until can
      // hold a numeric-epoch string (e.g. the Antigravity full-quota path) —
      // see #3954; NaN (no/invalid value) never exceeds `now`.
      const existingUntil = cooldownUntilMs(sibling.rateLimitedUntil);
      if (existingUntil > now) continue; // already cooling — never shorten
      await updateProviderConnection(id, {
        lastErrorType: reason || RateLimitReason.QUOTA_EXHAUSTED,
        lastError: `Shared egress IP quota exhausted (${provider})`,
        lastErrorAt: new Date().toISOString(),
        errorCode: 429,
        rateLimitedUntil: getUnavailableUntil(cooldownMs),
        testStatus: "unavailable",
      });
      cooledCount += 1;
    }
    log.info(
      "AUTH",
      `Egress-bucketed cooldown: ${provider} ip=${recent.egressIp} connection=${connectionId.slice(0, 8)} cooled ${cooledCount} sibling(s) for ${Math.ceil(cooldownMs / 1000)}s`
    );
  } catch (err) {
    log.warn("AUTH", `Egress-bucketed lock skipped after DB error: ${(err as Error).message}`);
  }
}

/** Persist exponential-backoff state for an unavailable provider connection. */
export async function markAccountUnavailable(
  connectionId: string,
  status: number,
  errorText: string,
  provider: string | null = null,
  model: string | null = null,
  providerProfile = null,
  options: {
    persistUnavailableState?: boolean;
    /** Caller is the combo engine — it records its own model-level lockouts. */
    isCombo?: boolean;
    headers?: Headers | Record<string, string> | null;
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

    // STRICT_ZERO_COST: this connection just failed (whatever the reason) —
    // drop any cached "SAFE" free-allowance reading for it immediately rather
    // than waiting out the TTL, so the very next candidate-pool build reads a
    // clean cache miss (UNKNOWN → excluded) instead of a stale SAFE. Cheap,
    // idempotent, and correct to over-invalidate on non-quota failures too —
    // worst case is one extra background refresh.
    if (provider) {
      const { invalidateFreeAccessState } =
        await import("@omniroute/open-sse/services/autoCombo/freeAccessQuota.ts");
      invalidateFreeAccessState(provider, connectionId);
    }

    const resourceBypass = getResource404Bypass(status, errorText, connectionId, log);
    if (resourceBypass) return resourceBypass;

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
    // Uses cooldownUntilMs (not a raw `new Date()`) because `rate_limited_until`
    // can hold a numeric-epoch string (e.g. the Antigravity full-quota path) —
    // see #3954.
    const existingCooldownMs = conn?.rateLimitedUntil
      ? cooldownUntilMs(conn.rateLimitedUntil)
      : NaN;
    if (Number.isFinite(existingCooldownMs) && existingCooldownMs > Date.now()) {
      log.info(
        "AUTH",
        `${connectionId.slice(0, 8)} already marked unavailable (until ${conn?.rateLimitedUntil}), skipping duplicate mark`
      );
      return {
        shouldFallback: true,
        cooldownMs: existingCooldownMs - Date.now(),
      };
    }

    // T09: Codex scope-aware lockout guard (codex vs spark independent pools).
    if (provider === "codex" && typeof model === "string" && model.trim().length > 0) {
      const scopeRateLimitedUntil = conn ? getCodexChildCooldown(conn, model) : null;
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

    // #10460: model-unsupported 400 — the PROVIDER does not serve this model, not
    // this account. Cooling down the account and rotating to the next one wastes an
    // upstream call because all accounts share the same model catalog. Return
    // shouldFallback: false so the error propagates to the combo layer, which already
    // has isModelScoped400() (combo.ts:1827) to advance to the next combo target.
    // Uses isProviderModelUnsupported400() — the SAME disambiguation
    // (AUTH_CREDENTIAL_ERROR_PATTERNS exclusion) checkFallbackError's 400 branch
    // applies, narrowed further to exclude the broader/ambiguous
    // MODEL_ACCESS_DENIED_PATTERNS access-/permission-phrased matches (e.g. "does not
    // have permission to access this model"), which can be an ACCOUNT-scoped
    // entitlement gap (PRO vs free tier) rather than a provider-wide unsupported
    // model — those must keep rotating to other accounts normally.
    if (isProviderModelUnsupported400(status, errorText)) {
      log.info(
        "AUTH",
        `${connectionId.slice(0, 8)} provider_model_unsupported 400 (${provider}/${model ?? "n/a"}) — skipping account cooldown, letting combo advance`
      );
      return { shouldFallback: false, cooldownMs: 0, reason: "provider_model_unsupported" };
    }

    const effectiveProviderProfile =
      providerProfile || (provider ? await getRuntimeProviderProfile(provider) : null);
    // #4530 follow-up: the combo.ts lockout sites forward the admin-configured
    // maxCooldownMs cap to recordModelLockoutFailure, but the markAccountUnavailable
    // lockout sites (per-model quota, grok-web 403, local 404) never did, so the cap
    // fell back to BACKOFF_CONFIG.max here. Resolve it once and pass it at every site.
    const mlSettings = resolveModelLockoutSettings(await getCachedSettings());
    const fallbackResult = checkFallbackError(
      status,
      errorText,
      backoffLevel,
      model,
      provider,
      options.headers ?? null,
      effectiveProviderProfile,
      null,
      null,
      await resolveDailyResetForProvider(provider),
    );

    // T-PROBE: probe-origin failures (model test-all) must never remove the
    // connection from the pool. Record the failure for visibility but leave
    // ALL routing state untouched — cooldowns, terminal status, per-model
    // lockouts (T09 codex-scope, per-model quota, agentrouter #10334) and
    // auto-disable. Only a real request-path failure deactivates (#9817);
    // the opt-in setting probeCanDisable restores the historical behavior.
    if (await shouldIsolateProbeFailures()) {
      await updateProviderConnection(connectionId, {
        // Persist safe wording only after classification has consumed the raw provider text.
        // backoffLevel is deliberately NOT written: a positive backoff
        // triggers the selection-time auto-decay (resetConnectionBackoff,
        // auth.ts getProviderCredentials) which wipes lastError back to
        // NULL on the next attempt — silently destroying the probe record.
        // The backoff is also routing state a probe must not touch (#9817).
        lastError: sanitizeErrorMessage(errorText) || "Provider request failed",
        lastErrorType: fallbackResult.reason || null,
        errorCode: status,
        lastErrorAt: new Date().toISOString(),
      });
      log.warn(
        "AUTH",
        `[T-PROBE] ${connectionId.slice(0, 8)} ${provider ?? ""} failure ${status} recorded — connection stays in the pool`
      );
      return { shouldFallback: true, cooldownMs: 0 };
    }

    // Read passthroughModels from connection config (user-configured per-model quota)
    const connProviderSpecificData = (conn?.providerSpecificData as Record<string, unknown>) || {};
    if (provider && conn) {
      rehydrateAlibabaFreeDrainedModelLocks(provider, connectionId, connProviderSpecificData);
    }
    const connectionPassthroughModels = connProviderSpecificData.passthroughModels as
      boolean | undefined;
    // #2997: per-connection opt-out of the TRANSIENT connection cooldown. When set,
    // a recoverable failure records lastError/backoff but does NOT cool the
    // connection, so getProviderCredentials keeps selecting it. Terminal states
    // (banned/expired/credits_exhausted) are unaffected — they are resolved below
    // via resolveTerminalConnectionStatus() and still take the connection out.
    // NOTE: this first cut scopes the opt-out to the CONNECTION-level cooldown only;
    // per-model lockout branches (per-model quota 403/404, codex scope) are left
    // as-is — extending disableCooling to model lockout is a follow-up.
    const disableCooling = connProviderSpecificData.disableCooling === true;

    const isPerModelQuotaProvider = hasPerModelQuota(provider, model, connectionPassthroughModels);

    // #10334 — agentrouter EXCLUSIVE: the matched provider rule declared scope
    // "connection" for account-wide quota exhaustion ("额度不足"). agentrouter is
    // a passthroughModels provider (isPerModelQuotaProvider === true), so without
    // this branch the next `if` would treat it like any other passthrough 429 and
    // lock a SINGLE model — leaving combo routing to burn one upstream call per
    // remaining model of the same exhausted account. Must run BEFORE that block.
    // Deliberately ignores persistUnavailableState/isCombo: for combo the caller
    // downgrades persistUnavailableState to false, and the generic path further
    // below would then lock per MODEL instead of cooling the connection — exactly
    // what this scope must override. NEVER sets a terminal status: this is a
    // renewing quota window, not "credits_exhausted"/"banned"/"expired".
    //
    // The "never terminal" invariant above is NOT structurally guaranteed by
    // ruleScope === "connection" alone — see isAgentrouterConnectionQuotaScope's
    // doc comment for why (a future permanent-state rule could pair scope
    // "connection" with a non-quota reason). That predicate is the actual guard.
    const ruleScopeIsConnection = isAgentrouterConnectionQuotaScope(provider, fallbackResult);
    // #2997's disableCooling opt-out is respected here (`!disableCooling` below):
    // a connection with disableCooling=true skips this branch entirely and falls
    // into the per-model-quota block further down, which locks the model for up
    // to ~30min (mlSettings.maxCooldownMs) instead of cooling the connection for
    // the rule's shorter transient window. That is a deliberate, if counter-
    // intuitive, consequence of #2997's scope (opt-out was designed only for the
    // CONNECTION-level cooldown, never extended to model lockout) — "opting out
    // of cooldown" ends up producing a LONGER effective block for this one rule.
    // Not addressed here; flagged for a future #2997 follow-up if it proves to be
    // a real operator complaint.
    if (ruleScopeIsConnection && provider && !disableCooling) {
      const connectionCooldownMs =
        fallbackResult.cooldownMs > 0 ? fallbackResult.cooldownMs : COOLDOWN_MS.rateLimit;
      await updateProviderConnection(connectionId, {
        lastErrorType: fallbackResult.reason || RateLimitReason.QUOTA_EXHAUSTED,
        lastError: `Account quota exhausted (${provider})`,
        lastErrorAt: new Date().toISOString(),
        errorCode: status,
        backoffLevel: fallbackResult.newBackoffLevel ?? backoffLevel,
        rateLimitedUntil: getUnavailableUntil(connectionCooldownMs),
        testStatus: "unavailable",
      });
      log.info(
        "AUTH",
        `Connection-scoped cooldown for ${provider}:${connectionId.slice(0, 8)} — ${status} ${fallbackResult.reason} ${Math.ceil(connectionCooldownMs / 1000)}s (rule scope=connection, overrides per-model lockout)`
      );
      return { shouldFallback: true, cooldownMs: connectionCooldownMs };
    }

    // #10880 — egress-bucketed providers: the upstream quota is per EGRESS IP,
    // not per account (the opencode free tier is IP-bucketed, not
    // account-bucketed — see #9611). When such a provider confirms a status
    // 429 classified quota_exhausted OR rate_limit_exceeded, every
    // allowlisted-family connection egressing through the same IP shares the
    // exhausted budget — cool them all down BEFORE they are tried, so the
    // rotation does not burn one guaranteed-failed upstream call per sibling
    // (same N-1 shape as #10460/#10525). Must run AFTER the agentrouter branch
    // (that one owns connection-scoped rules) and BEFORE the per-model block.
    // NEVER sets a terminal status: a renewing quota window, not
    // credits_exhausted/banned/expired. Best-effort: if the connection's last
    // known egress IP cannot be resolved (cold cache), behavior is unchanged.
    //
    // The status===429 gate keeps the documented "a 429 classified…" scope:
    // a 402/403 (status_402/status_403 → quota_exhausted) or a 400/500 with
    // quota/rate-limit text is an ACCOUNT-scoped signal and must not cool the
    // IP family.
    //
    // Deliberately ignores persistUnavailableState/isCombo, exactly like the
    // agentrouter branch above and for the same reason: for combo the caller
    // downgrades persistUnavailableState to false, and the generic path below
    // would then lock per MODEL instead of cooling the connection — which says
    // nothing about the exhausted IP, so the combo rotation would keep burning
    // one guaranteed-failed call per sibling. A per-model lockout is not a
    // weaker form of this scope, it is the wrong unit.
    //
    // RATE_LIMIT_EXCEEDED is deliberately included: markAccountUnavailable
    // never passes headers/structuredError to checkFallbackError and opencode
    // is not in FULL_TEXT_RULE_PROVIDERS, so the opencode-specific rules
    // (body reset hint / x-ratelimit-remaining-requests) never match on this
    // path — the real opencode 429 ("monthly usage limit reached") is
    // intercepted by the subscription-quota text fallback
    // (quotaTextCooldowns.ts, quota_exhausted 1h); allowlisted siblings with
    // quota-text-free envelopes (e.g. "rate limit reached") land on
    // status_429 -> rate_limit_exceeded. For an allowlisted provider an
    // IP-bucketed rate limit is the same signal as an exhausted quota.
    const egressBucketed = isEgressBucketedLockScope(provider);
    if (
      status === 429 &&
      egressBucketed &&
      (fallbackResult.reason === RateLimitReason.QUOTA_EXHAUSTED ||
        fallbackResult.reason === RateLimitReason.RATE_LIMIT_EXCEEDED) &&
      !fallbackResult.permanent &&
      !fallbackResult.creditsExhausted &&
      !disableCooling
    ) {
      const connectionCooldownMs =
        fallbackResult.cooldownMs > 0 ? fallbackResult.cooldownMs : COOLDOWN_MS.rateLimit;
      // CRITICAL: mark the failing connection C HERE, mirroring the
      // connection-scoped agentrouter branch just above. The branch returns
      // right after, so neither the per-model quota block below (opencode is
      // passthroughModels:true — it would call recordModelLockoutFailure
      // instead) nor the generic persistence path at the end of the function
      // is ever reached. Without this write, C stays "active" → retried next
      // episode (1 wasted call/episode) and backoffLevel/lastError never set.
      await updateProviderConnection(connectionId, {
        lastErrorType: fallbackResult.reason || RateLimitReason.QUOTA_EXHAUSTED,
        lastError: `Shared egress IP quota exhausted (${provider})`,
        lastErrorAt: new Date().toISOString(),
        errorCode: status,
        backoffLevel: fallbackResult.newBackoffLevel ?? backoffLevel,
        rateLimitedUntil: getUnavailableUntil(connectionCooldownMs),
        testStatus: "unavailable",
      });
      await applyEgressIpLockout(
        connectionId,
        provider!,
        connectionCooldownMs,
        fallbackResult.reason
      );
      return { shouldFallback: true, cooldownMs: connectionCooldownMs };
    }

    const isNvidiaModelGone = provider === "nvidia" && status === 410;
    const modelLockoutOptions = { maxCooldownMs: effectiveProviderProfile?.maxCooldownMs };
    if (
      isPerModelQuotaProvider &&
      provider &&
      provider !== "codex" &&
      model &&
      (status === 404 || isNvidiaModelGone || status === 429 || status >= 500)
    ) {
      const reason =
        status === 404 || isNvidiaModelGone
          ? "not_found"
          : status === 429 && fallbackResult.reason === RateLimitReason.QUOTA_EXHAUSTED
            ? "quota_exhausted"
            : status === 429
              ? "rate_limited"
              : "server_error";

      // #5976: a bare 500 is intermittent and NOT model-specific — skip
      // lockout/cooldown ONLY for the exact 500 (the contract its own tests pin:
      // combo-provider-cooldown-sibling.test.ts — "Gemini 503 should NOT skip
      // cooldown"). 502/503/504 keep the pre-#6216 model-lockout path: cooldownMs
      // 0 hot-loops the failing upstream (broke resilience-http-e2e on the PR).
      if (status === 500) {
        updateProviderConnection(connectionId, {
          lastErrorType: reason,
          lastError: `Model ${model} ${reason}`,
          lastErrorAt: new Date().toISOString(),
          errorCode: status,
        }).catch(() => {});
        log.info(
          "AUTH",
          `Server error for ${provider}:${model} — ${status} ${reason} (no model lockout, connection stays active for sibling models)`
        );
        return { shouldFallback: true, cooldownMs: 0 };
      }

      const usesExactAntigravityLock = provider === "antigravity";
      const quotaScope = usesExactAntigravityLock
        ? "model"
        : getQuotaScopeLabelForProvider(provider, model);
      const antigravityFamilyInferredBaseCooldownMs =
        !usesExactAntigravityLock &&
        provider === "antigravity" &&
        quotaScope === "family" &&
        status === 429
          ? ANTIGRAVITY_FAMILY_INFERRED_BASE_COOLDOWN_MS
          : null;
      const lockout = recordModelLockoutFailure(
        provider,
        connectionId,
        model,
        reason,
        status,
        status === 404 || isNvidiaModelGone
          ? (effectiveProviderProfile?.baseCooldownMs ?? COOLDOWN_MS.notFoundLocal)
          : (antigravityFamilyInferredBaseCooldownMs ??
              fallbackResult.baseCooldownMs ??
              effectiveProviderProfile?.baseCooldownMs ??
              0),
        effectiveProviderProfile,
        {
          ...modelLockoutOptions,
          exactCooldownMs:
            fallbackResult.usedUpstreamRetryHint === true
              ? fallbackResult.cooldownMs
              : (fallbackResult.quotaResetHintMs ?? null),
          maxCooldownMs: mlSettings.maxCooldownMs,
          scope: usesExactAntigravityLock ? "exact" : undefined,
          // Only a transport header or google.rpc.RetryInfo can bypass maxCooldownMs.
          // Prose and generic JSON hints remain exact but operator-capped.
          exactCooldownIsUpstreamReset: retryHintBypassesMaxCooldownMs(
            fallbackResult.retryHintSource
          ),
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
      persistAntigravityFamilyCooldownIfQuota({ provider, connectionId, model, cooldownMs: lockout.cooldownMs, reason });
      return { shouldFallback: true, cooldownMs: lockout.cooldownMs };
    }
    const result = fallbackResult;
    const { shouldFallback, cooldownMs: rawCooldownMs, newBackoffLevel, reason } = result;
    if (!shouldFallback) return { shouldFallback: false, cooldownMs: 0 };
    const providerErrorType = classifyProviderError(status, errorText, provider);

    if (
      isAlibabaModelStudioProvider(provider) &&
      status === 403 &&
      model &&
      isAlibabaFreeQuotaExhaustedError(errorText)
    ) {
      const billingMode = getAlibabaBillingMode(connProviderSpecificData);
      if (billingMode === "free") {
        const persistedProviderSpecificData = mergeAlibabaFreeDrainedModels(
          connProviderSpecificData,
          model
        );
        await updateProviderConnection(connectionId, {
          providerSpecificData: persistedProviderSpecificData,
          lastErrorType: "free_quota_exhausted",
          lastError: `Model ${model} free quota exhausted`,
          lastErrorAt: new Date().toISOString(),
          errorCode: status,
        });
        rehydrateAlibabaFreeDrainedModelLocks(
          provider!,
          connectionId,
          persistedProviderSpecificData
        );
        recordModelLockoutFailure(
          provider!,
          connectionId,
          model!,
          "free_quota_exhausted",
          status,
          0,
          effectiveProviderProfile,
          {
            exactCooldownMs: ALIBABA_FREE_DRAINED_LOCK_MS,
            maxCooldownMs: ALIBABA_FREE_DRAINED_LOCK_MS,
          }
        );
        log.info(
          "AUTH",
          `Alibaba free-tier drain for ${provider}:${model} — model permanently removed from routing (billingMode=free)`
        );
        return { shouldFallback: true, cooldownMs: 0 };
      }
    }

    if (provider && resolveProviderId(provider) === "grok-web" && status === 403 && model) {
      const lockout = recordModelLockoutFailure(
        provider,
        connectionId,
        model,
        "forbidden",
        status,
        effectiveProviderProfile?.baseCooldownMs ?? COOLDOWN_MS.serviceUnavailable,
        effectiveProviderProfile,
        { maxCooldownMs: mlSettings.maxCooldownMs }
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

    let terminalStatus = resolveTerminalConnectionStatus(
      status,
      result as { permanent?: boolean; creditsExhausted?: boolean },
      providerErrorType,
      provider,
      isPerModelQuotaProvider,
      errorText
    );
    // A still-valid access token after a successful refresh is not "expired".
    // A follow-up 401 (timeout, hop, race) must cooldown, not park the account.
    const tokenExpiryMs = Date.parse(String(conn?.tokenExpiresAt || conn?.expiresAt || ""));
    if (
      terminalStatus === "expired" &&
      Number.isFinite(tokenExpiryMs) &&
      tokenExpiryMs > Date.now() + 60_000
    ) {
      terminalStatus = null;
    }
    const cachedQuotaResetAt =
      providerErrorType === PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED ||
      reason === RateLimitReason.QUOTA_EXHAUSTED
        ? getCachedQuotaResetAt(connectionId)
        : null;
    const cachedQuotaResetMs = parseFutureDateMs(cachedQuotaResetAt);
    const cooldownMs = terminalStatus
      ? 0
      : cachedQuotaResetMs
        ? cachedQuotaResetMs - Date.now()
        : rawCooldownMs;

    // ── #3027 / #12242 (402 variant): per-model subscription (403) or
    // per-model billing (402) error on a passthrough/gateway provider →
    // model-only lockout, connection stays active. A 402 here is a specific
    // model needing credit, not a dead credential — sibling (e.g. free)
    // models on the same connection remain usable and must not be knocked
    // out. Deliberately excludes single-credential providers, where a 402
    // genuinely does mean the key is out of credit (see #5239 / #10616) —
    // isPerModelQuotaProvider is false there, so this branch never fires and
    // the connection-wide credits_exhausted path above still applies.
    if (
      isPerModelQuotaProvider &&
      (status === 403 || status === 402) &&
      provider &&
      model &&
      !terminalStatus &&
      !(provider === "vertex" && isVertexConnectionWidePermissionDenied(errorText))
    ) {
      const lockoutReason = status === 402 ? "credits" : "forbidden";
      const lockout = recordModelLockoutFailure(
        provider,
        connectionId,
        model,
        lockoutReason,
        status,
        fallbackResult.baseCooldownMs ??
          effectiveProviderProfile?.baseCooldownMs ??
          COOLDOWN_MS.serviceUnavailable,
        effectiveProviderProfile,
        {
          ...modelLockoutOptions,
          exactCooldownMs:
            fallbackResult.usedUpstreamRetryHint === true ? fallbackResult.cooldownMs : null,
          maxCooldownMs: mlSettings.maxCooldownMs,
        }
      );
      updateProviderConnection(connectionId, {
        lastErrorType: lockoutReason,
        lastError:
          status === 402
            ? `Model ${model} out of credits (per-model billing)`
            : `Model ${model} forbidden (per-model access/subscription)`,
        lastErrorAt: new Date().toISOString(),
        errorCode: status,
      }).catch(() => {});
      log.info(
        "AUTH",
        `Model-only lockout for ${provider}:${model} — ${status} ${lockoutReason} ${Math.ceil(lockout.cooldownMs / 1000)}s (per-model quota provider, connection stays active)`
      );
      return { shouldFallback: true, cooldownMs: lockout.cooldownMs };
    }

    // ── 404 model-only lockout: connection stays active ──
    // For local providers (detected by URL), a 404 means the specific model
    // doesn't exist or isn't available for this account — it should NOT lock
    // out the entire connection.
    const connBaseUrl = (conn?.providerSpecificData as Record<string, unknown>)?.baseUrl as
      string | undefined;

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
        effectiveProviderProfile,
        { maxCooldownMs: mlSettings.maxCooldownMs }
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
    const errorMsg =
      sanitizeErrorMessage(describeUpstreamFailure(errorText)) || "Provider request failed";

    // T09: Codex per-scope lockout (do not block the whole account globally).
    if (
      provider === "codex" &&
      status === 429 &&
      typeof model === "string" &&
      model.trim().length > 0 &&
      conn
    ) {
      const scope = getCodexModelScope(model);
      const scopeRateLimitedUntil =
        getCodexChildCooldown(conn, model) || getUnavailableUntil(cooldownMs);
      const scopeCooldownMs = Math.max(new Date(scopeRateLimitedUntil).getTime() - Date.now(), 0);

      await persistCodexChildCooldown({
        connectionId,
        model,
        rateLimitedUntil: scopeRateLimitedUntil,
      });

      if (scopeCooldownMs > 0) {
        lockModel(provider, connectionId, model, reason || "unknown", scopeCooldownMs);
      }

      if (status && errorMsg) {
        console.error(`❌ ${provider} [${status}] (${scope}): ${errorMsg}`);
      }

      return { shouldFallback: true, cooldownMs: scopeCooldownMs };
    }

    // A Codex quota response without a model cannot be assigned to either virtual child.
    // Preserve failover without inventing a third parent-level quota/cooldown state.
    if (provider === "codex" && status === 429) {
      return { shouldFallback: true, cooldownMs };
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
      // Combo-managed transient failure (e.g. 429): keep the connection clean in
      // the DB, but record an in-memory model lockout so credential selection
      // skips this exact provider+connection+model while it cools down — other
      // models on the same connection stay usable.
      if (provider && model && cooldownMs > 0) {
        lockModel(provider, connectionId, model, reason || "unknown", cooldownMs);
      }
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

    // T-AUTODISABLE: permanent bans disable immediately when the setting allows it.
    await maybeAutoDisableBannedAccount({
      connectionId,
      provider,
      authType: conn?.authType,
      connectionProvider: conn?.provider,
      permanent: Boolean((result as { permanent?: boolean }).permanent),
    });

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

/**
 * Optional CAS token. When provided, clearConnectionErrorIfUnchanged atomically
 * aborts if another path modified the row after the caller's snapshot.
 * This closes the TOCTOU window; omission preserves unconditional clearing.
 */
export interface RecoveredStateExpectation {
  testStatus: string | null;
  lastErrorAt: string | null;
  rateLimitedUntil: string | null;
}
export async function clearRecoveredProviderState(
  credentials: unknown,
  expectedState?: RecoveredStateExpectation
): Promise<{ applied: boolean }> {
  const recoverable = credentials as Partial<RecoverableConnectionState> | null;
  if (typeof recoverable?.connectionId !== "string" || !recoverable.connectionId)
    return { applied: false };
  if (expectedState) {
    const applied = await clearConnectionErrorIfUnchanged(recoverable.connectionId, expectedState);
    if (!applied) {
      log.info(
        "AUTH",
        `Skipped recovery clear for ${recoverable.connectionId.slice(0, 8)} — state changed concurrently (CAS miss)`
      );
      return { applied: false };
    }
    log.info("AUTH", `Account ${recoverable.connectionId.slice(0, 8)} error cleared (CAS)`);
    return { applied: true };
  }
  await clearAccountError(recoverable.connectionId, recoverable);
  return { applied: true };
}
type AuthRequestLike = {
  headers?: AuthRequestHeaders | null;
  url?: string | null;
};
function readNonEmptyUrlToken(request: AuthRequestLike): string | null {
  if (typeof request?.url !== "string" || request.url.trim().length === 0) return null;

  try {
    const url = new URL(request.url, "http://localhost");

    const segments = url.pathname
      .split("/")
      .map((segment) => segment.trim())
      .filter(Boolean);

    if (segments[0] === "vscode" && segments[1]) {
      const decodedSegment = decodeURIComponent(segments[1]).trim();
      if (decodedSegment.length > 0) return decodedSegment;
    }

    if (segments[0] === "api" && segments[1] === "v1" && segments[2] === "vscode") {
      if (segments[3] && segments[3] !== "raw" && segments[3] !== "combos") {
        const decodedSegment = decodeURIComponent(segments[3]).trim();
        if (decodedSegment.length > 0) return decodedSegment;
      }

      if ((segments[3] === "raw" || segments[3] === "combos") && segments[4]) {
        const decodedSegment = decodeURIComponent(segments[4]).trim();
        if (decodedSegment.length > 0) return decodedSegment;
      }
    }

    // NOTE: query-string token fallbacks (`?token=`/`?key=`/`?apiKey=`/`?api_key=`)
    // were intentionally REMOVED. They are a broad credential-in-URL surface that
    // leaks into access logs, Referer headers and proxy logs, and — because this
    // extractor also feeds management auth — would let `?token=<mgmt-key>`
    // authenticate management routes. The VS Code integration only needs the
    // path-scoped `/vscode/<token>/…` form above. (security review, #3300 follow-up)
  } catch {
    return null;
  }

  return null;
}

/**
 * Extract API key from request auth inputs.
 *
 * Honors explicit auth headers and (for client-facing routes only) a
 * path-scoped URL token:
 * - `Authorization: Bearer <key>` (OpenAI / OmniRoute / Codex CLI / Bearer clients)
 * - `x-api-key: <key>` (Anthropic Messages API contract — Claude Code,
 *   `@anthropic-ai/sdk`, any SDK that sets `anthropic-version`) / `x-goog-api-key` (#7034)
 * - `/vscode/<key>/...` (path-scoped tokenized aliases — only when `allowUrl`)
 *
 * When multiple inputs are present, explicit auth headers win.
 *
 * The `x-api-key` fallback only triggers when the request also carries an
 * `anthropic-version` header — the documented signal that the caller is
 * speaking the Anthropic Messages API contract. Without this scoping,
 * non-Anthropic SDKs that happen to set `x-api-key` (or local-mode tools
 * with placeholder keys) would be treated as authenticated attempts and
 * rejected by per-route gates that compare against OmniRoute keys.
 *
 * `opts.allowUrl` (default `true`) gates the path-scoped URL token. Management
 * auth MUST pass `allowUrl: false` — a credential in the URL must never
 * authenticate a management route (it leaks into logs/Referer and would widen
 * the management surface). See the #3300 security follow-up.
 */
export function extractApiKey(request: AuthRequestLike, opts?: { allowUrl?: boolean }) {
  const authHeader =
    readHeaderValue(request?.headers, "Authorization") ||
    readHeaderValue(request?.headers, "authorization");
  if (typeof authHeader === "string") {
    const trimmedHeader = authHeader.trim();
    if (trimmedHeader.toLowerCase().startsWith("bearer ")) {
      return trimmedHeader.slice(7).trim() || null;
    }
  }

  // Issue #2225: Anthropic Messages API clients authenticate via x-api-key.
  // Gate the fallback on anthropic-version OR a claude-code/anthropic user-agent so we
  // don't trip up local-mode requests from non-Anthropic clients that send placeholder
  // x-api-key values (which would otherwise be rejected as Invalid API key).
  const anthropicVersion =
    readHeaderValue(request?.headers, "anthropic-version") ||
    readHeaderValue(request?.headers, "Anthropic-Version");
  const userAgent =
    readHeaderValue(request?.headers, "user-agent") ||
    readHeaderValue(request?.headers, "User-Agent");
  if (anthropicVersion || (userAgent && /claude-code|claude-cli|anthropic/i.test(userAgent))) {
    const xApiKey =
      readHeaderValue(request?.headers, "x-api-key") ||
      readHeaderValue(request?.headers, "X-Api-Key");
    if (typeof xApiKey === "string") {
      const trimmed = xApiKey.trim();
      if (trimmed.length > 0) return trimmed;
    }
  }

  const xGoogApiKey = extractGoogApiKeyHeader(request?.headers); // Issue #7034
  if (xGoogApiKey) return xGoogApiKey;
  if (opts?.allowUrl === false) return null;
  return readNonEmptyUrlToken(request);
}

/**
 * Validate API key (optional - for local use can skip).
 * Feature #1350: Supports OMNIROUTE_API_KEY / ROUTER_API_KEY env vars as
 * persistent passthrough keys that always validate, surviving Docker
 * restarts and backup restores without DB dependency.
 */
export async function isValidApiKey(apiKey: string) {
  if (!apiKey) return false;

  // Persistent env-var key — always valid regardless of DB state (#1350)
  const envKey = process.env.OMNIROUTE_API_KEY || process.env.ROUTER_API_KEY;
  if (envKey && apiKey === envKey) return true;

  return await validateApiKey(apiKey);
}
