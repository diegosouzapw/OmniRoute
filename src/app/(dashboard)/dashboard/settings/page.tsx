"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { APP_CONFIG } from "@/shared/constants/appConfig";
import { useTranslations } from "next-intl";
import SystemStorageTab from "./components/SystemStorageTab";
import SecurityTab from "./components/SecurityTab";
import RoutingTab from "./components/RoutingTab";
import ComboDefaultsTab from "./components/ComboDefaultsTab";
import AppearanceTab from "./components/AppearanceTab";
import ThinkingBudgetTab from "./components/ThinkingBudgetTab";
import SystemPromptTab from "./components/SystemPromptTab";
import ModelAliasesUnified from "./components/ModelAliasesUnified";
import BackgroundDegradationTab from "./components/BackgroundDegradationTab";
import CacheSettingsTab from "./components/CacheSettingsTab";
import MemorySkillsTab from "./components/MemorySkillsTab";
import ModelsDevSyncTab from "./components/ModelsDevSyncTab";
import ResilienceTab from "./components/ResilienceTab";
import CliproxyapiSettingsTab from "./components/CliproxyapiSettingsTab";
import PayloadRulesTab from "./components/PayloadRulesTab";
import VisionBridgeSettingsTab from "./components/VisionBridgeSettingsTab";
import ModelRoutingSection from "@/shared/components/ModelRoutingSection";

const tabs = [
  { id: "general", labelKey: "general", icon: "settings" },
  { id: "appearance", labelKey: "appearance", icon: "palette" },
  { id: "ai", labelKey: "ai", icon: "smart_toy" },
  { id: "security", labelKey: "security", icon: "shield" },
  { id: "routing", labelKey: "routing", icon: "route" },
  { id: "resilience", labelKey: "resilience", icon: "electrical_services" },
  { id: "advanced", labelKey: "advanced", icon: "tune" },
];

export default function SettingsPage() {
  const t = useTranslations("settings");
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [userSelectedTab, setUserSelectedTab] = useState(null);
  const activeTab = userSelectedTab || tabs.find((t) => t.id === tabParam)?.id || "general";

  return (
    <div className="max-w-6xl mx-auto min-w-0">
      <div className="flex flex-col gap-6">
        {/* Tab navigation */}
        <div className="w-full overflow-x-auto pb-1">
          <div
            role="tablist"
            aria-label={t("settingsSectionsAria")}
            className="inline-flex items-center p-1 rounded-lg bg-black/5 dark:bg-white/5 min-w-max"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setUserSelectedTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all text-sm",
                  activeTab === tab.id
                    ? "bg-white dark:bg-white/10 text-text-main shadow-sm"
                    : "text-text-muted hover:text-text-main"
                )}
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  {tab.icon}
                </span>
                <span className="hidden sm:inline whitespace-nowrap">{t(tab.labelKey)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab contents */}
        <div
          role="tabpanel"
          aria-label={t(tabs.find((t2) => t2.id === activeTab)?.labelKey || "general")}
        >
          {activeTab === "general" && (
            <div className="flex flex-col gap-6">
              <SystemStorageTab />
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="flex flex-col gap-6">
              <AppearanceTab />
            </div>
          )}

          {activeTab === "ai" && (
            <div className="flex flex-col gap-6">
              <ThinkingBudgetTab />
              <Link
                href="/dashboard/context/caveman"
                className="flex items-center justify-between rounded-lg border border-border bg-surface p-4 transition-colors hover:bg-sidebar/50"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-primary">
                    compress
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-text-main">
                      {t("compressionTitle")}
                    </span>
                    <span className="block text-xs text-text-muted">{t("compressionDesc")}</span>
                  </span>
                </span>
                <span className="material-symbols-outlined text-[18px] text-text-muted">
                  chevron_right
                </span>
              </Link>
              <VisionBridgeSettingsTab />
              <SystemPromptTab />
              <CacheSettingsTab />
              <MemorySkillsTab />
              <ModelsDevSyncTab />
            </div>
          )}

          {activeTab === "security" && <SecurityTab />}

          {activeTab === "routing" && (
            <div className="flex flex-col gap-6">
              <RoutingTab />
              <ModelRoutingSection />
              <ComboDefaultsTab />
              <ModelAliasesUnified />
              <BackgroundDegradationTab />
            </div>
          )}

          {activeTab === "resilience" && <ResilienceTab />}

          {activeTab === "advanced" && (
            <div className="flex flex-col gap-6">
              <PayloadRulesTab />
              <CliproxyapiSettingsTab />
            </div>
          )}
        </div>

        {/* App Info */}
        <div className="text-center text-sm text-text-muted py-4">
          <p>
            {APP_CONFIG.name} v{APP_CONFIG.version}
          </p>
          <p className="mt-1">{t("localMode")}</p>
        </div>
      </div>
    </div>
  );
}
