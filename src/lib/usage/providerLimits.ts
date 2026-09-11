import {
  getProviderConnectionById,
  getProviderConnections,
  updateProviderConnection,
} from "@/lib/db/providers";
import { getSettings, resolveProxyForConnection, updateSettings } from "@/lib/db/settings";
import {
  getAllProviderLimitsCache,
  getProviderLimitsCache,
  setProviderLimitsCache,
  setProviderLimitsCacheBatch,
  type ProviderLimitsCacheEntry,
} from "@/lib/db/providerLimits";
import { syncToCloud } from "@/lib/cloudSync";
import { setQuotaCache } from "@/domain/quotaCache";
import { buildClaudeExtraUsageConnectionUpdate } from "@/lib/providers/claudeExtraUsage";
import { clearRecoveredProviderState } from "@/sse/services/auth";
import { getMachineId } from "@/shared/utils/machine";
import { supportsProviderQuota } from "@/shared/utils/providerQuotaVisibility";
import { mergeProviderLimitsCacheEntry, toProviderLimitsCacheEntry } from "./providerLimitsCache";
import { getCredentialRefreshExecutor } from "@omniroute/open-sse/executors/credential.ts";
import { getUsageForProvider } from "@omniroute/open-sse/services/usage.ts";
import { cooldownUntilMs } from "@omniroute/open-sse/services/accountFallback.ts";
import { rotationGroupFor } from "@omniroute/open-sse/services/refreshSerializer.ts";
import {
  extractCodeAssistOnboardTierId,
  extractCodeAssistSubscriptionTier,
} from "@omniroute/open-sse/services/codeAssistSubscription.ts";
import {
  extractAntigravityProjectIdFromPayload,
  getStoredAntigravityProjectId,
} from "@omniroute/open-sse/services/antigravityProjectPersistence.ts";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { onUsageRecorded } from "./usageEvents";
import {
  isRecord,
  isUsageQuotaKeyAllowed,
  normalizeUsageQuotasForProvider,
  sanitizeUsageQuotasForProvider,
} from "./providerLimits/quotaNormalize";
import { syncInChunksWithSpacing } from "./providerLimits/chunkedSpacingSync";
import {
  refreshAndUpdateCredentialsWithResolver,
  type CredentialRefreshOptions,
  type ProviderConnectionLike,
} from "./providerLimits/credentialRefresh";
export { shouldAttemptRotatingRefresh } from "./providerLimits/credentialRefresh";
type JsonRecord = Record<string, unknown>;
type SyncSource = "manual" | "scheduled";

const PROVIDER_LIMITS_APIKEY_PROVIDERS = new Set([
  "glm",
  "glm-cn",
  "zai",
  "glmt",
  "opencode-go",
  "ollama-cloud",
  "minimax",
  "minimax-cn",
  "crof",
  "nanogpt",
  "deepseek",
  "xiaomi-mimo",
  "vertex",
  "vertex-partner",
  "kimi-coding-apikey",
  "kiro",
  // Qoder connections are PAT-based (authType "apikey"); the usage fetcher
  // exchanges the PAT for a job token and reads openapi.qoder.sh/user/status.
  "qoder",
  "promptql", // PromptQL playground JWT → getCreditSummary USD credits
  "pql",
  // Adobe Firefly: web-cookie / JWT stored as apikey → credits/balance
  "adobe-firefly",
  "firefly",
  // HyperAgent session cookie → billing/usage creditBlocks
  "hyperagent",
  "ha",
  "firecrawl",
  // Volcano Ark Plan subscriptions (agent-plan / coding-plan)
  "volcengine-agent-plan",
  "volcengine-coding-plan",
  // Command Code API key → /alpha/billing/credits + windowLimits
  "command-code",
  "conol-web",
  "cnl",
  // Alibaba Coding Plan (console API key) + Qwen personal Token Plan (console cookie) — #9603
  "bailian-coding-plan",
  "qwen-cloud-token-plan",
  // AgentRouter (New-API) console System Access Token + New-Api-User id (providerSpecificData)
  "agentrouter",
  // OpenRouter API key → /key limits + /credits account balance
  "openrouter",
]);
const DEFAULT_PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES = 70;
const PROVIDER_LIMITS_AUTO_SYNC_SETTING_KEY = "provider_limits_auto_sync_last_run";
const DEFAULT_PROVIDER_LIMITS_POST_USAGE_REFRESH_DELAY_MS = 5_000;
const pendingPostUsageRefreshes = new Set<string>();

function getProviderLimitsPostUsageRefreshDelayMs(): number {
  const raw = Number(process.env.PROVIDER_LIMITS_POST_USAGE_REFRESH_DELAY_MS ?? "");
  return Number.isFinite(raw) && raw >= 0
    ? raw
    : DEFAULT_PROVIDER_LIMITS_POST_USAGE_REFRESH_DELAY_MS;
}

