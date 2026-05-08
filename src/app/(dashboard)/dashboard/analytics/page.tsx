"use client";

import { useState, Suspense } from "react";
import { UsageAnalytics, CardSkeleton, SegmentedControl } from "@/shared/components";
import EvalsTab from "../usage/components/EvalsTab";
import SearchAnalyticsTab from "./SearchAnalyticsTab";
import CompressionAnalyticsTab from "./CompressionAnalyticsTab";
import DiversityScoreCard from "./components/DiversityScoreCard";
import ProviderUtilizationTab from "./ProviderUtilizationTab";
import ComboHealthTab from "./ComboHealthTab";
import { useTranslations } from "next-intl";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const t = useTranslations("analytics");

  const tabDescriptions: Record<string, string> = {
    overview: t("overviewDescription"),
    evals: t("evalsDescription"),
    search: "Search request analytics — provider breakdown, cache hit rate, and cost tracking.",
    utilization: t("utilizationDescription"),
    comboHealth: t("comboHealthDescription"),
    compression: t("compressionAnalyticsDescription"),
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[28px]">analytics</span>
          {t("title")}
        </h1>
        <p className="text-sm text-text-muted mt-1">{tabDescriptions[activeTab]}</p>
      </div>

      <SegmentedControl
        options={[
          { value: "overview", label: t("overview") },
          { value: "evals", label: t("evals") },
          { value: "search", label: "Search" },
          { value: "utilization", label: t("utilization") },
          { value: "comboHealth", label: t("comboHealth") },
          { value: "compression", label: t("compressionAnalyticsTitle") },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "overview" && (
        <>
          <Suspense fallback={<CardSkeleton />}>
            <UsageAnalytics />
          </Suspense>
          <DiversityScoreCard />
        </>
      )}
      {activeTab === "evals" && <EvalsTab />}
      {activeTab === "search" && <SearchAnalyticsTab />}
      {activeTab === "utilization" && <ProviderUtilizationTab />}
      {activeTab === "comboHealth" && <ComboHealthTab />}
      {activeTab === "compression" && <CompressionAnalyticsTab />}
    </div>
  );
}
