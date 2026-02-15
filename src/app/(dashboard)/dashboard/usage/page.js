"use client";

import { useState, Suspense } from "react";
import { RequestLoggerV2, ProxyLogger, CardSkeleton, SegmentedControl } from "@/shared/components";
import ProviderLimits from "./components/ProviderLimits";
import SessionsTab from "./components/SessionsTab";
import RateLimitStatus from "./components/RateLimitStatus";
import BudgetTelemetryCards from "./components/BudgetTelemetryCards";
import BudgetTab from "./components/BudgetTab";

export default function UsagePage() {
  const [activeTab, setActiveTab] = useState("logs");

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl
        options={[
          { value: "logs", label: "Logger" },
          { value: "proxy-logs", label: "Proxy" },
          { value: "limits", label: "Limits" },
          { value: "sessions", label: "Sessions" },
          { value: "budget", label: "Budget" },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {/* Content */}
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
      {activeTab === "budget" && (
        <>
          <BudgetTab />
          <BudgetTelemetryCards />
        </>
      )}
    </div>
  );
}
