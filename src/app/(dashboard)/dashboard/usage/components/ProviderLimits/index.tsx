"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  parseQuotaData,
  formatQuotaLabel,
  normalizePlanTier,
  resolvePlanValue,
  calculatePercentage,
} from "./utils";
import Card from "@/shared/components/Card";
import { CardSkeleton } from "@/shared/components/Loading";
import { USAGE_SUPPORTED_PROVIDERS } from "@/shared/constants/providers";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import EmailPrivacyToggle from "@/shared/components/EmailPrivacyToggle";
import QuotaCutoffModal from "./QuotaCutoffModal";
import ProviderGroup, { buildGridTemplate } from "./ProviderGroup";
import AccountRow from "./AccountRow";
import { getProviderColumns, groupConnectionsByProvider } from "./providerColumns";
import { translateUsageOrFallback, type UsageTranslationValues } from "./i18nFallback";

const LS_EXPANDED_ROWS = "omniroute:limits:expandedRows";
const LS_PURCHASE_FILTER = "omniroute:limits:purchaseFilter";
const LS_STATUS_FILTER = "omniroute:limits:statusFilter";
const LS_ENV_FILTER = "omniroute:limits:envFilter";

const MIN_FETCH_INTERVAL_MS = 30000;
const QUOTA_BAR_GREEN_THRESHOLD = 50;
const QUOTA_BAR_YELLOW_THRESHOLD = 20;

// Display label per known provider; the icon is resolved by ProviderIcon.
const PROVIDER_LABEL: Record<string, string> = {
  antigravity: "Antigravity",
  "gemini-cli": "Gemini CLI",
  github: "GitHub Copilot",
  kiro: "Kiro AI",
  "amazon-q": "Amazon Q",
  codex: "OpenAI Codex",
  claude: "Claude Code",
  glm: "GLM (Z.AI)",
  zai: "Z.AI",
  glmt: "GLM Thinking",
  "kimi-coding": "Kimi Coding",
  minimax: "MiniMax",
  "minimax-cn": "MiniMax CN",
  nanogpt: "NanoGPT",
  deepseek: "DeepSeek",
};

// Group ordering — single source of truth for "where does Codex sit
// relative to Antigravity on the page".
const PROVIDER_ORDER: Record<string, number> = {
  antigravity: 1,
  "gemini-cli": 2,
  github: 3,
  codex: 4,
  claude: 5,
  kiro: 6,
  glm: 7,
  zai: 8,
  glmt: 9,
  "kimi-coding": 10,
  minimax: 11,
  "minimax-cn": 12,
  nanogpt: 13,
};

const TIER_FILTERS = [
  { key: "all", labelKey: "tierAll" },
  { key: "enterprise", labelKey: "tierEnterprise" },
  { key: "team", labelKey: "tierTeam" },
  { key: "business", labelKey: "tierBusiness" },
  { key: "ultra", labelKey: "tierUltra" },
  { key: "pro", labelKey: "tierPro" },
  { key: "plus", labelKey: "tierPlus" },
  { key: "lite", labelKey: "tierLite" },
  { key: "free", labelKey: "tierFree" },
  { key: "unknown", labelKey: "tierUnknown" },
];

type PurchaseTypeKey = "all" | "oauth-free" | "oauth-sub" | "apikey";
type StatusKey = "all" | "critical" | "alert" | "ok" | "empty";

const PURCHASE_TYPES: Array<{ key: PurchaseTypeKey; labelKey: string; fallback: string }> = [
  { key: "all", labelKey: "purchaseAll", fallback: "All" },
  { key: "oauth-sub", labelKey: "purchaseOauthSub", fallback: "Subscription" },
  { key: "oauth-free", labelKey: "purchaseOauthFree", fallback: "OAuth Free" },
  { key: "apikey", labelKey: "purchaseApiKey", fallback: "API Key" },
];

