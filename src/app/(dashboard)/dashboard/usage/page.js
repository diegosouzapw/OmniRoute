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
import SessionsTab from "./components/SessionsTab";
import RateLimitStatus from "./components/RateLimitStatus";

import BudgetTelemetryCards from "./components/BudgetTelemetryCards";

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
          { value: "sessions", label: "Sessions" },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {/* Content */}
      {activeTab === "overview" && (
        <Suspense fallback={<CardSkeleton />}>
          <UsageAnalytics />
          <BudgetTelemetryCards />
        </Suspense>
      )}
      {activeTab === "logs" && <RequestLoggerV2 />}
      {activeTab === "proxy-logs" && <ProxyLogger />}
      {activeTab === "limits" && (
        <div className="flex flex-col gap-6">
          <Suspense fallback={<CardSkeleton />}>
            <ProviderLimits />
          </Suspense>
          <RateLimitStatus />
        </div>
      )}
      {activeTab === "sessions" && <SessionsTab />}
    </div>
  );
}
