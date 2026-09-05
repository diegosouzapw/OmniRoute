import test from "node:test";
import assert from "node:assert/strict";

import {
  buildHealthPayload,
  buildSessionsSummary,
  buildTelemetryPayload,
  projectAdaptiveAdmissionSummary,
  projectChatAdmissionSummary,
} from "../../../src/lib/monitoring/observability.ts";

test("buildSessionsSummary returns sticky counts and ordered top sessions", () => {
  const summary = buildSessionsSummary({
    activeSessions: [
      {
        sessionId: "sess-b",
        createdAt: 1_000,
        lastActive: 5_000,
        requestCount: 3,
        connectionId: "conn-b",
        ageMs: 4_000,
      },
      {
        sessionId: "sess-a",
        createdAt: 1_000,
        lastActive: 8_000,
        requestCount: 5,
        connectionId: null,
        ageMs: 7_000,
      },
    ],
    activeSessionsByKey: { key1: 2 },
  });

  assert.equal(summary.activeCount, 2);
  assert.equal(summary.stickyBoundCount, 1);
  assert.equal(summary.byApiKey.key1, 2);
  assert.equal(summary.top[0].sessionId, "sess-a");
  assert.equal(summary.top[1].sessionId, "sess-b");
});

test("buildTelemetryPayload exposes totalRequests alias plus quota/session signals", () => {
  const payload = buildTelemetryPayload({
    summary: {
      count: 7,
      p50: 120,
      p95: 320,
      p99: 450,
      phaseBreakdown: {
        connect: { p50: 80, p95: 200, avg: 110, count: 7 },
      },
    },
    quotaMonitorSummary: {
      active: 3,
      alerting: 2,
      exhausted: 1,
      errors: 1,
      statusCounts: {
        starting: 0,
        idle: 0,
        healthy: 1,
        warning: 1,
        exhausted: 1,
        error: 0,
      },
      byProvider: { codex: 3 },
    },
    activeSessions: [
      {
        sessionId: "sess-a",
        createdAt: 1_000,
        lastActive: 8_000,
        requestCount: 5,
        connectionId: "conn-a",
        ageMs: 7_000,
      },
    ],
  });

  assert.equal(payload.totalRequests, 7);
  assert.equal(payload.sessions.activeCount, 1);
  assert.equal(payload.sessions.stickyBoundCount, 1);
  assert.equal(payload.quotaMonitor.active, 3);
  assert.equal(payload.quotaMonitor.exhausted, 1);
});

test("buildHealthPayload reports Codex persisted parents through aggregate child state", () => {
  const now = Date.now();
  const partialUntil = new Date(now + 60_000).toISOString();
  const fullUntil = new Date(now + 120_000).toISOString();
  const payload = buildHealthPayload({
    appVersion: "1.2.3",
    settings: { setupComplete: true },
    connections: [
      {
        id: "codex-partial",
        provider: "codex",
        isActive: true,
        providerSpecificData: {
          codexScopeRateLimitedUntil: { spark: partialUntil },
          codexQuotaStateByScope: { spark: { usage5h: 100, limit5h: 100 } },
        },
      },
      {
        id: "codex-full",
        provider: "codex",
        isActive: true,
        providerSpecificData: {
          codexScopeRateLimitedUntil: { codex: fullUntil, spark: fullUntil },
          codexQuotaStateByScope: {
            codex: { usage5h: 100, limit5h: 100 },
            spark: { usage5h: 100, limit5h: 100 },
          },
        },
      },
      { id: "openai", provider: "openai", isActive: true },
    ],
    circuitBreakers: [],
    rateLimitStatus: {},
    learnedLimits: {},
    lockouts: {},
    localProviders: {},
    inflightRequests: 0,
    quotaMonitorSummary: {
      active: 0,
      alerting: 0,
      exhausted: 0,
      errors: 0,
      statusCounts: { starting: 0, idle: 0, healthy: 0, warning: 0, exhausted: 0, error: 0 },
      byProvider: {},
    },
    quotaMonitorMonitors: [],
    activeSessions: [],
  });

  assert.equal(payload.codexAccountPools.total, 2);
  assert.equal(payload.codexAccountPools.available, 0);
  assert.equal(payload.codexAccountPools.partiallyLimited, 1);
  assert.equal(payload.codexAccountPools.fullyLimited, 1);
  assert.equal(payload.codexAccountPools.quotaObserved, 2);
  assert.ok(payload.codexAccountPools.soonestRetryAfterMs > 0);
  assert.ok(payload.codexAccountPools.soonestRetryAfterMs <= 60_000);
  assert.equal(payload.connectionHealth.codex, undefined);
  assert.equal(payload.providerSummary.configuredCount, 2);
  assert.equal(payload.quotaMonitor.active, 0);
  assert.ok(payload.sessions);
  assert.deepEqual(payload.rateLimitStatus, {});
});

