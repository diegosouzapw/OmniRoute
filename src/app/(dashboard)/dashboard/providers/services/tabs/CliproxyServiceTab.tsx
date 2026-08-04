"use client";

import { ServiceStatusCard } from "../components/ServiceStatusCard";
import { ServiceLifecycleButtons } from "../components/ServiceLifecycleButtons";
import { ServiceLogsPanel } from "../components/ServiceLogsPanel";
import { CliproxyModelMappingEditor } from "../components/CliproxyModelMappingEditor";
import { AutoStartToggle } from "../components/AutoStartToggle";
import { CliproxyConnectionPanel } from "../components/CliproxyConnectionPanel";
import { CliproxyProviderExposureCard } from "../components/CliproxyProviderExposureCard";

const NAME = "cliproxy";

export function CliproxyServiceTab() {
  return (
    <div className="space-y-4">
      <ServiceStatusCard name={NAME} />
      <ServiceLifecycleButtons name={NAME} />
      <AutoStartToggle name={NAME} />
      <CliproxyConnectionPanel />
      <CliproxyProviderExposureCard />
      <CliproxyModelMappingEditor />
      <ServiceLogsPanel name={NAME} />
    </div>
  );
}
