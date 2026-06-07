"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function MemoryConceptCard() {
  const t = useTranslations("memory");
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-bg-subtle/50 p-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500 shrink-0">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            psychology
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-text-main">{t("concept.title")}</h2>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">{t("concept.description")}</p>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            {t("concept.howWorksToggle")}
            <span
              className={`material-symbols-outlined text-[14px] transition-transform ${open ? "rotate-180" : ""}`}
            >
              expand_more
            </span>
          </button>
          {open && (
            <div className="mt-3 p-3 rounded-lg bg-surface/50 border border-border/60 text-xs text-text-muted leading-relaxed space-y-1.5">
              {(t("concept.howWorksContent") as string).split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
