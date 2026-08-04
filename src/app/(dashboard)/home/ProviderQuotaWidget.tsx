"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { USAGE_SUPPORTED_PROVIDERS } from "@/shared/constants/providers";
import { translateUsageOrFallback } from "../dashboard/usage/components/ProviderLimits/i18nFallback";
import { isProviderQuotaVisible } from "@/shared/utils/providerQuotaVisibility";

type Connection = {
  id: string;
  provider: string;
  authType?: string;
  email?: string;
  name?: string;
  quotaVisible?: boolean;
};

type QuotaData = Record<string, any>;

interface ProviderQuotaWidgetProps {
  autoRefreshInterval?: number;
}

function formatAutoRefreshCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function AutoRefreshButtonLabel({
  autoRefreshIntervalMs,
  lastRefreshAllAt,
  refreshingAll,
  tr,
}: {
  autoRefreshIntervalMs: number;
  lastRefreshAllAt: number;
  refreshingAll: boolean;
  tr: (key: string, fallback: string) => string;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (autoRefreshIntervalMs <= 0 || refreshingAll) return;

    const tick = () => setNow(Date.now());
    tick();

    const timer = window.setInterval(tick, 1000);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") tick();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [autoRefreshIntervalMs, refreshingAll, lastRefreshAllAt]);

  if (refreshingAll) {
    return <>{tr("refreshing", "Refreshing")}</>;
  }

  if (autoRefreshIntervalMs <= 0) {
    return <>{tr("refreshAll", "Refresh All")}</>;
  }

  return (
    <>
      {tr("autoRefreshing", "Auto-refreshing")}{" "}
      {formatAutoRefreshCountdown(Math.max(0, autoRefreshIntervalMs - (now - lastRefreshAllAt)))}
    </>
  );
}

export default function ProviderQuotaWidget({ autoRefreshInterval = 0 }: ProviderQuotaWidgetProps) {
  const t = useTranslations("usage");
  const tr = useCallback(
    (key: string, fallback: string) => translateUsageOrFallback(t, key, fallback),
    [t]
  );

  const [connections, setConnections] = useState<Connection[]>([]);
  const [quotaData, setQuotaData] = useState<QuotaData>({});
  const [loading, setLoading] = useState(true);
  const [refreshingAll, setRefreshingAll] = useState(false);

  const refreshingAllRef = useRef(false);
  const lastRefreshAllAtRef = useRef(Date.now());
  const [lastRefreshAllAt, setLastRefreshAllAt] = useState(() => lastRefreshAllAtRef.current);
  const autoRefreshIntervalMs = autoRefreshInterval > 0 ? autoRefreshInterval * 1000 : 0;

  const fetchConnections = useCallback(async () => {
    try {
      const res = await fetch("/api/providers/client");
      if (!res.ok) throw new Error("Failed to load connections");
      const data = await res.json();
      return (data.connections || []) as Connection[];
    } catch {
      return [];
    }
  }, []);

  const fetchCached = useCallback(async () => {
    try {
      const res = await fetch("/api/usage/provider-limits");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      return data.caches || {};
    } catch {
      return {};
    }
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [conns, caches] = await Promise.all([fetchConnections(), fetchCached()]);

    // Only keep connections that are usage/quota supported
    const relevant = conns.filter(
      (c) =>
        isProviderQuotaVisible(c) &&
        USAGE_SUPPORTED_PROVIDERS.includes(c.provider) &&
        (c.authType === "oauth" || c.authType === "apikey")
    );

    setConnections(relevant);
    setQuotaData(caches);
    setLoading(false);
  }, [fetchConnections, fetchCached]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refreshAll = useCallback(async () => {
    if (refreshingAllRef.current) return;
    refreshingAllRef.current = true;
    const now = Date.now();
    lastRefreshAllAtRef.current = now;
    setLastRefreshAllAt(now);
    setRefreshingAll(true);

    try {
      const res = await fetch("/api/usage/provider-limits", { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Refresh failed");
      }
      const data = await res.json();
      setQuotaData(data.caches || {});
    } catch (e) {
      console.error("ProviderQuotaWidget refreshAll error:", e);
    } finally {
      refreshingAllRef.current = false;
      setRefreshingAll(false);
    }
  }, []);

  useEffect(() => {
    if (autoRefreshIntervalMs <= 0) return;

    const maybeRefresh = () => {
      if (document.visibilityState !== "visible") return;
      if (refreshingAllRef.current) return;
      if (Date.now() - lastRefreshAllAtRef.current >= autoRefreshIntervalMs) {
        void refreshAll();
      }
    };

    maybeRefresh();
    const timer = window.setInterval(maybeRefresh, 1000);
    const handleVisibilityChange = () => maybeRefresh();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [autoRefreshIntervalMs, refreshAll]);

  // Simple summary: group by provider for display
  const providerGroups = connections.reduce<Record<string, Connection[]>>((acc, conn) => {
    if (!acc[conn.provider]) acc[conn.provider] = [];
    acc[conn.provider].push(conn);
    return acc;
  }, {});

  const providerEntries = Object.entries(providerGroups).sort(([a], [b]) => a.localeCompare(b));

  return (
    <Card className="overflow-hidden">
      {/* Header with title + Refresh All in upper right */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-surface/60">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">
            account_balance
          </span>
          <div>
            <h3 className="font-semibold text-base">{tr("providerQuota", "Provider Quota")}</h3>
            <p className="text-[11px] text-text-muted -mt-0.5">
              {tr("providerQuotaHomeHint", "Live status across connected accounts")}
            </p>
          </div>
        </div>

        <button
          onClick={refreshAll}
          disabled={refreshingAll || loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-bg-subtle text-xs font-medium text-text-main disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface transition-colors"
          title={
            autoRefreshIntervalMs > 0
              ? tr("autoRefreshing", "Auto-refreshing")
              : tr("refreshAll", "Refresh All")
          }
        >
          <span
            className={`material-symbols-outlined text-[16px] ${refreshingAll ? "animate-spin" : ""}`}
          >
            {autoRefreshIntervalMs > 0 ? "schedule" : "refresh"}
          </span>
          <span>
            <AutoRefreshButtonLabel
              autoRefreshIntervalMs={autoRefreshIntervalMs}
              lastRefreshAllAt={lastRefreshAllAt}
              refreshingAll={refreshingAll}
              tr={tr}
            />
          </span>
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-text-muted text-sm">
            <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
            {tr("loadingQuotas", "Loading...")}
          </div>
        ) : providerEntries.length === 0 ? (
          <div className="text-center py-6 text-sm text-text-muted">
            {tr("noProviders", "No Providers Connected")}
            <div className="mt-1 text-xs">
              {tr(
                "connectProvidersForQuota",
                "Connect to providers with OAuth to track your API quota limits and usage."
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {providerEntries.map(([provider, conns]) => {
              const firstConn = conns[0];
              const cache = quotaData[firstConn?.id];
              const hasQuota = cache?.quotas && Object.keys(cache.quotas).length > 0;

              return (
                <div
                  key={provider}
                  className="rounded-lg border border-border bg-surface/40 p-3 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <ProviderIcon providerId={provider} size={18} />
                    <span className="font-medium text-sm truncate">
                      {provider.charAt(0).toUpperCase() + provider.slice(1)}
                    </span>
                    <span className="text-[10px] text-text-muted ml-auto tabular-nums">
                      {conns.length}
                    </span>
                  </div>

                  {hasQuota ? (
                    <div className="text-xs text-text-muted" title={tr("details", "Details")}>
                      {Object.keys(cache.quotas).length}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={refreshAll}
                      className="text-left text-xs text-amber-600 dark:text-amber-500 hover:underline"
                    >
                      {tr("refreshAll", "Refresh All")}
                    </button>
                  )}

                  {/* Future: embed small QuotaProgressBar for the primary window here */}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-3 text-[11px] text-right text-text-muted">
          <a href="/dashboard/usage?tab=limits" className="hover:text-primary hover:underline">
            {tr("viewDetails", "View details")}
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </Card>
  );
}
