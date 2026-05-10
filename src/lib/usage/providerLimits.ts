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
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";

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
  "glmt",
  "minimax",
  "minimax-cn",
  "crof",
  "nanogpt",
  "deepseek",
]);
const DEFAULT_PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES = 70;
const PROVIDER_LIMITS_AUTO_SYNC_SETTING_KEY = "provider_limits_auto_sync_last_run";

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

async function refreshAndUpdateCredentials(connection: ProviderConnectionLike) {
  const executor = getExecutor(connection.provider);
  const credentials = {
    accessToken: connection.accessToken,
    refreshToken: connection.refreshToken,
    expiresAt: connection.tokenExpiresAt || connection.expiresAt || null,
    providerSpecificData: connection.providerSpecificData,
    copilotToken: connection.providerSpecificData?.copilotToken,
    copilotTokenExpiresAt: connection.providerSpecificData?.copilotTokenExpiresAt,
  };

  if (!executor.needsRefresh(credentials)) {
    return { connection, refreshed: false };
  }

  const refreshResult = await executor.refreshCredentials(credentials, console);

  if (!refreshResult) {
    if (connection.provider === "github" && connection.accessToken) {
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

async function syncExpiredStatusIfNeeded(connection: ProviderConnectionLike, usage: JsonRecord) {
  const errorMessage = typeof usage.message === "string" ? usage.message.toLowerCase() : "";
  const isAuthError =
    errorMessage.includes("token expired") ||
    errorMessage.includes("access denied") ||
    errorMessage.includes("re-authenticate") ||
    errorMessage.includes("unauthorized");

  if (!isAuthError || connection.testStatus === "expired") {
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

export async function fetchLiveProviderLimits(connectionId: string): Promise<{
  connection: ProviderConnectionLike;
  usage: JsonRecord;
}> {
  return fetchLiveProviderLimitsWithOptions(connectionId, { forceRefresh: false });
}

async function fetchLiveProviderLimitsWithOptions(
  connectionId: string,
  options: { forceRefresh?: boolean } = {}
): Promise<{
  connection: ProviderConnectionLike;
  usage: JsonRecord;
}> {
  let connection = (await getProviderConnectionById(connectionId)) as ProviderConnectionLike | null;
  if (!connection) {
    throw withStatus(new Error("Connection not found"), 404);
  }

  if (!isSupportedUsageConnection(connection)) {
    throw withStatus(new Error("Usage not available for this connection"), 400);
  }

  if (connection.authType !== "oauth") {
    const usage = (await getUsageForProvider(connection, options)) as JsonRecord;
    if (isRecord(usage.quotas)) {
      setQuotaCache(connectionId, connection.provider, usage.quotas);
    }
    await syncExpiredStatusIfNeeded(connection, usage);
    connection = await syncClaudeExtraUsageStateIfNeeded(connection, usage);
    connection = await syncClaudeBootstrapIfNeeded(connection, usage);
    return { connection, usage };
  }

  const proxyInfo = await resolveProxyForConnection(connectionId);

  const fetchUsageWithContext = async (proxyConfig: unknown) =>
    runWithProxyContext(proxyConfig, async () => {
      let conn = connection as ProviderConnectionLike;
      let wasRefreshed = false;

      const result = await refreshAndUpdateCredentials(conn);
      conn = result.connection;
      wasRefreshed = result.refreshed;

      if (wasRefreshed) {
        await syncToCloudIfEnabled();
      }

      const usageData = (await getUsageForProvider(conn, options)) as JsonRecord;
      connection = conn;
      return { usage: usageData };
    });

  let result: { usage: JsonRecord };
  const proxyConfig = proxyInfo?.proxy || null;

  try {
    result = await fetchUsageWithContext(proxyConfig);
  } catch (error: any) {
    const isThrownNetworkError =
      error?.message === "fetch failed" ||
      error?.code === "PROXY_UNREACHABLE" ||
      error?.code === "UND_ERR_CONNECT_TIMEOUT" ||
      error?.cause?.code === "ECONNREFUSED";

    if (proxyConfig && isThrownNetworkError) {
      console.warn(
        `[ProviderLimits] Proxy fetch threw for ${connectionId}, retrying without proxy:`,
        error?.message
      );
      result = await fetchUsageWithContext(null);
    } else {
      throw error;
    }
  }

  if (proxyConfig && isNetworkFailureMessage(result.usage?.message)) {
    console.warn(
      `[ProviderLimits] Proxy usage returned network error for ${connectionId}, retrying without proxy:`,
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

  return {
    connection,
    usage: result.usage,
  };
}

export async function fetchAndPersistProviderLimits(
  connectionId: string,
  source: SyncSource = "manual"
): Promise<{
  connection: ProviderConnectionLike;
  usage: JsonRecord;
  cache: ProviderLimitsCacheEntry;
}> {
  const { connection, usage } = await fetchLiveProviderLimitsWithOptions(connectionId, {
    forceRefresh: source === "manual",
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
    (await getProviderConnections({ isActive: true })) as ProviderConnectionLike[]
  ).filter(isSupportedUsageConnection);
  const cacheEntries: Array<{ connectionId: string; entry: ProviderLimitsCacheEntry }> = [];
  const caches: Record<string, ProviderLimitsCacheEntry> = {};
  const errors: Record<string, string> = {};

  for (let i = 0; i < connections.length; i += concurrency) {
    const chunk = connections.slice(i, i + concurrency);
    const results = await Promise.allSettled(
      chunk.map(async (connection) => {
        const { usage } = await fetchLiveProviderLimitsWithOptions(connection.id, {
          forceRefresh: source === "manual",
        });
        const cache = toProviderLimitsCacheEntry(usage, source);
        return { connectionId: connection.id, cache };
      })
    );

    results.forEach((result, index) => {
      const connectionId = chunk[index]?.id;
      if (!connectionId) return;

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
    });
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
