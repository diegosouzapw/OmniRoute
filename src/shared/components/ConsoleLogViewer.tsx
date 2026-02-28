"use client";

import { useTranslations } from "next-intl";

/**
 * Console Log Viewer — Real-time application log viewer.
 *
 * Displays structured application logs from the server with a terminal-like UI.
 * Polls the backend API every 5 seconds. Shows logs from the last 1 hour.
 * Supports level filtering, text search, auto-scroll, and copy-to-clipboard.
 */

import { useState, useEffect, useRef, useCallback } from "react";

interface LogEntry {
  timestamp: string;
  level: string;
  component?: string;
  module?: string;
  message?: string;
  msg?: string;
  correlationId?: string;
  [key: string]: unknown;
}

const LEVEL_COLORS: Record<string, string> = {
  debug: "text-gray-400",
  trace: "text-gray-500",
  info: "text-cyan-400",
  warn: "text-yellow-400",
  error: "text-red-400",
  fatal: "text-fuchsia-400",
};

const LEVEL_BG: Record<string, string> = {
  debug: "bg-gray-500/10 border-gray-500/20",
  trace: "bg-gray-500/10 border-gray-500/20",
  info: "bg-cyan-500/10 border-cyan-500/20",
  warn: "bg-yellow-500/10 border-yellow-500/20",
  error: "bg-red-500/10 border-red-500/20",
  fatal: "bg-fuchsia-500/10 border-fuchsia-500/20",
};

const POLL_INTERVAL = 5000; // 5 seconds