function getPurchaseType(authType: string | undefined, tierKey: string): PurchaseTypeKey {
  if (authType === "apikey") return "apikey";
  if (authType === "oauth") {
    if (tierKey === "free" || tierKey === "unknown") return "oauth-free";
    return "oauth-sub";
  }
  return "oauth-free";
}

function getWorstStatus(quotas: any[] | undefined): StatusKey {
  if (!quotas || quotas.length === 0) return "empty";
  let worst: "ok" | "alert" = "ok";
  for (const q of quotas) {
    const pct = q.unlimited ? 100 : (q.remainingPercentage ?? calculatePercentage(q.used, q.total));
    if (pct <= QUOTA_BAR_YELLOW_THRESHOLD) return "critical";
    if (pct <= QUOTA_BAR_GREEN_THRESHOLD && worst === "ok") worst = "alert";
  }
  return worst;
}

function getSoonestResetMs(quotas: any[] | undefined): number {
  if (!quotas || quotas.length === 0) return Number.POSITIVE_INFINITY;
  const now = Date.now();
  let soonest = Number.POSITIVE_INFINITY;
  for (const q of quotas) {
    if (!q?.resetAt) continue;
    const ts = new Date(q.resetAt).getTime();
    if (Number.isFinite(ts) && ts > now && ts < soonest) soonest = ts;
  }
  return soonest;
}

const STATUS_TONE: Record<
  StatusKey,
  { bar: string; text: string; bg: string; ring: string; dot: string }
> = {
  all: {
    bar: "var(--color-text-muted)",
    text: "var(--color-text-main)",
    bg: "var(--color-bg-subtle)",
    ring: "var(--color-border)",
    dot: "var(--color-text-muted)",
  },
  critical: {
    bar: "#ef4444",
    text: "#ef4444",
    bg: "rgba(239,68,68,0.10)",
    ring: "rgba(239,68,68,0.40)",
    dot: "#ef4444",
  },
  alert: {
    bar: "#eab308",
    text: "#eab308",
    bg: "rgba(234,179,8,0.10)",
    ring: "rgba(234,179,8,0.40)",
    dot: "#eab308",
  },
  ok: {
    bar: "#22c55e",
    text: "#22c55e",
    bg: "rgba(34,197,94,0.10)",
    ring: "rgba(34,197,94,0.40)",
    dot: "#22c55e",
  },
  empty: {
    bar: "var(--color-text-muted)",
    text: "var(--color-text-muted)",
    bg: "var(--color-bg-subtle)",
    ring: "var(--color-border)",
    dot: "var(--color-text-muted)",
  },
};

// Worst aggregate across a list of statuses — drives the group header dot.
function aggregateWorst(statuses: StatusKey[]): "critical" | "alert" | "ok" | "empty" {
  let worst: "ok" | "alert" | "empty" = "empty";
  for (const s of statuses) {
    if (s === "critical") return "critical";
    if (s === "alert" && worst !== "alert") worst = "alert";
    if (s === "ok" && worst === "empty") worst = "ok";
  }
  return worst;
}