function scheduleProviderLimitsPostUsageRefresh(connectionId: string): void {
  if (!connectionId || pendingPostUsageRefreshes.has(connectionId)) return;

  pendingPostUsageRefreshes.add(connectionId);
  const timer = setTimeout(() => {
    pendingPostUsageRefreshes.delete(connectionId);
    void fetchAndPersistProviderLimits(connectionId, "scheduled", {
      allowRotatingRefresh: true,
    }).catch((error) => {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(
        `[ProviderLimits] Post-usage refresh failed for connection ${connectionId}: ${message}`
      );
    });
  }, getProviderLimitsPostUsageRefreshDelayMs());
  timer.unref?.();
}

export function notifyProviderUsageRecorded(
  provider: string | null | undefined,
  connectionId: string | null | undefined
): void {
  if ((provider !== "antigravity" && provider !== "agy") || !connectionId) return;
  scheduleProviderLimitsPostUsageRefresh(connectionId);
}

// Subscribe at module load so usageHistory can emit usage events without importing
// this module (and its executors/translator import graph). This module is loaded by
// the provider-limits route and the background auto-sync scheduler at server boot.
onUsageRecorded(notifyProviderUsageRecorded);

function hasRetrieveUserQuotaSource(
  provider: string,
  cache: ProviderLimitsCacheEntry | undefined
): boolean {
  if (provider !== "antigravity" && provider !== "agy") return true;
  if (!cache?.quotas) return false;
  return Object.values(cache.quotas).some((quota) => {
    if (!isRecord(quota)) return false;
    return quota.quotaSource === "retrieveUserQuota";
  });
}

function sanitizeProviderLimitsCacheForConnection(
  connection: ProviderConnectionLike | null | undefined,
  entry: ProviderLimitsCacheEntry | null
): ProviderLimitsCacheEntry | null {
  if (!connection || !entry || !entry.quotas) return entry;
  if (connection.provider !== "antigravity" && connection.provider !== "agy") return entry;

  const sanitizedQuotas = normalizeUsageQuotasForProvider(connection.provider, entry.quotas);
  return sanitizedQuotas === entry.quotas ? entry : { ...entry, quotas: sanitizedQuotas };
}

function shouldRefreshProviderLimitsCache(
  connection: ProviderConnectionLike,
  cache: ProviderLimitsCacheEntry | undefined
): boolean {
  if (!cache?.quotas) return true;
  if (connection.provider !== "antigravity" && connection.provider !== "agy") return false;

  return (
    !hasRetrieveUserQuotaSource(connection.provider, cache) ||
    Object.keys(cache.quotas).some(
      (quotaKey) => !isUsageQuotaKeyAllowed(connection.provider, quotaKey)
    )
  );
}

export function isSupportedUsageConnection(connection: ProviderConnectionLike | null): boolean {
  if (!connection?.provider) return false;

  if (connection.authType === "oauth") {
    return supportsProviderQuota(connection.provider, connection);
  }
  if (connection.authType !== "apikey" && connection.authType !== "api_key") return false;
  if (PROVIDER_LIMITS_APIKEY_PROVIDERS.has(connection.provider)) return true;
  return supportsProviderQuota(connection.provider, connection);
}

function withStatus(error: Error, status: number): Error & { status: number } {
  return Object.assign(error, { status });
}

async function syncToCloudIfEnabled() {
  try {
    const machineId = await getMachineId();
    if (!machineId) return;
    await syncToCloud(machineId);
  } catch (error) {
    console.error("[ProviderLimits] Error syncing refreshed credentials to cloud:", error);
  }
}

export async function refreshAndUpdateCredentials(
  connection: ProviderConnectionLike,
  opts: CredentialRefreshOptions = {}
) {
  return refreshAndUpdateCredentialsWithResolver(connection, getCredentialRefreshExecutor, opts);
}

function isUsageAuthError(message: unknown): boolean {
  if (typeof message !== "string") return false;
  const m = message.toLowerCase();
  return (
    m.includes("token expired") ||
    m.includes("unauthorized") ||
    m.includes("re-authenticate") ||
    m.includes("access denied") ||
    m.includes("invalidated") ||
    m.includes("401")
  );
}

function isNetworkFailureMessage(message: unknown): boolean {
  if (typeof message !== "string") return false;
  return (
    message.includes("fetch failed") ||
    message.includes("ECONNREFUSED") ||
    message.includes("ETIMEDOUT") ||
    message.includes("Proxy unreachable") ||
    message.includes("UND_ERR_CONNECT_TIMEOUT")
  );
}

function isAccountScopedProxyResolution(proxyInfo: unknown): boolean {
  if (!isRecord(proxyInfo)) return false;
  if (!proxyInfo.proxy) return false;
  return proxyInfo.level === "key" || proxyInfo.level === "account";
}

function shouldFailClosedForProviderLimitsProxy(
  connection: ProviderConnectionLike,
  proxyInfo: unknown
): boolean {
  return connection.authType === "oauth" && isAccountScopedProxyResolution(proxyInfo);
}

