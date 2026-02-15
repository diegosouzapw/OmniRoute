"use client";

import { useState, Suspense } from "react";
import { UsageAnalytics, CardSkeleton, SegmentedControl } from "@/shared/components";
import EvalsTab from "../usage/components/EvalsTab";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col gap-6">
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
