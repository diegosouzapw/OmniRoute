"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import { formatUsdCost } from "../../apiManagerPageUtils";

export function formatCount(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(
    Number.isFinite(value) ? value : 0
  );
}

export function formatMetricValue(value: number, metric: string, locale: string): string {
  return metric === "usd" ? formatUsdCost(value, locale) : formatCount(value, locale);
}

export function formatDateTime(iso: string | null, locale: string): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

/** Card-like page section with a real `h2` so the page keeps a proper heading outline. */
export function DetailsSection({
  title,
  description,
  icon,
  action,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  icon?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const headingId = useId();
  return (
    <section
      aria-labelledby={headingId}
      className="min-w-0 rounded-card border border-border bg-surface p-4 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          {icon && (
            <span
              className="material-symbols-outlined rounded-lg bg-bg p-2 text-[20px] text-text-muted"
              aria-hidden="true"
            >
              {icon}
            </span>
          )}
          <div className="min-w-0">
            <h2 id={headingId} className="text-base font-semibold text-text-main">
              {title}
            </h2>
            {description && <p className="mt-0.5 text-xs text-text-muted">{description}</p>}
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function EmptyNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-border px-3 py-4 text-center text-sm text-text-muted">
      {children}
    </p>
  );
}

/** Horizontal utilization bar; `value` is a 0..1 fraction. */
export function UtilizationBar({
  value,
  exceeded = false,
  label,
}: {
  value: number;
  exceeded?: boolean;
  label: string;
}) {
  const percent = Math.round(Math.min(Math.max(Number.isFinite(value) ? value : 0, 0), 1) * 100);
  const color =
    exceeded || percent >= 90 ? "bg-red-500" : percent >= 70 ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="h-2 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10"
    >
      <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
    </div>
  );
}

const BADGE_TONES = {
  neutral: "bg-black/5 text-text-muted dark:bg-white/5",
  good: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  warn: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  bad: "bg-red-500/10 text-red-700 dark:text-red-300",
} as const;

export function StatusBadge({
  tone = "neutral",
  icon,
  children,
}: {
  tone?: keyof typeof BADGE_TONES;
  icon?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${BADGE_TONES[tone]}`}
    >
      {icon && (
        <span className="material-symbols-outlined text-[12px]" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}

/** Inline save/error feedback line shared by the editors. */
export function SaveFeedback({ error, saved }: { error: string | null; saved?: string | null }) {
  if (error) {
    return (
      <p role="alert" className="text-xs text-red-600 dark:text-red-400">
        {error}
      </p>
    );
  }
  if (saved) {
    return (
      <p role="status" className="text-xs text-emerald-700 dark:text-emerald-300">
        {saved}
      </p>
    );
  }
  return null;
}
