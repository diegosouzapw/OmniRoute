"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card, EmptyState, SegmentedControl, CardSkeleton } from "@/shared/components";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

type CostRange = "7d" | "30d" | "90d" | "all";

interface UsageAnalyticsSummary {
  totalCost: number;
  totalRequests: number;
  uniqueModels: number;
  uniqueAccounts: number;
  uniqueApiKeys: number;
  totalTokens: number;
  promptTokens: number;
  completionTokens: number;
  fallbackCount: number;
  fallbackRatePct: number;
  requestedModelCoveragePct: number;
  streak: number;
}

interface UsageAnalyticsProviderRow {
  provider: string;
  requests: number;
  totalTokens: number;
  cost: number;
}

interface UsageAnalyticsModelRow {
  model: string;
  requests: number;
  totalTokens: number;
  cost: number;
}

interface UsageAnalyticsTrendRow {
  date: string;
  cost: number;
}

interface UsageAnalyticsApiKeyRow {
  apiKey: string;
  apiKeyId: string | null;
  apiKeyName: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cost: number;
}

interface UsageAnalyticsAccountRow {
  account: string;
  totalTokens: number;
  requests: number;
  cost: number;
}

interface UsageAnalyticsPayload {
  summary: UsageAnalyticsSummary;
  byProvider: UsageAnalyticsProviderRow[];
  byModel: UsageAnalyticsModelRow[];
  byApiKey: UsageAnalyticsApiKeyRow[];
  byAccount: UsageAnalyticsAccountRow[];
  dailyTrend: UsageAnalyticsTrendRow[];
  weeklyPattern: Array<{ day: string; avgTokens: number; totalTokens: number }>;
  activityMap: Record<string, number>;
  presetSummaries?: Record<string, { totalCost: number }>;
}

const RANGE_OPTIONS: Array<{ value: CostRange; labelKey: string }> = [
  { value: "7d", labelKey: "range7d" },
  { value: "30d", labelKey: "range30d" },
  { value: "90d", labelKey: "range90d" },
  { value: "all", labelKey: "rangeAll" },
];

const CHART_COLORS = [
  "#10b981",
  "#06b6d4",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#14b8a6",
  "#6366f1",
  "#ec4899",
];

