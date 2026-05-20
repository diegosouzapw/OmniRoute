"use client";

import { useTranslations } from "next-intl";
import ThinkingBudgetTab from "../components/ThinkingBudgetTab";
import VisionBridgeSettingsTab from "../components/VisionBridgeSettingsTab";
import SystemPromptTab from "../components/SystemPromptTab";
import MemorySkillsTab from "../components/MemorySkillsTab";
import ModelsDevSyncTab from "../components/ModelsDevSyncTab";

export default function SettingsAiPage() {
  const t = useTranslations("settings");
  return (
    <div className="space-y-6">
      <p className="text-sm text-text-muted">{t("aiSettingsIntro")}</p>
      <ThinkingBudgetTab />
      <VisionBridgeSettingsTab />
      <SystemPromptTab />
      <MemorySkillsTab />
      <ModelsDevSyncTab />
    </div>
  );
}
