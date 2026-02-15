"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Card from "./Card";
import RequestLoggerDetail from "./RequestLoggerDetail";
import {
  PROTOCOL_COLORS,
  PROVIDER_COLORS,
  getHttpStatusStyle as getStatusStyle,
} from "@/shared/constants/colors";
import {
  formatTime,
  formatDuration,
  maskSegment,
  maskAccount,
  formatApiKeyLabel,
} from "@/shared/utils/formatting";

// Quick filter categories - status-based only (providers are dynamic from data)
const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "error", label: "Errors", icon: "error" },
  { key: "ok", label: "Success", icon: "check_circle" },
  { key: "combo", label: "Combo", icon: "hub" },
];

// Column definitions for visibility toggles
const COLUMNS = [
  { key: "status", label: "Status" },
  { key: "model", label: "Model" },
  { key: "provider", label: "Provider" },
  { key: "protocol", label: "Protocol" },
  { key: "account", label: "Account" },
  { key: "apiKey", label: "API Key" },
  { key: "combo", label: "Combo" },
  { key: "tokens", label: "Tokens" },
  { key: "duration", label: "Duration" },
  { key: "time", label: "Time" },
];

const DEFAULT_VISIBLE = Object.fromEntries(COLUMNS.map((c) => [c.key, true]));

function getLogTotalTokens(log) {
  return (log?.tokens?.in || 0) + (log?.tokens?.out || 0);
}

