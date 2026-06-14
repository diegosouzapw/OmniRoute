"use client";

import { useTranslations } from "next-intl";

interface DayHeaderProps {
  label: string;
  dayKey: string;
}

export default function DayHeader({ label, dayKey }: DayHeaderProps) {
  const t = useTranslations("activity");

  const displayLabel =
    label === "today"
      ? t("todayHeader")
      : label === "yesterday"
        ? t("yesterdayHeader")
        : label;

  return (
    <div
      className="sticky top-0 z-10 flex items-center gap-3 py-2 px-4 bg-[var(--color-bg)] border-b border-[var(--color-border)]"
      aria-label={displayLabel}
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
        {displayLabel}
      </span>
      {label !== "today" && label !== "yesterday" && (
        <span className="text-xs text-[var(--color-text-muted)] opacity-60">{dayKey}</span>
      )}
      <div className="flex-1 h-px bg-[var(--color-border)]" />
    </div>
  );
}
