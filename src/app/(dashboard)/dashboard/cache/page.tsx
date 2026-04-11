"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { Card, Button, EmptyState } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";
import CacheEntriesTab from "./components/CacheEntriesTab";

interface SemanticCacheStats {
  memoryEntries: number;
  dbEntries: number;
  hits: number;
  misses: number;
  hitRate: string;
  tokensSaved: number;
}

interface PromptCacheProviderStats {
  requests: number;
  totalRequests?: number;
  cachedRequests?: number;
  inputTokens: number;
  cachedTokens: number;
  cacheCreationTokens: number;
}

interface PromptCacheMetrics {
  totalRequests: number;
  requestsWithCacheControl: number;
  totalInputTokens: number;
  totalCachedTokens: number;
  totalCacheCreationTokens: number;
  tokensSaved: number;
  estimatedCostSaved: number;
  byProvider: Record<string, PromptCacheProviderStats>;
  byStrategy: Record<string, PromptCacheProviderStats>;
  lastUpdated: string;
}

interface IdempotencyStats {
  activeKeys: number;
  windowMs: number;
}

interface CacheTrendPoint {
  timestamp: string;
  requests: number;
  cachedRequests: number;
  inputTokens: number;
  cachedTokens: number;
  cacheCreationTokens: number;
}

interface CacheConfig {
  semanticCacheEnabled: boolean;
}

interface CacheStats {
  semanticCache: SemanticCacheStats;
  promptCache: PromptCacheMetrics | null;
  trend: CacheTrendPoint[];
  idempotency: IdempotencyStats;
  config?: CacheConfig;
}

type CacheView = "prompt" | "semantic";

function StatCard({
  icon,
  label,
  value,
  sub,
  accent = "text-text-main",
  size = "default",
}: {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  size?: "default" | "hero";
}) {
  const isHero = size === "hero";

  return (
    <div
      className={
        isHero
          ? "rounded-3xl border border-border/30 bg-gradient-to-br from-surface-raised via-surface-raised/80 to-surface/30 p-5"
          : "rounded-2xl border border-border/30 bg-surface-raised/70 p-4"
      }
    >
      <div className="flex items-center gap-1.5 text-xs text-text-muted">
        <span
          className={`material-symbols-outlined leading-none ${isHero ? "text-[18px]" : "text-base"}`}
          aria-hidden="true"
        >
          {icon}
        </span>
        <span>{label}</span>
      </div>
      <div
        className={`mt-3 font-semibold tabular-nums ${accent} ${isHero ? "text-3xl" : "text-2xl"}`}
      >
        {value}
      </div>
      {sub && <div className={`mt-1 text-text-muted ${isHero ? "text-sm" : "text-xs"}`}>{sub}</div>}
    </div>
  );
}

