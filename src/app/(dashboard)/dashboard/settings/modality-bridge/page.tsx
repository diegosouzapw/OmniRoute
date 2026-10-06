"use client";

import { Suspense, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import ModalityBridgeAudioTab from "@/app/(dashboard)/dashboard/settings/components/modalityBridge/ModalityBridgeAudioTab";
import ModalityBridgeVideoTab from "@/app/(dashboard)/dashboard/settings/components/modalityBridge/ModalityBridgeVideoTab";
import ModalityBridgeVisionTab from "@/app/(dashboard)/dashboard/settings/components/modalityBridge/ModalityBridgeVisionTab";

type TabId = "vision" | "audio" | "video";

const TABS: ReadonlyArray<{ id: TabId; labelKey: string }> = [
  { id: "vision", labelKey: "modalityBridgeVisionTab" },
  { id: "audio", labelKey: "modalityBridgeAudioTab" },
  { id: "video", labelKey: "modalityBridgeVideoTab" },
];

function ModalityBridgePageContent() {
  const t = useTranslations("settings");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = useMemo<TabId>(() => {
    const requested = searchParams.get("tab") as TabId | null;
    return requested && TABS.some((tab) => tab.id === requested) ? requested : "vision";
  }, [searchParams]);

  const handleTabChange = (tab: TabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-muted">{t("modalityBridgeIntro")}</p>
      <div
        className="flex gap-1 overflow-x-auto border-b border-border"
        role="tablist"
        aria-label={t("modalityBridgeSubTabsAria")}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls="modality-bridge-tabpanel"
            onClick={() => handleTabChange(tab.id)}
            className={`whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text"
            }`}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      <div id="modality-bridge-tabpanel" role="tabpanel">
        {activeTab === "vision" && <ModalityBridgeVisionTab />}
        {activeTab === "audio" && <ModalityBridgeAudioTab />}
        {activeTab === "video" && <ModalityBridgeVideoTab />}
      </div>
    </div>
  );
}

export default function ModalityBridgePage() {
  return (
    <Suspense fallback={null}>
      <ModalityBridgePageContent />
    </Suspense>
  );
}
