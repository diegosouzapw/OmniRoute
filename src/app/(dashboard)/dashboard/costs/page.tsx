"use client";

import { useState } from "react";
import { SegmentedControl } from "@/shared/components";
import BudgetTab from "../usage/components/BudgetTab";
import PricingTab from "../settings/components/PricingTab";
import { useTranslations } from "next-intl";

export default function CostsPage() {
  const [activeTab, setActiveTab] = useState("budget");
  const t = useTranslations("costs");
  const ts = useTranslations("settings");

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl
        options={[
          { value: "budget", label: t("budget") },
          { value: "pricing", label: ts("pricing") },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "budget" && <BudgetTab />}
      {activeTab === "pricing" && <PricingTab />}
    </div>
  );
}