/**
 * Decide whether the quota-sync path should flag a connection `expired` from an
 * auth-style usage error. Exported for unit testing.
 *
 * Rotating-refresh providers (Codex/OpenAI/Claude/etc. — see refreshSerializer's
 * ROTATION_LOCK_GROUP) have their access_token deliberately NOT proactively
 * refreshed in this quota path (#3019, to avoid the Auth0 family-revocation
 * cascade). So a "token expired" from the quota fetch is a recoverable
 * false-negative: the credential is still valid (its `expires_at` is in the
 * future) and the reactive, serialized 401 path refreshes the access_token on
 * next use. Flagging it `expired` hides a healthy account from the quota page
 * (observed: freshly-added Codex accounts flagged expired while a providers-page
 * refresh turns them green). So never mark a rotating provider expired from the
 * quota sync — leave its status to the reactive path / connection test.
 */
export function quotaPathShouldMarkExpired(
  provider: string,
  usageMessage: unknown,
  currentTestStatus: string | null | undefined
): boolean {
  if (currentTestStatus === "expired") return false;

  const message = typeof usageMessage === "string" ? usageMessage.toLowerCase() : "";
  const isAuthError =
    message.includes("token expired") ||
    message.includes("access denied") ||
    message.includes("re-authenticate") ||
    message.includes("unauthorized");
  if (!isAuthError) return false;

  if (rotationGroupFor(provider) !== null) return false;

  return true;
}

const TERMINAL_STATUSES_FOR_QUOTA_RECOVERY = new Set([
  "credits_exhausted",
  "banned",
  "expired",
  "deactivated",
]);

function isTerminalStatusForQuotaRecovery(testStatus: string | null | undefined): boolean {
  if (!testStatus) return false;
  return TERMINAL_STATUSES_FOR_QUOTA_RECOVERY.has(testStatus);
}

export function hasUsableQuota(usage: JsonRecord): boolean {
  const quotas = usage?.quotas;
  if (!isRecord(quotas)) return false;
  for (const value of Object.values(quotas)) {
    if (!isRecord(value)) continue;
    if (value.unlimited === true) return true;
    const remaining =
      typeof value.remaining === "number"
        ? value.remaining
        : typeof value.remainingPercentage === "number"
          ? value.remainingPercentage
          : null;
    if (remaining !== null && remaining > 0) return true;
  }
  return false;
}

// A SYNTHETIC cooldown (persisted by a poller without a parseable upstream
// reset — e.g. the Claude-subscription SUBSCRIPTION_QUOTA_COOLDOWN_MS lock) may
// be overruled only by POSITIVE live-window evidence: EVERY reported quota
// window is replenished (remaining > 0) AND carries a documented reset
// timestamp that has already elapsed. Unknown-reset windows never authorize an
// override (matching the kimi-coding partial-refresh semantics);
// `unlimited` windows carry no reset evidence and are rejected.
export function syntheticCooldownOutlivedByRealWindows(
  usage: JsonRecord,
  nowMs: number = Date.now()
): boolean {
  if (!isRecord(usage) || !isRecord(usage.quotas)) return false;
  const windows = Object.values(usage.quotas);
  if (windows.length === 0) return false;
  for (const value of windows) {
    if (!isRecord(value) || value.unlimited === true) return false;
    const remaining =
      typeof value.remaining === "number"
        ? value.remaining
        : typeof value.remainingPercentage === "number"
          ? value.remainingPercentage
          : null;
    if (remaining === null || remaining <= 0) return false;
    if (value.resetAt == null) return false;
    const resetMs = Date.parse(String(value.resetAt));
    if (Number.isNaN(resetMs) || resetMs > nowMs) return false;
  }
  return true;
}

/**
 * Is an explicit cooldown still in the future?
 *
 * A rateLimitedUntil set by the upstream 429 handler is a hard statement and
 * must never be overruled by a quota poll.
 *
 * Gate on the timestamp alone; lastErrorType stays irrelevant here.
 */
export function hasActiveCooldown(
  connection: Pick<ProviderConnectionLike, "rateLimitedUntil">,
  now: number = Date.now()
): boolean {
  if (!connection.rateLimitedUntil) return false;
  // #3954: the rate_limited_until TEXT column holds an ISO string (dashboard/AUTH
  // path) OR numeric epoch ms (setConnectionRateLimitUntil, the chat path). A bare
  // `new Date(String(...))` yields Invalid Date for the numeric form, which read as
  // "no cooldown" and let every poller wipe a chat-path-written lockout. Use the
  // canonical parser connectionRecovery.ts already relies on.
  const until = cooldownUntilMs(connection.rateLimitedUntil as string | number | null | undefined);
  return Number.isFinite(until) && until > now;
}

