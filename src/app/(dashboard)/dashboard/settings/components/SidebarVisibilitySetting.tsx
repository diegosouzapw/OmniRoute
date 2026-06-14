"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SidebarVisibilitySetting() {
  const t = useTranslations("settings");
  const label = (key: string, fallback: string) =>
    typeof t.has === "function" && t.has(key) ? t(key) : fallback;

  return (
    <div className="pt-4 border-t border-border">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium">{t("sidebarVisibilityToggle")}</p>
          <p className="text-sm text-text-muted">
            {label(
              "sidebarCustomizeLink",
              "Customize which items appear in the sidebar, their order, and apply role presets."
            )}
          </p>
        </div>
        <Link
          href="/dashboard/settings/sidebar"
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-border hover:bg-surface/80 hover:border-primary/40 transition-colors text-text-main"
        >
          <span className="material-symbols-outlined text-[16px]">view_sidebar</span>
          {label("sidebarCustomizeLinkBtn", "Customize")}
        </Link>
      </div>
    </div>
  );
}
