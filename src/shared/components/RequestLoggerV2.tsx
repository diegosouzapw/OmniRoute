"use client";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Card from "./Card";
import RequestLoggerDetail from "./RequestLoggerDetail";
import { copyToClipboard } from "@/shared/utils/clipboard";
import {
  PROVIDER_COLORS,
  getHttpStatusStyle as getStatusStyle,
  getProtocolColor,
} from "@/shared/constants/colors";
import {
  formatTime,
  formatDuration,
  maskAccount,
  stableAccountSuffix,
  formatApiKeyLabel,
} from "@/shared/utils/formatting";
import { getProviderDisplayLabel } from "@/shared/utils/providerDisplayLabel";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import {
  computeLogsSignature,
  shouldAutoRefresh,
  shouldTriggerInfiniteScroll,
} from "./requestLoggerSignature";
import {
  DEFAULT_REFRESH_INTERVAL_SEC,
  clampRefreshIntervalSec,
  readSavedRefreshIntervalSec,
  writeSavedRefreshIntervalSec,
} from "./requestLoggerPreferences";
import {
  LOG_TABLE_CLASS,
  LOG_TABLE_HEAD_CLASS,
  LOG_TABLE_HEADER_BG_STYLE,
  LOG_TABLE_HEADER_CELL_CLASS,
  LOG_TABLE_HEADER_CELL_RIGHT_CLASS,
  LOG_TABLE_ROW_CLASS,
} from "./logTableStyles";

// Number of call-log rows fetched per page. The viewer grows its window by this
// amount on "Load more" / infinite scroll so users can browse past the first
// page (previously hardcoded to a single 300-row window). See #2565.
// Reduced from 300 → 50 to avoid browser freeze and network saturation.
const PAGE_SIZE = 50;

function getLogTotalTokens(log) {
  return (log?.tokens?.in || 0) + (log?.tokens?.out || 0);
}

function getLogTps(log): number {
  const tokensOut = log?.tokens?.out || 0;
  const durationMs = log?.duration || 0;
  if (tokensOut <= 0 || durationMs <= 0) return 0;
  return tokensOut / (durationMs / 1000);
}

function formatTps(tps: number): string {
  if (tps <= 0) return "—";
  if (tps >= 100) return Math.round(tps).toLocaleString();
  return tps.toFixed(1);
}

function getCacheSourceMeta(cacheSource: unknown) {
  if (cacheSource === "semantic") {
    return {
      key: "semantic",
      className:
        "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30",
    };
  }

  return {
    key: "upstream",
    className: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30",
  };
}

export interface RequestLoggerV2Handle {
  openDetail: (logEntry: any) => void;
  getSortedLogs: () => any[];
}