/**
 * Whether a connection test may wipe the persisted error/cooldown state.
 *
 * A successful probe proves the CREDENTIAL is valid; it does not prove an
 * exhausted quota window reopened — the probe is a cheap auth/models call that
 * never touches the chat quota a weekly cap applies to. The credential-health
 * scheduler runs that probe against every connection every 300s, so without this
 * gate a weekly-capped connection was reset to `active` / `rateLimitedUntil=null`
 * within 30s of every restart and dispatched straight back into the same 429.
 *
 * Same rule as `maybeClearRecoveredQuotaState`: a future `rateLimitedUntil` is
 * the 429 handler's hard statement and no poller may overrule it. Once the
 * window elapses, the next probe clears the state normally.
 */
export function shouldClearErrorStateOnValidProbe(
  connection: Pick<ProviderConnectionLike, "rateLimitedUntil">,
  probeValid: boolean,
  now: number = Date.now()
): boolean {
  return probeValid && !hasActiveCooldown(connection, now);
}

/**
 * May an active cooldown be released because the REAL quota windows recovered?
 *
 * Only the synthetic-cooldown case (#10534) qualifies: lastErrorType
 * "quota_exhausted" plus every governing window past its real reset with quota
 * left. A window that is still exhausted — or whose reset is unknown/unparseable
 * — keeps the connection locked, matching the kimi-coding partial-refresh
 * semantics.
 */

/**
 * Is an explicit cooldown still in the future?
 *
 * A rateLimitedUntil set by the upstream 429 handler is a hard statement and
 * must never be overruled by a quota poll.
 *
 * Gate on the timestamp alone; lastErrorType stays irrelevant here.
 */

/**
 * Whether a connection test may wipe the persisted error/cooldown state.
 *
 * A successful probe proves the CREDENTIAL is valid; it does not prove an
 * exhausted quota window reopened — the probe is a cheap auth/models call that
 * never touches the chat quota a weekly cap applies to. The credential-health
 * scheduler runs that probe against every connection every 300s, so without this
 * gate a weekly-capped connection was reset to `active` / `rateLimitedUntil=null`
 * within 30s of every restart and dispatched straight back into the same 429.
 *
 * Same rule as `maybeClearRecoveredQuotaState`: a future `rateLimitedUntil` is
 * the 429 handler's hard statement and no poller may overrule it. Once the
 * window elapses, the next probe clears the state normally.
 */

export async function maybeClearRecoveredQuotaState(
  connection: ProviderConnectionLike,
  usage: JsonRecord
): Promise<ProviderConnectionLike> {
  if (!hasUsableQuota(usage)) return connection;
  if (isTerminalStatusForQuotaRecovery(connection.testStatus)) return connection;
  if (hasActiveCooldown(connection)) {
    // A future rateLimitedUntil written from a real upstream signal is a hard
    // statement no poller may overrule (#11277) — executor-sourced rate limits
    // and extra-usage policy blocks included. Only a SYNTHETIC cooldown (a
    // quota_exhausted lock persisted without an upstream reset, e.g. the
    // Claude-subscription poller's 1h lockout) yields to positive live-window
    // evidence that the real quota has already replenished past its reset.
    const syntheticRecoveryOverride =
      connection.lastErrorType === "quota_exhausted" &&
      connection.lastErrorSource !== "extra_usage" &&
      syntheticCooldownOutlivedByRealWindows(usage);
    if (!syntheticRecoveryOverride) return connection;
  }

  const hasTransientState =
    connection.testStatus === "unavailable" ||
    Boolean(connection.rateLimitedUntil) ||
    Boolean(connection.lastError) ||
    Boolean(connection.errorCode) ||
    Boolean(connection.lastErrorType) ||
    Boolean(connection.lastErrorSource) ||
    (connection.backoffLevel ?? 0) > 0;

  if (!hasTransientState) return connection;

  let cleared = true;
  try {
    const result = await clearRecoveredProviderState(
      {
        connectionId: connection.id,
        testStatus: connection.testStatus,
        lastError: connection.lastError ?? null,
        rateLimitedUntil: connection.rateLimitedUntil ?? null,
        errorCode: connection.errorCode ?? null,
        lastErrorType: connection.lastErrorType ?? null,
        lastErrorSource: connection.lastErrorSource ?? null,
      },
      {
        testStatus: connection.testStatus ?? null,
        lastErrorAt: connection.lastErrorAt ?? null,
        rateLimitedUntil: connection.rateLimitedUntil ?? null,
      }
    );
    cleared = result.applied;
  } catch (dbError) {
    console.warn("[ProviderLimits] Failed to clear recovered quota state:", dbError);
    return connection;
  }

  if (!cleared) {
    // CAS miss — a concurrent writer (markAccountUnavailable, etc.) updated
    // the row between our read and the clear. Return the original snapshot;
    // the next read from DB will surface the fresh state.
    return connection;
  }

  return {
    ...connection,
    testStatus: "active",
    lastError: null,
    lastErrorAt: null,
    lastErrorType: null,
    lastErrorSource: null,
    errorCode: null,
    rateLimitedUntil: null,
    backoffLevel: 0,
  };
}

