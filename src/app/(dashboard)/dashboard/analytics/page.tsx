"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UsageAnalytics, CardSkeleton } from "@/shared/components";
import { cn } from "@/shared/utils/cn";
import EvalsTab from "../usage/components/EvalsTab";
import ComboHealthTab from "./ComboHealthTab";
import ProviderUtilizationTab from "./ProviderUtilizationTab";
import RouteExplainabilityTab from "./RouteExplainabilityTab";
import SearchAnalyticsTab from "./SearchAnalyticsTab";
import DiversityScoreCard from "./components/DiversityScoreCard";

type AnalyticsTab =
  | "overview"
  | "evals"
  | "search"
  | "utilization"
  | "combo-health"
  | "route-trace";

const ANALYTICS_TABS: Array<{ id: AnalyticsTab; label: string; icon: string }> = [
  { id: "overview", label: "Overview", icon: "analytics" },
  { id: "evals", label: "Evals", icon: "science" },
  { id: "search", label: "Search", icon: "travel_explore" },
  { id: "utilization", label: "Utilization", icon: "monitoring" },
  { id: "combo-health", label: "Combo Health", icon: "health_and_safety" },
  { id: "route-trace", label: "Route Trace", icon: "alt_route" },
];

function normalizeTab(tab: string | null): AnalyticsTab {
  if (tab === "route-trace" || tab === "route-explain") return "route-trace";
  if (tab === "evals" || tab === "search" || tab === "utilization" || tab === "combo-health") {
    return tab;
  }
  return "overview";
}

function AnalyticsPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<AnalyticsTab>(normalizeTab(searchParams.get("tab")));
  const [initialRequestId] = useState(searchParams.get("id") || "");

  useEffect(() => {
    if (searchParams.get("tab") !== "route-explain") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", "route-trace");
    window.history.replaceState(null, "", url.toString());
  }, [searchParams]);

  const handleTabChange = (tab: AnalyticsTab) => {
    setActiveTab(tab);
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (tab === "overview") url.searchParams.delete("tab");
    else url.searchParams.set("tab", tab);
    if (tab !== "route-trace") url.searchParams.delete("id");
    window.history.replaceState(null, "", url.toString());
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label="Analytics sections"
        className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-bg-subtle p-1"
      >
        {ANALYTICS_TABS.map((tab) => {
          const selected = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "focus-ring inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors",
                selected
                  ? "bg-surface text-text-main shadow-sm"
                  : "text-text-muted hover:bg-surface/70 hover:text-text-main"
              )}
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                {tab.icon}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>

      <Suspense fallback={<CardSkeleton />}>
        {activeTab === "overview" ? (
          <>
            <UsageAnalytics />
            <DiversityScoreCard />
          </>
        ) : null}
        {activeTab === "evals" ? <EvalsTab /> : null}
        {activeTab === "search" ? <SearchAnalyticsTab /> : null}
        {activeTab === "utilization" ? <ProviderUtilizationTab /> : null}
        {activeTab === "combo-health" ? <ComboHealthTab /> : null}
        {activeTab === "route-trace" ? (
          <RouteExplainabilityTab initialRequestId={initialRequestId} />
        ) : null}
      </Suspense>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <AnalyticsPageContent />
    </Suspense>
  );
}
