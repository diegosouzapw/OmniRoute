"use client";

import { useState } from "react";
import { RequestLoggerV2, ProxyLogger, SegmentedControl } from "@/shared/components";
import ConsoleLogViewer from "@/shared/components/ConsoleLogViewer";
import AuditLogTab from "./AuditLogTab";
import { useTranslations } from "next-intl";

export default function LogsPage() {
  const [activeTab, setActiveTab] = useState("request-logs");
  const t = useTranslations("logs");

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl
        options={[
          { value: "request-logs", label: t("requestLogs") },
          { value: "proxy-logs", label: t("proxyLogs") },
          { value: "audit-logs", label: t("auditLog") },
          { value: "console", label: t("console") },
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
