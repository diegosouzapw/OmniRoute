"use client";

import { HmacRecipeBlock } from "./shared/HmacRecipeBlock";

interface HowItWorksSidebarProps {
  t: (key: string) => string;
  showCustomNote?: boolean;
}

export function HowItWorksSidebar({ t, showCustomNote }: HowItWorksSidebarProps) {
  const steps = [
    t("howItWorks.step1"),
    t("howItWorks.step2"),
    t("howItWorks.step3"),
    t("howItWorks.step4"),
  ];

  return (
    <aside className="space-y-4 rounded-xl border border-border bg-surface p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-text-main">
        <span className="material-symbols-outlined text-[18px] text-primary">info</span>
        {t("howItWorks.title")}
      </h3>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-xs text-text-muted">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      {showCustomNote && (
        <div className="space-y-3 border-t border-border pt-3">
          <p className="text-xs text-text-muted">{t("howItWorks.customOnly")}</p>
          <HmacRecipeBlock
            title={t("howItWorks.hmacRecipeTitle")}
            code={t("howItWorks.hmacRecipe")}
          />
        </div>
      )}
    </aside>
  );
}
