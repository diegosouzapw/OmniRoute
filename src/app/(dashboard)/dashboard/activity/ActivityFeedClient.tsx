"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import type { AuditLogEntry } from "@/lib/compliance/index";
import ActivityFeed from "./components/ActivityFeed";
import EventTypeFilter, { type EventCategory, matchesCategory } from "./components/EventTypeFilter";

const FEED_LIMIT = 200;

export default function ActivityFeedClient() {
  const t = useTranslations("activity");
  const [allEntries, setAllEntries] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<EventCategory>("all");
  const referenceNowMs = useRef<number>(Date.now());

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        level: "high",
        limit: String(FEED_LIMIT),
      });
      const res = await fetch(`/api/compliance/audit-log?${params.toString()}`);
      if (!res.ok) {
        throw new Error(t("description"));
      }
      const data = (await res.json()) as AuditLogEntry[];
      // Reset reference time on fresh load so relative timestamps are stable
      referenceNowMs.current = Date.now();
      setAllEntries(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t("fetchFailed");
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const filtered =
    category === "all"
      ? allEntries
      : allEntries.filter((e) => {
          const action = typeof e.action === "string" ? e.action : "";
          return matchesCategory(action, category);
        });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-main)]">{t("title")}</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{t("description")}</p>
        </div>
        <button
          type="button"
          onClick={() => fetchEntries()}
          disabled={loading}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-[var(--color-bg-alt)] transition-colors disabled:opacity-50"
          aria-label={t("refreshAria")}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[16px] animate-spin"
                aria-hidden="true"
              >
                progress_activity
              </span>
              {t("loading")}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                refresh
              </span>
              {t("refresh")}
            </span>
          )}
        </button>
      </div>

      {/* Filter */}
      <EventTypeFilter value={category} onChange={setCategory} />

      {/* Error */}
      {error && (
        <div
          className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Feed */}
      <div className="rounded-xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-[var(--color-text-muted)]">
            <span
              className="material-symbols-outlined text-[32px] animate-spin mr-3"
              aria-hidden="true"
            >
              progress_activity
            </span>
            <span className="text-sm">{t("loadingActivity")}</span>
          </div>
        ) : (
          <ActivityFeed entries={filtered} referenceNowMs={referenceNowMs.current} />
        )}
      </div>
    </div>
  );
}
