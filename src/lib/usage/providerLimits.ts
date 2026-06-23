import {
  getAllProviderLimitsCache,
  getProviderConnectionById,
  getProviderConnections,
  getProviderLimitsCache,
  getSettings,
  resolveProxyForConnection,
  setProviderLimitsCache,
  setProviderLimitsCacheBatch,
  updateProviderConnection,
  updateSettings,
  type ProviderLimitsCacheEntry,
} from "@/lib/localDb";
import { syncToCloud } from "@/lib/cloudSync";
import { setQuotaCache } from "@/domain/quotaCache";
import { buildClaudeExtraUsageConnectionUpdate } from "@/lib/providers/claudeExtraUsage";
import { getMachineId } from "@/shared/utils/machine";
import { USAGE_SUPPORTED_PROVIDERS } from "@/shared/constants/providers";
import { getExecutor } from "@omniroute/open-sse/executors/index.ts";
import { getUsageForProvider } from "@omniroute/open-sse/services/usage.ts";
import {
  rotationGroupFor,
  serializeRefresh,
} from "@omniroute/open-sse/services/refreshSerializer.ts";
import {
  extractCodeAssistOnboardTierId,
  extractCodeAssistSubscriptionTier,
} from "@omniroute/open-sse/services/codeAssistSubscription.ts";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import {
  isUserCallableAntigravityModelId,
  toClientAntigravityModelId,
} from "@omniroute/open-sse/config/antigravityModelAliases.ts";
import { isUserCallableAgyModelId } from "@omniroute/open-sse/config/agyModels.ts";
import { onUsageRecorded } from "./usageEvents";

type JsonRecord = Record<string, unknown>;
type SyncSource = "manual" | "scheduled";

interface ProviderConnectionLike {
  id: string;
  provider: string;
  authType?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  tokenExpiresAt?: string;
  providerSpecificData?: JsonRecord;
  testStatus?: string;
  isActive?: boolean;
  lastError?: string | null;
  lastErrorAt?: string | null;
  lastErrorType?: string | null;
  lastErrorSource?: string | null;
  errorCode?: string | number | null;
  rateLimitedUntil?: string | null;
  backoffLevel?: number;
}

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
]);
const DEFAULT_PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES = 70;
const PROVIDER_LIMITS_AUTO_SYNC_SETTING_KEY = "provider_limits_auto_sync_last_run";
const DEFAULT_PROVIDER_LIMITS_POST_USAGE_REFRESH_DELAY_MS = 5_000;
const pendingPostUsageRefreshes = new Set<string>();

function isRecord(value: unknown): value is JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function toProviderLimitsCacheEntry(
  usage: JsonRecord,
  source: SyncSource,
  fetchedAt = new Date().toISOString()
): ProviderLimitsCacheEntry {
  return {
    quotas: isRecord(usage.quotas) ? usage.quotas : null,
    plan: usage.plan ?? null,
    message: typeof usage.message === "string" ? usage.message : null,
    fetchedAt,
    source,
  };
}

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

function isUsageQuotaKeyAllowed(provider: string, quotaKey: string): boolean {
  if (quotaKey === "credits" || quotaKey === "models") return true;
  if (provider === "antigravity") return isUserCallableAntigravityModelId(quotaKey);
  if (provider === "agy") return isUserCallableAgyModelId(quotaKey);
  return true;
}

function normalizeUsageQuotaKey(provider: string, quotaKey: string): string | null {
  if (quotaKey === "credits" || quotaKey === "models") return quotaKey;
  if (provider === "antigravity" || provider === "agy") {
    const clientKey = toClientAntigravityModelId(quotaKey);
    return isUsageQuotaKeyAllowed(provider, clientKey) ? clientKey : null;
  }
  return isUsageQuotaKeyAllowed(provider, quotaKey) ? quotaKey : null;
}

