"use client";

import { Suspense } from "react";
import { CardSkeleton } from "@/shared/components";
import ProviderLimits from "../usage/components/ProviderLimits";
import RateLimitStatus from "../usage/components/RateLimitStatus";
import SessionsTab from "../usage/components/SessionsTab";

export default function LimitsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<CardSkeleton />}>
        <ProviderLimits />
      </Suspense>
      <RateLimitStatus />
      <SessionsTab />
    </div>
  );
}
