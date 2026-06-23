"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  parseQuotaData,
  formatQuotaLabel,
  formatCountdown,
  normalizePlanTier,
  resolvePlanValue,
  calculatePercentage,
  matchesProviderFilter,
  buildProviderOptions,
} from "./utils";
import Card from "@/shared/components/Card";
import { CardSkeleton } from "@/shared/components/Loading";
import { USAGE_SUPPORTED_PROVIDERS } from "@/shared/constants/providers";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { useNotificationStore } from "@/store/notificationStore";
import QuotaCutoffModal from "./QuotaCutoffModal";
import QuotaCardGrid from "./QuotaCardGrid";
import { useVisibleQuotaData } from "./useVisibleQuotaData";
import { formatAutoRefreshCountdown } from "./formatters";
import { translateUsageOrFallback, type UsageTranslationValues } from "./i18nFallback";
import { compareTr } from "@/shared/utils/turkishText";

const LS_PURCHASE_FILTER = "omniroute:limits:purchaseFilter";
const LS_STATUS_FILTER = "omniroute:limits:statusFilter";
const LS_ENV_FILTER = "omniroute:limits:envFilter";
const LS_PROVIDER_FILTER = "omniroute:limits:providerFilter";

const MIN_FETCH_INTERVAL_MS = 30000;
const QUOTA_BAR_GREEN_THRESHOLD = 50;
const QUOTA_BAR_YELLOW_THRESHOLD = 20;

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
  "opencode-go": "OpenCode Go",
  "ollama-cloud": "Ollama Cloud",
  "kimi-coding": "Kimi Coding",
  minimax: "MiniMax",
  "minimax-cn": "MiniMax CN",
  nanogpt: "NanoGPT",
  deepseek: "DeepSeek",
};

// Group ordering — single source of truth for provider placement.
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
  "opencode-go": 10,
  "ollama-cloud": 11,
  "kimi-coding": 12,
  minimax: 13,
  "minimax-cn": 14,
  nanogpt: 15,
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

function shouldAutoRefreshQuota(provider: string, cached: any): boolean {
  const quotas = cached?.quotas;
  if (!Array.isArray(quotas) || quotas.length === 0) return true;
  if (provider !== "antigravity" && provider !== "agy") return false;

  return quotas.some(
    (q: any) =>
      q &&
      typeof q.modelKey === "string" &&
      q.modelKey.startsWith("gemini-") &&
      !q.isCredits &&
      q.quotaSource !== "retrieveUserQuota"
  );
}

const getQuotaBarWidthClass = (pct: number) => {
  if (pct <= 10) return "w-[10%]";
  if (pct <= 20) return "w-1/5";
  if (pct <= 30) return "w-[30%]";
  if (pct <= 40) return "w-2/5";
  if (pct <= 50) return "w-1/2";
  if (pct <= 60) return "w-3/5";
  if (pct <= 70) return "w-[70%]";
  if (pct <= 80) return "w-4/5";
  if (pct <= 90) return "w-[90%]";
  return "w-full";
};

const getQuotaToneClasses = (pct: number) => {
  if (pct <= QUOTA_BAR_YELLOW_THRESHOLD) return "bg-red-500 text-red-500";
  if (pct <= QUOTA_BAR_GREEN_THRESHOLD) return "bg-yellow-500 text-yellow-500";
  return "bg-green-500 text-green-500";
};

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

interface ProviderLimitsProps {
  showFilters?: boolean;
  autoRefreshInterval?: number;
}