function normalizeUsageQuotasForProvider(
  provider: string,
  quotas: JsonRecord | null | undefined
): JsonRecord | null {
  if (!isRecord(quotas)) return quotas ?? null;

  const normalized: JsonRecord = {};
  let changed = false;

  for (const [quotaKey, quota] of Object.entries(quotas)) {
    const normalizedKey = normalizeUsageQuotaKey(provider, quotaKey);
    if (!normalizedKey) {
      changed = true;
      continue;
    }

    const existing = normalized[normalizedKey];
    if (existing && isRecord(existing) && isRecord(quota)) {
      const existingSource = String(existing.quotaSource ?? "");
      const nextSource = String(quota.quotaSource ?? "");
      const sourceRank: Record<string, number> = {
        fetchAvailableModels: 0,
        localUsageHistory: 1,
        retrieveUserQuota: 2,
      };
      if ((sourceRank[existingSource] ?? 0) > (sourceRank[nextSource] ?? 0)) {
        continue;
      }
    }

    normalized[normalizedKey] = quota as JsonRecord;
    if (normalizedKey !== quotaKey) changed = true;
  }

  return changed ? normalized : quotas;
}

function sanitizeUsageQuotasForProvider(provider: string, usage: JsonRecord): JsonRecord {
  if (provider !== "antigravity" && provider !== "agy") return usage;
  if (!isRecord(usage.quotas)) return usage;

  const sanitizedQuotas = normalizeUsageQuotasForProvider(provider, usage.quotas);
  return sanitizedQuotas === usage.quotas ? usage : { ...usage, quotas: sanitizedQuotas };
}

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

