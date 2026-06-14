"use client";

import { type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";
import type { AdvancedSlug } from "../../types";

export interface AdvancedSectionProps {
  /** Slug to force-open on initial mount (deep-link from URL). */
  forceOpenSlug?: AdvancedSlug | null;
  /** F9 passes the 5 accordions as children, each with a slug prop. */
  children?: ReactNode;
}

/**
 * Container for the 5 Advanced accordions.
 * Does NOT implement lazy-render itself — each accordion (RawJsonPanel,
 * PipelineView, StreamTransformerAccordion, TestBenchAccordion,
 * CompressionPreviewAccordion) controls its own mount guard (D7).
 *
 * forceOpenSlug is forwarded as data-slug on the wrapper div so each
 * accordion child can read it via props passed down by F9's TranslateTab.
 */
export default function AdvancedSection({
  forceOpenSlug,
  children,
}: AdvancedSectionProps) {
  const t = useTranslations("translator");

  /** Safe i18n with inline fallback — pattern from TranslatorPageClient. */
  const tr = (key: string, fallback: string): string => {
    try {
      const v = t(key as Parameters<typeof t>[0]);
      // When next-intl returns the key itself (missing key), use fallback.
      if (v === key || v === `translator.${key}`) return fallback;
      return v as string;
    } catch {
      return fallback;
    }
  };

  return (
    <Card id="translator-advanced-section" className="border-amber-500/10 bg-amber-500/[0.02]">
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <span
            className="material-symbols-outlined text-amber-500 text-[20px] mt-0.5 shrink-0"
            aria-hidden="true"
          >
            tune
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-text-main">
              {tr("advancedSectionTitle", "Advanced")}
            </h3>
            <p className="text-xs text-text-muted">
              {tr(
                "advancedSectionSubtitle",
                "Raw JSON, pipeline e ferramentas técnicas. Tudo aqui é igual às tabs antigas — apenas reorganizado.",
              )}
            </p>
          </div>
        </div>

        {/* Accordion slots — children provided by F9 (TranslateTab) */}
        <div
          className="space-y-2"
          data-advanced-container="true"
          data-slug={forceOpenSlug ?? "none"}
        >
          {children}
        </div>
      </div>
    </Card>
  );
}