export default function ProviderLimits() {
  const t = useTranslations("usage");
  const tr = useCallback(
    (key: string, fallback: string, values?: UsageTranslationValues) =>
      translateUsageOrFallback(t, key, fallback, values),
    [t]
  );
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const [connections, setConnections] = useState<any[]>([]);
  const [quotaData, setQuotaData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Record<string, string>>({});
  const [refreshingAll, setRefreshingAll] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [tierFilter, setTierFilter] = useState("all");

  const [expandedRows, setExpandedRows] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const saved = localStorage.getItem(LS_EXPANDED_ROWS);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [purchaseTypeFilter, setPurchaseTypeFilter] = useState<PurchaseTypeKey>(() => {
    if (typeof window === "undefined") return "all";
    const saved = localStorage.getItem(LS_PURCHASE_FILTER) as PurchaseTypeKey | null;
    return saved && PURCHASE_TYPES.some((p) => p.key === saved) ? saved : "all";
  });
  const [statusFilter, setStatusFilter] = useState<StatusKey>(() => {
    if (typeof window === "undefined") return "all";
    const saved = localStorage.getItem(LS_STATUS_FILTER) as StatusKey | null;
    if (saved === "all" || saved === "critical" || saved === "alert" || saved === "ok")
      return saved;
    return "all";
  });
  const [envFilter, setEnvFilter] = useState<string>(() => {
    if (typeof window === "undefined") return "all";
    return localStorage.getItem(LS_ENV_FILTER) || "all";
  });

  // Per-group bulk-refresh state; one spinner per provider key.
  const [refreshingGroups, setRefreshingGroups] = useState<Set<string>>(new Set());

  const lastFetchTimeRef = useRef<Record<string, number>>({});
  const staleProbeRef = useRef<Record<string, number>>({});
  const [cutoffModalConn, setCutoffModalConn] = useState<any | null>(null);
  const [cutoffModalWindows, setCutoffModalWindows] = useState<any[]>([]);
  const [providerWindowDefaults, setProviderWindowDefaults] = useState<
    Record<string, Record<string, number>>
  >({});
  const [globalThresholdDefault, setGlobalThresholdDefault] = useState<number>(98);

  useEffect(() => {
    let alive = true;
    fetch("/api/providers/quota-windows")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive || !data) return;
        setProviderWindowDefaults(data.defaults?.providerWindowDefaults || {});
        if (typeof data.defaults?.globalThresholdPercent === "number") {
          setGlobalThresholdDefault(data.defaults.globalThresholdPercent);
        }
      })
      .catch(() => {
        /* fail silent — modal still works with empty defaults */
      });
    return () => {
      alive = false;
    };
  }, []);

  const saveQuotaWindowThresholds = useCallback(
    async (connectionId: string, patch: Record<string, number | null> | null) => {
      const res = await fetch(`/api/providers/${connectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quotaWindowThresholds: patch }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const newValue = data?.connection?.quotaWindowThresholds ?? null;
      setConnections((prev) =>
        prev.map((c) => (c.id === connectionId ? { ...c, quotaWindowThresholds: newValue } : c))
      );
    },
    []
  );

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

  const applyCachedQuotaState = useCallback(
    (connectionList: any[], caches: Record<string, any>) => {
      const nextQuotaData: Record<string, any> = {};
      const nextLastRefreshedAt: Record<string, string> = {};

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
    },
    []
  );

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
    async (connectionId: string, provider: string, options: { force?: boolean } = {}) => {
      const force = options?.force === true;
      const now = Date.now();
      const lastFetch = lastFetchTimeRef.current[connectionId] || 0;
      if (!force && now - lastFetch < MIN_FETCH_INTERVAL_MS) {
        return;
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

        const hasStaleAfterReset = parsedQuotas.some((q: any) => q?.staleAfterReset === true);
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
            stale: data._stale ? { since: data._staleSince, reason: data._staleReason } : null,
          },
        }));
        setLastRefreshedAt((prev) => ({
          ...prev,
          [connectionId]: new Date().toISOString(),
        }));
      } catch (error: any) {
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
    async (connectionId: string, provider: string) => {
      await fetchQuota(connectionId, provider, { force: true });
    },
    [fetchQuota]
  );

  const refreshingAllRef = useRef(false);
  const refreshAll = useCallback(async () => {
    if (refreshingAllRef.current) return;
    refreshingAllRef.current = true;
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
      refreshingAllRef.current = false;
      setRefreshingAll(false);
    }
  }, [applyCachedQuotaState, fetchConnections]);

  // Bulk refresh all accounts inside one provider group. The per-account
  // loading indicator is updated by each fetchQuota call; the group spinner
  // is just a wrapper that flips while the Promise.all is in flight.
  const refreshProviderGroup = useCallback(
    async (providerKey: string, accountIds: string[]) => {
      setRefreshingGroups((prev) => {
        if (prev.has(providerKey)) return prev;
        const next = new Set(prev);
        next.add(providerKey);
        return next;
      });
      try {
        await Promise.all(accountIds.map((id) => fetchQuota(id, providerKey, { force: true })));
      } finally {
        setRefreshingGroups((prev) => {
          if (!prev.has(providerKey)) return prev;
          const next = new Set(prev);
          next.delete(providerKey);
          return next;
        });
      }
    },
    [fetchQuota]
  );

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
    return [...filteredConnections].sort(
      (a, b) => (PROVIDER_ORDER[a.provider] || 99) - (PROVIDER_ORDER[b.provider] || 99)
    );
  }, [filteredConnections]);

  const resolvedPlanByConnection = useMemo(() => {
    const out: Record<string, string | null> = {};
    for (const conn of sortedConnections) {
      out[conn.id] = resolvePlanValue(quotaData[conn.id]?.plan, conn.providerSpecificData);
    }
    return out;
  }, [sortedConnections, quotaData]);

  const tierByConnection = useMemo(() => {
    const out: Record<string, ReturnType<typeof normalizePlanTier>> = {};
    for (const conn of sortedConnections) {
      out[conn.id] = normalizePlanTier(resolvedPlanByConnection[conn.id]);
    }
    return out;
  }, [sortedConnections, resolvedPlanByConnection]);

  const tierCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: sortedConnections.length,
      enterprise: 0,
      team: 0,
      business: 0,
      ultra: 0,
      pro: 0,
      plus: 0,
      lite: 0,
      free: 0,
      unknown: 0,
    };
    for (const conn of sortedConnections) {
      const tierKey = tierByConnection[conn.id]?.key || "unknown";
      counts[tierKey] = (counts[tierKey] || 0) + 1;
    }
    return counts;
  }, [sortedConnections, tierByConnection]);

  const purchaseTypeByConnection = useMemo(() => {
    const out: Record<string, PurchaseTypeKey> = {};
    for (const conn of sortedConnections) {
      const tierKey = tierByConnection[conn.id]?.key || "unknown";
      out[conn.id] = getPurchaseType(conn.authType, tierKey);
    }
    return out;
  }, [sortedConnections, tierByConnection]);

  const statusByConnection = useMemo(() => {
    const out: Record<string, StatusKey> = {};
    for (const conn of sortedConnections) {
      out[conn.id] = getWorstStatus(quotaData[conn.id]?.quotas);
    }
    return out;
  }, [sortedConnections, quotaData]);

  const purchaseTypeCounts = useMemo(() => {
    const counts: Record<PurchaseTypeKey, number> = {
      all: sortedConnections.length,
      "oauth-sub": 0,
      "oauth-free": 0,
      apikey: 0,
    };
    for (const conn of sortedConnections) {
      const key = purchaseTypeByConnection[conn.id];
      if (key && key !== "all") counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }, [sortedConnections, purchaseTypeByConnection]);

  const statusCounts = useMemo(() => {
    const counts: Record<StatusKey, number> = {
      all: sortedConnections.length,
      critical: 0,
      alert: 0,
      ok: 0,
      empty: 0,
    };
    for (const conn of sortedConnections) {
      const key = statusByConnection[conn.id] || "empty";
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }, [sortedConnections, statusByConnection]);

  // Unique env tags from connections.providerSpecificData.tag — drives the
  // env chip filter. If no tag is set on any connection, the row hides.
  const envTags = useMemo(() => {
    const tags = new Set<string>();
    for (const conn of sortedConnections) {
      const tag = (conn.providerSpecificData?.tag as string | undefined)?.trim();
      if (tag) tags.add(tag);
    }
    return [...tags].sort((a, b) => a.localeCompare(b));
  }, [sortedConnections]);

  const envCounts = useMemo(() => {
    const counts: Record<string, number> = { all: sortedConnections.length };
    for (const conn of sortedConnections) {
      const tag = (conn.providerSpecificData?.tag as string | undefined)?.trim() || "";
      if (!tag) continue;
      counts[tag] = (counts[tag] || 0) + 1;
    }
    return counts;
  }, [sortedConnections]);

  const visibleConnections = useMemo(() => {
    const filtered = sortedConnections.filter((conn) => {
      const tierKey = tierByConnection[conn.id]?.key || "unknown";
      if (tierFilter !== "all" && tierKey !== tierFilter) return false;
      if (purchaseTypeFilter !== "all" && purchaseTypeByConnection[conn.id] !== purchaseTypeFilter)
        return false;
      if (statusFilter !== "all" && statusByConnection[conn.id] !== statusFilter) return false;
      if (envFilter !== "all") {
        const tag = (conn.providerSpecificData?.tag as string | undefined)?.trim() || "";
        if (tag !== envFilter) return false;
      }
      return true;
    });

    // Inside each group we still want "critical first, then alert, then ok,
    // then empty; tiebreak by soonest reset". Provider order between groups
    // is enforced separately via PROVIDER_ORDER.
    const statusRank: Record<StatusKey, number> = {
      critical: 0,
      alert: 1,
      ok: 2,
      empty: 3,
      all: 4,
    };
    return [...filtered].sort((a, b) => {
      const sa = statusRank[statusByConnection[a.id] || "empty"];
      const sb = statusRank[statusByConnection[b.id] || "empty"];
      if (sa !== sb) return sa - sb;
      const ra = getSoonestResetMs(quotaData[a.id]?.quotas);
      const rb = getSoonestResetMs(quotaData[b.id]?.quotas);
      return ra - rb;
    });
  }, [
    sortedConnections,
    tierByConnection,
    tierFilter,
    purchaseTypeFilter,
    purchaseTypeByConnection,
    statusFilter,
    statusByConnection,
    envFilter,
    quotaData,
  ]);

  // Group visible connections by provider, then resort group keys by
  // PROVIDER_ORDER so the section sequence on the page is stable.
  const providerGroups = useMemo(() => {
    const groups = groupConnectionsByProvider(visibleConnections);
    return new Map(
      [...groups.entries()].sort(
        ([a], [b]) => (PROVIDER_ORDER[a] || 99) - (PROVIDER_ORDER[b] || 99)
      )
    );
  }, [visibleConnections]);

  const toggleRow = useCallback((connectionId: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      next.has(connectionId) ? next.delete(connectionId) : next.add(connectionId);
      try {
        localStorage.setItem(LS_EXPANDED_ROWS, JSON.stringify([...next]));
      } catch {
        /* localStorage may be unavailable; persistence is best-effort */
      }
      return next;
    });
  }, []);

  const handleSetPurchaseFilter = useCallback((value: PurchaseTypeKey) => {
    setPurchaseTypeFilter(value);
    try {
      localStorage.setItem(LS_PURCHASE_FILTER, value);
    } catch {
      /* ignore */
    }
  }, []);

  const handleSetStatusFilter = useCallback((value: StatusKey) => {
    setStatusFilter(value);
    try {
      localStorage.setItem(LS_STATUS_FILTER, value);
    } catch {
      /* ignore */
    }
  }, []);

  const handleSetEnvFilter = useCallback((value: string) => {
    setEnvFilter(value);
    try {
      localStorage.setItem(LS_ENV_FILTER, value);
    } catch {
      /* ignore */
    }
  }, []);

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

      {/* Summary stats — clickable status filter */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(["all", "critical", "alert", "ok"] as StatusKey[]).map((key) => {
          const tone = STATUS_TONE[key];
          const labelMap: Record<string, string> = {
            all: tr("statTotal", "Total"),
            critical: tr("statCritical", "Critical"),
            alert: tr("statAlert", "Alert"),
            ok: tr("statHealthy", "Healthy"),
          };
          const active = statusFilter === key;
          const count = statusCounts[key] || 0;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleSetStatusFilter(key)}
              className="text-left rounded-lg px-3 py-2.5 border transition-colors cursor-pointer"
              style={{
                background: active ? tone.bg : "var(--color-surface)",
                borderColor: active ? tone.ring : "var(--color-border)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted">
                  {labelMap[key]}
                </span>
                {key !== "all" && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: tone.dot }}
                    aria-hidden
                  />
                )}
              </div>
              <div
                className="mt-0.5 text-2xl font-bold tabular-nums"
                style={{ color: key === "all" ? "var(--color-text-main)" : tone.text }}
              >
                {count}
              </div>
            </button>
          );
        })}
      </div>

      {/* Purchase Type filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold mr-1">
          {tr("filterPurchaseTypeLabel", "Type")}
        </span>
        {PURCHASE_TYPES.map((type) => {
          const count = purchaseTypeCounts[type.key] || 0;
          if (type.key !== "all" && count === 0) return null;
          const active = purchaseTypeFilter === type.key;
          return (
            <button
              key={type.key}
              onClick={() => handleSetPurchaseFilter(type.key)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer"
              style={{
                border: active
                  ? "1px solid var(--color-primary, #E54D5E)"
                  : "1px solid var(--color-border)",
                background: active ? "rgba(229,77,94,0.1)" : "transparent",
                color: active ? "var(--color-primary, #E54D5E)" : "var(--color-text-muted)",
              }}
            >
              <span>{tr(type.labelKey, type.fallback)}</span>
              <span className="opacity-85">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Tier filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold mr-1">
          {tr("filterTierLabel", "Tier")}
        </span>
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
              <span>{tier.label || t(tier.labelKey!)}</span>
              <span className="opacity-85">{tierCounts[tier.key] || 0}</span>
            </button>
          );
        })}
      </div>

      {/* Env filter — only renders when at least one connection has a tag */}
      {envTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold mr-1">
            {tr("filterEnvLabel", "Env")}
          </span>
          {(["all", ...envTags] as string[]).map((tag) => {
            const count = envCounts[tag] || 0;
            const active = envFilter === tag;
            const label = tag === "all" ? tr("filterEnvAll", "All") : tag;
            return (
              <button
                key={tag}
                onClick={() => handleSetEnvFilter(tag)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer"
                style={{
                  border: active
                    ? "1px solid var(--color-primary, #E54D5E)"
                    : "1px solid var(--color-border)",
                  background: active ? "rgba(229,77,94,0.1)" : "transparent",
                  color: active ? "var(--color-primary, #E54D5E)" : "var(--color-text-muted)",
                }}
              >
                <span>{label}</span>
                <span className="opacity-85">{count}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Provider groups */}
      <div className="flex flex-col gap-3">
        {visibleConnections.length === 0 && (
          <div className="py-6 px-4 text-center text-text-muted text-[13px] rounded-lg border border-border bg-surface">
            {t("noAccountsForTierFilter")}{" "}
            <strong>
              {(() => {
                const tier = TIER_FILTERS.find((tier) => tier.key === tierFilter);
                return tier?.label || t(tier?.labelKey || "tierUnknown");
              })()}
            </strong>
            .
          </div>
        )}

        {[...providerGroups.entries()].map(([providerKey, conns]) => {
          // The group schema reflects the union of quotas across accounts so
          // an account that only has a session still lines up under the
          // session column even when its siblings also have weekly. We then
          // resolve per-row schemas using the same column *keys* so missing
          // windows render as em-dash cells.
          const allQuotas = conns.flatMap((c) => quotaData[c.id]?.quotas || []);
          const groupSchema = getProviderColumns(providerKey, allQuotas);
          const grid = buildGridTemplate(groupSchema.columns.length);
          const accountIds = conns.map((c) => c.id);
          const worstGroupStatus = aggregateWorst(
            conns.map((c) => statusByConnection[c.id] || "empty")
          );

          return (
            <ProviderGroup
              key={providerKey}
              providerKey={providerKey}
              providerLabel={PROVIDER_LABEL[providerKey] || providerKey}
              accountCount={conns.length}
              worstStatus={worstGroupStatus}
              columns={groupSchema.columns}
              overflowMax={groupSchema.overflowCount}
              isRefreshing={refreshingGroups.has(providerKey)}
              onRefreshGroup={() => refreshProviderGroup(providerKey, accountIds)}
            >
              {conns.map((conn, idx) => {
                const rowQuotas = quotaData[conn.id]?.quotas || [];
                const rowSchema = getProviderColumns(providerKey, rowQuotas);
                // Align each row's column array with the group header by key.
                // Missing windows on a row → null-quota cell; this keeps the
                // grid columns aligned even when accounts diverge.
                const rowColumns = groupSchema.columns.map((groupCol) => {
                  const match = rowSchema.columns.find((c) => c.key === groupCol.key);
                  return match || { ...groupCol, quota: null };
                });
                return (
                  <AccountRow
                    key={conn.id}
                    connection={conn}
                    quota={quotaData[conn.id]}
                    loading={!!loading[conn.id]}
                    error={errors[conn.id] || null}
                    refreshedAt={lastRefreshedAt[conn.id]}
                    tierMeta={tierByConnection[conn.id] || normalizePlanTier(null)}
                    resolvedPlan={resolvedPlanByConnection[conn.id]}
                    status={statusByConnection[conn.id] || "empty"}
                    statusTone={STATUS_TONE[statusByConnection[conn.id] || "empty"]}
                    columns={rowColumns}
                    overflowCount={rowSchema.overflowCount}
                    isExpanded={expandedRows.has(conn.id)}
                    emailsVisible={emailsVisible}
                    gridTemplateColumns={grid}
                    onToggle={() => toggleRow(conn.id)}
                    onRefresh={() => refreshProvider(conn.id, conn.provider)}
                    onOpenCutoff={() => {
                      const windows = (quotaData[conn.id]?.quotas || []).filter(
                        (q: any) => q && typeof q.name === "string" && !q.isCredits
                      );
                      setCutoffModalWindows(windows);
                      setCutoffModalConn(conn);
                    }}
                    isLast={idx === conns.length - 1}
                  />
                );
              })}
            </ProviderGroup>
          );
        })}
      </div>

      {cutoffModalConn && (
        <QuotaCutoffModal
          isOpen={!!cutoffModalConn}
          onClose={() => {
            setCutoffModalConn(null);
            setCutoffModalWindows([]);
          }}
          connectionName={
            pickDisplayValue(
              [cutoffModalConn.name, cutoffModalConn.displayName, cutoffModalConn.email],
              emailsVisible,
              cutoffModalConn.provider
            ) || cutoffModalConn.provider
          }
          provider={cutoffModalConn.provider}
          windows={cutoffModalWindows.map((q: any) => ({
            key: q.name,
            displayName: q.displayName || formatQuotaLabel(q.name),
          }))}
          current={cutoffModalConn.quotaWindowThresholds || null}
          providerDefaults={providerWindowDefaults[cutoffModalConn.provider] || {}}
          globalDefaultPercent={globalThresholdDefault}
          onSave={async (patch) => {
            await saveQuotaWindowThresholds(cutoffModalConn.id, patch);
            setCutoffModalConn((prev: any) => {
              if (!prev) return prev;
              if (patch === null) return { ...prev, quotaWindowThresholds: null };
              const next = { ...(prev.quotaWindowThresholds || {}) };
              for (const [k, v] of Object.entries(patch)) {
                if (v === null) delete next[k];
                else next[k] = v;
              }
              return {
                ...prev,
                quotaWindowThresholds: Object.keys(next).length === 0 ? null : next,
              };
            });
          }}
        />
      )}
    </div>
  );
}