async function syncExpiredStatusIfNeeded(
  connection: ProviderConnectionLike,
  usage: JsonRecord
): Promise<ProviderConnectionLike> {
  if (!quotaPathShouldMarkExpired(connection.provider, usage.message, connection.testStatus)) {
    return connection;
  }

  try {
    await updateProviderConnection(connection.id, {
      testStatus: "expired",
      lastErrorType: "token_expired",
      lastErrorAt: new Date().toISOString(),
    });
  } catch (dbError) {
    console.error("[ProviderLimits] Failed to sync expired status to DB:", dbError);
    return connection;
  }

  return {
    ...connection,
    testStatus: "expired",
    lastErrorType: "token_expired",
  };
}

async function syncClaudeExtraUsageStateIfNeeded(
  connection: ProviderConnectionLike,
  usage: JsonRecord
): Promise<ProviderConnectionLike> {
  const update = buildClaudeExtraUsageConnectionUpdate(connection, usage);
  if (!update) return connection;

  await updateProviderConnection(connection.id, update);
  return {
    ...connection,
    ...update,
  };
}

/** Persist Antigravity tier from live loadCodeAssist on quota refresh (not only OAuth). */
async function syncAntigravitySubscriptionIfNeeded(
  connection: ProviderConnectionLike,
  usage: JsonRecord
): Promise<ProviderConnectionLike> {
  if (connection.provider !== "antigravity" && connection.provider !== "agy") return connection;

  const subscriptionInfo = usage.subscriptionInfo;
  if (!subscriptionInfo) return connection;

  const psd = (connection.providerSpecificData || {}) as JsonRecord;
  const nextPsd: JsonRecord = { ...psd };
  let changed = false;

  const tierId = extractCodeAssistOnboardTierId(subscriptionInfo);
  if (tierId && tierId !== "legacy-tier" && psd.tier !== tierId) {
    nextPsd.tier = tierId;
    changed = true;
  }

  const subscriptionTier = extractCodeAssistSubscriptionTier(subscriptionInfo);
  if (subscriptionTier && psd.subscriptionTier !== subscriptionTier) {
    nextPsd.subscriptionTier = subscriptionTier;
    changed = true;
  }

  const plan = typeof usage.plan === "string" ? usage.plan.trim() : "";
  if (plan && psd.plan !== plan) {
    nextPsd.plan = plan;
    changed = true;
  }

  const discoveredProjectId = extractAntigravityProjectIdFromPayload(
    subscriptionInfo as Record<string, unknown>
  );
  const storedProjectId = getStoredAntigravityProjectId(connection);
  let nextProjectId: string | undefined;
  if (discoveredProjectId && !storedProjectId) {
    nextPsd.projectId = discoveredProjectId;
    nextProjectId = discoveredProjectId;
    changed = true;
  }

  if (!changed) return connection;

  await updateProviderConnection(connection.id, {
    ...(nextProjectId ? { projectId: nextProjectId, errorCode: null, lastError: null } : {}),
    providerSpecificData: nextPsd,
  });
  return {
    ...connection,
    ...(nextProjectId ? { projectId: nextProjectId, errorCode: null, lastError: null } : {}),
    providerSpecificData: nextPsd,
  };
}

/** Persist refreshed Claude bootstrap fields into psd; writes only on diff. */
async function syncClaudeBootstrapIfNeeded(
  connection: ProviderConnectionLike,
  usage: JsonRecord
): Promise<ProviderConnectionLike> {
  if (connection.provider !== "claude") return connection;
  const bootstrap = usage?.bootstrap as Record<string, string | null> | null | undefined;
  if (!bootstrap || typeof bootstrap !== "object") return connection;

  const psd = (connection.providerSpecificData || {}) as JsonRecord;
  const mapping: Array<[keyof typeof bootstrap, string]> = [
    ["account_uuid", "accountUUID"],
    ["organization_uuid", "organizationUUID"],
    ["organization_name", "organizationName"],
    ["organization_type", "organizationType"],
    ["organization_rate_limit_tier", "organizationRateLimitTier"],
  ];

  const nextPsd: JsonRecord = { ...psd };
  let changed = false;
  for (const [bsKey, psdKey] of mapping) {
    const next = bootstrap[bsKey];
    if (typeof next === "string" && next.length > 0 && psd[psdKey] !== next) {
      nextPsd[psdKey] = next;
      changed = true;
    }
  }

  if (!changed) return connection;

  await updateProviderConnection(connection.id, { providerSpecificData: nextPsd });
  return {
    ...connection,
    providerSpecificData: nextPsd,
  };
}

export function getProviderLimitsSyncIntervalMinutes(): number {
  const raw = Number.parseInt(process.env.PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES ?? "", 10);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES;
}

export function getProviderLimitsSyncIntervalMs(): number {
  return getProviderLimitsSyncIntervalMinutes() * 60 * 1000;
}

/** Default gap (ms) inserted between two consecutive OAuth quota fetches. */
const DEFAULT_PROVIDER_LIMITS_SYNC_SPACING_MS = 1500;

