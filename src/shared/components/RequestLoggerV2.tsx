"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
  maskSegment,
  maskAccount,
  formatApiKeyLabel,
} from "@/shared/utils/formatting";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";

/**
 * Get a friendly display label for compatible providers.
 * Converts long IDs like "openai-compatible-chat-02669115-2545-4896-b003-cb4dac09d441"
 * to readable labels. If providerNodes are available, uses user-defined name;
 * otherwise falls back to "OAI-Compat".
 */
function getProviderDisplayLabel(provider: string, providerNodes?: any[]): string {
  if (!provider) return "-";
  if (provider.startsWith("openai-compatible-") || provider.startsWith("anthropic-compatible-")) {
    // Try to find user-defined name from provider nodes
    if (providerNodes?.length) {
      const matchedNode = providerNodes.find(
        (node) => node.id === provider || node.prefix === provider
      );
      if (matchedNode?.name) return matchedNode.name;
    }
    // Fallback to generic labels
    if (provider.startsWith("openai-compatible-")) {
      const suffix = provider.replace("openai-compatible-", "");
      const parts = suffix.split("-");
      if (parts.length > 1 && parts[1]?.length >= 8) return `OAI-COMPAT`;
      return `OAI: ${suffix.slice(0, 16).toUpperCase()}`;
    }
    if (provider.startsWith("anthropic-compatible-")) {
      const suffix = provider.replace("anthropic-compatible-", "");
      const parts = suffix.split("-");
      if (parts.length > 1 && parts[1]?.length >= 8) return `ANT-COMPAT`;
      return `ANT: ${suffix.slice(0, 16).toUpperCase()}`;
    }
  }
  return null; // Not a compatible provider, use default PROVIDER_COLORS
}

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

