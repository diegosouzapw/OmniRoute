"use client";

import { useTranslations } from "next-intl";

export interface CacheTrendPoint {
  timestamp: string;
  requests: number;
  cachedRequests: number;
  inputTokens: number;
  cachedTokens: number;
  cacheCreationTokens: number;
}

interface CacheTrendsProps {
  data?: CacheTrendPoint[] | null;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function CacheTrends({
  data,
  loading = false,
  error = null,
  onRetry,
}: CacheTrendsProps) {
  const t = useTranslations("cache");

  const trendData: CacheTrendPoint[] = data ?? [];
  const maxRequests = trendData.length > 0 ? Math.max(...trendData.map((p) => p.requests), 1) : 1;
  const maxCachedRequests =
    trendData.length > 0 ? Math.max(...trendData.map((p) => p.cachedRequests), 0) : 0;

  return (
    <div
      data-testid="cache-trends"
      className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-4"
    >
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-base text-text-muted" aria-hidden="true">
          timeline
        </span>
        <h2 className="font-medium text-sm">{t("trend24h")}</h2>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          <div
            data-testid="skeleton"
            className="h-32 w-full rounded bg-text-muted/10 animate-pulse"
          />
          <div data-testid="skeleton" className="h-3 w-24 rounded bg-text-muted/10 animate-pulse" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-3 py-6">
          <span className="text-sm text-red-500">{error}</span>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-3 py-1.5 text-xs rounded border border-border hover:bg-surface-raised transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      ) : trendData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 gap-2">
          <span className="text-sm text-text-muted">
            No data available — no cache activity in the last 24h
          </span>
        </div>
      ) : (
        <>
          {maxCachedRequests > 0 && (
            <div className="text-xs text-text-muted">
              {t("peakCached")}:{" "}
              <span className="font-medium text-foreground">
                {maxCachedRequests} / {maxRequests}
              </span>
            </div>
          )}
          <div className="flex items-end gap-1 h-32">
            {trendData.map((point) => {
              const height = Math.max(4, (point.requests / maxRequests) * 100);
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
                  data-testid="trend-bar"
                  className="flex-1 flex flex-col items-center gap-1 group relative"
                >
                  <div className="absolute bottom-full mb-1 hidden group-hover:block bg-surface-raised border border-border rounded px-2 py-1 text-xs whitespace-nowrap z-10">
                    {hour}: {point.requests} {t("requests").toLowerCase()}, {point.cachedRequests}{" "}
                    {t("cached").toLowerCase()}
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
        </>
      )}
    </div>
  );
}
