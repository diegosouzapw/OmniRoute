"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";

type AuditEntry = {
  id: number;
  timestamp: string;
  action: string;
  actor: string;
  target?: string | null;
  details?: unknown;
  metadata?: unknown;
  ip_address?: string | null;
  ip?: string | null;
  resourceType?: string | null;
  status?: string | null;
  requestId?: string | null;
};

type Severity = "info" | "warning" | "critical";

const PAGE_SIZE = 50;

function getSeverity(entry: AuditEntry): Severity {
  const action = entry.action.toLowerCase();
  const status = (entry.status || "").toLowerCase();

  if (
    status === "error" ||
    status === "failed" ||
    status === "blocked" ||
    action.includes("blocked") ||
    action.includes("denied") ||
    action.includes("violation") ||
    action.includes("delete") ||
    action.includes("remove")
  ) {
    return "critical";
  }

  if (status === "warning" || action.includes("warning") || action.includes("validate")) {
    return "warning";
  }

  return "info";
}

function formatJson(value: unknown) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function formatLocalDate(value: string) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export default function ComplianceTab() {
  const t = useTranslations("compliance");
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventType, setEventType] = useState("");
  const [severity, setSeverity] = useState<"all" | Severity>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set("limit", String(PAGE_SIZE));
      params.set("offset", String(offset));
      if (eventType) params.set("action", eventType);
      if (from) params.set("from", from);
      if (to) params.set("to", to);

      const response = await fetch(`/api/compliance/audit-log?${params.toString()}`);
      const data = await response.json().catch(() => []);
      if (!response.ok) {
        throw new Error(data.error || t("failedFetch"));
      }

      setEntries(Array.isArray(data) ? data : []);
      const total = Number(response.headers.get("x-total-count") || "0");
      setTotalCount(Number.isFinite(total) ? total : 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("failedFetch"));
    } finally {
      setLoading(false);
    }
  }, [eventType, from, offset, t, to]);

  useEffect(() => {
    void fetchEntries();
  }, [fetchEntries]);

  const visibleEntries = useMemo(() => {
    if (severity === "all") return entries;
    return entries.filter((entry) => getSeverity(entry) === severity);
  }, [entries, severity]);

  const eventTypes = useMemo(() => {
    return Array.from(new Set(entries.map((entry) => entry.action).filter(Boolean))).sort();
  }, [entries]);

  const canGoNext = offset + PAGE_SIZE < totalCount;

  const resetFilters = () => {
    setEventType("");
    setSeverity("all");
    setFrom("");
    setTo("");
    setOffset(0);
  };

  const exportVisibleEntries = () => {
    const payload = JSON.stringify(visibleEntries, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `omniroute-compliance-audit-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const severityClass = (value: Severity) => {
    if (value === "critical") return "border-red-500/30 bg-red-500/10 text-red-600";
    if (value === "warning") return "border-amber-500/30 bg-amber-500/10 text-amber-600";
    return "border-blue-500/30 bg-blue-500/10 text-blue-600";
  };

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text-main">{t("title")}</h2>
            <p className="mt-1 text-sm text-text-muted">{t("description")}</p>
            <p className="mt-2 text-xs text-text-muted">
              {t("showing", { count: visibleEntries.length, total: totalCount })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => void fetchEntries()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-main transition-colors hover:bg-sidebar disabled:opacity-40"
            >
              <span
                className={`material-symbols-outlined text-[16px] ${loading ? "animate-spin" : ""}`}
              >
                refresh
              </span>
              {t("refresh")}
            </button>
            <button
              onClick={exportVisibleEntries}
              disabled={visibleEntries.length === 0}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              {t("export")}
            </button>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <label className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("eventType")}
            </span>
            <input
              list="compliance-event-types"
              value={eventType}
              onChange={(event) => {
                setOffset(0);
                setEventType(event.target.value);
              }}
              placeholder={t("eventTypePlaceholder")}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <datalist id="compliance-event-types">
              {eventTypes.map((type) => (
                <option key={type} value={type} />
              ))}
            </datalist>
          </label>
          <label className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("severity")}
            </span>
            <select
              value={severity}
              onChange={(event) => {
                setOffset(0);
                setSeverity(event.target.value as "all" | Severity);
              }}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="all">{t("allSeverities")}</option>
              <option value="info">{t("info")}</option>
              <option value="warning">{t("warning")}</option>
              <option value="critical">{t("critical")}</option>
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("from")}
            </span>
            <input
              type="datetime-local"
              value={from}
              onChange={(event) => {
                setOffset(0);
                setFrom(event.target.value);
              }}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("to")}
            </span>
            <input
              type="datetime-local"
              value={to}
              onChange={(event) => {
                setOffset(0);
                setTo(event.target.value);
              }}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-main transition-colors hover:bg-sidebar"
            >
              {t("clearFilters")}
            </button>
          </div>
        </div>
      </Card>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-text-muted">{t("loading")}</div>
        ) : visibleEntries.length === 0 ? (
          <div className="p-10 text-center">
            <span className="material-symbols-outlined text-[40px] text-text-muted">policy</span>
            <p className="mt-3 text-sm text-text-muted">{t("noEvents")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] text-left text-sm">
              <thead className="border-b border-border bg-sidebar/40 text-xs uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">{t("timestamp")}</th>
                  <th className="px-4 py-3 font-medium">{t("eventType")}</th>
                  <th className="px-4 py-3 font-medium">{t("severity")}</th>
                  <th className="px-4 py-3 font-medium">{t("sourceIp")}</th>
                  <th className="px-4 py-3 font-medium">{t("userOrKey")}</th>
                  <th className="px-4 py-3 font-medium">{t("action")}</th>
                  <th className="px-4 py-3 font-medium">{t("result")}</th>
                  <th className="px-4 py-3 text-right font-medium">{t("details")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visibleEntries.map((entry) => {
                  const entrySeverity = getSeverity(entry);
                  return (
                    <tr key={entry.id} className="transition-colors hover:bg-sidebar/30">
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-text-muted">
                        {formatLocalDate(entry.timestamp)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-xs text-text-main">
                          {entry.action}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${severityClass(entrySeverity)}`}
                        >
                          {t(entrySeverity)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-text-muted">
                        {entry.ip_address || entry.ip || t("notAvailable")}
                      </td>
                      <td className="px-4 py-3 text-text-main">{entry.actor || t("system")}</td>
                      <td className="max-w-[220px] truncate px-4 py-3 text-text-muted">
                        {entry.target || entry.resourceType || t("notAvailable")}
                      </td>
                      <td className="px-4 py-3 text-text-muted">
                        {entry.status || t("notAvailable")}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedEntry(entry)}
                          className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-main transition-colors hover:bg-sidebar"
                        >
                          {t("viewDetails")}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => setOffset((current) => Math.max(0, current - PAGE_SIZE))}
          disabled={offset === 0 || loading}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-main transition-colors hover:bg-sidebar disabled:opacity-40"
        >
          {t("previous")}
        </button>
        <button
          onClick={() => setOffset((current) => current + PAGE_SIZE)}
          disabled={!canGoNext || loading}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-main transition-colors hover:bg-sidebar disabled:opacity-40"
        >
          {t("next")}
        </button>
      </div>

      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            aria-label={t("closeDetails")}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setSelectedEntry(null)}
          />
          <div className="relative w-full max-w-3xl rounded-xl border border-border bg-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h3 className="text-lg font-semibold text-text-main">{t("details")}</h3>
              <button
                onClick={() => setSelectedEntry(null)}
                className="rounded-lg p-2 text-text-muted hover:bg-sidebar hover:text-text-main"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <pre className="max-h-[70vh] overflow-auto p-4 text-xs text-text-main">
              {formatJson(selectedEntry)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
