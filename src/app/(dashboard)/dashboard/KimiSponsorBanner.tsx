"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { APP_CONFIG } from "@/shared/constants/appConfig";
import { shouldShowKimiSponsorBanner } from "./kimiSponsorBanner";

// Official Kimi partnership tracking link — keep in sync with README.md's
// Sponsors section and the aff links wired in the providers onboarding UI
// (ProviderPageHeader.tsx).
const KIMI_CODING_AFF_URL = "https://www.kimi.com/code?aff=omniroute";

// Versioned dismissal key — bump the suffix (e.g. `-v2`) if the banner's
// offer/copy ever changes materially enough to warrant re-showing it to
// users who already dismissed the previous version.
const DISMISS_STORAGE_KEY = "omniroute-kimi-sponsor-banner-dismissed-v1";

function isNotDismissed(): boolean {
  try {
    return !localStorage.getItem(DISMISS_STORAGE_KEY);
  } catch {
    return true;
  }
}

/**
 * Dismissable banner announcing the Kimi (Moonshot AI) official OmniRoute
 * partnership on the dashboard home page. Self-contained: reads the app's own
 * version (APP_CONFIG.version) to decide whether it is still inside the
 * agreed display window (see kimiSponsorBanner.ts) and persists dismissal via
 * localStorage, mirroring RiskNoticeBanner's lazy-useState pattern. The
 * logomark reuses <ProviderIcon providerId="moonshot" .../> so it stays
 * theme-aware for free via the THEMED_SVGS wiring in ProviderIcon.tsx.
 */
export default function KimiSponsorBanner() {
  const t = useTranslations("kimiSponsorBanner");
  const [visible, setVisible] = useState<boolean>(isNotDismissed);

  if (!visible || !shouldShowKimiSponsorBanner(APP_CONFIG.version)) {
    return null;
  }

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_STORAGE_KEY, "true");
    } catch {
      // ignore — worst case the banner reappears next visit
    }
    setVisible(false);
  };

  return (
    <div
      role="complementary"
      aria-label={t("title")}
      className="mb-4 flex flex-col gap-3 rounded-lg border border-[#1783FF]/30 bg-[#1783FF]/5 px-4 py-3 dark:bg-[#1783FF]/10 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#1783FF]/10">
          <ProviderIcon providerId="moonshot" size={24} type="color" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-main">{t("title")}</p>
          <p className="mt-0.5 text-xs text-text-muted">{t("description")}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
        <div className="flex flex-col items-end gap-0.5">
          <a
            href={KIMI_CODING_AFF_URL}
            target="_blank"
            rel="noopener noreferrer"
            title={t("partnerLinkNote")}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#1783FF] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:brightness-110"
          >
            {t("cta")}
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              open_in_new
            </span>
          </a>
          <span className="text-[9px] text-text-muted/70">{t("partnerLinkNote")}</span>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("dismissAriaLabel")}
          className="text-text-muted transition-colors hover:text-text-main"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
}
