import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type {
  ComboForecastResponse,
  ComboHealthResponse,
  ComboRecord,
  ProviderAutopilotReport,
} from "../../src/shared/types/utilization.ts";
import { buildComboHealthAutopilotReport } from "../../src/lib/monitoring/comboHealthAutopilot.ts";

function healthResponse(): ComboHealthResponse {
  return {
    timeRange: "24h",
    combos: [
      {
        comboId: "c1",
        comboName: "my-combo",
        strategy: "fallback",
        models: [],
        targetHealth: [
          {
            executionKey: "e1",
            stepId: "s1",
            model: "m",
            provider: "p",
            connectionId: null,
            label: null,
            requests: 5,
            successRate: 90,
            avgLatencyMs: 100,
            lastStatus: "error",
            lastUsedAt: null,
            quotaRemainingPct: 50,
            quotaIsExhausted: false,
            quotaTrend: "stable",
            quotaScope: "provider",
          },
        ],
        quotaHealth: { providers: [], worstRemainingPct: 100 },
        usageSkew: { modelDistribution: [], giniCoefficient: 0 },
        performance: { avgLatencyMs: 100, successRate: 1.0, totalRequests: 10 },
      },
    ],
  };
}

function forecastResponse(): ComboForecastResponse {
  return {
    timeRange: "24h",
    horizon: "30d",
    asOf: new Date(0).toISOString(),
    method: "linear_history",
    combos: [],
  };
}

function providerHealthResponse(): ProviderAutopilotReport {
  return { providers: [] } as unknown as ProviderAutopilotReport;
}

function healthyTargetResponse(
  comboId = "c1",
  comboName = "my-combo",
  connectionId: string | null = null,
  eligibleConnectionIds: string[] | null = null
): ComboHealthResponse {
  const response: ComboHealthResponse = {
    timeRange: "24h",
    combos: [
      {
        comboId,
        comboName,
        strategy: "fallback",
        models: ["p/m"],
        targetHealth: [
          {
            executionKey: `${comboId}-target`,
            stepId: `${comboId}-step`,
            model: "m",
            provider: "p",
            connectionId,
            label: null,
            requests: 10,
            successRate: 100,
            avgLatencyMs: 100,
            lastStatus: "ok",
            lastUsedAt: null,
            quotaRemainingPct: 50,
            quotaIsExhausted: false,
            quotaTrend: "stable",
            quotaScope: "provider",
          },
        ],
        quotaHealth: { providers: [], worstRemainingPct: 50 },
        usageSkew: { modelDistribution: [], giniCoefficient: 0 },
        performance: { avgLatencyMs: 100, successRate: 1, totalRequests: 10 },
      },
    ],
  };
  const target = response.combos[0].targetHealth?.[0] as
    | (NonNullable<ComboHealthResponse["combos"][number]["targetHealth"]>[number] & {
        eligibleConnectionIds: string[] | null;
      })
    | undefined;
  if (target) target.eligibleConnectionIds = eligibleConnectionIds;
  return response;
}

function buildOptions() {
  return {
    range: "24h" as const,
    horizon: "30d" as const,
    healthResponse: healthResponse(),
    forecastResponse: forecastResponse(),
    providerHealthResponse: providerHealthResponse(),
  };
}