const RequestLoggerV2 = forwardRef<RequestLoggerV2Handle, { initialSelectedId?: string }>(
  (props, ref) => {
    const { initialSelectedId } = props as any;
    const t = useTranslations("requestLogger");
    const { emailsVisible } = useEmailPrivacyStore();

    // Get translated status filters
    const statusFilters = useMemo(
      () => [
        { key: "all", label: t("statusFilters.all"), icon: "" },
        { key: "error", label: t("statusFilters.error"), icon: "error" },
        { key: "ok", label: t("statusFilters.success"), icon: "check_circle" },
        { key: "combo", label: t("statusFilters.combo"), icon: "hub" },
      ],
      [t]
    );

    // Get translated columns
    const columns = useMemo(
      () => [
        { key: "status", label: t("columns.status") },
        { key: "cacheSource", label: t("columns.cacheSource") },
        { key: "model", label: t("columns.model") },
        { key: "requestedModel", label: t("columns.requested") },
        { key: "provider", label: t("columns.provider") },
        { key: "protocol", label: t("columns.protocol") },
        { key: "account", label: t("columns.account") },
        { key: "apiKey", label: t("columns.apiKey") },
        { key: "combo", label: t("columns.combo") },
        { key: "tokens", label: t("columns.tokens") },
        { key: "tps", label: t("columns.tps") },
        { key: "duration", label: t("columns.duration") },
        { key: "time", label: t("columns.time") },
      ],
      [t]
    );

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recording, setRecording] = useState(true);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedAccount, setSelectedAccount] = useState("");
    const [selectedProvider, setSelectedProvider] = useState("");
    const [selectedApiKey, setSelectedApiKey] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [selectedLog, setSelectedLog] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailData, setDetailData] = useState(null);
    const [detailLoggingEnabled, setDetailLoggingEnabled] = useState(false);
    const [detailLoggingLoading, setDetailLoggingLoading] = useState(false);
    const [limit, setLimit] = useState(PAGE_SIZE);
    const [hasMore, setHasMore] = useState(false);
    const [refreshIntervalSec, setRefreshIntervalSec] = useState(DEFAULT_REFRESH_INTERVAL_SEC);
    const intervalRef = useRef(null);
    const refreshIntervalSecRef = useRef(DEFAULT_REFRESH_INTERVAL_SEC);
    const hasLoadedRef = useRef(false);
    const logsSignatureRef = useRef("");
    const scrollContainerRef = useRef(null);
    const loadMoreSentinelRef = useRef(null);
    // #4269: gates the infinite-scroll observer so a "ghost" loadMore can't fire on
    // mount (sentinel visible when the first page doesn't fill the viewport), which
    // grew the window past PAGE_SIZE and permanently paused auto-refresh.
    const hasScrolledRef = useRef(false);
    const [providerNodes, setProviderNodes] = useState([]);
    // #4054: fail-open. The auto-refresh pause is event-driven — we start assuming
    // the tab is visible (poll) and only flip to paused on a real `visibilitychange`
    // → hidden transition. Seeding from a static `document.visibilityState` read froze
    // polling forever in embedded/proxied hosts that report a permanent non-"visible"
    // state without ever dispatching the event (Docker dashboard wrappers, webviews).
    const visibleRef = useRef(true);

    // Column visibility with localStorage persistence
    const [visibleColumns, setVisibleColumns] = useState(() => {
      const defaultVisible = Object.fromEntries(columns.map((c) => [c.key, true]));
      if (globalThis.window === undefined) return defaultVisible;
      try {
        const saved = localStorage.getItem("loggerVisibleColumns");
        return saved ? { ...defaultVisible, ...JSON.parse(saved) } : defaultVisible;
      } catch {
        return defaultVisible;
      }
    });

    const toggleColumn = useCallback((key) => {
      setVisibleColumns((prev) => {
        const next = { ...prev, [key]: !prev[key] };
        try {
          localStorage.setItem("loggerVisibleColumns", JSON.stringify(next));
        } catch {}
        return next;
      });
    }, []);

    useEffect(() => {
      const saved = readSavedRefreshIntervalSec();
      refreshIntervalSecRef.current = saved;
      setRefreshIntervalSec(saved);
    }, []);

    useEffect(() => {
      refreshIntervalSecRef.current = refreshIntervalSec;
    }, [refreshIntervalSec]);

    const updateRefreshIntervalSec = useCallback(
      (valueOrUpdater: number | ((current: number) => number)) => {
        const current = refreshIntervalSecRef.current;
        const rawValue =
          typeof valueOrUpdater === "function" ? valueOrUpdater(current) : valueOrUpdater;
        const next = clampRefreshIntervalSec(rawValue);
        refreshIntervalSecRef.current = next;
        writeSavedRefreshIntervalSec(next);
        setRefreshIntervalSec(next);
      },
      []
    );

    const fetchLogs = useCallback(
      async (showLoading = false) => {
        if (showLoading) setLoading(true);
        try {
          const params = new URLSearchParams();
          if (search) params.set("search", search);
          if (activeFilter === "error") params.set("status", "error");
          if (activeFilter === "ok") params.set("status", "ok");
          if (activeFilter === "combo") params.set("combo", "1");
          if (selectedModel) params.set("model", selectedModel);
          if (selectedProvider) params.set("provider", selectedProvider);
          if (selectedAccount) params.set("account", selectedAccount);
          if (selectedApiKey) params.set("apiKey", selectedApiKey);
          params.set("limit", String(limit));

          const res = await fetch(`/api/usage/call-logs?${params}`);
          if (res.ok) {
            const data = await res.json();
            // If the server returned a full window, more rows may exist beyond it.
            setHasMore(Array.isArray(data) && data.length >= limit);
            // Skip re-render if data hasn't changed (#1369 GPU perf). The signature
            // captures id + status + duration + tokens_out so in-progress updates
            // still re-render while identical snapshots are skipped.
            const sig = computeLogsSignature(data);
            if (sig !== logsSignatureRef.current) {
              logsSignatureRef.current = sig;
              setLogs(data);
            }
          }
        } catch (error) {
          console.error("Failed to fetch call logs:", error);
        } finally {
          if (showLoading) setLoading(false);
        }
      },
      [
        search,
        activeFilter,
        selectedModel,
        selectedAccount,
        selectedProvider,
        selectedApiKey,
        limit,
      ]
    );

    useEffect(() => {
      const showLoading = !hasLoadedRef.current;
      hasLoadedRef.current = true;
      fetchLogs(showLoading);
    }, [fetchLogs]);

    // Fetch provider nodes for display labels
    useEffect(() => {
      fetch("/api/provider-nodes")
        .then((r) => (r.ok ? r.json() : { nodes: [] }))
        .then((d) => setProviderNodes(d.nodes || []))
        .catch(() => {});
    }, []);

    useEffect(() => {
      fetch("/api/logs/detail?limit=1")
        .then(async (res) => {
          if (!res.ok) return null;
          return await res.json();
        })
        .then((data) => {
          if (!data) return;
          setDetailLoggingEnabled(data.enabled === true);
        })
        .catch(() => {});
    }, []);

    // Visibility-aware auto-refresh: pause polling when tab is hidden or user has
    // scrolled past the first page, or when a detail modal is open.
    useEffect(() => {
      const onVisibility = () => {
        const isVisible = document.visibilityState === "visible";
        visibleRef.current = isVisible;
        if (isVisible && !selectedLog && shouldAutoRefresh(recording, limit, PAGE_SIZE)) {
          fetchLogs(false);
        }
      };
      // #4133: re-arm on window focus. Embedded / proxied hosts (Docker dashboard
      // wrappers, webviews) can fire a one-shot `visibilitychange` → hidden and
      // then keep reporting "hidden" — or recover without firing the event again —
      // which left `visibleRef` stuck `false` and froze auto-refresh permanently
      // (the "still not refreshing on 3.8.28, works on 3.8.24" report). A window
      // `focus` is a reliable signal the page is actively viewed, so re-arm and
      // poll. A genuinely backgrounded tab never receives focus, so this does not
      // defeat the perf pause.
      const onFocus = () => {
        visibleRef.current = true;
        if (!selectedLog && shouldAutoRefresh(recording, limit, PAGE_SIZE)) {
          fetchLogs(false);
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("focus", onFocus);
      return () => {
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("focus", onFocus);
      };
    }, [recording, limit, fetchLogs, selectedLog]);

    useEffect(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!selectedLog && shouldAutoRefresh(recording, limit, PAGE_SIZE)) {
        intervalRef.current = setInterval(() => {
          // #3972/#4054/#4133: poll while the page is plausibly viewed — the
          // event-tracked `visibleRef` (fail-open) OR a *live* `visibilityState`
          // read. A real background tab has both false → pause (perf); an
          // embedded host that misreports "hidden" keeps polling instead of
          // freezing. The window-`focus` re-arm above covers a host pinned
          // "hidden" while focused.
          if (visibleRef.current || document.visibilityState === "visible") {
            fetchLogs(false);
          }
        }, refreshIntervalSec * 1000);
      }
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [recording, fetchLogs, limit, refreshIntervalSec, selectedLog]);

    // Reset the window back to the first page whenever the active filters change,
    // so switching filters doesn't keep fetching a large expanded window.
    useEffect(() => {
      setLimit(PAGE_SIZE);
      // #4269: a filter change is a fresh first-page view — re-arm the ghost-load-more
      // guard so auto-refresh resumes until the user scrolls again.
      hasScrolledRef.current = false;
    }, [search, activeFilter, selectedModel, selectedAccount, selectedProvider, selectedApiKey]);

    const loadMore = useCallback(() => {
      setLimit((prev) => prev + PAGE_SIZE);
    }, []);

    // #4269: record the first genuine user scroll of the log list. Until then, the
    // infinite-scroll observer below must NOT grow the window (see
    // shouldTriggerInfiniteScroll) — otherwise a sentinel that is already visible on
    // mount fires a "ghost" loadMore and permanently pauses auto-refresh.
    useEffect(() => {
      const root = scrollContainerRef.current;
      if (!root) return;
      const onScroll = () => {
        if (root.scrollTop > 0) hasScrolledRef.current = true;
      };
      root.addEventListener("scroll", onScroll, { passive: true });
      return () => root.removeEventListener("scroll", onScroll);
    }, []);

    // Infinite scroll: grow the window when the sentinel near the bottom of the
    // scroll container becomes visible — but only after a real user scroll (#4269).
    useEffect(() => {
      const sentinel = loadMoreSentinelRef.current;
      const root = scrollContainerRef.current;
      if (!sentinel || !hasMore) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (
            shouldTriggerInfiniteScroll({
              isIntersecting: !!entries[0]?.isIntersecting,
              hasMore,
              loading,
              hasScrolled: hasScrolledRef.current,
            })
          ) {
            loadMore();
          }
        },
        { root, rootMargin: "200px" }
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }, [hasMore, loading, loadMore]);

    const filteredLogs = useMemo(() => {
      let arr = logs;

      // Status filter
      if (activeFilter === "error") {
        arr = arr.filter((l) => l.status >= 400);
      } else if (activeFilter === "ok") {
        arr = arr.filter((l) => l.status >= 200 && l.status < 300);
      } else if (activeFilter === "combo") {
        arr = arr.filter((l) => l.comboName);
      }

      return arr;
    }, [logs, activeFilter]);

    const sortedLogs = useMemo(() => {
      const arr = [...filteredLogs];

      arr.sort((a, b) => {
        switch (sortBy) {
          case "oldest":
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          case "tokens_desc":
            return getLogTotalTokens(b) - getLogTotalTokens(a);
          case "tokens_asc":
            return getLogTotalTokens(a) - getLogTotalTokens(b);
          case "duration_desc":
            return (b.duration || 0) - (a.duration || 0);
          case "duration_asc":
            return (a.duration || 0) - (b.duration || 0);
          case "tps_desc":
            return getLogTps(b) - getLogTps(a);
          case "tps_asc":
            return getLogTps(a) - getLogTps(b);
          case "status_desc":
            return (b.status || 0) - (a.status || 0);
          case "status_asc":
            return (a.status || 0) - (b.status || 0);
          case "model_asc":
            return (a.model || "").localeCompare(b.model || "");
          case "model_desc":
            return (b.model || "").localeCompare(a.model || "");
          case "newest":
          default:
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }
      });

      return arr;
    }, [filteredLogs, sortBy]);

    // Fetch log detail from the persisted call-log endpoint. If a deep-linked
    // request is still being finalized, keep the modal open and poll this same
    // endpoint until the row appears.
    const router = useRouter();

    const openDetail = async (logEntry) => {
      // Guard: if no valid id provided, close instead of opening an empty modal
      if (!logEntry?.id) {
        try {
          closeDetail();
        } catch {}
        return;
      }

      setSelectedLog(logEntry);
      try {
        const url = new URL(globalThis.location.href);
        url.searchParams.set("id", logEntry.id);
        router.replace(url.pathname + url.search);
      } catch (e) {
        // ignore navigation errors
      }
      setDetailLoading(true);
      setDetailData(null);
      try {
        const res = await fetch(`/api/logs/${logEntry.id}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const dataHasPipeline =
            data?.pipelinePayloads && Object.keys(data.pipelinePayloads || {}).length > 0;
          setDetailData((prev: { pipelinePayloads: any }) => ({
            ...prev,
            ...data,
            pipelinePayloads: dataHasPipeline ? data.pipelinePayloads : prev?.pipelinePayloads,
          }));
          // ensure the modal summary reflects the fetched call log summary
          if (data && typeof data === "object") {
            setSelectedLog((prev: any) => ({
              ...prev,
              ...data,
              active: data.active === true,
            }));
          }
        } else {
          // A deep-linked id can legitimately 404 while the request is still
          // finalizing. Keep the modal open and poll /api/logs/[id] instead of
          // falling back to an in-memory active-request endpoint.
          if (res.status === 404) {
            if (logEntry.pendingLookup || logEntry.active) {
              setSelectedLog((prev: { method: any; path: any }) => ({
                ...prev,
                id: logEntry.id,
                status: 0,
                method: prev?.method,
                path: prev?.path || "",
              }));
              setDetailData({ detailState: "pending" });
              return;
            }
            try {
              console.warn("Log not found:", logEntry.id);
            } catch {}
            try {
              closeDetail();
            } catch {}
            return;
          }
          // other errors: show a minimal error indicator by setting detailData to an error object
          try {
            const body = await res.text().catch(() => null);
            setDetailData({ error: `Failed to fetch log (status ${res.status})`, body });
          } catch {}
        }
      } catch (error) {
        console.error("Failed to fetch log detail:", error);
      } finally {
        setDetailLoading(false);
      }
    };

    const closeDetail = () => {
      setSelectedLog(null);
      setDetailData(null);
      try {
        // remove id param when closing detail
        const url = new URL(globalThis.location.href);
        url.searchParams.delete("id");
        router.replace(url.pathname + url.search);
      } catch (e) {
        // ignore navigation errors
      }
    };

    const sortedLogsForNav = useMemo(() => sortedLogs, [sortedLogs]);

    useImperativeHandle(
      ref,
      () => ({
        openDetail,
        getSortedLogs: () => sortedLogsForNav,
      }),
      [openDetail, sortedLogsForNav]
    );

    // If the page provided an initialSelectedId (via ?id=), open it on mount.
    // Guard with a ref so subsequent URL updates (close -> replace) don't re-open the modal.
    const initialOpenedRef = useRef(false);
    useEffect(() => {
      if (initialSelectedId && !initialOpenedRef.current) {
        initialOpenedRef.current = true;
        openDetail({ id: initialSelectedId, pendingLookup: true })
          .then((r) => r)
          .catch((error_) => {
            console.error("Failed to open initial log id:", error_);
          });
      }
    }, [initialSelectedId]);

    useEffect(() => {
      const isActive = selectedLog?.active === true;
      if (!selectedLog?.id || !isActive) return;
      let cancelled = false;
      let graceCount = 0;
      const interval = setInterval(async () => {
        if (document.visibilityState !== "visible") return;
        try {
          const res = await fetch(`/api/logs/${selectedLog.id}`, { cache: "no-store" });
          if (cancelled) return;
          if (res.status === 404) {
            if (isActive) return;
            clearInterval(interval);
            return;
          }
          if (res.ok) {
            const data = await res.json();
            const stillActive = data.active === true;
            setDetailData((prev: { pipelinePayloads: any }) => ({
              ...prev,
              ...data,
              pipelinePayloads: data?.pipelinePayloads || prev?.pipelinePayloads,
            }));
            setSelectedLog((prev: any) => ({
              ...prev,
              ...data,
              active: stillActive,
            }));
            if (!stillActive) {
              graceCount++;
              if (graceCount >= 3) clearInterval(interval);
            }
          }
        } catch {
          // keep waiting; the detail endpoint is the single source of truth
        }
      }, 1000);
      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }, [selectedLog?.id, detailData?.detailState, selectedLog?.active, fetchLogs]);

    const currentLogIndex = useMemo(() => {
      if (!selectedLog) return -1;
      return sortedLogsForNav.findIndex((l) => l.id === selectedLog.id);
    }, [selectedLog, sortedLogsForNav]);

    const handlePrev = useCallback(() => {
      const idx = currentLogIndex;
      const target = idx > 0 ? sortedLogsForNav[idx - 1] : null;
      if (target?.id) {
        openDetail(target)
          .then((r) => r)
          .catch((error_) => {
            console.error("Failed to open previous log id:", error_);
          });
      } else {
        closeDetail();
      }
    }, [currentLogIndex, sortedLogsForNav]);

    const handleNext = useCallback(() => {
      const idx = currentLogIndex;
      const target =
        idx >= 0 && idx < sortedLogsForNav.length - 1 ? sortedLogsForNav[idx + 1] : null;
      if (target?.id) {
        openDetail(target)
          .then((r) => r)
          .catch((error_) => {
            console.error("Failed to open previous log id:", error_);
          });
      } else {
        closeDetail();
      }
    }, [currentLogIndex, sortedLogsForNav]);

    const toggleDetailLogging = async () => {
      setDetailLoggingLoading(true);
      try {
        const nextEnabled = !detailLoggingEnabled;
        const res = await fetch("/api/logs/detail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enabled: nextEnabled }),
        });
        if (!res.ok) throw new Error(t("updatePipelineFailed"));
        setDetailLoggingEnabled(nextEnabled);
      } catch (error) {
        console.error("Failed to toggle pipeline logging:", error);
      } finally {
        setDetailLoggingLoading(false);
      }
    };

    const sourceLogsForDropdowns = logs;

    // Unique accounts and providers for dropdowns

    const uniqueAccounts = useMemo(
      () => [
        ...new Set(sourceLogsForDropdowns.map((l) => l.account).filter((a) => a && a !== "-")),
      ],
      [sourceLogsForDropdowns]
    );
    const uniqueModels = useMemo(
      () =>
        [
          ...new Set(
            sourceLogsForDropdowns.flatMap((l) => [l.model, l.requestedModel]).filter(Boolean)
          ),
        ].sort(),
      [sourceLogsForDropdowns]
    );
    const uniqueProviders = useMemo(
      () =>
        [
          ...new Set(sourceLogsForDropdowns.map((l) => l.provider).filter((p) => p && p !== "-")),
        ].sort(),
      [sourceLogsForDropdowns]
    );
    const uniqueApiKeys = useMemo(
      () =>
        [
          ...new Set(sourceLogsForDropdowns.map((l) => l.apiKeyId || l.apiKeyName).filter(Boolean)),
        ].sort(),
      [sourceLogsForDropdowns]
    );

    // Stats (memoized to avoid re-computation on every render)
    const { totalCount, okCount, errorCount, comboCount, apiKeyCount } = useMemo(
      () => ({
        totalCount: filteredLogs.length,
        okCount: filteredLogs.filter((l) => l.status >= 200 && l.status < 300).length,
        errorCount: filteredLogs.filter((l) => l.status >= 400).length,
        comboCount: logs.filter((l) => l.comboName).length,
        apiKeyCount: uniqueApiKeys.length,
      }),
      [filteredLogs, logs, uniqueApiKeys]
    );

    return (
      <div className="flex flex-col gap-4">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Recording Toggle */}
          <button
            onClick={() => setRecording(!recording)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              recording
                ? "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400"
                : "bg-bg-subtle border-border text-text-muted"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${recording ? "bg-red-500 animate-pulse" : "bg-text-muted"}`}
            />
            {recording ? t("recording") : t("paused")}
          </button>

          <button
            onClick={toggleDetailLogging}
            disabled={detailLoggingLoading}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors disabled:opacity-60 ${
              detailLoggingEnabled
                ? "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300"
                : "bg-bg-subtle border-border text-text-muted"
            }`}
            title={t("capturePipeline")}
          >
            <span
              className={`w-2 h-2 rounded-full ${detailLoggingEnabled ? "bg-amber-500" : "bg-text-muted"}`}
            />
            {detailLoggingLoading
              ? t("updatingPipelineLogs")
              : detailLoggingEnabled
                ? t("pipelineLogsOn")
                : t("pipelineLogsOff")}
          </button>

          {/* Search */}
          <div className="flex-1 min-w-[200px] relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
            />
          </div>

          {/* Provider Dropdown */}
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="px-3 py-2 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary focus:outline-none focus:border-primary appearance-none cursor-pointer min-w-[140px]"
          >
            <option value="">{t("allProviders")}</option>
            {uniqueProviders.map((p) => {
              const compatLabel = getProviderDisplayLabel(p, providerNodes);
              const pc = PROVIDER_COLORS[p];
              return (
                <option key={p} value={p}>
                  {compatLabel || pc?.label || p.toUpperCase()}
                </option>
              );
            })}
          </select>

          {/* Model Dropdown */}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-3 py-2 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary focus:outline-none focus:border-primary appearance-none cursor-pointer min-w-[180px]"
          >
            <option value="">{t("allModels")}</option>
            {uniqueModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>

          {/* Account Dropdown */}
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="px-3 py-2 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary focus:outline-none focus:border-primary appearance-none cursor-pointer min-w-[140px]"
          >
            <option value="">{t("allAccounts")}</option>
            {uniqueAccounts.map((a) => (
              <option key={a} value={a}>
                {emailsVisible ? a : `${maskAccount(a, false)} · #${stableAccountSuffix(a)}`}
              </option>
            ))}
          </select>

          {/* API Key Dropdown */}
          <select
            value={selectedApiKey}
            onChange={(e) => setSelectedApiKey(e.target.value)}
            className="px-3 py-2 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary focus:outline-none focus:border-primary appearance-none cursor-pointer min-w-[160px]"
          >
            <option value="">{t("allApiKeys")}</option>
            {uniqueApiKeys.map((value) => {
              const matched = logs.find((l) => (l.apiKeyId || l.apiKeyName) === value);
              const label = formatApiKeyLabel(matched?.apiKeyName, matched?.apiKeyId);
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>

          {/* Stats */}
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="px-2 py-1 rounded bg-bg-subtle border border-border font-mono">
              {totalCount} {t("total")}
            </span>
            <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono">
              {okCount} {t("ok")}
            </span>
            {errorCount > 0 && (
              <span className="px-2 py-1 rounded bg-red-500/10 text-red-700 dark:text-red-400 font-mono">
                {errorCount} {t("err")}
              </span>
            )}
            {comboCount > 0 && (
              <span className="px-2 py-1 rounded bg-violet-500/10 text-violet-700 dark:text-violet-400 font-mono">
                {comboCount} {t("combo")}
              </span>
            )}
            {apiKeyCount > 0 && (
              <span className="px-2 py-1 rounded bg-primary/10 text-primary font-mono">
                {apiKeyCount} {t("keys")}
              </span>
            )}
            <span className="px-2 py-1 rounded bg-bg-subtle border border-border font-mono">
              {sortedLogs.length} {t("shown")}
            </span>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary focus:outline-none focus:border-primary appearance-none cursor-pointer min-w-[150px]"
            title={t("sortLogs")}
          >
            <option value="newest">{t("sortNewest")}</option>
            <option value="oldest">{t("sortOldest")}</option>
            <option value="tokens_desc">{t("sortTokensDesc")}</option>
            <option value="tokens_asc">{t("sortTokensAsc")}</option>
            <option value="duration_desc">{t("sortDurationDesc")}</option>
            <option value="duration_asc">{t("sortDurationAsc")}</option>
            <option value="status_desc">{t("sortStatusDesc")}</option>
            <option value="status_asc">{t("sortStatusAsc")}</option>
            <option value="model_asc">{t("sortModelAsc")}</option>
            <option value="model_desc">{t("sortModelDesc")}</option>
          </select>

          {/* Refresh interval */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateRefreshIntervalSec((v) => v - 1)}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors text-sm font-bold"
              title="Decrease interval"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              max={300}
              value={refreshIntervalSec}
              onChange={(e) => {
                const v = Number.parseInt(e.target.value, 10);
                if (!Number.isNaN(v)) updateRefreshIntervalSec(v);
              }}
              className="w-12 text-center text-[11px] bg-transparent border border-border rounded px-1 py-0.5 text-text-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              title="Auto-refresh interval in seconds"
            />
            <button
              onClick={() => updateRefreshIntervalSec((v) => v + 1)}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors text-sm font-bold"
              title="Increase interval"
            >
              +
            </button>
            <span className="text-[10px] text-text-muted">s</span>
          </div>

          {/* Refresh */}
          <button
            onClick={() => fetchLogs(false)}
            className="p-2 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
            title={t("refresh")}
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filters */}
          {statusFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(activeFilter === f.key ? "all" : f.key)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                activeFilter === f.key
                  ? f.key === "error"
                    ? "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/40"
                    : f.key === "ok"
                      ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/40"
                      : f.key === "combo"
                        ? "bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-500/40"
                        : "bg-primary text-white border-primary"
                  : "bg-bg-subtle border-border text-text-muted hover:border-text-muted"
              }`}
            >
              {f.icon && <span className="material-symbols-outlined text-[14px]">{f.icon}</span>}
              {f.label}
            </button>
          ))}

          {/* Divider */}
          {uniqueProviders.length > 0 && <span className="w-px h-5 bg-border mx-1" />}

          {/* Dynamic Provider Quick Filters (from data) */}
          {uniqueProviders.map((p) => {
            const compatLabel = getProviderDisplayLabel(p, providerNodes);
            const pc = PROVIDER_COLORS[p] || {
              bg: "#374151",
              text: "#fff",
              label: compatLabel || p.toUpperCase(),
            };
            const displayLabel = compatLabel || pc.label;
            const isActive = selectedProvider === p;
            return (
              <button
                key={p}
                onClick={() => setSelectedProvider(isActive ? "" : p)}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase border transition-all ${
                  isActive
                    ? "border-white/40 ring-1 ring-white/20"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: isActive ? pc.bg : `${pc.bg}33`,
                  color: isActive ? pc.text : pc.bg,
                }}
              >
                {displayLabel}
              </button>
            );
          })}
        </div>

        {/* Column Visibility Toggles */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-text-muted uppercase tracking-wider mr-1">
            {t("columnsLabel")}
          </span>
          {columns.map((col) => (
            <button
              key={col.key}
              onClick={() => toggleColumn(col.key)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-all ${
                visibleColumns[col.key]
                  ? "bg-primary/15 text-primary border-primary/30"
                  : "bg-bg-subtle text-text-muted border-border opacity-50 hover:opacity-80"
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <Card padding="none" className="min-h-[460px] resize-y overflow-auto bg-surface">
          <div
            ref={scrollContainerRef}
            className="p-0 overflow-x-auto overflow-y-auto h-full min-h-[460px]"
          >
            {loading && logs.length === 0 ? (
              <div className="p-8 text-center text-text-muted">{t("loadingLogs")}</div>
            ) : logs.length === 0 ? (
              <div className="p-8 text-center text-text-muted">
                <span className="material-symbols-outlined text-[48px] mb-2 block opacity-40">
                  receipt_long
                </span>
                {t("noLogs")}
              </div>
            ) : sortedLogs.length === 0 ? (
              <div className="p-8 text-center text-text-muted">{t("noMatchingLogs")}</div>
            ) : (
              <table className={LOG_TABLE_CLASS}>
                <thead className={LOG_TABLE_HEAD_CLASS} style={LOG_TABLE_HEADER_BG_STYLE}>
                  <tr className={LOG_TABLE_ROW_CLASS} style={LOG_TABLE_HEADER_BG_STYLE}>
                    {visibleColumns.status && (
                      <th className={LOG_TABLE_HEADER_CELL_CLASS}>{t("columns.status")}</th>
                    )}
                    {visibleColumns.cacheSource && (
                      <th className={LOG_TABLE_HEADER_CELL_CLASS}>{t("columns.cacheSource")}</th>
                    )}
                    {visibleColumns.model && (
                      <th className={LOG_TABLE_HEADER_CELL_CLASS}>{t("columns.model")}</th>
                    )}
                    {visibleColumns.requestedModel && (
                      <th className={LOG_TABLE_HEADER_CELL_CLASS}>{t("columns.requested")}</th>
                    )}
                    {visibleColumns.provider && (
                      <th className={LOG_TABLE_HEADER_CELL_CLASS}>{t("columns.provider")}</th>
                    )}
                    {visibleColumns.protocol && (
                      <th className={LOG_TABLE_HEADER_CELL_CLASS}>{t("columns.protocol")}</th>
                    )}
                    {visibleColumns.account && (
                      <th className={LOG_TABLE_HEADER_CELL_CLASS}>{t("columns.account")}</th>
                    )}
                    {visibleColumns.apiKey && (
                      <th className={LOG_TABLE_HEADER_CELL_CLASS}>{t("columns.apiKey")}</th>
                    )}
                    {visibleColumns.combo && (
                      <th className={LOG_TABLE_HEADER_CELL_CLASS}>{t("columns.combo")}</th>
                    )}
                    {visibleColumns.tokens && (
                      <th className={LOG_TABLE_HEADER_CELL_RIGHT_CLASS}>{t("columns.tokens")}</th>
                    )}
                    {visibleColumns.tps && (
                      <th className={LOG_TABLE_HEADER_CELL_RIGHT_CLASS}>{t("columns.tps")}</th>
                    )}
                    {visibleColumns.duration && (
                      <th className={LOG_TABLE_HEADER_CELL_RIGHT_CLASS}>{t("columns.duration")}</th>
                    )}
                    {visibleColumns.time && (
                      <th className={LOG_TABLE_HEADER_CELL_RIGHT_CLASS}>{t("columns.time")}</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {sortedLogs.map((log) => {
                    const isActive = log.active === true;
                    const statusStyle = isActive ? null : getStatusStyle(log.status);
                    const protocolKey = isActive ? null : log.sourceFormat || log.provider;
                    const protocol = protocolKey
                      ? getProtocolColor(protocolKey, log.provider)
                      : null;
                    const compatLabel = getProviderDisplayLabel(log.provider, providerNodes);
                    const providerColor = PROVIDER_COLORS[log.provider] || {
                      bg: "#374151",
                      text: "#fff",
                      label: compatLabel || (log.provider || "-").toUpperCase(),
                    };
                    const providerLabel = compatLabel || providerColor.label;
                    const isError = !isActive && log.status >= 400;
                    const cacheSourceMeta = getCacheSourceMeta(log.cacheSource);
                    const isSemanticCache = cacheSourceMeta?.key === "semantic";
                    const accountLabel = maskAccount(log.account, emailsVisible);

                    return (
                      <tr
                        key={log.id}
                        onClick={() => openDetail(log)}
                        className={`cursor-pointer hover:bg-sky-500/10 dark:hover:bg-sky-400/10 transition-colors ${isError ? "bg-red-500/5" : ""}`}
                      >
                        {visibleColumns.status && (
                          <td className="px-3 py-2">
                            {isActive ? (
                              <span
                                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/15 border border-amber-500/25"
                                title="In progress"
                              >
                                <span className="inline-block h-3 w-3 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
                              </span>
                            ) : (
                              <span
                                className="inline-block px-2 py-0.5 rounded text-[10px] font-bold min-w-[36px] text-center"
                                style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                              >
                                {log.status || "..."}
                              </span>
                            )}
                          </td>
                        )}
                        {visibleColumns.cacheSource && (
                          <td className="px-3 py-2">
                            {isActive ? (
                              <span className="text-text-muted text-[10px]">—</span>
                            ) : (
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase ${cacheSourceMeta?.className || ""}`}
                                title={
                                  isSemanticCache ? t("semanticCacheHit") : t("upstreamResponse")
                                }
                              >
                                {isSemanticCache ? t("semantic") : t("upstream")}
                              </span>
                            )}
                          </td>
                        )}
                        {visibleColumns.model && (
                          <td className="px-3 py-2 font-medium text-primary font-mono text-[11px]">
                            {log.model}
                          </td>
                        )}
                        {visibleColumns.requestedModel && (
                          <td className="px-3 py-2 font-mono text-[11px]">
                            {log.requestedModel ? (
                              <span
                                className={
                                  log.requestedModel !== log.model
                                    ? "text-amber-600 dark:text-amber-400"
                                    : "text-text-muted"
                                }
                                title={
                                  log.requestedModel !== log.model
                                    ? t("requestedRoutedTitle", {
                                        requested: log.requestedModel,
                                        routed: log.model,
                                      })
                                    : log.requestedModel
                                }
                              >
                                {log.requestedModel}
                              </span>
                            ) : (
                              <span className="text-text-muted text-[10px]">—</span>
                            )}
                          </td>
                        )}
                        {visibleColumns.provider && (
                          <td className="px-3 py-2">
                            <span
                              className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase"
                              style={{
                                backgroundColor: providerColor.bg,
                                color: providerColor.text,
                              }}
                            >
                              {providerLabel}
                            </span>
                          </td>
                        )}
                        {visibleColumns.protocol && (
                          <td className="px-3 py-2">
                            {isActive ? (
                              <span className="text-text-muted text-[10px]">—</span>
                            ) : (
                              <span
                                className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase"
                                style={
                                  protocol
                                    ? { backgroundColor: protocol.bg, color: protocol.text }
                                    : {}
                                }
                              >
                                {protocol?.label || "—"}
                              </span>
                            )}
                          </td>
                        )}
                        {visibleColumns.account && (
                          <td
                            className="px-3 py-2 text-text-muted truncate max-w-[120px]"
                            title={accountLabel}
                          >
                            {accountLabel}
                          </td>
                        )}
                        {visibleColumns.apiKey && (
                          <td
                            className="px-3 py-2 text-text-muted truncate max-w-[140px]"
                            title={log.apiKeyName || log.apiKeyId || t("noApiKey")}
                          >
                            {isActive ? (
                              <span className="text-text-muted text-[10px]">—</span>
                            ) : (
                              formatApiKeyLabel(log.apiKeyName, log.apiKeyId)
                            )}
                          </td>
                        )}
                        {visibleColumns.combo && (
                          <td className="px-3 py-2">
                            {isActive ? (
                              <span className="text-text-muted text-[10px]">—</span>
                            ) : log.comboName ? (
                              <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-violet-500/20 text-violet-800 dark:text-violet-300 border border-violet-500/40">
                                {log.comboName}
                              </span>
                            ) : (
                              <span className="text-text-muted text-[10px]">—</span>
                            )}
                          </td>
                        )}
                        {visibleColumns.tokens && (
                          <td className="px-3 py-2 text-right whitespace-nowrap">
                            {isActive ? (
                              <span className="text-text-muted text-[10px]">—</span>
                            ) : (
                              <>
                                <span className="text-text-muted">TI:</span>{" "}
                                <span className="text-primary">
                                  {log.tokens?.in?.toLocaleString() || 0}
                                </span>
                                <span className="mx-1 text-border">|</span>
                                <span className="text-text-muted">TO:</span>{" "}
                                <span className="text-emerald-700 dark:text-emerald-400">
                                  {log.tokens?.out?.toLocaleString() || 0}
                                </span>
                                {log.tokens?.compressed != null && log.tokens.compressed > 0 && (
                                  <>
                                    <span className="mx-1 text-border">|</span>
                                    <span
                                      className="text-purple-500 dark:text-purple-400 font-semibold"
                                      title={`${log.tokens.compressed.toLocaleString()} tokens compressed`}
                                    >
                                      ↓{log.tokens.compressed.toLocaleString()}
                                    </span>
                                  </>
                                )}
                              </>
                            )}
                          </td>
                        )}
                        {visibleColumns.tps && (
                          <td className="px-3 py-2 text-right whitespace-nowrap font-mono">
                            {isActive ? (
                              <span className="text-text-muted text-[10px]">—</span>
                            ) : (
                              (() => {
                                const tps = getLogTps(log);
                                const color =
                                  tps <= 0
                                    ? "text-text-muted"
                                    : tps >= 80
                                      ? "text-emerald-600 dark:text-emerald-400"
                                      : tps >= 30
                                        ? "text-sky-600 dark:text-sky-400"
                                        : "text-amber-600 dark:text-amber-400";
                                return (
                                  <span className={color} title={`${tps.toFixed(2)} tokens/sec`}>
                                    {formatTps(tps)}
                                  </span>
                                );
                              })()
                            )}
                          </td>
                        )}
                        {visibleColumns.duration && (
                          <td className="px-3 py-2 text-right text-text-muted font-mono">
                            {formatDuration(log.duration)}
                          </td>
                        )}
                        {visibleColumns.time && (
                          <td className="px-3 py-2 text-right text-text-muted">
                            {formatTime(log.timestamp)}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {hasMore && sortedLogs.length > 0 && (
              <div
                ref={loadMoreSentinelRef}
                className="flex justify-center py-3 border-t border-border/30"
              >
                <button
                  type="button"
                  onClick={loadMore}
                  className="px-4 py-1.5 text-xs rounded-md border border-border bg-bg-subtle hover:bg-bg-muted text-text-muted transition-colors"
                >
                  {loading ? t("loadingMore") : t("loadMore")}
                </button>
              </div>
            )}
          </div>
        </Card>

        <div className="text-[10px] text-text-muted italic">
          {t("callLogsInfo", {
            dataDir: "{DATA_DIR}/call_logs/",
            retentionDays: "CALL_LOG_RETENTION_DAYS",
            maxEntries: "CALL_LOG_MAX_ENTRIES",
          })}
        </div>

        {/* Detail Modal */}
        {selectedLog && (
          <RequestLoggerDetail
            log={selectedLog}
            detail={detailData}
            loading={detailLoading}
            debugEnabled={selectedLog.active ? true : detailLoggingEnabled}
            emailsVisible={emailsVisible}
            onClose={closeDetail}
            onCopy={copyToClipboard}
            onPrevious={handlePrev}
            onNext={handleNext}
          />
        )}
      </div>
    );
  }
);

RequestLoggerV2.displayName = "RequestLoggerV2";

export default RequestLoggerV2;
