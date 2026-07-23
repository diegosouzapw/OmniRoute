"use client";

import { useTranslations } from "next-intl";

import { providerText } from "../providerPageHelpers";

interface ProviderQuotaVisibilityToggleProps {
  visible: boolean;
  onToggle: (visible: boolean) => void;
}

export default function ProviderQuotaVisibilityToggle({
  visible,
  onToggle,
}: ProviderQuotaVisibilityToggleProps) {
  const t = useTranslations("providers");
  const actionLabel = visible
    ? providerText(t, "hideConnectionFromProviderQuota", "Hide this account from Provider Quota")
    : providerText(t, "showConnectionInProviderQuota", "Show this account in Provider Quota");

  return (
    <>
      <span className="text-text-muted/30 select-none">|</span>
      <button
        type="button"
        onClick={() => onToggle(!visible)}
        aria-pressed={visible}
        aria-label={actionLabel}
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all cursor-pointer ${
          visible
            ? "bg-sky-500/15 text-sky-500 hover:bg-sky-500/25"
            : "bg-black/[0.03] dark:bg-white/[0.03] text-text-muted/50 hover:text-text-muted hover:bg-black/[0.06] dark:hover:bg-white/[0.06]"
        }`}
        title={actionLabel}
      >
        <span className="material-symbols-outlined text-[13px]">
          {visible ? "visibility" : "visibility_off"}
        </span>
        {providerText(t, "providerQuotaShort", "Quota")}
      </button>
    </>
  );
}
