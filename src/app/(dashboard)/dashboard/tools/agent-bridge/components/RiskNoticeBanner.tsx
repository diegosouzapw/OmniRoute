"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "omniroute-agentbridge-risk-dismissed";

function isNotDismissed(): boolean {
  try {
    return !localStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
}

/**
 * Amber dismissable banner shown at the top of the AgentBridge page.
 * Persisted via localStorage so it only shows once per user.
 * Uses lazy useState initializer to read localStorage without useEffect.
 */
export function RiskNoticeBanner() {
  const t = useTranslations("agentBridge");
  const [visible, setVisible] = useState<boolean>(isNotDismissed);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3"
    >
      <span className="material-symbols-outlined text-amber-500 shrink-0 mt-0.5">warning</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
          {t("riskBannerTitle") || "Use at your own risk"}
        </p>
        <p className="text-xs text-amber-600/80 dark:text-amber-300/70 mt-0.5">
          {t("riskBannerBody") ||
            "AgentBridge intercepts HTTPS traffic from IDE agents. By activating it you accept responsibility for compliance with the terms of service of each agent. Never use on devices or networks where TLS inspection is prohibited."}
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("riskBannerDismiss") || "Dismiss"}
        className="shrink-0 text-amber-500 hover:text-amber-400 transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
}
