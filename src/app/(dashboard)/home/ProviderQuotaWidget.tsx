"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { supportsProviderQuota } from "@/shared/utils/providerQuotaVisibility";
import QuotaMiniBar from "../dashboard/usage/components/ProviderLimits/QuotaMiniBar";
import { PROVIDER_LABEL } from "../dashboard/usage/components/ProviderLimits/constants";
import { translateUsageOrFallback } from "../dashboard/usage/components/ProviderLimits/i18nFallback";
import { parseQuotaData } from "../dashboard/usage/components/ProviderLimits/quotaParsing";
import {
  formatCountdown,
  formatQuotaLabel,
  getBarColor,
  getQuotaRemainingPercentage,
} from "../dashboard/usage/components/ProviderLimits/utils";

const PRIMARY_QUOTA_COUNT = 3;

type Connection = {
  id: string;
  provider: string;
  authType?: string;
  name?: string;
  displayName?: string;
  email?: string;
  providerSpecificData?: unknown;
};

type QuotaData = Record<string, any>;

interface ProviderQuotaWidgetProps {
  autoRefreshInterval?: number;
  compact?: boolean;
}

function formatUpdatedAt(updatedAt: number | null): string | null {
  if (!updatedAt) return null;
  return new Date(updatedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatAutoRefreshCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function QuotaRow({ quota }: { quota: any }) {
  const t = useTranslations("usage");
  const percentage = Math.round(getQuotaRemainingPercentage(quota));
  const colors = getBarColor(percentage);
  const label = quota.displayName || formatQuotaLabel(quota.name) || quota.name;
  const reset = formatCountdown(quota.resetAt);

  if (quota.isCredits || quota.isResetCredits) {
    const amount = Number(quota.creditCount ?? quota.remaining ?? 0).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
    return (
      <div className="flex min-w-0 items-center justify-between gap-3 py-1.5">
        <span className="min-w-0 truncate text-xs font-medium text-text-main">{label}</span>
        <span className="shrink-0 text-xs font-bold tabular-nums" style={{ color: colors.text }}>
          {amount}
        </span>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-1 py-1.5" title={quota.modelKey || quota.name}>
      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-xs font-medium text-text-main">{label}</span>
        <span className="shrink-0 text-xs font-bold tabular-nums" style={{ color: colors.text }}>
          {quota.unlimited
            ? "∞"
            : translateUsageOrFallback(t, "percentLeft", `${percentage}% left`, {
                pct: percentage,
              })}
        </span>
      </div>
      {!quota.unlimited && <QuotaMiniBar percent={percentage} />}
      {reset && <span className="text-[10px] text-text-muted">⏱ {reset}</span>}
    </div>
  );
}

function ConnectionQuotas({ connection, cache }: { connection: Connection; cache: any }) {
  const t = useTranslations("usage");
  const [showOptional, setShowOptional] = useState(false);
  const quotas = useMemo(
    () => parseQuotaData(connection.provider, cache),
    [cache, connection.provider]
  );
  const primaryQuotas = quotas.slice(0, PRIMARY_QUOTA_COUNT);
  const optionalQuotas = quotas.slice(PRIMARY_QUOTA_COUNT);
  const accountLabel = connection.name || connection.displayName || connection.email;

  return (
    <div className="min-w-0">
      {accountLabel && <p className="mb-1 text-[11px] text-text-muted truncate">{accountLabel}</p>}
      {quotas.length === 0 ? (
        <p className="py-1.5 text-xs italic text-text-muted">
          {cache?.message || t("noQuotaData")}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
          {primaryQuotas.map((quota, index) => (
            <div
              key={`${quota.name}-${quota.modelKey || ""}-${index}`}
              className="border-b border-border/40"
            >
              <QuotaRow quota={quota} />
            </div>
          ))}
          {showOptional &&
            optionalQuotas.map((quota, index) => (
              <div
                key={`${quota.name}-${quota.modelKey || ""}-${index}`}
                className="border-b border-border/40"
              >
                <QuotaRow quota={quota} />
              </div>
            ))}
        </div>
      )}
      {optionalQuotas.length > 0 && (
        <button
          type="button"
          onClick={() => setShowOptional((current) => !current)}
          className="mt-2 inline-flex items-center gap-1 rounded-md border border-border bg-bg-subtle px-2 py-1 text-[11px] font-medium text-text-main hover:bg-surface transition-colors"
        >
          <span className="material-symbols-outlined text-[12px]" aria-hidden="true">
            {showOptional ? "expand_less" : "expand_more"}
          </span>
          {showOptional
            ? t("showLessQuotas")
            : t("showMoreQuotas", { count: optionalQuotas.length })}
        </button>
      )}
    </div>
  );
}

export default function ProviderQuotaWidget({
  autoRefreshInterval = 0,
  compact = false,
}: ProviderQuotaWidgetProps) {
  const t = useTranslations("usage");
  const tr = useCallback(
    (key: string, fallback: string) => translateUsageOrFallback(t, key, fallback),
    [t]
  );
  const [connections, setConnections] = useState<Connection[]>([]);
  const [quotaData, setQuotaData] = useState<QuotaData>({});
  const [loading, setLoading] = useState(true);
  const [refreshingAll, setRefreshingAll] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const refreshingAllRef = useRef(false);
  // State (not a ref): the countdown renders it, and refs cannot be read during
  // render nor initialized with Date.now() (purity rule).
  const [lastRefreshAllAt, setLastRefreshAllAt] = useState(() => Date.now());
  const autoRefreshIntervalMs = autoRefreshInterval > 0 ? autoRefreshInterval * 1000 : 0;
  const [autoRefreshClock, setAutoRefreshClock] = useState(() => Date.now());

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [connectionsResponse, quotasResponse] = await Promise.all([
        fetch("/api/providers/client"),
        fetch("/api/usage/provider-limits"),
      ]);
      const connectionData = connectionsResponse.ok ? await connectionsResponse.json() : {};
      const quotaResponseData = quotasResponse.ok ? await quotasResponse.json() : {};
      const relevant = ((connectionData.connections || []) as Connection[]).filter(
        (connection) =>
          supportsProviderQuota(connection.provider, connection) &&
          (connection.authType === "oauth" || connection.authType === "apikey")
      );
      setConnections(relevant);
      setQuotaData(quotaResponseData.caches || {});
      setUpdatedAt(Date.now());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await loadData();
    })();
  }, [loadData]);

  const refreshAll = useCallback(async () => {
    if (refreshingAllRef.current) return;
    refreshingAllRef.current = true;
    const now = Date.now();
    setLastRefreshAllAt(now);
    setAutoRefreshClock(now);
    setRefreshingAll(true);
    try {
      const response = await fetch("/api/usage/provider-limits", { method: "POST" });
      if (!response.ok) throw new Error("Failed to refresh provider quotas");
      const data = await response.json();
      setQuotaData(data.caches || {});
      setUpdatedAt(Date.now());
    } catch (error) {
      console.error("ProviderQuotaWidget refreshAll error:", error);
    } finally {
      refreshingAllRef.current = false;
      setRefreshingAll(false);
    }
  }, []);

  useEffect(() => {
    if (autoRefreshIntervalMs <= 0) return;

    const tick = () => setAutoRefreshClock(Date.now());
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
  }, [autoRefreshIntervalMs]);

  useEffect(() => {
    if (autoRefreshIntervalMs <= 0) return;
    if (document.visibilityState !== "visible") return;
    if (refreshingAllRef.current) return;

    if (autoRefreshClock - lastRefreshAllAt >= autoRefreshIntervalMs) {
      void (async () => {
        await refreshAll();
      })();
    }
  }, [autoRefreshClock, lastRefreshAllAt, autoRefreshIntervalMs, refreshAll]);

  const providerGroups = useMemo(() => {
    const groups = new Map<string, Connection[]>();
    for (const connection of connections) {
      const group = groups.get(connection.provider) || [];
      group.push(connection);
      groups.set(connection.provider, group);
    }
    return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [connections]);

  const updatedLabel = formatUpdatedAt(updatedAt);

  return (
    <Card className="w-full overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden="true">
            account_balance
          </span>
          <div>
            <h2 className="text-base font-semibold text-text-main">
              {tr("providerQuota", "Provider Quota")}
            </h2>
            {updatedLabel && (
              <p className="text-[11px] text-text-muted">
                {tr("updatedShort", "Updated")} {updatedLabel}
              </p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={refreshAll}
          disabled={loading || refreshingAll}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-bg-subtle px-3 py-1.5 text-xs font-medium text-text-main transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span
            className={`material-symbols-outlined text-[16px] ${refreshingAll ? "animate-spin" : ""}`}
            aria-hidden="true"
          >
            {autoRefreshIntervalMs > 0 ? "schedule" : "refresh"}
          </span>
          {refreshingAll
            ? tr("refreshing", "Refreshing")
            : autoRefreshIntervalMs > 0
              ? `${tr("autoRefreshing", "Auto-refreshing")} ${formatAutoRefreshCountdown(
                  Math.max(0, autoRefreshIntervalMs - (autoRefreshClock - lastRefreshAllAt))
                )}`
              : tr("forceRefresh", "Refresh now")}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 px-4 py-8 text-sm text-text-muted">
          <span className="material-symbols-outlined animate-spin text-[16px]" aria-hidden="true">
            progress_activity
          </span>
          {tr("loadingQuotas", "Loading...")}
        </div>
      ) : providerGroups.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-text-muted">
          {tr("noProviders", "No Providers Connected")}
        </div>
      ) : compact ? (
        /* Compact mode: 3-column card grid, flat across all connections */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 p-4">
          {connections.map((connection) => (
            <div key={connection.id} className="border border-border rounded-lg p-3 bg-bg-subtle">
              <div className="flex items-center gap-2 mb-2">
                <ProviderIcon providerId={connection.provider} size={16} />
                <span className="text-xs font-semibold text-text-main truncate">
                  {PROVIDER_LABEL[connection.provider] || connection.provider}
                </span>
              </div>
              <ConnectionQuotas connection={connection} cache={quotaData[connection.id]} />
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-border">
          {providerGroups.map(([provider, providerConnections]) => (
            <section
              key={provider}
              className="grid grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[12rem_minmax(0,1fr)]"
            >
              <div className="flex min-w-0 items-center gap-2 lg:items-start">
                <ProviderIcon providerId={provider} size={18} />
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-text-main">
                    {PROVIDER_LABEL[provider] || provider}
                  </h3>
                  <p className="text-[11px] text-text-muted">
                    {providerConnections.length}{" "}
                    {providerConnections.length === 1 ? "account" : "accounts"}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {providerConnections.map((connection) => (
                  <ConnectionQuotas
                    key={connection.id}
                    connection={connection}
                    cache={quotaData[connection.id]}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </Card>
  );
}
