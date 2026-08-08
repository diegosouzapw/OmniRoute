"use client";

import { Suspense, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import ModalityBridgeComingSoonTab from "@/app/(dashboard)/dashboard/settings/components/modalityBridge/ModalityBridgeComingSoonTab";
import ModalityBridgeVisionTab from "@/app/(dashboard)/dashboard/settings/components/modalityBridge/ModalityBridgeVisionTab";

type TabId = "vision" | "audio" | "video";

const TABS: ReadonlyArray<{ id: TabId; labelKey: string; fallback: string }> = [
  { id: "vision", labelKey: "modalityBridgeVisionTab", fallback: "Vision" },
  { id: "audio", labelKey: "modalityBridgeAudioTab", fallback: "Audio" },
  { id: "video", labelKey: "modalityBridgeVideoTab", fallback: "Video" },
];

function ModalityBridgePageContent() {
  const t = useTranslations("settings");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const translateOrFallback = (key: string, fallback: string) =>
    typeof t.has === "function" && !t.has(key) ? fallback : t(key);

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
        aria-label={translateOrFallback("modalityBridgeSubTabsAria", "Modality Bridge sections")}
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
            {translateOrFallback(tab.labelKey, tab.fallback)}
          </button>
        ))}
      </div>

      <div id="modality-bridge-tabpanel" role="tabpanel">
        {activeTab === "vision" && <ModalityBridgeVisionTab />}
        {activeTab === "audio" && (
          <ModalityBridgeComingSoonTab bodyKey="modalityBridgeAudioComingSoon" />
        )}
        {activeTab === "video" && (
          <ModalityBridgeComingSoonTab bodyKey="modalityBridgeVideoComingSoon" />
        )}
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