/**
 * Spacing (ms) applied between consecutive provider-limits fetch batches in a
 * bulk sync, for BOTH the OAuth and local/API-key paths.
 *
 * OAuth providers (Codex/Claude/Kimi-coding/…) are fetched ONE AT A TIME with
 * this gap so a single host never bursts several simultaneous usage/refresh
 * requests to the same upstream — bursts read as automated traffic and
 * contribute to session termination / anomaly flags (and, for rotating-token
 * providers, to the Auth0 family-revocation race). Local/API-key connections
 * (e.g. Ollama) keep their fast in-chunk concurrent path, but the gap is now
 * also applied BETWEEN concurrency chunks so a local endpoint isn't hit by a
 * simultaneous refresh burst either (#6916). Tunable via
 * `PROVIDER_LIMITS_SYNC_SPACING_MS`; set to `"0"` to opt out on either path.
 */
export function getProviderLimitsSyncSpacingMs(): number {
  const rawEnv = process.env.PROVIDER_LIMITS_SYNC_SPACING_MS;
  if (rawEnv === undefined || rawEnv === "") return DEFAULT_PROVIDER_LIMITS_SYNC_SPACING_MS;
  const raw = Number(rawEnv);
  return Number.isFinite(raw) && raw >= 0 ? raw : DEFAULT_PROVIDER_LIMITS_SYNC_SPACING_MS;
}

export async function getLastProviderLimitsAutoSyncTime(): Promise<string | null> {
  try {
    const settings = await getSettings();
    const value = settings[PROVIDER_LIMITS_AUTO_SYNC_SETTING_KEY];
    return typeof value === "string" && value.trim() ? value : null;
  } catch {
    return null;
  }
}

async function setLastProviderLimitsAutoSyncTime(timestamp: string): Promise<void> {
  await updateSettings({ [PROVIDER_LIMITS_AUTO_SYNC_SETTING_KEY]: timestamp });
}

export function getCachedProviderLimitsMap(): Record<string, ProviderLimitsCacheEntry> {
  return getAllProviderLimitsCache();
}

export async function getSanitizedCachedProviderLimitsMap(): Promise<
  Record<string, ProviderLimitsCacheEntry>
> {
  const caches = getAllProviderLimitsCache();
  // Sanitization only rewrites Antigravity/agy quota keys; every other provider's cache
  // entry is returned untouched (see sanitizeProviderLimitsCacheForConnection). The
  // dashboard polls this on an auto-refresh interval, so avoid the unconditional
  // `SELECT * FROM provider_connections` + per-row credential decryption that the
  // previous implementation paid on every poll: skip the scan entirely when nothing is
  // cached, and otherwise fetch ONLY the Antigravity/agy connections. For any other
  // provider, byId.get(id) is undefined and the entry is returned verbatim — identical
  // output to scanning every active connection, but without decrypting unrelated keys.
  // (LEDGER-2 / #3821-review)
  const connectionIds = Object.keys(caches);
  if (connectionIds.length === 0) return {};

  const sanitizableConnections = [
    ...((await getProviderConnections({
      isActive: true,
      provider: "antigravity",
    })) as unknown as ProviderConnectionLike[]),
    ...((await getProviderConnections({
      isActive: true,
      provider: "agy",
    })) as unknown as ProviderConnectionLike[]),
  ];
  if (sanitizableConnections.length === 0) {
    // No connection can change the cache → return the raw entries unchanged.
    return { ...caches };
  }

  const byId = new Map(sanitizableConnections.map((conn) => [conn.id, conn]));
  const sanitized: Record<string, ProviderLimitsCacheEntry> = {};
  for (const [connectionId, entry] of Object.entries(caches)) {
    sanitized[connectionId] =
      sanitizeProviderLimitsCacheForConnection(byId.get(connectionId), entry) || entry;
  }
  return sanitized;
}

export async function fetchLiveProviderLimits(connectionId: string): Promise<{
  connection: ProviderConnectionLike;
  usage: JsonRecord;
}> {
  return fetchLiveProviderLimitsWithOptions(connectionId, { forceRefresh: false });
}

