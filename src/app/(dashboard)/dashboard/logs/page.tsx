"use client";

import { useState } from "react";
import { RequestLoggerV2, ProxyLogger, SegmentedControl } from "@/shared/components";
import ConsoleLogViewer from "@/shared/components/ConsoleLogViewer";
import AuditLogTab from "./AuditLogTab";

export default function LogsPage() {
  const [activeTab, setActiveTab] = useState("request-logs");

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl
        options={[
          { value: "request-logs", label: "Request Logs" },
          { value: "proxy-logs", label: "Proxy Logs" },
          { value: "audit-logs", label: "Audit Logs" },
          { value: "console", label: "Console" },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {/* Content */}
      {activeTab === "request-logs" && <RequestLoggerV2 />}
      {activeTab === "proxy-logs" && <ProxyLogger />}
      {activeTab === "audit-logs" && <AuditLogTab />}
      {activeTab === "console" && <ConsoleLogViewer />}
    </div>
  );
}
