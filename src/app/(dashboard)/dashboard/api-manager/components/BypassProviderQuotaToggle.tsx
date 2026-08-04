"use client";

import { useTranslations } from "next-intl";

/**
 * "Bypass provider quota cutoffs" toggle for the API Key permissions modal.
 * Extracted out of ApiManagerPageClient.tsx (frozen god-file — see
 * config/quality/file-size-baseline.json) following the same pattern as
 * UsageLimitSettings.tsx — pure UI move, no behavior change.
 */
export function BypassProviderQuotaToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  const tc = useTranslations("common");
  const t = useTranslations("apiManager");

  return (
    <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
      <div className="flex flex-col gap-1 pr-2">
        <p className="text-sm font-medium text-text-main">{t("bypassProviderQuota")}</p>
        <p className="text-xs text-text-muted">{t("bypassProviderQuotaDescription")}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={`inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
          enabled
            ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
            : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
        }`}
      >
        <span className="material-symbols-outlined text-[14px]">alt_route</span>
        {enabled ? tc("enabled") : tc("disabled")}
      </button>
    </div>
  );
}
