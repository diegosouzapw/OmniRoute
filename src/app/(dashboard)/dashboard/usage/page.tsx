"use client";

import { useState } from "react";
import { RequestLoggerV2, ProxyLogger, SegmentedControl } from "@/shared/components";

export default function UsagePage() {
  const [activeTab, setActiveTab] = useState("logs");

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl
        options={[
          { value: "logs", label: "Logger" },
          { value: "proxy-logs", label: "Proxy" },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {/* Content */}
      {activeTab === "logs" && <RequestLoggerV2 />}
      {activeTab === "proxy-logs" && <ProxyLogger />}
    </div>
  );
}