function isSupportedUsageConnection(connection: ProviderConnectionLike | null): boolean {
  if (
    !connection ||
    !connection.provider ||
    !USAGE_SUPPORTED_PROVIDERS.includes(connection.provider)
  ) {
    return false;
  }

  if (connection.authType === "oauth") return true;
  return (
    connection.authType === "apikey" && PROVIDER_LIMITS_APIKEY_PROVIDERS.has(connection.provider)
  );
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

/**
 * Whether the quota path may refresh this provider's token. Exported for testing.
 *
 * Rotating-refresh providers (Codex/OpenAI share one Auth0 client_id, etc.) mint a
 * single-use refresh_token on every refresh. The BULK quota-sync path runs many
 * connections concurrently; refreshing sibling accounts in parallel makes Auth0
 * revoke the whole token family (openai/codex#9648) and kills every account but
 * the last (#3019). So the bulk path never refreshes rotating providers
 * (`allowRotatingRefresh` falsy). The on-demand, per-connection path opts in and
 * is made safe by `serializeRefresh` (one token mint at a time per rotation group,
 * so even N concurrent per-account requests can never refresh siblings in
 * parallel). Non-rotating providers are always eligible.
 */
export function shouldAttemptRotatingRefresh(
  provider: string,
  allowRotatingRefresh: boolean | undefined
): boolean {
  if (rotationGroupFor(provider) === null) return true;
  return allowRotatingRefresh === true;
}

export async function refreshAndUpdateCredentials(
  connection: ProviderConnectionLike,
  opts: { allowRotatingRefresh?: boolean; force?: boolean } = {}
) {
  if (!shouldAttemptRotatingRefresh(connection.provider, opts.allowRotatingRefresh)) {
    return { connection, refreshed: false };
  }
  const executor = getExecutor(connection.provider);
  const credentials = {
    connectionId: connection.id,
    accessToken: connection.accessToken,
    refreshToken: connection.refreshToken,
    expiresAt: connection.tokenExpiresAt || connection.expiresAt || null,
    providerSpecificData: connection.providerSpecificData,
    copilotToken: connection.providerSpecificData?.copilotToken,
    copilotTokenExpiresAt: connection.providerSpecificData?.copilotTokenExpiresAt,
  };

  // `force` is used ONLY on the reactive 401 recovery path (a usage fetch came
  // back unauthorized) — it bypasses the proactive `needsRefresh` heuristic so
  // imported accounts (expiresAt=null, where needsRefresh is always false) can
  // still re-mint. The mint stays serialized per rotation group; this never
  // refreshes proactively from the bulk path (#3019 guard above is unchanged).
  if (!opts.force && !executor.needsRefresh(credentials)) {
    return { connection, refreshed: false };
  }

  // Serialize the actual token mint per rotation group so two sibling accounts
  // never hit Auth0 concurrently (passthrough for non-rotating providers).
  const refreshResult = (await serializeRefresh(connection.provider, () =>
    executor.refreshCredentials(credentials, console)
  )) as
    | (JsonRecord & {
        accessToken?: string;
        refreshToken?: string;
        expiresIn?: number;
        expiresAt?: string;
        copilotToken?: string;
        copilotTokenExpiresAt?: string;
      })
    | null;

  if (!refreshResult) {
    // Refresh failed but we still have an accessToken — fall back to the
    // existing token for ANY OAuth provider (graceful degradation) instead of
    // hard-failing. Previously this was qualified to `provider === "github"`,
    // which left every other provider stuck on a transient refresh failure even
    // when a usable access token was still on hand.
    if (connection.accessToken) {
      return { connection, refreshed: false };
    }
    throw withStatus(
      new Error("Failed to refresh credentials. Please re-authorize the connection."),
      401
    );
  }

  const updateData: JsonRecord = {
    updatedAt: new Date().toISOString(),
  };

  if (refreshResult.accessToken) {
    updateData.accessToken = refreshResult.accessToken;
  }
  if (refreshResult.refreshToken) {
    updateData.refreshToken = refreshResult.refreshToken;
  }
  if (refreshResult.expiresIn) {
    const expiresAt = new Date(Date.now() + refreshResult.expiresIn * 1000).toISOString();
    updateData.expiresAt = expiresAt;
    updateData.tokenExpiresAt = expiresAt;
  } else if (refreshResult.expiresAt) {
    updateData.expiresAt = refreshResult.expiresAt;
    updateData.tokenExpiresAt = refreshResult.expiresAt;
  }
  if (refreshResult.copilotToken || refreshResult.copilotTokenExpiresAt) {
    updateData.providerSpecificData = {
      ...(connection.providerSpecificData || {}),
      copilotToken: refreshResult.copilotToken,
      copilotTokenExpiresAt: refreshResult.copilotTokenExpiresAt,
    };
  }

  await updateProviderConnection(connection.id, updateData);

  return {
    connection: {
      ...connection,
      ...updateData,
      providerSpecificData:
        (updateData.providerSpecificData as JsonRecord | undefined) ||
        connection.providerSpecificData,
    },
    refreshed: true,
  };
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

async function syncExpiredStatusIfNeeded(connection: ProviderConnectionLike, usage: JsonRecord) {
  if (!quotaPathShouldMarkExpired(connection.provider, usage.message, connection.testStatus)) {
    return;
  }

  try {
    await updateProviderConnection(connection.id, {
      testStatus: "expired",
      lastErrorType: "token_expired",
      lastErrorAt: new Date().toISOString(),
    });
  } catch (dbError) {
    console.error("[ProviderLimits] Failed to sync expired status to DB:", dbError);
  }
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

  if (!changed) return connection;

  await updateProviderConnection(connection.id, { providerSpecificData: nextPsd });
  return { ...connection, providerSpecificData: nextPsd };
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
 * Spacing (ms) between consecutive OAuth provider-limits fetches in a bulk sync.
 *
 * OAuth providers (Codex/Claude/Kimi-coding/…) are fetched ONE AT A TIME with
 * this gap so a single host never bursts several simultaneous usage/refresh
 * requests to the same upstream — bursts read as automated traffic and
 * contribute to session termination / anomaly flags (and, for rotating-token
 * providers, to the Auth0 family-revocation race). Stateless API-key providers
 * keep the fast concurrent path. Tunable via `PROVIDER_LIMITS_SYNC_SPACING_MS`;
 * set to `"0"` to opt out.
 */
export function getProviderLimitsSyncSpacingMs(): number {
  const rawEnv = process.env.PROVIDER_LIMITS_SYNC_SPACING_MS;
  if (rawEnv === undefined || rawEnv === "") return DEFAULT_PROVIDER_LIMITS_SYNC_SPACING_MS;
  const raw = Number(rawEnv);
  return Number.isFinite(raw) && raw >= 0 ? raw : DEFAULT_PROVIDER_LIMITS_SYNC_SPACING_MS;
}

const syncDelay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

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
    await syncExpiredStatusIfNeeded(connection, usage);
    connection = await syncClaudeExtraUsageStateIfNeeded(connection, usage);
    connection = await syncClaudeBootstrapIfNeeded(connection, usage);
    connection = await syncAntigravitySubscriptionIfNeeded(connection, usage);
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
  await syncExpiredStatusIfNeeded(connection, result.usage);
  connection = await syncClaudeExtraUsageStateIfNeeded(connection, result.usage);
  connection = await syncClaudeBootstrapIfNeeded(connection, result.usage);
  connection = await syncAntigravitySubscriptionIfNeeded(connection, result.usage);

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

  // Don't persist error-only entries (429 etc.) — would wipe prior good cache.
  // Serve the prior entry instead; only successful fetches update the cache.
  const fetchFailed = !newCache.quotas && newCache.message;
  if (fetchFailed) {
    const previous = getProviderLimitsCache(connectionId);
    if (previous?.quotas && Object.keys(previous.quotas).length > 0) {
      // utils.tsx parseQuotaData ignores `quotas` if `message` is set — drop
      // the message so the prior quotas render; surface staleness via _stale.
      const staleUsage: JsonRecord = {
        ...usage,
        quotas: previous.quotas,
        plan: previous.plan ?? usage.plan ?? null,
        message: null,
        _stale: true,
        _staleSince: previous.fetchedAt,
        _staleReason: newCache.message,
      };
      return { connection, usage: staleUsage, cache: previous };
    }
    // No prior cache; pass the error response through without persisting it.
    return { connection, usage, cache: newCache };
  }

  setProviderLimitsCache(connectionId, newCache);
  return { connection, usage, cache: newCache };
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
  const connections = (
    (await getProviderConnections({ isActive: true })) as unknown as ProviderConnectionLike[]
  ).filter(isSupportedUsageConnection);
  const cacheEntries: Array<{ connectionId: string; entry: ProviderLimitsCacheEntry }> = [];
  const caches: Record<string, ProviderLimitsCacheEntry> = {};
  const errors: Record<string, string> = {};

  const recordResult = (
    connectionId: string,
    result: PromiseSettledResult<{ connectionId: string; cache: ProviderLimitsCacheEntry }>
  ) => {
    if (result.status === "fulfilled") {
      const { cache } = result.value;
      // Don't persist error-only entries; show prior cache or pass through.
      if (!cache.quotas && cache.message) {
        const previous = getProviderLimitsCache(connectionId);
        if (previous?.quotas && Object.keys(previous.quotas).length > 0) {
          caches[connectionId] = previous;
        } else {
          caches[connectionId] = cache;
        }
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
    const cache = toProviderLimitsCacheEntry(usage, source);
    return { connectionId: connection.id, cache };
  };

  // OAuth connections are processed STRICTLY SEQUENTIALLY with a spacing gap so a
  // single host never bursts simultaneous usage/refresh requests to the same
  // upstream (anomaly/session-termination guard; see getProviderLimitsSyncSpacingMs).
  // Stateless API-key connections keep the fast chunked-concurrent path.
  const oauthConnections = connections.filter((c) => c.authType === "oauth");
  const otherConnections = connections.filter((c) => c.authType !== "oauth");
  const spacingMs = getProviderLimitsSyncSpacingMs();

  for (let i = 0; i < otherConnections.length; i += concurrency) {
    const chunk = otherConnections.slice(i, i + concurrency);
    const results = await Promise.allSettled(chunk.map(fetchOne));
    results.forEach((result, index) => {
      const connectionId = chunk[index]?.id;
      if (connectionId) recordResult(connectionId, result);
    });
  }

  for (let i = 0; i < oauthConnections.length; i++) {
    const connection = oauthConnections[i];
    const [result] = await Promise.allSettled([fetchOne(connection)]);
    recordResult(connection.id, result);
    if (spacingMs > 0 && i < oauthConnections.length - 1) {
      await syncDelay(spacingMs);
    }
  }

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
