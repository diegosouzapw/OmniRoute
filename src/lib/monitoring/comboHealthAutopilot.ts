import { getCombos } from "@/lib/db/combos";
import { buildProviderHealthAutopilotReport } from "@/lib/monitoring/providerHealthAutopilot";
import { buildComboForecastResponse } from "@/lib/usage/comboForecast";
import { buildComboHealthResponse } from "@/lib/usage/comboHealth";
import type {
  ComboAutopilotAction,
  ComboAutopilotActionType,
  ComboAutopilotCombo,
  ComboAutopilotIssue,
  ComboAutopilotIssueKind,
  ComboAutopilotReport,
  ComboAutopilotSeverity,
  ComboAutopilotState,
  ComboAutopilotTargetRef,
  ComboForecastHorizon,
  ComboForecastMetrics,
  ComboForecastResponse,
  ComboForecastRiskLevel,
  ComboHealthMetrics,
  ComboHealthResponse,
  ComboRecord,
  UtilizationTimeRange,
} from "@/shared/types/utilization";

type JsonRecord = Record<string, unknown>;

export interface ComboHealthAutopilotOptions {
  range: UtilizationTimeRange;
  horizon: ComboForecastHorizon;
  comboId?: string;
  includeHealthy?: boolean;
  includeActions?: boolean;
  now?: number;
  combos?: ComboRecord[];
  healthResponse?: ComboHealthResponse;
  forecastResponse?: ComboForecastResponse;
}

type ProviderIssueView = {
  severity?: ComboAutopilotSeverity;
  kind?: string;
  title?: string;
  recommendation?: string;
  target?: {
    provider?: string;
    connectionId?: string;
  };
  evidence?: JsonRecord;
};

function sanitizeId(parts: Array<string | null | undefined>): string {
  return parts
    .filter(Boolean)
    .join("_")
    .replace(/[^a-zA-Z0-9_.:-]/g, "_");
}

function riskRank(risk: ComboForecastRiskLevel): number {
  return { unknown: 0, low: 1, medium: 2, high: 3, critical: 4 }[risk];
}

function severityRank(severity: ComboAutopilotSeverity): number {
  return { info: 1, warning: 2, critical: 3 }[severity];
}

function targetRef(
  combo: ComboHealthMetrics,
  target?: NonNullable<ComboHealthMetrics["targetHealth"]>[number]
): ComboAutopilotTargetRef {
  return {
    comboId: combo.comboId,
    comboName: combo.comboName,
    provider: target?.provider,
    connectionId: target?.connectionId,
    executionKey: target?.executionKey,
    model: target?.model,
  };
}

function action(
  type: ComboAutopilotActionType,
  label: string,
  target: ComboAutopilotTargetRef,
  href?: string
): ComboAutopilotAction {
  return {
    type,
    mode: "manual",
    label,
    href,
    target,
  };
}

function actionSet(
  target: ComboAutopilotTargetRef,
  includeActions: boolean,
  types: ComboAutopilotActionType[]
): ComboAutopilotAction[] {
  if (!includeActions) return [];
  return types.map((type) => {
    switch (type) {
      case "open_combo_editor":
        return action(type, "Open combo editor", target, "/dashboard/combos");
      case "run_combo_test":
        return action(type, "Run combo test", target, "/dashboard/combos");
      case "open_provider_health_autopilot":
        return action(type, "Open provider autopilot", target, "/dashboard/health");
      case "review_quota_limits":
        return action(type, "Review quota limits", target, "/dashboard/providers");
      case "review_pricing":
        return action(type, "Review pricing data", target, "/dashboard/settings");
    }
  });
}

