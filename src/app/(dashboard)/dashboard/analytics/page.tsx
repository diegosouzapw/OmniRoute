"use client";

import { Suspense } from "react";
import { UsageAnalytics, CardSkeleton } from "@/shared/components";
import DiversityScoreCard from "./components/DiversityScoreCard";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<CardSkeleton />}>
        <UsageAnalytics />
      </Suspense>
      <DiversityScoreCard />
    </div>
  );
}
