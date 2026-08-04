"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "@/shared/hooks/useTheme";
import { cn } from "@/shared/utils/cn";

export default function ThemeToggle({
  className,
  variant = "default",
}: {
  className?: any;
  variant?: string;
}) {
  const { toggleTheme, isDark } = useTheme();
  const t = useTranslations("header");
  const toggleLabel = isDark ? t("switchToLightMode") : t("switchToDarkMode");

  const variants = {
    default: cn(
      "flex items-center justify-center size-10 rounded-full",
      "text-text-muted",
      "hover:bg-black/5",
      "hover:text-text-main",
      "transition-colors"
    ),
    card: cn(
      "flex items-center justify-center size-11 rounded-full",
      "bg-surface/60",
      "hover:bg-surface",
      "border border-border",
      "backdrop-blur-md shadow-sm hover:shadow-md",
      "text-text-muted-light hover:text-primary",
      "hover:text-primary",
      "transition-all group"
    ),
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(variants[variant], className)}
      aria-label={toggleLabel}
      title={toggleLabel}
    >
      <span
        className={cn(
          "material-symbols-outlined text-[22px]",
          variant === "card" && "transition-transform duration-300 group-hover:rotate-12"
        )}
      >
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
