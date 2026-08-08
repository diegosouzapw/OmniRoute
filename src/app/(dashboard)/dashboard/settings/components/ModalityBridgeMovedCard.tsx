"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

// One-cycle migration notice. The legacy settings component remains in the
// codebase for rollback, but Settings → AI no longer renders or writes it.
export default function ModalityBridgeMovedCard() {
  const t = useTranslations("settings");

  return (
    <section className="rounded-lg border border-border/70 bg-surface/40 p-4">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-[21px] text-fuchsia-500" aria-hidden="true">
          image_search
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="text-base font-semibold text-text-main">
            {t("modalityBridgeMovedTitle")}
          </h4>
          <p className="mt-1 text-sm text-text-muted">{t("modalityBridgeMovedBody")}</p>
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-3 text-sm">
        <Link href="/dashboard/settings/modality-bridge" className="text-primary hover:underline">
          {t("modalityBridgeMovedCta")}
        </Link>
      </div>
    </section>
  );
}
