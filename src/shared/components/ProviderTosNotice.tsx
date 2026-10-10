"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { FREE_TIER_TOS } from "@omniroute/open-sse/config/freeTierCatalog";

/** Explain the global auto policy without changing the provider connection flow. */
export default function ProviderTosNotice({ providerId }: { providerId: string }) {
  const t = useTranslations("providers");
  if (FREE_TIER_TOS[providerId] !== "avoid") return null;

  return (
    <aside className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
      <p className="font-medium text-text-main">{t("tosAvoidNoticeTitle")}</p>
      <p className="mt-1 text-text-muted">{t("tosAvoidNoticeDescription")}</p>
      <Link
        href="/dashboard/combos#auto-tos-policy"
        className="mt-2 inline-block text-primary underline underline-offset-2"
      >
        {t("tosAvoidNoticeAction")}
      </Link>
    </aside>
  );
}
