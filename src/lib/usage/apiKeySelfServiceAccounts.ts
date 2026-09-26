/**
 * GET /v1/me/status — accountQuotas (scope self:account-quota) and the admin
 * "availableProviders" list.
 *
 * Rules:
 *   - connections = key.allowedConnections when non-empty, else every active
 *     connection; inactive connections are skipped.
 *   - only providers in settings.sharedQuotaProviders are kept (null = all,
 *     [] = none).
 *   - label = masked account display name; a raw email is never returned.
 *   - quotas are cache-first: the provider-limits cache is served while younger
 *     than 5 minutes; an older/missing entry triggers at most one refresh per
 *     connection per 60 s (concurrent callers share the in-flight refresh). A
 *     failed refresh serves the old cache with `stale: true`.
 */

import { getAccountDisplayName } from "@/lib/display/names";
import { maskEmailLikeValue } from "@/shared/utils/maskEmail";
import { supportsProviderQuota } from "@/shared/utils/providerQuotaVisibility";

import {
  asRecord,
  dateMsOrNull,
  isoOrNull,
  roundNumber,
  toNumber,
  type DateLike,
  type JsonRecord,
} from "./apiKeySelfServiceShared";

/** A cached quota snapshot older than this is refreshed. */
export const ACCOUNT_QUOTA_STALE_AFTER_MS = 5 * 60_000;
/** Minimum spacing between refresh attempts for one connection. */
export const ACCOUNT_QUOTA_REFRESH_FLOOR_MS = 60_000;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProviderLimitsCacheLike {
  quotas: JsonRecord | null;
  plan: unknown;
  fetchedAt: string;
}

export interface ProviderLimitsFetchResultLike {
  usage: JsonRecord;
  cache?: { fetchedAt?: string | null } | null;
}

type RefreshOutcome =
  | { ok: true; quotas: unknown; plan: unknown; fetchedAt: string | null; stale: boolean }
  | { ok: false };

export interface QuotaRefreshTracker {
  lastAttempt: Map<string, { at: number; outcome: RefreshOutcome }>;
  inFlight: Map<string, Promise<RefreshOutcome>>;
}

export interface AccountQuotaDeps {
  now: () => number;
  getProviderConnectionById: (connectionId: string) => Promise<unknown>;
  getProviderConnections: (filters?: Record<string, unknown>) => Promise<unknown[]>;
  getProviderLimitsCache: (connectionId: string) => ProviderLimitsCacheLike | null;
  fetchAndPersistProviderLimits: (
    connectionId: string,
    source: "manual" | "scheduled"
  ) => Promise<ProviderLimitsFetchResultLike>;
  quotaRefreshTracker: QuotaRefreshTracker;
}

export interface AccountQuotaMetadata {
  allowedConnections: string[];
  /** null / undefined = all providers; [] = none. */
  sharedQuotaProviders?: string[] | null;
}

export interface ReachableProvider {
  provider: string;
  connectionCount: number;
  quotaSupported: boolean;
}

interface AccountQuotaConnection {
  id: string;
  provider: string;
  label: string;
  lookupFailed?: boolean;
  providerSpecificData?: unknown;
}

export function createQuotaRefreshTracker(): QuotaRefreshTracker {
  return { lastAttempt: new Map(), inFlight: new Map() };
}

/** Process-wide tracker: the refresh floor and dedupe apply across every key. */
export const defaultQuotaRefreshTracker = createQuotaRefreshTracker();

// ---------------------------------------------------------------------------
// Connections
// ---------------------------------------------------------------------------

function maskedLabel(record: JsonRecord): string {
  return maskEmailLikeValue(
    getAccountDisplayName({
      id: typeof record.id === "string" ? record.id : null,
      name: typeof record.name === "string" ? record.name : null,
      displayName: typeof record.displayName === "string" ? record.displayName : null,
      email: typeof record.email === "string" ? record.email : null,
    })
  );
}

function toConnection(value: unknown): AccountQuotaConnection | null {
  const record = asRecord(value);
  if (!record) return null;

  const id = typeof record.id === "string" ? record.id : "";
  if (record.lookupFailed === true) {
    if (!id) return null;
    const provider = typeof record.provider === "string" ? record.provider : "unknown";
    return { id, provider, label: maskedLabel({ id }), lookupFailed: true };
  }

  if (record.isActive === false) return null;
  const provider = typeof record.provider === "string" ? record.provider : "";
  if (!id || !provider) return null;

  return {
    id,
    provider,
    label: maskedLabel(record),
    providerSpecificData: record.providerSpecificData,
  };
}

