"use client";

import { useState, Suspense } from "react";
import { UsageAnalytics, CardSkeleton, SegmentedControl } from "@/shared/components";
import EvalsTab from "../usage/components/EvalsTab";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabDescriptions = {
    overview:
      "Monitor your API usage patterns, token consumption, costs, and activity trends across all providers and models.",
    evals:
      "Run evaluation suites to test and validate your LLM endpoints. Compare model quality, detect regressions, and benchmark latency.",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[28px]">analytics</span>
          Analytics
        </h1>
        <p className="text-sm text-text-muted mt-1">{tabDescriptions[activeTab]}</p>
      </div>

      <SegmentedControl
        options={[
          { value: "overview", label: "Overview" },
          { value: "evals", label: "Evals" },
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
