"use client";

import { useTranslations } from "next-intl";

/**
 * Chaos Mode access toggle for the API Key permissions modal — gates a single
 * API key's ability to call the Chaos Mode dispatch endpoints
 * (`POST /api/chaos/run`, `POST /api/skills/collect/chaos`) via the
 * `chaosModeEnabled` permission. Extracted out of ApiManagerPageClient.tsx
 * (frozen god-file — see config/quality/file-size-baseline.json) following the
 * same pattern as UsageLimitSettings.tsx.
 */
export function ChaosModeAccessToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  const tChaos = useTranslations("chaosConfig");
  const tc = useTranslations("common");

  return (
    <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{tChaos("keyPermission")}</p>
        <p className="text-xs text-text-muted">{tChaos("keyPermissionDesc")}</p>
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
        <span className="material-symbols-outlined text-[14px]">blender</span>
        {tChaos("pageTitle")} - {enabled ? tc("enabled") : tc("disabled")}
      </button>
    </div>
  );
}
