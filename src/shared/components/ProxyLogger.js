"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Card from "./Card";
import ProxyLogDetail from "./ProxyLogDetail";
import {
  TYPE_COLORS,
  LEVEL_COLORS,
  PROVIDER_COLORS,
  getProxyStatusStyle as getStatusStyle,
} from "@/shared/constants/colors";
import {
  formatTime,
  formatDuration as formatLatency,
  truncateUrl,
} from "@/shared/utils/formatting";

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "error", label: "Errors", icon: "error" },
  { key: "ok", label: "Success", icon: "check_circle" },
  { key: "timeout", label: "Timeout", icon: "timer_off" },
];

const COLUMNS = [
  { key: "status", label: "Status" },
  { key: "proxy", label: "Proxy" },
  { key: "type", label: "Type" },
  { key: "level", label: "Level" },
  { key: "provider", label: "Provider" },
  { key: "target", label: "Target" },
  { key: "latency", label: "Latency" },
  { key: "ip", label: "Public IP" },
  { key: "time", label: "Time" },
];

const DEFAULT_VISIBLE = Object.fromEntries(COLUMNS.map((c) => [c.key, true]));

export default function ProxyLogger() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recording, setRecording] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedType, setSelectedType] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedLog, setSelectedLog] = useState(null);
  const intervalRef = useRef(null);
  const hasLoadedRef = useRef(false);

  const [visibleColumns, setVisibleColumns] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_VISIBLE;
    try {
      const saved = localStorage.getItem("proxyLoggerVisibleColumns");
      return saved ? { ...DEFAULT_VISIBLE, ...JSON.parse(saved) } : DEFAULT_VISIBLE;
    } catch {
      return DEFAULT_VISIBLE;
    }
  });

  const toggleColumn = useCallback((key) => {
    setVisibleColumns((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem("proxyLoggerVisibleColumns", JSON.stringify(next));
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
        if (activeFilter === "timeout") params.set("status", "timeout");
        if (selectedType) params.set("type", selectedType);
        if (selectedProvider) params.set("provider", selectedProvider);
        if (selectedLevel) params.set("level", selectedLevel);
        params.set("limit", "300");

        const res = await fetch(`/api/usage/proxy-logs?${params}`);
        if (res.ok) {
          const data = await res.json();
          setLogs(data);
        }
      } catch (error) {
        console.error("Failed to fetch proxy logs:", error);
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [search, activeFilter, selectedType, selectedProvider, selectedLevel]
  );

  useEffect(() => {
    const showLoading = !hasLoadedRef.current;
    hasLoadedRef.current = true;
    fetchLogs(showLoading);
  }, [fetchLogs]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (recording) {
      intervalRef.current = setInterval(() => fetchLogs(false), 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [recording, fetchLogs]);

  const sortedLogs = useMemo(() => {
    const arr = [...logs];
    arr.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.timestamp) - new Date(b.timestamp);
        case "latency_desc":
          return (b.latencyMs || 0) - (a.latencyMs || 0);
        case "latency_asc":
          return (a.latencyMs || 0) - (b.latencyMs || 0);
        case "newest":
        default:
          return new Date(b.timestamp) - new Date(a.timestamp);
      }
    });
    return arr;
  }, [logs, sortBy]);

  const uniqueProviders = [...new Set(logs.map((l) => l.provider).filter(Boolean))].sort();
  const uniqueTypes = [...new Set(logs.map((l) => l.proxy?.type).filter(Boolean))].sort();
  const uniqueLevels = [...new Set(logs.map((l) => l.level).filter(Boolean))].sort();

  const totalCount = logs.length;
  const okCount = logs.filter((l) => l.status === "success").length;
  const errorCount = logs.filter((l) => l.status === "error").length;
  const timeoutCount = logs.filter((l) => l.status === "timeout").length;
  const directCount = logs.filter((l) => l.level === "direct").length;

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
            placeholder="Search host, provider, target, IP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
          />
        </div>

        {/* Type Dropdown */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary focus:outline-none focus:border-primary appearance-none cursor-pointer min-w-[120px]"
        >
          <option value="">All Types</option>
          {uniqueTypes.map((t) => (
            <option key={t} value={t}>
              {(TYPE_COLORS[t]?.label || t).toUpperCase()}
            </option>
          ))}
        </select>

        {/* Level Dropdown */}
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-3 py-2 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary focus:outline-none focus:border-primary appearance-none cursor-pointer min-w-[120px]"
        >
          <option value="">All Levels</option>
          {uniqueLevels.map((l) => (
            <option key={l} value={l}>
              {LEVEL_COLORS[l]?.label || l}
            </option>
          ))}
        </select>

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
          {timeoutCount > 0 && (
            <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400 font-mono">
              {timeoutCount} TMO
            </span>
          )}
          {directCount > 0 && (
            <span className="px-2 py-1 rounded bg-gray-500/10 text-gray-400 font-mono">
              {directCount} direct
            </span>
          )}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded-lg bg-bg-subtle border border-border text-sm text-text-primary focus:outline-none focus:border-primary appearance-none cursor-pointer min-w-[140px]"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="latency_desc">Latency ↓</option>
          <option value="latency_asc">Latency ↑</option>
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
                    : f.key === "timeout"
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                      : "bg-primary text-white border-primary"
                : "bg-bg-subtle border-border text-text-muted hover:border-text-muted"
            }`}
          >
            {f.icon && <span className="material-symbols-outlined text-[14px]">{f.icon}</span>}
            {f.label}
          </button>
        ))}

        {uniqueProviders.length > 0 && <span className="w-px h-5 bg-border mx-1" />}

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
            <div className="p-8 text-center text-text-muted">Loading proxy logs...</div>
          ) : logs.length === 0 ? (
            <div className="p-8 text-center text-text-muted">
              <span className="material-symbols-outlined text-[48px] mb-2 block opacity-40">
                vpn_lock
              </span>
              No proxy logs yet. Configure proxies and make API calls to see them here.
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
                  {visibleColumns.proxy && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      Proxy
                    </th>
                  )}
                  {visibleColumns.type && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      Type
                    </th>
                  )}
                  {visibleColumns.level && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      Level
                    </th>
                  )}
                  {visibleColumns.provider && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      Provider
                    </th>
                  )}
                  {visibleColumns.target && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      Target
                    </th>
                  )}
                  {visibleColumns.latency && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px] text-right">
                      Latency
                    </th>
                  )}
                  {visibleColumns.ip && (
                    <th className="px-3 py-2.5 font-semibold text-text-muted uppercase tracking-wider text-[10px]">
                      Public IP
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
                  const typeColor = TYPE_COLORS[log.proxy?.type] || {
                    bg: "#6B7280",
                    text: "#fff",
                    label: log.proxy?.type || "-",
                  };
                  const levelColor = LEVEL_COLORS[log.level] || LEVEL_COLORS.direct;
                  const providerColor = PROVIDER_COLORS[log.provider] || {
                    bg: "#374151",
                    text: "#fff",
                    label: (log.provider || "-").toUpperCase(),
                  };
                  const isError = log.status === "error" || log.status === "timeout";

                  return (
                    <tr
                      key={log.id}
                      onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                      className={`cursor-pointer hover:bg-primary/5 transition-colors ${isError ? "bg-red-500/5" : ""}`}
                    >
                      {visibleColumns.status && (
                        <td className="px-3 py-2">
                          <span
                            className="inline-block px-2 py-0.5 rounded text-[10px] font-bold min-w-[50px] text-center uppercase"
                            style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                          >
                            {log.status}
                          </span>
                        </td>
                      )}
                      {visibleColumns.proxy && (
                        <td className="px-3 py-2 font-mono text-[11px] text-primary">
                          {log.proxy ? `${log.proxy.host}:${log.proxy.port}` : "—"}
                        </td>
                      )}
                      {visibleColumns.type && (
                        <td className="px-3 py-2">
                          <span
                            className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase"
                            style={{ backgroundColor: typeColor.bg, color: typeColor.text }}
                          >
                            {typeColor.label}
                          </span>
                        </td>
                      )}
                      {visibleColumns.level && (
                        <td className="px-3 py-2">
                          <span
                            className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase"
                            style={{ backgroundColor: levelColor.bg, color: levelColor.text }}
                          >
                            {levelColor.label}
                          </span>
                        </td>
                      )}
                      {visibleColumns.provider && (
                        <td className="px-3 py-2">
                          {log.provider ? (
                            <span
                              className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase"
                              style={{
                                backgroundColor: providerColor.bg,
                                color: providerColor.text,
                              }}
                            >
                              {providerColor.label}
                            </span>
                          ) : (
                            <span className="text-text-muted text-[10px]">—</span>
                          )}
                        </td>
                      )}
                      {visibleColumns.target && (
                        <td
                          className="px-3 py-2 text-text-muted truncate max-w-[200px] font-mono text-[10px]"
                          title={log.targetUrl}
                        >
                          {truncateUrl(log.targetUrl)}
                        </td>
                      )}
                      {visibleColumns.latency && (
                        <td className="px-3 py-2 text-right text-text-muted font-mono">
                          {formatLatency(log.latencyMs)}
                        </td>
                      )}
                      {visibleColumns.ip && (
                        <td className="px-3 py-2 font-mono text-[11px] text-emerald-400">
                          {log.publicIp || "—"}
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

      {/* Detail Panel */}
      {selectedLog && <ProxyLogDetail log={selectedLog} onClose={() => setSelectedLog(null)} />}
    </div>
  );
}