function createCurrencyFormatter(locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function csvCell(value: string | number): string {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function generateCSV(analytics: UsageAnalyticsPayload, locale: string): string {
  const currencyFormatter = createCurrencyFormatter(locale);
  const lines: string[] = [];

  lines.push("# OmniRoute Cost Report");
  lines.push(`# Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("Metric,Value");
  lines.push(`Total Cost,${csvCell(currencyFormatter.format(analytics.summary.totalCost))}`);
  lines.push(`Total Requests,${analytics.summary.totalRequests}`);
  lines.push(`Unique Models,${analytics.summary.uniqueModels}`);
  lines.push(`Unique Accounts,${analytics.summary.uniqueAccounts}`);
  lines.push(`Total Tokens,${analytics.summary.totalTokens}`);
  lines.push("");

  lines.push("## Daily Cost Trend");
  lines.push("Date,Cost (USD)");
  for (const row of analytics.dailyTrend) {
    lines.push(`${csvCell(row.date)},${row.cost.toFixed(6)}`);
  }
  lines.push("");

  lines.push("## Cost by Provider");
  lines.push("Provider,Requests,Total Tokens,Cost (USD)");
  for (const row of analytics.byProvider) {
    lines.push(
      [row.provider, row.requests, row.totalTokens, row.cost.toFixed(6)].map(csvCell).join(",")
    );
  }
  lines.push("");

  lines.push("## Cost by Model");
  lines.push("Model,Requests,Total Tokens,Cost (USD)");
  for (const row of analytics.byModel) {
    lines.push(
      [row.model, row.requests, row.totalTokens, row.cost.toFixed(6)].map(csvCell).join(",")
    );
  }
  lines.push("");

  lines.push("## Cost by API Key");
  lines.push("API Key,Requests,Total Tokens,Cost (USD)");
  for (const row of analytics.byApiKey || []) {
    lines.push(
      [row.apiKeyName || row.apiKey, row.requests, row.totalTokens, row.cost.toFixed(6)]
        .map(csvCell)
        .join(",")
    );
  }
  lines.push("");

  lines.push("## Cost by Account");
  lines.push("Account,Requests,Total Tokens,Cost (USD)");
  for (const row of analytics.byAccount || []) {
    lines.push(
      [row.account, row.requests, row.totalTokens, row.cost.toFixed(6)].map(csvCell).join(",")
    );
  }

  return lines.join("\n");
}

function generateJSON(analytics: UsageAnalyticsPayload): string {
  return JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      summary: analytics.summary,
      dailyTrend: analytics.dailyTrend,
      weeklyPattern: analytics.weeklyPattern,
      activityMap: analytics.activityMap,
      byProvider: analytics.byProvider,
      byModel: analytics.byModel,
      byApiKey: analytics.byApiKey || [],
      byAccount: analytics.byAccount || [],
    },
    null,
    2
  );
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function CostOverviewTab() {
  const t = useTranslations("costs");
  const locale = useLocale();
  const currencyFormatter = useMemo(() => createCurrencyFormatter(locale), [locale]);
  const [range, setRange] = useState<CostRange>("30d");
  const [analytics, setAnalytics] = useState<UsageAnalyticsPayload | null>(null);
  const [presetCosts, setPresetCosts] = useState<Record<"1d" | "7d" | "30d", number>>({
    "1d": 0,
    "7d": 0,
    "30d": 0,
  });
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadRange() {
      try {
        setLoading(true);
        setSummaryLoading(true);
        const response = await fetch(
          `/api/usage/analytics?range=${encodeURIComponent(range)}&presets=1d,7d,30d`
        );
        if (!response.ok) {
          throw new Error(t("overviewLoadFailed"));
        }
        const payload = (await response.json()) as UsageAnalyticsPayload;
        if (!active) return;
        setAnalytics(payload);
        if (payload.presetSummaries) {
          setPresetCosts({
            "1d": payload.presetSummaries["1d"]?.totalCost || 0,
            "7d": payload.presetSummaries["7d"]?.totalCost || 0,
            "30d": payload.presetSummaries["30d"]?.totalCost || 0,
          });
        }
        setError(null);
      } catch (loadError) {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : t("overviewLoadFailed"));
      } finally {
        if (active) {
          setLoading(false);
          setSummaryLoading(false);
        }
      }
    }

    void loadRange();

    return () => {
      active = false;
    };
  }, [range, t]);

  const selectedRangeLabel = t(
    RANGE_OPTIONS.find((option) => option.value === range)?.labelKey || "range30d"
  );
  const summary = analytics?.summary || {
    totalCost: 0,
    totalRequests: 0,
    uniqueModels: 0,
    uniqueAccounts: 0,
    uniqueApiKeys: 0,
    totalTokens: 0,
    promptTokens: 0,
    completionTokens: 0,
    fallbackCount: 0,
    fallbackRatePct: 0,
    requestedModelCoveragePct: 0,
    streak: 0,
  };
  const providersByCost = [...(analytics?.byProvider || [])]
    .filter((provider) => provider.cost > 0)
    .sort((left, right) => right.cost - left.cost);
  const modelsByCost = [...(analytics?.byModel || [])]
    .filter((model) => model.cost > 0)
    .sort((left, right) => right.cost - left.cost);
  const apiKeysByCost = [...(analytics?.byApiKey || [])]
    .filter((apiKey) => apiKey.cost > 0)
    .sort((left, right) => right.cost - left.cost);
  const accountsByCost = [...(analytics?.byAccount || [])]
    .filter((account) => account.cost > 0)
    .sort((left, right) => right.cost - left.cost);
  const avgCostPerRequest =
    summary.totalRequests > 0 ? summary.totalCost / summary.totalRequests : 0;
  const dailyTrend = analytics?.dailyTrend || [];
  const recentDays = dailyTrend.slice(-7);
  const avgDailyCost =
    recentDays.length > 0
      ? recentDays.reduce((sum, day) => sum + (day.cost || 0), 0) / recentDays.length
      : 0;
  const today = new Date();
  const daysRemainingInMonth =
    new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - today.getDate();
  const projectedMonthEnd =
    (presetCosts["30d"] || summary.totalCost) + avgDailyCost * daysRemainingInMonth;
  const trendLength = dailyTrend.length;
  const halfLength = Math.floor(trendLength / 2);
  const firstHalf = dailyTrend.slice(0, halfLength);
  const secondHalf = dailyTrend.slice(halfLength);
  const firstHalfCost = firstHalf.reduce((sum, day) => sum + (day.cost || 0), 0);
  const secondHalfCost = secondHalf.reduce((sum, day) => sum + (day.cost || 0), 0);
  const costChangePct =
    firstHalfCost > 0
      ? ((secondHalfCost - firstHalfCost) / firstHalfCost) * 100
      : secondHalfCost > 0
        ? 100
        : 0;

  if (loading && !analytics) {
    return <CardSkeleton />;
  }

  if (error && !analytics) {
    return (
      <Card className="p-6">
        <EmptyState icon="payments" title={t("overviewTitle")} description={error} />
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-text-main">{t("overviewTitle")}</h2>
            <p className="text-sm text-text-muted mt-1">{t("overviewDescription")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {summary.streak > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                <span className="material-symbols-outlined text-amber-400 text-sm">
                  local_fire_department
                </span>
                <span className="text-sm font-semibold text-amber-400">{summary.streak}</span>
                <span className="text-xs text-amber-400/70">{t("dayStreak")}</span>
              </div>
            )}
            {analytics && summary.totalCost > 0 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    const csv = generateCSV(analytics, locale);
                    const dateStr = new Date().toISOString().slice(0, 10);
                    downloadFile(csv, `omniroute-costs-${range}-${dateStr}.csv`, "text/csv");
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-text-muted hover:text-text-main hover:bg-surface/50 rounded-lg border border-border/30 transition-colors"
                  title={t("exportCSV")}
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  CSV
                </button>
                <button
                  onClick={() => {
                    const json = generateJSON(analytics);
                    const dateStr = new Date().toISOString().slice(0, 10);
                    downloadFile(
                      json,
                      `omniroute-costs-${range}-${dateStr}.json`,
                      "application/json"
                    );
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-text-muted hover:text-text-main hover:bg-surface/50 rounded-lg border border-border/30 transition-colors"
                  title={t("exportJSON")}
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  JSON
                </button>
              </div>
            )}
            <SegmentedControl
              options={RANGE_OPTIONS.map((option) => ({
                value: option.value,
                label: t(option.labelKey),
              }))}
              value={range}
              onChange={(value) => setRange(value as CostRange)}
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          label={t("spendToday")}
          value={currencyFormatter.format(presetCosts["1d"] || 0)}
          loading={summaryLoading}
          color="text-emerald-400"
        />
        <MetricCard
          label={t("spend7d")}
          value={currencyFormatter.format(presetCosts["7d"] || 0)}
          loading={summaryLoading}
          color="text-sky-400"
        />
        <MetricCard
          label={t("spend30d")}
          value={currencyFormatter.format(presetCosts["30d"] || 0)}
          loading={summaryLoading}
          color="text-violet-400"
        />
        <MetricCard
          label={t("selectedWindow")}
          value={currencyFormatter.format(summary.totalCost || 0)}
          subValue={selectedRangeLabel}
          color="text-amber-400"
        />
      </div>

      <Card className="p-5">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <CompactMetric
            label={t("requestsInWindow")}
            value={new Intl.NumberFormat(locale).format(summary.totalRequests || 0)}
          />
          <CompactMetric
            label={t("activeProviders")}
            value={new Intl.NumberFormat(locale).format(providersByCost.length)}
          />
          <CompactMetric
            label={t("activeModels")}
            value={new Intl.NumberFormat(locale).format(summary.uniqueModels || 0)}
          />
          <CompactMetric
            label={t("avgCostPerRequest")}
            value={currencyFormatter.format(avgCostPerRequest)}
          />
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
          {t("tokenUsage")}
        </h3>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <CompactMetric
            label={t("totalTokens")}
            value={new Intl.NumberFormat(locale, { notation: "compact" }).format(
              summary.totalTokens || 0
            )}
          />
          <CompactMetric
            label={t("inputTokens")}
            value={new Intl.NumberFormat(locale, { notation: "compact" }).format(
              summary.promptTokens || 0
            )}
          />
          <CompactMetric
            label={t("outputTokens")}
            value={new Intl.NumberFormat(locale, { notation: "compact" }).format(
              summary.completionTokens || 0
            )}
          />
          <CompactMetric
            label={t("inputOutputRatio")}
            value={
              summary.completionTokens > 0
                ? `${(summary.promptTokens / summary.completionTokens).toFixed(1)}:1`
                : "-"
            }
          />
        </div>
      </Card>

      {summary.totalRequests > 0 && (
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
            {t("routingEfficiency")}
          </h3>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="rounded-lg border border-border/20 bg-surface/20 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">
                {t("fallbackCount")}
              </p>
              <p className="text-lg font-semibold text-text-main mt-1">
                {new Intl.NumberFormat(locale).format(summary.fallbackCount || 0)}
              </p>
              <p className="text-xs text-text-muted mt-1">
                {t("outOfRequests", {
                  total: new Intl.NumberFormat(locale).format(summary.totalRequests),
                })}
              </p>
            </div>
            <div className="rounded-lg border border-border/20 bg-surface/20 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">
                {t("fallbackRate")}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p
                  className={`text-lg font-semibold ${
                    (summary.fallbackRatePct || 0) > 10
                      ? "text-red-400"
                      : (summary.fallbackRatePct || 0) > 5
                        ? "text-amber-400"
                        : "text-emerald-400"
                  }`}
                >
                  {(summary.fallbackRatePct || 0).toFixed(1)}%
                </p>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{
                    color:
                      (summary.fallbackRatePct || 0) > 10
                        ? "#f87171"
                        : (summary.fallbackRatePct || 0) > 5
                          ? "#fbbf24"
                          : "#34d399",
                  }}
                >
                  {(summary.fallbackRatePct || 0) > 5 ? "warning" : "check_circle"}
                </span>
              </div>
            </div>
            <div className="rounded-lg border border-border/20 bg-surface/20 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">
                {t("modelCoverage")}
              </p>
              <p className="text-lg font-semibold text-text-main mt-1">
                {(summary.requestedModelCoveragePct || 0).toFixed(1)}%
              </p>
              <p className="text-xs text-text-muted mt-1">{t("modelCoverageDesc")}</p>
            </div>
          </div>
        </Card>
      )}

      {summary.totalCost > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-sky-400 text-lg">trending_up</span>
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide">
                {t("monthlyForecast")}
              </h3>
            </div>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-bold text-sky-400">
                {currencyFormatter.format(projectedMonthEnd)}
              </p>
              <p className="text-xs text-text-muted pb-1">
                {t("forecastBasis", { days: recentDays.length })}
              </p>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-text-muted">
              <span>{t("avgDailyCost")}:</span>
              <span className="font-mono">{currencyFormatter.format(avgDailyCost)}</span>
              <span>/</span>
              <span>{t("daysRemaining", { days: daysRemainingInMonth })}</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-violet-400 text-lg">
                compare_arrows
              </span>
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide">
                {t("periodComparison")}
              </h3>
            </div>
            <div className="flex items-end gap-3">
              <p
                className={`text-3xl font-bold ${
                  costChangePct > 0
                    ? "text-red-400"
                    : costChangePct < 0
                      ? "text-emerald-400"
                      : "text-text-main"
                }`}
              >
                {costChangePct > 0 ? "+" : ""}
                {costChangePct.toFixed(1)}%
              </p>
              <span
                className={`material-symbols-outlined text-lg pb-1 ${
                  costChangePct > 0
                    ? "text-red-400"
                    : costChangePct < 0
                      ? "text-emerald-400"
                      : "text-text-muted"
                }`}
              >
                {costChangePct > 0
                  ? "arrow_upward"
                  : costChangePct < 0
                    ? "arrow_downward"
                    : "remove"}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div className="text-text-muted">
                <p>{t("previousPeriod")}</p>
                <p className="font-mono text-text-main">
                  {currencyFormatter.format(firstHalfCost)}
                </p>
              </div>
              <div className="text-text-muted">
                <p>{t("currentPeriod")}</p>
                <p className="font-mono text-text-main">
                  {currencyFormatter.format(secondHalfCost)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {summary.totalCost <= 0 ? (
        <Card className="p-6">
          <EmptyState
            icon="payments"
            title={t("noCostDataTitle")}
            description={t("noCostDataDescription")}
          />
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-4">
            <CostTrendCard
              title={t("costTrend")}
              rows={analytics?.dailyTrend || []}
              locale={locale}
            />
            <ProviderSpendCard title={t("providerShare")} rows={providersByCost} locale={locale} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <TopListCard
              title={t("topProviders")}
              nameKey="provider"
              valueKey="cost"
              secondaryKey="totalTokens"
              secondaryLabel={t("tokens")}
              rows={providersByCost}
              locale={locale}
            />
            <TopListCard
              title={t("topModels")}
              nameKey="model"
              valueKey="cost"
              secondaryKey="totalTokens"
              secondaryLabel={t("tokens")}
              rows={modelsByCost}
              locale={locale}
            />
          </div>

          {(apiKeysByCost.length > 0 || accountsByCost.length > 0) && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {apiKeysByCost.length > 0 && (
                <CostBreakdownTable
                  title={t("costByApiKey")}
                  rows={apiKeysByCost.slice(0, 8)}
                  columns={[
                    { key: "apiKeyName", label: t("apiKeyName"), align: "left" },
                    { key: "requests", label: t("requests"), align: "right", format: "number" },
                    {
                      key: "totalTokens",
                      label: t("tokens"),
                      align: "right",
                      format: "compact",
                    },
                    { key: "cost", label: t("cost"), align: "right", format: "currency" },
                  ]}
                  locale={locale}
                />
              )}
              {accountsByCost.length > 0 && (
                <CostBreakdownTable
                  title={t("costByAccount")}
                  rows={accountsByCost.slice(0, 8)}
                  columns={[
                    { key: "account", label: t("account"), align: "left" },
                    { key: "requests", label: t("requests"), align: "right", format: "number" },
                    {
                      key: "totalTokens",
                      label: t("tokens"),
                      align: "right",
                      format: "compact",
                    },
                    { key: "cost", label: t("cost"), align: "right", format: "currency" },
                  ]}
                  locale={locale}
                />
              )}
            </div>
          )}

          {summary.totalRequests > 0 && (
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.5fr] gap-4">
              <WeeklyPatternCard
                title={t("weeklyUsagePattern")}
                rows={analytics?.weeklyPattern || []}
                locale={locale}
              />
              <ActivityHeatmap
                title={t("activityHeatmap")}
                activityMap={analytics?.activityMap || {}}
                lessLabel={t("less")}
                moreLabel={t("more")}
                locale={locale}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MetricCard({
  label,
  value,
  subValue,
  color = "text-text-main",
  loading = false,
}: {
  label: string;
  value: string;
  subValue?: string;
  color?: string;
  loading?: boolean;
}) {
  return (
    <Card className="px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{loading ? "…" : value}</p>
      {subValue ? <p className="text-xs text-text-muted mt-1">{subValue}</p> : null}
    </Card>
  );
}

function CompactMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/20 bg-surface/20 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">{label}</p>
      <p className="text-lg font-semibold text-text-main mt-1">{value}</p>
    </div>
  );
}

function ProviderSpendCard({
  title,
  rows,
  locale,
}: {
  title: string;
  rows: UsageAnalyticsProviderRow[];
  locale: string;
}) {
  const currencyFormatter = createCurrencyFormatter(locale);
  const chartRows = rows.slice(0, 6).map((row, index) => ({
    name: row.provider,
    value: row.cost,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
        {title}
      </h3>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="w-full md:w-[180px] h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartRows}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={72}
                paddingAngle={2}
              >
                {chartRows.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => currencyFormatter.format(value || 0)}
                contentStyle={{
                  background: "var(--surface)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {chartRows.map((row) => (
            <div key={row.name} className="flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: row.fill }}
                />
                <span className="truncate text-text-main">{row.name}</span>
              </div>
              <span className="font-mono text-text-muted">
                {currencyFormatter.format(row.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function CostTrendCard({
  title,
  rows,
  locale,
}: {
  title: string;
  rows: UsageAnalyticsTrendRow[];
  locale: string;
}) {
  const currencyFormatter = createCurrencyFormatter(locale);
  const chartRows = rows.map((row) => ({
    date: row.date.slice(5),
    cost: row.cost || 0,
  }));

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
        {title}
      </h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartRows} margin={{ top: 5, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
              interval={Math.max(Math.floor(chartRows.length / 8), 0)}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => currencyFormatter.format(value).replace(".00", "")}
              width={48}
            />
            <Tooltip
              formatter={(value: number) => currencyFormatter.format(value || 0)}
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function WeeklyPatternCard({
  title,
  rows,
  locale,
}: {
  title: string;
  rows: Array<{ day: string; avgTokens: number; totalTokens: number }>;
  locale: string;
}) {
  const chartData = rows.map((row) => ({
    day: row.day,
    tokens: row.avgTokens || 0,
  }));

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
        {title}
      </h3>
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                new Intl.NumberFormat(locale, { notation: "compact" }).format(Number(value || 0))
              }
              width={40}
            />
            <Tooltip
              formatter={(value: number) =>
                `${new Intl.NumberFormat(locale).format(value || 0)} tokens`
              }
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
              }}
            />
            <Bar dataKey="tokens" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function ActivityHeatmap({
  title,
  activityMap,
  lessLabel,
  moreLabel,
  locale,
}: {
  title: string;
  activityMap: Record<string, number>;
  lessLabel: string;
  moreLabel: string;
  locale: string;
}) {
  const days: Array<{ date: string; value: number }> = [];
  const today = new Date();
  for (let index = 364; index >= 0; index--) {
    const date = new Date(today);
    date.setDate(date.getDate() - index);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
    days.push({ date: key, value: activityMap[key] || 0 });
  }

  const maxValue = Math.max(...days.map((day) => day.value), 1);
  const getIntensity = (value: number): string => {
    if (value === 0) return "bg-surface/30";
    const ratio = value / maxValue;
    if (ratio < 0.25) return "bg-emerald-900/50";
    if (ratio < 0.5) return "bg-emerald-700/60";
    if (ratio < 0.75) return "bg-emerald-500/70";
    return "bg-emerald-400";
  };

  const weeks: Array<Array<{ date: string; value: number }>> = [];
  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7));
  }

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
        {title}
      </h3>
      <div className="overflow-x-auto">
        <div className="flex gap-[3px]">
          {weeks.map((week) => (
            <div key={week[0]?.date} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`w-[11px] h-[11px] rounded-[2px] ${getIntensity(day.value)}`}
                  title={`${day.date}: ${
                    day.value > 0
                      ? `${new Intl.NumberFormat(locale).format(day.value)} tokens`
                      : "No activity"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 text-[10px] text-text-muted">
        <span>{lessLabel}</span>
        <div className="flex gap-[2px]">
          <div className="w-[10px] h-[10px] rounded-[2px] bg-surface/30" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-900/50" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-700/60" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-500/70" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-400" />
        </div>
        <span>{moreLabel}</span>
      </div>
    </Card>
  );
}

function TopListCard({
  title,
  rows,
  nameKey,
  valueKey,
  secondaryKey,
  secondaryLabel,
  locale,
}: {
  title: string;
  rows: Array<Record<string, string | number>>;
  nameKey: string;
  valueKey: string;
  secondaryKey?: string;
  secondaryLabel?: string;
  locale: string;
}) {
  const currencyFormatter = createCurrencyFormatter(locale);

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
        {title}
      </h3>
      <div className="space-y-2">
        {rows.slice(0, 6).map((row) => (
          <div
            key={String(row[nameKey])}
            className="flex items-center justify-between gap-3 rounded-lg border border-border/20 bg-surface/20 px-4 py-3"
          >
            <span className="text-sm text-text-main truncate">{String(row[nameKey])}</span>
            <div className="flex items-center gap-3 shrink-0">
              {secondaryKey ? (
                <span className="text-xs text-text-muted">
                  {new Intl.NumberFormat(locale, { notation: "compact" }).format(
                    Number(row[secondaryKey] || 0)
                  )}{" "}
                  {secondaryLabel}
                </span>
              ) : null}
              <span className="text-sm font-mono text-text-muted">
                {currencyFormatter.format(Number(row[valueKey] || 0))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

interface ColumnDef {
  key: string;
  label: string;
  align: "left" | "right";
  format?: "number" | "compact" | "currency";
}

function CostBreakdownTable({
  title,
  rows,
  columns,
  locale,
}: {
  title: string;
  rows: Array<Record<string, string | number | null>>;
  columns: ColumnDef[];
  locale: string;
}) {
  const currencyFormatter = createCurrencyFormatter(locale);

  function formatValue(value: unknown, format?: ColumnDef["format"]): string {
    const num = Number(value || 0);
    switch (format) {
      case "currency":
        return currencyFormatter.format(num);
      case "compact":
        return new Intl.NumberFormat(locale, { notation: "compact" }).format(num);
      case "number":
        return new Intl.NumberFormat(locale).format(num);
      default:
        return String(value ?? "-");
    }
  }

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
        {title}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] text-text-muted uppercase border-b border-border/30">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`pb-2 font-semibold ${
                    column.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {rows.map((row) => (
              <tr key={String(row[columns[0].key])} className="hover:bg-surface/20">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`py-2 ${
                      column.align === "right"
                        ? "text-right font-mono text-text-muted"
                        : "text-left text-text-main truncate max-w-[200px]"
                    }`}
                  >
                    {formatValue(row[column.key], column.format)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
