"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/shared/components";
import { useTranslations } from "next-intl";

interface CacheMetrics {
  totalRequests: number;
  requestsWithCacheControl: number;
  totalInputTokens: number;
  totalCachedTokens: number;
  totalCacheCreationTokens: number;
  tokensSaved: number;
  estimatedCostSaved: number;
  byProvider: Record<
    string,
    {
      requests: number;
      inputTokens: number;
      cachedTokens: number;
      cacheCreationTokens: number;
    }
  >;
  byStrategy: Record<
    string,
    {
      requests: number;
      inputTokens: number;
      cachedTokens: number;
      cacheCreationTokens: number;
    }
  >;
  lastUpdated: string;
}

const REFRESH_INTERVAL_MS = 10_000;
const REFRESH_INTERVAL_SECONDS = REFRESH_INTERVAL_MS / 1000;

function formatNumberCompact(num: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

export default function CacheStatsCard() {
  const [metrics, setMetrics] = useState<CacheMetrics | null>(null);
  const [resetting, setResetting] = useState(false);
  const t = useTranslations("cache");

  const fetchMetrics = useCallback(() => {
    fetch("/api/settings/cache-metrics")
      .then((r) => r.json())
      .then(setMetrics)
      .catch(() => {});
  }, []);

  useEffect(() => {
    void fetchMetrics();
    const id = setInterval(() => void fetchMetrics(), REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchMetrics]);

  const handleReset = async () => {
    setResetting(true);
    try {
      await fetch("/api/settings/cache-metrics", { method: "DELETE" });
      fetchMetrics();
    } finally {
      setResetting(false);
    }
  };

  const cacheHitRate =
    metrics && metrics.totalInputTokens > 0
      ? (metrics.totalCachedTokens / metrics.totalInputTokens) * 100
      : 0;

  return (
    <Card>
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-base text-text-muted"
              aria-hidden="true"
            >
              insights
            </span>
            <h2 className="font-medium text-sm">{t("cacheMetrics")}</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-muted">
              {t("autoRefresh", { seconds: REFRESH_INTERVAL_SECONDS })}
            </span>
            <button
              onClick={handleReset}
              disabled={resetting}
              className="px-3 py-1.5 text-xs rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              {resetting ? t("resetting") : t("resetMetrics")}
            </button>
          </div>
        </div>

        {metrics ? (
          <div className="flex flex-col gap-4">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-muted">{t("totalRequests")}</p>
                <p className="font-mono text-lg text-text-main">{metrics.totalRequests}</p>
              </div>
              <div>
                <p className="text-text-muted">{t("withCacheControl")}</p>
                <p className="font-mono text-lg text-text-main">
                  {metrics.requestsWithCacheControl}
                </p>
              </div>
            </div>

            {/* Token Stats */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-text-muted">{t("inputTokens")}</p>
                <p className="font-mono text-lg text-text-main">
                  {formatNumberCompact(metrics.totalInputTokens)}
                </p>
              </div>
              <div>
                <p className="text-text-muted">{t("cachedTokensRead")}</p>
                <p className="font-mono text-lg text-green-400">
                  {formatNumberCompact(metrics.totalCachedTokens)}
                </p>
              </div>
              <div>
                <p className="text-text-muted">{t("cacheCreationWrite")}</p>
                <p className="font-mono text-lg text-blue-400">
                  {formatNumberCompact(metrics.totalCacheCreationTokens)}
                </p>
              </div>
            </div>

            {/* Cache Ratio */}
            <div className="rounded-lg bg-surface/50 border border-border/30 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-main">{t("cacheReuseRatio")}</p>
                  <p className="text-xs text-text-muted">{t("cacheReuseRatioDesc")}</p>
                </div>
                <p className="font-mono text-xl text-green-400">{cacheHitRate.toFixed(1)}%</p>
              </div>
              {/* Progress bar */}
              <div className="mt-2 h-2 rounded-full bg-border/30 overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${Math.min(cacheHitRate, 100)}%` }}
                />
              </div>
            </div>

            {/* Savings */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-muted">{t("tokensSaved")}</p>
                <p className="font-mono text-lg text-green-400">
                  {formatNumberCompact(metrics.tokensSaved)}
                </p>
              </div>
              <div>
                <p className="text-text-muted">{t("estCostSaved")}</p>
                <p className="font-mono text-lg text-green-400">
                  ${metrics.estimatedCostSaved.toFixed(4)}
                </p>
              </div>
            </div>

            {/* By Provider */}
            {Object.keys(metrics.byProvider).length > 0 && (
              <div className="pt-3 border-t border-border/30">
                <p className="text-xs font-medium text-text-muted mb-2">{t("byProvider")}</p>
                <div className="space-y-2">
                  {Object.entries(metrics.byProvider).map(([provider, stats]) => {
                    const providerCacheRate =
                      stats.inputTokens > 0 ? (stats.cachedTokens / stats.inputTokens) * 100 : 0;
                    return (
                      <div
                        key={provider}
                        className="flex items-center justify-between px-3 py-2 rounded bg-surface/30 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-text-main capitalize w-24">{provider}</span>
                          <span className="text-text-muted">
                            {stats.requests} {t("requestsShort")}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 font-mono">
                          <span className="text-text-muted" title={t("inputTokens")}>
                            {t("inputShort")}: {formatNumberCompact(stats.inputTokens)}
                          </span>
                          <span className="text-green-400" title={t("cachedTokensRead")}>
                            {t("cachedShort")}: {formatNumberCompact(stats.cachedTokens)}
                          </span>
                          <span className="text-blue-400" title={t("cacheCreationWrite")}>
                            {t("writeShort")}: {formatNumberCompact(stats.cacheCreationTokens)}
                          </span>
                          <span className="text-green-400 w-12 text-right">
                            {providerCacheRate.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-text-muted">{t("loading")}</p>
        )}
      </div>
    </Card>
  );
}
