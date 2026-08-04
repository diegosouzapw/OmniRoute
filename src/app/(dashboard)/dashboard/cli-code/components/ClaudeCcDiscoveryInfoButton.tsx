"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

/**
 * ClaudeCcDiscoveryInfoButton — informational entry point for the Claude Code
 * discovery-alias gate (`claude/<provider>/<model>` mirror ids, see
 * src/lib/db/ccDiscoveryAliases.ts). The actual on/off toggles live on each
 * provider's detail page (ProviderCcAliasSection) and the global flag lives
 * on the Feature Flags screen — this button just explains the feature and
 * links there, since Claude Code's tool card is where operators are already
 * looking when wiring the CLI's model discovery.
 */
export default function ClaudeCcDiscoveryInfoButton() {
  const t = useTranslations("cliTools");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        title={t("ccDiscoveryInfoTooltip")}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-2.5 py-1 text-[12px] text-text-main hover:border-primary/40 transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">help</span>
        {t("ccDiscoveryInfoButton")}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-80 rounded-lg border border-border bg-surface p-3 text-xs shadow-lg">
          <p className="text-text-muted mb-2">{t("ccDiscoveryInfoTooltip")}</p>
          <Link
            href="/dashboard/settings/feature-flags"
            className="font-medium text-primary hover:underline"
          >
            {t("ccDiscoveryInfoLink")}
          </Link>
        </div>
      )}
    </div>
  );
}
