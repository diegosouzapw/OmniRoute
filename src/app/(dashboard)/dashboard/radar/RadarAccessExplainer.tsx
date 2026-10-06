"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

function RuleItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span aria-hidden="true" className="mt-0.5 shrink-0 text-green-400">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

/** D32 — normative access, safety, and privacy rules shown before opt-in. */
export function RadarAccessExplainer() {
  const t = useTranslations("radarPage");

  return (
    <section
      aria-labelledby="radar-access-scale-title"
      className="w-full rounded-xl border border-border bg-violet-500/5 p-4 text-left sm:p-5"
    >
      <h3 id="radar-access-scale-title" className="text-base font-semibold text-text-main">
        {t("accessScaleTitle")}
      </h3>
      <p className="mt-1 text-sm text-text-muted">{t("accessScaleIntro")}</p>

      <ul className="mt-4 grid gap-3 text-sm text-text-muted md:grid-cols-2">
        <RuleItem>{t("accessCommunityRule")}</RuleItem>
        <RuleItem>{t("accessSingleUseRule")}</RuleItem>
        <RuleItem>{t("accessContributorRule")}</RuleItem>
        <RuleItem>{t("accessSupporterRule")}</RuleItem>
      </ul>

      <div className="mt-5 grid gap-4 border-t border-border pt-4 md:grid-cols-2">
        <section aria-labelledby="radar-access-use-title">
          <h4 id="radar-access-use-title" className="text-sm font-semibold text-text-main">
            {t("accessUseTitle")}
          </h4>
          <ul className="mt-2 flex flex-col gap-2 text-sm text-text-muted">
            <RuleItem>{t("accessInstallationRule")}</RuleItem>
            <RuleItem>{t("accessAbuseRule")}</RuleItem>
            <RuleItem>{t("accessOffersRule")}</RuleItem>
          </ul>
        </section>

        <section aria-labelledby="radar-privacy-title">
          <h4 id="radar-privacy-title" className="text-sm font-semibold text-text-main">
            {t("privacyTitle")}
          </h4>
          <ul className="mt-2 flex flex-col gap-2 text-sm text-text-muted">
            <RuleItem>{t("privacyDownloadsRule")}</RuleItem>
            <RuleItem>{t("privacySendsRule")}</RuleItem>
            <RuleItem>{t("privacyNeverRule")}</RuleItem>
          </ul>
        </section>
      </div>
    </section>
  );
}
