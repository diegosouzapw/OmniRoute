/**
 * Search Analytics Tab
 *
 * Shows search request stats from call_logs (request_type = 'search'),
 * provider breakdown, cache hit rate, and cost summary.
 */

"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface SearchStats {
  total: number;
  today: number;
  cached: number;
  errors: number;
  totalCostUsd: number;
  byProvider: Record<string, { count: number; costUsd: number }>;
  last24h: Array<{ hour: string; count: number }>;
  cacheHitRate: number;
  avgDurationMs: number;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isSearchStats(value: unknown): value is SearchStats {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<SearchStats>;
  return (
    isFiniteNumber(candidate.total) &&
    isFiniteNumber(candidate.today) &&
    isFiniteNumber(candidate.cached) &&
    isFiniteNumber(candidate.errors) &&
    isFiniteNumber(candidate.totalCostUsd) &&
    isFiniteNumber(candidate.cacheHitRate) &&
    isFiniteNumber(candidate.avgDurationMs) &&
    !!candidate.byProvider &&
    typeof candidate.byProvider === "object" &&
    !Array.isArray(candidate.byProvider) &&
    Object.values(candidate.byProvider).every(
      (provider) =>
        !!provider &&
        typeof provider === "object" &&
        isFiniteNumber(provider.count) &&
        isFiniteNumber(provider.costUsd)
    ) &&
    Array.isArray(candidate.last24h) &&
    candidate.last24h.every(
      (point) => typeof point.hour === "string" && isFiniteNumber(point.count)
    )
  );
}

async function readSearchStats(response: Response): Promise<SearchStats> {
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      body && typeof body === "object" && "error" in body && typeof body.error === "string"
        ? body.error
        : null;
    throw new Error(message ?? "searchAnalyticsNoData");
  }
  if (!isSearchStats(body)) throw new Error("searchAnalyticsNoData");
  return body;
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="card p-4 flex flex-col gap-1">
      <div className="flex items-center gap-2 text-text-muted text-sm">
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
        {label}
      </div>
      <div className="text-2xl font-bold text-text">{value}</div>
      {sub && <div className="text-xs text-text-muted">{sub}</div>}
    </div>
  );
}

function ProviderBar({
  provider,
  count,
  total,
  costUsd,
  queriesLabel,
}: {
  provider: string;
  count: number;
  total: number;
  costUsd: number;
  queriesLabel: string;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-text">{provider}</span>
        <span className="text-text-muted">
          {count} {queriesLabel} · ${costUsd.toFixed(4)}
        </span>
      </div>
      <div className="h-2 rounded-full bg-bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-text-muted text-right">{pct}%</div>
    </div>
  );
}

export default function SearchAnalyticsTab() {
  const t = useTranslations("analytics");
  const [stats, setStats] = useState<SearchStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    async function loadStats() {
      try {
        const response = await fetch("/api/v1/search/analytics", { signal: controller.signal });
        const nextStats = await readSearchStats(response);
        if (!cancelled) setStats(nextStats);
      } catch (cause) {
        const message = cause instanceof Error ? cause.message : "searchAnalyticsNoData";
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void loadStats();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-text-muted">
        <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
        {t("searchAnalyticsLoading")}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="card p-6 text-center text-text-muted">
        <span className="material-symbols-outlined text-[32px] mb-2 block">search_off</span>
        {error || t("searchAnalyticsNoData")}
        <p className="text-xs mt-2">
          {t.rich("searchAnalyticsNoDataDescription", {
            code: (chunks) => <code className="bg-bg-muted px-1 rounded">{chunks}</code>,
          })}
        </p>
      </div>
    );
  }

  const providers = Object.entries(stats.byProvider).sort(([, a], [, b]) => b.count - a.count);

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon="manage_search"
          label={t("searchAnalyticsTotalSearches")}
          value={stats.total.toLocaleString()}
          sub={t("searchAnalyticsToday", { count: stats.today })}
        />
        <StatCard
          icon="cached"
          label={t("searchAnalyticsCacheHitRate")}
          value={`${stats.cacheHitRate}%`}
          sub={t("searchAnalyticsCachedRequests", { count: stats.cached })}
        />
        <StatCard
          icon="attach_money"
          label={t("searchAnalyticsTotalCost")}
          value={`$${stats.totalCostUsd.toFixed(4)}`}
          sub={t("searchAnalyticsApiCosts")}
        />
        <StatCard
          icon="timer"
          label={t("searchAnalyticsAvgResponse")}
          value={`${stats.avgDurationMs}ms`}
          sub={
            stats.errors > 0
              ? t("searchAnalyticsErrors", { count: stats.errors })
              : t("searchAnalyticsNoErrors")
          }
        />
      </div>

      {/* Provider Breakdown */}
      {providers.length > 0 && (
        <div className="card p-5">
          <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">hub</span>
            {t("searchAnalyticsProviderBreakdown")}
          </h3>
          <div className="flex flex-col gap-4">
            {providers.map(([prov, data]) => (
              <ProviderBar
                key={prov}
                provider={prov}
                count={data.count}
                total={stats.total}
                costUsd={data.costUsd}
                queriesLabel={t("searchAnalyticsQueries")}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {stats.total === 0 && (
        <div className="card p-8 text-center text-text-muted">
          <span className="material-symbols-outlined text-[48px] mb-3 block text-primary opacity-50">
            travel_explore
          </span>
          <p className="font-medium text-text">{t("searchAnalyticsNoSearchesYet")}</p>
          <p className="text-sm mt-1">
            {t.rich("searchAnalyticsEmptyDescription", {
              code: (chunks) => <code className="bg-bg-muted px-1 rounded">{chunks}</code>,
            })}
          </p>
        </div>
      )}

      {/* Free tier note */}
      <div className="text-xs text-text-muted border border-border rounded-lg p-3 flex items-start gap-2">
        <span className="material-symbols-outlined text-[16px] text-green-500 mt-0.5">
          check_circle
        </span>
        <span>
          <strong>{t("freeTierAvailable")}:</strong> Serper (2,500/mo), Brave (2,000/mo), Exa
          (1,000/mo), Tavily (1,000/mo) — total 6,500+ free searches/month with automatic failover.
        </span>
      </div>
    </div>
  );
}
