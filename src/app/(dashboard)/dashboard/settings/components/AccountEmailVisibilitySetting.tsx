"use client";

import { useTranslations } from "next-intl";
import { useShallow } from "zustand/react/shallow";
import { Toggle } from "@/shared/components";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";

export default function AccountEmailVisibilitySetting() {
  const t = useTranslations("settings");
  const { emailsVisible, setEmailsVisible } = useEmailPrivacyStore(
    useShallow((state) => ({
      emailsVisible: state.emailsVisible,
      setEmailsVisible: state.setEmailsVisible,
    }))
  );

  const label = (key: string, fallback: string) =>
    typeof t.has === "function" && t.has(key) ? t(key) : fallback;

  return (
    <div className="pt-4 border-t border-border">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium">
            {label("accountEmailVisibility", "Account email visibility")}
          </p>
          <p className="text-sm text-text-muted">
            {label(
              "accountEmailVisibilityDesc",
              "Show full account emails across providers, combos, logs, quota, and playground screens. Turn this off to mask them by default."
            )}
          </p>
        </div>
        <Toggle checked={emailsVisible} onChange={setEmailsVisible} />
      </div>
    </div>
  );
}
