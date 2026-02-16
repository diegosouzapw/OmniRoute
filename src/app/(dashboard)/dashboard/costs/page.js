"use client";

import { useState } from "react";
import { cn } from "@/shared/utils/cn";
import BudgetTab from "../usage/components/BudgetTab";
import PricingTab from "../settings/components/PricingTab";

const sections = [
  {
    id: "budget",
    label: "Budget",
    icon: "account_balance_wallet",
    description: "Daily and monthly spend limits",
  },
  {
    id: "pricing",
    label: "Pricing",
    icon: "payments",
    description: "Per-model cost configuration",
  },
];

export default function CostsPage() {
  const [activeSection, setActiveSection] = useState("budget");

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Costs</h1>
        <p className="text-sm text-text-muted mt-1">
          Budget limits and model pricing configuration
        </p>
      </div>

      {/* Layout: sidebar + content */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <nav className="shrink-0 w-48">
          <div className="flex flex-col gap-1 sticky top-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left w-full",
                  activeSection === section.id
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                <span className="material-symbols-outlined text-[18px]">{section.icon}</span>
                <div className="min-w-0">
                  <div>{section.label}</div>
                  <div
                    className={cn(
                      "text-[10px] font-normal truncate",
                      activeSection === section.id ? "text-primary/70" : "text-text-muted"
                    )}
                  >
                    {section.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeSection === "budget" && <BudgetTab />}
          {activeSection === "pricing" && <PricingTab />}
        </div>
      </div>
    </div>
  );
}
