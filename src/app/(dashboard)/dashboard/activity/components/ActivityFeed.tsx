"use client";

import { useTranslations } from "next-intl";
import { groupByDay } from "@/lib/audit/timeline";
import type { AuditLogEntry } from "@/lib/compliance/index";
import DayHeader from "./DayHeader";
import ActivityItem from "./ActivityItem";

interface ActivityFeedProps {
  entries: AuditLogEntry[];
  referenceNowMs?: number;
}

export default function ActivityFeed({ entries, referenceNowMs }: ActivityFeedProps) {
  const t = useTranslations("activity");

  if (!entries.length) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="material-symbols-outlined text-[48px] text-[var(--color-text-muted)] mb-4" aria-hidden="true">
          timeline
        </span>
        <h3 className="text-base font-semibold text-[var(--color-text-main)] mb-1">
          {t("emptyTitle")}
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] max-w-sm">{t("emptyDescription")}</p>
      </div>
    );
  }

  const groups = groupByDay(entries, referenceNowMs);

  return (
    <div className="divide-y divide-[var(--color-border)]">
      {groups.map((group) => (
        <section key={group.dayKey} aria-label={group.label}>
          <DayHeader label={group.label} dayKey={group.dayKey} />
          <ul className="divide-y divide-[var(--color-border)]">
            {group.entries.map((entry, idx) => (
              <ActivityItem
                key={typeof entry.id === "number" ? entry.id : `${group.dayKey}-${idx}`}
                entry={entry}
                referenceNowMs={referenceNowMs}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
