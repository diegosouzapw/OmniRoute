"use client";

import { cn } from "@/shared/utils/cn";
import { useTranslations } from "next-intl";
import Toggle from "./Toggle";

interface NoAuthProviderToggleProps {
  enabled: boolean;
  saving?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  className?: string;
}

export default function NoAuthProviderToggle({
  enabled,
  saving = false,
  onEnabledChange,
  className,
}: NoAuthProviderToggleProps) {
  const t = useTranslations("common");
  if (!onEnabledChange) return null;

  return (
    <div className={cn("inline-flex items-center gap-2 rounded-md px-1 py-1", className)}>
      <span className="text-sm font-medium text-text-main">
        {saving ? t("saving") : enabled ? t("enabled") : t("disabled")}
      </span>
      <Toggle
        size="lg"
        checked={enabled}
        disabled={saving}
        onChange={onEnabledChange}
        ariaLabel={t("toggleNoAuthProvider")}
        title={enabled ? t("disableProvider") : t("enableProvider")}
      />
    </div>
  );
}