function SectionBadge({
  icon,
  children,
  tone = "neutral",
}: {
  icon: string;
  children: ReactNode;
  tone?: "neutral" | "green" | "amber";
}) {
  const toneClass =
    tone === "green"
      ? "border-green-500/20 bg-green-500/10 text-green-300"
      : tone === "amber"
        ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
        : "border-border/40 bg-surface/50 text-text-muted";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] ${toneClass}`}
    >
      <span className="material-symbols-outlined text-sm leading-none" aria-hidden="true">
        {icon}
      </span>
      {children}
    </span>
  );
}

function LinearMeter({
  label,
  value,
  tone = "green",
  helper,
}: {
  label: string;
  value: number;
  tone?: "green" | "blue" | "amber";
  helper?: string;
}) {
  const colorClass =
    tone === "blue" ? "bg-blue-400" : tone === "amber" ? "bg-amber-400" : "bg-emerald-500";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="text-text-muted">{label}</span>
        <span className="font-semibold tabular-nums text-text-main">{value.toFixed(1)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface/60">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      {helper && <div className="text-[11px] text-text-muted">{helper}</div>}
    </div>
  );
}

function DetailStat({
  label,
  value,
  accent = "text-text-main",
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl bg-surface/45 px-3 py-2.5">
      <div className="text-[11px] uppercase tracking-[0.12em] text-text-muted">{label}</div>
      <div className={`mt-1 text-sm font-semibold tabular-nums ${accent}`}>{value}</div>
    </div>
  );
}

function InfoRow({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <div className="flex gap-2 text-sm text-text-muted">
      <span
        className="material-symbols-outlined shrink-0 text-base leading-5 text-blue-400"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span>{children}</span>
    </div>
  );
}

function formatHour(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function PromptTrendPanel({
  trend,
  title,
  description,
  busiestHourLabel,
  peakCacheRateLabel,
  cachedRequestsLabel,
  hoursTrackedLabel,
  hourLabel,
  activityLabel,
  requestsLabel,
  cacheRateLabel,
  cachedTokensLabel,
  noDataLabel,
}: {
  trend: CacheTrendPoint[];
  title: string;
  description: string;
  busiestHourLabel: string;
  peakCacheRateLabel: string;
  cachedRequestsLabel: string;
  hoursTrackedLabel: string;
  hourLabel: string;
  activityLabel: string;
  requestsLabel: string;
  cacheRateLabel: string;
  cachedTokensLabel: string;
  noDataLabel: string;
}) {
  if (trend.length === 0) {
    return (
      <div className="rounded-3xl border border-border/30 bg-surface/20 p-5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-text-muted" aria-hidden="true">
            timeline
          </span>
          <h3 className="text-sm font-medium text-text-main">{title}</h3>
        </div>
        <p className="mt-2 text-sm text-text-muted">{noDataLabel}</p>
      </div>
    );
  }

  const trackedHours = trend.length;
  const totalCachedRequests = trend.reduce((sum, point) => sum + point.cachedRequests, 0);
  const busiestHour = trend.reduce((best, point) =>
    point.requests > best.requests ? point : best
  );
  const peakCacheRatePoint = trend.reduce((best, point) => {
    const bestRate = best.requests > 0 ? best.cachedRequests / best.requests : 0;
    const currentRate = point.requests > 0 ? point.cachedRequests / point.requests : 0;
    return currentRate > bestRate ? point : best;
  });
  const maxRequests = Math.max(1, ...trend.map((point) => point.requests));

  return (
    <div className="w-full self-start rounded-3xl border border-border/30 bg-surface/20 p-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-base text-text-muted"
              aria-hidden="true"
            >
              timeline
            </span>
            <h3 className="text-sm font-medium text-text-main">{title}</h3>
          </div>
          <p className="mt-2 text-sm text-text-muted">{description}</p>
        </div>
        <SectionBadge icon="schedule">
          {trackedHours} {hoursTrackedLabel}
        </SectionBadge>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <DetailStat label={cachedRequestsLabel} value={totalCachedRequests.toLocaleString()} />
        <DetailStat label={busiestHourLabel} value={formatHour(busiestHour.timestamp)} />
        <DetailStat
          label={peakCacheRateLabel}
          value={`${((peakCacheRatePoint.cachedRequests / Math.max(peakCacheRatePoint.requests, 1)) * 100).toFixed(1)}%`}
          accent="text-emerald-500"
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border/25 bg-surface/35">
        <div className="grid grid-cols-[84px_minmax(0,1fr)_92px_120px] gap-3 border-b border-border/20 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted">
          <span>{hourLabel}</span>
          <span>{activityLabel}</span>
          <span>{cacheRateLabel}</span>
          <span>{cachedTokensLabel}</span>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {trend
            .slice()
            .reverse()
            .map((point) => {
              const cacheRate =
                point.requests > 0 ? (point.cachedRequests / point.requests) * 100 : 0;
              const volumeWidth = Math.max(8, (point.requests / maxRequests) * 100);

              return (
                <div
                  key={point.timestamp}
                  className="grid grid-cols-[84px_minmax(0,1fr)_92px_120px] gap-3 border-b border-border/15 px-4 py-3 last:border-b-0"
                >
                  <div className="text-sm font-medium tabular-nums text-text-main">
                    {formatHour(point.timestamp)}
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 overflow-hidden rounded-full bg-surface/60">
                      <div
                        className="h-full rounded-full bg-emerald-500/85"
                        style={{ width: `${volumeWidth}%` }}
                      />
                    </div>
                    <div className="text-xs text-text-muted">
                      {point.requests.toLocaleString()} {requestsLabel.toLowerCase()}
                    </div>
                  </div>
                  <div className="text-sm font-semibold tabular-nums text-text-main">
                    {cacheRate.toFixed(1)}%
                  </div>
                  <div className="text-sm font-semibold tabular-nums text-cyan-400">
                    {point.cachedTokens.toLocaleString()}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

const REFRESH_INTERVAL_MS = 10_000;
const REFRESH_INTERVAL_SECONDS = REFRESH_INTERVAL_MS / 1000;

export default function CachePage() {
  const t = useTranslations("cache");
  const tSettings = useTranslations("settings");
  const tRoot = useTranslations();
  const notify = useNotificationStore();

  const [stats, setStats] = useState<CacheStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [activeView, setActiveView] = useState<CacheView>("prompt");

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/cache");
      if (res.ok) {
        const data: CacheStats = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("[CachePage] Failed to fetch cache stats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchStats();
    const id = setInterval(() => void fetchStats(), REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchStats]);

  const handleClearAll = async () => {
    setClearing(true);
    try {
      const res = await fetch("/api/cache", { method: "DELETE" });
      if (res.ok) {
        const data = await res.json();
        notify.success(t("clearSuccess", { count: data.cleared ?? 0 }));
        await fetchStats();
      } else {
        notify.error(t("clearError"));
      }
    } catch (error) {
      console.error("[CachePage] Failed to clear cache:", error);
      notify.error(t("clearError"));
    } finally {
      setClearing(false);
    }
  };

  const sc = stats?.semanticCache;
  const pc = stats?.promptCache;
  const trend = stats?.trend ?? [];
  const idp = stats?.idempotency;
  const semanticCacheEnabled = stats?.config?.semanticCacheEnabled !== false;

  const semanticHitRate = sc ? parseFloat(sc.hitRate) : 0;
  const semanticTotalRequests = sc ? sc.hits + sc.misses : 0;
  const promptCacheRate =
    pc && pc.totalRequests > 0 ? (pc.requestsWithCacheControl / pc.totalRequests) * 100 : 0;
  const promptReuseRatio =
    pc && pc.totalInputTokens > 0 ? (pc.totalCachedTokens / pc.totalInputTokens) * 100 : 0;
  const providerEntries = pc
    ? Object.entries(pc.byProvider).sort(([, left], [, right]) => {
        const leftCachedRequests = left.cachedRequests ?? left.requests;
        const leftTotalRequests = left.totalRequests ?? leftCachedRequests;
        const rightCachedRequests = right.cachedRequests ?? right.requests;
        const rightTotalRequests = right.totalRequests ?? rightCachedRequests;
        const leftRate = leftTotalRequests > 0 ? (leftCachedRequests / leftTotalRequests) * 100 : 0;
        const rightRate =
          rightTotalRequests > 0 ? (rightCachedRequests / rightTotalRequests) * 100 : 0;

        if (rightRate !== leftRate) {
          return rightRate - leftRate;
        }

        return right.cachedTokens - left.cachedTokens;
      })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">{t("title")}</h1>
          <p className="mt-0.5 text-sm text-text-muted">{t("description")}</p>
        </div>
        <Button
          variant="secondary"
          icon="refresh"
          size="sm"
          onClick={() => void fetchStats()}
          disabled={loading}
          aria-label={t("refresh")}
        >
          {t("refresh")}
        </Button>
      </div>

      <div className="flex w-fit gap-1 rounded-lg bg-black/5 p-1 dark:bg-white/5">
        <button
          type="button"
          onClick={() => setActiveView("prompt")}
          aria-pressed={activeView === "prompt"}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeView === "prompt"
              ? "bg-white dark:bg-white/10 text-text-main shadow-sm"
              : "text-text-muted hover:text-text-main"
          }`}
        >
          {t("promptCache")}
        </button>
        <button
          type="button"
          onClick={() => setActiveView("semantic")}
          aria-pressed={activeView === "semantic"}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeView === "semantic"
              ? "bg-white dark:bg-white/10 text-text-main shadow-sm"
              : "text-text-muted hover:text-text-main"
          }`}
        >
          {t("semanticCache")}
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-6" aria-busy="true" aria-label="Loading cache">
          <div className="h-96 rounded-3xl bg-surface-raised animate-pulse" />
        </div>
      )}

      {!loading && !stats && (
        <EmptyState
          icon="cached"
          title={t("unavailable")}
          description={t("unavailableDesc")}
          actionLabel={t("refresh")}
          onAction={() => void fetchStats()}
        />
      )}

      {!loading && stats && activeView === "prompt" && (
        <Card>
          <div className="flex flex-col gap-6 p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <SectionBadge icon="bolt" tone="green">
                  {t("promptCache")}
                </SectionBadge>
                <div>
                  <h2 className="text-lg font-semibold text-text-main">{t("promptCache")}</h2>
                  <p className="mt-1 max-w-3xl text-sm text-text-muted">
                    {t("promptCacheSectionDesc")}
                  </p>
                </div>
              </div>
              {pc && (
                <div className="text-sm text-text-muted">
                  {t("lastUpdated")}: {new Date(pc.lastUpdated).toLocaleString()}
                </div>
              )}
            </div>

            {pc ? (
              <>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  <StatCard
                    icon="speed"
                    label={t("cacheRate")}
                    value={`${promptCacheRate.toFixed(1)}%`}
                    sub={`${pc.requestsWithCacheControl.toLocaleString()} / ${pc.totalRequests.toLocaleString()} ${t("requests").toLowerCase()}`}
                    accent="text-emerald-500"
                    size="hero"
                  />
                  <StatCard
                    icon="savings"
                    label={t("cacheReuseRatio")}
                    value={`${promptReuseRatio.toFixed(1)}%`}
                    sub={t("cacheReuseRatioDesc")}
                    accent="text-blue-400"
                    size="hero"
                  />
                  <StatCard
                    icon="token"
                    label={t("cachedTokens")}
                    value={pc.totalCachedTokens.toLocaleString()}
                    sub={t("cachedTokensRead")}
                    accent="text-cyan-400"
                    size="hero"
                  />
                  <StatCard
                    icon="upload"
                    label={t("cacheCreationTokens")}
                    value={pc.totalCacheCreationTokens.toLocaleString()}
                    sub={t("cacheCreationWrite")}
                    accent="text-purple-400"
                    size="hero"
                  />
                  <StatCard
                    icon="attach_money"
                    label={t("estCostSaved")}
                    value={`$${pc.estimatedCostSaved.toFixed(4)}`}
                    sub={t("promptCache")}
                    accent="text-green-500"
                    size="hero"
                  />
                </div>

                <div className="w-full rounded-3xl border border-border/30 bg-surface/20 p-5">
                  <div>
                    <h3 className="text-sm font-medium text-text-main">{t("byProvider")}</h3>
                    <p className="mt-1 text-sm text-text-muted">{t("providerCacheRateDesc")}</p>
                  </div>

                  {providerEntries.length > 0 ? (
                    <div className="mt-3 overflow-x-auto rounded-2xl border border-border/20 bg-surface/35">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border/20 text-left text-[11px] uppercase tracking-[0.12em] text-text-muted">
                            <th className="px-4 py-3">{t("provider")}</th>
                            <th className="px-4 py-3">{t("inputTokens")}</th>
                            <th className="px-4 py-3">{t("cachedTokensCol")}</th>
                            <th className="px-4 py-3">{t("cacheCreation")}</th>
                            <th className="px-4 py-3">{t("cacheReuseRatio")}</th>
                            <th className="px-4 py-3">{t("cacheRate")}</th>
                            <th className="px-4 py-3">{t("cachedRequests")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {providerEntries.map(([provider, data]) => {
                            const cachedRequests = data.cachedRequests ?? data.requests;
                            const totalRequests = data.totalRequests ?? cachedRequests;
                            const cacheRate =
                              totalRequests > 0 ? (cachedRequests / totalRequests) * 100 : 0;
                            const reuseRatio =
                              data.inputTokens > 0
                                ? (data.cachedTokens / data.inputTokens) * 100
                                : 0;

                            return (
                              <tr
                                key={provider}
                                className="border-b border-border/15 last:border-b-0"
                              >
                                <td className="px-4 py-3">
                                  <div className="font-medium text-text-main">{provider}</div>
                                  <div className="mt-1 text-xs text-text-muted">
                                    {totalRequests.toLocaleString()} {t("requests").toLowerCase()}
                                  </div>
                                </td>
                                <td className="px-4 py-3 tabular-nums text-text-main">
                                  {data.inputTokens.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 tabular-nums text-cyan-400">
                                  {data.cachedTokens.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 tabular-nums text-purple-400">
                                  {data.cacheCreationTokens.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 font-semibold tabular-nums text-blue-400">
                                  {reuseRatio.toFixed(1)}%
                                </td>
                                <td className="px-4 py-3 font-semibold tabular-nums text-emerald-500">
                                  {cacheRate.toFixed(1)}%
                                </td>
                                <td className="px-4 py-3 tabular-nums text-text-main">
                                  {cachedRequests.toLocaleString()} /{" "}
                                  {totalRequests.toLocaleString()}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="mt-3 rounded-2xl border border-dashed border-border/40 bg-surface/10 px-4 py-6 text-sm text-text-muted">
                      {t("noPromptCacheData")}
                    </div>
                  )}
                </div>

                <PromptTrendPanel
                  trend={trend}
                  title={t("trend24h")}
                  description={t("promptTrendDesc")}
                  busiestHourLabel={t("busiestHour")}
                  peakCacheRateLabel={t("peakCacheRate")}
                  cachedRequestsLabel={t("cachedRequests24h")}
                  hoursTrackedLabel={t("hoursTracked")}
                  hourLabel={t("trendHour")}
                  activityLabel={t("activityVolume")}
                  requestsLabel={t("requests")}
                  cacheRateLabel={t("cacheRate")}
                  cachedTokensLabel={t("cachedTokensCol")}
                  noDataLabel={t("noTrendData")}
                />
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-border/40 bg-surface/10 px-4 py-6 text-sm text-text-muted">
                {t("noPromptCacheData")}
              </div>
            )}
          </div>
        </Card>
      )}

      {!loading && stats && activeView === "semantic" && (
        <Card>
          <div className="flex flex-col gap-6 p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <SectionBadge
                    icon={semanticCacheEnabled ? "database" : "block"}
                    tone={semanticCacheEnabled ? "green" : "amber"}
                  >
                    {t("semanticCache")}
                  </SectionBadge>
                  <SectionBadge
                    icon={semanticCacheEnabled ? "check_circle" : "do_not_disturb_on"}
                    tone={semanticCacheEnabled ? "green" : "amber"}
                  >
                    {semanticCacheEnabled ? tSettings("enabled") : tRoot("disabled")}
                  </SectionBadge>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text-main">{t("semanticCache")}</h2>
                  <p className="mt-1 max-w-3xl text-sm text-text-muted">
                    {t("semanticCacheSectionDesc")}
                  </p>
                </div>
              </div>

              <Button
                variant="danger"
                icon="delete_sweep"
                size="sm"
                onClick={() => void handleClearAll()}
                disabled={clearing || loading}
                loading={clearing}
                aria-label={t("clearAll")}
              >
                {t("clearAll")}
              </Button>
            </div>

            {!semanticCacheEnabled && (
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                {t("semanticCacheDisabledDesc")}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              <StatCard
                icon="memory"
                label={t("memoryEntries")}
                value={sc?.memoryEntries ?? 0}
                sub={t("memoryEntriesSub")}
              />
              <StatCard
                icon="storage"
                label={t("dbEntries")}
                value={sc?.dbEntries ?? 0}
                sub={t("dbEntriesSub")}
              />
              <StatCard
                icon="trending_up"
                label={t("cacheHits")}
                value={sc?.hits ?? 0}
                sub={t("cacheHitsSub", { total: semanticTotalRequests })}
                accent="text-green-500"
              />
              <StatCard
                icon="token"
                label={t("tokensSaved")}
                value={(sc?.tokensSaved ?? 0).toLocaleString()}
                sub={t("tokensSavedSub")}
                accent="text-blue-400"
              />
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="rounded-2xl border border-border/30 bg-surface/20 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-text-main">{t("performance")}</h3>
                    <p className="mt-1 text-sm text-text-muted">
                      {t("autoRefresh", { seconds: REFRESH_INTERVAL_SECONDS })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-semibold tabular-nums text-emerald-500">
                      {semanticHitRate.toFixed(1)}%
                    </div>
                    <div className="text-xs text-text-muted">{t("hitRate")}</div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <LinearMeter
                    label={t("hitRate")}
                    value={semanticHitRate}
                    helper={`${sc?.hits ?? 0} ${t("hits").toLowerCase()} / ${semanticTotalRequests} ${t("total").toLowerCase()}`}
                  />
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <DetailStat
                    label={t("hits")}
                    value={(sc?.hits ?? 0).toLocaleString()}
                    accent="text-green-500"
                  />
                  <DetailStat
                    label={t("misses")}
                    value={(sc?.misses ?? 0).toLocaleString()}
                    accent="text-red-400"
                  />
                  <DetailStat label={t("total")} value={semanticTotalRequests.toLocaleString()} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-border/30 bg-surface/20 p-5">
                  <h3 className="text-sm font-medium text-text-main">{t("behavior")}</h3>
                  <div className="mt-4 grid gap-3">
                    <InfoRow icon="info">{t("behaviorDeterministic")}</InfoRow>
                    <InfoRow icon="info">
                      {t("behaviorBypass", { header: "X-OmniRoute-No-Cache: true" })}
                    </InfoRow>
                    <InfoRow icon="info">{t("behaviorTwoTier")}</InfoRow>
                    <InfoRow icon="info">
                      {t("behaviorTtl", { envVar: "SEMANTIC_CACHE_TTL_MS" })}
                    </InfoRow>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/30 bg-surface/20 p-5">
                  <div className="flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-base text-text-muted"
                      aria-hidden="true"
                    >
                      fingerprint
                    </span>
                    <h3 className="text-sm font-medium text-text-main">{t("idempotency")}</h3>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <DetailStat
                      label={t("activeDedupKeys")}
                      value={(idp?.activeKeys ?? 0).toLocaleString()}
                    />
                    <DetailStat
                      label={t("dedupWindow")}
                      value={idp ? `${(idp.windowMs / 1000).toFixed(0)}s` : "0s"}
                      accent="text-amber-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/30 bg-surface/20 p-5">
              <div className="mb-4 flex flex-col gap-1">
                <h3 className="text-sm font-medium text-text-main">{t("entries")}</h3>
                <p className="text-sm text-text-muted">{t("semanticEntriesDesc")}</p>
              </div>
              <CacheEntriesTab />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
