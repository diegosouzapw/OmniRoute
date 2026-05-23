import { getSyncedAvailableModelsByConnection } from "@/lib/db/models";
import { getProviderConnections } from "@/lib/db/providers";
import { getDbInstance } from "@/lib/db/core";
import { getAllCircuitBreakerStatuses } from "@/shared/utils/circuitBreaker";
import { getAllModelLockouts } from "@omniroute/open-sse/services/accountFallback";

type JsonRecord = Record<string, unknown>;

export type ProviderHealthMatrixRange = "1h" | "24h" | "7d" | "30d";
export type ProviderHealthState = "healthy" | "degraded" | "down";
export type ProviderModelHealthStatus = "healthy" | "degraded" | "error" | "locked" | "idle";

export interface ProviderHealthMatrixOptions {
  provider?: string | null;
  range?: ProviderHealthMatrixRange | string | null;
  includeHealthy?: boolean;
}

export interface ProviderHealthMatrixModel {
  model: string;
  status: ProviderModelHealthStatus;
  isLockedOut: boolean;
  lockoutReason: string | null;
  lockoutRemainingMs: number;
  requests: number;
  successes: number;
  successRate: number | null;
  avgLatencyMs: number | null;
  lastStatus: number | null;
  lastErrorStatus: number | null;
  lastRequestAt: string | null;
  lastErrorAt: string | null;
}

export interface ProviderHealthMatrixAccount {
  connectionId: string | null;
  label: string;
  isSynthetic: boolean;
  isActive: boolean;
  state: ProviderHealthState;
  testStatus: string | null;
  rateLimitedUntil: string | null;
  cooldownRemainingMs: number;
  lastErrorType: string | null;
  errorCode: string | null;
  backoffLevel: number;
  modelCount: number;
  issueCount: number;
  models: ProviderHealthMatrixModel[];
}

export interface ProviderHealthMatrixProvider {
  provider: string;
  state: ProviderHealthState;
  score: number;
  circuitBreaker: {
    state: string;
    failureCount: number;
    retryAfterMs: number;
    lastFailureTime: number | null;
  } | null;
  connections: {
    total: number;
    active: number;
    cooldown: number;
    inactive: number;
    terminal: number;
  };
  modelLockoutCount: number;
  requests: number;
  successRate: number | null;
  avgLatencyMs: number | null;
  lastRequestAt: string | null;
  lastErrorAt: string | null;
  issueCount: number;
  accounts: ProviderHealthMatrixAccount[];
}

export interface ProviderHealthMatrixResponse {
  checkedAt: string;
  range: ProviderHealthMatrixRange;
  cutoff: string;
  summary: {
    providerCount: number;
    connectionCount: number;
    modelCount: number;
    issueCount: number;
    healthyCount: number;
    degradedCount: number;
    downCount: number;
  };
  providers: ProviderHealthMatrixProvider[];
}

interface CallLogTargetStats {
  provider: string;
  connectionId: string | null;
  model: string;
  requests: number;
  successes: number;
  avgLatencyMs: number | null;
  lastRequestAt: string | null;
  lastErrorAt: string | null;
  lastStatus: number | null;
  lastErrorStatus: number | null;
}

