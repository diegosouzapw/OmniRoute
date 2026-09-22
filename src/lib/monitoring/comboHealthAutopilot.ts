import { getCombos } from "@/lib/db/combos";
import {
  buildProviderHealthAutopilotReport,
  type ProviderAutopilotReport,
} from "@/lib/monitoring/providerHealthAutopilot";
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
  providerHealthResponse?: ProviderAutopilotReport;
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
  providerAffectedConnectionIds?: string[];
};

type TargetEligibilityView = NonNullable<ComboHealthMetrics["targetHealth"]>[number] & {
  eligibleConnectionIds?: string[] | null;
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
        return action(
          type,
          "Run combo test",
          target,
          `/dashboard/combos?test=${encodeURIComponent(target.comboId)}`
        );
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

function buildProviderIssueIndex(report: ProviderAutopilotReport): ProviderIssueView[] {
  return report.providers.flatMap((provider) => {
    const affectedConnectionIds = Array.from(
      new Set(
        provider.issues.flatMap((entry) => {
          const connectionId = entry.target.connectionId;
          return connectionId && entry.severity !== "info" ? [connectionId] : [];
        })
      )
    );

    return (provider.issues as ProviderIssueView[])
      .filter((entry) => Boolean(entry.target?.provider))
      .map((entry) => ({
        ...entry,
        providerAffectedConnectionIds: affectedConnectionIds,
      }));
  });
}

function hasForecastDataQualityGap(forecast: ComboForecastMetrics): boolean {
  return (
    forecast.confidence === "no_data" ||
    forecast.confidence === "low" ||
    forecast.dataQuality.pricingCoveragePct < 100 ||
    forecast.dataQuality.quotaCoverage === "none" ||
    forecast.dataQuality.quotaCoverage === "partial"
  );
}

function buildQuotaMonitorConnectionIndex(
  report: ProviderAutopilotReport
): Map<string, Set<string>> {
  const monitoredByProvider = new Map<string, Set<string>>();
  for (const provider of report.providers) {
    const quotaMonitor = provider.signals.quotaMonitor;
    if (!quotaMonitor || typeof quotaMonitor !== "object" || Array.isArray(quotaMonitor)) continue;
    const connectionIds = (quotaMonitor as JsonRecord).monitoredConnectionIds;
    if (!Array.isArray(connectionIds)) continue;
    const normalized = connectionIds.filter(
      (connectionId): connectionId is string =>
        typeof connectionId === "string" && connectionId.trim().length > 0
    );
    if (normalized.length > 0) monitoredByProvider.set(provider.provider, new Set(normalized));
  }
  return monitoredByProvider;
}

type HealthTarget = NonNullable<ComboHealthMetrics["targetHealth"]>[number];

function optionalIssue(
  condition: boolean,
  value: () => ComboAutopilotIssue
): ComboAutopilotIssue[] {
  return condition ? [value()] : [];
}

function buildComboLevelIssues(
  combo: ComboHealthMetrics,
  includeActions: boolean
): ComboAutopilotIssue[] {
  return [
    ...optionalIssue((combo.targetHealth ?? []).length === 0, () =>
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
    ),
    ...optionalIssue(combo.performance.totalRequests === 0, () =>
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
    ),
    ...optionalIssue(
      combo.performance.totalRequests >= 5 && combo.performance.successRate < 0.9,
      () =>
        issue(
          combo,
          "combo_low_success_rate",
          combo.performance.successRate < 0.7 ? "critical" : "warning",
          "Combo success rate is below target",
          "Inspect failing targets and test fallback order before increasing traffic.",
          {
            successRate: combo.performance.successRate,
            totalRequests: combo.performance.totalRequests,
          },
          includeActions,
          ["run_combo_test", "open_combo_editor"]
        )
    ),
    ...optionalIssue(
      combo.usageSkew.giniCoefficient >= 0.65 && combo.performance.totalRequests > 0,
      () =>
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
    ),
  ];
}

function buildTargetStatusIssues(
  combo: ComboHealthMetrics,
  target: HealthTarget,
  includeActions: boolean
): ComboAutopilotIssue[] {
  const issues: ComboAutopilotIssue[] = [];
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
  return issues;
}

function hasUnpinnedFallback(target: HealthTarget, providerIssue: ProviderIssueView): boolean {
  const eligible = (target as TargetEligibilityView).eligibleConnectionIds;
  const issueConnectionId = providerIssue.target?.connectionId;
  const affected = new Set(providerIssue.providerAffectedConnectionIds ?? []);
  return Boolean(
    !target.connectionId &&
    issueConnectionId &&
    Array.isArray(eligible) &&
    eligible.length > 0 &&
    (!eligible.includes(issueConnectionId) || eligible.some((id) => !affected.has(id)))
  );
}

function buildProviderIssuesForTarget(
  combo: ComboHealthMetrics,
  target: HealthTarget,
  providerIssues: ProviderIssueView[],
  includeActions: boolean
): ComboAutopilotIssue[] {
  return providerIssues
    .filter((entry) => providerIssueMatchesTarget(entry, target))
    .map((entry) => {
      const eligibleConnectionIds = (target as TargetEligibilityView).eligibleConnectionIds;
      const hasUnpinnedFallbackCapacity = hasUnpinnedFallback(target, entry);
      return issue(
        combo,
        "provider_health_issue",
        hasUnpinnedFallbackCapacity ? "info" : (entry.severity ?? "warning"),
        entry.title ?? "Provider health issue affects combo target",
        entry.recommendation ?? "Review provider health autopilot details.",
        {
          ...providerIssueEvidence(entry),
          hasUnpinnedFallbackCapacity,
          eligibilityProven: Array.isArray(eligibleConnectionIds),
          eligibleConnectionIds: eligibleConnectionIds ?? null,
        },
        includeActions,
        ["open_provider_health_autopilot", "open_combo_editor"],
        target
      );
    });
}

function getForecastQuotaContext(
  forecast: ComboForecastMetrics,
  targets: HealthTarget[],
  monitorIndex: Map<string, Set<string>>
) {
  const worstTarget = forecast.targets.find(
    (target) => target.executionKey === forecast.quotaRisk.worstTargetExecutionKey
  );
  const healthTarget = worstTarget
    ? targets.find((target) => target.executionKey === worstTarget.executionKey)
    : undefined;
  const eligible = healthTarget
    ? (healthTarget as TargetEligibilityView).eligibleConnectionIds
    : undefined;
  const relevantConnectionIds = worstTarget?.connectionId
    ? [worstTarget.connectionId]
    : Array.isArray(eligible)
      ? eligible
      : null;
  const monitoredConnectionIds = worstTarget ? monitorIndex.get(worstTarget.provider) : undefined;
  const hasQuotaMonitorCoverage = Boolean(
    relevantConnectionIds?.length &&
    monitoredConnectionIds &&
    relevantConnectionIds.every((id) => monitoredConnectionIds.has(id))
  );
  return { worstTarget, relevantConnectionIds, monitoredConnectionIds, hasQuotaMonitorCoverage };
}

function buildForecastQuotaIssue(
  combo: ComboHealthMetrics,
  forecast: ComboForecastMetrics | undefined,
  monitorIndex: Map<string, Set<string>>,
  includeActions: boolean
): ComboAutopilotIssue[] {
  if (!forecast || riskRank(forecast.quotaRisk.level) < riskRank("medium")) return [];
  const context = getForecastQuotaContext(forecast, combo.targetHealth ?? [], monitorIndex);
  const diagnosticOnly =
    !context.hasQuotaMonitorCoverage ||
    ["no_data", "low"].includes(forecast.confidence) ||
    forecast.dataQuality.quotaCoverage === "none";
  return [
    issue(
      combo,
      "forecast_quota_risk",
      diagnosticOnly ? "info" : forecast.quotaRisk.level === "critical" ? "critical" : "warning",
      "Forecast predicts quota pressure",
      "Rebalance targets or review quotas before the forecast horizon is reached.",
      {
        risk: forecast.quotaRisk.level,
        projectedWorstRemainingPct: forecast.quotaRisk.projectedWorstRemainingPct,
        timeToExhaustDays: forecast.quotaRisk.timeToExhaustDays,
        confidence: forecast.confidence,
        quotaCoverage: forecast.dataQuality.quotaCoverage,
        worstTargetExecutionKey: forecast.quotaRisk.worstTargetExecutionKey,
        worstTargetProvider: context.worstTarget?.provider ?? null,
        worstTargetRelevantConnectionIds: context.relevantConnectionIds,
        monitoredConnectionIds: context.monitoredConnectionIds
          ? Array.from(context.monitoredConnectionIds).sort()
          : [],
        quotaMonitorCoverageAmbiguous:
          !context.worstTarget ||
          !context.relevantConnectionIds ||
          context.relevantConnectionIds.length === 0,
        hasDataQualityGap: hasForecastDataQualityGap(forecast),
        hasQuotaMonitorCoverage: context.hasQuotaMonitorCoverage,
        diagnosticOnly,
      },
      includeActions,
      ["review_quota_limits", "open_combo_editor"]
    ),
  ];
}

function buildDataQualityIssue(
  combo: ComboHealthMetrics,
  forecast: ComboForecastMetrics | undefined,
  includeActions: boolean
): ComboAutopilotIssue[] {
  if (!forecast || !hasForecastDataQualityGap(forecast)) return [];
  const hasEnoughTraffic =
    forecast.history.requests > 0 && !["no_data", "low"].includes(forecast.confidence);
  return [
    issue(
      combo,
      "data_quality_gap",
      hasEnoughTraffic && forecast.dataQuality.pricingCoveragePct < 80 ? "warning" : "info",
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
    ),
  ];
}

function buildIssuesForCombo(
  combo: ComboHealthMetrics,
  forecast: ComboForecastMetrics | undefined,
  providerIssues: ProviderIssueView[],
  quotaMonitorConnectionsByProvider: Map<string, Set<string>>,
  includeActions: boolean
): ComboAutopilotIssue[] {
  const targetIssues = (combo.targetHealth ?? []).flatMap((target) => [
    ...buildTargetStatusIssues(combo, target, includeActions),
    ...buildProviderIssuesForTarget(combo, target, providerIssues, includeActions),
  ]);
  const issues = [
    ...buildComboLevelIssues(combo, includeActions),
    ...targetIssues,
    ...buildForecastQuotaIssue(combo, forecast, quotaMonitorConnectionsByProvider, includeActions),
    ...buildDataQualityIssue(combo, forecast, includeActions),
  ];
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
  quotaMonitorConnectionsByProvider: Map<string, Set<string>>,
  includeActions: boolean
): ComboAutopilotCombo {
  const issues = buildIssuesForCombo(
    combo,
    forecast,
    providerIssues,
    quotaMonitorConnectionsByProvider,
    includeActions
  );
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
    options.providerHealthResponse ??
      buildProviderHealthAutopilotReport({ includeHealthy: true, includeActions: false }),
  ]);
  const forecastsByComboId = new Map(forecast.combos.map((entry) => [entry.comboId, entry]));
  const providerIssues = buildProviderIssueIndex(providerHealth);
  const quotaMonitorConnectionsByProvider = buildQuotaMonitorConnectionIndex(providerHealth);
  const active = buildActiveComboIndex(combosSnapshot);
  const allCombos = health.combos
    .filter((combo) => isActiveCombo(combo, active))
    .map((combo) =>
      buildAutopilotCombo(
        combo,
        forecastsByComboId.get(combo.comboId),
        providerIssues,
        quotaMonitorConnectionsByProvider,
        includeActions
      )
    );
  const combos = includeHealthy
    ? allCombos
    : allCombos.filter((combo) => combo.state !== "healthy");
  const summary = summarizeAutopilotCombos(allCombos);

  return {
    status: summary.downCount > 0 ? "critical" : summary.degradedCount > 0 ? "warning" : "healthy",
    checkedAt,
    timeRange: options.range,
    horizon: options.horizon,
    summary,
    combos,
  };
}

