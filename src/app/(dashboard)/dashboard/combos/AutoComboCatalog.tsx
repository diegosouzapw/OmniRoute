"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";
import { AUTO_COMBO_TEMPLATES, type AutoComboTemplate } from "@/domain/assessment/types";

// Informational catalog of zero-config auto-routing combos.
// Auto combos are resolved at request time by the chat handler based on the
// currently connected providers / models — they have no row in the combos
// table, so they were previously invisible in the UI. This panel surfaces
// the static catalog (name, intent, categories, tiers, strategy) so users
// can discover the auto/ prefix without reading source. Duplicate icon lets
// you materialize a snapshot into an editable static combo you can customize.
export default function AutoComboCatalog({
  onComboCreated,
}: {
  onComboCreated?: (comboId: string) => void;
}) {
  const t = useTranslations("combos");
  const [open, setOpen] = useState(false);
  const [duplicatingName, setDuplicatingName] = useState<string | null>(null);

  const handleDuplicateTemplate = useCallback(
    async (template: AutoComboTemplate) => {
      if (
        !confirm(
          `${t("duplicateAutoComboConfirm", { name: template.name })}\n\n${t("duplicateAutoComboSnapshotMsg")}`
        )
      )
        return;

      setDuplicatingName(template.name);
      try {
        const res = await fetch("/api/combos/duplicate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: template.name, strategy: template.strategy }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          alert(
            `${t("duplicateAutoComboFailedPrefix")} ${data.error || t("duplicateAutoComboUnknownError")}`
          );
          return;
        }

        const combo = await res.json();

        // Notify parent page to re-fetch combos so the new card renders.
        onComboCreated?.(String(combo.id));
      } catch (err) {
        console.error("Error duplicating auto-combo:", err);
        alert(
          `${t("duplicateAutoComboFailedPrefix")} ${err instanceof Error ? err.message : t("duplicateAutoComboUnknownError")}`
        );
      } finally {
        setDuplicatingName(null);
      }
    },
    [t, onComboCreated]
  );

  return (
    <Card className="p-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-start justify-between gap-3 text-left"
        aria-expanded={open}
        aria-label={open ? t("autoCatalogCollapse") : t("autoCatalogExpand")}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary">auto_awesome</span>
            <h2 className="text-base font-bold text-text-main">{t("autoCatalogTitle")}</h2>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              {t("autoCatalogTemplateCount", { count: AUTO_COMBO_TEMPLATES.length })}
            </span>
          </div>
          <p className="mt-1 text-xs text-text-muted">{t("autoCatalogDescription")}</p>
        </div>
        <span className="material-symbols-outlined text-base text-text-muted">
          {open ? "expand_less" : "expand_more"}
        </span>
      </button>

      {open && (
        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {AUTO_COMBO_TEMPLATES.map((tpl) => (
            <div
              key={tpl.name}
              className="rounded-lg border border-border bg-bg-subtle p-3 text-xs relative"
            >
              <button
                onClick={() => handleDuplicateTemplate(tpl)}
                disabled={duplicatingName !== null}
                className="absolute bottom-1.5 right-1.5 p-0.5 hover:bg-black/5 dark:hover:bg-white/5 rounded text-text-muted hover:text-primary transition-colors"
                title={t("duplicateAutoComboTitle", { name: tpl.name })}
              >
                <span
                  className={`material-symbols-outlined text-[14px] ${duplicatingName === tpl.name ? "animate-spin" : ""}`}
                >
                  {duplicatingName === tpl.name ? "progress_activity" : "content_copy"}
                </span>
              </button>

              <div className="flex items-center justify-between gap-2">
                <code className="font-mono text-sm text-text-main">{tpl.name}</code>
                <span className="rounded bg-black/5 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-text-muted dark:bg-white/5">
                  {tpl.strategy}
                </span>
              </div>
              <p className="mt-1 text-[11px] font-semibold text-text-main">{tpl.displayName}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {tpl.categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary"
                  >
                    {cat}
                  </span>
                ))}
                {tpl.tiers.map((tier) => (
                  <span
                    key={tier}
                    className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] text-text-muted dark:bg-white/[0.04]"
                  >
                    {tier}
                  </span>
                ))}
              </div>
              {tpl.systemMessage && (
                <p className="mt-2 text-[10px] italic text-text-muted line-clamp-2">
                  {tpl.systemMessage}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
