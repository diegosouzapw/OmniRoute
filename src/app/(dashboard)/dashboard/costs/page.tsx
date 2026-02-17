"use client";

import { useState } from "react";
import { SegmentedControl } from "@/shared/components";
import BudgetTab from "../usage/components/BudgetTab";
import PricingTab from "../settings/components/PricingTab";

export default function CostsPage() {
  const [activeTab, setActiveTab] = useState("budget");

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl
        options={[
          { value: "budget", label: "Budget" },
          { value: "pricing", label: "Pricing" },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "budget" && <BudgetTab />}
      {activeTab === "pricing" && <PricingTab />}
    </div>
  );
}
