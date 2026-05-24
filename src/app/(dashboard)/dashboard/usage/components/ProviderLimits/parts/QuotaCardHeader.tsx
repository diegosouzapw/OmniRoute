"use client";

import { useTranslations } from "next-intl";
import Badge from "@/shared/components/Badge";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import { STATUS_EMOJI, type CardStatus } from "../utils";

interface Props {
  connection: any;
  providerLabel: string;
  cardStatus: CardStatus;
  tierMeta: { key: string; label: string; variant: any };
  resolvedPlan: string | null;
  emailsVisible: boolean;
  hasStaleData: boolean;
  /** Disabled when loading. */
  refreshing: boolean;
  onRefresh: () => void;
  onOpenCutoff: () => void;
  hasCutoffOverrides: boolean;
}

export default function QuotaCardHeader({
  connection,
  providerLabel,
  cardStatus,
  tierMeta,
  resolvedPlan,
  emailsVisible,
  hasStaleData,
  refreshing,
  onRefresh,
  onOpenCutoff,
  hasCutoffOverrides,
}: Props) {
  const t = useTranslations("usage");
  const accountName = pickDisplayValue(
    [connection.name, connection.displayName, connection.email],
    emailsVisible,
    connection.provider
  );

  return (
    <div className="flex items-start justify-between gap-2 px-3 pt-2.5 pb-1.5">
      <div className="flex items-start gap-2 min-w-0 flex-1">
        <span
          className="text-[14px] leading-none mt-0.5 shrink-0"
          title={cardStatus}
          aria-label={cardStatus}
        >
          {STATUS_EMOJI[cardStatus]}
        </span>
        <div className="size-6 rounded-md flex items-center justify-center overflow-hidden shrink-0">
          <ProviderIcon providerId={connection.provider} size={24} type="color" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className="text-[12px] font-semibold text-text-main truncate"
              title={providerLabel}
            >
              {providerLabel}
            </span>
            <span
              title={
                resolvedPlan
                  ? t("rawPlanWithValue", { plan: resolvedPlan })
                  : t("noPlanFromProvider")
              }
            >
              <Badge variant={tierMeta.variant} size="sm" dot className="h-4 leading-none">
                {tierMeta.label}
              </Badge>
            </span>
            {hasStaleData && (
              <span
                className="material-symbols-outlined text-[12px] text-amber-500 shrink-0"
                title={t("staleQuotaTooltip")}
              >
                schedule
              </span>
            )}
          </div>
          <span className="text-[11px] text-text-muted truncate" title={accountName ?? ""}>
            {accountName}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-0.5 shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenCutoff();
          }}
          title={t("quotaCutoffsButtonHelp")}
          className={`p-1 rounded-md cursor-pointer transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${
            hasCutoffOverrides ? "text-primary" : "text-text-muted"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">tune</span>
        </button>
        <button
          type="button"
          disabled={refreshing}
          onClick={(e) => {
            e.stopPropagation();
            if (refreshing) return;
            onRefresh();
          }}
          title={t("refreshQuota")}
          className="p-1 rounded-md text-text-muted cursor-pointer transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.04] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span
            className={`material-symbols-outlined text-[14px] ${refreshing ? "animate-spin" : ""}`}
          >
            refresh
          </span>
        </button>
      </div>
    </div>
  );
}