describe("combo health autopilot counter", () => {
  it("exposes suggestionCount and keeps actionableCount alias", async () => {
    const report = await buildComboHealthAutopilotReport(buildOptions());
    assert.equal(typeof report.summary.suggestionCount, "number");
    assert.equal(report.summary.actionableCount, report.summary.suggestionCount);
    const expected = report.combos.reduce(
      (sum, combo) =>
        sum + combo.issues.reduce((issueSum, issue) => issueSum + issue.actions.length, 0),
      0
    );
    assert.equal(report.summary.suggestionCount, expected);
  });

  it("run_combo_test action links the dashboard with the combo id", async () => {
    const report = await buildComboHealthAutopilotReport(buildOptions());
    const actions = report.combos.flatMap((combo) => combo.issues.flatMap((i) => i.actions));
    const runTest = actions.find((a) => a.type === "run_combo_test");
    assert.ok(runTest, "run_combo_test action should exist");
    assert.equal(typeof runTest.href, "string");
    assert.ok(runTest.href?.includes("c1"), "href must carry the combo id");
    assert.equal(
      runTest.href?.includes("/api/combos/test?comboId="),
      false,
      "href must not target the GET-only API route (405)"
    );
  });

  it("keeps every action in manual mode", async () => {
    const report = await buildComboHealthAutopilotReport(buildOptions());
    for (const combo of report.combos) {
      for (const issue of combo.issues) {
        for (const action of issue.actions) {
          assert.equal(action.mode, "manual");
        }
      }
    }
  });

  it("excludes disabled combos from active health rollups", async () => {
    const active = healthyTargetResponse("active-id", "active-combo").combos[0];
    const disabled = healthyTargetResponse("disabled-id", "rollback-combo").combos[0];
    const report = await buildComboHealthAutopilotReport({
      ...buildOptions(),
      includeHealthy: true,
      combos: [
        { id: "active-id", name: "active-combo", isActive: true },
        { id: "disabled-id", name: "rollback-combo", isActive: false },
      ] as ComboRecord[],
      healthResponse: { timeRange: "24h", combos: [active, disabled] },
    });

    assert.equal(report.summary.comboCount, 1);
    assert.deepEqual(
      report.combos.map((combo) => combo.comboId),
      ["active-id"]
    );
  });

  it("keeps low-confidence quota forecasts informational without quota monitors", async () => {
    const forecast: ComboForecastResponse = {
      timeRange: "24h",
      horizon: "30d",
      asOf: new Date(0).toISOString(),
      method: "linear_history",
      combos: [
        {
          comboId: "c1",
          comboName: "my-combo",
          strategy: "fallback",
          confidence: "low",
          history: {
            requests: 10,
            inputTokens: 0,
            outputTokens: 0,
            cacheReadTokens: 0,
            cacheCreationTokens: 0,
            reasoningTokens: 0,
            totalTokens: 0,
            costUsd: 0,
            avgDailyCostUsd: 0,
          },
          forecast: { projectedRequests: 10, projectedTokens: 0, projectedCostUsd: 0 },
          quotaRisk: {
            level: "critical",
            projectedWorstRemainingPct: 0,
            timeToExhaustDays: 1,
            worstTargetExecutionKey: "c1-target",
          },
          targets: [
            {
              executionKey: "c1-target",
              stepId: "c1-step",
              provider: "p",
              model: "m",
              connectionId: null,
              label: null,
              trafficShare: 1,
              history: { requests: 10, costUsd: 0, totalTokens: 0 },
              forecast: { projectedRequests: 10, projectedCostUsd: 0, projectedTokens: 0 },
              quota: {
                scope: "provider",
                remainingPct: 5,
                depletionPctPerDay: 5,
                projectedRemainingPct: 0,
                timeToExhaustDays: 1,
                risk: "critical",
              },
            },
          ],
          dataQuality: { pricingCoveragePct: 0, quotaCoverage: "provider", notes: [] },
        },
      ],
    };
    const report = await buildComboHealthAutopilotReport({
      ...buildOptions(),
      includeHealthy: true,
      healthResponse: healthyTargetResponse(),
      forecastResponse: forecast,
    });

    assert.equal(report.status, "healthy");
    assert.equal(report.combos[0].state, "healthy");
    assert.equal(
      report.combos[0].issues.find((issue) => issue.kind === "forecast_quota_risk")?.severity,
      "info"
    );
    assert.equal(
      report.combos[0].issues.find((issue) => issue.kind === "data_quality_gap")?.severity,
      "info"
    );

    forecast.combos[0].confidence = "high";
    forecast.combos[0].dataQuality.pricingCoveragePct = 100;
    const monitoredProviderHealth: ProviderAutopilotReport = {
      status: "healthy",
      checkedAt: new Date(0).toISOString(),
      summary: {
        providerCount: 1,
        connectionCount: 1,
        healthyCount: 1,
        issueCount: 0,
        actionableCount: 0,
      },
      providers: [
        {
          provider: "p",
          state: "healthy",
          score: 1,
          signals: {
            circuitBreaker: null,
            connections: {
              total: 1,
              active: 1,
              inactive: 0,
              cooldown: 0,
              terminal: 0,
              staleErrors: 0,
            },
            modelLockouts: 0,
            quotaMonitor: { warning: 0, exhausted: 0, errors: 0 },
          },
          issues: [],
        },
      ],
    };
    const monitoredReport = await buildComboHealthAutopilotReport({
      ...buildOptions(),
      includeHealthy: true,
      healthResponse: healthyTargetResponse(),
      forecastResponse: forecast,
      providerHealthResponse: monitoredProviderHealth,
    });
    assert.equal(
      monitoredReport.combos[0].issues.find((issue) => issue.kind === "forecast_quota_risk")
        ?.severity,
      "critical"
    );
    assert.equal(monitoredReport.combos[0].state, "down");

    forecast.combos[0].quotaRisk.worstTargetExecutionKey = "q-target";
    forecast.combos[0].targets.push({
      ...forecast.combos[0].targets[0],
      executionKey: "q-target",
      stepId: "q-step",
      provider: "q",
    });
    const mixedProviderReport = await buildComboHealthAutopilotReport({
      ...buildOptions(),
      includeHealthy: true,
      healthResponse: healthyTargetResponse(),
      forecastResponse: forecast,
      providerHealthResponse: monitoredProviderHealth,
    });
    const mixedIssue = mixedProviderReport.combos[0].issues.find(
      (issue) => issue.kind === "forecast_quota_risk"
    );
    assert.equal(mixedIssue?.severity, "info");
    assert.equal(mixedIssue?.evidence.worstTargetProvider, "q");
    assert.equal(mixedIssue?.evidence.hasQuotaMonitorCoverage, false);
  });

  it("keeps an unpinned connection issue informational when provider capacity remains", async () => {
    const providerHealth = {
      status: "warning",
      checkedAt: new Date(0).toISOString(),
      summary: {
        providerCount: 1,
        connectionCount: 2,
        healthyCount: 0,
        issueCount: 1,
        actionableCount: 0,
      },
      providers: [
        {
          provider: "p",
          state: "degraded",
          score: 0.75,
          signals: {
            circuitBreaker: null,
            connections: {
              total: 2,
              active: 2,
              inactive: 0,
              cooldown: 1,
              terminal: 0,
              staleErrors: 0,
            },
            modelLockouts: 0,
            quotaMonitor: null,
          },
          issues: [
            {
              id: "issue-1",
              severity: "warning",
              kind: "connection_cooldown",
              title: "One connection is cooling down",
              recommendation: "Use remaining capacity.",
              target: { provider: "p", connectionId: "affected-connection" },
              evidence: { isActive: true },
              actions: [],
            },
          ],
        },
      ],
    } satisfies ProviderAutopilotReport;
    const report = await buildComboHealthAutopilotReport({
      ...buildOptions(),
      includeHealthy: true,
      healthResponse: healthyTargetResponse("c1", "my-combo", null, ["remaining-connection"]),
      providerHealthResponse: providerHealth,
    });

    const issue = report.combos[0].issues.find((entry) => entry.kind === "provider_health_issue");
    assert.equal(issue?.severity, "info");
    assert.equal(issue?.evidence.hasUnpinnedFallbackCapacity, true);
    assert.equal(report.combos[0].state, "healthy");

    const pinnedReport = await buildComboHealthAutopilotReport({
      ...buildOptions(),
      includeHealthy: true,
      healthResponse: healthyTargetResponse("c1", "my-combo", "affected-connection"),
      providerHealthResponse: providerHealth,
    });
    assert.equal(
      pinnedReport.combos[0].issues.find((entry) => entry.kind === "provider_health_issue")
        ?.severity,
      "warning"
    );
    assert.equal(pinnedReport.combos[0].state, "degraded");
  });

  it("keeps a provider info diagnostic informational for a pinned target", async () => {
    const providerHealth = {
      status: "healthy",
      checkedAt: new Date(0).toISOString(),
      summary: {
        providerCount: 1,
        connectionCount: 1,
        healthyCount: 1,
        issueCount: 1,
        actionableCount: 0,
      },
      providers: [
        {
          provider: "p",
          state: "healthy",
          score: 1,
          signals: {
            circuitBreaker: null,
            connections: {
              total: 1,
              active: 1,
              inactive: 0,
              cooldown: 0,
              terminal: 0,
              staleErrors: 1,
            },
            modelLockouts: 0,
            quotaMonitor: null,
          },
          issues: [
            {
              id: "issue-info",
              severity: "info",
              kind: "stale_connection_error",
              title: "Stale error metadata",
              recommendation: "Clear it when convenient.",
              target: { provider: "p", connectionId: "pinned-connection" },
              evidence: { isActive: true },
              actions: [],
            },
          ],
        },
      ],
    } satisfies ProviderAutopilotReport;
    const report = await buildComboHealthAutopilotReport({
      ...buildOptions(),
      includeHealthy: true,
      healthResponse: healthyTargetResponse("c1", "my-combo", "pinned-connection"),
      providerHealthResponse: providerHealth,
    });

    assert.equal(
      report.combos[0].issues.find((issue) => issue.kind === "provider_health_issue")?.severity,
      "info"
    );
    assert.equal(report.combos[0].state, "healthy");
  });
});
