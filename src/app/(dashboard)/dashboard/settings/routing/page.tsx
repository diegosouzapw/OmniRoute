"use client";

import { useTranslations } from "next-intl";
import RoutingStrategyCard from "../components/RoutingStrategyCard";
import QuotaPreflightCard from "../components/QuotaPreflightCard";
import RoutingTab from "../components/RoutingTab";
import ModelRoutingSection from "@/shared/components/ModelRoutingSection";
import ComboDefaultsTab from "../components/ComboDefaultsTab";
import FallbackChainsEditor from "../components/FallbackChainsEditor";
import ModelAliasesUnified from "../components/ModelAliasesUnified";
import BackgroundDegradationTab from "../components/BackgroundDegradationTab";
import RoutingEntryLink from "@/shared/components/routing/RoutingEntryLink";

export default function SettingsRoutingPage() {
  const t = useTranslations("settings");
  return (
    <div className="space-y-6">
      <p className="text-sm text-text-muted">{t("routingSettingsIntro")}</p>
      <RoutingStrategyCard />
      <QuotaPreflightCard />
      <ComboDefaultsTab />
      <RoutingEntryLink />
      <ModelAliasesUnified />
      <FallbackChainsEditor />
      <ModelRoutingSection />
      <RoutingTab />
      <BackgroundDegradationTab />
    </div>
  );
}