async function listReachableConnections(
  allowedConnections: string[],
  deps: Pick<AccountQuotaDeps, "getProviderConnectionById" | "getProviderConnections">
): Promise<AccountQuotaConnection[]> {
  const explicit = Array.isArray(allowedConnections)
    ? allowedConnections.filter((id) => typeof id === "string" && id)
    : [];

  const rawConnections =
    explicit.length > 0
      ? await Promise.all(
          explicit.map(async (id) => {
            try {
              return await deps.getProviderConnectionById(id);
            } catch {
              return { id, provider: "unknown", lookupFailed: true };
            }
          })
        )
      : await deps.getProviderConnections({ isActive: true }).catch(() => []);

  const connections: AccountQuotaConnection[] = [];
  const seen = new Set<string>();
  for (const raw of rawConnections) {
    const connection = toConnection(raw);
    if (!connection || seen.has(connection.id)) continue;
    seen.add(connection.id);
    connections.push(connection);
  }
  return connections;
}

function isProviderShared(provider: string, sharedQuotaProviders: string[] | null | undefined) {
  if (sharedQuotaProviders === null || sharedQuotaProviders === undefined) return true;
  return sharedQuotaProviders.includes(provider);
}

/** Providers of the connections the key can reach, with counts (admin UI). */
export async function listReachableProviders(
  allowedConnections: string[],
  deps: Pick<AccountQuotaDeps, "getProviderConnectionById" | "getProviderConnections">
): Promise<ReachableProvider[]> {
  const byProvider = new Map<string, ReachableProvider>();
  for (const connection of await listReachableConnections(allowedConnections, deps)) {
    if (connection.lookupFailed) continue;
    const entry = byProvider.get(connection.provider) ?? {
      provider: connection.provider,
      connectionCount: 0,
      quotaSupported: false,
    };
    entry.connectionCount += 1;
    entry.quotaSupported ||= supportsProviderQuota(connection.provider, connection);
    byProvider.set(connection.provider, entry);
  }
  return [...byProvider.values()].sort((a, b) => a.provider.localeCompare(b.provider));
}

// ---------------------------------------------------------------------------
// Quota normalization
// ---------------------------------------------------------------------------

function quotaWindow(value: unknown) {
  const record = asRecord(value);
  if (!record) return null;
  const usedPercentage = toNumber(record.usedPercentage ?? record.used, Number.NaN);
  const remainingPercentage = toNumber(
    record.remainingPercentage ?? record.remaining,
    Number.isFinite(usedPercentage) ? 100 - usedPercentage : Number.NaN
  );
  if (!Number.isFinite(usedPercentage) && !Number.isFinite(remainingPercentage)) return null;

  return {
    usedPercentage: Number.isFinite(usedPercentage)
      ? roundNumber(usedPercentage, 2)
      : roundNumber(100 - remainingPercentage, 2),
    remainingPercentage: Number.isFinite(remainingPercentage)
      ? roundNumber(remainingPercentage, 2)
      : roundNumber(100 - usedPercentage, 2),
    resetAt: isoOrNull(record.resetAt as DateLike),
  };
}

function normalizeQuotaWindows(quotas: unknown) {
  const record = asRecord(quotas);
  if (!record) return null;

  const normalized: Record<string, NonNullable<ReturnType<typeof quotaWindow>>> = {};
  for (const [key, value] of Object.entries(record)) {
    const window = quotaWindow(value);
    if (window) normalized[key] = window;
  }
  return Object.keys(normalized).length > 0 ? normalized : null;
}

function normalizePlan(value: unknown): unknown {
  if (typeof value === "string" && value.trim()) return value;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "boolean") return value;
  return undefined;
}

// ---------------------------------------------------------------------------
// Cache-first quota read
// ---------------------------------------------------------------------------

function toRefreshOutcome(
  result: ProviderLimitsFetchResultLike,
  attemptAt: number
): RefreshOutcome {
  const usage = asRecord(result?.usage) ?? {};
  const stale = usage._stale === true;
  const fetchedAt = stale
    ? isoOrNull((usage._staleSince ?? result?.cache?.fetchedAt) as DateLike)
    : (isoOrNull(result?.cache?.fetchedAt as DateLike) ?? new Date(attemptAt).toISOString());
  return { ok: true, quotas: usage.quotas, plan: usage.plan, fetchedAt, stale };
}

