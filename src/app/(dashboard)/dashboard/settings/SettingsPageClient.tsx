"use client";

import { useEffect, useState } from "react";
import { SegmentedControl } from "@/shared/components";
import AppearanceTab from "./components/AppearanceTab";
import ResilienceTab from "./components/ResilienceTab";
import SystemStorageTab from "./components/SystemStorageTab";

export type SettingsTab = "general" | "appearance" | "resilience";

const SETTINGS_TABS: Array<{ value: SettingsTab; label: string; icon: string }> = [
  { value: "general", label: "General", icon: "settings" },
  { value: "appearance", label: "Appearance", icon: "palette" },
  { value: "resilience", label: "Resilience", icon: "health_and_safety" },
];

type SettingsPageClientProps = {
  initialTab: SettingsTab;
};

export default function SettingsPageClient({ initialTab }: SettingsPageClientProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const activeLabel = SETTINGS_TABS.find((tab) => tab.value === activeTab)?.label || "General";

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl
        options={SETTINGS_TABS}
        value={activeTab}
        onChange={(value) => setActiveTab(value as SettingsTab)}
        aria-label="Settings sections"
        className="w-fit"
      />

      <div role="tabpanel" aria-label={activeLabel} className="min-w-0">
        {activeTab === "general" ? <SystemStorageTab /> : null}
        {activeTab === "appearance" ? <AppearanceTab /> : null}
        {activeTab === "resilience" ? <ResilienceTab /> : null}
      </div>
    </div>
  );
}