function issue(
  combo: ComboHealthMetrics,
  kind: ComboAutopilotIssueKind,
  severity: ComboAutopilotSeverity,
  title: string,
  recommendation: string,
  evidence: JsonRecord,
  includeActions: boolean,
  actionTypes: ComboAutopilotActionType[],
  target?: NonNullable<ComboHealthMetrics["targetHealth"]>[number]
): ComboAutopilotIssue {
  const targetData = targetRef(combo, target);
  return {
    id: sanitizeId(["cha", kind, combo.comboId, target?.executionKey, target?.provider]),
    severity,
    kind,
    title,
    recommendation,
    evidence,
    target: targetData,
    actions: actionSet(targetData, includeActions, actionTypes),
  };
}

function providerIssueMatchesTarget(
  providerIssue: ProviderIssueView,
  target: NonNullable<ComboHealthMetrics["targetHealth"]>[number]
): boolean {
  const provider = providerIssue.target?.provider;
  const connectionId = providerIssue.target?.connectionId;
  return Boolean(
    provider &&
    provider === target.provider &&
    (!connectionId || !target.connectionId || connectionId === target.connectionId)
  );
}

function providerIssueEvidence(providerIssue: ProviderIssueView): JsonRecord {
  return {
    providerKind: providerIssue.kind ?? "provider_health_issue",
    providerTitle: providerIssue.title ?? "Provider health issue",
    providerRecommendation: providerIssue.recommendation ?? "Review provider health details.",
    ...(providerIssue.evidence ?? {}),
  };
}

function buildProviderIssueIndex(providerIssues: ProviderIssueView[]): ProviderIssueView[] {
  return providerIssues.filter((entry) => Boolean(entry.target?.provider));
}