export default function RequestLoggerV2() {
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
  const intervalRef = useRef(null);
  const hasLoadedRef = useRef(false);
  const logsSignatureRef = useRef("");
  const [providerNodes, setProviderNodes] = useState([]);

  // Column visibility with localStorage persistence
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const defaultVisible = Object.fromEntries(columns.map((c) => [c.key, true]));
    if (typeof window === "undefined") return defaultVisible;
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
        params.set("limit", "300");

        const res = await fetch(`/api/usage/call-logs?${params}`);
        if (res.ok) {
          const data = await res.json();
          // Skip re-render if data hasn't changed (#1369 GPU perf)
          const sig = JSON.stringify(data.map?.((l: any) => l.id) ?? []);
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
    [search, activeFilter, selectedModel, selectedAccount, selectedProvider, selectedApiKey]
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

  // Auto-refresh
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (recording) {
      intervalRef.current = setInterval(() => fetchLogs(false), 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [recording, fetchLogs]);

  const filteredLogs = useMemo(() => {
    if (activeFilter === "combo") return logs.filter((l) => l.comboName);
    return logs;
  }, [activeFilter, logs]);

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

  // Fetch log detail
  const openDetail = async (logEntry) => {
    setSelectedLog(logEntry);
    setDetailLoading(true);
    setDetailData(null);
    try {
      const res = await fetch(`/api/usage/call-logs/${logEntry.id}`);
      if (res.ok) {
        const data = await res.json();
        setDetailData(data);
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
  };

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

  // Unique accounts and providers for dropdowns

  const uniqueAccounts = [...new Set(logs.map((l) => l.account).filter((a) => a && a !== "-"))];
  const uniqueModels = [
    ...new Set(logs.flatMap((l) => [l.model, l.requestedModel]).filter((value) => Boolean(value))),
  ].sort();
  const uniqueProviders = [
    ...new Set(logs.map((l) => l.provider).filter((p) => p && p !== "-")),
  ].sort();
  const uniqueApiKeys = [
    ...new Set(logs.map((l) => l.apiKeyId || l.apiKeyName).filter(Boolean)),
  ].sort();

  // Stats
  const totalCount = filteredLogs.length;
  const okCount = filteredLogs.filter((l) => l.status >= 200 && l.status < 300).length;
  const errorCount = filteredLogs.filter((l) => l.status >= 400).length;
  const comboCount = logs.filter((l) => l.comboName).length;
  const apiKeyCount = uniqueApiKeys.length;

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
              {a}
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
      <Card className="overflow-hidden bg-black/5 dark:bg-black/20">
        <div className="p-0 overflow-x-auto max-h-[calc(100vh-320px)] overflow-y-auto">
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
            <table className="w-full text-left border-collapse text-xs">
              <thead
                className="sticky top-0 z-10"
                style={{ backgroundColor: "var(--color-bg, #fff)" }}
              >
                <tr
                  className="border-b border-border"
                  style={{ backgroundColor: "var(--color-bg, #fff)" }}
                >
                  {visibleColumns.status && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      {t("columns.status")}
                    </th>
                  )}
                  {visibleColumns.cacheSource && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      {t("columns.cacheSource")}
                    </th>
                  )}
                  {visibleColumns.model && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      {t("columns.model")}
                    </th>
                  )}
                  {visibleColumns.requestedModel && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      {t("columns.requested")}
                    </th>
                  )}
                  {visibleColumns.provider && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      {t("columns.provider")}
                    </th>
                  )}
                  {visibleColumns.protocol && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      {t("columns.protocol")}
                    </th>
                  )}
                  {visibleColumns.account && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      {t("columns.account")}
                    </th>
                  )}
                  {visibleColumns.apiKey && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      {t("columns.apiKey")}
                    </th>
                  )}
                  {visibleColumns.combo && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      {t("columns.combo")}
                    </th>
                  )}
                  {visibleColumns.tokens && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px] text-right">
                      {t("columns.tokens")}
                    </th>
                  )}
                  {visibleColumns.tps && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px] text-right">
                      {t("columns.tps")}
                    </th>
                  )}
                  {visibleColumns.duration && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px] text-right">
                      {t("columns.duration")}
                    </th>
                  )}
                  {visibleColumns.time && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px] text-right">
                      {t("columns.time")}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {sortedLogs.map((log) => {
                  const statusStyle = getStatusStyle(log.status);
                  const protocolKey = log.sourceFormat || log.provider;
                  const protocol = getProtocolColor(protocolKey, log.provider);
                  const compatLabel = getProviderDisplayLabel(log.provider, providerNodes);
                  const providerColor = PROVIDER_COLORS[log.provider] || {
                    bg: "#374151",
                    text: "#fff",
                    label: compatLabel || (log.provider || "-").toUpperCase(),
                  };
                  const providerLabel = compatLabel || providerColor.label;
                  const isError = log.status >= 400;
                  const cacheSourceMeta = getCacheSourceMeta(log.cacheSource);
                  const isSemanticCache = cacheSourceMeta.key === "semantic";

                  return (
                    <tr
                      key={log.id}
                      onClick={() => openDetail(log)}
                      className={`cursor-pointer hover:bg-primary/5 transition-colors ${isError ? "bg-red-500/5" : ""}`}
                    >
                      {visibleColumns.status && (
                        <td className="px-3 py-2">
                          <span
                            className="inline-block px-2 py-0.5 rounded text-[10px] font-bold min-w-[36px] text-center"
                            style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                          >
                            {log.status || "..."}
                          </span>
                        </td>
                      )}
                      {visibleColumns.cacheSource && (
                        <td className="px-3 py-2">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase ${cacheSourceMeta.className}`}
                            title={isSemanticCache ? t("semanticCacheHit") : t("upstreamResponse")}
                          >
                            {isSemanticCache ? t("semantic") : t("upstream")}
                          </span>
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
                            style={{ backgroundColor: providerColor.bg, color: providerColor.text }}
                          >
                            {providerLabel}
                          </span>
                        </td>
                      )}
                      {visibleColumns.protocol && (
                        <td className="px-3 py-2">
                          <span
                            className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase"
                            style={{ backgroundColor: protocol.bg, color: protocol.text }}
                          >
                            {protocol.label}
                          </span>
                        </td>
                      )}
                      {visibleColumns.account && (
                        <td
                          className="px-3 py-2 text-text-muted truncate max-w-[120px]"
                          title={log.account}
                        >
                          {maskAccount(log.account, emailsVisible)}
                        </td>
                      )}
                      {visibleColumns.apiKey && (
                        <td
                          className="px-3 py-2 text-text-muted truncate max-w-[140px]"
                          title={log.apiKeyName || log.apiKeyId || t("noApiKey")}
                        >
                          {formatApiKeyLabel(log.apiKeyName, log.apiKeyId)}
                        </td>
                      )}
                      {visibleColumns.combo && (
                        <td className="px-3 py-2">
                          {log.comboName ? (
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
                          <span className="text-text-muted">TI:</span>{" "}
                          <span className="text-primary">
                            {log.tokens?.in?.toLocaleString() || 0}
                          </span>
                          <span className="mx-1 text-border">|</span>
                          <span className="text-text-muted">TO:</span>{" "}
                          <span className="text-emerald-700 dark:text-emerald-400">
                            {log.tokens?.out?.toLocaleString() || 0}
                          </span>
                        </td>
                      )}
                      {visibleColumns.tps && (
                        <td className="px-3 py-2 text-right whitespace-nowrap font-mono">
                          {(() => {
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
                          })()}
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
          debugEnabled={detailLoggingEnabled}
          onClose={closeDetail}
          onCopy={copyToClipboard}
        />
      )}
    </div>
  );
}
