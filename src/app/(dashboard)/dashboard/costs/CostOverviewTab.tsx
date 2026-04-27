"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
} from "recharts";

type CostRange = "7d" | "30d" | "90d" | "all";

interface UsageAnalyticsSummary {
  totalCost: number;
  totalRequests: number;
  uniqueModels: number;
  uniqueAccounts: number;
  uniqueApiKeys: number;
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

interface UsageAnalyticsPayload {
  summary: UsageAnalyticsSummary;
  byProvider: UsageAnalyticsProviderRow[];
  byModel: UsageAnalyticsModelRow[];
  dailyTrend: UsageAnalyticsTrendRow[];
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

  const fetchAnalytics = useCallback(
    async (requestedRange: string) => {
      const response = await fetch(`/api/usage/analytics?range=${requestedRange}`);
      if (!response.ok) {
        throw new Error(t("overviewLoadFailed"));
      }
      return (await response.json()) as UsageAnalyticsPayload;
    },
    [t]
  );

  useEffect(() => {
    let active = true;

    async function loadRange() {
      try {
        setLoading(true);
        const payload = await fetchAnalytics(range);
        if (!active) return;
        setAnalytics(payload);
        setError(null);
      } catch (loadError: any) {
        if (!active) return;
        setError(loadError?.message || t("overviewLoadFailed"));
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadRange();

    return () => {
      active = false;
    };
  }, [fetchAnalytics, range, t]);

  useEffect(() => {
    let active = true;

    async function loadPresets() {
      try {
        setSummaryLoading(true);
        const [day, week, month] = await Promise.all([
          fetchAnalytics("1d"),
          fetchAnalytics("7d"),
          fetchAnalytics("30d"),
        ]);
        if (!active) return;
        setPresetCosts({
          "1d": day.summary?.totalCost || 0,
          "7d": week.summary?.totalCost || 0,
          "30d": month.summary?.totalCost || 0,
        });
      } finally {
        if (active) {
          setSummaryLoading(false);
        }
      }
    }

    void loadPresets();

    return () => {
      active = false;
    };
  }, [fetchAnalytics]);

  const selectedRangeLabel = t(
    RANGE_OPTIONS.find((option) => option.value === range)?.labelKey || "range30d"
  );
  const summary = analytics?.summary || {
    totalCost: 0,
    totalRequests: 0,
    uniqueModels: 0,
    uniqueAccounts: 0,
    uniqueApiKeys: 0,
  };
  const providersByCost = [...(analytics?.byProvider || [])]
    .filter((provider) => provider.cost > 0)
    .sort((left, right) => right.cost - left.cost);
  const modelsByCost = [...(analytics?.byModel || [])]
    .filter((model) => model.cost > 0)
    .sort((left, right) => right.cost - left.cost);
  const avgCostPerRequest =
    summary.totalRequests > 0 ? summary.totalCost / summary.totalRequests : 0;

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
          <SegmentedControl
            options={RANGE_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            value={range}
            onChange={(value) => setRange(value as CostRange)}
          />
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
              rows={providersByCost}
              locale={locale}
            />
            <TopListCard
              title={t("topModels")}
              nameKey="model"
              valueKey="cost"
              rows={modelsByCost}
              locale={locale}
            />
          </div>
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

function TopListCard({
  title,
  rows,
  nameKey,
  valueKey,
  locale,
}: {
  title: string;
  rows: Array<Record<string, string | number>>;
  nameKey: string;
  valueKey: string;
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
            <span className="text-sm font-mono text-text-muted">
              {currencyFormatter.format(Number(row[valueKey] || 0))}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
