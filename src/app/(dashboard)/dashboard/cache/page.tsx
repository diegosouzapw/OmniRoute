"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Button, EmptyState } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";
import CacheEntriesTab from "./components/CacheEntriesTab";

// ─── Types ───────────────────────────────────────────────────────────────────

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

interface CacheStats {
  semanticCache: SemanticCacheStats;
  promptCache: PromptCacheMetrics | null;
  trend: CacheTrendPoint[];
  idempotency: IdempotencyStats;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
  valueClass = "text-text",
}: {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1 p-4 rounded-xl bg-surface-raised border border-border/40">
      <div className="flex items-center gap-1.5 text-text-muted text-xs">
        <span className="material-symbols-outlined text-base leading-none" aria-hidden="true">
          {icon}
        </span>
        {label}
      </div>
      <div className={`text-2xl font-semibold tabular-nums ${valueClass}`}>{value}</div>
      {sub && <div className="text-xs text-text-muted">{sub}</div>}
    </div>
  );
}

function HitRateBar({ hitRate, label }: { hitRate: number; label: string }) {
  const colorClass = hitRate >= 70 ? "bg-green-500" : hitRate >= 40 ? "bg-amber-400" : "bg-red-500";
  const textClass =
    hitRate >= 70 ? "text-green-500" : hitRate >= 40 ? "text-amber-400" : "text-red-500";

  return (
    <div
      className="w-full"
      role="progressbar"
      aria-label={label}
      aria-valuenow={hitRate}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-text-muted">{label}</span>
        <span className={`font-semibold tabular-nums ${textClass}`}>{hitRate.toFixed(1)}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-surface/50 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${Math.min(hitRate, 100)}%` }}
        />
      </div>
    </div>
  );
}

function InfoRow({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2 text-sm text-text-muted">
      <span
        className="material-symbols-outlined text-base leading-5 text-blue-400 shrink-0"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span>{children}</span>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const REFRESH_INTERVAL_MS = 10_000;
const REFRESH_INTERVAL_SECONDS = REFRESH_INTERVAL_MS / 1000;

export default function CachePage() {
  const t = useTranslations("cache");
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "entries">("overview");
  const notify = useNotificationStore();

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/cache");
      if (res.ok) {
        const data: CacheStats = await res.json();
        setStats(data);
      }
    } catch (error) {
      // Network error — keep stale stats rather than clearing the UI
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
        notify.success(t("clearSuccess", { count: data.expiredRemoved ?? 0 }));
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
  const hitRate = sc ? parseFloat(sc.hitRate) : 0;
  const totalRequests = sc ? sc.hits + sc.misses : 0;

  const promptCacheHitRate =
    pc && pc.totalRequests > 0 ? (pc.requestsWithCacheControl / pc.totalRequests) * 100 : 0;
  const promptCacheReuseRatio =
    pc && pc.totalInputTokens > 0 ? (pc.totalCachedTokens / pc.totalInputTokens) * 100 : 0;
  const providerEntries = pc
    ? Object.entries(pc.byProvider).sort(
        ([, left], [, right]) => right.cachedTokens - left.cachedTokens
      )
    : [];
  const strategyEntries = pc
    ? Object.entries(pc.byStrategy).sort(
        ([, left], [, right]) => right.cachedTokens - left.cachedTokens
      )
    : [];

  const maxTrendRequests = Math.max(1, ...trend.map((p) => p.requests));

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">{t("title")}</h1>
          <p className="text-sm text-text-muted mt-0.5">{t("description")}</p>
        </div>
        <div className="flex gap-2 shrink-0">
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
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 p-1 rounded-lg bg-black/5 dark:bg-white/5 w-fit">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === "overview"
              ? "bg-white dark:bg-white/10 text-text-main shadow-sm"
              : "text-text-muted hover:text-text-main"
          }`}
        >
          {t("overview")}
        </button>
        <button
          onClick={() => setActiveTab("entries")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === "entries"
              ? "bg-white dark:bg-white/10 text-text-main shadow-sm"
              : "text-text-muted hover:text-text-main"
          }`}
        >
          {t("entries")}
        </button>
      </div>

      {/* Entries tab */}
      {activeTab === "entries" && <CacheEntriesTab />}

      {/* Overview tab content */}
      {activeTab === "overview" && (
        <>
          {/* Loading skeleton */}
          {loading && (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              aria-busy="true"
              aria-label="Loading cache statistics"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 rounded-xl bg-surface-raised animate-pulse" />
              ))}
            </div>
          )}

          {/* Error / empty state */}
          {!loading && !stats && (
            <EmptyState
              icon="cached"
              title={t("unavailable")}
              description={t("unavailableDesc")}
              actionLabel={t("refresh")}
              onAction={() => void fetchStats()}
            />
          )}

          {/* Main content */}
          {!loading && stats && (
            <>
              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  sub={t("cacheHitsSub", { total: totalRequests })}
                  valueClass="text-green-500"
                />
                <StatCard
                  icon="token"
                  label={t("tokensSaved")}
                  value={(sc?.tokensSaved ?? 0).toLocaleString()}
                  sub={t("tokensSavedSub")}
                  valueClass="text-blue-400"
                />
              </div>

              {/* Hit rate + breakdown */}
              <Card>
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-medium text-sm">{t("performance")}</h2>
                    <span className="text-xs text-text-muted">
                      {t("autoRefresh", { seconds: REFRESH_INTERVAL_SECONDS })}
                    </span>
                  </div>
                  <HitRateBar hitRate={hitRate} label={t("hitRate")} />
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border/30 text-center">
                    <div>
                      <div className="text-lg font-semibold tabular-nums text-green-500">
                        {sc?.hits ?? 0}
                      </div>
                      <div className="text-xs text-text-muted mt-0.5">{t("hits")}</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold tabular-nums text-red-400">
                        {sc?.misses ?? 0}
                      </div>
                      <div className="text-xs text-text-muted mt-0.5">{t("misses")}</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold tabular-nums">{totalRequests}</div>
                      <div className="text-xs text-text-muted mt-0.5">{t("total")}</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Prompt Cache Stats */}
              {pc && (
                <Card>
                  <div className="p-5 flex flex-col gap-4">
                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="material-symbols-outlined text-base text-text-muted"
                          aria-hidden="true"
                        >
                          bolt
                        </span>
                        <h2 className="font-medium text-sm">{t("promptCache")}</h2>
                      </div>
                      <span className="text-xs text-text-muted">
                        Last updated {new Date(pc.lastUpdated).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                      <div className="p-3 rounded-lg bg-surface/50">
                        <div className="text-lg font-semibold tabular-nums">
                          {pc.totalRequests.toLocaleString()}
                        </div>
                        <div className="text-xs text-text-muted mt-0.5">{t("total")}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-surface/50">
                        <div className="text-lg font-semibold tabular-nums">
                          {pc.requestsWithCacheControl.toLocaleString()}
                        </div>
                        <div className="text-xs text-text-muted mt-0.5">
                          {t("withCacheControl")}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-surface/50">
                        <div className="text-lg font-semibold tabular-nums text-green-500">
                          {promptCacheHitRate.toFixed(1)}%
                        </div>
                        <div className="text-xs text-text-muted mt-0.5">{t("cacheHitRate")}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-surface/50">
                        <div className="text-lg font-semibold tabular-nums text-emerald-500">
                          {promptCacheReuseRatio.toFixed(1)}%
                        </div>
                        <div className="text-xs text-text-muted mt-0.5">{t("cacheReuseRatio")}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-surface/50">
                        <div className="text-lg font-semibold tabular-nums text-blue-400">
                          {pc.totalCachedTokens.toLocaleString()}
                        </div>
                        <div className="text-xs text-text-muted mt-0.5">{t("cachedTokens")}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-surface/50">
                        <div className="text-lg font-semibold tabular-nums text-purple-400">
                          {pc.totalCacheCreationTokens.toLocaleString()}
                        </div>
                        <div className="text-xs text-text-muted mt-0.5">
                          {t("cacheCreationTokens")}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-surface/50">
                        <div className="text-lg font-semibold tabular-nums text-green-500">
                          ${pc.estimatedCostSaved.toFixed(4)}
                        </div>
                        <div className="text-xs text-text-muted mt-0.5">{t("estCostSaved")}</div>
                      </div>
                    </div>

                    <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                      <div className="rounded-xl border border-border/30 bg-surface/20 p-4">
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div>
                            <h3 className="text-sm font-medium text-text-main">
                              {t("cacheMetrics")}
                            </h3>
                            <p className="text-xs text-text-muted">{t("cacheReuseRatioDesc")}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold tabular-nums text-emerald-500">
                              {promptCacheReuseRatio.toFixed(1)}%
                            </div>
                            <div className="text-xs text-text-muted">
                              {pc.totalCachedTokens.toLocaleString()} /{" "}
                              {pc.totalInputTokens.toLocaleString()}{" "}
                              {t("inputTokens").toLowerCase()}
                            </div>
                          </div>
                        </div>
                        <HitRateBar hitRate={promptCacheReuseRatio} label={t("cacheReuseRatio")} />
                        <div className="mt-3">
                          <HitRateBar
                            hitRate={promptCacheHitRate}
                            label={`${t("withCacheControl")} (${pc.requestsWithCacheControl}/${pc.totalRequests})`}
                          />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                          <div className="rounded-lg bg-surface/40 px-3 py-2">
                            <div className="text-xs text-text-muted">{t("tokensSaved")}</div>
                            <div className="text-sm font-semibold tabular-nums text-green-500 mt-1">
                              {pc.tokensSaved.toLocaleString()}
                            </div>
                          </div>
                          <div className="rounded-lg bg-surface/40 px-3 py-2">
                            <div className="text-xs text-text-muted">{t("cachedTokensRead")}</div>
                            <div className="text-sm font-semibold tabular-nums text-blue-400 mt-1">
                              {pc.totalCachedTokens.toLocaleString()}
                            </div>
                          </div>
                          <div className="rounded-lg bg-surface/40 px-3 py-2">
                            <div className="text-xs text-text-muted">{t("cacheCreationWrite")}</div>
                            <div className="text-sm font-semibold tabular-nums text-purple-400 mt-1">
                              {pc.totalCacheCreationTokens.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      {strategyEntries.length > 0 && (
                        <div className="rounded-xl border border-border/30 bg-surface/20 p-4">
                          <h3 className="text-sm font-medium text-text-main">Strategy Breakdown</h3>
                          <div className="mt-3 space-y-3">
                            {strategyEntries.map(([strategy, data]) => {
                              const ratio =
                                data.inputTokens > 0
                                  ? (data.cachedTokens / data.inputTokens) * 100
                                  : 0;
                              return (
                                <div key={strategy} className="space-y-1.5">
                                  <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="font-medium text-text-main capitalize">
                                      {strategy}
                                    </span>
                                    <span className="tabular-nums text-text-muted">
                                      {ratio.toFixed(1)}%
                                    </span>
                                  </div>
                                  <div className="h-2 rounded-full bg-surface/50 overflow-hidden">
                                    <div
                                      className="h-full rounded-full bg-blue-400"
                                      style={{ width: `${Math.min(ratio, 100)}%` }}
                                    />
                                  </div>
                                  <div className="flex items-center justify-between text-xs text-text-muted">
                                    <span>
                                      {data.requests.toLocaleString()} {t("requestsShort")}
                                    </span>
                                    <span>
                                      {data.cachedTokens.toLocaleString()}{" "}
                                      {t("cachedTokensCol").toLowerCase()}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {providerEntries.length > 0 && (
                      <div className="pt-3 border-t border-border/30">
                        <h3 className="text-xs font-medium text-text-muted mb-3">
                          {t("byProvider")}
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-left text-xs text-text-muted border-b border-border/30">
                                <th className="pb-2 pr-4">{t("provider")}</th>
                                <th className="pb-2 pr-4">{t("requests")}</th>
                                <th className="pb-2 pr-4">{t("inputTokens")}</th>
                                <th className="pb-2 pr-4">{t("cachedTokensCol")}</th>
                                <th className="pb-2">{t("cacheCreation")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {providerEntries.map(([provider, data]) => (
                                <tr key={provider} className="border-b border-border/20">
                                  <td className="py-2 pr-4 font-medium">{provider}</td>
                                  <td className="py-2 pr-4 tabular-nums">
                                    {data.requests.toLocaleString()}
                                  </td>
                                  <td className="py-2 pr-4 tabular-nums">
                                    {data.inputTokens.toLocaleString()}
                                  </td>
                                  <td className="py-2 pr-4 tabular-nums text-green-500">
                                    {data.cachedTokens.toLocaleString()}
                                  </td>
                                  <td className="py-2 tabular-nums text-purple-400">
                                    {data.cacheCreationTokens.toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Cache Trend (24h) */}
              {trend.length > 0 && (
                <Card>
                  <div className="p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-base text-text-muted"
                        aria-hidden="true"
                      >
                        timeline
                      </span>
                      <h2 className="font-medium text-sm">{t("trend24h")}</h2>
                    </div>
                    <div className="flex items-end gap-1 h-32">
                      {trend.map((point) => {
                        const height = Math.max(4, (point.requests / maxTrendRequests) * 100);
                        const cachedHeight =
                          point.requests > 0
                            ? Math.max(2, (point.cachedRequests / point.requests) * height)
                            : 0;
                        const hour = new Date(point.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });
                        return (
                          <div
                            key={point.timestamp}
                            className="flex-1 flex flex-col items-center gap-1 group relative"
                          >
                            <div className="absolute bottom-full mb-1 hidden group-hover:block bg-surface-raised border border-border rounded px-2 py-1 text-xs whitespace-nowrap z-10">
                              {hour}: {point.requests} {t("requests").toLowerCase()},{" "}
                              {point.cachedRequests} {t("cached").toLowerCase()}
                            </div>
                            <div className="w-full flex flex-col justify-end h-full gap-px">
                              <div
                                className="w-full bg-green-500/30 rounded-t"
                                style={{ height: `${cachedHeight}%` }}
                              />
                              <div
                                className="w-full bg-text-muted/20 rounded-t"
                                style={{ height: `${height - cachedHeight}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-text-muted truncate w-full text-center">
                              {hour.split(":")[0]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-text-muted/20" />
                        <span>{t("total")}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-green-500/30" />
                        <span>{t("cached")}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Cache behavior */}
              <Card>
                <div className="p-5 flex flex-col gap-3">
                  <h2 className="font-medium text-sm">{t("behavior")}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <InfoRow icon="info">{t("behaviorDeterministic")}</InfoRow>
                    <InfoRow icon="info">
                      {t.rich("behaviorBypass", {
                        header: () => (
                          <code className="bg-surface px-1 py-0.5 rounded text-xs font-mono">
                            X-OmniRoute-No-Cache: true
                          </code>
                        ),
                      })}
                    </InfoRow>
                    <InfoRow icon="info">{t("behaviorTwoTier")}</InfoRow>
                    <InfoRow icon="info">
                      {t.rich("behaviorTtl", {
                        envVar: () => (
                          <code className="bg-surface px-1 py-0.5 rounded text-xs font-mono">
                            SEMANTIC_CACHE_TTL_MS
                          </code>
                        ),
                      })}
                    </InfoRow>
                  </div>
                </div>
              </Card>

              {/* Idempotency */}
              <Card>
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-base text-text-muted"
                      aria-hidden="true"
                    >
                      fingerprint
                    </span>
                    <h2 className="font-medium text-sm">{t("idempotency")}</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-surface/50">
                      <div className="text-lg font-semibold tabular-nums">
                        {idp?.activeKeys ?? 0}
                      </div>
                      <div className="text-xs text-text-muted mt-0.5">{t("activeDedupKeys")}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-surface/50">
                      <div className="text-lg font-semibold tabular-nums">
                        {idp ? `${(idp.windowMs / 1000).toFixed(0)}s` : "—"}
                      </div>
                      <div className="text-xs text-text-muted mt-0.5">{t("dedupWindow")}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
}
