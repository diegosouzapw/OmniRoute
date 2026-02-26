"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { parseQuotaData, calculatePercentage, normalizePlanTier } from "./utils";
import Card from "@/shared/components/Card";
import Badge from "@/shared/components/Badge";
import { CardSkeleton } from "@/shared/components/Loading";
import { USAGE_SUPPORTED_PROVIDERS } from "@/shared/constants/providers";

const REFRESH_INTERVAL_MS = 120000;
const MIN_FETCH_INTERVAL_MS = 30000; // Debounce per-connection fetches

// Provider display config
const PROVIDER_CONFIG = {
  antigravity: { label: "Antigravity", color: "#F59E0B" },
  github: { label: "GitHub Copilot", color: "#333" },
  kiro: { label: "Kiro AI", color: "#FF6B35" },
  codex: { label: "OpenAI Codex", color: "#10A37F" },
  claude: { label: "Claude Code", color: "#D97757" },
};

const TIER_FILTERS = [
  { key: "all", labelKey: "tierAll" },
  { key: "enterprise", labelKey: "tierEnterprise" },
  { key: "team", labelKey: "tierTeam" },
  { key: "business", labelKey: "tierBusiness" },
  { key: "ultra", labelKey: "tierUltra" },
  { key: "pro", labelKey: "tierPro" },
  { key: "plus", labelKey: "tierPlus" },
  { key: "free", labelKey: "tierFree" },
  { key: "unknown", labelKey: "tierUnknown" },
];

// Short model display names for quota bars
function getShortModelName(name) {
  const map = {
    "gemini-3-pro-high": "G3 Pro",
    "gemini-3-pro-low": "G3 Pro Low",
    "gemini-3-flash": "G3 Flash",
    "gemini-2.5-flash": "G2.5 Flash",
    "claude-opus-4-6-thinking": "Opus 4.6 Tk",
    "claude-opus-4-5-thinking": "Opus 4.5 Tk",
    "claude-opus-4-5": "Opus 4.5",
    "claude-sonnet-4-5-thinking": "Sonnet 4.5 Tk",
    "claude-sonnet-4-5": "Sonnet 4.5",
    chat: "Chat",
    completions: "Completions",
    premium_interactions: "Premium",
    session: "Session",
    weekly: "Weekly",
    agentic_request: "Agentic",
    agentic_request_freetrial: "Agentic (Trial)",
  };
  return map[name] || name;
}

// Get bar color based on remaining percentage
function getBarColor(remaining) {
  if (remaining > 70) return { bar: "#22c55e", text: "#22c55e", bg: "rgba(34,197,94,0.12)" };
  if (remaining >= 30) return { bar: "#eab308", text: "#eab308", bg: "rgba(234,179,8,0.12)" };
  return { bar: "#ef4444", text: "#ef4444", bg: "rgba(239,68,68,0.12)" };
}

// Format countdown
function formatCountdown(resetAt) {
  if (!resetAt) return null;
  try {
    const diff = (new Date(resetAt) as any) - (new Date() as any);
    if (diff <= 0) return null;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    if (h >= 24) {
      const d = Math.floor(h / 24);
      return `${d}d ${h % 24}h`;
    }
    return `${h}h ${m}m`;
  } catch {
    return null;
  }
}

