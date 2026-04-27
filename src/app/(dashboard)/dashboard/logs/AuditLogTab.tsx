"use client";

/**
 * Audit Log Tab — Embedded version of the audit-log page for the Logs dashboard.
 * Fetches from /api/compliance/audit-log with filter support.
 */

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

interface AuditEntry {
  id: number;
  timestamp: string;
  action: string;
  actor: string;
  target?: string | null;
  details?: unknown;
  metadata?: unknown;
  ip_address?: string | null;
  resourceType?: string | null;
  status?: string | null;
  requestId?: string | null;
}

const PAGE_SIZE = 25;

export default function AuditLogTab() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionFilter, setActionFilter] = useState("");
  const [actorFilter, setActorFilter] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null);
  const t = useTranslations("logs");

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (actionFilter) params.set("action", actionFilter);
      if (actorFilter) params.set("actor", actorFilter);
      params.set("limit", String(PAGE_SIZE + 1));
      params.set("offset", String(offset));

      const res = await fetch(`/api/compliance/audit-log?${params.toString()}`);
      if (!res.ok) throw new Error(t("failedFetchAuditLog"));
      const data = (await res.json()) as AuditEntry[];
      const total = Number(res.headers.get("x-total-count") || "0");

      setHasMore(data.length > PAGE_SIZE);
      setEntries(data.slice(0, PAGE_SIZE));
      setTotalCount(Number.isFinite(total) ? total : 0);
    } catch (err: any) {
      setError(err.message || t("failedFetchAuditLog"));
    } finally {
      setLoading(false);
    }
  }, [actionFilter, actorFilter, offset, t]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleSearch = () => {
    if (offset === 0) {
      fetchEntries();
      return;
    }
    setOffset(0);
  };

  const formatTimestamp = (ts: string) => {
    try {
      return new Date(ts).toLocaleString();
    } catch {
      return ts;
    }
  };

  const actionBadgeColor = (action: string) => {
    if (action === "provider.warning") return "bg-amber-500/15 text-amber-300 border-amber-500/20";
    if (action.includes("delete") || action.includes("remove"))
      return "bg-red-500/15 text-red-400 border-red-500/20";
    if (action.includes("create") || action.includes("add"))
      return "bg-green-500/15 text-green-400 border-green-500/20";
    if (action.includes("update") || action.includes("change"))
      return "bg-blue-500/15 text-blue-400 border-blue-500/20";
    if (action.includes("login") || action.includes("auth"))
      return "bg-purple-500/15 text-purple-400 border-purple-500/20";
    return "bg-gray-500/15 text-gray-400 border-gray-500/20";
  };

  const statusBadgeColor = (status?: string | null) => {
    if (!status) return "bg-gray-500/15 text-gray-400 border-gray-500/20";
    if (status === "success") return "bg-green-500/15 text-green-400 border-green-500/20";
    if (status === "warning" || status === "blocked")
      return "bg-amber-500/15 text-amber-300 border-amber-500/20";
    if (status === "error" || status === "failed")
      return "bg-red-500/15 text-red-400 border-red-500/20";
    return "bg-blue-500/15 text-blue-400 border-blue-500/20";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text-main)]">{t("auditLog")}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{t("auditLogDesc")}</p>
          <p className="mt-2 text-xs text-[var(--color-text-muted)]">
            {t("totalEntries", { count: totalCount })}
          </p>
        </div>
        <button
          onClick={fetchEntries}
          disabled={loading}
          aria-label={t("refreshAuditLogAria")}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-[var(--color-bg-alt)] transition-colors disabled:opacity-50"
        >
          {loading ? t("loading") : t("refresh")}
        </button>
      </div>

      <div
        className="flex flex-wrap gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
        role="search"
        aria-label={t("filterEntriesAria")}
      >
        <input
          type="text"
          placeholder={t("filterByAction")}
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          aria-label={t("filterByActionTypeAria")}
          className="flex-1 min-w-[180px] px-3 py-2 rounded-lg text-sm bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-2 focus:outline-[var(--color-accent)]"
        />
        <input
          type="text"
          placeholder={t("filterByActor")}
          value={actorFilter}
          onChange={(e) => setActorFilter(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          aria-label={t("filterByActorAria")}
          className="flex-1 min-w-[180px] px-3 py-2 rounded-lg text-sm bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-2 focus:outline-[var(--color-accent)]"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-accent)]"
        >
          {t("search")}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
        <table className="w-full text-sm" role="table" aria-label={t("tableAria")}>
          <thead>
            <tr className="bg-[var(--color-bg-alt)] border-b border-[var(--color-border)]">
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">
                {t("timestamp")}
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">
                {t("action")}
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">
                {t("status")}
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">
                {t("actor")}
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">
                {t("target")}
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">
                {t("resourceType")}
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">
                {t("ipAddress")}
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">
                {t("requestId")}
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">
                {t("details")}
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 && !loading ? (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-[var(--color-text-muted)]">
                  {t("noEntries")}
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-alt)] transition-colors"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-[var(--color-text-muted)] font-mono text-xs">
                    {formatTimestamp(entry.timestamp)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium border ${actionBadgeColor(entry.action)}`}
                    >
                      <span className="inline-flex items-center gap-1">
                        {entry.action === "provider.warning" && (
                          <span className="material-symbols-outlined text-[14px]">warning</span>
                        )}
                        {entry.action}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium border ${statusBadgeColor(entry.status)}`}
                    >
                      {entry.status || t("notAvailable")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-main)]">{entry.actor}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] max-w-[200px] truncate">
                    {entry.target || t("notAvailable")}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] whitespace-nowrap">
                    {entry.resourceType || t("notAvailable")}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] font-mono text-xs whitespace-nowrap">
                    {entry.ip_address || t("notAvailable")}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] font-mono text-xs whitespace-nowrap">
                    {entry.requestId || t("notAvailable")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setSelectedEntry(entry)}
                      className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-main)] transition-colors hover:bg-[var(--color-bg-alt)]"
                    >
                      {t("viewDetails")}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--color-text-muted)]">
          {t("showing", { count: entries.length, offset })}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
            disabled={offset === 0}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-[var(--color-bg-alt)] disabled:opacity-30 transition-colors"
          >
            ← {t("previous")}
          </button>
          <button
            onClick={() => setOffset(offset + PAGE_SIZE)}
            disabled={!hasMore}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-[var(--color-bg-alt)] disabled:opacity-30 transition-colors"
          >
            {t("next")} →
          </button>
        </div>
      </div>

      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="flex max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-6 py-5">
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-main)]">
                  {selectedEntry.action}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {t("auditModalSubtitle", {
                    actor: selectedEntry.actor || t("notAvailable"),
                    target: selectedEntry.target || t("notAvailable"),
                  })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="rounded-full border border-[var(--color-border)] p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-text-main)]"
                aria-label={t("close")}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-5">
              {selectedEntry.action === "provider.warning" && (
                <div className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                    <div>
                      <p className="font-medium">{t("providerWarningTitle")}</p>
                      <p className="mt-1 text-amber-200">{t("providerWarningDesc")}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
                  <h4 className="mb-3 text-sm font-semibold text-[var(--color-text-main)]">
                    {t("eventMetadata")}
                  </h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <dt className="text-[var(--color-text-muted)]">{t("timestamp")}</dt>
                      <dd className="text-[var(--color-text-main)]">
                        {formatTimestamp(selectedEntry.timestamp)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-[var(--color-text-muted)]">{t("status")}</dt>
                      <dd className="text-[var(--color-text-main)]">
                        {selectedEntry.status || t("notAvailable")}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-[var(--color-text-muted)]">{t("resourceType")}</dt>
                      <dd className="text-[var(--color-text-main)]">
                        {selectedEntry.resourceType || t("notAvailable")}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-[var(--color-text-muted)]">{t("requestId")}</dt>
                      <dd className="font-mono text-[var(--color-text-main)]">
                        {selectedEntry.requestId || t("notAvailable")}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-[var(--color-text-muted)]">{t("ipAddress")}</dt>
                      <dd className="font-mono text-[var(--color-text-main)]">
                        {selectedEntry.ip_address || t("notAvailable")}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
                  <h4 className="mb-3 text-sm font-semibold text-[var(--color-text-main)]">
                    {t("eventPayload")}
                  </h4>
                  <pre className="overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-xs text-[var(--color-text-muted)]">
                    {JSON.stringify(selectedEntry.metadata || selectedEntry.details || {}, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