test("buildHealthPayload keeps legacy aliases and adds session/quota observability blocks", () => {
  const payload = buildHealthPayload({
    appVersion: "1.2.3",
    catalogCount: 99,
    settings: { setupComplete: true },
    connections: [
      { provider: "codex", isActive: true },
      { provider: "openai", isActive: false },
    ],
    circuitBreakers: [
      { name: "codex", state: "OPEN", failureCount: 2, lastFailureTime: "2026-04-12T12:00:00Z" },
      { name: "test-ignore", state: "OPEN", failureCount: 9, lastFailureTime: null },
    ],
    rateLimitStatus: { codex: { blocked: 1 } },
    lockouts: { codex: { "conn-1": { until: "2026-04-12T13:00:00Z" } } },
    localProviders: { ollama: { ok: true } },
    inflightRequests: 4,
    quotaMonitorSummary: {
      active: 1,
      alerting: 1,
      exhausted: 0,
      errors: 0,
      statusCounts: {
        starting: 0,
        idle: 0,
        healthy: 0,
        warning: 1,
        exhausted: 0,
        error: 0,
      },
      byProvider: { codex: 1 },
    },
    quotaMonitorMonitors: [
      {
        sessionId: "sess-a",
        provider: "codex",
        accountId: "conn-1",
        status: "warning",
        startedAt: "2026-04-12T12:00:00.000Z",
        lastPolledAt: "2026-04-12T12:01:00.000Z",
        lastSuccessAt: "2026-04-12T12:01:00.000Z",
        lastErrorAt: null,
        lastError: null,
        lastQuotaPercent: 0.91,
        lastQuotaUsed: 91,
        lastQuotaTotal: 100,
        lastResetAt: "2026-04-12T17:00:00.000Z",
        lastAlertAt: "2026-04-12T12:01:00.000Z",
        nextPollDelayMs: 15000,
        nextPollAt: "2026-04-12T12:01:15.000Z",
        totalPolls: 1,
        totalAlerts: 1,
        consecutiveFailures: 0,
      },
    ],
    activeSessions: [
      {
        sessionId: "sess-a",
        createdAt: 1_000,
        lastActive: 8_000,
        requestCount: 5,
        connectionId: "conn-1",
        ageMs: 7_000,
      },
    ],
    activeSessionsByKey: { key1: 1 },
  });

  assert.equal(payload.version, "1.2.3");
  assert.equal(payload.providerSummary.catalogCount, 99);
  assert.equal(payload.providerSummary.configuredCount, 2);
  assert.equal(payload.providerSummary.activeCount, 1);
  assert.equal(payload.providerSummary.monitoredCount, 1);
  assert.equal(payload.activeConnections, 2);
  assert.equal(payload.circuitBreakers.open, 1);
  assert.equal(payload.sessions.activeCount, 1);
  assert.equal(payload.sessions.stickyBoundCount, 1);
  assert.equal(payload.quotaMonitor.active, 1);
  assert.equal(payload.quotaMonitor.monitors[0].provider, "codex");
  assert.equal(payload.setupComplete, true);
  assert.equal(payload.adaptiveAdmission, null);
});