function buildIssuesForCombo(
  combo: ComboHealthMetrics,
  forecast: ComboForecastMetrics | undefined,
  providerIssues: ProviderIssueView[],
  includeActions: boolean
): ComboAutopilotIssue[] {
  const issues: ComboAutopilotIssue[] = [];
  const targets = combo.targetHealth ?? [];

  if (targets.length === 0) {
    issues.push(
      issue(
        combo,
        "combo_no_targets",
        "critical",
        "Combo has no executable targets",
        "Open the combo editor and add at least one reachable provider/model target.",
        { targetCount: 0 },
        includeActions,
        ["open_combo_editor"]
      )
    );
  }

  if (combo.performance.totalRequests === 0) {
    issues.push(
      issue(
        combo,
        "combo_no_recent_traffic",
        "info",
        "No recent combo traffic",
        "Run a combo test or send traffic before relying on health trends.",
        { totalRequests: 0 },
        includeActions,
        ["run_combo_test"]
      )
    );
  }

  if (combo.performance.totalRequests >= 5 && combo.performance.successRate < 0.9) {
    const critical = combo.performance.successRate < 0.7;
    issues.push(
      issue(
        combo,
        "combo_low_success_rate",
        critical ? "critical" : "warning",
        "Combo success rate is below target",
        "Inspect failing targets and test fallback order before increasing traffic.",
        {
          successRate: combo.performance.successRate,
          totalRequests: combo.performance.totalRequests,
        },
        includeActions,
        ["run_combo_test", "open_combo_editor"]
      )
    );
  }

  if (combo.usageSkew.giniCoefficient >= 0.65 && combo.performance.totalRequests > 0) {
    issues.push(
      issue(
        combo,
        "usage_skew_high",
        "warning",
        "Traffic is concentrated on few targets",
        "Review strategy weights or fallback order to avoid overloading one target.",
        { giniCoefficient: combo.usageSkew.giniCoefficient },
        includeActions,
        ["open_combo_editor"]
      )
    );
  }

  for (const target of targets) {
    if (target.requests >= 3 && target.successRate < 80) {
      issues.push(
        issue(
          combo,
          "target_low_success_rate",
          target.successRate < 50 ? "critical" : "warning",
          "Target success rate is degraded",
          "Run a focused combo test and consider changing order, weight, or credentials.",
          { successRate: target.successRate, requests: target.requests },
          includeActions,
          ["run_combo_test", "open_combo_editor"],
          target
        )
      );
    }

    if (target.lastStatus === "error") {
      issues.push(
        issue(
          combo,
          "target_last_error",
          "warning",
          "Target failed on its latest request",
          "Check provider/account health before sending more traffic to this target.",
          { lastStatus: target.lastStatus, lastUsedAt: target.lastUsedAt },
          includeActions,
          ["open_provider_health_autopilot", "run_combo_test"],
          target
        )
      );
    }

    if (target.quotaIsExhausted) {
      issues.push(
        issue(
          combo,
          "target_quota_exhausted",
          "critical",
          "Target quota is exhausted",
          "Move traffic away from this target or rotate credentials until quota resets.",
          { quotaScope: target.quotaScope, quotaRemainingPct: target.quotaRemainingPct },
          includeActions,
          ["review_quota_limits", "open_combo_editor"],
          target
        )
      );
    } else if (typeof target.quotaRemainingPct === "number" && target.quotaRemainingPct < 15) {
      issues.push(
        issue(
          combo,
          "target_low_quota",
          target.quotaRemainingPct < 5 ? "critical" : "warning",
          "Target quota is running low",
          "Review provider quota and rebalance traffic before the target is exhausted.",
          { quotaScope: target.quotaScope, quotaRemainingPct: target.quotaRemainingPct },
          includeActions,
          ["review_quota_limits", "open_combo_editor"],
          target
        )
      );
    }

    for (const providerIssue of providerIssues) {
      if (!providerIssueMatchesTarget(providerIssue, target)) continue;
      issues.push(
        issue(
          combo,
          "provider_health_issue",
          providerIssue.severity === "critical" ? "critical" : "warning",
          providerIssue.title ?? "Provider health issue affects combo target",
          providerIssue.recommendation ?? "Review provider health autopilot details.",
          providerIssueEvidence(providerIssue),
          includeActions,
          ["open_provider_health_autopilot", "open_combo_editor"],
          target
        )
      );
    }
  }

  if (forecast && riskRank(forecast.quotaRisk.level) >= riskRank("medium")) {
    issues.push(
      issue(
        combo,
        "forecast_quota_risk",
        forecast.quotaRisk.level === "critical" ? "critical" : "warning",
        "Forecast predicts quota pressure",
        "Rebalance targets or review quotas before the forecast horizon is reached.",
        {
          risk: forecast.quotaRisk.level,
          projectedWorstRemainingPct: forecast.quotaRisk.projectedWorstRemainingPct,
          timeToExhaustDays: forecast.quotaRisk.timeToExhaustDays,
        },
        includeActions,
        ["review_quota_limits", "open_combo_editor"]
      )
    );
  }

  if (forecast) {
    const hasDataQualityGap =
      forecast.confidence === "no_data" ||
      forecast.confidence === "low" ||
      forecast.dataQuality.pricingCoveragePct < 100 ||
      forecast.dataQuality.quotaCoverage === "none" ||
      forecast.dataQuality.quotaCoverage === "partial";

    if (hasDataQualityGap) {
      issues.push(
        issue(
          combo,
          "data_quality_gap",
          forecast.dataQuality.pricingCoveragePct < 80 ? "warning" : "info",
          "Forecast data quality is incomplete",
          "Add pricing/quota data or generate more traffic to improve autopilot confidence.",
          {
            confidence: forecast.confidence,
            pricingCoveragePct: forecast.dataQuality.pricingCoveragePct,
            quotaCoverage: forecast.dataQuality.quotaCoverage,
            notes: forecast.dataQuality.notes,
          },
          includeActions,
          ["review_pricing", "review_quota_limits"]
        )
      );
    }
  }

  return issues.sort((left, right) => severityRank(right.severity) - severityRank(left.severity));
}

function stateForIssues(issues: ComboAutopilotIssue[]): ComboAutopilotState {
  if (issues.some((entry) => entry.severity === "critical")) return "down";
  if (issues.some((entry) => entry.severity === "warning")) return "degraded";
  return "healthy";
}

