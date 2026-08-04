"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";
import TranslateFlowDiagram from "./TranslateFlowDiagram";

export default function TranslatorConceptCard() {
  const t = useTranslations("translator");
  const [open, setOpen] = useState(false);

  const tr = useCallback(
    (key: string, fallback: string) => {
      try {
        const translated = t(key);
        return translated === key || translated === `translator.${key}` ? fallback : translated;
      } catch {
        return fallback;
      }
    },
    [t]
  );

  return (
    <Card className="border-primary/10 bg-primary/5">
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <span
            className="material-symbols-outlined text-primary text-[22px] mt-0.5 shrink-0"
            aria-hidden="true"
          >
            info
          </span>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-text-main mb-1">
              {tr(
                "conceptHeadline",
                'Your app speaks one API "language". Translator converts it to use another provider.'
              )}
            </h2>
            <p className="text-xs text-text-muted">
              {tr(
                "friendlySubtitle",
                "Use your existing app with any provider without rewriting code."
              )}
            </p>
          </div>
        </div>

        <TranslateFlowDiagram />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="translator-concept-how-it-works"
          className="flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors w-full justify-start py-1 rounded"
        >
          <span>{tr("conceptHowItWorksToggle", "How it works")}</span>
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            {open ? "expand_less" : "expand_more"}
          </span>
        </button>

        {open && (
          <div
            id="translator-concept-how-it-works"
            className="text-xs text-text-muted leading-relaxed border-t border-border pt-3"
          >
            {tr(
              "conceptHowItWorksBody",
              "Your app sends a request in its own format. Translator detects that format, converts through OpenAI as an intermediate hub (or directly when a direct translator is available), sends it to the selected provider, and converts the response back to your app's format."
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
