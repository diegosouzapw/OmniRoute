"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Empty state shown when no providers are configured.
 * Matches plan 11 §7.
 */
export function EmptyStateNoProviders() {
  const t = useTranslations("agentBridge");

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-card/50 px-8 py-14 text-center gap-4">
      <div className="p-4 rounded-2xl bg-primary/10">
        <span className="material-symbols-outlined text-[48px] text-primary">
          dns
        </span>
      </div>
      <div>
        <h3 className="text-base font-semibold text-text-main mb-1">
          {t("emptyNoProvidersTitle") || "No providers configured yet"}
        </h3>
        <p className="text-sm text-text-muted max-w-sm">
          {t("emptyNoProvidersBody") ||
            "To use AgentBridge, first connect at least one provider. It will be the destination where IDE requests are routed."}
        </p>
      </div>
      <Link
        href="/dashboard/providers"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        {t("emptyGoToProviders") || "Go to Providers"}
      </Link>
    </div>
  );
}
