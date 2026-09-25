"use client";

import { useLocale, useTranslations } from "next-intl";
import { formatUsdCost } from "../../apiManagerPageUtils";
import type { UsagePeriod } from "../apiKeyDetailsData";
import { DetailsSection, EmptyNote, formatCount, formatDateTime } from "./DetailsPrimitives";

const TOKEN_ROWS = [
  ["input", "tokensInput"],
  ["output", "tokensOutput"],
  ["cacheRead", "tokensCacheRead"],
  ["cacheCreation", "tokensCacheCreation"],
  ["reasoning", "tokensReasoning"],
] as const;

function PeriodCard({ title, period }: { title: string; period: UsagePeriod | null }) {
  const t = useTranslations("apiKeyDetails");
  const locale = useLocale();
  if (!period) {
    return (
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface/40 p-4">
        <h3 className="text-sm font-semibold text-text-main">{title}</h3>
        <EmptyNote>{t("usageUnavailable")}</EmptyNote>
      </div>
    );
  }
  const resetAt = formatDateTime(period.resetAt, locale);
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface/40 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-text-main">{title}</h3>
        {resetAt && (
          <span className="text-[11px] text-text-muted" title={period.resetAt ?? undefined}>
            {t("resetsAt", { date: resetAt })}
          </span>
        )}
      </div>
      <dl className="grid grid-cols-2 gap-3">
        <div>
          <dt className="text-[11px] uppercase tracking-wide text-text-muted">{t("costUsd")}</dt>
          <dd className="text-xl font-semibold tabular-nums text-text-main">
            {formatUsdCost(period.costUsd, locale)}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wide text-text-muted">{t("requests")}</dt>
          <dd className="text-xl font-semibold tabular-nums text-text-main">
            {formatCount(period.requests, locale)}
          </dd>
        </div>
      </dl>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 border-t border-border pt-3 text-xs sm:grid-cols-3">
        {TOKEN_ROWS.map(([field, labelKey]) => (
          <div key={field} className="flex items-baseline justify-between gap-2 sm:block">
            <dt className="text-text-muted">{t(labelKey)}</dt>
            <dd className="tabular-nums text-text-main">
              {formatCount(period.tokens[field], locale)}
            </dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-2 font-semibold sm:block">
          <dt className="text-text-muted">{t("tokensTotal")}</dt>
          <dd className="tabular-nums text-text-main">
            {formatCount(period.tokens.total, locale)}
          </dd>
        </div>
      </dl>
    </div>
  );
}

/** Today and this week on UTC calendar boundaries (week starts Monday 00:00Z). */
export function UsageSummarySection({
  daily,
  weekly,
}: {
  daily: UsagePeriod | null;
  weekly: UsagePeriod | null;
}) {
  const t = useTranslations("apiKeyDetails");
  return (
    <DetailsSection title={t("usageTitle")} description={t("usageDesc")} icon="query_stats">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <PeriodCard title={t("usageToday")} period={daily} />
        <PeriodCard title={t("usageThisWeek")} period={weekly} />
      </div>
    </DetailsSection>
  );
}