async function fetchLiveProviderLimitsWithOptions(
  connectionId: string,
  options: { forceRefresh?: boolean; allowRotatingRefresh?: boolean } = {}
): Promise<{
  connection: ProviderConnectionLike;
  usage: JsonRecord;
}> {
  let connection = (await getProviderConnectionById(
    connectionId
  )) as unknown as ProviderConnectionLike | null;
  if (!connection) {
    throw withStatus(new Error("Connection not found"), 404);
  }

  if (!isSupportedUsageConnection(connection)) {
    throw withStatus(new Error("Usage not available for this connection"), 400);
  }

  if (connection.authType !== "oauth") {
    // L3: route the API-key usage/quota fetch through the connection's proxy context,
    // mirroring the OAuth branch below (proxyInfo?.proxy ?? null). Without this, API-key
    // usage egresses on the host IP, ignoring the connection's assigned proxy.
    const apiKeyProxy = await resolveProxyForConnection(connectionId);
    const usage = sanitizeUsageQuotasForProvider(
      connection.provider,
      (await runWithProxyContext(apiKeyProxy?.proxy ?? null, () =>
        getUsageForProvider(connection as unknown as JsonRecord, options)
      )) as JsonRecord
    );
    if (isRecord(usage.quotas)) {
      setQuotaCache(connectionId, connection.provider, usage.quotas);
    }
    connection = await syncExpiredStatusIfNeeded(connection, usage);
    connection = await syncClaudeExtraUsageStateIfNeeded(connection, usage);
    connection = await syncClaudeBootstrapIfNeeded(connection, usage);
    connection = await syncAntigravitySubscriptionIfNeeded(connection, usage);
    connection = await maybeClearRecoveredQuotaState(connection, usage);
    return { connection, usage };
  }

  const proxyInfo = await resolveProxyForConnection(connectionId);

  const fetchUsageWithContext = async (proxyConfig: unknown) =>
    runWithProxyContext(proxyConfig, async () => {
      let conn = connection as ProviderConnectionLike;
      let wasRefreshed = false;

      const result = await refreshAndUpdateCredentials(conn, {
        allowRotatingRefresh: options.allowRotatingRefresh,
      });
      conn = result.connection;
      wasRefreshed = result.refreshed;

      if (wasRefreshed) {
        await syncToCloudIfEnabled();
      }

      let usageData = sanitizeUsageQuotasForProvider(
        conn.provider,
        (await getUsageForProvider(conn as unknown as JsonRecord, options)) as JsonRecord
      );

      // Reactive 401 recovery (on-demand/force path only): an unauthorized usage
      // response means the access token is actually dead. Force ONE serialized
      // re-mint and retry once. This recovers imported accounts (expiresAt=null,
      // where the proactive needsRefresh heuristic never fires) without ever
      // refreshing proactively from the bulk path.
      if (options.allowRotatingRefresh && !wasRefreshed && isUsageAuthError(usageData?.message)) {
        const forced = await refreshAndUpdateCredentials(conn, {
          allowRotatingRefresh: true,
          force: true,
        });
        if (forced.refreshed) {
          conn = forced.connection;
          await syncToCloudIfEnabled();
          usageData = sanitizeUsageQuotasForProvider(
            conn.provider,
            (await getUsageForProvider(conn as unknown as JsonRecord, options)) as JsonRecord
          );
        }
      }

      connection = conn;
      return { usage: usageData };
    });

  let result: { usage: JsonRecord };
  const proxyConfig = proxyInfo?.proxy || null;
  const failClosedOnProxyFailure = shouldFailClosedForProviderLimitsProxy(connection, proxyInfo);

  try {
    result = await fetchUsageWithContext(proxyConfig);
  } catch (error: any) {
    const isThrownNetworkError =
      error?.message === "fetch failed" ||
      error?.code === "PROXY_UNREACHABLE" ||
      error?.code === "UND_ERR_CONNECT_TIMEOUT" ||
      error?.cause?.code === "ECONNREFUSED";

    if (proxyConfig && isThrownNetworkError) {
      if (failClosedOnProxyFailure) {
        console.warn(
          "[ProviderLimits] Account-scoped %s proxy fetch failed for %s; failing closed without direct retry:",
          connection.provider,
          connectionId,
          error?.message
        );
        throw error;
      }

      console.warn(
        "[ProviderLimits] Proxy fetch threw for %s, retrying without proxy:",
        connectionId,
        error?.message
      );
      result = await fetchUsageWithContext(null);
    } else {
      throw error;
    }
  }

  if (proxyConfig && isNetworkFailureMessage(result.usage?.message)) {
    if (failClosedOnProxyFailure) {
      const message =
        typeof result.usage.message === "string"
          ? result.usage.message
          : "Provider-limits proxy request failed";
      console.warn(
        "[ProviderLimits] Account-scoped %s proxy usage failed for %s; failing closed without direct retry:",
        connection.provider,
        connectionId,
        message
      );
      throw withStatus(new Error(message), 503);
    }

    console.warn(
      "[ProviderLimits] Proxy usage returned network error for %s, retrying without proxy:",
      connectionId,
      result.usage.message
    );
    result = await fetchUsageWithContext(null);
  }

  if (isRecord(result.usage.quotas)) {
    setQuotaCache(connectionId, connection.provider, result.usage.quotas);
  }
  connection = await syncExpiredStatusIfNeeded(connection, result.usage);
  connection = await syncClaudeExtraUsageStateIfNeeded(connection, result.usage);
  connection = await syncClaudeBootstrapIfNeeded(connection, result.usage);
  connection = await syncAntigravitySubscriptionIfNeeded(connection, result.usage);
  connection = await maybeClearRecoveredQuotaState(connection, result.usage);

  return {
    connection,
    usage: result.usage,
  };
}

