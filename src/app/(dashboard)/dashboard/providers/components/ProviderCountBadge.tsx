"use client";

import { useTranslations } from "next-intl";

interface ProviderCountBadgeProps {
  configured: number;
  total: number;
}

export default function ProviderCountBadge({ configured, total }: ProviderCountBadgeProps) {
  const t = useTranslations("providers");

  if (total === 0) return null;

  const colorClass =
    configured === 0
      ? "text-text-muted"
      : configured === total
        ? "text-green-500"
        : "text-amber-500";

  return (
    <span
      className={`text-xs font-medium ${colorClass}`}
      title={t("configuredCount", { configured, total })}
    >
      {configured}/{total}
    </span>
  );
}
