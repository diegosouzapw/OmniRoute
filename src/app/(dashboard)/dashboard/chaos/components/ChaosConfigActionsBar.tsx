"use client";

import { useTranslations } from "next-intl";

/**
 * Save/Reset + Test-run action buttons for the Chaos Mode config page.
 * Extracted out of ChaosConfigPageClient.tsx to keep the page component under
 * the complexity/size ratchet (config/quality/complexity-baseline.json).
 */
export function ChaosConfigActionsBar({
  saving,
  testing,
  testDisabled,
  onSave,
  onReset,
  onTest,
}: {
  saving: boolean;
  testing: boolean;
  testDisabled: boolean;
  onSave: () => void;
  onReset: () => void;
  onTest: () => void;
}) {
  const t = useTranslations("chaosConfig");

  return (
    <>
      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {saving ? (
            <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
          ) : (
            <span className="material-symbols-outlined text-[16px]">save</span>
          )}
          {t("saveConfig")}
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-text-muted text-sm hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          {t("configReset")}
        </button>
      </div>

      {/* Test Button */}
      <div className="p-3 rounded-lg border border-border bg-surface/40">
        <p className="text-sm font-medium text-text-main mb-2">{t("testButton")}</p>
        <button
          type="button"
          onClick={onTest}
          disabled={testing || testDisabled}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-sm font-semibold hover:bg-amber-500/25 disabled:opacity-50"
        >
          {testing ? (
            <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
          ) : (
            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
          )}
          {testing ? "Running..." : t("testButton")}
        </button>
      </div>
    </>
  );
}
