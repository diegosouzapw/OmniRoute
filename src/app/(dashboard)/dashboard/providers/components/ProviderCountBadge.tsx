"use client";
import { useTranslations } from "next-intl";

interface ProviderCountBadgeProps {
  configured: number;
  total: number;
}

export default function ProviderCountBadge({ configured, total }: ProviderCountBadgeProps) {
  const t = useTranslations("providers");

  if (total === 0) return null;

  const isAllConfigured = configured === total;
  const isNoneConfigured = configured === 0;

  return (
    <span
      className={`ml-3 px-2 py-0.5 text-xs rounded-full font-medium tracking-wide ${
        isAllConfigured
          ? "bg-green-500/15 text-green-500 border border-green-500/30"
          : isNoneConfigured
            ? "bg-text-muted/10 text-text-muted"
            : "bg-primary/10 text-primary border border-primary/20"
      }`}
    >
      {t("configuredCount", { configured, total })}
    </span>
  );
}