export default function ConsoleLogViewer() {
  const t = useTranslations("loggers");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchLogs = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (levelFilter !== "all") params.set("level", levelFilter);
      params.set("limit", "500");

      const res = await fetch(`/api/logs/console?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: LogEntry[] = await res.json();

      setLogs(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  }, [levelFilter]);

  // Initial fetch + polling
  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchLogs]);

  // Auto-scroll to bottom on new logs
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const handleCopy = (entry: LogEntry, idx: number) => {
    const text = JSON.stringify(entry, null, 2);
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  };

  const formatTime = (ts: string) => {
    try {
      const d = new Date(ts);
      return d.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
      });
    } catch {
      return ts;
    }
  };

  const getText = (entry: LogEntry) => entry.msg || entry.message || "";
  const getComponent = (entry: LogEntry) => entry.component || entry.module || "";

  // Apply text search filter
  const filteredLogs = searchText
    ? logs.filter((entry) => {
        const full = JSON.stringify(entry).toLowerCase();
        return full.includes(searchText.toLowerCase());
      })
    : logs;

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
        {/* Level filter */}
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          aria-label="Filter by log level"
          className="px-3 py-2 rounded-lg text-sm bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-main)] focus:outline-2 focus:outline-[var(--color-accent)]"
        >
          <option value="all">{t("allLevels")}</option>
          <option value="debug">Debug+</option>
          <option value="info">Info+</option>
          <option value="warn">Warn+</option>
          <option value="error">Error+</option>
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Search logs..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          aria-label="Search log entries"
          className="flex-1 min-w-[200px] px-3 py-2 rounded-lg text-sm bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-2 focus:outline-[var(--color-accent)]"
        />

        {/* Auto-scroll toggle */}
        <button
          onClick={() => setAutoScroll(!autoScroll)}
          title={autoScroll ? "Disable auto-scroll" : "Enable auto-scroll"}
          className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
            autoScroll
              ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
              : "bg-[var(--color-bg)] text-[var(--color-text-muted)] border-[var(--color-border)]"
          }`}
        >
          <span className="material-symbols-outlined text-[16px] align-middle mr-1">
            {autoScroll ? "vertical_align_bottom" : "lock"}
          </span>
          Auto-scroll
        </button>

        {/* Refresh */}
        <button
          onClick={fetchLogs}
          disabled={loading}
          className="px-3 py-2 rounded-lg text-sm font-medium bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-[var(--color-bg-alt)] disabled:opacity-50 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px] align-middle">refresh</span>
        </button>

        {/* Status */}
        <div className="flex items-center gap-2 ml-auto text-xs text-[var(--color-text-muted)]">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>{filteredLogs.length} entries</span>
          <span className="text-[var(--color-text-muted)]/50">•</span>
          <span>Last 1h</span>
          {lastUpdated && (
            <>
              <span className="text-[var(--color-text-muted)]/50">•</span>
              <span>Updated {lastUpdated.toLocaleTimeString()}</span>
            </>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
          role="alert"
        >
          <span className="material-symbols-outlined text-[16px] align-middle mr-2">error</span>
          {error}
          <span className="text-xs ml-2 opacity-70">
            — Make sure the application is writing logs to file (LOG_TO_FILE=true)
          </span>
        </div>
      )}

      {/* Console output */}
      <div
        ref={scrollRef}
        className="rounded-xl border border-[var(--color-border)] bg-[#0d1117] overflow-auto font-mono text-xs leading-relaxed"
        style={{ maxHeight: "calc(100vh - 340px)", minHeight: "400px" }}
        role="log"
        aria-label="Application console logs"
        aria-live="polite"
      >
        {/* Header bar */}
        <div className="sticky top-0 z-10 px-4 py-2 bg-[#161b22] border-b border-[#30363d] flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          <span className="ml-3 text-[#8b949e] text-[11px]">OmniRoute — Application Console</span>
        </div>

        {/* Log entries */}
        <div className="p-3 space-y-px">
          {filteredLogs.length === 0 && !loading ? (
            <div className="text-[#8b949e] text-center py-12">
              <span className="material-symbols-outlined text-[40px] block mb-2 opacity-30">
                terminal
              </span>
              <p>{t("noLogEntries")}</p>
              <p className="text-[10px] mt-1 opacity-60">
                Ensure LOG_TO_FILE=true is set in your .env file
              </p>
            </div>
          ) : (
            filteredLogs.map((entry, idx) => {
              const level = (entry.level || "info").toLowerCase();
              const colorClass = LEVEL_COLORS[level] || LEVEL_COLORS.info;
              const bgClass = LEVEL_BG[level] || "";
              const comp = getComponent(entry);
              const msg = getText(entry);

              return (
                <div
                  key={idx}
                  className={`group flex items-start gap-2 px-2 py-1 rounded hover:bg-white/5 transition-colors ${
                    level === "error" || level === "fatal" ? "bg-red-500/5" : ""
                  }`}
                >
                  {/* Timestamp */}
                  <span className="text-[#484f58] whitespace-nowrap shrink-0 select-none">
                    {formatTime(entry.timestamp)}
                  </span>

                  {/* Level badge */}
                  <span
                    className={`inline-block px-1.5 py-0 rounded text-[10px] font-semibold uppercase border shrink-0 ${colorClass} ${bgClass}`}
                  >
                    {level.padEnd(5)}
                  </span>

                  {/* Component */}
                  {comp && <span className="text-purple-400/80 shrink-0">[{comp}]</span>}

                  {/* Message */}
                  <span className="text-[#c9d1d9] flex-1 break-all">
                    {msg}
                    {/* Extra meta */}
                    {entry.correlationId && (
                      <span className="text-[#484f58] ml-2">
                        cid:{entry.correlationId.slice(0, 8)}
                      </span>
                    )}
                  </span>

                  {/* Copy button */}
                  <button
                    onClick={() => handleCopy(entry, idx)}
                    title="Copy log entry"
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-[#8b949e] hover:text-white"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {copiedIdx === idx ? "check" : "content_copy"}
                    </span>
                  </button>
                </div>
              );
            })
          )}

          {loading && filteredLogs.length === 0 && (
            <div className="text-[#8b949e] text-center py-12">
              <span className="material-symbols-outlined text-[24px] animate-spin block mb-2">
                progress_activity
              </span>
              Loading logs...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
