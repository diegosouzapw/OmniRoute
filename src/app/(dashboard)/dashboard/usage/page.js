"use client";

import { useState, Suspense } from "react";
import {
  UsageAnalytics,
  RequestLoggerV2,
  ProxyLogger,
  CardSkeleton,
  SegmentedControl,
} from "@/shared/components";
import ProviderLimits from "./components/ProviderLimits";

export default function UsagePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl
        options={[
          { value: "overview", label: "Overview" },
          { value: "logs", label: "Logger" },
          { value: "proxy-logs", label: "Proxy" },
          { value: "limits", label: "Limits" },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {/* Content */}
      {activeTab === "overview" && (
        <Suspense fallback={<CardSkeleton />}>
          <UsageAnalytics />
        </Suspense>
      )}
      {activeTab === "logs" && <RequestLoggerV2 />}
      {activeTab === "proxy-logs" && <ProxyLogger />}
      {activeTab === "limits" && (
        <Suspense fallback={<CardSkeleton />}>
          <ProviderLimits />
        </Suspense>
      )}
    </div>
  );
}
