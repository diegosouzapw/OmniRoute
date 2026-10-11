"use client";

import { useLocale, useTranslations } from "next-intl";
import type { StatusLimit } from "../apiKeyDetailsData";
import {
  DetailsSection,
  EmptyNote,
  StatusBadge,
  UtilizationBar,
  formatDateTime,
  formatMetricValue,
} from "./DetailsPrimitives";

const SOURCE_KEYS: Record<string, string> = {
  usage_limit: "sourceUsageLimit",
  budget: "sourceBudget",
  token_limit: "sourceTokenLimit",
  key_quota: "sourceKeyQuota",
};
const METRIC_KEYS: Record<string, string> = {
  usd: "metricUsd",
  tokens: "metricTokens",
  requests: "metricRequests",
};
const WINDOW_KEYS: Record<string, string> = {
  minute: "windowMinute",
  daily: "windowDaily",
  weekly: "windowWeekly",
  monthly: "windowMonthly",
};

function LimitRow({ limit }: { limit: StatusLimit }) {
  const t = useTranslations("apiKeyDetails");
  const locale = useLocale();
  const label = (map: Record<string, string>, value: string) =>
    map[value] ? t(map[value]) : value;
  const source = label(SOURCE_KEYS, limit.source);
  const scope =
    limit.scope.type === "global" || !limit.scope.value
      ? t("scopeGlobal")
      : t(limit.scope.type === "provider" ? "scopeProviderValue" : "scopeModelValue", {
          value: limit.scope.value,
        });
  const used = formatMetricValue(limit.used, limit.metric, locale);
  const max = formatMetricValue(limit.limit, limit.metric, locale);
  const resetAt = formatDateTime(limit.resetAt, locale);
  const percent = Math.round(limit.utilization * 100);

  return (
    <li className="flex flex-col gap-2 rounded-lg border border-border bg-surface/40 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <span className="text-sm font-medium text-text-main">{source}</span>
          <StatusBadge>{label(METRIC_KEYS, limit.metric)}</StatusBadge>
          <StatusBadge>{label(WINDOW_KEYS, limit.window)}</StatusBadge>
          <span className="text-xs text-text-muted">{scope}</span>
        </div>
        {limit.exceeded ? (
          <StatusBadge tone="bad" icon="block">
            {t("limitExceeded")}
          </StatusBadge>
        ) : (
          <StatusBadge tone="good" icon="check_circle">
            {t("limitWithin")}
          </StatusBadge>
        )}
      </div>
      <UtilizationBar
        value={limit.utilization}
        exceeded={limit.exceeded}
        label={t("utilizationAria", { name: `${source} ${scope}`, percent })}
      />
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="tabular-nums text-text-main">
          {t("usedOfLimit", { used, limit: max })}{" "}
          <span className="text-text-muted">({percent}%)</span>
        </span>
        <span className="text-text-muted" title={limit.resetAt ?? undefined}>
          {resetAt ? t("resetsAt", { date: resetAt }) : t("noReset")}
        </span>
      </div>
    </li>
  );
}

/** Every limit the enforcers apply to this key, each on its own enforcement window. */
export function LimitsSection({ limits }: { limits: StatusLimit[] }) {
  const t = useTranslations("apiKeyDetails");
  return (
    <DetailsSection title={t("limitsTitle")} description={t("limitsDesc")} icon="speed">
      {limits.length === 0 ? (
        <EmptyNote>{t("limitsEmpty")}</EmptyNote>
      ) : (
        <ul className="flex flex-col gap-2">
          {limits.map((limit) => (
            <LimitRow key={limit.id} limit={limit} />
          ))}
        </ul>
      )}
    </DetailsSection>
  );
}