test("buildHealthPayload projects allowlisted adaptiveAdmission aggregates only", () => {
  const snapshot = {
    mode: "enforce",
    currentLimit: 4,
    minLimit: 1,
    maxLimit: 8,
    activeCost: 2,
    activeCount: 1,
    queuedCost: 3,
    queuedCount: 1,
    virtualActiveCost: 99,
    virtualActiveCount: 99,
    virtualQueuedCost: 99,
    virtualQueuedCount: 99,
    admittedCount: 10,
    rejectedCount: 2,
    wouldAdmitCount: 7,
    wouldQueueCount: 1,
    wouldRejectCount: 3,
    shortLatencyEwma: 12.5,
    longLatencyEwma: 40.1,
    utilization: 0.42,
    pressure: "high",
    resourceSeverity: "normal",
    resourceReason: "none",
    resourceObservedAtMs: 1_700_000_000_000,
    pressureGuardRejectCount: 5,
    shutdown: false,
    // Malicious / high-card sentinels that must never appear in the public payload.
    tenantId: "tenant-SECRET-should-not-leak",
    apiKey: "sk-live-SHOULD-NOT-LEAK",
    model: "openai/gpt-secret-model",
    sessionId: "sess-secret",
    requestId: "req-secret",
    body: { messages: [{ role: "user", content: "PII-body-secret" }] },
    queueItems: [{ tenantKey: "t-secret", cost: 9 }],
    resourcePath: "/sys/fs/cgroup/memory.current",
  } as unknown as import("../../../open-sse/services/admission/runtime.ts").AdaptiveAdmissionPublicSnapshot;

  const payload = buildHealthPayload({
    appVersion: "9.9.9",
    settings: { setupComplete: false },
    connections: [],
    circuitBreakers: [],
    rateLimitStatus: {},
    learnedLimits: {},
    lockouts: {},
    localProviders: {},
    inflightRequests: 0,
    quotaMonitorSummary: {
      active: 0,
      alerting: 0,
      exhausted: 0,
      errors: 0,
      statusCounts: {
        starting: 0,
        idle: 0,
        healthy: 0,
        warning: 0,
        exhausted: 0,
        error: 0,
      },
      byProvider: {},
    },
    quotaMonitorMonitors: [],
    activeSessions: [],
    adaptiveAdmission: snapshot,
  });

  assert.deepEqual(payload.adaptiveAdmission, {
    mode: "enforce",
    currentLimit: 4,
    minLimit: 1,
    maxLimit: 8,
    activeCost: 2,
    activeCount: 1,
    queuedCost: 3,
    queuedCount: 1,
    admittedCount: 10,
    rejectedCount: 2,
    wouldAdmitCount: 7,
    wouldQueueCount: 1,
    wouldRejectCount: 3,
    utilization: 0.42,
    pressure: "high",
    resourceSeverity: "normal",
    resourceReason: "none",
    resourceObservedAtMs: 1_700_000_000_000,
    pressureGuardRejectCount: 5,
    shutdown: false,
  });

  const json = JSON.stringify(payload);
  assert.equal(json.includes("tenant-SECRET"), false);
  assert.equal(json.includes("sk-live-SHOULD-NOT-LEAK"), false);
  assert.equal(json.includes("gpt-secret-model"), false);
  assert.equal(json.includes("PII-body-secret"), false);
  assert.equal(json.includes("t-secret"), false);
  assert.equal(json.includes("memory.current"), false);
  assert.equal(json.includes("queueItems"), false);
  assert.equal(json.includes("virtualActiveCost"), false);
  assert.equal(json.includes("shortLatencyEwma"), false);

  // Direct projector also null-safe.
  assert.equal(projectAdaptiveAdmissionSummary(null), null);
  assert.equal(projectAdaptiveAdmissionSummary(undefined), null);
});

// #11244: the STRUCTURAL chat-admission gate (chatBodyAdmission.ts) must surface in
// the health payload next to — never instead of — the adaptive snapshot, with only
// the documented low-cardinality fields projected.
test("buildHealthPayload projects allowlisted structural chatAdmission fields only", () => {
  const snapshot = {
    activeHeavy: 1,
    activeHealthyHeadroom: 1,
    waiting: 2,
    queuedBytes: 524_288,
    shedTotal: 3,
    shedsByReason: { queue_timeout: 2, body_exceeds_budget: 1 },
    lanes: [
      { key: "key_c49d1c242feda590", waiting: 1 },
      { key: "anonymous", waiting: 1 },
    ],
    // #503-fanout additions.
    inflightBytes: 131_072,
    maxInflightBytes: 134_217_728,
    budgetSource: "v8_heap",
    pressureSeverity: "normal",
    countCapEnabled: false,
    // Extra keys that must never leak into the public payload.
    internalController: { secret: "controller-state" },
    rawAuthorization: "Bearer raw-SHOULD-NOT-LEAK",
  } as unknown as import("../../../src/lib/monitoring/observability.ts").ChatAdmissionSnapshot;

  const payload = buildHealthPayload({
    appVersion: "9.9.9",
    settings: { setupComplete: false },
    connections: [],
    circuitBreakers: [],
    rateLimitStatus: {},
    learnedLimits: {},
    lockouts: {},
    localProviders: {},
    inflightRequests: 0,
    quotaMonitorSummary: {
      active: 0,
      alerting: 0,
      exhausted: 0,
      errors: 0,
      statusCounts: { starting: 0, idle: 0, healthy: 0, warning: 0, exhausted: 0, error: 0 },
      byProvider: {},
    },
    quotaMonitorMonitors: [],
    activeSessions: [],
    chatAdmission: snapshot,
  });

  assert.deepEqual(payload.chatAdmission, {
    activeHeavy: 1,
    activeHealthyHeadroom: 1,
    waiting: 2,
    queuedBytes: 524_288,
    shedTotal: 3,
    shedsByReason: { queue_timeout: 2, body_exceeds_budget: 1 },
    lanes: [
      { key: "key_c49d1c242feda590", waiting: 1 },
      { key: "anonymous", waiting: 1 },
    ],
    inflightBytes: 131_072,
    maxInflightBytes: 134_217_728,
    budgetSource: "v8_heap",
    pressureSeverity: "normal",
    countCapEnabled: false,
  });
  // The adaptive projection is untouched by the new key.
  assert.equal(payload.adaptiveAdmission, null);

  const json = JSON.stringify(payload);
  assert.equal(json.includes("controller-state"), false);
  assert.equal(json.includes("raw-SHOULD-NOT-LEAK"), false);
  assert.equal(json.includes("internalController"), false);

  // Absent / null snapshot projects to null (degraded path parity).
  assert.equal(projectChatAdmissionSummary(null), null);
  assert.equal(projectChatAdmissionSummary(undefined), null);
});