type ActiveComboIndex = { ids: Set<string>; names: Set<string> } | null;

function buildActiveComboIndex(combos: ComboRecord[] | undefined): ActiveComboIndex {
  if (!combos) return null;
  const activeCombos = combos.filter((combo) => (combo as JsonRecord).isActive !== false);
  return {
    ids: new Set(activeCombos.flatMap((combo) => (typeof combo.id === "string" ? [combo.id] : []))),
    names: new Set(
      activeCombos.flatMap((combo) => (typeof combo.name === "string" ? [combo.name] : []))
    ),
  };
}

function isActiveCombo(combo: ComboHealthMetrics, active: ActiveComboIndex): boolean {
  return !active || active.ids.has(combo.comboId) || active.names.has(combo.comboName);
}

function summarizeAutopilotCombos(allCombos: ComboAutopilotCombo[]) {
  const downCount = allCombos.filter((combo) => combo.state === "down").length;
  const degradedCount = allCombos.filter((combo) => combo.state === "degraded").length;
  const healthyCount = allCombos.filter((combo) => combo.state === "healthy").length;
  const issueCount = allCombos.reduce((sum, combo) => sum + combo.issues.length, 0);
  const suggestionCount = allCombos.reduce(
    (sum, combo) =>
      sum + combo.issues.reduce((issueSum, issue) => issueSum + issue.actions.length, 0),
    0
  );
  return {
    comboCount: allCombos.length,
    healthyCount,
    degradedCount,
    downCount,
    issueCount,
    suggestionCount,
    actionableCount: suggestionCount,
  };
}
