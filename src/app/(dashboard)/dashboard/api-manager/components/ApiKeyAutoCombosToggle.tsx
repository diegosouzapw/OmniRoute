"use client";

import { useTranslations } from "next-intl";

/**
 * Per-key access to the built-in `auto/*` combos, used by the API key
 * permissions modal.
 *
 * `auto/*` ids are virtual, so `allowedCombos` cannot constrain them — this is
 * the only per-key gate that reaches them. Enabled by default: a key that has
 * never been configured keeps the historical access.
 */
export function ApiKeyAutoCombosToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  const tSettings = useTranslations("settings");
  const tc = useTranslations("common");

  return (
    <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{tSettings("autoCombosTitle")}</p>
        <p className="text-xs text-text-muted">{tSettings("autoCombosDesc")}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={`inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
          enabled
            ? "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30"
            : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
        }`}
      >
        <span className="material-symbols-outlined text-[14px]">
          {enabled ? "auto_awesome" : "block"}
        </span>
        {enabled ? tc("enabled") : tc("disabled")}
      </button>
    </div>
  );
}
