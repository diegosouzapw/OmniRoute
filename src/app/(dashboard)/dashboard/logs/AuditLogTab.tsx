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
  target: string | null;
  details: any;
  ip_address: string | null;
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
      const data: AuditEntry[] = await res.json();

      setHasMore(data.length > PAGE_SIZE);
      setEntries(data.slice(0, PAGE_SIZE));
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
    setOffset(0);
    fetchEntries();
  };

  const formatTimestamp = (ts: string) => {
    try {
      return new Date(ts).toLocaleString();
    } catch {
      return ts;
    }
  };

  const actionBadgeColor = (action: string) => {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text-main)]">{t("auditLog")}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{t("auditLogDesc")}</p>
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

      {/* Filters */}
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

      {/* Table */}
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
                {t("actor")}
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">
                {t("target")}
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">
                {t("details")}
              </th>
              <th className="text-left px-4 py-3 font-medium text-[var(--color-text-muted)]">
                {t("ipAddress")}
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 && !loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[var(--color-text-muted)]">
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
                      {entry.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-main)]">{entry.actor}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] max-w-[200px] truncate">
                    {entry.target || t("notAvailable")}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] max-w-[300px] truncate font-mono text-xs">
                    {entry.details ? JSON.stringify(entry.details) : t("notAvailable")}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] font-mono text-xs whitespace-nowrap">
                    {entry.ip_address || t("notAvailable")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
    </div>
  );
}
