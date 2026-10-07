"use client";

import { useTranslations } from "next-intl";
import useJsonTreeExpandStore, { useJsonTreeExpandLevel } from "@/store/jsonTreeExpandStore";

interface JsonTreeExpandControlsProps {
  /** Stable, locale-independent identifier for this box (e.g. "openaiRequest",
   * "providerEventStream") -- NOT the translated title. Each sectionId tracks
   * its own expand level, shared across different log entries but independent
   * from every other section on the page, since different payload/stream
   * boxes carry "interesting" data at different nesting depths. */
  sectionId: string;
}

export function JsonTreeExpandControls({ sectionId }: JsonTreeExpandControlsProps) {
  const t = useTranslations("requestLogger.detail");
  const level = useJsonTreeExpandLevel(sectionId);
  const { collapseAll, collapseOneLevel, expandOneLevel, expandAll } = useJsonTreeExpandStore();

  const buttonClass =
    "p-1 rounded hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors";

  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        onClick={() => collapseAll(sectionId)}
        title={t("collapseAllLevels")}
        aria-label={t("collapseAllLevels")}
        className={buttonClass}
      >
        <span className="material-symbols-outlined text-[16px]">collapse_all</span>
      </button>
      <button
        type="button"
        onClick={() => collapseOneLevel(sectionId)}
        title={t("collapseOneLevel")}
        aria-label={t("collapseOneLevel")}
        className={buttonClass}
      >
        <span className="material-symbols-outlined text-[16px]">remove</span>
      </button>
      <span
        className="min-w-[1.5em] text-center text-[11px] font-mono text-text-muted tabular-nums"
        title={t("currentExpandLevel")}
      >
        {level}
      </span>
      <button
        type="button"
        onClick={() => expandOneLevel(sectionId)}
        title={t("expandOneLevel")}
        aria-label={t("expandOneLevel")}
        className={buttonClass}
      >
        <span className="material-symbols-outlined text-[16px]">add</span>
      </button>
      <button
        type="button"
        onClick={() => expandAll(sectionId)}
        title={t("expandAllLevels")}
        aria-label={t("expandAllLevels")}
        className={buttonClass}
      >
        <span className="material-symbols-outlined text-[16px]">expand_all</span>
      </button>
    </div>
  );
}