export default function RequestLoggerV2() {
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
  const intervalRef = useRef(null);
  const hasLoadedRef = useRef(false);

  // Column visibility with localStorage persistence
  const [visibleColumns, setVisibleColumns] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_VISIBLE;
    try {
      const saved = localStorage.getItem("loggerVisibleColumns");
      return saved ? { ...DEFAULT_VISIBLE, ...JSON.parse(saved) } : DEFAULT_VISIBLE;
    } catch {
      return DEFAULT_VISIBLE;
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
          setLogs(data);
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

  // Copy to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback for non-HTTPS or older browsers
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        return true;
      } catch {
        return false;
      }
    }
  };

  // Unique accounts and providers for dropdowns
  const uniqueAccounts = [...new Set(logs.map((l) => l.account).filter((a) => a && a !== "-"))];
  const uniqueModels = [...new Set(logs.map((l) => l.model).filter(Boolean))].sort();
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
              ? "bg-red-500/10 border-red-500/30 text-red-400"
              : "bg-bg-subtle border-border text-text-muted"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${recording ? "bg-red-500 animate-pulse" : "bg-text-muted"}`}
          />
          {recording ? "Recording" : "Paused"}
        </button>

        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search model, provider, account, API key, combo..."
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
          <option value="">All Providers</option>
          {uniqueProviders.map((p) => {
            const pc = PROVIDER_COLORS[p];
            return (
              <option key={p} value={p}>
                {pc?.label || p.toUpperCase()}
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
          <option value="">All Models</option>
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
          <option value="">All Accounts</option>
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
          <option value="">All API Keys</option>
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
            {totalCount} total
          </span>
          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono">
            {okCount} OK
          </span>
          {errorCount > 0 && (
            <span className="px-2 py-1 rounded bg-red-500/10 text-red-400 font-mono">
              {errorCount} ERR
            </span>
          )}
          {comboCount > 0 && (
            <span className="px-2 py-1 rounded bg-violet-500/10 text-violet-300 font-mono">
              {comboCount} combo
            </span>
          )}
          {apiKeyCount > 0 && (
            <span className="px-2 py-1 rounded bg-primary/10 text-primary font-mono">
              {apiKeyCount} keys
            </span>
          )}
          <span className="px-2 py-1 rounded bg-bg-subtle border border-border font-mono">
            {sortedLogs.length} shown
          </span>
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary focus:outline-none focus:border-primary appearance-none cursor-pointer min-w-[150px]"
          title="Sort logs"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="tokens_desc">Tokens ↓</option>
          <option value="tokens_asc">Tokens ↑</option>
          <option value="duration_desc">Duration ↓</option>
          <option value="duration_asc">Duration ↑</option>
          <option value="status_desc">Status ↓</option>
          <option value="status_asc">Status ↑</option>
          <option value="model_asc">Model A-Z</option>
          <option value="model_desc">Model Z-A</option>
        </select>

        {/* Refresh */}
        <button
          onClick={() => fetchLogs(false)}
          className="p-2 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors"
          title="Refresh"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
        </button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status Filters */}
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(activeFilter === f.key ? "all" : f.key)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              activeFilter === f.key
                ? f.key === "error"
                  ? "bg-red-500/20 text-red-400 border-red-500/40"
                  : f.key === "ok"
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : f.key === "combo"
                      ? "bg-violet-500/20 text-violet-300 border-violet-500/40"
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
          const pc = PROVIDER_COLORS[p] || { bg: "#374151", text: "#fff", label: p.toUpperCase() };
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
              {pc.label}
            </button>
          );
        })}
      </div>

      {/* Column Visibility Toggles */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] text-text-muted uppercase tracking-wider mr-1">Columns</span>
        {COLUMNS.map((col) => (
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
            <div className="p-8 text-center text-text-muted">Loading logs...</div>
          ) : logs.length === 0 ? (
            <div className="p-8 text-center text-text-muted">
              <span className="material-symbols-outlined text-[48px] mb-2 block opacity-40">
                receipt_long
              </span>
              No logs recorded yet. Make some API calls to see them here.
            </div>
          ) : sortedLogs.length === 0 ? (
            <div className="p-8 text-center text-text-muted">
              No logs match the current filters.
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead
                className="sticky top-0 z-10"
                style={{ backgroundColor: "var(--bg-primary, #0f1117)" }}
              >
                <tr
                  className="border-b border-border"
                  style={{ backgroundColor: "var(--bg-primary, #0f1117)" }}
                >
                  {visibleColumns.status && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      Status
                    </th>
                  )}
                  {visibleColumns.model && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      Model
                    </th>
                  )}
                  {visibleColumns.provider && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      Provider
                    </th>
                  )}
                  {visibleColumns.protocol && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      Protocol
                    </th>
                  )}
                  {visibleColumns.account && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      Account
                    </th>
                  )}
                  {visibleColumns.apiKey && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      API Key
                    </th>
                  )}
                  {visibleColumns.combo && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      Combo
                    </th>
                  )}
                  {visibleColumns.tokens && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px] text-right">
                      Tokens
                    </th>
                  )}
                  {visibleColumns.duration && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px] text-right">
                      Duration
                    </th>
                  )}
                  {visibleColumns.time && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px] text-right">
                      Time
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {sortedLogs.map((log) => {
                  const statusStyle = getStatusStyle(log.status);
                  const protocolKey = log.sourceFormat || log.provider;
                  const protocol = PROTOCOL_COLORS[protocolKey] ||
                    PROTOCOL_COLORS[log.provider] || {
                      bg: "#6B7280",
                      text: "#fff",
                      label: (protocolKey || log.provider || "-").toUpperCase(),
                    };
                  const providerColor = PROVIDER_COLORS[log.provider] || {
                    bg: "#374151",
                    text: "#fff",
                    label: (log.provider || "-").toUpperCase(),
                  };
                  const isError = log.status >= 400;

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
                      {visibleColumns.model && (
                        <td className="px-3 py-2 font-medium text-primary font-mono text-[11px]">
                          {log.model}
                        </td>
                      )}
                      {visibleColumns.provider && (
                        <td className="px-3 py-2">
                          <span
                            className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase"
                            style={{ backgroundColor: providerColor.bg, color: providerColor.text }}
                          >
                            {providerColor.label}
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
                          {maskAccount(log.account)}
                        </td>
                      )}
                      {visibleColumns.apiKey && (
                        <td
                          className="px-3 py-2 text-text-muted truncate max-w-[140px]"
                          title={log.apiKeyName || log.apiKeyId || "No API key"}
                        >
                          {formatApiKeyLabel(log.apiKeyName, log.apiKeyId)}
                        </td>
                      )}
                      {visibleColumns.combo && (
                        <td className="px-3 py-2">
                          {log.comboName ? (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                              {log.comboName}
                            </span>
                          ) : (
                            <span className="text-text-muted text-[10px]">—</span>
                          )}
                        </td>
                      )}
                      {visibleColumns.tokens && (
                        <td className="px-3 py-2 text-right whitespace-nowrap">
                          <span className="text-text-muted">I:</span>{" "}
                          <span className="text-primary">
                            {log.tokens?.in?.toLocaleString() || 0}
                          </span>
                          <span className="mx-1 text-border">|</span>
                          <span className="text-text-muted">O:</span>{" "}
                          <span className="text-emerald-400">
                            {log.tokens?.out?.toLocaleString() || 0}
                          </span>
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
        Call logs are also saved as JSON files to <code>{`{DATA_DIR}/call_logs/`}</code> with 7-day
        rotation.
      </div>

      {/* Detail Modal */}
      {selectedLog && (
        <RequestLoggerDetail
          log={selectedLog}
          detail={detailData}
          loading={detailLoading}
          onClose={closeDetail}
          onCopy={copyToClipboard}
        />
      )}
    </div>
  );
}
