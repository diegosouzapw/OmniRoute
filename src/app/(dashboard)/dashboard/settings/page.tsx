"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { APP_CONFIG } from "@/shared/constants/config";
import SystemStorageTab from "./components/SystemStorageTab";
import SecurityTab from "./components/SecurityTab";
import RoutingTab from "./components/RoutingTab";
import ComboDefaultsTab from "./components/ComboDefaultsTab";
import ProxyTab from "./components/ProxyTab";
import AppearanceTab from "./components/AppearanceTab";
import ThinkingBudgetTab from "./components/ThinkingBudgetTab";
import SystemPromptTab from "./components/SystemPromptTab";

import CacheStatsCard from "./components/CacheStatsCard";
import ResilienceTab from "./components/ResilienceTab";

const tabs = [
  { id: "general", label: "General", icon: "settings" },
  { id: "ai", label: "AI", icon: "smart_toy" },
  { id: "security", label: "Security", icon: "shield" },
  { id: "routing", label: "Routing", icon: "route" },
  { id: "resilience", label: "Resilience", icon: "electrical_services" },
  { id: "advanced", label: "Advanced", icon: "tune" },
];

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [userSelectedTab, setUserSelectedTab] = useState(null);
  const activeTab = userSelectedTab || tabs.find((t) => t.id === tabParam)?.id || "general";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* Tab navigation */}
        <div
          role="tablist"
          aria-label="Settings sections"
          className="inline-flex items-center p-1 rounded-lg bg-black/5 dark:bg-white/5 self-start"
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
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab contents */}
        <div role="tabpanel" aria-label={tabs.find((t) => t.id === activeTab)?.label}>
          {activeTab === "general" && (
            <>
              <div className="flex flex-col gap-6">
                <SystemStorageTab />
                <AppearanceTab />
              </div>
            </>
          )}

          {activeTab === "ai" && (
            <div className="flex flex-col gap-6">
              <ThinkingBudgetTab />
              <SystemPromptTab />
              <CacheStatsCard />
            </div>
          )}

          {activeTab === "security" && <SecurityTab />}

          {activeTab === "routing" && (
            <div className="flex flex-col gap-6">
              <RoutingTab />
              <ComboDefaultsTab />
            </div>
          )}

          {activeTab === "resilience" && <ResilienceTab />}

          {activeTab === "advanced" && <ProxyTab />}
        </div>

        {/* App Info */}
        <div className="text-center text-sm text-text-muted py-4">
          <p>
            {APP_CONFIG.name} v{APP_CONFIG.version}
          </p>
          <p className="mt-1">Local Mode — All data stored on your machine</p>
        </div>
      </div>
    </div>
  );
}
