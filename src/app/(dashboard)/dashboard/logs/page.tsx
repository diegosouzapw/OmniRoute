"use client";

import { useState, useRef, useEffect } from "react";
import { ConfirmModal, RequestLoggerV2 } from "@/shared/components";
import EmailPrivacyToggle from "@/shared/components/EmailPrivacyToggle";
import { useTranslations } from "next-intl";

const TIME_RANGES = [
  { label: "1h", hours: 1 },
  { label: "6h", hours: 6 },
  { label: "12h", hours: 12 },
  { label: "24h", hours: 24 },
];

type LogsTranslator = ((key: string, values?: Record<string, unknown>) => string) & {
  has?: (key: string) => boolean;
};

function logsText(
  t: LogsTranslator,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
) {
  if (typeof t.has !== "function" || !t.has(key)) return fallback;
  return values ? t(key, values) : t(key);
}

export default function LogsPage() {
  const [showExport, setShowExport] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showCleanHistory, setShowCleanHistory] = useState(false);
  const [cleaningHistory, setCleaningHistory] = useState(false);
  const [cleanHistoryStatus, setCleanHistoryStatus] = useState<string | null>(null);
  const [requestLogKey, setRequestLogKey] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const requestLoggerRef = useRef<any>(null);
  const t = useTranslations("logs") as LogsTranslator;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowExport(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // initial id from URL (synchronously on client) so child can open on mount
  const initialId =
    typeof window !== "undefined" ? new URL(window.location.href).searchParams.get("id") : null;

  async function handleExport(hours: number) {
    setExporting(true);
    setShowExport(false);
    try {
      const logType = "request-logs";
      const res = await fetch(`/api/logs/export?hours=${hours}&type=${logType}`);
      if (!res.ok) throw new Error(t("exportFailed"));
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `omniroute-${logType}-${hours}h-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(t("exportFailed"), err);
    } finally {
      setExporting(false);
    }
  }

  async function handleCleanHistory() {
    setCleaningHistory(true);
    setShowCleanHistory(false);
    setCleanHistoryStatus(null);
    try {
      const res = await fetch("/api/settings/purge-request-history", { method: "POST" });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error || logsText(t, "cleanHistoryFailed", "Failed to clean log history.")
        );
      }

      const deleted = typeof data?.deleted === "number" ? data.deleted : 0;
      const deletedArtifacts =
        typeof data?.deletedArtifacts === "number" ? data.deletedArtifacts : 0;
      const deletedDetailedLogs =
        typeof data?.deletedDetailedLogs === "number" ? data.deletedDetailedLogs : 0;
      const successFallback = `Cleaned ${deleted} log entr${deleted === 1 ? "y" : "ies"}, ${deletedArtifacts} artifact${
        deletedArtifacts === 1 ? "" : "s"
      }, and ${deletedDetailedLogs} legacy detail row${deletedDetailedLogs === 1 ? "" : "s"}.`;
      setRequestLogKey((key) => key + 1);
      setCleanHistoryStatus(
        deleted || deletedArtifacts || deletedDetailedLogs
          ? logsText(t, "cleanHistorySuccess", successFallback, {
              deleted,
              deletedArtifacts,
              deletedDetailedLogs,
            })
          : logsText(t, "cleanHistoryEmpty", "No request log history was found.")
      );
    } catch (err) {
      console.error(logsText(t, "cleanHistoryFailed", "Failed to clean log history."), err);
      setCleanHistoryStatus(
        err instanceof Error
          ? err.message
          : logsText(t, "cleanHistoryFailed", "Failed to clean log history.")
      );
    } finally {
      setCleaningHistory(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex-shrink-0 flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-lg font-semibold text-text-main">{t("requestLogs")}</h2>

        <div className="flex items-center gap-2">
          <EmailPrivacyToggle size="md" />

          <button
            id="clean-log-history-btn"
            onClick={() => setShowCleanHistory(true)}
            disabled={cleaningHistory}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
              border border-red-500/30 bg-red-500/10 text-red-700 hover:bg-red-500/15
              hover:border-red-500/50 dark:text-red-300 dark:hover:bg-red-500/20 transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M6 2h4m-5 2h6m-7 0h8m-1 0-.5 9a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1L5 4m2 3v4m2-4v4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {logsText(t, "cleanHistoryButton", "Clean history")}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              id="export-logs-btn"
              onClick={() => setShowExport(!showExport)}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
                bg-[var(--card-bg,#1e1e2e)] border border-[var(--border,#333)]
                text-[var(--text-secondary,#aaa)] hover:text-[var(--text-primary,#fff)]
                hover:border-[var(--accent,#7c3aed)] transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {exporting ? t("exporting") : t("export")}
            </button>

            {showExport && (
              <div
                className="absolute right-0 top-full mt-1 z-50 min-w-[140px] rounded-lg
                  bg-[var(--card-bg,#1e1e2e)] border border-[var(--border,#333)]
                  shadow-xl overflow-hidden animate-in fade-in"
              >
                <div className="px-3 py-2 text-xs text-[var(--text-muted,#666)] border-b border-[var(--border,#333)] font-medium">
                  {t("timeRange")}
                </div>
                {TIME_RANGES.map((range) => (
                  <button
                    key={range.hours}
                    id={`export-${range.hours}h-btn`}
                    onClick={() => handleExport(range.hours)}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-[var(--hover-bg,#2a2a3e)]
                      text-[var(--text-secondary,#aaa)] hover:text-[var(--text-primary,#fff)]
                      transition-colors flex items-center justify-between"
                  >
                    <span>{t("lastNHours", { hours: range.label })}</span>
                    <span className="text-xs text-[var(--text-muted,#666)]">
                      {range.hours === 24 ? t("defaultRange") : ""}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {cleanHistoryStatus && (
        <div className="flex-shrink-0 rounded-lg border border-[var(--border,#333)] bg-[var(--card-bg,#1e1e2e)] px-4 py-3 text-sm text-[var(--text-secondary,#aaa)]">
          {cleanHistoryStatus}
        </div>
      )}

      <div className="min-h-0">
        <RequestLoggerV2 key={requestLogKey} ref={requestLoggerRef} initialSelectedId={initialId} />
      </div>

      <ConfirmModal
        isOpen={showCleanHistory}
        onClose={() => setShowCleanHistory(false)}
        onConfirm={handleCleanHistory}
        title={logsText(t, "cleanHistoryTitle", "Clean log history?")}
        message={logsText(
          t,
          "cleanHistoryMessage",
          "This permanently clears all request log rows, legacy detail rows, and local artifact files under DATA_DIR/call_logs. The live page will refresh after cleanup."
        )}
        confirmText={logsText(t, "cleanHistoryConfirm", "Clean history")}
        cancelText={logsText(t, "cleanHistoryCancel", "Cancel")}
        loading={cleaningHistory}
      />
    </div>
  );
}
