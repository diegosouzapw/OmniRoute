"use client";

import { useTranslations } from "next-intl";
import ResilienceTab from "../components/ResilienceTab";

export default function SettingsResiliencePage() {
  const t = useTranslations("settings");
  return (
    <div className="space-y-6">
      <p className="text-sm text-text-muted">{t("resilienceSettingsIntro")}</p>
      <ResilienceTab />
    </div>
  );
}
