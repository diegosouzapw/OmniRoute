"use client";

import { useState, useEffect, Suspense } from "react";
import { CardSkeleton } from "@/shared/components";
import ProviderLimits from "../usage/components/ProviderLimits";

export default function QuotaPage() {
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false);
  const [autoRefreshInterval, setAutoRefreshInterval] = useState(180);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => {
        if (typeof data.autoRefreshProviderQuota === "boolean") {
          setAutoRefreshEnabled(data.autoRefreshProviderQuota);
        }
        if (typeof data.autoRefreshProviderQuotaInterval === "number") {
          setAutoRefreshInterval(data.autoRefreshProviderQuotaInterval);
        }
      })
      .catch(() => {
        /* keep defaults */
      });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<CardSkeleton />}>
        <ProviderLimits autoRefreshInterval={autoRefreshEnabled ? autoRefreshInterval : 0} />
      </Suspense>
    </div>
  );
}