function refreshConnectionQuota(
  connectionId: string,
  deps: AccountQuotaDeps
): Promise<RefreshOutcome> {
  const tracker = deps.quotaRefreshTracker;
  const inFlight = tracker.inFlight.get(connectionId);
  if (inFlight) return inFlight;

  const now = deps.now();
  const last = tracker.lastAttempt.get(connectionId);
  if (last && now >= last.at && now - last.at < ACCOUNT_QUOTA_REFRESH_FLOOR_MS) {
    return Promise.resolve(last.outcome);
  }

  const pending = (async (): Promise<RefreshOutcome> => {
    let outcome: RefreshOutcome;
    try {
      outcome = toRefreshOutcome(
        await deps.fetchAndPersistProviderLimits(connectionId, "scheduled"),
        now
      );
    } catch {
      outcome = { ok: false };
    }
    tracker.lastAttempt.set(connectionId, { at: now, outcome });
    return outcome;
  })().finally(() => {
    tracker.inFlight.delete(connectionId);
  });
  tracker.inFlight.set(connectionId, pending);
  return pending;
}

interface QuotaSnapshot {
  quotas: unknown;
  plan: unknown;
  fetchedAt: string | null;
  stale: boolean;
}

async function readQuotaSnapshot(
  connectionId: string,
  deps: AccountQuotaDeps
): Promise<QuotaSnapshot | null> {
  let cached: ProviderLimitsCacheLike | null = null;
  try {
    cached = deps.getProviderLimitsCache(connectionId);
  } catch {
    cached = null;
  }

  const cachedAtMs = cached ? dateMsOrNull(cached.fetchedAt) : null;
  if (cached && cachedAtMs !== null && deps.now() - cachedAtMs < ACCOUNT_QUOTA_STALE_AFTER_MS) {
    return {
      quotas: cached.quotas,
      plan: cached.plan,
      fetchedAt: isoOrNull(cachedAtMs),
      stale: false,
    };
  }

  const outcome = await refreshConnectionQuota(connectionId, deps);
  if (outcome.ok) {
    return {
      quotas: outcome.quotas,
      plan: outcome.plan,
      fetchedAt: outcome.fetchedAt,
      stale: outcome.stale,
    };
  }
  if (cached) {
    return {
      quotas: cached.quotas,
      plan: cached.plan,
      fetchedAt: isoOrNull(cachedAtMs),
      stale: true,
    };
  }
  return null;
}

async function resolveConnectionAccountQuota(
  connection: AccountQuotaConnection,
  deps: AccountQuotaDeps
) {
  const base = {
    provider: connection.provider,
    connectionId: connection.id,
    label: connection.label,
    shared: true as const,
  };
  const unavailable = (reason: string, fetchedAt: string | null = null, stale = false) => ({
    ...base,
    available: false as const,
    reason,
    fetchedAt,
    ...(stale && { stale: true }),
  });

  if (connection.lookupFailed) return unavailable("connection_lookup_failed");
  if (!supportsProviderQuota(connection.provider, connection)) return unavailable("not_supported");

  const snapshot = await readQuotaSnapshot(connection.id, deps);
  if (!snapshot) return unavailable("fetch_failed");

  const quotas = normalizeQuotaWindows(snapshot.quotas);
  const plan = normalizePlan(snapshot.plan);
  if (!quotas && plan === undefined) {
    return unavailable("not_available", snapshot.fetchedAt, snapshot.stale);
  }

  return {
    ...base,
    ...(plan !== undefined && { plan }),
    ...(quotas && { quotas }),
    fetchedAt: snapshot.fetchedAt,
    ...(snapshot.stale && { stale: true }),
  };
}

/** accountQuotas entries for the key, filtered by its shared-provider setting. */
export async function resolveAccountQuotaEntries(
  metadata: AccountQuotaMetadata,
  deps: AccountQuotaDeps
) {
  const connections = (await listReachableConnections(metadata.allowedConnections, deps)).filter(
    (connection) => isProviderShared(connection.provider, metadata.sharedQuotaProviders)
  );
  return Promise.all(
    connections.map((connection) => resolveConnectionAccountQuota(connection, deps))
  );
}
