"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import {
  parseQuotaData,
  calculatePercentage,
  formatQuotaLabel,
  normalizePlanTier,
  resolvePlanValue,
} from "./utils";
import Card from "@/shared/components/Card";
import Badge from "@/shared/components/Badge";
import { CardSkeleton } from "@/shared/components/Loading";
import { USAGE_SUPPORTED_PROVIDERS } from "@/shared/constants/providers";
import { pickMaskedDisplayValue, pickDisplayValue } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import EmailPrivacyToggle from "@/shared/components/EmailPrivacyToggle";

const LS_GROUP_BY = "omniroute:limits:groupBy";
const LS_EXPANDED_GROUPS = "omniroute:limits:expandedGroups";

const MIN_FETCH_INTERVAL_MS = 30000; // Debounce per-connection fetches
const QUOTA_BAR_GREEN_THRESHOLD = 50;
const QUOTA_BAR_YELLOW_THRESHOLD = 20;

// Provider display config
const PROVIDER_CONFIG = {
  antigravity: { label: "Antigravity", color: "#F59E0B" },
  "gemini-cli": { label: "Gemini CLI", color: "#4285F4" },
  github: { label: "GitHub Copilot", color: "#333" },
  kiro: { label: "Kiro AI", color: "#FF6B35" },
  "amazon-q": { label: "Amazon Q", color: "#FF9900" },
  codex: { label: "OpenAI Codex", color: "#10A37F" },
  claude: { label: "Claude Code", color: "#D97757" },
  glm: { label: "GLM (Z.AI)", color: "#4A90D9" },
  glmt: { label: "GLM Thinking", color: "#2563EB" },
  "kimi-coding": { label: "Kimi Coding", color: "#1E3A8A" },
  minimax: { label: "MiniMax", color: "#7C3AED" },
  "minimax-cn": { label: "MiniMax CN", color: "#DC2626" },
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

// Get bar color based on remaining percentage
function getBarColor(remainingPercentage) {
  if (remainingPercentage > QUOTA_BAR_GREEN_THRESHOLD) {
    return { bar: "#22c55e", text: "#22c55e", bg: "rgba(34,197,94,0.12)" };
  }
  if (remainingPercentage > QUOTA_BAR_YELLOW_THRESHOLD) {
    return { bar: "#eab308", text: "#eab308", bg: "rgba(234,179,8,0.12)" };
  }
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
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const [connections, setConnections] = useState([]);
  const [quotaData, setQuotaData] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Record<string, string>>({});
  const [refreshingAll, setRefreshingAll] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [tierFilter, setTierFilter] = useState("all");
  const [groupBy, setGroupBy] = useState<"none" | "environment">(() => {
    if (typeof window === "undefined") return "none";
    const saved = localStorage.getItem(LS_GROUP_BY);
    if (saved === "environment" || saved === "none") return saved;
    return "none";
  });
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const saved = localStorage.getItem(LS_EXPANDED_GROUPS);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const lastFetchTimeRef = useRef({});
  const staleProbeRef = useRef({});

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

  const applyCachedQuotaState = useCallback((connectionList, caches) => {
    const nextQuotaData = {};
    const nextLastRefreshedAt = {};

    for (const conn of connectionList) {
      const cached = caches?.[conn.id];
      if (!cached) continue;

      nextQuotaData[conn.id] = {
        quotas: parseQuotaData(conn.provider, cached),
        plan: cached.plan || null,
        message: cached.message || null,
        raw: cached,
      };

      if (cached.fetchedAt) {
        nextLastRefreshedAt[conn.id] = cached.fetchedAt;
      }
    }

    setQuotaData(nextQuotaData);
    setLastRefreshedAt(nextLastRefreshedAt);
  }, []);

  const fetchCachedProviderLimits = useCallback(async () => {
    try {
      const response = await fetch("/api/usage/provider-limits");
      if (!response.ok) throw new Error("Failed");
      const data = await response.json();
      return data.caches || {};
    } catch {
      return {};
    }
  }, []);

  const fetchQuota = useCallback(
    async (connectionId, provider, options: { force?: boolean } = {}) => {
      const force = options?.force === true;
      // Debounce: skip if last fetch was < MIN_FETCH_INTERVAL_MS ago
      const now = Date.now();
      const lastFetch = lastFetchTimeRef.current[connectionId] || 0;
      if (!force && now - lastFetch < MIN_FETCH_INTERVAL_MS) {
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

        // T13: If resetAt already passed but provider still returned stale cumulative usage,
        // display 0 immediately and trigger a background probe to refresh snapshot.
        const hasStaleAfterReset = parsedQuotas.some((q) => q?.staleAfterReset === true);
        if (hasStaleAfterReset) {
          const lastProbeAt = staleProbeRef.current[connectionId] || 0;
          if (Date.now() - lastProbeAt >= MIN_FETCH_INTERVAL_MS) {
            staleProbeRef.current[connectionId] = Date.now();
            setTimeout(() => {
              fetchQuota(connectionId, provider, { force: true }).catch(() => {});
            }, 5000);
          }
        }

        setQuotaData((prev) => ({
          ...prev,
          [connectionId]: {
            quotas: parsedQuotas,
            plan: data.plan || null,
            message: data.message || null,
            raw: data,
          },
        }));
        setLastRefreshedAt((prev) => ({
          ...prev,
          [connectionId]: new Date().toISOString(),
        }));
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          [connectionId]: error.message || "Failed to fetch quota",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [connectionId]: false }));
      }
    },
    []
  );

  const refreshProvider = useCallback(
    async (connectionId, provider) => {
      await fetchQuota(connectionId, provider, { force: true });
    },
    [fetchQuota]
  );

  const refreshAll = useCallback(async () => {
    if (refreshingAll) return;
    setRefreshingAll(true);
    try {
      const response = await fetch("/api/usage/provider-limits", { method: "POST" });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.error || response.statusText;
        throw new Error(errorMsg);
      }

      const data = await response.json();
      const connectionList = await fetchConnections();
      applyCachedQuotaState(connectionList, data.caches || {});
      setErrors(data.errors || {});
    } catch (error) {
      console.error("Error refreshing all:", error);
    } finally {
      setRefreshingAll(false);
    }
  }, [refreshingAll, applyCachedQuotaState, fetchConnections]);

  useEffect(() => {
    const init = async () => {
      setInitialLoading(true);
      const [connectionList, caches] = await Promise.all([
        fetchConnections(),
        fetchCachedProviderLimits(),
      ]);
      applyCachedQuotaState(connectionList, caches);
      setInitialLoading(false);
    };
    init().catch(() => {
      setInitialLoading(false);
    });
  }, [applyCachedQuotaState, fetchCachedProviderLimits, fetchConnections]);

  const filteredConnections = useMemo(
    () =>
      connections.filter(
        (conn) =>
          USAGE_SUPPORTED_PROVIDERS.includes(conn.provider) &&
          (conn.authType === "oauth" || conn.authType === "apikey")
      ),
    [connections]
  );

  const sortedConnections = useMemo(() => {
    const priority = {
      antigravity: 1,
      "gemini-cli": 2,
      github: 3,
      codex: 4,
      claude: 5,
      kiro: 6,
      glm: 7,
      glmt: 8,
      "kimi-coding": 9,
      minimax: 10,
      "minimax-cn": 11,
    };
    return [...filteredConnections].sort(
      (a, b) => (priority[a.provider] || 9) - (priority[b.provider] || 9)
    );
  }, [filteredConnections]);

  const resolvedPlanByConnection = useMemo(() => {
    const out = {};
    for (const conn of sortedConnections) {
      out[conn.id] = resolvePlanValue(quotaData[conn.id]?.plan, conn.providerSpecificData);
    }
    return out;
  }, [sortedConnections, quotaData]);

  const tierByConnection = useMemo(() => {
    const out = {};
    for (const conn of sortedConnections) {
      out[conn.id] = normalizePlanTier(resolvedPlanByConnection[conn.id]);
    }
    return out;
  }, [sortedConnections, resolvedPlanByConnection]);

  const tierCounts = useMemo(() => {
    const counts = {
      all: sortedConnections.length,
      enterprise: 0,
      team: 0,
      business: 0,
      ultra: 0,
      pro: 0,
      plus: 0,
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

  const groupedConnections = useMemo(() => {
    if (groupBy !== "environment") return null;
    const groups = new Map();
    for (const conn of visibleConnections) {
      const key = (conn.providerSpecificData?.tag as string | undefined)?.trim() || t("ungrouped");
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(conn);
    }

    // Convert to sorted array based on tag string (ungrouped at the end)
    const sortedGroups = new Map(
      [...groups.entries()].sort(([a], [b]) => {
        if (a === t("ungrouped")) return 1;
        if (b === t("ungrouped")) return -1;
        return a.localeCompare(b);
      })
    );

    return sortedGroups;
  }, [groupBy, visibleConnections, t]);

  const handleSetGroupBy = (value: "none" | "environment") => {
    setGroupBy(value);
    localStorage.setItem(LS_GROUP_BY, value);
  };

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(groupName) ? next.delete(groupName) : next.add(groupName);
      localStorage.setItem(LS_EXPANDED_GROUPS, JSON.stringify([...next]));
      return next;
    });
  };

  // Default inteligente: se não há preferência salva e há connections com grupo, abre em Por Ambiente
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasSaved = localStorage.getItem(LS_GROUP_BY) !== null;
    if (
      !hasSaved &&
      connections.some((c) => (c.providerSpecificData?.tag as string | undefined)?.trim())
    ) {
      setGroupBy("environment");
    }
  }, [connections]);

  // Quando entra em modo environment pela primeira vez sem estado salvo, abre todos os grupos
  useEffect(() => {
    if (groupBy !== "environment" || !groupedConnections) return;
    if (expandedGroups.size === 0) {
      const allGroups = new Set([...groupedConnections.keys()]);
      setExpandedGroups(allGroups);
      localStorage.setItem(LS_EXPANDED_GROUPS, JSON.stringify([...allGroups]));
    }
  }, [groupBy, groupedConnections]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <EmailPrivacyToggle />
        </div>

        <div className="flex items-center gap-2">
          {/* Group by toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => handleSetGroupBy("none")}
              className="px-2.5 py-1.5 text-[12px] font-medium cursor-pointer border-none"
              style={{
                background: groupBy === "none" ? "var(--color-bg-subtle)" : "transparent",
                color: groupBy === "none" ? "var(--color-text-main)" : "var(--color-text-muted)",
              }}
            >
              {t("viewFlat")}
            </button>
            <button
              onClick={() => handleSetGroupBy("environment")}
              className="px-2.5 py-1.5 text-[12px] font-medium cursor-pointer border-none"
              style={{
                background: groupBy === "environment" ? "var(--color-bg-subtle)" : "transparent",
                color:
                  groupBy === "environment" ? "var(--color-text-main)" : "var(--color-text-muted)",
                borderLeft: "1px solid var(--color-border)",
              }}
            >
              {t("viewByEnvironment")}
            </button>
          </div>

          <button
            onClick={refreshAll}
            disabled={refreshingAll}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-bg-subtle border border-border text-text-main text-[13px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
                  ? "1px solid var(--color-primary, #E54D5E)"
                  : "1px solid var(--color-border)",
                background: active ? "rgba(229,77,94,0.1)" : "transparent",
                color: active ? "var(--color-primary, #E54D5E)" : "var(--color-text-muted)",
              }}
            >
              <span>{t(tier.labelKey)}</span>
              <span className="opacity-85">{tierCounts[tier.key] || 0}</span>
            </button>
          );
        })}
      </div>

      {/* Account rows */}
      <div className="rounded-xl border border-border overflow-hidden bg-surface">
        {/* Table header */}
        <div
          className="items-center px-4 py-2.5 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-text-muted"
          style={{ display: "grid", gridTemplateColumns: "280px 1fr 128px 48px" }}
        >
          <div>{t("account")}</div>
          <div>{t("modelQuotas")}</div>
          <div className="text-center">{t("lastUsed")}</div>
          <div className="text-center">{t("actions")}</div>
        </div>

        {(() => {
          const renderRow = (conn, isLast) => {
            const quota = quotaData[conn.id];
            const isLoading = loading[conn.id];
            const error = errors[conn.id];
            const config = PROVIDER_CONFIG[conn.provider] || {
              label: conn.provider,
              color: "#666",
            };
            const tierMeta = tierByConnection[conn.id] || normalizePlanTier(null);
            const resolvedPlan = resolvedPlanByConnection[conn.id];
            const refreshedAt = lastRefreshedAt[conn.id];

            return (
              <div
                key={conn.id}
                className="items-center px-4 py-3.5 transition-[background] duration-150 hover:bg-black/[0.03] dark:hover:bg-white/[0.02]"
                style={{
                  display: "grid",
                  gridTemplateColumns: "280px 1fr 128px 48px",
                  borderBottom: !isLast ? "1px solid var(--color-border)" : "none",
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
                      {pickDisplayValue(
                        [conn.name, conn.displayName, conn.email],
                        emailsVisible,
                        config.label
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 min-h-5">
                      <span
                        title={
                          resolvedPlan
                            ? t("rawPlanWithValue", { plan: resolvedPlan })
                            : t("noPlanFromProvider")
                        }
                        className="inline-flex items-center shrink-0"
                      >
                        <Badge
                          variant={tierMeta.variant}
                          size="sm"
                          dot
                          className="h-5 leading-none"
                        >
                          {tierMeta.label}
                        </Badge>
                      </span>
                      <span className="text-[11px] leading-none text-text-muted">
                        {config.label}
                      </span>
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
                      const remainingPercentage = q.unlimited
                        ? 100
                        : (q.remainingPercentage ?? calculatePercentage(q.used, q.total));
                      const colors = getBarColor(remainingPercentage);
                      const cd = formatCountdown(q.resetAt);
                      const shortName = formatQuotaLabel(q.name);
                      const staleAfterReset = q.staleAfterReset === true;

                      return (
                        <div
                          key={i}
                          className={`flex items-center gap-1.5 shrink-0 ${
                            i > 0 ? "border-l border-border/80 pl-3 ml-1" : ""
                          }`}
                        >
                          {q.isCredits ? (
                            /* ── AI Credits counter ── */
                            <>
                              <span
                                className="text-[11px] font-semibold py-0.5 px-2 rounded whitespace-nowrap"
                                style={{ background: colors.bg, color: colors.text }}
                              >
                                🪙 {formatQuotaLabel(q.name)}
                              </span>
                              <span
                                className="text-[12px] font-bold tabular-nums"
                                style={{ color: colors.text }}
                              >
                                {q.creditCount ?? q.remaining}
                              </span>
                              <span className="text-[10px] text-text-muted">left</span>
                            </>
                          ) : (
                            /* ── Standard quota bar ── */
                            <>
                              {/* Model label */}
                              <span
                                title={q.modelKey || q.name}
                                className="text-[11px] font-semibold py-0.5 px-2 rounded whitespace-nowrap min-w-[60px] text-center"
                                style={{ background: colors.bg, color: colors.text }}
                              >
                                {shortName}
                              </span>

                              {/* Countdown */}
                              {staleAfterReset ? (
                                <span className="text-[10px] text-text-muted whitespace-nowrap">
                                  ⟳ Refreshing...
                                </span>
                              ) : cd ? (
                                <span className="text-[10px] text-text-muted whitespace-nowrap">
                                  ⏱ {cd}
                                </span>
                              ) : null}

                              {/* Progress bar */}
                              <div className="flex-1 h-1.5 rounded-sm bg-black/[0.06] dark:bg-white/[0.06] min-w-[60px] overflow-hidden">
                                <div
                                  className="h-full rounded-sm transition-[width] duration-300 ease-out"
                                  style={{
                                    width: `${Math.min(remainingPercentage, 100)}%`,
                                    background: colors.bar,
                                  }}
                                />
                              </div>

                              {/* Percentage */}
                              <span
                                className="text-[11px] font-semibold min-w-[32px] text-right"
                                style={{ color: colors.text }}
                              >
                                {remainingPercentage}%
                              </span>
                            </>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-xs text-text-muted italic">{t("noQuotaData")}</div>
                  )}
                </div>

                {/* Last Refreshed */}
                <div className="text-center text-[11px] text-text-muted">
                  {refreshedAt ? (
                    <span>
                      {new Date(refreshedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      })}
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
          };

          if (groupedConnections) {
            const entries = [...groupedConnections.entries()];
            return entries.map(([groupName, conns]) => (
              <div key={groupName} className="border border-border rounded-lg overflow-hidden mb-2">
                <button
                  onClick={() => toggleGroup(groupName)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 bg-bg-subtle hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors text-left border-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-text-muted">
                    {expandedGroups.has(groupName) ? "expand_less" : "expand_more"}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-text-muted">
                    folder
                  </span>
                  <span className="text-[12px] font-semibold text-text-main uppercase tracking-wider flex-1">
                    {groupName}
                  </span>
                  <span className="text-[11px] text-text-muted bg-black/[0.04] dark:bg-white/[0.06] px-2 py-0.5 rounded-full">
                    {conns.length}
                  </span>
                </button>
                {expandedGroups.has(groupName) && (
                  <div>{conns.map((conn, idx) => renderRow(conn, idx === conns.length - 1))}</div>
                )}
              </div>
            ));
          }

          return visibleConnections.map((conn, idx) =>
            renderRow(conn, idx === visibleConnections.length - 1)
          );
        })()}

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
