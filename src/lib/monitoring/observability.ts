type JsonRecord = Record<string, unknown>;

interface CircuitBreakerStatus {
  name: string;
  state: string;
  failureCount?: number;
  lastFailureTime?: number | string | null;
  retryAfterMs?: number;
}

interface SessionSnapshot {
  sessionId: string;
  createdAt: number;
  lastActive: number;
  requestCount: number;
  connectionId: string | null;
  ageMs: number;
}

interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  startedAt: string;
  lastPolledAt: string | null;
  lastSuccessAt: string | null;
  lastErrorAt: string | null;
  lastError: string | null;
  lastQuotaPercent: number | null;
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  lastAlertAt: string | null;
  nextPollDelayMs: number | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}

interface QuotaMonitorSummary {
  active: number;
  alerting: number;
  exhausted: number;
  errors: number;
  statusCounts: Record<QuotaMonitorSnapshot["status"], number>;
  byProvider: Record<string, number>;
}

interface BuildSessionsSummaryOptions {
  activeSessions: SessionSnapshot[];
  activeSessionsByKey?: Record<string, number>;
}

interface BuildTelemetryPayloadOptions {
  summary: {
    count: number;
    avg?: number;
    p50: number;
    p95: number;
    p99: number;
    phaseBreakdown: JsonRecord;
  };
  quotaMonitorSummary: QuotaMonitorSummary;
  activeSessions: SessionSnapshot[];
}

interface BuildHealthPayloadOptions {
  appVersion: string;
  catalogCount?: number;
  settings: { setupComplete?: boolean } | null | undefined;
  connections: Array<{ provider?: string; isActive?: boolean | null }>;
  circuitBreakers: CircuitBreakerStatus[];
  rateLimitStatus: JsonRecord;
  learnedLimits: JsonRecord;
  lockouts: JsonRecord;
  localProviders: JsonRecord;
  inflightRequests: number;
  quotaMonitorSummary: QuotaMonitorSummary;
  quotaMonitorMonitors: QuotaMonitorSnapshot[];
  activeSessions: SessionSnapshot[];
  activeSessionsByKey?: Record<string, number>;
}

function limitMonitors(monitors: QuotaMonitorSnapshot[], maxItems = 8): QuotaMonitorSnapshot[] {
  return monitors.slice(0, maxItems);
}

export function buildSessionsSummary({
  activeSessions,
  activeSessionsByKey = {},
}: BuildSessionsSummaryOptions) {
  const ordered = [...activeSessions].sort((left, right) => right.lastActive - left.lastActive);
  const stickyBoundCount = ordered.filter((entry) => entry.connectionId).length;

  return {
    activeCount: ordered.length,
    stickyBoundCount,
    byApiKey: activeSessionsByKey,
    top: ordered.slice(0, 8).map((entry) => ({
      sessionId: entry.sessionId,
      requestCount: entry.requestCount,
      connectionId: entry.connectionId,
      ageMs: entry.ageMs,
      idleMs: Math.max(0, Date.now() - entry.lastActive),
      createdAt: new Date(entry.createdAt).toISOString(),
      lastActiveAt: new Date(entry.lastActive).toISOString(),
    })),
  };
}

export function buildTelemetryPayload({
  summary,
  quotaMonitorSummary,
  activeSessions,
}: BuildTelemetryPayloadOptions) {
  const sessions = buildSessionsSummary({ activeSessions });
  return {
    ...summary,
    totalRequests: summary.count,
    avgLatencyMs: summary.avg ?? summary.p50,
    sessions: {
      activeCount: sessions.activeCount,
      stickyBoundCount: sessions.stickyBoundCount,
    },
    quotaMonitor: {
      active: quotaMonitorSummary.active,
      alerting: quotaMonitorSummary.alerting,
      exhausted: quotaMonitorSummary.exhausted,
      errors: quotaMonitorSummary.errors,
      statusCounts: quotaMonitorSummary.statusCounts,
    },
  };
}

export function buildHealthPayload({
  appVersion,
  catalogCount = 0,
  settings,
  connections,
  circuitBreakers,
  rateLimitStatus,
  learnedLimits,
  lockouts,
  localProviders,
  inflightRequests,
  quotaMonitorSummary,
  quotaMonitorMonitors,
  activeSessions,
  activeSessionsByKey = {},
}: BuildHealthPayloadOptions) {
  const timestamp = new Date().toISOString();
  const system = {
    version: appVersion,
    nodeVersion: process.version,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    pid: process.pid,
    platform: process.platform,
  };

  const providerBreakers = circuitBreakers
    .filter((cb) => !cb.name.startsWith("test-") && !cb.name.startsWith("test_"))
    .map((cb) => {
      const lastFailure =
        typeof cb.lastFailureTime === "number" && Number.isFinite(cb.lastFailureTime)
          ? new Date(cb.lastFailureTime).toISOString()
          : typeof cb.lastFailureTime === "string"
            ? cb.lastFailureTime
            : null;
      return {
        provider: cb.name,
        state: cb.state,
        failureCount: cb.failureCount || 0,
        lastFailure,
        retryAfterMs: cb.retryAfterMs || 0,
      };
    });

  const providerHealth: Record<string, JsonRecord> = {};
  for (const breaker of providerBreakers) {
    providerHealth[breaker.provider] = {
      state: breaker.state,
      failures: breaker.failureCount,
      lastFailure: breaker.lastFailure,
      retryAfterMs: breaker.retryAfterMs,
    };
  }

  const configuredProviders = new Set(
    connections.map((connection) => connection.provider).filter(Boolean)
  );
  const activeProviders = new Set(
    connections
      .filter((connection) => connection.isActive !== false)
      .map((connection) => connection.provider)
      .filter(Boolean)
  );
  const breakerCounts = circuitBreakers.reduce(
    (acc, cb) => {
      if (cb.name.startsWith("test-") || cb.name.startsWith("test_")) return acc;
      if (cb.state === "OPEN") acc.open += 1;
      else if (cb.state === "HALF_OPEN") acc.halfOpen += 1;
      else acc.closed += 1;
      return acc;
    },
    { open: 0, halfOpen: 0, closed: 0 }
  );

  return {
    status: "healthy",
    timestamp,
    system,
    version: system.version,
    uptime: system.uptime,
    memoryUsage: system.memoryUsage,
    activeConnections: connections.length,
    circuitBreakers: {
      ...breakerCounts,
      total: breakerCounts.open + breakerCounts.halfOpen + breakerCounts.closed,
    },
    providerBreakers,
    providerHealth,
    providerSummary: {
      catalogCount,
      configuredCount: configuredProviders.size,
      activeCount: activeProviders.size,
      monitoredCount: Object.keys(providerHealth).length,
    },
    localProviders,
    rateLimitStatus,
    learnedLimits,
    lockouts,
    quotaMonitor: {
      ...quotaMonitorSummary,
      monitors: limitMonitors(quotaMonitorMonitors),
    },
    sessions: buildSessionsSummary({ activeSessions, activeSessionsByKey }),
    dedup: {
      inflightRequests,
    },
    cryptography: {
      status:
        process.env.STORAGE_ENCRYPTION_KEY && process.env.STORAGE_ENCRYPTION_KEY.length >= 32
          ? "healthy"
          : "missing_or_invalid",
      provider: "aes-256-gcm",
    },
    setupComplete: settings?.setupComplete || false,
  };
}
