"use client";

import { useTranslations } from "next-intl";
import RoutingTab from "../components/RoutingTab";
import ModelRoutingSection from "@/shared/components/ModelRoutingSection";
import ComboDefaultsTab from "../components/ComboDefaultsTab";
import FallbackChainsEditor from "../components/FallbackChainsEditor";
import ModelAliasesUnified from "../components/ModelAliasesUnified";
import BackgroundDegradationTab from "../components/BackgroundDegradationTab";

export default function SettingsRoutingPage() {
  const t = useTranslations("settings");
  return (
    <div className="space-y-6">
      <p className="text-sm text-text-muted">{t("routingSettingsIntro")}</p>
      <ComboDefaultsTab />
      <ModelAliasesUnified />
      <FallbackChainsEditor />
      <ModelRoutingSection />
      <RoutingTab />
      <BackgroundDegradationTab />
    </div>
  );
}
