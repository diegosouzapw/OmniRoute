import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type {
  ComboForecastResponse,
  ComboHealthResponse,
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
});
