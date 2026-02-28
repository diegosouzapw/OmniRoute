"use client";

import { useState, Suspense } from "react";
import { UsageAnalytics, CardSkeleton, SegmentedControl } from "@/shared/components";
import EvalsTab from "../usage/components/EvalsTab";
import { useTranslations } from "next-intl";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const t = useTranslations("analytics");

  const tabDescriptions = {
    overview: t("overviewDescription"),
    evals: t("evalsDescription"),
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
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "overview" && (
        <Suspense fallback={<CardSkeleton />}>
          <UsageAnalytics />
        </Suspense>
      )}
      {activeTab === "evals" && <EvalsTab />}
    </div>
  );
}
