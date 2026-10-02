"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import type { TokenLimitRow } from "../apiKeyDetailsData";
import { StatusBadge, UtilizationBar, formatCount, formatDateTime } from "./DetailsPrimitives";
import { INTERVAL_KEYS } from "./tokenLimitsEditorTypes";

/** One saved token-limit row rendered by {@link TokenLimitsEditor}. */
export function TokenLimitListItem({
  row,
  scope,
  saving,
  onEdit,
  onDelete,
}: {
  row: TokenLimitRow;
  scope: string;
  saving: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const t = useTranslations("apiKeyDetails");
  const tc = useTranslations("common");
  const locale = useLocale();

  const utilization = row.tokenLimit > 0 ? row.tokensUsed / row.tokenLimit : 0;
  const percent = Math.round(Math.min(utilization, 1) * 100);
  const nextReset = formatDateTime(row.nextResetAt, locale);

  return (
    <li className="flex flex-col gap-2 rounded-lg border border-border bg-surface/40 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <span className="break-all text-sm font-medium text-text-main">{scope}</span>
          <StatusBadge>{t(INTERVAL_KEYS[row.resetInterval])}</StatusBadge>
          {!row.enabled && <StatusBadge tone="warn">{tc("disabled")}</StatusBadge>}
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            icon="edit"
            disabled={saving}
            aria-label={t("tokenLimitEditAria", { scope })}
            onClick={onEdit}
          >
            {tc("edit")}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            icon="delete"
            disabled={saving}
            aria-label={t("tokenLimitDeleteAria", { scope })}
            onClick={onDelete}
          >
            {tc("delete")}
          </Button>
        </div>
      </div>
      <UtilizationBar value={utilization} label={t("utilizationAria", { name: scope, percent })} />
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="tabular-nums text-text-main">
          {t("usedOfLimit", {
            used: formatCount(row.tokensUsed, locale),
            limit: formatCount(row.tokenLimit, locale),
          })}
        </span>
        <span className="text-text-muted" title={row.nextResetAt ?? undefined}>
          {nextReset ? t("resetsAt", { date: nextReset }) : t("noReset")}
        </span>
      </div>
    </li>
  );
}
