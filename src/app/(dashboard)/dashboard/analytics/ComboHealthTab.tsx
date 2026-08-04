"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useProviderNodeMap, resolveProviderName } from "@/lib/display/useProviderNodeMap";
import Card from "@/shared/components/Card";
import Badge from "@/shared/components/Badge";
import { Skeleton, Spinner } from "@/shared/components/Loading";
import TimeRangeSelector from "@/shared/components/analytics/TimeRangeSelector";
import type {
  ComboAutopilotCombo,
  ComboAutopilotIssue,
  ComboAutopilotReport,
  ComboForecastHorizon,
  ComboForecastMetrics,
  ComboForecastResponse,
  ComboHealthDashboardResponse,
  ComboHealthMetrics,
  ComboHealthResponse,
  ComboScoringInspectorCombo,
  ComboScoringInspectorResponse,
  UtilizationTimeRange,
} from "@/shared/types/utilization";
import { cn } from "@/shared/utils/cn";

function formatPercent(value: number, digits = 0) {
  return `${value.toFixed(digits)}%`;
}

function formatShare(value: number) {
  return formatPercent(value * 100, 1);
}

function formatPercentOrDash(value: number | null, digits = 1) {
  return typeof value === "number" ? formatPercent(value, digits) : "n/a";
}

function formatLatency(value: number) {
  return `${Math.round(value).toLocaleString()}ms`;
}

function formatUsd(value: number, digits = 2) {
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;
}

function formatCompactNumber(value: number) {
  return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function getRiskVariant(risk: ComboForecastMetrics["quotaRisk"]["level"]) {
  if (risk === "critical") return "error" as const;
  if (risk === "high" || risk === "medium") return "warning" as const;
  if (risk === "low") return "success" as const;
  return "default" as const;
}

function getAutopilotVariant(state: ComboAutopilotCombo["state"]) {
  if (state === "down") return "error" as const;
  if (state === "degraded") return "warning" as const;
  return "success" as const;
}

function getIssueVariant(severity: ComboAutopilotIssue["severity"]) {
  if (severity === "critical") return "error" as const;
  if (severity === "warning") return "warning" as const;
  return "info" as const;
}

function getTrendMeta(trend: ComboHealthMetrics["quotaHealth"]["providers"][number]["trend"]) {
  if (trend === "improving") {
    return {
      icon: "trending_up",
      variant: "success" as const,
    };
  }

  if (trend === "declining") {
    return {
      icon: "trending_down",
      variant: "warning" as const,
    };
  }

  return {
    icon: "trending_flat",
    variant: "default" as const,
  };
}

function MetricBlock({
  icon,
  label,
  value,
  subValue,
}: {
  icon: string;
  label: string;
  value: string;
  subValue?: string;
}) {
  return (
    <div className="rounded-lg border border-black/5 bg-black/2 p-4 dark:border-white/5 dark:bg-white/2">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
        <span className="material-symbols-outlined text-[16px]">{icon}</span>
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-text-main">{value}</div>
      {subValue ? <div className="mt-1 text-xs text-text-muted">{subValue}</div> : null}
    </div>
  );
}

function DistributionBar({ label, value, meta }: { label: string; value: number; meta: string }) {
  const width = `${Math.max(value * 100, value > 0 ? 6 : 0)}%`;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-black/5 bg-black/2 p-3 dark:border-white/5 dark:bg-white/2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="truncate font-medium text-text-main">{label}</span>
        <span className="shrink-0 text-xs text-text-muted">{meta}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width }} />
      </div>
    </div>
  );
}

