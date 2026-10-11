"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

/** Row action that opens the per-key usage, limits and quota page. */
export function ApiKeyDetailsLink({ keyId, keyName }: { keyId: string; keyName: string }) {
  const t = useTranslations("apiManager");
  const label = t("viewKeyDetails", { name: keyName });
  return (
    <Link
      href={`/dashboard/api-manager/${encodeURIComponent(keyId)}`}
      className="p-2 hover:bg-sky-500/10 rounded text-text-muted hover:text-sky-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 transition-all"
      title={label}
      aria-label={label}
    >
      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
        insights
      </span>
    </Link>
  );
}
