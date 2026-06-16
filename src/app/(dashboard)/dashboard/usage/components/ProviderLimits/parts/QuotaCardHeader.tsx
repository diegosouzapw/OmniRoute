"use client";

import { useTranslations } from "next-intl";
import Badge from "@/shared/components/Badge";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import { STATUS_EMOJI, formatCountdown, type CardStatus } from "../utils";
import { translateUsageOrFallback } from "../i18nFallback";

interface Props {
  connection: any;
  providerLabel: string;
  cardStatus: CardStatus;
  tierMeta: { key: string; label: string; variant: any };
  resolvedPlan: string | null;
  emailsVisible: boolean;
  hasStaleData: boolean;
  /** Toggle the connection's active state (routing on/off). */
  onToggleActive: (nextActive: boolean) => void;
  /** True while the active-state PUT is in flight. */
  togglingActive: boolean;
}

export default function QuotaCardHeader({
  connection,
  providerLabel,
  cardStatus,
  tierMeta,
  resolvedPlan,
  emailsVisible,
  hasStaleData,
  onToggleActive,
  togglingActive,
}: Props) {
  const t = useTranslations("usage");
  const isActive = connection.isActive ?? true;
  const toggleActiveLabel = isActive
    ? translateUsageOrFallback(t, "deactivateAccount", "Deactivate account (stop routing)")
    : translateUsageOrFallback(t, "activateAccount", "Activate account (resume routing)");
  const accountName = pickDisplayValue(
    [connection.name, connection.displayName, connection.email],
    emailsVisible,
    connection.provider
  );

  // OAuth token expiry — informative only. Shown small/blue for connections that
  // expose a concrete token expiry (e.g. Codex), so an operator can see at a
  // glance when the access token rotates. Hidden for API-key / no-expiry connections.
  const tokenExpiryIso =
    connection.authType === "oauth"
      ? connection.tokenExpiresAt || connection.expiresAt || null
      : null;
  const tokenExpiryMs = tokenExpiryIso ? new Date(tokenExpiryIso).getTime() : NaN;
  const hasTokenExpiry = Number.isFinite(tokenExpiryMs);
  const tokenCountdown = hasTokenExpiry ? formatCountdown(tokenExpiryIso) : null;
  const tokenExpiryLabel = !hasTokenExpiry
    ? null
    : tokenCountdown
      ? translateUsageOrFallback(t, "tokenExpiresIn", `Token expires in ${tokenCountdown}`, {
          time: tokenCountdown,
        })
      : translateUsageOrFallback(t, "tokenExpired", "Token expired");
  const tokenExpiryTitle = hasTokenExpiry ? new Date(tokenExpiryMs).toLocaleString() : undefined;

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
          {tokenExpiryLabel && (
            <span
              className={`text-[10px] truncate ${tokenCountdown ? "text-sky-500" : "text-rose-500"}`}
              title={tokenExpiryTitle}
            >
              {tokenExpiryLabel}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-0.5 shrink-0">
        <button
          type="button"
          disabled={togglingActive}
          onClick={(e) => {
            e.stopPropagation();
            if (togglingActive) return;
            onToggleActive(!isActive);
          }}
          title={toggleActiveLabel}
          aria-label={toggleActiveLabel}
          className={`p-1 rounded-md cursor-pointer transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.04] disabled:opacity-40 disabled:cursor-not-allowed ${
            isActive ? "text-text-muted" : "text-rose-500"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {isActive ? "toggle_on" : "toggle_off"}
          </span>
        </button>
      </div>
    </div>
  );
}
