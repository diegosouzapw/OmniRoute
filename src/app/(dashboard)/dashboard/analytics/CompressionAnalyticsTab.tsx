/**
 * Compression Analytics Tab
 *
 * Shows compression request stats from call_logs (request_type = 'compression'),
 * mode breakdown, provider breakdown, and cost/token savings summary.
 */

"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useProviderNodeMap, resolveProviderName } from "@/lib/display/useProviderNodeMap";

interface CompressionAnalyticsSummary {
  totalRequests: number;
  totalTokensSaved: number;
  avgSavingsPct: number;
  avgDurationMs: number;
  byMode: Record<
    string,
    { count: number; tokensSaved: number; avgSavingsPct: number; skipped?: number }
  >;
  byProvider: Record<string, { count: number; tokensSaved: number }>;
  last24h: Array<{ hour: string; count: number; tokensSaved: number }>;
  totalSkipped?: number;
  bySkipReason?: Record<string, number>;
  validationFallbacks: number;
  realUsage: {
    requestsWithReceipts: number;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
    estimatedUsdSaved: number;
    bySource: Record<string, number>;
  };
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

function ModeBar({
  mode,
  count,
  total,
  tokensSaved,
  skipped = 0,
}: {
  mode: string;
  count: number;
  total: number;
  tokensSaved: number;
  skipped?: number;
}) {
  const t = useTranslations("analytics");
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-text capitalize">{mode}</span>
        <span className="text-text-muted">
          {t("compressionAnalyticsModeStats", {
            count,
            tokens: tokensSaved.toLocaleString(),
          })}
          {skipped > 0 && (
            // #4268: attempted-but-no-op runs (e.g. Stacked saved nothing) are
            // recorded now, so this mode is visible even when count is 0.
            <span className="text-text-muted/70">
              {t("compressionAnalyticsSkipped", { count: skipped.toLocaleString() })}
            </span>
          )}
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

function ProviderBar({
  provider,
  count,
  total,
  tokensSaved,
}: {
  provider: string;
  count: number;
  total: number;
  tokensSaved: number;
}) {
  const t = useTranslations("analytics");
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-text">{provider}</span>
        <span className="text-text-muted">
          {t("compressionAnalyticsModeStats", {
            count,
            tokens: tokensSaved.toLocaleString(),
          })}
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

export default function CompressionAnalyticsTab() {
  const t = useTranslations("analytics");
  const [stats, setStats] = useState<CompressionAnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [since, setSince] = useState<"24h" | "7d" | "30d" | "all">("24h");
  const nodeMap = useProviderNodeMap();

  useEffect(() => {
    fetch(`/api/analytics/compression?since=${since}`)
      .then((r) => r.json())
      .then((d) => {
        setStats(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [since]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-text-muted">
        <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
        {t("compressionAnalyticsLoading")}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="card p-6 text-center text-text-muted">
        <span className="material-symbols-outlined text-[32px] mb-2 block">compress</span>
        {error || t("compressionAnalyticsNoDataYet")}
        <p className="text-xs mt-2">{t("compressionAnalyticsNoDataDescription")}</p>
      </div>
    );
  }

  const modes = Object.entries(stats.byMode).sort(([, a], [, b]) => b.count - a.count);
  const providers = Object.entries(stats.byProvider).sort(([, a], [, b]) => b.count - a.count);
  const totalAttempts = stats.totalRequests + (stats.totalSkipped ?? 0);

  // Calculate max tokens for hourly chart scaling
  const maxTokensPerHour = Math.max(...stats.last24h.map((h) => h.tokensSaved), 1);
  const maxCountPerHour = Math.max(...stats.last24h.map((h) => h.count), 1);

  return (
    <div className="flex flex-col gap-6">
      {/* Time Range Selector */}
      <div className="flex gap-2">
        {(["24h", "7d", "30d", "all"] as const).map((range) => (
          <button
            key={range}
            onClick={() => setSince(range)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              since === range
                ? "bg-primary text-primary-foreground"
                : "bg-bg-muted text-text-muted hover:bg-bg-muted/80"
            }`}
          >
            {range === "24h"
              ? t("rangeLast24h")
              : range === "7d"
                ? t("rangeLast7d")
                : range === "30d"
                  ? t("rangeLast30d")
                  : t("rangeAllTime")}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <StatCard
          icon="compress"
          label={t("compressionAnalyticsTotalRequests")}
          value={totalAttempts.toLocaleString()}
        />
        <StatCard
          icon="token"
          label={t("compressionAnalyticsTokensSaved")}
          value={stats.totalTokensSaved.toLocaleString()}
        />
        <StatCard
          icon="percent"
          label={t("compressionAnalyticsAvgSavings")}
          value={`${stats.avgSavingsPct}%`}
        />
        <StatCard
          icon="timer"
          label={t("compressionAnalyticsAvgDuration")}
          value={`${stats.avgDurationMs}ms`}
        />
        <StatCard
          icon="receipt_long"
          label={t("compressionAnalyticsReceipts")}
          value={stats.realUsage.requestsWithReceipts.toLocaleString()}
          sub={t("compressionAnalyticsRealTokens", {
            count: stats.realUsage.totalTokens.toLocaleString(),
          })}
        />
        <StatCard
          icon="verified"
          label={t("compressionAnalyticsFallbacks")}
          value={stats.validationFallbacks.toLocaleString()}
          sub={t("compressionAnalyticsValidationRestores")}
        />
      </div>

      {stats.realUsage.requestsWithReceipts > 0 && (
        <div className="card p-5">
          <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">receipt_long</span>
            {t("compressionAnalyticsRealUsageReceipts")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
            <div>
              <div className="text-text-muted">{t("compressionAnalyticsPromptTokens")}</div>
              <div className="text-lg font-semibold text-text">
                {stats.realUsage.promptTokens.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-text-muted">{t("compressionAnalyticsCompletionTokens")}</div>
              <div className="text-lg font-semibold text-text">
                {stats.realUsage.completionTokens.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-text-muted">{t("compressionAnalyticsTotalTokens")}</div>
              <div className="text-lg font-semibold text-text">
                {stats.realUsage.totalTokens.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-text-muted">{t("compressionAnalyticsCacheTokens")}</div>
              <div className="text-lg font-semibold text-text">
                {(
                  (stats.realUsage.cacheReadTokens ?? 0) + (stats.realUsage.cacheWriteTokens ?? 0)
                ).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-text-muted">{t("compressionAnalyticsSources")}</div>
              <div className="text-lg font-semibold text-text">
                {Object.entries(stats.realUsage.bySource)
                  .map(([source, count]) => `${source}: ${count}`)
                  .join(", ")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode Breakdown */}
      {modes.length > 0 && (
        <div className="card p-5">
          <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
            {t("compressionAnalyticsModeBreakdown")}
          </h3>
          <div className="flex flex-col gap-4">
            {modes.map(([mode, data]) => (
              <ModeBar
                key={mode}
                mode={mode}
                count={data.count}
                total={stats.totalRequests}
                tokensSaved={data.tokensSaved}
                skipped={data.skipped ?? 0}
              />
            ))}
          </div>
        </div>
      )}

      {/* Provider Breakdown */}
      {providers.length > 0 && (
        <div className="card p-5">
          <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">hub</span>
            {t("compressionAnalyticsProviderBreakdown")}
          </h3>
          <div className="flex flex-col gap-4">
            {providers.map(([prov, data]) => (
              <ProviderBar
                key={prov}
                provider={resolveProviderName(prov, nodeMap)}
                count={data.count}
                total={stats.totalRequests}
                tokensSaved={data.tokensSaved}
              />
            ))}
          </div>
        </div>
      )}

      {/* Last 24h Hourly Chart (CSS-only height-based bars) */}
      {stats.last24h.length > 0 && (
        <div className="card p-5">
          <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">show_chart</span>
            {t("compressionAnalyticsLast24HoursActivity")}
          </h3>
          <div className="flex items-end gap-2 h-48">
            {stats.last24h.map((entry, idx) => {
              const countPct = (entry.count / maxCountPerHour) * 100;
              const tokenPct = (entry.tokensSaved / maxTokensPerHour) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-sm bg-gradient-to-b from-primary to-primary/70 transition-all hover:opacity-80 cursor-pointer group relative"
                    style={{ height: `${Math.max(countPct, 5)}%` }}
                    title={t("compressionAnalyticsChartPoint", {
                      hour: entry.hour,
                      count: entry.count,
                      tokens: entry.tokensSaved.toLocaleString(),
                    })}
                  >
                    <div className="absolute -top-6 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-text-muted whitespace-nowrap text-center">
                      {entry.count}
                    </div>
                  </div>
                  <div className="text-xs text-text-muted rotate-45 origin-left">
                    {entry.hour.substring(11, 13)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-text-muted">
            <div>{t("compressionAnalyticsMaxRequests", { count: maxCountPerHour })}</div>
            <div>
              {t("compressionAnalyticsMaxTokens", {
                count: maxTokensPerHour.toLocaleString(),
              })}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {totalAttempts === 0 && (
        <div className="card p-8 text-center text-text-muted">
          <span className="material-symbols-outlined text-[48px] mb-3 block text-primary opacity-50">
            compress
          </span>
          <p className="font-medium text-text">{t("compressionAnalyticsNoDataYet")}</p>
          <p className="text-sm mt-1">
            {t.rich("compressionAnalyticsStartTracking", {
              code: (chunks) => <code className="bg-bg-muted px-1 rounded">{chunks}</code>,
            })}
          </p>
        </div>
      )}

      {/* Info note */}
      <div className="text-xs text-text-muted border border-border rounded-lg p-3 flex items-start gap-2">
        <span className="material-symbols-outlined text-[16px] text-blue-500 mt-0.5">info</span>
        <span>
          {t.rich("compressionAnalyticsInfo", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </span>
      </div>
    </div>
  );
}
