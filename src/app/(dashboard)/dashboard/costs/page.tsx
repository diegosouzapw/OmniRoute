"use client";

import { useState } from "react";
import { SegmentedControl } from "@/shared/components";
import CostOverviewTab from "./components/CostOverviewTab";
import BudgetTab from "../usage/components/BudgetTab";
import PricingTab from "../settings/components/PricingTab";
import { useTranslations } from "next-intl";

export default function CostsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const tc = useTranslations("costs");

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl
        options={[
          { value: "overview", label: tc("overviewTab") },
          { value: "budget", label: tc("budget") },
          { value: "pricing", label: tc("pricing") },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "overview" && <CostOverviewTab />}
      {activeTab === "budget" && <BudgetTab />}
      {activeTab === "pricing" && <PricingTab />}
    </div>
  );
}
