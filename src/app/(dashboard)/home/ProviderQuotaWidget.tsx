"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { USAGE_SUPPORTED_PROVIDERS } from "@/shared/constants/providers";

type Connection = {
  id: string;
  provider: string;
  authType?: string;
  email?: string;
  name?: string;
};

type QuotaData = Record<string, any>;

export default function ProviderQuotaWidget() {
  const t = useTranslations("usage");
  const tc = useTranslations("common");

  const [connections, setConnections] = useState<Connection[]>([]);
  const [quotaData, setQuotaData] = useState<QuotaData>({});
  const [loading, setLoading] = useState(true);
  const [refreshingAll, setRefreshingAll] = useState(false);

  const refreshingAllRef = useRef(false);

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
    setRefreshingAll(true);

    try {
      const res = await fetch("/api/usage/provider-limits", { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Refresh failed");
      }
      const data = await res.json();
      // Re-fetch connections + caches to get fresh state
      const [conns, caches] = await Promise.all([fetchConnections(), fetchCached()]);
      const relevant = conns.filter(
        (c) =>
          USAGE_SUPPORTED_PROVIDERS.includes(c.provider) &&
          (c.authType === "oauth" || c.authType === "apikey")
      );
      setConnections(relevant);
      setQuotaData(caches || data.caches || {});
    } catch (e) {
      console.error("ProviderQuotaWidget refreshAll error:", e);
    } finally {
      refreshingAllRef.current = false;
      setRefreshingAll(false);
    }
  }, [fetchConnections, fetchCached]);

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
            <h3 className="font-semibold text-base">{t("providerQuota") || "Provider Quota"}</h3>
            <p className="text-[11px] text-text-muted -mt-0.5">
              {t("providerQuotaHomeHint") || "Live status across connected accounts"}
            </p>
          </div>
        </div>

        <button
          onClick={refreshAll}
          disabled={refreshingAll || loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-bg-subtle text-xs font-medium text-text-main disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface transition-colors"
          title={t("refreshAll") || "Refresh All"}
        >
          <span
            className={`material-symbols-outlined text-[16px] ${refreshingAll ? "animate-spin" : ""}`}
          >
            refresh
          </span>
          <span>{t("refreshAll") || "Refresh All"}</span>
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-text-muted text-sm">
            <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
            Loading quota information...
          </div>
        ) : providerEntries.length === 0 ? (
          <div className="text-center py-6 text-sm text-text-muted">
            No quota-supported providers connected yet.
            <div className="mt-1 text-xs">
              Add accounts on the Providers page to see quota status here.
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
                    <ProviderIcon provider={provider} size={18} />
                    <span className="font-medium text-sm truncate">
                      {provider.charAt(0).toUpperCase() + provider.slice(1)}
                    </span>
                    <span className="text-[10px] text-text-muted ml-auto">
                      {conns.length} account{conns.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  {hasQuota ? (
                    <div className="text-xs text-text-muted">
                      {Object.keys(cache.quotas).length} quota window(s) tracked
                    </div>
                  ) : (
                    <div className="text-xs text-amber-600 dark:text-amber-500">
                      No quota data yet — click Refresh All
                    </div>
                  )}

                  {/* Future: embed small QuotaProgressBar for the primary window here */}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-3 text-[11px] text-right text-text-muted">
          <a href="/dashboard/usage?tab=limits" className="hover:text-primary hover:underline">
            View full Provider Quota page →
          </a>
        </div>
      </div>
    </Card>
  );
}
