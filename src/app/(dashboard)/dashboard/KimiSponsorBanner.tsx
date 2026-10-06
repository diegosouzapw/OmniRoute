"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { APP_CONFIG } from "@/shared/constants/appConfig";
import { shouldShowKimiSponsorBanner } from "./kimiSponsorBannerGate";

// Official Kimi partnership tracking link — keep in sync with README.md's
// Open Source Friends section and the aff links wired in the providers
// onboarding UI (ProviderPageHeader.tsx). Retargeted 2026-08 from the coding
// plan (kimi.com/code) to the API platform at Moonshot's request: coding plan
// subscriptions are closed to most new users, so that traffic could not
// convert.
// Dedicated tracked link issued by Moonshot 2026-08 for the 15% first-top-up
// bonus campaign (offer valid through 2026-09-30 — revisit the 15% copy in the
// i18n `kimiSponsorBanner.description` strings after that date if not renewed).
const KIMI_PLATFORM_AFF_URL =
  "https://platform.kimi.ai?track_id=track-8197581fdd7d4139a0f562e4a03c3798&aff=omniroute";

// Versioned dismissal key — bump the suffix (e.g. `-v3`) if the banner's
// offer/copy ever changes materially enough to warrant re-showing it to
// users who already dismissed the previous version. `-v2` = the 2026-08 CTA
// retarget to the API platform (new destination + new copy).
const DISMISS_STORAGE_KEY = "omniroute-kimi-sponsor-banner-dismissed-v2";
// Same-tab signal for the dismiss button, since writing localStorage doesn't
// fire a "storage" event in the tab that wrote it.
const DISMISS_EVENT = "omniroute:kimi-sponsor-banner-dismissed";

function isNotDismissed(): boolean {
  try {
    return !localStorage.getItem(DISMISS_STORAGE_KEY);
  } catch {
    return true;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(DISMISS_EVENT, callback);
  return () => window.removeEventListener(DISMISS_EVENT, callback);
}

// SSR has no localStorage, so the server always renders the banner visible;
// useSyncExternalStore reconciles that against the real client-side value
// right after hydration (mirroring useTheme's systemPrefersDark pattern),
// with no hydration mismatch and no setState-in-effect.
function getServerSnapshot() {
  return true;
}

/**
 * Dismissable banner announcing the Kimi (Moonshot AI) official OmniRoute
 * partnership on the dashboard home page. Self-contained: reads the app's own
 * version (APP_CONFIG.version) to decide whether it is still inside the
 * agreed display window (see kimiSponsorBannerGate.ts) and persists dismissal via
 * localStorage. The logomark reuses <ProviderIcon providerId="moonshot" .../>
 * so it stays theme-aware for free via the THEMED_SVGS wiring in
 * ProviderIcon.tsx.
 */
export default function KimiSponsorBanner() {
  const t = useTranslations("kimiSponsorBanner");
  const visible = useSyncExternalStore(subscribe, isNotDismissed, getServerSnapshot);

  if (!visible || !shouldShowKimiSponsorBanner(APP_CONFIG.version)) {
    return null;
  }

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_STORAGE_KEY, "true");
    } catch {
      // ignore — worst case the banner reappears next visit
    }
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  return (
    <div
      role="complementary"
      aria-label={t("foundingFriendTitle")}
      className="mb-4 flex flex-col gap-3 rounded-lg border border-[#1783FF]/30 bg-[#1783FF]/5 px-4 py-3 dark:bg-[#1783FF]/10 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#1783FF]/10">
          <ProviderIcon providerId="moonshot" size={24} type="color" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text-main">{t("foundingFriendTitle")}</p>
          <p className="mt-0.5 text-xs text-text-muted">{t("description")}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
        <div className="flex flex-col items-end gap-0.5">
          <a
            href={KIMI_PLATFORM_AFF_URL}
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
