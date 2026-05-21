"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
import ProviderIcon from "@/shared/components/ProviderIcon";
import QuotaCutoffModal from "./QuotaCutoffModal";
import { translateUsageOrFallback, type UsageTranslationValues } from "./i18nFallback";

const LS_GROUP_BY = "omniroute:limits:groupBy";
const LS_EXPANDED_GROUPS = "omniroute:limits:expandedGroups";
const LS_EXPANDED_ROWS = "omniroute:limits:expandedRows";
const LS_PURCHASE_FILTER = "omniroute:limits:purchaseFilter";
const LS_STATUS_FILTER = "omniroute:limits:statusFilter";

const MIN_FETCH_INTERVAL_MS = 30000; // Debounce per-connection fetches
const QUOTA_BAR_GREEN_THRESHOLD = 50;
const QUOTA_BAR_YELLOW_THRESHOLD = 20;
const LIMITS_GRID_TEMPLATE_COLUMNS = "minmax(220px,260px) minmax(240px,1fr) 104px 76px 56px";

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
  zai: { label: "Z.AI", color: "#2563EB" },
  glmt: { label: "GLM Thinking", color: "#2563EB" },
  "kimi-coding": { label: "Kimi Coding", color: "#1E3A8A" },
  minimax: { label: "MiniMax", color: "#7C3AED" },
  "minimax-cn": { label: "MiniMax CN", color: "#DC2626" },
  nanogpt: { label: "NanoGPT", color: "#4F46E5" },
  deepseek: { label: "DeepSeek", color: "#4D6BFE" },
};

// Currency symbol mapping
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  CNY: "¥",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  KRW: "₩",
  INR: "₹",
};

