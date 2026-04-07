import {
  getAllProviderLimitsCache,
  getProviderConnectionById,
  getProviderConnections,
  getQuotaSnapshots,
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
  tokenExpiresAt?: string;
  providerSpecificData?: JsonRecord;
  testStatus?: string;
  isActive?: boolean;
}

const PROVIDER_LIMITS_APIKEY_PROVIDERS = new Set(["glm"]);
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
    expiresAt: connection.tokenExpiresAt,
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
    updateData.tokenExpiresAt = new Date(Date.now() + refreshResult.expiresIn * 1000).toISOString();
  } else if (refreshResult.expiresAt) {
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

function buildCodexQuotaFallback(connection: ProviderConnectionLike): JsonRecord | null {
  if (connection.provider !== "codex") return null;

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const snapshots = getQuotaSnapshots({ connectionId: connection.id, since });
  if (!snapshots.length) return null;

  const latestByWindow = new Map<string, (typeof snapshots)[number]>();
  for (const snapshot of snapshots) {
    const windowKey =
      typeof (snapshot as { windowKey?: unknown }).windowKey === "string"
        ? (snapshot as { windowKey: string }).windowKey
        : "";
    const createdAt =
      typeof (snapshot as { createdAt?: unknown }).createdAt === "string"
        ? (snapshot as { createdAt: string }).createdAt
        : "";
    if (!windowKey || !createdAt) continue;

    const prev = latestByWindow.get(windowKey);
    const prevCreatedAt =
      prev && typeof (prev as { createdAt?: unknown }).createdAt === "string"
        ? (prev as { createdAt: string }).createdAt
        : "";

    if (!prev || new Date(createdAt).getTime() > new Date(prevCreatedAt).getTime()) {
      latestByWindow.set(windowKey, snapshot);
    }
  }

  const quotas: Record<string, JsonRecord> = {};
  for (const [windowKey, snapshot] of latestByWindow.entries()) {
    const remaining =
      typeof (snapshot as { remainingPercentage?: unknown }).remainingPercentage === "number"
        ? (snapshot as { remainingPercentage: number }).remainingPercentage
        : null;
    if (remaining === null) continue;

    quotas[windowKey] = {
      used: Math.max(0, 100 - remaining),
      total: 100,
      remaining,
      remainingPercentage: remaining,
      resetAt:
        typeof (snapshot as { nextResetAt?: unknown }).nextResetAt === "string"
          ? (snapshot as { nextResetAt: string }).nextResetAt
          : null,
      unlimited: false,
    };
  }

  if (Object.keys(quotas).length === 0) return null;

  const providerSpecificData = (connection.providerSpecificData || {}) as JsonRecord;
  const rawPlan = providerSpecificData.workspacePlanType;
  const plan = typeof rawPlan === "string" && rawPlan.trim() ? rawPlan : null;

  return {
    quotas,
    plan,
    message: null,
  };
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

  // Codex "provider limits" uses a ChatGPT backend usage endpoint, while the regular
  // connection test for Codex is intentionally expiry-only and actual request traffic
  // can still succeed with the current access token. Treat usage fetch auth failures as
  // non-authoritative for connection status so "Refresh all" does not poison otherwise
  // working Codex accounts.
  if (connection.provider === "codex") {
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
  let connection = (await getProviderConnectionById(connectionId)) as ProviderConnectionLike | null;
  if (!connection) {
    throw withStatus(new Error("Connection not found"), 404);
  }

  if (!isSupportedUsageConnection(connection)) {
    throw withStatus(new Error("Usage not available for this connection"), 400);
  }

  if (connection.authType !== "oauth") {
    const usage = (await getUsageForProvider(connection)) as JsonRecord;
    if (isRecord(usage.quotas)) {
      setQuotaCache(connectionId, connection.provider, usage.quotas);
    }
    await syncExpiredStatusIfNeeded(connection, usage);
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

      const usageData = (await getUsageForProvider(conn)) as JsonRecord;
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

  if (
    connection.provider === "codex" &&
    !isRecord(result.usage.quotas) &&
    typeof result.usage.message === "string" &&
    result.usage.message.toLowerCase().includes("usage details are unavailable")
  ) {
    const fallback = buildCodexQuotaFallback(connection);
    if (fallback) {
      result = { usage: fallback };
      setQuotaCache(connectionId, connection.provider, fallback.quotas as JsonRecord);
    }
  }

  await syncExpiredStatusIfNeeded(connection, result.usage);

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
  const { connection, usage } = await fetchLiveProviderLimits(connectionId);
  const cache = toProviderLimitsCacheEntry(usage, source);
  setProviderLimitsCache(connectionId, cache);
  return { connection, usage, cache };
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
        const { usage } = await fetchLiveProviderLimits(connection.id);
        const cache = toProviderLimitsCacheEntry(usage, source);
        return { connectionId: connection.id, cache };
      })
    );

    results.forEach((result, index) => {
      const connectionId = chunk[index]?.id;
      if (!connectionId) return;

      if (result.status === "fulfilled") {
        cacheEntries.push({
          connectionId: result.value.connectionId,
          entry: result.value.cache,
        });
        caches[result.value.connectionId] = result.value.cache;
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
