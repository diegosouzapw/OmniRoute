"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";
import ProxyTab from "@/app/(dashboard)/dashboard/settings/components/ProxyTab";
import MitmProxyTab from "@/app/(dashboard)/dashboard/settings/components/MitmProxyTab";
import OneproxyTab from "@/app/(dashboard)/dashboard/settings/components/OneproxyTab";

const subTabs = [
  { id: "http", labelKey: "httpProxy", icon: "dns" },
  { id: "mitm", labelKey: "mitmProxy", icon: "lan" },
  { id: "oneproxy", labelKey: "1proxy", icon: "public" },
];

export default function ProxyPage() {
  const t = useTranslations("settings");
  const [activeSubTab, setActiveSubTab] = useState("http");

  return (
    <div className="max-w-6xl mx-auto min-w-0">
      <div className="flex flex-col gap-6">
        <div className="w-full overflow-x-auto pb-1">
          <div
            role="tablist"
            aria-label={t("proxySubTabsAria")}
            className="inline-flex items-center p-1 rounded-lg bg-black/5 dark:bg-white/5 min-w-max"
          >
            {subTabs.map((subTab) => (
              <button
                key={subTab.id}
                role="tab"
                aria-selected={activeSubTab === subTab.id}
                tabIndex={activeSubTab === subTab.id ? 0 : -1}
                onClick={() => setActiveSubTab(subTab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all text-sm",
                  activeSubTab === subTab.id
                    ? "bg-white dark:bg-white/10 text-text-main shadow-sm"
                    : "text-text-muted hover:text-text-main"
                )}
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  {subTab.icon}
                </span>
                <span className="whitespace-nowrap">
                  {subTab.id === "http" ? t("proxy") : t(subTab.labelKey)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          role="tabpanel"
          aria-label={t(subTabs.find((t) => t.id === activeSubTab)?.labelKey || "proxy")}
        >
          {activeSubTab === "http" && (
            <div className="flex flex-col gap-6">
              <ProxyTab />
            </div>
          )}

          {activeSubTab === "mitm" && (
            <div className="flex flex-col gap-6">
              <MitmProxyTab />
            </div>
          )}

          {activeSubTab === "oneproxy" && (
            <div className="flex flex-col gap-6">
              <OneproxyTab />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