const TIER_FILTERS = [
  { key: "all", labelKey: "tierAll" },
  { key: "enterprise", labelKey: "tierEnterprise" },
  { key: "team", labelKey: "tierTeam" },
  { key: "business", labelKey: "tierBusiness" },
  { key: "ultra", labelKey: "tierUltra" },
  { key: "pro", labelKey: "tierPro" },
  { key: "plus", labelKey: "tierPlus" },
  { key: "lite", label: "Lite" },
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

// Classify a connection into a purchase-type bucket. Free/unknown tiers on
// OAuth are treated as "oauth-free"; all other OAuth as "oauth-sub".
function getPurchaseType(authType: string | undefined, tierKey: string): PurchaseTypeKey {
  if (authType === "apikey") return "apikey";
  if (authType === "oauth") {
    if (tierKey === "free" || tierKey === "unknown") return "oauth-free";
    return "oauth-sub";
  }
  return "oauth-free";
}

// Worst-case status across a connection's quotas. "empty" only when there are
// no quota windows at all (covers credit-only providers via the isCredits
// branch separately).
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

// Soonest upcoming reset timestamp across a connection's quotas. Used to
// sort "expiring first". Returns Infinity when nothing is scheduled.
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

// Short label for a quota-window key, used in the inline cutoff summary
// ("session:90% · weekly:80%"). Unknown keys fall back to the key itself,
// shortened to keep the button compact.
function shortWindowLabel(key: string): string {
  const map: Record<string, string> = {
    session: "5h",
    weekly: "7d",
    code_review: "review",
  };
  return map[key] || (key.length > 8 ? `${key.slice(0, 7)}…` : key);
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
  const tr = useCallback(
    (key: string, fallback: string, values?: UsageTranslationValues) =>
      translateUsageOrFallback(t, key, fallback, values),
    [t]
  );
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

  const lastFetchTimeRef = useRef({});
  const staleProbeRef = useRef({});
  // Cutoff modal state: connection being edited, the window list captured at
  // open time (from quotaData), and the resilience-settings defaults the
  // modal renders as placeholders. Kept as separate slices instead of
  // mutating the connection object — the window list is UI state, not part
  // of the domain.
  const [cutoffModalConn, setCutoffModalConn] = useState<any | null>(null);
  const [cutoffModalWindows, setCutoffModalWindows] = useState<any[]>([]);
  const [providerWindowDefaults, setProviderWindowDefaults] = useState<
    Record<string, Record<string, number>>
  >({});
  const [globalThresholdDefault, setGlobalThresholdDefault] = useState<number>(98);

  // Load the resilience-settings defaults once. The endpoint also returns a
  // per-provider window registry but we ignore it here — the modal uses the
  // connection's live quota cache for window discovery instead.
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
            stale: data._stale ? { since: data._staleSince, reason: data._staleReason } : null,
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
      zai: 8,
      glmt: 9,
      "kimi-coding": 10,
      minimax: 11,
      "minimax-cn": 12,
      nanogpt: 13,
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

  // Apply tier + purchase-type + status filters together, then sort with
  // "expiring first" so critical accounts surface at the top regardless of
  // alphabetical/priority ordering.
  const visibleConnections = useMemo(() => {
    const filtered = sortedConnections.filter((conn) => {
      const tierKey = tierByConnection[conn.id]?.key || "unknown";
      if (tierFilter !== "all" && tierKey !== tierFilter) return false;
      if (purchaseTypeFilter !== "all" && purchaseTypeByConnection[conn.id] !== purchaseTypeFilter)
        return false;
      if (statusFilter !== "all" && statusByConnection[conn.id] !== statusFilter) return false;
      return true;
    });

    // Sort: critical → alert → ok → empty; within tier, soonest reset first.
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
    quotaData,
  ]);

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

      {/* Summary Stats — clickable filters by status */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(["all", "critical", "alert", "ok"] as StatusKey[]).map((key) => {
          const tone = STATUS_TONE[key];
          const labelMap: Record<string, string> = {
            all: tr("statTotal", "Total"),
            critical: tr("statCritical", "Crítico"),
            alert: tr("statAlert", "Alerta"),
            ok: tr("statHealthy", "Saudável"),
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

      {/* Purchase Type Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold mr-1">
          {tr("filterPurchaseTypeLabel", "Tipo")}
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

      {/* Tier Filters */}
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
              <span>{tier.label || t(tier.labelKey)}</span>
              <span className="opacity-85">{tierCounts[tier.key] || 0}</span>
            </button>
          );
        })}
      </div>

      {/* Account rows — expandable */}
      <div className="rounded-xl border border-border overflow-hidden bg-surface">
        {(() => {
          // Compact "chip" representation of a quota for the collapsed row.
          // Keeps the row visually predictable regardless of how many quotas
          // a provider exposes (DeepSeek 1 chip vs Antigravity 3 chips).
          const renderQuotaChips = (quotas: any[]) => {
            const MAX = 5;
            const visible = quotas.slice(0, MAX);
            const extras = quotas.length - visible.length;
            return (
              <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                {visible.map((q, i) => {
                  if (q.isCredits) {
                    const colors = getBarColor(q.remainingPercentage ?? 0);
                    const sym = CURRENCY_SYMBOLS[q.currency] ?? q.currency ?? "";
                    const amount = (q.creditCount ?? q.remaining ?? 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    });
                    return (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold py-0.5 px-2 rounded tabular-nums"
                        style={{ background: colors.bg, color: colors.text }}
                        title={`${formatQuotaLabel(q.name)} balance`}
                      >
                        🪙 {sym}
                        {amount}
                      </span>
                    );
                  }
                  const pctRaw = q.unlimited
                    ? 100
                    : (q.remainingPercentage ?? calculatePercentage(q.used, q.total));
                  const pct = Math.round(pctRaw);
                  const colors = getBarColor(pct);
                  const shortName = q.displayName || formatQuotaLabel(q.name);
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold py-0.5 px-2 rounded tabular-nums"
                      style={{ background: colors.bg, color: colors.text }}
                      title={`${shortName} — ${pct}% remaining`}
                    >
                      <span className="opacity-80 font-medium">{shortName}</span>
                      <span>{pct}%</span>
                    </span>
                  );
                })}
                {extras > 0 && (
                  <span className="text-[11px] text-text-muted font-medium">+{extras}</span>
                )}
              </div>
            );
          };

          // Full quota bar for the expanded panel: large, with countdown and
          // a status badge. Reused for credits via a branch on isCredits.
          const renderQuotaDetail = (q: any, i: number) => {
            if (q.isCredits) {
              const colors = getBarColor(q.remainingPercentage ?? 0);
              const sym = CURRENCY_SYMBOLS[q.currency] ?? q.currency ?? "";
              const amount = (q.creditCount ?? q.remaining ?? 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
              return (
                <div
                  key={i}
                  className="rounded-md border border-border bg-bg/40 px-3 py-2.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ color: colors.text }}
                    >
                      paid
                    </span>
                    <div className="min-w-0">
                      <div className="text-[12px] font-semibold text-text-main">
                        {formatQuotaLabel(q.name) || tr("creditsLabel", "Credits")}
                      </div>
                      <div className="text-[10px] text-text-muted">
                        {tr("creditBalanceHint", "Saldo restante")}
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-[16px] font-bold tabular-nums"
                    style={{ color: colors.text }}
                  >
                    {sym}
                    {amount}
                  </div>
                </div>
              );
            }
            const pctRaw = q.unlimited
              ? 100
              : (q.remainingPercentage ?? calculatePercentage(q.used, q.total));
            const pct = Math.round(pctRaw);
            const colors = getBarColor(pct);
            const cd = formatCountdown(q.resetAt);
            const shortName = q.displayName || formatQuotaLabel(q.name);
            const staleAfterReset = q.staleAfterReset === true;
            const usedNum = Number(q.used || 0);
            const totalNum = Number(q.total || 0);
            const showUsage = totalNum > 0 && !q.unlimited;
            return (
              <div key={i} className="rounded-md border border-border bg-bg/40 px-3 py-2.5">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="text-[12px] font-semibold py-0.5 px-2 rounded"
                      style={{ background: colors.bg, color: colors.text }}
                      title={q.modelKey || q.name}
                    >
                      {shortName}
                    </span>
                    {q.unlimited && (
                      <span className="text-[10px] text-text-muted">
                        {tr("unlimitedLabel", "Unlimited")}
                      </span>
                    )}
                    {showUsage && (
                      <span className="text-[10px] text-text-muted tabular-nums">
                        {usedNum.toLocaleString()} / {totalNum.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {staleAfterReset ? (
                      <span className="text-[10px] text-text-muted">
                        ⟳ {tr("refreshing", "Refreshing")}
                      </span>
                    ) : cd ? (
                      <span className="text-[10px] text-text-muted">
                        ⏱ {tr("resetsIn", "reset em")} {cd}
                      </span>
                    ) : null}
                    <span
                      className="text-[13px] font-bold tabular-nums min-w-[40px] text-right"
                      style={{ color: colors.text }}
                    >
                      {pct}%
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-sm bg-black/[0.06] dark:bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-sm transition-[width] duration-300 ease-out"
                    style={{ width: `${Math.min(pct, 100)}%`, background: colors.bar }}
                  />
                </div>
              </div>
            );
          };

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
            const isExpanded = expandedRows.has(conn.id);
            const status = statusByConnection[conn.id] || "empty";
            const statusTone = STATUS_TONE[status];

            const overrides = (conn.quotaWindowThresholds || null) as Record<string, number> | null;
            const hasOverrides = overrides && Object.keys(overrides).length > 0;
            const connectionWindows = (quota?.quotas || []).filter(
              (q: any) => q && typeof q.name === "string" && !q.isCredits
            );
            const connectionHasWindows = connectionWindows.length > 0;
            let cutoffLabel: string = tr("quotaCutoffsButtonDefault", "Default");
            if (hasOverrides && overrides) {
              const entries = Object.entries(overrides);
              const visible = entries
                .slice(0, 2)
                .map(([k, v]) => `${shortWindowLabel(k)}:${v}%`)
                .join(" · ");
              cutoffLabel = entries.length > 2 ? `${visible} +${entries.length - 2}` : visible;
            }

            return (
              <div
                key={conn.id}
                style={{
                  borderBottom: !isLast || isExpanded ? "1px solid var(--color-border)" : "none",
                }}
              >
                {/* Collapsed row — clickable to expand. Uses div+role=button
                    because the row hosts other interactive controls (cutoff
                    button, refresh, etc.) which would be invalid HTML nested
                    inside a real <button>. */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleRow(conn.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleRow(conn.id);
                    }
                  }}
                  className="w-full text-left items-center px-3 py-3 transition-[background] duration-150 hover:bg-black/[0.03] dark:hover:bg-white/[0.02] cursor-pointer"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "28px minmax(220px,280px) minmax(160px,1fr) 96px 110px 36px",
                    gap: "8px",
                    borderLeft: `3px solid ${status === "all" || status === "empty" ? "transparent" : statusTone.dot}`,
                  }}
                  aria-expanded={isExpanded}
                >
                  {/* Chevron + status dot */}
                  <div className="flex justify-center">
                    <span className="material-symbols-outlined text-[18px] text-text-muted">
                      {isExpanded ? "expand_less" : "expand_more"}
                    </span>
                  </div>

                  {/* Account Info */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                      <ProviderIcon
                        providerId={conn.provider}
                        size={32}
                        type="color"
                        className="object-contain"
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
                      <div className="flex items-center gap-1.5 mt-0.5 min-h-5">
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

                  {/* Compact quota chips */}
                  <div className="min-w-0 pr-2">
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
                      renderQuotaChips(quota.quotas)
                    ) : (
                      <div className="text-xs text-text-muted italic">{t("noQuotaData")}</div>
                    )}
                  </div>

                  {/* Last Refreshed */}
                  <div className="text-center text-[11px]">
                    {(() => {
                      const stale = quota?.stale;
                      const displayTime = stale?.since || refreshedAt;
                      if (!displayTime) return <span className="text-text-muted">-</span>;
                      const formatted = new Date(displayTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      });
                      if (stale) {
                        return (
                          <span
                            className="text-amber-500"
                            title={t("staleQuotaTooltip")}
                            aria-label={t("staleQuotaTooltip")}
                          >
                            {formatted}
                          </span>
                        );
                      }
                      return <span className="text-text-muted">{formatted}</span>;
                    })()}
                  </div>

                  {/* Cutoff button — opens modal; stop propagation so row doesn't toggle */}
                  <div className="flex justify-center items-center">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!connectionHasWindows) return;
                        setCutoffModalWindows(connectionWindows);
                        setCutoffModalConn(conn);
                      }}
                      role="button"
                      tabIndex={connectionHasWindows ? 0 : -1}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!connectionHasWindows) return;
                          setCutoffModalWindows(connectionWindows);
                          setCutoffModalConn(conn);
                        }
                      }}
                      title={
                        connectionHasWindows
                          ? tr(
                              "quotaCutoffsButtonHelp",
                              "Edit minimum remaining quota cutoffs for this account."
                            )
                          : tr(
                              "quotaCutoffsButtonDisabled",
                              "No quota windows are available for this account yet."
                            )
                      }
                      className={`block w-full max-w-[100px] truncate text-center px-2 py-1 rounded-md border text-[11px] font-medium tabular-nums transition-colors ${
                        !connectionHasWindows ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                      } ${
                        hasOverrides
                          ? "border-primary/40 text-primary bg-primary/5"
                          : "border-border text-text-muted hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      {cutoffLabel}
                    </span>
                  </div>

                  {/* Refresh — stop propagation */}
                  <div className="flex justify-center gap-0.5">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isLoading) return;
                        refreshProvider(conn.id, conn.provider);
                      }}
                      role="button"
                      tabIndex={isLoading ? -1 : 0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          if (isLoading) return;
                          refreshProvider(conn.id, conn.provider);
                        }
                      }}
                      title={t("refreshQuota")}
                      className={`p-1 rounded-md flex items-center justify-center transition-opacity duration-150 ${
                        isLoading
                          ? "cursor-not-allowed opacity-30"
                          : "cursor-pointer opacity-60 hover:opacity-100"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[16px] text-text-muted ${isLoading ? "animate-spin" : ""}`}
                      >
                        refresh
                      </span>
                    </span>
                  </div>
                </div>

                {/* Expanded panel */}
                {isExpanded && (
                  <div className="px-12 py-3 bg-bg-subtle/30 border-t border-border space-y-2">
                    {isLoading ? (
                      <div className="text-xs text-text-muted flex items-center gap-1.5">
                        <span className="material-symbols-outlined animate-spin text-[14px]">
                          progress_activity
                        </span>
                        {t("loadingQuotas")}
                      </div>
                    ) : error ? (
                      <div className="text-xs text-red-500 flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        <span>{error}</span>
                      </div>
                    ) : quota?.quotas?.length > 0 ? (
                      <>
                        {quota.quotas.map((q: any, i: number) => renderQuotaDetail(q, i))}
                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            type="button"
                            disabled={!connectionHasWindows}
                            onClick={() => {
                              setCutoffModalWindows(connectionWindows);
                              setCutoffModalConn(conn);
                            }}
                            className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-md border border-border bg-bg-subtle hover:bg-black/[0.04] dark:hover:bg-white/[0.04] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">tune</span>
                            {tr("editCutoffs", "Editar Cutoffs")}
                          </button>
                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => refreshProvider(conn.id, conn.provider)}
                            className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-md border border-border bg-bg-subtle hover:bg-black/[0.04] dark:hover:bg-white/[0.04] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <span
                              className={`material-symbols-outlined text-[14px] ${isLoading ? "animate-spin" : ""}`}
                            >
                              refresh
                            </span>
                            {tr("forceRefresh", "Refresh agora")}
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-xs text-text-muted italic">{t("noQuotaData")}</div>
                    )}
                  </div>
                )}
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
              {(() => {
                const tier = TIER_FILTERS.find((tier) => tier.key === tierFilter);
                return tier?.label || t(tier?.labelKey || "tierUnknown");
              })()}
            </strong>
            .
          </div>
        )}
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
            // Reflect the new state in the modal-open connection ref so the
            // button summary updates without closing/reopening.
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