export async function fetchAndPersistProviderLimits(
  connectionId: string,
  source: SyncSource = "manual",
  opts: { allowRotatingRefresh?: boolean } = {}
): Promise<{
  connection: ProviderConnectionLike;
  usage: JsonRecord;
  cache: ProviderLimitsCacheEntry;
}> {
  const { connection, usage } = await fetchLiveProviderLimitsWithOptions(connectionId, {
    forceRefresh: source === "manual",
    allowRotatingRefresh: opts.allowRotatingRefresh,
  });
  const newCache = toProviderLimitsCacheEntry(usage, source);
  const previous = getProviderLimitsCache(connectionId);
  const cache = mergeProviderLimitsCacheEntry(connection.provider, newCache, previous);

  // Don't persist error-only entries (429 etc.) — would wipe prior good cache.
  // Serve the prior entry instead; only successful fetches update the cache.
  if (cache === previous && newCache.message) {
    const staleUsage: JsonRecord = {
      ...usage,
      quotas: previous.quotas,
      plan: previous.plan ?? usage.plan ?? null,
      bankedResetCredits: previous.bankedResetCredits,
      billing: previous.billing,
      message: null,
      _stale: true,
      _staleSince: previous.fetchedAt,
      _staleReason: newCache.message,
    };
    return { connection, usage: staleUsage, cache: previous };
  }

  const mergedUsage: JsonRecord = {
    ...usage,
    ...(cache.billing ? { billing: cache.billing } : {}),
  };
  setProviderLimitsCache(connectionId, cache);
  return { connection, usage: mergedUsage, cache };
}

export async function syncAllProviderLimits(
  options: {
    source?: SyncSource;
    concurrency?: number;
  } = {}
): Promise<{
  total: number;
  succeeded: number;
  failed: number;
  caches: Record<string, ProviderLimitsCacheEntry>;
  errors: Record<string, string>;
}> {
  const { source = "manual", concurrency = 5 } = options;
  const connectionRows = (await getProviderConnections({
    isActive: true,
  })) as unknown as ProviderConnectionLike[];
  const connections = connectionRows.filter(isSupportedUsageConnection);
  const cacheEntries: Array<{ connectionId: string; entry: ProviderLimitsCacheEntry }> = [];
  const caches: Record<string, ProviderLimitsCacheEntry> = {};
  const errors: Record<string, string> = {};

  const recordResult = (
    connectionId: string,
    result: PromiseSettledResult<{ connectionId: string; cache: ProviderLimitsCacheEntry }>
  ) => {
    if (result.status === "fulfilled") {
      const { cache } = result.value;
      const previous = getProviderLimitsCache(connectionId);
      if (cache === previous) {
        caches[connectionId] = cache;
        return;
      }
      cacheEntries.push({ connectionId, entry: cache });
      caches[connectionId] = cache;
      return;
    }
    const reason = result.reason as { message?: string } | undefined;
    errors[connectionId] = reason?.message || "Failed to refresh provider limits";
  };

  const fetchOne = async (connection: ProviderConnectionLike) => {
    const existingCache = getProviderLimitsCache(connection.id);
    const forceRefresh =
      source === "manual" ||
      shouldRefreshProviderLimitsCache(connection, existingCache || undefined);
    const { usage } = await fetchLiveProviderLimitsWithOptions(connection.id, {
      forceRefresh,
    });
    const nextCache = toProviderLimitsCacheEntry(usage, source);
    const cache = mergeProviderLimitsCacheEntry(connection.provider, nextCache, existingCache);
    return { connectionId: connection.id, cache };
  };

  // OAuth connections are processed STRICTLY SEQUENTIALLY (chunk size 1) with a
  // spacing gap so a single host never bursts simultaneous usage/refresh
  // requests to the same upstream (anomaly/session-termination guard; see
  // getProviderLimitsSyncSpacingMs). Local/API-key connections keep their fast
  // in-chunk concurrent path, spaced BETWEEN chunks (#6916).
  const oauthConnections = connections.filter((c) => c.authType === "oauth");
  const otherConnections = connections.filter((c) => c.authType !== "oauth");
  const spacingMs = getProviderLimitsSyncSpacingMs();

  const recordChunk = (
    chunk: ProviderConnectionLike[],
    results: PromiseSettledResult<{ connectionId: string; cache: ProviderLimitsCacheEntry }>[]
  ) => {
    results.forEach((result, index) => {
      const connectionId = chunk[index]?.id;
      if (connectionId) recordResult(connectionId, result);
    });
  };

  await syncInChunksWithSpacing(otherConnections, concurrency, spacingMs, fetchOne, recordChunk);
  await syncInChunksWithSpacing(oauthConnections, 1, spacingMs, fetchOne, recordChunk);

  if (cacheEntries.length > 0) {
    setProviderLimitsCacheBatch(cacheEntries);
  }

  if (source === "scheduled") {
    await setLastProviderLimitsAutoSyncTime(new Date().toISOString());
  }

  return {
    total: connections.length,
    succeeded: cacheEntries.length,
    failed: connections.length - cacheEntries.length,
    caches,
    errors,
  };
}