export default function ProviderLimits({
  showFilters = true,
  autoRefreshInterval = 0,
}: ProviderLimitsProps) {
  const t = useTranslations("usage");
  const tr = useCallback(
    (key: string, fallback: string, values?: UsageTranslationValues) =>
      translateUsageOrFallback(t, key, fallback, values),
    [t]
  );
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const notify = useNotificationStore();
  const [connections, setConnections] = useState<any[]>([]);
  const [togglingActiveId, setTogglingActiveId] = useState<string | null>(null);
  const [quotaData, setQuotaData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Record<string, string>>({});
  const [refreshingAll, setRefreshingAll] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [tierFilter, setTierFilter] = useState("all");

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
  const [providerFilter, setProviderFilter] = useState<string>(() => {
    if (typeof window === "undefined") return "all";
    return localStorage.getItem(LS_PROVIDER_FILTER) || "all";
  });

  const lastFetchTimeRef = useRef<Record<string, number>>({});
  const staleProbeRef = useRef<Record<string, number>>({});
  const lastRefreshAllAtRef = useRef<number>(Date.now());
  const autoRefreshIntervalMs = autoRefreshInterval > 0 ? autoRefreshInterval * 1000 : 0;
  const [autoRefreshClock, setAutoRefreshClock] = useState(() => Date.now());
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

  // Toggle a connection's active state straight from the quota overview, so an
  // operator can park an account that is being routed to despite low quota.
  // Mirrors saveQuotaWindowThresholds: PUT /api/providers/[id] + optimistic state.
  const handleToggleActive = useCallback(
    async (connectionId: string, nextActive: boolean) => {
      setTogglingActiveId(connectionId);
      try {
        const res = await fetch(`/api/providers/${connectionId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: nextActive }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setConnections((prev) =>
          prev.map((c) => (c.id === connectionId ? { ...c, isActive: nextActive } : c))
        );
        notify.success(
          nextActive
            ? tr("accountActivated", "Account activated")
            : tr("accountDeactivated", "Account deactivated")
        );
      } catch {
        notify.error(tr("toggleActiveFailed", "Failed to update account status"));
      } finally {
        setTogglingActiveId(null);
      }
    },
    [notify, tr]
  );

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
            // The on-demand path already attempts a forced, serialized re-mint
            // before surfacing a 401, so a 401 here means the token is genuinely
            // dead — make that actionable instead of a silent empty card.
            const reauthMsg = /re-?authenticat|sign in|log in/i.test(errorMsg)
              ? errorMsg
              : `${errorMsg} — re-authenticate this account.`;
            setQuotaData((prev) => ({
              ...prev,
              [connectionId]: { quotas: [], message: reauthMsg },
            }));
            setErrors((prev) => ({ ...prev, [connectionId]: reauthMsg }));
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
    const now = Date.now();
    lastRefreshAllAtRef.current = now;
    setAutoRefreshClock(now);
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
    if (autoRefreshClock - lastRefreshAllAtRef.current >= autoRefreshIntervalMs) {
      void refreshAll();
    }
  }, [autoRefreshClock, autoRefreshIntervalMs, refreshAll]);

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
  const visibleQuotaData = useVisibleQuotaData(sortedConnections, quotaData);

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
      out[conn.id] = getWorstStatus(visibleQuotaData[conn.id]?.quotas);
    }
    return out;
  }, [sortedConnections, visibleQuotaData]);

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
    return [...tags].sort((a, b) => compareTr(a, b));
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
      if (!matchesProviderFilter(conn, providerFilter)) return false;
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
      const ra = getSoonestResetMs(visibleQuotaData[a.id]?.quotas);
      const rb = getSoonestResetMs(visibleQuotaData[b.id]?.quotas);
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
    providerFilter,
    visibleQuotaData,
  ]);

  // Distinct provider keys present in the current connection set (after the
  // upstream OAuth/api-key + USAGE_SUPPORTED_PROVIDERS filter), sorted via
  // the i18n-aware comparator so the dropdown follows the locale's collation.
  const providerOptions = useMemo(
    () => buildProviderOptions(sortedConnections, compareTr),
    [sortedConnections]
  );

  // Auto-fetch LIVE quota on open for visible connections that have no cached
  // quota yet (e.g. a Codex account whose access_token expired — its per-connection
  // live fetch refreshes the token serialized/cascade-safe and surfaces real quota).
  // Scoped to what's on screen and to the entries actually missing data (the ones
  // that already have cache render instantly and are not re-fetched), and runs once
  // per page open so it never loops on the quotaData it writes.
  const autoLiveFetchedRef = useRef(false);
  useEffect(() => {
    if (initialLoading || autoLiveFetchedRef.current || visibleConnections.length === 0) return;
    autoLiveFetchedRef.current = true;
    for (const conn of visibleConnections) {
      const cached = quotaData[conn.id];
      if (shouldAutoRefreshQuota(conn.provider, cached)) {
        void fetchQuota(conn.id, conn.provider, { force: true }).catch(() => {});
      }
    }
  }, [initialLoading, visibleConnections, quotaData, fetchQuota]);

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

  const handleSetProviderFilter = useCallback((value: string) => {
    setProviderFilter(value);
    try {
      localStorage.setItem(LS_PROVIDER_FILTER, value);
    } catch {
      /* ignore */
    }
  }, []);

  const renderInlineQuotaSummary = (quotas: any[]) => {
    if (!quotas || quotas.length === 0) return null;
    return (
      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-text-muted">
        {quotas.slice(0, 3).map((q, index) => {
          const pct = q.unlimited
            ? 100
            : Math.round(q.remainingPercentage ?? calculatePercentage(q.used, q.total));
          const cd = formatCountdown(q.resetAt);
          const tone = getQuotaToneClasses(pct);
          return (
            <span
              key={`${q.name || "quota"}-${q.modelKey || ""}-${index}`}
              className="inline-flex items-center gap-1"
              title={q.displayName || formatQuotaLabel(q.name)}
            >
              <span className={`tabular-nums ${tone.split(" ")[1]}`}>
                {q.unlimited ? "∞" : `${pct}%`}
              </span>
              {!q.unlimited && (
                <span className="h-1 w-14 rounded-sm bg-border/60 overflow-hidden">
                  <span
                    className={`block h-full ${tone.split(" ")[0]} ${getQuotaBarWidthClass(pct)}`}
                  />
                </span>
              )}
              {cd ? <span>{`⏱ ${cd}`}</span> : null}
            </span>
          );
        })}
      </div>
    );
  };

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

        <button
          onClick={refreshAll}
          disabled={refreshingAll}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-bg-subtle border border-border text-text-main text-[13px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          title={
            autoRefreshIntervalMs > 0 ? tr("autoRefreshing", "Auto-refreshing") : t("refreshAll")
          }
        >
          <span
            className={`material-symbols-outlined text-[16px] ${refreshingAll ? "animate-spin" : ""}`}
          >
            {autoRefreshIntervalMs > 0 ? "schedule" : "refresh"}
          </span>
          {refreshingAll
            ? tr("refreshing", "Refreshing")
            : autoRefreshIntervalMs > 0
              ? `${tr("autoRefreshing", "Auto-refreshing")} ${formatAutoRefreshCountdown(
                  Math.max(
                    0,
                    autoRefreshIntervalMs - (autoRefreshClock - lastRefreshAllAtRef.current)
                  )
                )}`
              : t("refreshAll")}
        </button>
      </div>

      {showFilters && (
        <>
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

          {/* Provider filter — single-select dropdown of providers actually
              present in the current account set. Auto-falls back to "all" if
              the persisted choice no longer exists in this session. */}
          {providerOptions.length > 1 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold mr-1">
                {tr("filterProviderLabel", "Provider")}
              </span>
              <select
                value={
                  providerFilter === "all" || providerOptions.includes(providerFilter)
                    ? providerFilter
                    : "all"
                }
                onChange={(event) => handleSetProviderFilter(event.target.value)}
                aria-label={tr("filterProviderAriaLabel", "Filter quota providers")}
                className="h-8 rounded-full border border-border bg-transparent px-3 text-xs font-semibold text-text-muted cursor-pointer"
              >
                <option value="all">{tr("filterProviderAll", "All providers")}</option>
                {providerOptions.map((provider) => (
                  <option key={provider} value={provider}>
                    {PROVIDER_LABEL[provider] || provider}
                  </option>
                ))}
              </select>
            </div>
          )}

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
        </>
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

        <QuotaCardGrid
          connections={visibleConnections}
          quotaData={visibleQuotaData}
          loading={loading}
          errors={errors}
          lastRefreshedAt={lastRefreshedAt}
          emailsVisible={emailsVisible}
          providerLabels={PROVIDER_LABEL}
          renderInlineQuotaSummary={(quota) => renderInlineQuotaSummary(quota.quotas)}
          onRefresh={refreshProvider}
          onOpenCutoff={(conn) => {
            const windows = (visibleQuotaData[conn.id]?.quotas || []).filter(
              (q: any) => q && typeof q.name === "string" && !q.isCredits
            );
            setCutoffModalWindows(windows);
            setCutoffModalConn(conn);
          }}
          onToggleActive={handleToggleActive}
          togglingActiveId={togglingActiveId}
        />
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