function ComboForecastPanel({ forecast }: { forecast: ComboForecastMetrics }) {
  const t = useTranslations("analytics");
  const nodeMap = useProviderNodeMap();
  const topTargets = useMemo(
    () =>
      [...forecast.targets]
        .sort((left, right) => right.forecast.projectedCostUsd - left.forecast.projectedCostUsd)
        .slice(0, 3),
    [forecast.targets]
  );

  return (
    <div className="border-t border-black/5 px-6 py-5 dark:border-white/5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-sm font-semibold text-text-main">
            {t("comboHealthForecastTitle")}
          </div>
          <div className="mt-1 text-xs text-text-muted">{t("comboHealthForecastDescription")}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={getRiskVariant(forecast.quotaRisk.level)} size="sm">
            {t("comboHealthQuotaRisk", { level: forecast.quotaRisk.level })}
          </Badge>
          <Badge variant={forecast.confidence === "no_data" ? "default" : "info"} size="sm">
            {t("comboHealthConfidence", {
              level: forecast.confidence.replace("_", " "),
            })}
          </Badge>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <MetricBlock
          icon="payments"
          label={t("comboHealthProjectedCost")}
          value={formatUsd(forecast.forecast.projectedCostUsd)}
          subValue={t("comboHealthCostHistory", {
            total: formatUsd(forecast.history.costUsd),
            daily: formatUsd(forecast.history.avgDailyCostUsd),
          })}
        />
        <MetricBlock
          icon="query_stats"
          label={t("comboHealthProjectedRequests")}
          value={formatCompactNumber(forecast.forecast.projectedRequests)}
          subValue={t("comboHealthRequestsInRange", {
            count: formatCompactNumber(forecast.history.requests),
          })}
        />
        <MetricBlock
          icon="battery_alert"
          label={t("comboHealthWorstProjectedQuota")}
          value={
            forecast.quotaRisk.projectedWorstRemainingPct === null
              ? "n/a"
              : formatPercent(forecast.quotaRisk.projectedWorstRemainingPct, 1)
          }
          subValue={
            forecast.quotaRisk.timeToExhaustDays === null
              ? t("comboHealthNoDepletionEstimate")
              : t("comboHealthDaysToExhaust", {
                  days: forecast.quotaRisk.timeToExhaustDays.toFixed(1),
                })
          }
        />
      </div>

      {topTargets.length > 0 ? (
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {topTargets.map((target) => (
            <div
              key={target.executionKey}
              className="rounded-lg border border-black/5 bg-black/2 p-4 dark:border-white/5 dark:bg-white/2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-text-main">
                    {target.label || target.model}
                  </div>
                  <div className="mt-1 text-xs text-text-muted">
                    {resolveProviderName(target.provider, nodeMap)} · {t("comboHealthTraffic")}{" "}
                    {formatShare(target.trafficShare)}
                  </div>
                </div>
                <Badge variant={getRiskVariant(target.quota.risk)} size="sm">
                  {target.quota.risk}
                </Badge>
              </div>
              <div className="mt-3 grid gap-2 text-xs text-text-muted">
                <div className="flex justify-between gap-3">
                  <span>{t("comboHealthProjectedCost")}</span>
                  <span className="font-medium text-text-main">
                    {formatUsd(target.forecast.projectedCostUsd)}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>{t("comboHealthProjectedQuota")}</span>
                  <span className="font-medium text-text-main">
                    {target.quota.projectedRemainingPct === null
                      ? "n/a"
                      : formatPercent(target.quota.projectedRemainingPct, 1)}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span>{t("comboHealthPricingCoverage")}</span>
                  <span className="font-medium text-text-main">
                    {formatPercent(forecast.dataQuality.pricingCoveragePct, 0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {forecast.dataQuality.notes.length > 0 ? (
        <div className="mt-4 rounded-lg border border-black/5 bg-black/2 p-3 text-xs text-text-muted dark:border-white/5 dark:bg-white/2">
          {forecast.dataQuality.notes.slice(0, 2).join(" · ")}
        </div>
      ) : null}
    </div>
  );
}

function ComboAutopilotPanel({ report }: { report: ComboAutopilotReport }) {
  const t = useTranslations("analytics");
  const topIssues = useMemo(
    () =>
      report.combos.flatMap((combo) => combo.issues.map((issue) => ({ combo, issue }))).slice(0, 5),
    [report.combos]
  );

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-col gap-4 border-b border-black/5 px-6 py-5 dark:border-white/5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-text-main">
              {t("comboHealthAutopilotTitle")}
            </h3>
            <Badge
              variant={
                report.status === "critical"
                  ? "error"
                  : report.status === "warning"
                    ? "warning"
                    : "success"
              }
              size="sm"
            >
              {report.status}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-text-muted">{t("comboHealthAutopilotDescription")}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-90">
          <MetricBlock
            icon="monitor_heart"
            label={t("comboHealthIssues")}
            value={report.summary.issueCount.toLocaleString()}
            subValue={t("comboHealthActionable", { count: report.summary.actionableCount })}
          />
          <MetricBlock
            icon="error"
            label={t("comboHealthDown")}
            value={report.summary.downCount.toLocaleString()}
          />
          <MetricBlock
            icon="warning"
            label={t("comboHealthDegraded")}
            value={report.summary.degradedCount.toLocaleString()}
          />
          <MetricBlock
            icon="task_alt"
            label={t("comboHealthHealthy")}
            value={report.summary.healthyCount.toLocaleString()}
          />
        </div>
      </div>

      <div className="px-6 py-5">
        {topIssues.length > 0 ? (
          <div className="grid gap-3 lg:grid-cols-2">
            {topIssues.map(({ combo, issue }) => (
              <div
                key={issue.id}
                className="rounded-lg border border-black/5 bg-black/2 p-4 dark:border-white/5 dark:bg-white/2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-text-main">
                      {issue.title}
                    </div>
                    <div className="mt-1 text-xs text-text-muted">
                      {combo.comboName} · score {combo.score}
                    </div>
                  </div>
                  <Badge variant={getIssueVariant(issue.severity)} size="sm">
                    {issue.severity}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-text-muted">{issue.recommendation}</p>
                {issue.actions.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {issue.actions.slice(0, 3).map((action) =>
                      action.href ? (
                        <Link
                          key={`${issue.id}-${action.type}`}
                          href={action.href}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-black/5 px-3 py-1.5 text-xs font-medium text-text-main transition-colors hover:bg-black/5 dark:border-white/5 dark:hover:bg-white/5"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            arrow_forward
                          </span>
                          {action.label}
                        </Link>
                      ) : null
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4 text-sm text-green-700 dark:text-green-300">
            {t("comboHealthNoActiveIssues")}
          </div>
        )}
      </div>
    </Card>
  );
}

function ComboScoringInspectorPanel({ inspector }: { inspector: ComboScoringInspectorCombo }) {
  const t = useTranslations("analytics");
  const nodeMap = useProviderNodeMap();
  const topTargets = inspector.targets.slice(0, 3);

  return (
    <div className="border-t border-black/5 px-6 py-5 dark:border-white/5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-sm font-semibold text-text-main">
              {t("comboHealthScoringInspector")}
            </div>
            <Badge variant="info" size="sm">
              {t("comboHealthReadOnlyRecompute")}
            </Badge>
          </div>
          <div className="mt-1 text-xs text-text-muted">{t("comboHealthScoringDescription")}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary" size="sm">
            {t("comboHealthTask", { task: inspector.taskType })}
          </Badge>
          {inspector.selectedExecutionKey ? (
            <Badge variant="success" size="sm">
              {t("comboHealthSelectedRank")}
            </Badge>
          ) : null}
        </div>
      </div>

      {inspector.warnings.length > 0 ? (
        <div className="mt-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 text-xs text-yellow-700 dark:text-yellow-300">
          {inspector.warnings.slice(0, 2).join(" · ")}
        </div>
      ) : null}

      {topTargets.length > 0 ? (
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {topTargets.map((target) => {
            const topFactors = target.factors.slice(0, 4);
            return (
              <div
                key={target.executionKey}
                className="rounded-lg border border-black/5 bg-black/2 p-4 dark:border-white/5 dark:bg-white/2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-text-main">
                      #{target.rank} {target.label || target.model}
                    </div>
                    <div className="mt-1 text-xs text-text-muted">
                      {resolveProviderName(target.provider, nodeMap)} · score{" "}
                      {target.score.toFixed(3)}
                    </div>
                  </div>
                  <Badge variant={target.rank === 1 ? "success" : "default"} size="sm">
                    {target.rank === 1 ? "top" : `#${target.rank}`}
                  </Badge>
                </div>

                <div className="mt-3 grid gap-2">
                  {topFactors.map((factor) => (
                    <div key={factor.key} className="text-xs">
                      <div className="flex items-center justify-between gap-3 text-text-muted">
                        <span>{t(`comboHealthFactor.${factor.key}`)}</span>
                        <span className="font-medium text-text-main">
                          +{factor.contribution.toFixed(3)}
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${Math.max(0, Math.min(100, factor.value * 100))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-text-muted">
                  <span>
                    {t("comboHealthQuotaValue", {
                      value: formatPercentOrDash(target.signals.quotaRemainingPct),
                    })}
                  </span>
                  <span>
                    {t("comboHealthLatencyValue", {
                      value: target.signals.avgLatencyMs ?? "n/a",
                    })}
                  </span>
                  <span>
                    {t("comboHealthIssueCount", {
                      count: target.signals.autopilotIssueCount,
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-black/5 bg-black/2 p-4 text-sm text-text-muted dark:border-white/5 dark:bg-white/2">
          {t("comboHealthNoInspectableTargets")}
        </div>
      )}
    </div>
  );
}

function ComboHealthCard({
  combo,
  forecast,
  autopilot,
  scoringInspector,
}: {
  combo: ComboHealthMetrics;
  forecast?: ComboForecastMetrics;
  autopilot?: ComboAutopilotCombo;
  scoringInspector?: ComboScoringInspectorCombo;
}) {
  const t = useTranslations("analytics");
  const nodeMap = useProviderNodeMap();

  const sortedDistribution = useMemo(
    () =>
      [...combo.usageSkew.modelDistribution].sort(
        (left, right) => right.requestShare - left.requestShare
      ),
    [combo.usageSkew.modelDistribution]
  );
  const targetHealth = combo.targetHealth || [];

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-black/5 px-6 py-5 dark:border-white/5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-text-main">{combo.comboName}</h3>
              <Badge variant="primary" size="sm">
                {combo.strategy}
              </Badge>
              {autopilot ? (
                <Badge variant={getAutopilotVariant(autopilot.state)} size="sm">
                  {t(`comboHealthAutopilotState.${autopilot.state}`)} · {autopilot.score}
                </Badge>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-text-muted">
              {t("comboHealthModelProviderCount", {
                models: combo.models.length,
                providers: combo.quotaHealth.providers.length,
              })}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-105">
            <MetricBlock
              icon="battery_status_good"
              label={t("comboHealthWorstQuotaLeft")}
              value={formatPercent(combo.quotaHealth.worstRemainingPct)}
            />
            <MetricBlock
              icon="balance"
              label={t("comboHealthUsageSkew")}
              value={combo.usageSkew.giniCoefficient.toFixed(2)}
              subValue={t("comboHealthGiniCoefficient")}
            />
            <MetricBlock
              icon="bolt"
              label={t("comboHealthSuccessRate")}
              value={formatPercent(combo.performance.successRate * 100, 1)}
              subValue={t("comboHealthRequestCount", {
                count: combo.performance.totalRequests.toLocaleString(),
              })}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-6 py-5 xl:grid-cols-[1.1fr_1fr_0.95fr]">
        <section className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-semibold text-text-main">
              {t("comboHealthQuotaHealth")}
            </div>
            <div className="mt-1 text-xs text-text-muted">
              {t("comboHealthQuotaHealthDescription")}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {combo.quotaHealth.providers.map((provider) => {
              const trendMeta = getTrendMeta(provider.trend);
              const width = `${Math.max(provider.remainingPct, provider.remainingPct > 0 ? 6 : 0)}%`;

              return (
                <div
                  key={provider.provider}
                  className="rounded-lg border border-black/5 bg-black/2 p-4 dark:border-white/5 dark:bg-white/2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-text-main">
                        {resolveProviderName(provider.provider, nodeMap)}
                      </div>
                      <div className="mt-1 text-xs text-text-muted">
                        {t("comboHealthRemainingQuota", {
                          value: formatPercent(provider.remainingPct, 1),
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={trendMeta.variant} size="sm" icon={trendMeta.icon}>
                        {t(`comboHealthTrend.${provider.trend}`)}
                      </Badge>
                      {provider.isExhausted ? (
                        <Badge variant="error" size="sm">
                          {t("statusExhausted")}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-semibold text-text-main">{t("comboHealthUsageSkew")}</div>
            <div className="mt-1 text-xs text-text-muted">
              {t("comboHealthUsageSkewDescription")}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {sortedDistribution.map((entry) => (
              <div
                key={entry.model}
                className="rounded-lg border border-black/5 bg-black/2 p-4 dark:border-white/5 dark:bg-white/2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-text-main">{entry.model}</div>
                    <div className="mt-1 text-xs text-text-muted">
                      {t("comboHealthShareSummary", {
                        requests: formatShare(entry.requestShare),
                        tokens: formatShare(entry.tokenShare),
                      })}
                    </div>
                  </div>
                  <Badge size="sm">{formatShare(entry.requestShare)}</Badge>
                </div>

                <div className="mt-3 grid gap-2">
                  <DistributionBar
                    label={t("comboHealthRequests")}
                    value={entry.requestShare}
                    meta={formatShare(entry.requestShare)}
                  />
                  <DistributionBar
                    label={t("comboHealthTokens")}
                    value={entry.tokenShare}
                    meta={formatShare(entry.tokenShare)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div>
            <div className="text-sm font-semibold text-text-main">
              {t("comboHealthPerformance")}
            </div>
            <div className="mt-1 text-xs text-text-muted">
              {t("comboHealthPerformanceDescription")}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <MetricBlock
              icon="timer"
              label={t("comboHealthAvgLatency")}
              value={formatLatency(combo.performance.avgLatencyMs)}
            />
            <MetricBlock
              icon="task_alt"
              label={t("comboHealthSuccessRate")}
              value={formatPercent(combo.performance.successRate * 100, 1)}
            />
            <MetricBlock
              icon="stacked_line_chart"
              label={t("comboHealthTotalRequests")}
              value={combo.performance.totalRequests.toLocaleString()}
            />
          </div>
        </section>
      </div>

      {targetHealth.length > 0 ? (
        <div className="border-t border-black/5 px-6 py-5 dark:border-white/5">
          <div>
            <div className="text-sm font-semibold text-text-main">
              {t("comboHealthExecutionTargets")}
            </div>
            <div className="mt-1 text-xs text-text-muted">
              {t("comboHealthExecutionTargetsDescription")}
            </div>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {targetHealth.map((target) => (
              <div
                key={target.executionKey}
                className="rounded-lg border border-black/5 bg-black/2 p-4 dark:border-white/5 dark:bg-white/2"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-text-main">
                      {target.label || target.model}
                    </div>
                    <div className="mt-1 text-xs text-text-muted">
                      {target.provider}
                      {target.connectionId ? ` · ${target.connectionId.slice(0, 8)}` : ""}
                    </div>
                    <div className="mt-1 text-[11px] text-text-muted">{target.stepId}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {target.lastStatus ? (
                      <Badge size="sm" variant={target.lastStatus === "ok" ? "success" : "error"}>
                        {target.lastStatus}
                      </Badge>
                    ) : null}
                    <Badge size="sm" variant="default">
                      {t("comboHealthRequestShort", { count: target.requests })}
                    </Badge>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  <DistributionBar
                    label={t("comboHealthSuccess")}
                    value={Math.max(target.successRate, 0) / 100}
                    meta={formatPercent(target.successRate, 0)}
                  />
                  <DistributionBar
                    label={t("comboHealthLatency")}
                    value={target.avgLatencyMs > 0 ? 1 : 0}
                    meta={formatLatency(target.avgLatencyMs)}
                  />
                  <DistributionBar
                    label={t("comboHealthQuota")}
                    value={Math.max(target.quotaRemainingPct || 0, 0) / 100}
                    meta={formatPercentOrDash(target.quotaRemainingPct)}
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-text-muted">
                  <span>{t("comboHealthQuotaScope", { scope: target.quotaScope })}</span>
                  {target.quotaTrend ? (
                    <span>{t("comboHealthTrendValue", { trend: target.quotaTrend })}</span>
                  ) : null}
                  {target.quotaIsExhausted ? <span>{t("statusExhausted")}</span> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {scoringInspector ? <ComboScoringInspectorPanel inspector={scoringInspector} /> : null}

      {forecast ? <ComboForecastPanel forecast={forecast} /> : null}
    </Card>
  );
}

function ComboHealthSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[0, 1].map((index) => (
        <Card key={index} className="p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-52" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:min-w-105">
                {[0, 1, 2].map((item) => (
                  <Skeleton key={item} className="h-24 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="grid gap-4 xl:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div key={item} className="space-y-3">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-24 rounded-lg" />
                  <Skeleton className="h-24 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function ComboHealthTab() {
  const t = useTranslations("analytics");
  const [range, setRange] = useState<UtilizationTimeRange>("24h");
  const [horizon, setHorizon] = useState<ComboForecastHorizon>("30d");
  const [data, setData] = useState<ComboHealthResponse | null>(null);
  const [forecastData, setForecastData] = useState<ComboForecastResponse | null>(null);
  const [autopilotData, setAutopilotData] = useState<ComboAutopilotReport | null>(null);
  const [scoringData, setScoringData] = useState<ComboScoringInspectorResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forecastError, setForecastError] = useState<string | null>(null);
  const [autopilotError, setAutopilotError] = useState<string | null>(null);
  const [scoringError, setScoringError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  const fetchData = useCallback(
    async (controller: AbortController, isRetry = false) => {
      if (isRetry) {
        setRetrying(true);
      } else {
        setLoading(true);
      }
      setError(null);
      setForecastError(null);
      setAutopilotError(null);
      setScoringError(null);

      try {
        const response = await fetch(
          `/api/usage/combo-health-dashboard?range=${range}&horizon=${horizon}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(t("comboHealthFetchFailed"));
        }

        const result = (await response.json()) as ComboHealthDashboardResponse;
        setData(result.health);
        setError(null);
        setForecastData(result.forecast);
        setAutopilotData(result.autopilot);
        setScoringData(result.scoring);
        setForecastError(result.errors.forecast ?? null);
        setAutopilotError(result.errors.autopilot ?? null);
        setScoringError(result.errors.scoring ?? null);
      } catch (fetchError) {
        if ((fetchError as Error).name === "AbortError") {
          return;
        }
        setError(fetchError instanceof Error ? fetchError.message : t("unknownError"));
        if (!isRetry) setData(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          if (isRetry) setRetrying(false);
        }
      }
    },
    [range, horizon, t]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller, false);
    return () => controller.abort();
  }, [fetchData]);

  const combos = data?.combos ?? [];
  const forecastsByComboId = useMemo(
    () => new Map((forecastData?.combos ?? []).map((forecast) => [forecast.comboId, forecast])),
    [forecastData]
  );
  const autopilotByComboId = useMemo(
    () => new Map((autopilotData?.combos ?? []).map((combo) => [combo.comboId, combo])),
    [autopilotData]
  );
  const scoringByComboId = useMemo(
    () => new Map((scoringData?.combos ?? []).map((combo) => [combo.comboId, combo])),
    [scoringData]
  );

  const handleRetry = useCallback(() => {
    const controller = new AbortController();
    fetchData(controller, true);
  }, [fetchData]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl border border-black/5 bg-surface p-5 shadow-sm dark:border-white/5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-main">{t("comboHealthTitle")}</h2>
          <p className="mt-1 text-sm text-text-muted">{t("comboHealthIntro")}</p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <TimeRangeSelector value={range} onChange={setRange} />
          <div className="flex items-center gap-1 rounded-lg border border-black/5 bg-black/2 p-1 dark:border-white/5 dark:bg-white/2">
            {(["24h", "7d", "30d"] as ComboForecastHorizon[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setHorizon(value)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                  horizon === value
                    ? "bg-primary text-white"
                    : "text-text-muted hover:bg-black/5 hover:text-text-main dark:hover:bg-white/5"
                )}
              >
                {t("comboHealthForecastHorizon", { value })}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!loading && forecastError ? (
        <Card className="border-yellow-500/20 bg-yellow-500/5 p-4">
          <div className="flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-300">
            <span className="material-symbols-outlined text-[18px]">warning</span>
            {forecastError}
          </div>
        </Card>
      ) : null}

      {!loading && autopilotError ? (
        <Card className="border-yellow-500/20 bg-yellow-500/5 p-4">
          <div className="flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-300">
            <span className="material-symbols-outlined text-[18px]">warning</span>
            {autopilotError}
          </div>
        </Card>
      ) : null}

      {!loading && scoringError ? (
        <Card className="border-yellow-500/20 bg-yellow-500/5 p-4">
          <div className="flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-300">
            <span className="material-symbols-outlined text-[18px]">warning</span>
            {scoringError}
          </div>
        </Card>
      ) : null}

      {loading ? <ComboHealthSkeleton /> : null}

      {!loading && error ? (
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="material-symbols-outlined text-[40px] text-error">sync_problem</span>
            <div className="flex flex-col gap-1">
              <div className="font-medium text-text-main">{t("comboHealthUnableToLoad")}</div>
              <div className="text-sm text-text-muted">{error}</div>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              disabled={retrying}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {retrying ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">
                    progress_activity
                  </span>
                  {t("retrying")}
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  {t("retry")}
                </>
              )}
            </button>
          </div>
        </Card>
      ) : null}

      {!loading && !error && combos.length === 0 ? (
        <Card className="p-10">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="material-symbols-outlined text-[40px] text-text-muted/70">
              monitor_heart
            </span>
            <div className="text-base font-medium text-text-main">{t("comboHealthNoData")}</div>
            <div className="max-w-md text-sm text-text-muted">
              {t("comboHealthNoDataDescription")}
            </div>
            <div className="rounded-lg border border-black/5 bg-black/[0.02] p-4 dark:border-white/5 dark:bg-white/[0.02]">
              <p className="text-xs font-medium text-text-main">{t("comboHealthGettingStarted")}</p>
              <ul className="mt-2 text-left text-xs text-text-muted">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    check_circle
                  </span>
                  <span>
                    {t.rich("comboHealthStepCreate", {
                      strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                  </span>
                </li>
                <li className="mt-1 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    check_circle
                  </span>
                  <span>{t("comboHealthStepSend")}</span>
                </li>
                <li className="mt-1 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    check_circle
                  </span>
                  <span>{t("comboHealthStepAutomatic")}</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      ) : null}

      {!loading && !error && combos.length > 0 ? (
        <div className="flex flex-col gap-4">
          {autopilotData ? <ComboAutopilotPanel report={autopilotData} /> : null}
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Spinner
              size="sm"
              className={cn("text-primary", "[&_.material-symbols-outlined]:text-[16px]")}
            />
            {t("comboHealthTracking", { count: combos.length, range })}
          </div>
          {combos.map((combo) => (
            <ComboHealthCard
              key={combo.comboId}
              combo={combo}
              forecast={forecastsByComboId.get(combo.comboId)}
              autopilot={autopilotByComboId.get(combo.comboId)}
              scoringInspector={scoringByComboId.get(combo.comboId)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