export default function ProviderLimits() {
  const t = useTranslations("usage");
  const [connections, setConnections] = useState([]);
  const [quotaData, setQuotaData] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshingAll, setRefreshingAll] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const [initialLoading, setInitialLoading] = useState(true);
  const [tierFilter, setTierFilter] = useState("all");

  const intervalRef = useRef(null);
  const countdownRef = useRef(null);
  const lastFetchTimeRef = useRef({});

  const fetchConnections = useCallback(async () => {
    try {
      const response = await fetch("/api/providers/client");
      if (!response.ok) throw new Error("Failed");
      const data = await response.json();
      const list = data.connections || [];
      setConnections(list);
      return list;
    } catch {
      setConnections([]);
      return [];
    }
  }, []);

  const fetchQuota = useCallback(async (connectionId, provider) => {
    // Debounce: skip if last fetch was < MIN_FETCH_INTERVAL_MS ago
    const now = Date.now();
    const lastFetch = lastFetchTimeRef.current[connectionId] || 0;
    if (now - lastFetch < MIN_FETCH_INTERVAL_MS) {
      return; // Skip, data is still fresh
    }
    lastFetchTimeRef.current[connectionId] = now;

    setLoading((prev) => ({ ...prev, [connectionId]: true }));
    setErrors((prev) => ({ ...prev, [connectionId]: null }));
    try {
      const response = await fetch(`/api/usage/${connectionId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.error || response.statusText;
        if (response.status === 404) return;
        if (response.status === 401) {
          setQuotaData((prev) => ({
            ...prev,
            [connectionId]: { quotas: [], message: errorMsg },
          }));
          return;
        }
        throw new Error(`HTTP ${response.status}: ${errorMsg}`);
      }
      const data = await response.json();
      const parsedQuotas = parseQuotaData(provider, data);
      setQuotaData((prev) => ({
        ...prev,
        [connectionId]: {
          quotas: parsedQuotas,
          plan: data.plan || null,
          message: data.message || null,
          raw: data,
        },
      }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [connectionId]: error.message || "Failed to fetch quota",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [connectionId]: false }));
    }
  }, []);

  const refreshProvider = useCallback(
    async (connectionId, provider) => {
      await fetchQuota(connectionId, provider);
      setLastUpdated(new Date());
    },
    [fetchQuota]
  );

  const refreshAll = useCallback(async () => {
    if (refreshingAll) return;
    setRefreshingAll(true);
    setCountdown(120);
    try {
      const conns = await fetchConnections();
      const oauthConnections = conns.filter(
        (conn) => USAGE_SUPPORTED_PROVIDERS.includes(conn.provider) && conn.authType === "oauth"
      );
      await Promise.all(oauthConnections.map((conn) => fetchQuota(conn.id, conn.provider)));
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error refreshing all:", error);
    } finally {
      setRefreshingAll(false);
    }
  }, [refreshingAll, fetchConnections, fetchQuota]);

  useEffect(() => {
    const init = async () => {
      setInitialLoading(true);
      await refreshAll();
      setInitialLoading(false);
    };
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!autoRefresh) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      return;
    }
    intervalRef.current = setInterval(refreshAll, REFRESH_INTERVAL_MS);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 120 : prev - 1));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [autoRefresh, refreshAll]);

  useEffect(() => {
    const handler = () => {
      if (document.hidden) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (countdownRef.current) clearInterval(countdownRef.current);
      } else if (autoRefresh) {
        intervalRef.current = setInterval(refreshAll, REFRESH_INTERVAL_MS);
        countdownRef.current = setInterval(() => {
          setCountdown((prev) => (prev <= 1 ? 120 : prev - 1));
        }, 1000);
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [autoRefresh, refreshAll]);

  const filteredConnections = useMemo(
    () =>
      connections.filter(
        (conn) => USAGE_SUPPORTED_PROVIDERS.includes(conn.provider) && conn.authType === "oauth"
      ),
    [connections]
  );

  const sortedConnections = useMemo(() => {
    const priority = { antigravity: 1, github: 2, codex: 3, claude: 4, kiro: 5 };
    return [...filteredConnections].sort(
      (a, b) => (priority[a.provider] || 9) - (priority[b.provider] || 9)
    );
  }, [filteredConnections]);

  const tierByConnection = useMemo(() => {
    const out = {};
    for (const conn of sortedConnections) {
      out[conn.id] = normalizePlanTier(quotaData[conn.id]?.plan);
    }
    return out;
  }, [sortedConnections, quotaData]);

  const tierCounts = useMemo(() => {
    const counts = {
      all: sortedConnections.length,
      enterprise: 0,
      team: 0,
      business: 0,
      ultra: 0,
      pro: 0,
      free: 0,
      unknown: 0,
    };
    for (const conn of sortedConnections) {
      const tierKey = tierByConnection[conn.id]?.key || "unknown";
      counts[tierKey] = (counts[tierKey] || 0) + 1;
    }
    return counts;
  }, [sortedConnections, tierByConnection]);

  const visibleConnections = useMemo(() => {
    if (tierFilter === "all") return sortedConnections;
    return sortedConnections.filter(
      (conn) => (tierByConnection[conn.id]?.key || "unknown") === tierFilter
    );
  }, [sortedConnections, tierByConnection, tierFilter]);

  if (initialLoading) {
    return (
      <div className="flex flex-col gap-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (sortedConnections.length === 0) {
    return (
      <Card padding="lg">
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-[64px] opacity-15">cloud_off</span>
          <h3 className="mt-4 text-lg font-semibold text-text-main">{t("noProviders")}</h3>
          <p className="mt-2 text-sm text-text-muted max-w-[400px] mx-auto">
            {t("connectProvidersForQuota")}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-text-main m-0">{t("providerLimits")}</h2>
          <span className="text-[13px] text-text-muted">
            {t("accountsCount", { count: visibleConnections.length })}
            {visibleConnections.length !== sortedConnections.length &&
              ` ${t("filteredFromCount", { count: sortedConnections.length })}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRefresh((p) => !p)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-transparent cursor-pointer text-text-main text-[13px]"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{
                color: autoRefresh ? "#22c55e" : "var(--text-muted)",
              }}
            >
              {autoRefresh ? "toggle_on" : "toggle_off"}
            </span>
            {t("autoRefresh")}
            {autoRefresh && <span className="text-xs text-text-muted">({countdown}s)</span>}
          </button>

          <button
            onClick={refreshAll}
            disabled={refreshingAll}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.06] border border-white/10 text-text-main text-[13px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${refreshingAll ? "animate-spin" : ""}`}
            >
              refresh
            </span>
            {t("refreshAll")}
          </button>
        </div>
      </div>

      {/* Tier Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {TIER_FILTERS.map((tier) => {
          if (tier.key !== "all" && !tierCounts[tier.key]) return null;
          const active = tierFilter === tier.key;
          return (
            <button
              key={tier.key}
              onClick={() => setTierFilter(tier.key)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer"
              style={{
                border: active
                  ? "1px solid var(--primary, #E54D5E)"
                  : "1px solid rgba(255,255,255,0.12)",
                background: active ? "rgba(249,120,21,0.14)" : "transparent",
                color: active ? "var(--primary, #E54D5E)" : "var(--text-muted)",
              }}
            >
              <span>{t(tier.labelKey)}</span>
              <span className="opacity-85">{tierCounts[tier.key] || 0}</span>
            </button>
          );
        })}
      </div>

      {/* Account rows */}
      <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-black/15">
        {/* Table header */}
        <div
          className="items-center px-4 py-2.5 border-b border-white/[0.06] text-[11px] font-semibold uppercase tracking-wider text-text-muted"
          style={{ display: "grid", gridTemplateColumns: "280px 1fr 100px 48px" }}
        >
          <div>{t("account")}</div>
          <div>{t("modelQuotas")}</div>
          <div className="text-center">{t("lastUsed")}</div>
          <div className="text-center">{t("actions")}</div>
        </div>

        {visibleConnections.map((conn, idx) => {
          const quota = quotaData[conn.id];
          const isLoading = loading[conn.id];
          const error = errors[conn.id];
          const config = PROVIDER_CONFIG[conn.provider] || { label: conn.provider, color: "#666" };
          const tierMeta = tierByConnection[conn.id] || normalizePlanTier(null);

          return (
            <div
              key={conn.id}
              className="items-center px-4 py-3.5 transition-[background] duration-150 hover:bg-white/[0.02]"
              style={{
                display: "grid",
                gridTemplateColumns: "280px 1fr 100px 48px",
                borderBottom:
                  idx < visibleConnections.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              {/* Account Info */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                  <Image
                    src={`/providers/${conn.provider}.png`}
                    alt={conn.provider}
                    width={32}
                    height={32}
                    className="object-contain"
                    sizes="32px"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-text-main truncate">
                    {conn.name || config.label}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      title={
                        quota?.plan
                          ? t("rawPlanWithValue", { plan: quota.plan })
                          : t("noPlanFromProvider")
                      }
                    >
                      <Badge variant={tierMeta.variant} size="sm" dot>
                        {tierMeta.label}
                      </Badge>
                    </span>
                    <span className="text-[11px] text-text-muted">{config.label}</span>
                  </div>
                </div>
              </div>

              {/* Quota Bars */}
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 pr-3">
                {isLoading ? (
                  <div className="flex items-center gap-1.5 text-text-muted text-xs">
                    <span className="material-symbols-outlined animate-spin text-[14px]">
                      progress_activity
                    </span>
                    {t("loadingQuotas")}
                  </div>
                ) : error ? (
                  <div className="flex items-center gap-1.5 text-xs text-red-500">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[300px]">
                      {error}
                    </span>
                  </div>
                ) : quota?.message && (!quota.quotas || quota.quotas.length === 0) ? (
                  <div className="text-xs text-text-muted italic">{quota.message}</div>
                ) : quota?.quotas?.length > 0 ? (
                  quota.quotas.map((q, i) => {
                    const remaining =
                      q.remainingPercentage !== undefined
                        ? Math.round(q.remainingPercentage)
                        : calculatePercentage(q.used, q.total);
                    const colors = getBarColor(remaining);
                    const cd = formatCountdown(q.resetAt);
                    const shortName = getShortModelName(q.name);

                    return (
                      <div key={i} className="flex items-center gap-1.5 min-w-[200px] shrink-0">
                        {/* Model label */}
                        <span
                          className="text-[11px] font-semibold py-0.5 px-2 rounded whitespace-nowrap min-w-[60px] text-center"
                          style={{ background: colors.bg, color: colors.text }}
                        >
                          {shortName}
                        </span>

                        {/* Countdown */}
                        {cd && (
                          <span className="text-[10px] text-text-muted whitespace-nowrap">
                            ⏱ {cd}
                          </span>
                        )}

                        {/* Progress bar */}
                        <div className="flex-1 h-1.5 rounded-sm bg-white/[0.06] min-w-[60px] overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-[width] duration-300 ease-out"
                            style={{
                              width: `${Math.min(remaining, 100)}%`,
                              background: colors.bar,
                            }}
                          />
                        </div>

                        {/* Percentage */}
                        <span
                          className="text-[11px] font-semibold min-w-[32px] text-right"
                          style={{ color: colors.text }}
                        >
                          {remaining}%
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-xs text-text-muted italic">{t("noQuotaData")}</div>
                )}
              </div>

              {/* Last Used */}
              <div className="text-center text-[11px] text-text-muted">
                {lastUpdated ? (
                  <span>
                    {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                ) : (
                  "-"
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-0.5">
                <button
                  onClick={() => refreshProvider(conn.id, conn.provider)}
                  disabled={isLoading}
                  title={t("refreshQuota")}
                  className="p-1 rounded-md border-none bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 opacity-60 hover:opacity-100 flex items-center justify-center transition-opacity duration-150"
                >
                  <span
                    className={`material-symbols-outlined text-[16px] text-text-muted ${isLoading ? "animate-spin" : ""}`}
                  >
                    refresh
                  </span>
                </button>
              </div>
            </div>
          );
        })}

        {visibleConnections.length === 0 && (
          <div className="py-6 px-4 text-center text-text-muted text-[13px]">
            {t("noAccountsForTierFilter")}{" "}
            <strong>
              {t(TIER_FILTERS.find((tier) => tier.key === tierFilter)?.labelKey || "tierUnknown")}
            </strong>
            .
          </div>
        )}
      </div>
    </div>
  );
}
