"use client";

import DebugModeCard from "../components/DebugModeCard";
import LogToolSourcesCard from "../components/LogToolSourcesCard";
import PayloadRulesTab from "../components/PayloadRulesTab";
import RequestLimitsTab from "../components/RequestLimitsTab";
import CliproxyapiSettingsTab from "../components/CliproxyapiSettingsTab";
import HeadroomProxyCard from "../components/HeadroomProxyCard";

export default function SettingsAdvancedPage() {
  return (
    <div className="space-y-6">
      <DebugModeCard />
      <LogToolSourcesCard />
      <PayloadRulesTab />
      <RequestLimitsTab />
      <CliproxyapiSettingsTab />
      <HeadroomProxyCard />
    </div>
  );
}
