"use client";

import { Suspense } from "react";
import { CardSkeleton } from "@/shared/components";
import ProviderLimits from "../usage/components/ProviderLimits";

export default function QuotaPage() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<CardSkeleton />}>
        <ProviderLimits />
      </Suspense>
    </div>
  );
}
