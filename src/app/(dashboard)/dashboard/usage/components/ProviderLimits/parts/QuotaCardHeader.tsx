"use client";

import { useTranslations } from "next-intl";
import Badge from "@/shared/components/Badge";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import { formatCountdown, type CardStatus } from "../utils";
import { translateUsageOrFallback } from "../i18nFallback";

const STATUS_DOT_CLASS: Record<CardStatus, string> = {
  critical: "bg-rose-500 shadow-[0_0_0_2px_rgba(244,63,94,0.16)]",
  alert: "bg-amber-400 shadow-[0_0_0_2px_rgba(251,191,36,0.2)]",
  ok: "bg-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.18)]",
  empty: "bg-slate-300 shadow-[0_0_0_2px_rgba(148,163,184,0.18)]",
};

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
    <div className="flex min-h-[62px] items-center justify-between gap-2 px-3 py-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <span
          className="inline-flex size-7 shrink-0 items-center justify-center"
          title={cardStatus}
          aria-label={cardStatus}
        >
          <span className={`block size-3.5 rounded-full ${STATUS_DOT_CLASS[cardStatus]}`} />
        </span>
        <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md">
          <ProviderIcon providerId={connection.provider} size={24} type="color" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex h-4 min-w-0 items-center gap-1.5">
            <span
              className="truncate text-[12px] font-semibold leading-4 text-text-main"
              title={providerLabel}
            >
              {providerLabel}
            </span>
            <span
              className="inline-flex h-4 shrink-0 items-center"
              title={
                resolvedPlan
                  ? t("rawPlanWithValue", { plan: resolvedPlan })
                  : t("noPlanFromProvider")
              }
            >
              <Badge variant={tierMeta.variant} size="sm" dot className="h-4 px-1.5 py-0 leading-4">
                {tierMeta.label}
              </Badge>
            </span>
            {hasStaleData && (
              <span
                className="material-symbols-outlined shrink-0 text-[12px] leading-4 text-amber-500"
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
      <div className="flex shrink-0 items-center gap-0.5 self-center">
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