function scoreForIssues(issues: ComboAutopilotIssue[]): number {
  const score = issues.reduce((current, entry) => {
    if (entry.severity === "critical") return current - 35;
    if (entry.severity === "warning") return current - 15;
    return current - 5;
  }, 100);
  return Math.max(0, Math.min(100, score));
}

function buildAutopilotCombo(
  combo: ComboHealthMetrics,
  forecast: ComboForecastMetrics | undefined,
  providerIssues: ProviderIssueView[],
  includeActions: boolean
): ComboAutopilotCombo {
  const issues = buildIssuesForCombo(combo, forecast, providerIssues, includeActions);
  const state = stateForIssues(issues);
  const providerIssueCount = issues.filter(
    (entry) => entry.kind === "provider_health_issue"
  ).length;

  return {
    comboId: combo.comboId,
    comboName: combo.comboName,
    strategy: combo.strategy,
    state,
    score: scoreForIssues(issues),
    signals: {
      totalRequests: combo.performance.totalRequests,
      successRate: combo.performance.successRate,
      avgLatencyMs: combo.performance.avgLatencyMs,
      worstQuotaRemainingPct:
        combo.quotaHealth.providers.length > 0 ? combo.quotaHealth.worstRemainingPct : null,
      forecastRisk: forecast?.quotaRisk.level ?? "unknown",
      forecastConfidence: forecast?.confidence ?? "no_data",
      usageSkew: combo.usageSkew.giniCoefficient,
      targetCount: combo.targetHealth?.length ?? 0,
      providerIssueCount,
      dataQualityNotes: forecast?.dataQuality.notes ?? [],
    },
    issues,
  };
}

export async function buildComboHealthAutopilotReport(
  options: ComboHealthAutopilotOptions
): Promise<ComboAutopilotReport> {
  const includeHealthy = options.includeHealthy === true;
  const includeActions = options.includeActions !== false;
  const checkedAt = new Date(options.now ?? Date.now()).toISOString();
  const combosSnapshot =
    options.combos ??
    (options.healthResponse && options.forecastResponse
      ? undefined
      : ((await getCombos()) as ComboRecord[]));

  const [health, forecast, providerHealth] = await Promise.all([
    options.healthResponse ??
      buildComboHealthResponse({
        range: options.range,
        comboId: options.comboId,
        now: options.now,
        combos: combosSnapshot,
      }),
    options.forecastResponse ??
      buildComboForecastResponse({
        range: options.range,
        horizon: options.horizon,
        comboId: options.comboId,
        now: options.now,
        combos: combosSnapshot,
      }),
    buildProviderHealthAutopilotReport({ includeHealthy: false, includeActions: false }),
  ]);

  const forecastsByComboId = new Map(forecast.combos.map((entry) => [entry.comboId, entry]));
  const providerIssues = buildProviderIssueIndex(
    providerHealth.providers.flatMap((provider) => provider.issues as ProviderIssueView[])
  );

  const allCombos = health.combos.map((combo) =>
    buildAutopilotCombo(
      combo,
      forecastsByComboId.get(combo.comboId),
      providerIssues,
      includeActions
    )
  );
  const combos = includeHealthy
    ? allCombos
    : allCombos.filter((combo) => combo.state !== "healthy");
  const downCount = allCombos.filter((combo) => combo.state === "down").length;
  const degradedCount = allCombos.filter((combo) => combo.state === "degraded").length;
  const healthyCount = allCombos.filter((combo) => combo.state === "healthy").length;
  const issueCount = allCombos.reduce((sum, combo) => sum + combo.issues.length, 0);
  const actionableCount = allCombos.reduce(
    (sum, combo) =>
      sum + combo.issues.reduce((issueSum, issue) => issueSum + issue.actions.length, 0),
    0
  );

  return {
    status: downCount > 0 ? "critical" : degradedCount > 0 ? "warning" : "healthy",
    checkedAt,
    timeRange: options.range,
    horizon: options.horizon,
    summary: {
      comboCount: allCombos.length,
      healthyCount,
      degradedCount,
      downCount,
      issueCount,
      actionableCount,
    },
    combos,
  };
}
