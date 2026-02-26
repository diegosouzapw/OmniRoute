"use client";

import { useTranslations } from "next-intl";

import { useState } from "react";
import { RequestLoggerV2, ProxyLogger, SegmentedControl } from "@/shared/components";

export default function UsagePage() {
  const t = useTranslations("usage");
  const [activeTab, setActiveTab] = useState("logs");

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl
        options={[
          { value: "logs", label: t("loggerTab") },
          { value: "proxy-logs", label: t("proxyTab") },
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
