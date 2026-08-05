"use client";

import type { CodexAccountPoolProjection } from "@omniroute/open-sse/services/codexAccount/index.ts";
import { useLocale, useTranslations } from "next-intl";

export interface CodexAccountDetailsProps {
  pool: CodexAccountPoolProjection;
}

function formatQuota(
  window: CodexAccountPoolProjection["children"][number]["quota"]["windows"]["5h"],
  usedLabel: string
): string {
  if (!window) return "—";
  if (window.usedPercentage !== null) return `${Math.round(window.usedPercentage)}% ${usedLabel}`;
  if (window.usage !== null && window.limit !== null) return `${window.usage}/${window.limit}`;
  return "—";
}

export default function CodexAccountDetails({ pool }: CodexAccountDetailsProps) {
  const t = useTranslations("providers");
  const locale = useLocale();
  const statusLabels = {
    available: t("codexPoolAvailable"),
    partially_limited: t("codexPoolPartiallyLimited"),
    fully_limited: t("codexPoolFullyLimited"),
  };
  return (
    <div className="mt-3 rounded-lg border border-border/60 bg-surface-secondary/30 p-3">
      <div className="mb-2 flex items-center justify-between gap-2 text-xs">
        <span className="font-medium">{t("codexQuotaPools")}</span>
        <span className="text-text-muted">
          {statusLabels[pool.aggregate.status]} ·{" "}
          {t("codexPoolLimited", { count: pool.aggregate.limitedChildCount })}
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {pool.children.map((child) => (
          <div
            key={child.key.scope}
            className="rounded-md border border-border/50 bg-background/60 px-2.5 py-2 text-xs"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium">{child.key.scope === "codex" ? "Codex" : "Spark"}</span>
              <span className={child.unavailable ? "text-amber-500" : "text-text-muted"}>
                {child.quota.exhaustedWindow
                  ? t("codexPoolQuotaExhausted")
                  : child.cooldown.active
                    ? t("codexPoolCoolingDown")
                    : t("codexPoolAvailable")}
              </span>
            </div>
            <div className="mt-1 grid grid-cols-2 gap-2 text-text-muted">
              <span>5h: {formatQuota(child.quota.windows["5h"], t("codexPoolUsed"))}</span>
              <span>7d: {formatQuota(child.quota.windows["7d"], t("codexPoolUsed"))}</span>
            </div>
            {child.cooldown.rateLimitedUntil ? (
              <div className="mt-1 text-[11px] text-amber-500">
                {t("codexPoolUntil", {
                  value: new Intl.DateTimeFormat(locale, {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(child.cooldown.rateLimitedUntil)),
                })}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