const RANGE_MS: Record<ProviderHealthMatrixRange, number> = {
  "1h": 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

const TERMINAL_STATUSES = new Set(["banned", "expired", "credits_exhausted"]);

function toString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

function parseTimeMs(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) return numeric;
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function normalizeRange(value: ProviderHealthMatrixOptions["range"]): ProviderHealthMatrixRange {
  return value === "1h" || value === "7d" || value === "30d" ? value : "24h";
}

function isActiveConnection(value: unknown): boolean {
  return value !== false && value !== 0;
}

function isTerminalConnection(connection: JsonRecord): boolean {
  const status = toString(connection.testStatus)?.toLowerCase();
  const errorType = toString(connection.lastErrorType)?.toLowerCase();
  return Boolean(
    (status && TERMINAL_STATUSES.has(status)) || (errorType && TERMINAL_STATUSES.has(errorType))
  );
}

function sanitizeConnectionLabel(connection: JsonRecord): string {
  const label =
    toString(connection.name) ||
    toString(connection.displayName) ||
    toString(connection.email) ||
    toString(connection.id) ||
    "connection";
  const masked = label.includes("@") ? label.replace(/^(.).+(@.+)$/, "$1***$2") : label;
  return masked.length > 80 ? `${masked.slice(0, 77)}…` : masked;
}

function statsKey(provider: string, connectionId: string | null, model: string): string {
  return `${provider}\u0000${connectionId ?? ""}\u0000${model}`;
}

function accountKey(provider: string, connectionId: string | null): string {
  return `${provider}\u0000${connectionId ?? ""}`;
}

function modelLockKey(provider: string, connectionId: string | null, model: string): string {
  return `${provider}\u0000${connectionId ?? ""}\u0000${model}`;
}

function hasFailureStatus(status: number | null): boolean {
  return status !== null && (status < 200 || status >= 400);
}

function computeSuccessRate(requests: number, successes: number): number | null {
  return requests > 0 ? Math.round((successes / requests) * 100) : null;
}

function maxIso(left: string | null, right: string | null): string | null {
  if (!left) return right;
  if (!right) return left;
  return Date.parse(right) > Date.parse(left) ? right : left;
}

function queryCallLogTargetStats(
  cutoff: string,
  providerFilter: string | null
): CallLogTargetStats[] {
  const db = getDbInstance();
  const providerClause = providerFilter ? "AND c.provider = @provider" : "";
  const params = providerFilter ? { cutoff, provider: providerFilter } : { cutoff };
  const rows = db
    .prepare(
      `WITH log_targets AS (
        SELECT
          c.provider,
          COALESCE(c.connection_id, '') as connectionId,
          COALESCE(c.model, c.requested_model, 'unknown') as model,
          c.status,
          c.duration,
          c.timestamp,
          c.id,
          c.error_summary
        FROM call_logs c
        WHERE c.provider IS NOT NULL
          AND c.provider != '-'
          AND c.timestamp >= @cutoff
          ${providerClause}
      ), ranked AS (
        SELECT
          provider,
          connectionId,
          model,
          status,
          duration,
          timestamp,
          CASE
            WHEN (status IS NOT NULL AND (status < 200 OR status >= 400))
              OR error_summary IS NOT NULL
            THEN 1
            ELSE 0
          END as isError,
          ROW_NUMBER() OVER (
            PARTITION BY provider, connectionId, model
            ORDER BY timestamp DESC, id DESC
          ) as latestRank,
          ROW_NUMBER() OVER (
            PARTITION BY provider, connectionId, model,
              CASE
                WHEN (status IS NOT NULL AND (status < 200 OR status >= 400))
                  OR error_summary IS NOT NULL
                THEN 1
                ELSE 0
              END
            ORDER BY timestamp DESC, id DESC
          ) as errorRank
        FROM log_targets
      )
      SELECT
        provider,
        connectionId,
        model,
        COUNT(*) as requests,
        SUM(CASE WHEN status >= 200 AND status < 400 THEN 1 ELSE 0 END) as successes,
        ROUND(AVG(duration)) as avgLatencyMs,
        MAX(timestamp) as lastRequestAt,
        MAX(
          CASE
            WHEN isError = 1
            THEN timestamp
            ELSE NULL
          END
        ) as lastErrorAt,
        MAX(CASE WHEN latestRank = 1 THEN status ELSE NULL END) as lastStatus,
        MAX(CASE WHEN isError = 1 AND errorRank = 1 THEN status ELSE NULL END) as lastErrorStatus
      FROM ranked
      GROUP BY provider, connectionId, model`
    )
    .all(params) as JsonRecord[];

  return rows.map((row) => {
    const connectionId = toString(row.connectionId);
    return {
      provider: toString(row.provider) || "unknown",
      connectionId: connectionId || null,
      model: toString(row.model) || "unknown",
      requests: toNumber(row.requests),
      successes: toNumber(row.successes),
      avgLatencyMs: row.avgLatencyMs == null ? null : toNumber(row.avgLatencyMs),
      lastRequestAt: toString(row.lastRequestAt),
      lastErrorAt: toString(row.lastErrorAt),
      lastStatus: row.lastStatus == null ? null : toNumber(row.lastStatus),
      lastErrorStatus: row.lastErrorStatus == null ? null : toNumber(row.lastErrorStatus),
    };
  });
}

function classifyModel(
  stats: CallLogTargetStats | null,
  locked: boolean
): ProviderModelHealthStatus {
  if (locked) return "locked";
  if (!stats || stats.requests === 0) return "idle";
  if (hasFailureStatus(stats.lastStatus)) return "error";
  const successRate = computeSuccessRate(stats.requests, stats.successes);
  if (successRate !== null && successRate < 95) return "degraded";
  return "healthy";
}

function classifyAccount(
  connection: JsonRecord | null,
  models: ProviderHealthMatrixModel[],
  now: number
): ProviderHealthState {
  if (connection) {
    if (!isActiveConnection(connection.isActive) || isTerminalConnection(connection)) return "down";
    const cooldownUntil = parseTimeMs(connection.rateLimitedUntil);
    if (cooldownUntil && cooldownUntil > now) return "degraded";
  }
  if (models.some((model) => model.status === "error" || model.status === "locked")) {
    return "degraded";
  }
  return "healthy";
}

function classifyProvider(
  breaker: ProviderHealthMatrixProvider["circuitBreaker"],
  accounts: ProviderHealthMatrixAccount[]
): ProviderHealthState {
  if (breaker?.state === "OPEN") return "down";
  if (breaker?.state === "HALF_OPEN") return "degraded";
  if (accounts.length > 0 && accounts.every((account) => account.state === "down")) return "down";
  if (accounts.some((account) => account.state !== "healthy")) return "degraded";
  return "healthy";
}

export async function buildProviderHealthMatrix(
  options: ProviderHealthMatrixOptions = {}
): Promise<ProviderHealthMatrixResponse> {
  const now = Date.now();
  const checkedAt = new Date(now).toISOString();
  const range = normalizeRange(options.range);
  const cutoff = new Date(now - RANGE_MS[range]).toISOString();
  const providerFilter = toString(options.provider);
  const includeHealthy = options.includeHealthy !== false;

  const [connections, breakers, lockouts, stats] = await Promise.all([
    getProviderConnections(providerFilter ? { provider: providerFilter } : {}),
    getAllCircuitBreakerStatuses(),
    getAllModelLockouts(),
    Promise.resolve(queryCallLogTargetStats(cutoff, providerFilter)),
  ]);

  const connectionRows = (connections as JsonRecord[]).filter((connection) => {
    const provider = toString(connection.provider);
    return provider && (!providerFilter || provider === providerFilter);
  });
  const breakerRows = (breakers as JsonRecord[]).filter((breaker) => {
    const provider = toString(breaker.name);
    return provider && (!providerFilter || provider === providerFilter);
  });
  const lockoutRows = (lockouts as JsonRecord[]).filter((lockout) => {
    const provider = toString(lockout.provider);
    return provider && (!providerFilter || provider === providerFilter);
  });

  const providerIds = new Set<string>();
  for (const connection of connectionRows) {
    const provider = toString(connection.provider);
    if (provider) providerIds.add(provider);
  }
  for (const breaker of breakerRows) {
    const provider = toString(breaker.name);
    if (provider) providerIds.add(provider);
  }
  for (const lockout of lockoutRows) {
    const provider = toString(lockout.provider);
    if (provider) providerIds.add(provider);
  }
  for (const row of stats) providerIds.add(row.provider);
  if (providerFilter) providerIds.add(providerFilter);

  const syncedModelsByProvider = new Map<
    string,
    Awaited<ReturnType<typeof getSyncedAvailableModelsByConnection>>
  >();
  await Promise.all(
    [...providerIds].map(async (provider) => {
      syncedModelsByProvider.set(provider, await getSyncedAvailableModelsByConnection(provider));
    })
  );

  const statsByTarget = new Map<string, CallLogTargetStats>();
  const statsByAccount = new Map<string, CallLogTargetStats[]>();
  for (const row of stats) {
    statsByTarget.set(statsKey(row.provider, row.connectionId, row.model), row);
    const key = accountKey(row.provider, row.connectionId);
    const current = statsByAccount.get(key) ?? [];
    current.push(row);
    statsByAccount.set(key, current);
  }

  const lockoutsByTarget = new Map<string, JsonRecord>();
  const lockoutCountByProvider = new Map<string, number>();
  for (const lockout of lockoutRows) {
    const provider = toString(lockout.provider);
    const connectionId = toString(lockout.connectionId);
    const model = toString(lockout.model);
    if (!provider || !model) continue;
    lockoutsByTarget.set(modelLockKey(provider, connectionId, model), lockout);
    lockoutCountByProvider.set(provider, (lockoutCountByProvider.get(provider) ?? 0) + 1);
  }

  const providers: ProviderHealthMatrixProvider[] = [];
  for (const provider of [...providerIds].sort()) {
    const providerConnections = connectionRows.filter(
      (connection) => toString(connection.provider) === provider
    );
    const providerStats = stats.filter((row) => row.provider === provider);
    const providerBreaker = breakerRows.find((breaker) => toString(breaker.name) === provider);
    const circuitBreaker = providerBreaker
      ? {
          state: toString(providerBreaker.state) || "CLOSED",
          failureCount: toNumber(providerBreaker.failureCount),
          retryAfterMs: toNumber(providerBreaker.retryAfterMs),
          lastFailureTime:
            providerBreaker.lastFailureTime == null
              ? null
              : toNumber(providerBreaker.lastFailureTime),
        }
      : null;

    const accountRows = new Map<string, JsonRecord | null>();
    for (const connection of providerConnections) {
      accountRows.set(accountKey(provider, toString(connection.id)), connection);
    }
    for (const stat of providerStats) {
      const key = accountKey(provider, stat.connectionId);
      if (!accountRows.has(key)) accountRows.set(key, null);
    }
    for (const lockout of lockoutRows) {
      if (toString(lockout.provider) !== provider) continue;
      const key = accountKey(provider, toString(lockout.connectionId));
      if (!accountRows.has(key)) accountRows.set(key, null);
    }

    const accounts: ProviderHealthMatrixAccount[] = [];
    const providerSyncedModels = syncedModelsByProvider.get(provider) ?? {};
    for (const [key, connection] of [...accountRows.entries()].sort()) {
      const [, connectionPart] = key.split("\u0000");
      const connectionId = connection ? toString(connection.id) : connectionPart || null;
      const modelIds = new Set<string>();
      if (connectionId && connection) {
        const syncedModels = providerSyncedModels[connectionId] ?? [];
        for (const model of syncedModels) {
          if (model.id) modelIds.add(model.id);
        }
        const defaultModel = toString(connection.defaultModel);
        if (defaultModel) modelIds.add(defaultModel);
      }
      for (const stat of statsByAccount.get(accountKey(provider, connectionId)) ?? []) {
        modelIds.add(stat.model);
      }
      for (const lockout of lockoutRows) {
        if (toString(lockout.provider) !== provider) continue;
        if ((toString(lockout.connectionId) ?? "") !== (connectionId ?? "")) continue;
        const model = toString(lockout.model);
        if (model) modelIds.add(model);
      }

      const models = [...modelIds].sort().map((model): ProviderHealthMatrixModel => {
        const stat = statsByTarget.get(statsKey(provider, connectionId, model)) ?? null;
        const lockout = lockoutsByTarget.get(modelLockKey(provider, connectionId, model)) ?? null;
        const isLockedOut = Boolean(lockout);
        const status = classifyModel(stat, isLockedOut);
        return {
          model,
          status,
          isLockedOut,
          lockoutReason: lockout ? toString(lockout.reason) : null,
          lockoutRemainingMs: lockout ? Math.max(0, toNumber(lockout.remainingMs)) : 0,
          requests: stat?.requests ?? 0,
          successes: stat?.successes ?? 0,
          successRate: stat ? computeSuccessRate(stat.requests, stat.successes) : null,
          avgLatencyMs: stat?.avgLatencyMs ?? null,
          lastStatus: stat?.lastStatus ?? null,
          lastErrorStatus: stat?.lastErrorStatus ?? null,
          lastRequestAt: stat?.lastRequestAt ?? null,
          lastErrorAt: stat?.lastErrorAt ?? null,
        };
      });

      const cooldownUntil = connection ? parseTimeMs(connection.rateLimitedUntil) : null;
      const cooldownRemainingMs = cooldownUntil ? Math.max(0, cooldownUntil - now) : 0;
      const state = classifyAccount(connection, models, now);
      const issueCount =
        (state === "healthy" ? 0 : 1) +
        models.filter((model) => model.status === "error" || model.status === "locked").length;
      accounts.push({
        connectionId,
        label: connection
          ? sanitizeConnectionLabel(connection)
          : connectionId || "Unattributed traffic",
        isSynthetic: !connection,
        isActive: connection ? isActiveConnection(connection.isActive) : true,
        state,
        testStatus: connection ? toString(connection.testStatus) : null,
        rateLimitedUntil: connection ? toString(connection.rateLimitedUntil) : null,
        cooldownRemainingMs,
        lastErrorType: connection ? toString(connection.lastErrorType) : null,
        errorCode: connection ? toString(connection.errorCode) : null,
        backoffLevel: connection ? toNumber(connection.backoffLevel) : 0,
        modelCount: models.length,
        issueCount,
        models,
      });
    }

    const requests = providerStats.reduce((sum, row) => sum + row.requests, 0);
    const successes = providerStats.reduce((sum, row) => sum + row.successes, 0);
    const weightedLatency = providerStats.reduce(
      (sum, row) => sum + (row.avgLatencyMs ?? 0) * row.requests,
      0
    );
    const state = classifyProvider(circuitBreaker, accounts);
    const issueCount =
      (state === "healthy" ? 0 : 1) +
      accounts.reduce((sum, account) => sum + account.issueCount, 0);
    const totalConnections = providerConnections.length;
    const activeConnections = providerConnections.filter((connection) =>
      isActiveConnection(connection.isActive)
    ).length;
    const cooldownConnections = providerConnections.filter((connection) => {
      const until = parseTimeMs(connection.rateLimitedUntil);
      return Boolean(until && until > now);
    }).length;
    const terminalConnections = providerConnections.filter(isTerminalConnection).length;
    const modelLockoutCount = lockoutCountByProvider.get(provider) ?? 0;
    const scorePenalty =
      (circuitBreaker?.state === "OPEN" ? 0.4 : circuitBreaker?.state === "HALF_OPEN" ? 0.2 : 0) +
      (totalConnections > 0 ? (cooldownConnections / totalConnections) * 0.2 : 0) +
      (totalConnections > 0 ? (terminalConnections / totalConnections) * 0.25 : 0) +
      Math.min(0.2, modelLockoutCount * 0.05) +
      Math.min(0.15, accounts.filter((account) => account.state === "down").length * 0.05);

    const providerRow: ProviderHealthMatrixProvider = {
      provider,
      state,
      score: Number(Math.max(0, Math.min(1, 1 - scorePenalty)).toFixed(2)),
      circuitBreaker,
      connections: {
        total: totalConnections,
        active: activeConnections,
        cooldown: cooldownConnections,
        inactive: providerConnections.filter(
          (connection) => !isActiveConnection(connection.isActive)
        ).length,
        terminal: terminalConnections,
      },
      modelLockoutCount,
      requests,
      successRate: computeSuccessRate(requests, successes),
      avgLatencyMs: requests > 0 ? Math.round(weightedLatency / requests) : null,
      lastRequestAt: providerStats.reduce<string | null>(
        (latest, row) => maxIso(latest, row.lastRequestAt),
        null
      ),
      lastErrorAt: providerStats.reduce<string | null>(
        (latest, row) => maxIso(latest, row.lastErrorAt),
        null
      ),
      issueCount,
      accounts,
    };

    if (includeHealthy || providerRow.state !== "healthy" || providerRow.issueCount > 0) {
      providers.push(providerRow);
    }
  }

  return {
    checkedAt,
    range,
    cutoff,
    summary: {
      providerCount: providers.length,
      connectionCount: providers.reduce((sum, provider) => sum + provider.connections.total, 0),
      modelCount: providers.reduce(
        (sum, provider) =>
          sum +
          provider.accounts.reduce((accountSum, account) => accountSum + account.modelCount, 0),
        0
      ),
      issueCount: providers.reduce((sum, provider) => sum + provider.issueCount, 0),
      healthyCount: providers.filter((provider) => provider.state === "healthy").length,
      degradedCount: providers.filter((provider) => provider.state === "degraded").length,
      downCount: providers.filter((provider) => provider.state === "down").length,
    },
    providers,
  };
}
